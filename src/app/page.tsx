import Script from 'next/script';
import { Hero } from '@/components/sections/Hero';
import { LifestyleIntro } from '@/components/sections/LifestyleIntro';
import { FullBleedImage } from '@/components/sections/FullBleedImage';
import { ArchitecturalVision } from '@/components/sections/ArchitecturalVision';
import { CoastalLiving } from '@/components/sections/CoastalLiving';
import { ResidencesPreview } from '@/components/sections/ResidencesPreview';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import {
  heroImage,
  fullBleedLifestyleImage,
  residencesPreviewImage,
  coastalLivingImages,
} from '@/lib/placeholder-images';

const fallback = {
  lifestyleHeading: 'The Boathouse Lifestyle',
  lifestyleBody:
    'Discover an unparalleled living experience where modern luxury meets coastal serenity. The Boathouse Residences offer a curated collection of waterfront homes, designed for those who appreciate the finer things in life. Wake up to panoramic views of the harbour, enjoy direct access to private marinas, and indulge in a lifestyle defined by elegance and ease.',
  visionHeading: 'Architectural Vision',
  visionBody:
    'Crafted by award-winning architects, our vision is a testament to seamless indoor-outdoor living. Blending natural materials with contemporary design to create an oasis of calm by the water.',
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
      <Hero image={heroImage} videoUrl="/boathouses-hero-vid.mp4" />
      <LifestyleIntro heading={fallback.lifestyleHeading} body={fallback.lifestyleBody} />
      <FullBleedImage
        src={fullBleedLifestyleImage}
        alt="Waterfront lifestyle"
        videoUrl="/harbourside-living.mp4"
      />
      <ArchitecturalVision heading={fallback.visionHeading} body={fallback.visionBody} />
      <CoastalLiving slides={coastalLivingImages} />
      <ResidencesPreview
        image={residencesPreviewImage}
        heading={fallback.residencesHeading}
        body={fallback.residencesBody}
      />
      <EnquiryForm />
    </>
  );
}
