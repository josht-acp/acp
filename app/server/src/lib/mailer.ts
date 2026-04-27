import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.resend.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'resend',
    pass: process.env.SMTP_PASS || '',
  },
});

export async function sendMagicLink(email: string, name: string, link: string) {
  await transporter.sendMail({
    from: `"Ascension Capital Partners" <portal@ascensioncapitalpartner.com>`,
    to: email,
    subject: 'Your ACP Portal access link',
    text: `Hello ${name},\n\nYour secure one-time login link:\n${link}\n\nThis link expires in 15 minutes and can only be used once.\n\nAscension Capital Partners`,
    html: `
      <div style="font-family:'Helvetica Neue',sans-serif;max-width:520px;margin:0 auto;background:#0A0E1A;color:#CBD5E1;padding:48px 40px;border:1px solid rgba(201,168,76,0.15);">
        <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#9A7B2E;margin-bottom:32px;">ASCENSION CAPITAL PARTNERS</div>
        <h1 style="font-size:28px;font-weight:300;color:#FAFBFC;margin:0 0 20px;letter-spacing:0.01em;">Portal access</h1>
        <p style="font-size:15px;line-height:1.7;color:#CBD5E1;margin:0 0 32px;">Hello ${name},<br/><br/>Click below to access the LP Portal. This link is single-use and expires in 15 minutes.</p>
        <a href="${link}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#9A7B2E,#C9A84C,#E2C97E);color:#0A0E1A;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;font-weight:600;">Access Portal →</a>
        <p style="font-size:12px;color:#4A5568;margin-top:40px;line-height:1.6;">If you didn't request this link, you can safely ignore this email.</p>
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#2D3548;margin-top:28px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.08);">Confidential · Institutional access only</div>
      </div>
    `,
  });
}

export async function sendContactNotification(enquiry: {
  name: string; firm: string; role: string; email: string;
  phone?: string; engagement: string; message: string;
}) {
  await transporter.sendMail({
    from: `"ACP Website" <noreply@ascensioncapitalpartner.com>`,
    to: process.env.CONTACT_EMAIL || 'joshuating53@outlook.com',
    subject: `New enquiry — ${enquiry.firm} / ${enquiry.engagement}`,
    text: [
      `Name: ${enquiry.name}`,
      `Firm: ${enquiry.firm}`,
      `Role: ${enquiry.role}`,
      `Email: ${enquiry.email}`,
      enquiry.phone ? `Phone: ${enquiry.phone}` : '',
      `Engagement: ${enquiry.engagement}`,
      `\nMessage:\n${enquiry.message}`,
    ].filter(Boolean).join('\n'),
  });
}
