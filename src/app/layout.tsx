import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Serif, Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { GlobalEnquiry } from '@/components/layout/GlobalEnquiry';
import '@/styles/globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

/** Architectural Vision heading — geometric serif, squarer strokes than humanist serifs. */
const visionDisplay = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vision-display',
  display: 'swap',
  preload: false,
});

/** Gilroy — local WOFF2 files in public/gilroy-fonts. Loaded only when referenced via font-gilroy. */
const gilroy = localFont({
  src: [
    { path: '../../public/gilroy-fonts/Gilroy-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/gilroy-fonts/Gilroy-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-gilroy',
  display: 'swap',
  preload: false,
});

/** Atteron — display serif used for marketing-style titles. */
const atteron = localFont({
  src: [{ path: '../../public/atteron/Atteron.woff2', weight: '400', style: 'normal' }],
  variable: '--font-atteron',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theboathouseresidences.com'),
  title: {
    default: 'The Boathouse Residences — Luxury Waterfront Living',
    template: '%s | The Boathouse Residences',
  },
  description:
    'A curated collection of waterfront residences where cinematic harbour views, private marina access, and elegant coastal architecture meet.',
  openGraph: {
    title: 'The Boathouse Residences',
    description: 'Luxury waterfront living by the harbour.',
    url: 'https://theboathouseresidences.com',
    siteName: 'The Boathouse Residences',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Boathouse Residences',
    description: 'Luxury waterfront living by the harbour.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${visionDisplay.variable} ${gilroy.variable} ${atteron.variable}`}
    >
      <head>
        {/* Preload the hero/nav logo at HTML-parse time so it's ready before
            the hero intro animation starts. fetchPriority=high tells the
            browser to prioritise it ahead of other resources. */}
        <link
          rel="preload"
          as="image"
          href="/logos/logo-white.png"
          fetchPriority="high"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="/logos/logo-navy.png"
          type="image/png"
        />
      </head>
      <body>
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <GlobalEnquiry />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
