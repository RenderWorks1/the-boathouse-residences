import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Masterplan',
  description:
    'The Marina Precinct — Boathouse Residences within the evolving Hobsonville Marina precinct.',
};

export default function MasterplanPage() {
  return (
    <>
      <PageHero image="/images/2bedroom_v4.jpg" title="The Marina Precinct" />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="mx-auto flex max-w-[78rem] flex-col items-start gap-[clamp(1.75rem,4vw,3rem)] text-left">
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              The Marina Precinct
            </h2>
            <p className="max-w-[60rem] font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
              Boathouse Residences is positioned within the evolving Hobsonville Marina precinct, a
              carefully considered coastal environment that brings together residential living, open space
              and a growing village community.
            </p>
            <p className="max-w-[60rem] font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
              Located along the water&apos;s edge, the residences enjoy immediate access to marina walkways,
              green spaces and local amenity, creating a lifestyle that is both connected and quietly
              removed.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ backgroundColor: '#E4E0DC' }}>
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="ml-auto mb-[clamp(2rem,4vw,3rem)] flex max-w-[78rem] flex-col items-end gap-[clamp(1.75rem,4vw,3rem)] text-right">
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Staged Areas
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <Image
              src="/floorplan_placeholders/floorplan-new.jpg"
              alt="Hobsonville Marina masterplan — staged areas"
              width={2752}
              height={1536}
              sizes="100vw"
              className="block h-auto w-full"
            />
          </ScrollReveal>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319081312_0375_D.jpg"
        alt="Hobsonville Marina from above"
        height="min(70vh, 70dvh)"
        overlayOpacity={0.15}
      />

      <section style={{ backgroundColor: '#E4E0DC' }}>
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="mx-auto mb-[clamp(2rem,4vw,3rem)] flex max-w-[78rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Precinct Layout
            </h2>
            <p className="max-w-[60rem] font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
              An indicative arrangement of homes, walkways and shared green space along the marina edge.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <Image
              src="/floorplan_placeholders/floorplan-new.jpg"
              alt="Hobsonville Marina masterplan — precinct layout"
              width={2752}
              height={1536}
              sizes="100vw"
              className="block h-auto w-full"
            />
          </ScrollReveal>
          <ScrollReveal className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] flex max-w-[78rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Close
            </h2>
            <p className="text-balance max-w-[60rem] font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
              A location that brings together the convenience of urban connection with the calm and
              openness of a waterfront setting.
            </p>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
