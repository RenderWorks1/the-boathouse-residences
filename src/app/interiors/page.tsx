import Image from 'next/image';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ScrollReveal, ScrollLinkedSlide } from '@/components/ui/ScrollReveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export const metadata: Metadata = {
  title: 'Interiors',
  description:
    'A refined interior palette of natural, muted tones — calm, balanced and connected to the marina.',
};

const schemes = [
  {
    eyebrow: 'Light Scheme',
    heading: 'Light Scheme',
    body: 'Warm and natural tones invoke a calm interior, a place of retreat set back from the Marina. Maintaining a visually refined palette these gentle oak, warm white and caramel tones create a peaceful flow throughout the home. An interior that mirrors the feeling and the inner-calm of nature.',
    images: ['/images/studio_int_v3.jpg', '/images/studio_int_v5.jpg'] as const,
  },
  {
    eyebrow: 'Dark Scheme',
    heading: 'Dark Scheme',
    body: 'A deeper, more grounded palette creates a calm and enveloping interior, offering a sense of retreat connected to the Marina. Maintaining a refined and cohesive palette, layered neutrals, rich timber finishes and warm textural elements bring depth and quiet sophistication throughout the home. An interior that reflects the stillness and depth of the water — composed, balanced and enduring.',
    images: ['/images/2bedroom_v3_.jpg', '/images/2bedroom_v7.jpg'] as const,
  },
];

export default function InteriorsPage() {
  return (
    <>
      <PageHero
        image="/images/studio_int_v2.jpg"
        videoUrl="/interiorvideo.mp4"
        title="A Refined Interior Palette"
      />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-[clamp(2.75rem,6vw,4.5rem)]">
            <ScrollLinkedSlide from="left" distance={220} range={['start end', 'end center']} className="self-start max-w-[72rem]">
              <h2 className="text-left font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                A Refined Interior Palette
              </h2>
            </ScrollLinkedSlide>
            <ScrollLinkedSlide from="right" distance={220} range={['start end', 'end center']} className="self-end max-w-[72rem]">
              <p className="text-balance text-right font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                Interiors are defined by simplicity and precision, with a palette of natural, muted tones
                that blend seamlessly with the surrounding landscape and reflect the tranquillity of the
                marina setting. Each space is carefully composed to feel balanced, creating a quiet sense of
                retreat within the home.
              </p>
            </ScrollLinkedSlide>
            <ScrollLinkedSlide from="left" distance={220} range={['start end', 'end center']} className="self-start max-w-[72rem]">
              <p className="text-balance text-left font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                Living spaces open seamlessly to private decks, framing water and sky as part of the
                everyday. Kitchens are defined by clean detailing and refined finishes, while bedrooms offer
                a sense of privacy and calm.
              </p>
            </ScrollLinkedSlide>
            <ScrollLinkedSlide from="right" distance={220} range={['start end', 'end center']} className="self-end max-w-[72rem]">
              <p className="text-balance text-right font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                A curated material palette, selected for its quality and longevity, introduces depth and
                texture while maintaining a restrained and elevated interior environment.
              </p>
            </ScrollLinkedSlide>
          </div>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319080823_0349_D.jpg"
        alt="Hobsonville Marina at the water's edge"
        height="min(70vh, 70dvh)"
        overlayOpacity={0.15}
      />

      {schemes.map((s, i) => {
        return (
          <Fragment key={s.eyebrow}>
            <section className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              <div className="section-px section-py w-full max-w-none">
                <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
                  <h2 className="w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                    {s.heading}
                  </h2>
                  <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal">
                    {s.body}
                  </p>
                  <p className="font-sans uppercase tracking-[0.3em] text-rope text-[clamp(0.65rem,0.22vw+0.55rem,0.78rem)]">
                    Name to be confirmed
                  </p>
                </ScrollReveal>
                <div className="mx-auto mt-[clamp(5rem,9vw,8rem)] grid w-full max-w-[68rem] grid-cols-1 gap-[clamp(2.5rem,6vw,5rem)] px-[clamp(1rem,4vw,3rem)] md:grid-cols-2">
                  <ScrollReveal direction="left">
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src={s.images[0]}
                        alt={`${s.heading} — view one`}
                        fill
                        sizes="(min-width:768px) 34vw, 90vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction="right">
                    <div className="group relative h-[min(75vh,75dvh)] w-full overflow-hidden">
                      <Image
                        src={s.images[1]}
                        alt={`${s.heading} — view two`}
                        fill
                        sizes="(min-width:768px) 34vw, 90vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          </Fragment>
        );
      })}

      <section className="bg-salt">
        <div className="section-py w-full max-w-none">
          <ImageCarousel
            slides={[
              { src: '/images/studio_int_v1.jpg', alt: 'Studio interior render' },
              { src: '/images/studio_int_v3.jpg', alt: 'Studio living detail' },
              { src: '/images/studio_int_v4.jpg', alt: 'Studio outlook' },
              { src: '/images/studio_int_v5.jpg', alt: 'Studio kitchen' },
              { src: '/images/2bedroom_v3_.jpg', alt: 'Two-bedroom living' },
              { src: '/images/2bedroom_v7.jpg', alt: 'Two-bedroom interior' },
              { src: '/images/2bedroom_v9.jpg', alt: 'Two-bedroom outlook' },
              { src: '/images/2bedroom_v10_.jpg', alt: 'Two-bedroom detail' },
            ]}
          />
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px section-py-tight w-full max-w-none text-center">
          <ScrollReveal className="mx-auto flex max-w-[68rem] flex-col items-center gap-section-sm">
            <p className="text-balance font-sans text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] font-light leading-[1.6] text-charcoal">
              Every element is carefully considered, resulting in interiors that provide a timeless and
              understated backdrop to life by the water.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px pb-[var(--section-pad-y)] w-full max-w-none">
          <div className="mx-auto grid w-full max-w-[78rem] grid-cols-1 gap-[clamp(1.5rem,3.5vw,2.5rem)] md:grid-cols-3">
            {[
              { src: '/images/finish1.jpeg', alt: 'Material finish — sample one' },
              { src: '/images/finish2.jpeg', alt: 'Material finish — sample two' },
              { src: '/images/finish3.jpeg', alt: 'Material finish — sample three' },
            ].map((f, i) => (
              <ScrollReveal
                key={f.src}
                direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
                delay={i * 0.08}
              >
                <div className="group relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(min-width:768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
