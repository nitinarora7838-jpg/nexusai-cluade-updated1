import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAuthorizedAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase-server';
import { sendTextMessage } from '@/lib/whatsapp';

const bodySchema = z.object({
  to: z.string().trim().regex(/^\d{8,15}$/, 'to must be a phone number in international format, digits only'),
  message: z.string().trim().min(1).max(4096),
});

/** Send one WhatsApp message. Requires `Authorization: Bearer <WHATSAPP_ADMIN_KEY>`. */
export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { to, message } = parsed.data;

  try {
    await sendTextMessage(to, message);
  } catch (err) {
    console.error('WhatsApp send error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
  }

  if (isSupabaseConfigured()) {
    const { error } = await getSupabaseAdmin()
      .from('whatsapp_conversations')
      .insert({ lead_phone: to, direction: 'outbound', message });
    if (error) console.warn('WhatsApp send: message sent but not logged:', error.message);
  }

  return NextResponse.json({ success: true });
}
