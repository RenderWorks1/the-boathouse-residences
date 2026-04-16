import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
