/**
 * Meta Conversions API — server-side Lead events.
 *
 * SERVER ONLY. This module reads META_CONVERSIONS_API_TOKEN and must never be
 * imported from a client component. The token has no NEXT_PUBLIC_ prefix, so
 * Next.js will inline it as `undefined` in any client bundle rather than leak
 * it, but keep the import confined to route handlers regardless.
 *
 * Personal data (email, phone, names) is normalised and SHA-256 hashed before
 * it leaves this process, as Meta requires. _fbp, _fbc, IP and user-agent are
 * sent in the clear — Meta rejects hashed values for those.
 */

import { createHash } from 'node:crypto';

// Trimmed: env vars set via a shell pipe or pasted into a dashboard commonly
// carry trailing whitespace, which would corrupt the request URL or the token.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN?.trim();
/** Set only while testing in Events Manager. Must be unset in production. */
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE?.trim();
const GRAPH_VERSION = 'v21.0';

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

/** Meta: trim, lowercase, then hash. */
function hashEmail(value?: string) {
  const normalised = value?.trim().toLowerCase();
  return normalised ? sha256(normalised) : undefined;
}

/** Meta: lowercase, strip punctuation and whitespace, then hash. */
function hashName(value?: string) {
  const normalised = value
    ?.trim()
    .toLowerCase()
    .replace(/[^\p{L}]/gu, '');
  return normalised ? sha256(normalised) : undefined;
}

/**
 * Meta: digits only, including country code, then hash. The form has no country
 * selector, so a leading 0 is treated as a New Zealand national number and gets
 * the +64 country code. A number that already carries a country code is left
 * alone.
 */
function hashPhone(value?: string) {
  let digits = value?.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = `64${digits.slice(1)}`;
  return sha256(digits);
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim() || undefined;
    }
  }
  return undefined;
}

/**
 * Meta's click ID cookie. If the Pixel hasn't written _fbc yet — first pageview
 * of an ad click, where the CAPI event can beat the cookie — rebuild it from the
 * fbclid on the landing URL, which is the format Meta documents.
 */
function resolveFbc(cookieHeader: string | null, sourceUrl?: string) {
  const fromCookie = readCookie(cookieHeader, '_fbc');
  if (fromCookie) return fromCookie;
  if (!sourceUrl) return undefined;
  try {
    const fbclid = new URL(sourceUrl).searchParams.get('fbclid');
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
  } catch {
    return undefined;
  }
}

export type LeadEventInput = {
  eventId: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  sourceUrl?: string;
  userAgent?: string;
  ip?: string | null;
  cookieHeader: string | null;
};

/**
 * Send a Lead to the Conversions API. Never throws and never rejects — a Meta
 * outage or a bad token must not turn a successful enquiry into an error for
 * the person who filled in the form. Returns whether Meta accepted the event.
 */
export async function sendLeadEvent(input: LeadEventInput): Promise<boolean> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[meta-capi] Pixel ID or access token missing — skipping Lead event.');
    return false;
  }

  const userData: Record<string, unknown> = {
    em: hashEmail(input.email),
    ph: hashPhone(input.phone),
    fn: hashName(input.firstName),
    ln: hashName(input.lastName),
    // Never hashed — Meta requires these in the clear.
    fbp: readCookie(input.cookieHeader, '_fbp'),
    fbc: resolveFbc(input.cookieHeader, input.sourceUrl),
    client_user_agent: input.userAgent,
    client_ip_address: input.ip ?? undefined,
  };

  // Meta rejects null/undefined members, so drop anything we couldn't resolve.
  for (const key of Object.keys(userData)) {
    if (userData[key] === undefined) delete userData[key];
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        ...(input.sourceUrl ? { event_source_url: input.sourceUrl } : {}),
        user_data: userData,
      },
    ],
    // Sent in the body, never a query string, so it cannot land in an access log.
    access_token: ACCESS_TOKEN,
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[meta-capi] Meta rejected Lead event (${res.status}):`, detail);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[meta-capi] Lead event failed:', err);
    return false;
  }
}
