import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html } = body || {};
    if (!to) return NextResponse.json({ error: 'Missing `to` address' }, { status: 400 });

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FROM_EMAIL || 'no-reply@example.com';

    if (!host || !user || !pass) {
      return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({ from, to, subject: subject || 'Test email from GasPoint', html: html || '<p>This is a test email from GasPoint.</p>' });

    return NextResponse.json({ sent: true, info });
  } catch (err: any) {
    return NextResponse.json({ error: 'Send failed', details: String(err) }, { status: 500 });
  }
}
