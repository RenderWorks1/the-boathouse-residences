import type { ReactNode } from 'react';
import Script from 'next/script';
import { Hero } from '@/components/sections/Hero';
import { FullBleedImage } from '@/components/sections/FullBleedImage';
import { FullBleedVideo } from '@/components/sections/FullBleedVideo';
import { CoastalLiving } from '@/components/sections/CoastalLiving';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ResidencesTriptych } from '@/components/sections/ResidencesTriptych';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';
import {
  heroImage,
  coastalLivingImages,
} from '@/lib/placeholder-images';

const headingClass =
  'w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.75rem)] font-normal leading-[1.15] tracking-tight text-charcoal';
const bodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal/85';

/** Centred heading + body block, matching the content sections on the
 *  Vision and Setting pages. */
function CopyBlock({
  bg,
  heading,
  paragraphs,
  children,
}: {
  bg: string;
  heading: string;
  paragraphs: string[];
  children?: ReactNode;
}) {
  return (
    <section className={bg}>
      <div className="section-px section-py w-full max-w-none text-center">
        <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-center gap-[clamp(1.5rem,3.5vw,2.5rem)]">
          <h2 className={headingClass}>{heading}</h2>
          <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
            {paragraphs.map((p, i) => (
              <p key={i} className={bodyClass}>
                {p}
              </p>
            ))}
          </div>
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Boathouse Residences',
  url: 'https://theboathouseresidences.com',
  description: 'Luxury waterfront residences with private marina access.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '18 Clearwater Cove',
    addressLocality: 'West Harbour',
    addressRegion: 'Auckland',
    postalCode: '0618',
    addressCountry: 'NZ',
  },
  telephone: '+64 21 027 20203',
  email: 'info@boathouseresidences.co.nz',
};

export default function HomePage() {
  return (
    <>
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <Hero image={heroImage} videoUrl="/herovideo.mp4" />

      {/* 01 — Hero statement */}
      <CopyBlock
        bg="bg-salt"
        heading="Where Water Becomes Home."
        paragraphs={[
          'A curated collection of waterfront residences, thoughtfully created for those who value considered design, enduring quality and a deeper connection to their surroundings.',
          'Here, architecture, interiors and setting exist in quiet harmony, creating an address of remarkable rarity on Auckland’s waterfront.',
        ]}
      />

      <FullBleedImage src="/images/backoflaunch.jpg" alt="Back of launch on the water" />

      {/* 02 — The Experience */}
      <CopyBlock
        bg="bg-linen-white"
        heading="A Different Pace of Living."
        paragraphs={[
          'There is something inherently calming about life on the water.',
          'The changing light, the gentle movement of the marina and the quiet arrival home across the boardwalk become part of an everyday ritual.',
          'At Boathouse Residences, every detail has been designed to celebrate this connection, creating homes that feel timeless, effortless and deeply considered.',
        ]}
      />

      <FullBleedImage
        src="/images/harbourside-living-poster.jpg"
        alt="Waterfront lifestyle"
        videoUrl="/harbourside-living.mp4"
      />

      {/* 03 — The Location */}
      <CopyBlock
        bg="bg-salt"
        heading="Life, Framed by the Harbour."
        paragraphs={[
          'The waterfront is more than a view; it shapes the way each day unfolds.',
          'Mornings begin with still water and soft light, afternoons drift between the marina and the village, and evenings settle as the harbour reflects the last colours of the day.',
          'Set within Hobsonville Point Marina, Boathouse Residences offers a unique opportunity to live surrounded by open water, coastal landscapes and a vibrant village community — a place where connection, convenience and calm exist naturally together.',
        ]}
      />

      <FullBleedImage
        src="/images/ropesonboatlandscape4k.jpeg"
        alt="Marina rope detail"
      />

      {/* 04 — The Architecture */}
      <CopyBlock
        bg="bg-linen-white"
        heading="Architecture That Belongs."
        paragraphs={[
          'Every element has been carefully resolved to sit naturally within its marina setting.',
          'Refined architectural forms, enduring materials and generous proportions create a collection that feels quietly confident — contemporary in expression yet timeless in character.',
          'Designed with a considered approach to indoor-outdoor living, each residence embraces natural light, open views and a seamless connection to the water beyond.',
        ]}
      />

      <FullBleedImage src="/rope.jpg" alt="Marina rope detail" />

      {/* 05 — The Interiors */}
      <CopyBlock
        bg="bg-salt"
        heading="Designed with Intention"
        paragraphs={[
          'The interiors of Boathouse Residences have been thoughtfully designed around a philosophy of restraint, balance and timeless design.',
          'Designed by Paula Herbert Studio, each residence reflects a considered approach to materiality, texture and form, where natural finishes, refined detailing and a timeless palette create spaces that feel both effortless and enduring.',
          'Every element has been carefully resolved to complement the waterfront setting, creating interiors that invite calm, connection and a sense of belonging.',
        ]}
      />

      <FullBleedVideo
        src="/hero-videos/vision.mp4"
        poster="/hero-videos/vision-poster.jpg"
        alt="A clear vision"
        tint="rgba(0, 0, 0, 0.35)"
      />

      {/* 06 — The Residence Collection */}
      <CopyBlock
        bg="bg-linen-white"
        heading="A Collection by the Water."
        paragraphs={[
          'Designed as a limited collection of Studio, One Bedroom and Two Bedroom residences, each home has been thoughtfully crafted to offer a unique perspective on waterfront living.',
          'From private decks overlooking the marina to beautifully considered interiors designed for everyday comfort, each residence reflects a commitment to quality, simplicity and timeless design.',
        ]}
      >
        <LinkButton
          href="/residences"
          variant="outline"
          className="mt-[clamp(0.5rem,1.5vw,1rem)] border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-linen-white"
        >
          View the Residences
        </LinkButton>
      </CopyBlock>

      <CoastalLiving slides={coastalLivingImages} />

      <ParallaxSection
        image="/birdseye.jpg"
        alt="Boathouse Residences — birdseye view"
        height="lg"
        overlayOpacity={0.4}
        strength={0.28}
      />

      <ResidencesTriptych
        eyebrow=""
        items={[
          {
            primary: '/images/final-renders/2bedroom/living_portrait.jpg',
            secondary: '/images/final-renders/2bedroom/living_portrait2.jpg',
            alt: 'Marina view residence',
            href: '/residences/residence-01',
          },
          {
            primary: '/images/final-renders/studio/kitchen_portrait.jpg',
            secondary: '/images/final-renders/studio/interiordining_portrait.jpg',
            alt: 'Studio interior',
            href: '/residences/residence-07',
          },
          {
            primary: '/images/final-renders/2bedroom/bedroom_portrait.jpg',
            secondary: '/images/final-renders/2bedroom/bedroom_portrait2.jpg',
            alt: 'Harbour corner residence',
            href: '/residences/residence-04',
          },
        ]}
      />

      {/* 07 — Enquire */}
      <section className="bg-salt">
        <div className="section-px pt-[var(--section-pad-y)] w-full max-w-none text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-center gap-[clamp(1.5rem,3.5vw,2.5rem)]">
            <h2 className={headingClass}>Your Place on the Water.</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={bodyClass}>
                Discover Boathouse Residences, a unique collection of waterfront homes where thoughtful
                design, natural surroundings and a life connected to the marina come together.
              </p>
              <p className={bodyClass}>
                Register your interest to receive further information and arrange a private viewing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <EnquiryForm hideIntro />
    </>
  );
}
