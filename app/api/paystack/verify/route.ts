import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference } = body || {};
    if (!reference) return NextResponse.json({ error: 'Missing reference' }, { status: 400 });

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: 'Server not configured with PAYSTACK_SECRET_KEY' }, { status: 500 });

    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: 'Verification failed', details: data }, { status: 502 });
    }

    return NextResponse.json({ status: data.status, data: data.data });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
  }
}
