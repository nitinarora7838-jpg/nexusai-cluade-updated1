import type { ContactInput } from '@/lib/contact-schema';
import { escapeHtml } from '@/lib/escape-html';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase-server';
import { sendTextMessage } from '@/lib/whatsapp';

export type Lead = Omit<ContactInput, 'website'>;
export type StepResult = 'done' | 'skipped' | 'failed';

/** Save the lead to the Supabase `leads` table. Skips quietly when Supabase isn't configured. */
export async function saveLead(lead: Lead): Promise<StepResult> {
  if (!isSupabaseConfigured()) return 'skipped';
  try {
    const { error } = await getSupabaseAdmin()
      .from('leads')
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        company_size: lead.companySize,
        interest: lead.interest,
        message: lead.message,
      });
    if (error) throw error;
    return 'done';
  } catch (err) {
    console.error('[contact] Failed to save lead to Supabase:', err);
    return 'failed';
  }
}

function buildEmailHtml(lead: Lead): string {
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Work email', lead.email],
    ['Phone', lead.phone],
    ['Company', lead.company],
    ['Company size', lead.companySize],
    ['Interested in', lead.interest],
  ];
  const cell = 'padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:14px;vertical-align:top;';
  const rowHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="${cell}color:#64748B;width:140px;">${escapeHtml(label)}</td>` +
        `<td style="${cell}color:#0F172A;font-weight:600;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const message = escapeHtml(lead.message).replace(/\r?\n/g, '<br/>');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0F172A;">
      <h1 style="margin:0 0 4px;font-size:20px;">New consultation request</h1>
      <p style="margin:0 0 20px;color:#64748B;font-size:13px;">From the contact form on nexus-aisolution.com</p>
      <table style="width:100%;border-collapse:collapse;">${rowHtml}</table>
      <h2 style="margin:24px 0 8px;font-size:15px;">What they’d like to automate</h2>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">${message}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#64748B;">Reply to this email to respond directly to ${escapeHtml(lead.email)}.</p>
    </div>`;
}

/** Email the lead to the team via Resend. Skips quietly when RESEND_API_KEY isn't set. */
export async function emailLead(lead: Lead): Promise<StepResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return 'skipped';

  const to = process.env.CONTACT_TO_EMAIL || 'ai@nexus-aisolution.com';
  const from = process.env.RESEND_FROM_EMAIL || 'Nexus AI <onboarding@resend.dev>';
  // Subjects are plain text; strip line breaks so they can't inject headers.
  const subject = `New enquiry: ${lead.name} (${lead.company}) – ${lead.interest}`.replace(/[\r\n]+/g, ' ');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, html: buildEmailHtml(lead) }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[contact] Resend returned ${res.status}: ${body}`);
      return 'failed';
    }
    return 'done';
  } catch (err) {
    console.error('[contact] Failed to send email via Resend:', err);
    return 'failed';
  }
}

/** Optional WhatsApp alert to the team. Never throws. */
export async function alertTeamOnWhatsApp(lead: Lead): Promise<void> {
  const teamPhone = process.env.WHATSAPP_TEAM_PHONE;
  if (!teamPhone || !process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) return;

  const preview = lead.message.length > 200 ? `${lead.message.slice(0, 200)}…` : lead.message;
  const text =
    `New Nexus AI enquiry\n\n` +
    `Name: ${lead.name}\nCompany: ${lead.company} (${lead.companySize})\n` +
    `Interested in: ${lead.interest}\nEmail: ${lead.email}\nPhone: ${lead.phone}\n\n${preview}`;
  try {
    await sendTextMessage(teamPhone, text);
  } catch (err) {
    console.warn('[contact] WhatsApp team alert failed:', err);
  }
}
