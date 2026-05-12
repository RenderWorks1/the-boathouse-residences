import Script from 'next/script';
import { Hero } from '@/components/sections/Hero';
import { LifestyleIntro } from '@/components/sections/LifestyleIntro';
import { FullBleedImage } from '@/components/sections/FullBleedImage';
import { ArchitecturalVision } from '@/components/sections/ArchitecturalVision';
import { FlagStatement } from '@/components/sections/FlagStatement';
import { FullBleedVideo } from '@/components/sections/FullBleedVideo';
import { RippleSpacerSection } from '@/components/sections/RippleSpacerSection';
import { CoastalLiving } from '@/components/sections/CoastalLiving';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ResidencesTriptych } from '@/components/sections/ResidencesTriptych';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import {
  heroImage,
  fullBleedLifestyleImage,
  coastalLivingImages,
} from '@/lib/placeholder-images';

const fallback = {
  lifestyleBodyA:
    'The Boathouse Residences offer a curated collection of waterfront homes, designed for those who appreciate the finer things in life.',
  lifestyleBodyB:
    'Wake up to panoramic views of the harbour, enjoy direct access to private marinas, and indulge in a lifestyle defined by elegance and ease.',
  visionHeading: 'Architectural Vision',
  visionBody:
    'Crafted by award-winning architects, our vision is a testament to seamless indoor-outdoor living.',
  flagBody:
    'Blending natural materials with contemporary design to create an oasis of calm by the water.',
  residencesHeading: 'Residences',
  residencesBody:
    'Each residence is a sanctuary of light and space, with meticulously designed interiors and panoramic water views, offering the ultimate in modern luxury living.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Boathouse Residences',
  url: 'https://theboathouseresidences.com',
  description: 'Luxury waterfront residences with private marina access.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Boathouse Way',
    addressLocality: 'Waterfront City',
  },
  telephone: '1300 BOATHOUSE',
  email: 'info@boathouseresidences.com',
};

export default function HomePage() {
  return (
    <>
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <Hero image={heroImage} videoUrl="/herovideo.mp4" />
      <LifestyleIntro body={fallback.lifestyleBodyA} align="left" size="md" />
      <FlagStatement
        imageSrc="/images/backoflaunch.jpg"
        imageAlt="Back of launch"
        body={fallback.lifestyleBodyB}
        imageSide="right"
      />
      <FullBleedImage
        src={fullBleedLifestyleImage}
        alt="Waterfront lifestyle"
        videoUrl="/harbourside-living.mp4"
      />
      <ArchitecturalVision heading={fallback.visionHeading} body={fallback.visionBody} />
      <FlagStatement
        imageSrc="/rope.jpg"
        imageAlt="Marina rope detail"
        body={fallback.flagBody}
      />
      <FullBleedVideo
        src="/boatvid.mp4"
        poster="/images/boatvid-poster.jpg"
        alt="Boathouse Residences in motion"
        tint="rgba(28, 24, 20, 0.6)"
      />
      <RippleSpacerSection />
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
            primary: '/images/2bedroom_v1_.jpg',
            secondary: '/images/2bedroom_v5.jpg',
            alt: 'Marina view residence',
            href: '/residences/residence-01',
          },
          {
            primary: '/images/studio_int_v1.jpg',
            secondary: '/images/studio_int_v4.jpg',
            alt: 'Studio interior',
            href: '/residences/residence-07',
          },
          {
            primary: '/images/2bedroom_v7.jpg',
            secondary: '/images/2bedroom_v10_.jpg',
            alt: 'Harbour corner residence',
            href: '/residences/residence-04',
          },
        ]}
      />
      <EnquiryForm />
    </>
  );
}
