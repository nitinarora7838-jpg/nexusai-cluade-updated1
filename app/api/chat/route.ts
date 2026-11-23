import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Website chat → Lyzr agent proxy.
 * The Lyzr API key stays on the server (LYZR_API_KEY); the browser only ever talks to /api/chat.
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Lyzr agents can take several seconds to answer

const LYZR_URL = process.env.LYZR_API_URL || 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
const DEFAULT_AGENT_ID = '6b0470a797f839862b625678';

const bodySchema = z.object({
  message: z.string().trim().min(1, 'Please type a question.').max(1000, 'Please keep questions under 1,000 characters.'),
  sessionId: z.string().regex(/^[a-z0-9]{8,40}$/, 'Invalid session.'),
});

// Best-effort abuse protection: max requests per IP per window (per server instance).
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 5 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > RATE_LIMIT;
}

/** Lyzr returns `{ response: "..." }`; accept a few other shapes defensively. */
function extractReply(data: unknown): string | null {
  if (!data || typeof data !== 'object') return typeof data === 'string' ? data : null;
  const d = data as Record<string, unknown>;
  for (const key of ['response', 'message', 'output', 'text', 'answer']) {
    const value = d[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (value && typeof value === 'object') {
      const nested = extractReply(value);
      if (nested) return nested;
    }
  }
  return null;
}

const FRIENDLY_ERROR = 'Sorry, I couldn’t answer that just now. Please try again in a moment.';

export async function POST(req: NextRequest) {
  // Only accept requests from this website's own pages
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get('host')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'You’ve sent a lot of messages in a short time. Please wait a few minutes and try again.' },
      { status: 429 },
    );
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return NextResponse.json({ error: first || 'Invalid request.' }, { status: 400 });
  }

  const apiKey = process.env.LYZR_API_KEY;
  if (!apiKey) {
    console.error('[chat] LYZR_API_KEY is not set');
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 });
  }

  const agentId = process.env.LYZR_AGENT_ID || DEFAULT_AGENT_ID;
  const { message, sessionId } = parsed.data;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);
  try {
    const res = await fetch(LYZR_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
      body: JSON.stringify({
        user_id: process.env.LYZR_USER_ID || 'nexus-website',
        agent_id: agentId,
        session_id: `${agentId}-${sessionId}`,
        message,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[chat] Lyzr returned ${res.status}: ${detail.slice(0, 300)}`);
      return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
    }

    const reply = extractReply(await res.json().catch(() => null));
    if (!reply) {
      console.error('[chat] Lyzr response had no reply text');
      return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    console.error(`[chat] Request to Lyzr failed${aborted ? ' (timed out)' : ''}:`, err);
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: aborted ? 504 : 502 });
  } finally {
    clearTimeout(timeout);
  }
}
