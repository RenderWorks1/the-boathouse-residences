import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BentoGallery, type BentoImage } from '@/components/ui/BentoGallery';

export const metadata: Metadata = {
  title: 'Two Bedroom',
  description: 'A showcase of the two bedroom residence — living, bedrooms, kitchen and outlook.',
};

// Furnished, hero-worthy renders are placed on the larger tiles (hero/wide)
// of the bento rhythm; supporting views fill the tall and square tiles.
const twoBedroomRenders: BentoImage[] = [
  { src: '/images/final-renders/2bedroom/living_portrait.jpg', alt: 'Two-bedroom living' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait.jpg', alt: 'Two-bedroom bedroom' },
  { src: '/images/final-renders/2bedroom/dining_portrait.jpg', alt: 'Two-bedroom dining' },
  { src: '/images/final-renders/2bedroom/bathroom_portrait.jpg', alt: 'Two-bedroom bathroom' },
  { src: '/images/final-renders/2bedroom/exteriorday_portrait.jpg', alt: 'Two-bedroom exterior by day' },
  { src: '/images/final-renders/2bedroom/living_portrait2.jpg', alt: 'Two-bedroom living detail' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait2.jpg', alt: 'Two-bedroom second bedroom' },
  { src: '/images/final-renders/2bedroom/kitchenempty_portrait.jpg', alt: 'Two-bedroom kitchen' },
  { src: '/images/final-renders/2bedroom/exteriornight_portrait.jpg', alt: 'Two-bedroom at dusk' },
  { src: '/images/final-renders/2bedroom/diningempty_portrait.jpg', alt: 'Two-bedroom dining space' },
  { src: '/images/final-renders/2bedroom/livingempty_portrait.jpg', alt: 'Two-bedroom living space' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait3.jpg', alt: 'Two-bedroom bedroom view' },
  { src: '/images/final-renders/2bedroom/exteriordeck_portrait.jpg', alt: 'Two-bedroom deck' },
  { src: '/images/final-renders/2bedroom/livingempty_portrait2.jpg', alt: 'Two-bedroom living outlook' },
  { src: '/images/final-renders/2bedroom/exteriorday_portrait2.jpg', alt: 'Two-bedroom exterior' },
  { src: '/images/final-renders/2bedroom/exteriornight_portrait2.jpg', alt: 'Two-bedroom marina outlook at night' },
];

export default function TwoBedroomShowcasePage() {
  return (
    <section className="bg-linen-white">
      <div className="section-px section-py mx-auto w-full max-w-[92rem]">
        <Link
          href="/residences"
          className="mb-[clamp(2rem,5vw,3.5rem)] inline-flex items-center gap-[clamp(0.35rem,1vw,0.5rem)] font-sans uppercase tracking-[0.25em] text-harbour hover:text-cta text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]"
        >
          <ChevronLeft className="h-[clamp(0.875rem,2vw,1rem)] w-[clamp(0.875rem,2vw,1rem)]" strokeWidth={1.25} />
          Back to Residences
        </Link>
        <ScrollReveal className="mb-[clamp(2.5rem,6vw,4.5rem)] flex flex-col items-center gap-[clamp(0.5rem,1.5vw,0.9rem)] text-center">
          <h1 className="font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
            Two Bedroom
          </h1>
        </ScrollReveal>
        <BentoGallery images={twoBedroomRenders} />
      </div>
    </section>
  );
}
