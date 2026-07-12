import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Temporary "coming soon" gate.
 *
 * While active, every public request is rewritten to the plain static landing
 * page at /coming-soon.html (logo + contact details on a light-blue background).
 * This lets the hoarding QR code (boathouseresidences.co.nz/enquire) and every
 * other link resolve to a holding page until the real site is signed off.
 *
 * The gate is ON for the real production deployment only. Preview deployments
 * (e.g. a client review link) and local dev always show the full site, so a
 * preview URL can be shared for sign-off without taking the live site public.
 *
 * To take the finished production site live, either:
 *   1. set the env var COMING_SOON=off in Vercel and redeploy, or
 *   2. delete this file (src/middleware.ts) and public/coming-soon.html.
 */
const GATE_ENABLED =
  process.env.COMING_SOON !== 'off' && process.env.VERCEL_ENV === 'production';

// Paths that must keep working even while the gate is up.
const ALLOWLIST = [
  '/coming-soon.html', // the holding page itself
  '/logos/', // logo shown on the holding page
  '/favicon', // favicon.ico / favicon assets
  '/studio', // Sanity CMS — keep editable behind the gate
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(request: NextRequest) {
  if (!GATE_ENABLED) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (ALLOWLIST.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon.html';
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on everything except Next.js internals and static asset files, so the
  // holding page and its logo load correctly.
  matcher: ['/((?!_next/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|woff2?|css|js)$).*)'],
};
