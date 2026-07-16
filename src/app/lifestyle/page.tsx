import Image from 'next/image';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Lifestyle',
  description:
    'Life at Hobsonville Marina — waterfront living, the village, connected transport and open landscape.',
};

const headingClass =
  'w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal';
const bodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';

const intro = {
  heading: 'Life Shaped by the Water.',
  body: [
    'There is a different rhythm to life at Hobsonville Point Marina.',
    'Defined by open water, changing light and a strong connection to the surrounding landscape, Boathouse Residences offers a setting where everyday moments unfold at a more considered pace.',
    'Here, the marina is more than a backdrop. It shapes the way you arrive home, spend your time and experience each day.',
  ],
};

const sections = [
  {
    heading: 'A Unique Waterfront Position.',
    body: [
      'Set along the edge of Hobsonville Point Marina, Boathouse Residences enjoys a unique relationship with the water.',
      'The movement of boats, the changing tides and uninterrupted harbour outlooks create an ever-evolving sense of place, a connection to nature that becomes part of daily life.',
      'Few Auckland addresses offer this combination of waterfront living, open space and community.',
    ],
    image: '/images/sectionheros/BVP09128.jpg',
    variant: 'feature' as const,
  },
  {
    heading: 'A Coastal Community.',
    body: [
      'Hobsonville Point has become one of Auckland’s most distinctive waterfront communities, thoughtfully shaped around connection, design and place.',
      'A village atmosphere, local cafés, restaurants, shared spaces and waterfront destinations create a neighbourhood that feels established, welcoming and effortlessly connected.',
      'A place where life extends beyond the walls of your residence.',
    ],
    image: '/images/thevillage.jpeg',
    layout: 'right' as const,
    variant: 'split' as const,
  },
  {
    heading: 'Waterfront Calm. City Convenience.',
    body: [
      'While the marina offers a sense of retreat, Boathouse Residences remains connected to everything Auckland has to offer.',
      'With ferry services, established transport links and easy access to the city, airport and surrounding destinations, residents can enjoy the best of both worlds, a peaceful waterfront setting with effortless connectivity.',
    ],
    image: '/images/newdock.jpeg',
    layout: 'left' as const,
    variant: 'split' as const,
  },
  {
    heading: 'Space to Breathe.',
    body: [
      'Beyond the marina, coastal walkways, parks and open landscapes provide a natural extension of home.',
      'Whether walking beside the water, exploring the coastline or simply enjoying the changing seasons, the surrounding environment encourages a more considered way of living.',
    ],
    image: '/images/openlandscape.jpeg',
    layout: 'right' as const,
    variant: 'split' as const,
  },
];

export default function LifestylePage() {
  return (
    <>
      <PageHero
        image="/hero-videos/residences-poster.jpg"
        title="Life at the Marina"
        videoUrl="/hero-videos/residences.mp4"
      />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.75rem,4vw,3rem)] md:items-center">
            <h2 className={headingClass}>{intro.heading}</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              {intro.body.map((p, i) => (
                <p key={i} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
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
        return (
          <Fragment key={s.heading}>
            <section className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              {s.variant === 'feature' ? (
                <div className="section-px section-py w-full max-w-none">
                  <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col items-start gap-[clamp(1.75rem,4vw,3rem)] text-left md:items-center md:text-center">
                    <h2 className={headingClass}>{s.heading}</h2>
                    <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                      {s.body.map((p, j) => (
                        <p key={j} className={bodyClass}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </ScrollReveal>
                  <ScrollReveal className="mt-[clamp(3rem,6vw,5rem)]">
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src={s.image}
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
                    <div className="group relative h-[min(55vh,55dvh)] w-full overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.heading}
                        fill
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction={left ? 'right' : 'left'}>
                    <div className="flex flex-col gap-[clamp(1.75rem,4vw,3rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                      <h2 className={`${headingClass} md:text-left`}>{s.heading}</h2>
                      <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                        {s.body.map((p, j) => (
                          <p key={j} className={bodyClass}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </section>
          </Fragment>
        );
      })}

      <section className="bg-salt">
        <div className="section-px pt-[var(--section-pad-y)] w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] md:items-center">
            <h2 className={headingClass}>Enquire Now</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={bodyClass}>
                Discover Boathouse Residences — an address shaped by thoughtful design, a remarkable
                waterfront setting and a connection to the water that will endure.
              </p>
              <p className={bodyClass}>Our sales team will welcome you to arrange a private viewing.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <EnquiryForm hideIntro />
    </>
  );
}
