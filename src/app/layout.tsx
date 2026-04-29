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
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

/** Architectural Vision heading — geometric serif, squarer strokes than humanist serifs. */
const visionDisplay = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-vision-display',
  display: 'swap',
  preload: false,
});

/** Gilroy — local files in public/gilroy-fonts. Light (300) + ExtraBold (800). */
const gilroy = localFont({
  src: [
    { path: '../../public/gilroy-fonts/Gilroy-Light.otf', weight: '300', style: 'normal' },
    { path: '../../public/gilroy-fonts/Gilroy-ExtraBold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-gilroy',
  display: 'swap',
  preload: true,
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
      className={`${display.variable} ${sans.variable} ${visionDisplay.variable} ${gilroy.variable}`}
    >
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
