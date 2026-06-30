import crypto from 'crypto';

const BASE_URL = 'https://graph.facebook.com/v19.0';

/**
 * Verify Meta's `X-Hub-Signature-256` header against the raw request body.
 * Meta signs every webhook delivery with an HMAC-SHA256 of the raw body using
 * the app secret. Without this check, anyone who learns the webhook URL could
 * POST forged payloads and make us send WhatsApp messages / call the AI.
 *
 * Fails closed: if WHATSAPP_APP_SECRET is not configured, the request is
 * rejected (returns false) rather than processed unverified.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.warn('[whatsapp] WHATSAPP_APP_SECRET not set — rejecting webhook (fail closed).');
    return false;
  }
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false;

  const expected =
    'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody, 'utf8').digest('hex');

  const received = Buffer.from(signatureHeader);
  const computed = Buffer.from(expected);
  if (received.length !== computed.length) return false;
  try {
    return crypto.timingSafeEqual(received, computed);
  } catch {
    return false;
  }
}

function getConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!accessToken || !phoneNumberId) {
    throw new Error('WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be set');
  }
  return { accessToken, phoneNumberId };
}

export async function sendTextMessage(to: string, text: string) {
  const { accessToken, phoneNumberId } = getConfig();
  const res = await fetch(`${BASE_URL}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`WhatsApp API error: ${JSON.stringify(err)}`);
  }
  return res.json();
}

export async function sendTemplateMessage(
  to: string,
  templateName: string,
  languageCode = 'en_US',
  components: object[] = []
) {
  const { accessToken, phoneNumberId } = getConfig();
  const res = await fetch(`${BASE_URL}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: { name: templateName, language: { code: languageCode }, components },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`WhatsApp API error: ${JSON.stringify(err)}`);
  }
  return res.json();
}

export async function markMessageRead(messageId: string) {
  const { accessToken, phoneNumberId } = getConfig();
  await fetch(`${BASE_URL}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }),
  });
}

export function extractTextFromMessage(message: WhatsAppMessage): string | null {
  if (message.type === 'text') return message.text?.body ?? null;
  if (message.type === 'button') return message.button?.text ?? null;
  if (message.type === 'interactive') {
    return (
      message.interactive?.button_reply?.title ??
      message.interactive?.list_reply?.title ??
      null
    );
  }
  return null;
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: { display_phone_number: string; phone_number_id: string };
        contacts?: Array<{ profile: { name: string }; wa_id: string }>;
        messages?: WhatsAppMessage[];
        statuses?: Array<{ id: string; status: string; timestamp: string; recipient_id: string }>;
      };
      field: string;
    }>;
  }>;
}

export interface WhatsAppMessage {
  id: string;
  from: string;
  timestamp: string;
  type: 'text' | 'image' | 'audio' | 'document' | 'video' | 'button' | 'interactive' | 'order' | 'system';
  text?: { body: string };
  button?: { text: string; payload: string };
  interactive?: {
    type: string;
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string; description: string };
  };
}
