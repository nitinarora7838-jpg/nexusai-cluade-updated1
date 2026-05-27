import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0B1120;color:#F8FAFC;padding:32px;border-radius:12px;">
        <div style="background:linear-gradient(135deg,#00D4FF,#6C63FF);padding:2px;border-radius:12px;margin-bottom:24px;">
          <div style="background:#111827;padding:20px 24px;border-radius:11px;">
            <h1 style="margin:0;font-size:20px;color:#00D4FF;">New Contact Form Submission</h1>
            <p style="margin:4px 0 0;color:#94A3B8;font-size:13px;">nexus-aisolution.com</p>
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94A3B8;font-size:13px;width:120px;">Full Name</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F8FAFC;font-size:14px;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94A3B8;font-size:13px;">Work Email</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:14px;">
              <a href="mailto:${email}" style="color:#00D4FF;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94A3B8;font-size:13px;">Company</td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#F8FAFC;font-size:14px;font-weight:600;">${company}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px 12px 0;color:#94A3B8;font-size:13px;vertical-align:top;">Message</td>
            <td style="padding:12px 0;color:#CBD5E1;font-size:14px;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:8px;font-size:12px;color:#64748B;">
          Reply to this email — it will go directly to <strong style="color:#94A3B8;">${email}</strong>
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nexus AI <onboarding@resend.dev>',
        to: ['ai@nexus-aisolution.com'],
        reply_to: email,
        subject: `New enquiry from ${name} — ${company}`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Resend API error:', JSON.stringify(err));
      // Surface the real Resend error so it is visible in Vercel Function logs
      const resendMessage = err?.message || err?.name || 'Unknown Resend error';
      return NextResponse.json(
        { error: `Email delivery failed: ${resendMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
