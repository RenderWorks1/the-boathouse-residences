import Image from 'next/image';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Lifestyle',
  description:
    'Life at Hobsonville Marina — waterfront living, the village, connected transport and open landscape.',
};

const sections = [
  {
    heading: 'Waterfront Living',
    body: 'The marina provides an ever-present connection to the outdoors, with walking paths, open space and uninterrupted views creating opportunities to slow down and engage with the surroundings.',
    image: '/images/2bedroom_v2.jpg',
    layout: 'left' as const,
  },
  {
    heading: 'The Village',
    body: 'A growing village centre offers a curated selection of cafés, eateries and local amenity, contributing to a community that feels established, convenient and easy to navigate.',
    image: '/images/studio_int_v4.jpg',
    layout: 'right' as const,
  },
  {
    heading: 'Connected',
    body: 'Ferry services and well-considered transport links provide direct access to the city, allowing residents to remain connected while enjoying a more relaxed waterfront lifestyle.',
    image: '/images/2bedroom_v9.jpg',
    layout: 'left' as const,
  },
  {
    heading: 'Open Landscape',
    body: 'Parks, coastal walkways and green spaces are thoughtfully integrated throughout the area, supporting an active and outdoor-oriented way of living.',
    image: '/images/2bedroom_v8.jpg',
    layout: 'right' as const,
  },
];

export default function LifestylePage() {
  return (
    <>
      <PageHero image="/images/sectionheros/BVP09149.jpg" title="Life at the Marina" />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)]">
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Life at the Marina
            </h2>
            <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
              Life at Hobsonville Marina is defined by a balance of natural beauty, community and
              connection. The presence of the water shapes the rhythm of daily life, offering a sense of
              calm that extends beyond the home.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319080743_0344_D.jpg"
        alt="Hobsonville Marina from above"
        height="min(70vh, 70dvh)"
        overlayOpacity={0.15}
      />

      {sections.map((s, i) => {
        const left = s.layout === 'left';
        const isWaterfront = s.heading === 'Waterfront Living';
        return (
          <Fragment key={s.heading}>
            <section className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              {isWaterfront ? (
                <div className="section-px section-py w-full max-w-none">
                  <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
                    <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                      {s.heading}
                    </h2>
                    <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                      {s.body}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal className="mt-[clamp(3rem,6vw,5rem)]">
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src="/images/sectionheros/BVP09128.jpg"
                        alt={`${s.heading} — marina outlook`}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                  </ScrollReveal>
                </div>
              ) : (
                <div
                  className={`section-px section-py grid w-full max-w-none items-center gap-section md:grid-cols-2 ${
                    left ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <ScrollReveal direction={left ? 'left' : 'right'}>
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.heading}
                        fill
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction={left ? 'right' : 'left'}>
                    <div className="flex flex-col gap-[clamp(1.75rem,4vw,3rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                      <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                        {s.heading}
                      </h2>
                      <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                        {s.body}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </section>
          </Fragment>
        );
      })}

      <section className="bg-salt">
        <div className="section-px section-py-tight w-full max-w-none text-center">
          <ScrollReveal className="mx-auto flex max-w-[68rem] flex-col items-center gap-section-sm">
            <p className="text-balance font-sans text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] font-light leading-[1.6] text-charcoal">
              Life at the marina moves at a considered pace, shaped by the presence of the water and the
              ease of the surrounding environment.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
