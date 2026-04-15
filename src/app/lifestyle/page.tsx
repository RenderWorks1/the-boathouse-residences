import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { fullBleedLifestyleImage, coastalLivingImages, studioGallery } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Lifestyle',
  description: 'Harbourside living, marina access, dining and community at The Boathouse Residences.',
};

const sections = [
  {
    layout: 'imageRight' as const,
    heading: 'Waterfront Living',
    body: 'Life at The Boathouse is set against a constant horizon of water and sky. Linen-draped interiors open to generous terraces, where mornings begin with a coffee over the marina and evenings close with the sun drawing west across the harbour.',
    images: ['/images/2bedroom_v2.jpg'],
  },
  {
    layout: 'fullBleed' as const,
    heading: 'Marina Access',
    body: 'A private berth is steps from your front door. Step aboard for a day on the water, or watch the fleet slip out as light breaks over the breakwater.',
    images: [fullBleedLifestyleImage],
  },
  {
    layout: 'imageLeft' as const,
    heading: 'Dining & Entertainment',
    body: 'A curated ground-floor offering — a waterfront bistro, a speciality grocer, a wine room — places the best of coastal dining just beyond the lobby. Further afield, the precinct hums with boutique restaurants and a small, considered retail edit.',
    images: ['/images/studio_int_v4.jpg'],
  },
  {
    layout: 'centred' as const,
    heading: 'A Quiet Community',
    body: 'This is a small collection of residences — fewer neighbours, greater privacy, and a shared sensibility for the sea.',
    images: ['/images/2bedroom_v9.jpg'],
  },
];

export default function LifestylePage() {
  return (
    <>
      <PageHero image={fullBleedLifestyleImage} eyebrow="Experience" title="Lifestyle" />

      <div className="flex flex-col">
        {sections.map((s, i) => {
          if (s.layout === 'fullBleed') {
            return (
              <section key={i} className="relative h-[min(78vh,58vw)] w-full overflow-hidden md:h-[min(82vh,52vw)]">
                <Image src={s.images[0]} alt={s.heading} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-deep-navy/60 to-transparent section-px pb-[var(--section-pad-y)] pt-[40%]">
                  <div className="w-full max-w-none text-linen-white">
                    <h2 className="font-display font-light uppercase tracking-[0.1em] text-[clamp(1.5rem,1.2vw+1.1rem,2.75rem)]">
                      {s.heading}
                    </h2>
                    <p className="type-body mt-[clamp(0.75rem,2vw,1.25rem)] font-sans text-linen-white/95">{s.body}</p>
                  </div>
                </div>
              </section>
            );
          }

          if (s.layout === 'centred') {
            return (
              <section key={i} className="bg-salt">
                <div className="section-px section-py flex w-full max-w-none flex-col items-center gap-section text-center">
                  <ScrollReveal className="flex flex-col items-center gap-section-sm">
                    <Eyebrow>Community</Eyebrow>
                    <SectionHeading>{s.heading}</SectionHeading>
                    <p className="type-body mt-[clamp(0.35rem,1vw,0.5rem)] font-sans text-charcoal">{s.body}</p>
                  </ScrollReveal>
                  <ScrollReveal className="relative mt-[clamp(1rem,2.5vw,1.75rem)] aspect-[16/9] w-full">
                    <Image src={s.images[0]} alt={s.heading} fill sizes="100vw" className="object-cover" />
                  </ScrollReveal>
                </div>
              </section>
            );
          }

          const imgLeft = s.layout === 'imageLeft';
          return (
            <section key={i} className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              <div
                className={`section-px section-py grid w-full max-w-none items-center gap-section md:grid-cols-2 ${
                  imgLeft ? '' : 'md:[&>*:first-child]:order-2'
                }`}
              >
                <ScrollReveal direction={imgLeft ? 'left' : 'right'}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image src={s.images[0]} alt={s.heading} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction={imgLeft ? 'right' : 'left'}>
                  <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                    <Eyebrow>{s.layout === 'imageRight' ? 'Harbourside' : 'Precinct'}</Eyebrow>
                    <SectionHeading>{s.heading}</SectionHeading>
                    <p className="type-body font-sans text-charcoal">{s.body}</p>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-linen-white">
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="mb-[clamp(2.5rem,5vw,3.5rem)] text-center">
            <Eyebrow>Gallery</Eyebrow>
            <div className="mt-[clamp(0.35rem,1vw,0.5rem)]">
              <SectionHeading>Scenes of the Day</SectionHeading>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-[clamp(0.45rem,1.5vw,0.75rem)] md:grid-cols-4">
            {[...coastalLivingImages.map(s => s.src), ...studioGallery].slice(0, 12).map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <Image src={src} alt="Lifestyle" fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
