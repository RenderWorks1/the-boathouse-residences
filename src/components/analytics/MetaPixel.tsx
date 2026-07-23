'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Trimmed deliberately: this value is interpolated into an inline script, so a
// stray newline from however the env var was set would land inside a string
// literal and break the snippet with a SyntaxError, taking the Pixel down.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

/**
 * Last path we fired a PageView for.
 *
 * Deliberately module scope rather than a ref: `reactStrictMode` is on, so in
 * dev React mounts effects twice. A ref is recreated on the second mount and
 * would fire a duplicate PageView for the initial load. A module-level value
 * survives the remount and resets only on a real page load.
 */
let lastTrackedPath: string | null = null;

export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || !pathname) return;
    // The inline snippet below already fires PageView for the entry path, so the
    // first path this effect sees is accounted for.
    if (lastTrackedPath === null) {
      lastTrackedPath = pathname;
      return;
    }
    if (lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* Meta's base snippet. Its own `if (f.fbq) return` guard, plus next/script
          deduping on `id`, means init runs exactly once per page load. */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
    </>
  );
}

/*
 * Meta's <noscript> fallback image is deliberately omitted.
 *
 * React preloads the `src` of an <img> it renders, so the tracking pixel was
 * fetched on every visit even with JavaScript enabled — verified in a browser:
 * one hit to /tr?ev=PageView&noscript=1 alongside the real fbq PageView, i.e.
 * every page view counted twice.
 *
 * Nothing is lost by dropping it. Every enquiry form on this site is a React
 * client component, so a visitor without JavaScript cannot submit one and can
 * never become a lead — there is no conversion for the fallback to attribute.
 */
