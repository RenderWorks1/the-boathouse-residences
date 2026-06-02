import Script from 'next/script';
import { Hero } from '@/components/sections/Hero';
import { LifestyleIntro } from '@/components/sections/LifestyleIntro';
import { FullBleedImage } from '@/components/sections/FullBleedImage';
import { ArchitecturalVision } from '@/components/sections/ArchitecturalVision';
import { FlagStatement } from '@/components/sections/FlagStatement';
import { FullBleedVideo } from '@/components/sections/FullBleedVideo';
import { CoastalLiving } from '@/components/sections/CoastalLiving';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ResidencesTriptych } from '@/components/sections/ResidencesTriptych';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { LinkButton } from '@/components/ui/Button';
import {
  heroImage,
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
        src="/images/harbourside-living-poster.jpg"
        alt="Waterfront lifestyle"
        videoUrl="/harbourside-living.mp4"
      />
      <ArchitecturalVision heading={fallback.visionHeading} body={fallback.visionBody} />
      <FlagStatement
        imageSrc="/rope.jpg"
        imageAlt="Marina rope detail"
        body={fallback.flagBody}
      />
      <section className="bg-salt">
        <div className="section-px flex w-full justify-center pb-[clamp(2.25rem,5vw+1rem,5.5rem)]">
          <LinkButton href="/residences" variant="outline" className="border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-linen-white">
            View the Residences
          </LinkButton>
        </div>
      </section>
      <FullBleedVideo
        src="/hero-videos/vision.mp4"
        poster="/hero-videos/vision-poster.jpg"
        alt="A clear vision"
        tint="rgba(0, 0, 0, 0.35)"
      />
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
      <EnquiryForm />
    </>
  );
}
