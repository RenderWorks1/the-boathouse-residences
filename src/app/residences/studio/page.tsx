import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BentoGallery, type BentoImage } from '@/components/ui/BentoGallery';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'A showcase of the studio residence — interiors, outlook and deck.',
};

// Ordered so the landscape renders fall on the hero (2×2) and wide (2×1)
// tiles of the bento rhythm; portraits fill the tall and square tiles.
const studioRenders: BentoImage[] = [
  { src: '/images/final-renders/studio/kitchen_landscape.jpg', alt: 'Studio kitchen' },
  { src: '/images/final-renders/studio/interiorlounge_portrait.jpg', alt: 'Studio lounge' },
  { src: '/images/final-renders/studio/interiordining_portrait.jpg', alt: 'Studio dining' },
  { src: '/images/final-renders/studio/interiorempty_portrait.jpg', alt: 'Studio living space' },
  { src: '/images/final-renders/studio/exteriorlight_landscape.jpg', alt: 'Studio exterior in daylight' },
  { src: '/images/final-renders/studio/kitchen_portrait.jpg', alt: 'Studio kitchen detail' },
  { src: '/images/final-renders/studio/bedroom_portrait.jpg', alt: 'Studio bedroom' },
  { src: '/images/final-renders/studio/bathroom_portrait.jpg', alt: 'Studio bathroom' },
  { src: '/images/final-renders/studio/exteriordark_landscape.jpg', alt: 'Studio exterior at dusk' },
  { src: '/images/final-renders/studio/interiorempty_portrait2.jpg', alt: 'Studio interior' },
  { src: '/images/final-renders/studio/exteriordeck_portrait.jpg', alt: 'Studio deck' },
  { src: '/images/final-renders/studio/exteriordeckdaytime_portrait.jpg', alt: 'Studio deck by day' },
  { src: '/images/final-renders/studio/bedroom_landscape.jpg', alt: 'Studio bedroom outlook' },
  { src: '/images/final-renders/studio/exterior_studio_int_v7_.jpg', alt: 'Studio interior view' },
];

export default function StudioShowcasePage() {
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
            Studio
          </h1>
        </ScrollReveal>
        <BentoGallery images={studioRenders} />
      </div>
    </section>
  );
}
