import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { alertTeamOnWhatsApp, emailLead, saveLead } from '@/lib/leads';

const FRIENDLY_ERROR =
  'Sorry, we couldn’t send your message right now. Please try again in a minute, or email ai@nexus-aisolution.com.';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never see this field. Pretend success so bots don't retry.
  if (body && typeof body === 'object' && 'website' in body && String((body as { website?: unknown }).website ?? '').trim()) {
    return NextResponse.json({ success: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { website: _honeypot, ...lead } = parsed.data;

  // 1. Save to the database (if configured), 2. email the team (if configured).
  const saved = await saveLead(lead);
  const emailed = await emailLead(lead);

  // The form succeeds as long as at least one of the two worked.
  if (saved !== 'done' && emailed !== 'done') {
    console.error(`[contact] Lead not stored or emailed (database: ${saved}, email: ${emailed}).`);
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 500 });
  }

  // 3. Optional WhatsApp alert to the team. Failures are logged, never shown to the visitor.
  await alertTeamOnWhatsApp(lead);

  return NextResponse.json({ success: true });
}
