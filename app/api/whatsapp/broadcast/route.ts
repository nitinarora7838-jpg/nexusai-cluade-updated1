import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAuthorizedAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase-server';
import { sendTextMessage } from '@/lib/whatsapp';

const bodySchema = z.object({
  message: z.string().trim().min(1).max(4096),
  phones: z.array(z.string().trim().regex(/^\d{8,15}$/)).max(1000).optional(),
  segment: z.enum(['all', 'active']).optional(),
});

interface BroadcastResult {
  phone: string;
  success: boolean;
  error?: string;
}

/**
 * Send one message to many WhatsApp numbers (explicit list, or a lead segment from Supabase).
 * Requires `Authorization: Bearer <WHATSAPP_ADMIN_KEY>`.
 * Note: outside the 24-hour customer service window, Meta only delivers approved template messages.
 */
export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { message, phones, segment } = parsed.data;
  const supabase = isSupabaseConfigured() ? getSupabaseAdmin() : null;

  try {
    let recipients: string[] = phones ?? [];

    if (!recipients.length && segment) {
      if (!supabase) {
        return NextResponse.json({ error: 'Segments need Supabase to be configured' }, { status: 400 });
      }
      let query = supabase.from('whatsapp_leads').select('phone');
      if (segment === 'active') {
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('last_seen', since);
      }
      const { data, error } = await query;
      if (error) throw error;
      recipients = (data ?? []).map((r: { phone: string }) => r.phone);
    }

    if (!recipients.length) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 });
    }

    const results: BroadcastResult[] = [];
    for (const phone of recipients) {
      try {
        await sendTextMessage(phone, message);
        if (supabase) {
          await supabase.from('whatsapp_conversations').insert({ lead_phone: phone, direction: 'outbound', message });
        }
        results.push({ phone, success: true });
      } catch (err) {
        results.push({ phone, success: false, error: String(err) });
      }
      // Small gap between messages to stay within Meta's rate limits
      await new Promise((r) => setTimeout(r, 200));
    }

    const sent = results.filter((r) => r.success).length;
    return NextResponse.json({ sent, failed: results.length - sent, results });
  } catch (err) {
    console.error('WhatsApp broadcast error:', err);
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 });
  }
}
