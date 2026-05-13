import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ScrollReveal, ScrollLinkedSlide } from '@/components/ui/ScrollReveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'The Residences',
  description:
    'A limited collection of studio, one and two bedroom homes along the edge of Hobsonville Marina.',
};

type SlideDirection = 'left' | 'right';

const residenceTypes: Array<{
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  layout: 'left' | 'right';
  slideFrom?: SlideDirection;
}> = [
  {
    eyebrow: 'Studio',
    heading: 'Intelligent Living',
    body: 'The studio residences are thoughtfully designed to maximise space, light and functionality. Open-plan layouts create a seamless relationship between living, kitchen and outdoor areas, while carefully resolved detailing introduces a sense of quiet refinement. The result is a home that feels efficient in scale, yet generous in experience.',
    image: '/images/studio_int_v1.jpg',
    layout: 'left',
    slideFrom: 'left',
  },
  {
    eyebrow: 'One Bedroom',
    heading: 'Balanced by Design',
    body: 'One bedroom residences offer a natural balance of openness and retreat. Living areas extend effortlessly to private decks, drawing in natural light and the presence of the marina, while bedrooms are positioned to provide privacy and a sense of calm. Each home supports a relaxed, considered way of living by the water.',
    image: '/images/studio_int_v4.jpg',
    layout: 'right',
    slideFrom: 'right',
  },
  {
    eyebrow: 'Two Bedroom',
    heading: 'Elevated in Scale',
    body: 'Two bedroom residences offer an increased sense of scale, with well-proportioned living areas that extend naturally toward the marina. Layouts are carefully arranged to balance openness with privacy, creating homes that feel calm, flexible and exclusively connected to their waterfront setting.',
    image: '/images/2bedroom_v7.jpg',
    layout: 'left',
  },
];

const residenceEyebrowClass =
  'font-sans uppercase tracking-[0.32em] text-harbour text-[clamp(0.875rem,0.35vw+0.78rem,1.05rem)]';

export default function ResidencesPage() {
  return (
    <>
      <PageHero
        image="/hero-videos/residences-poster.jpg"
        title="A Collection by the Water"
        videoUrl="/hero-videos/residences.mp4"
      />

      <section className="bg-salt">
        <div className="section-px section-py mx-auto w-full max-w-[80rem]">
          <ScrollReveal className="flex max-w-[78rem] flex-col items-start text-left">
            <h2 className="mb-[clamp(1.35rem,3vw,2.35rem)] w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              A Collection by the Water
            </h2>
            <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal max-w-[60rem]">
              The Boathouse Residences invites a limited collection of studio, one and two bedroom homes,
              thoughtfully positioned along the edge of the Hobsonville Marina. Each residence is designed
              to capture light, outlook and a direct connection to the water, resulting in homes that feel
              calm, refined and enduring.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {residenceTypes.map((r, i) => {
        const left = r.layout === 'left';
        const isElevated = r.heading === 'Elevated in Scale';
        return (
          <Fragment key={r.heading}>
            {isElevated && (
              <ParallaxSection
                image="/images/sectionheros/DJI_20260319081558_0392_D.jpg"
                alt="Hobsonville Marina from above"
                height="min(70vh, 70dvh)"
                overlayOpacity={0.2}
              />
            )}
            <section className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              {isElevated ? (
                <div className="section-px section-py mx-auto w-full max-w-[80rem]">
                  <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
                    <span className={residenceEyebrowClass}>{r.eyebrow}</span>
                    <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                      {r.heading}
                    </h2>
                    <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                      {r.body}
                    </p>
                  </ScrollReveal>
                  <div className="mx-auto mt-[clamp(5rem,9vw,8rem)] grid w-full max-w-[68rem] grid-cols-1 gap-[clamp(2.5rem,6vw,5rem)] px-[clamp(1rem,4vw,3rem)] md:grid-cols-2">
                    <ScrollLinkedSlide from="bottom" distance={220}>
                      <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                        <Image
                          src={r.image}
                          alt={`${r.heading} — interior`}
                          fill
                          sizes="(min-width:768px) 34vw, 90vw"
                          className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                        />
                      </div>
                    </ScrollLinkedSlide>
                    <ScrollLinkedSlide from="bottom" distance={220}>
                      <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                        <Image
                          src="/images/2bedroom_v9.jpg"
                          alt={`${r.heading} — outlook`}
                          fill
                          sizes="(min-width:768px) 34vw, 90vw"
                          className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                        />
                      </div>
                    </ScrollLinkedSlide>
                  </div>
                </div>
              ) : r.slideFrom ? (
                <ScrollLinkedSlide from={r.slideFrom} distance={260}>
                  <div
                    className={`section-px section-py mx-auto grid w-full max-w-[80rem] items-center gap-section md:grid-cols-2 ${
                      left ? '' : 'md:[&>*:first-child]:order-2'
                    }`}
                  >
                    <div className="group relative h-[min(60vh,60dvh)] w-full overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.heading}
                        fill
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-col gap-[clamp(1.75rem,4vw,3rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                      <span className={residenceEyebrowClass}>{r.eyebrow}</span>
                      <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                        {r.heading}
                      </h2>
                      <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                        {r.body}
                      </p>
                    </div>
                  </div>
                </ScrollLinkedSlide>
              ) : (
                <div
                  className={`section-px section-py mx-auto grid w-full max-w-[80rem] items-center gap-section md:grid-cols-2 ${
                    left ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <ScrollReveal direction={left ? 'left' : 'right'}>
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.heading}
                        fill
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction={left ? 'right' : 'left'}>
                    <div className="flex flex-col gap-[clamp(1.75rem,4vw,3rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                      <span className={residenceEyebrowClass}>{r.eyebrow}</span>
                      <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                        {r.heading}
                      </h2>
                      <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                        {r.body}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </section>
          </Fragment>
        );
      })}

      <section className="bg-linen-white">
        <div className="section-py w-full max-w-none">
          <ScrollReveal className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex max-w-[78rem] flex-col items-center gap-[clamp(1rem,2vw,1.5rem)] px-[var(--section-pad-x)] text-center">
            <span className={residenceEyebrowClass}>Floor Plans</span>
            <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Indicative Layouts
            </h2>
          </ScrollReveal>
          <ImageCarousel
            variant="landscape"
            slides={[
              {
                src: '/floorplan_placeholders/floorplan-new.jpg',
                alt: 'Studio floor plan',
                label: 'Studio',
              },
              {
                src: '/floorplan_placeholders/floorplan-new.jpg',
                alt: 'One bedroom floor plan',
                label: 'One Bedroom',
              },
              {
                src: '/floorplan_placeholders/floorplan-new.jpg',
                alt: 'Two bedroom floor plan',
                label: 'Two Bedroom',
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px section-py-tight mx-auto w-full max-w-[80rem] text-center">
          <ScrollReveal className="mx-auto flex max-w-[68rem] flex-col items-center gap-section-sm">
            <p className="text-balance font-sans text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] font-light leading-[1.6] text-charcoal">
              Across every residence, materials are refined, proportions are balanced, and natural light
              is central to the design, shaping homes that feel calm, enduring and uniquely connected to
              the marina.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
