import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity/client';

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  residenceId?: string;
  turnstileToken?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstile(token: string | undefined, ip: string | null) {
  if (!TURNSTILE_SECRET) return { ok: true } as const;
  if (!token) return { ok: false, reason: 'missing-token' } as const;
  try {
    const params = new URLSearchParams();
    params.set('secret', TURNSTILE_SECRET);
    params.set('response', token);
    if (ip) params.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success ? ({ ok: true } as const) : ({ ok: false, reason: 'failed' } as const);
  } catch {
    return { ok: false, reason: 'verify-error' } as const;
  }
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { firstName, lastName, email, phone, source, residenceId, turnstileToken } = body;

  const ip =
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    null;
  const captcha = await verifyTurnstile(turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 400 },
    );
  }

  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (!phone || phone.trim().length < 5) {
    return NextResponse.json({ error: 'A phone number is required.' }, { status: 400 });
  }

  const doc = {
    _type: 'enquiry',
    firstName: firstName?.toString().slice(0, 120),
    lastName: lastName?.toString().slice(0, 120),
    email: email.toLowerCase().slice(0, 200),
    phone: phone.toString().slice(0, 40),
    source: source?.toString().slice(0, 80),
    submittedAt: new Date().toISOString(),
    ...(residenceId
      ? { residence: { _type: 'reference', _ref: residenceId.toString() } }
      : {}),
  };

  // Persist to Sanity if configured; otherwise log server-side for now.
  if (sanityWriteClient) {
    try {
      await sanityWriteClient.create(doc);
    } catch (err) {
      console.error('[enquiry] Sanity write failed:', err);
      return NextResponse.json({ error: 'Could not save enquiry.' }, { status: 500 });
    }
  } else {
    console.info('[enquiry] Sanity not configured — enquiry received:', doc);
  }

  // TODO(notify): Wire Resend / SendGrid here to email sales@boathouseresidences.com.
  // Example interface:
  //   await sendEmail({ to: '…', subject: 'New enquiry', body: renderEnquiry(doc) });

  return NextResponse.json({ ok: true });
}
