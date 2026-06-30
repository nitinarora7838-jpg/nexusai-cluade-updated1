import { NextRequest, NextResponse } from 'next/server';
import { sendTextMessage } from '@/lib/whatsapp';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { to, message, apiKey } = await req.json();

    // Simple API key guard — set WHATSAPP_ADMIN_KEY in env
    if (apiKey !== process.env.WHATSAPP_ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!to || !message) {
      return NextResponse.json({ error: 'to and message are required' }, { status: 400 });
    }

    await sendTextMessage(to, message);

    const supabase = getSupabaseAdmin();
    await supabase.from('whatsapp_conversations').insert({
      lead_phone: to,
      direction: 'outbound',
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WhatsApp send error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
