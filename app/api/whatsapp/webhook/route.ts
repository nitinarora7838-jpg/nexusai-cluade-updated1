import { NextRequest, NextResponse } from 'next/server';
import {
  sendTextMessage,
  markMessageRead,
  extractTextFromMessage,
  type WhatsAppWebhookPayload,
} from '@/lib/whatsapp';
import { generateAIReply } from '@/lib/whatsapp-ai';
import { getSupabaseAdmin } from '@/lib/supabase-server';

// GET — Meta webhook verification handshake
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

// POST — incoming messages
export async function POST(req: NextRequest) {
  try {
    const body: WhatsAppWebhookPayload = await req.json();

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' });
    }

    for (const entry of body.entry) {
      for (const change of entry.changes) {
        if (change.field !== 'messages') continue;
        const { messages, contacts } = change.value;
        if (!messages?.length) continue;

        for (const message of messages) {
          const senderPhone = message.from;
          const senderName = contacts?.[0]?.profile?.name ?? 'Unknown';
          const text = extractTextFromMessage(message);

          await markMessageRead(message.id).catch(() => null);

          // Upsert lead into Supabase
          const supabase = getSupabaseAdmin();
          const { data: lead } = await supabase
            .from('whatsapp_leads')
            .upsert(
              { phone: senderPhone, name: senderName, last_seen: new Date().toISOString() },
              { onConflict: 'phone', ignoreDuplicates: false }
            )
            .select('id')
            .single();

          // Save incoming message to conversation log
          if (text) {
            await supabase.from('whatsapp_conversations').insert({
              lead_phone: senderPhone,
              direction: 'inbound',
              message: text,
              message_id: message.id,
            });

            // Fetch recent conversation history for context
            const { data: history } = await supabase
              .from('whatsapp_conversations')
              .select('direction, message')
              .eq('lead_phone', senderPhone)
              .order('created_at', { ascending: false })
              .limit(10);

            const conversationHistory = (history ?? [])
              .reverse()
              .slice(0, -1) // exclude the message we just inserted
              .map((row: { direction: string; message: string }) => ({
                role: (row.direction === 'inbound' ? 'user' : 'assistant') as 'user' | 'assistant',
                content: row.message,
              }));

            // Generate AI reply
            const reply = await generateAIReply(text, conversationHistory);

            // Send reply
            await sendTextMessage(senderPhone, reply);

            // Save outbound message
            await supabase.from('whatsapp_conversations').insert({
              lead_phone: senderPhone,
              direction: 'outbound',
              message: reply,
            });
          }
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('WhatsApp webhook error:', err);
    // Always return 200 to Meta to prevent retries
    return NextResponse.json({ status: 'error' }, { status: 200 });
  }
}
