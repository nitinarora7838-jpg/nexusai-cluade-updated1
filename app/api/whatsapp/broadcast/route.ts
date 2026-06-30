import { NextRequest, NextResponse } from 'next/server';
import { sendTextMessage } from '@/lib/whatsapp';
import { getSupabaseAdmin } from '@/lib/supabase-server';

interface BroadcastResult {
  phone: string;
  success: boolean;
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, phones, segment, apiKey } = await req.json();

    if (apiKey !== process.env.WHATSAPP_ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    let recipients: string[] = phones ?? [];

    // If a segment is provided, pull numbers from Supabase
    if (!recipients.length && segment) {
      const supabase = getSupabaseAdmin();
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
    const supabase = getSupabaseAdmin();

    // Send with 200ms delay between messages to respect Meta rate limits
    for (const phone of recipients) {
      try {
        await sendTextMessage(phone, message);
        await supabase.from('whatsapp_conversations').insert({
          lead_phone: phone,
          direction: 'outbound',
          message,
        });
        results.push({ phone, success: true });
      } catch (err) {
        results.push({ phone, success: false, error: String(err) });
      }
      await new Promise((r) => setTimeout(r, 200));
    }

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({ sent, failed, results });
  } catch (err) {
    console.error('WhatsApp broadcast error:', err);
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 });
  }
}
