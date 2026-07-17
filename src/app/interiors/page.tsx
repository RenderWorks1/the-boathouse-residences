import Image from 'next/image';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export const metadata: Metadata = {
  title: 'Interiors',
  description:
    'A refined interior palette of natural, muted tones — calm, balanced and connected to the marina.',
};

const headingClass =
  'w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal';
const bodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';
const eyebrowClass =
  'font-sans uppercase tracking-[0.3em] text-rope text-[clamp(0.65rem,0.22vw+0.55rem,0.78rem)]';

const paletteBody = [
  'The interiors are defined by a sense of balance, restraint and quiet sophistication.',
  'A carefully curated palette of natural tones and refined materials has been selected to complement the coastal surroundings, creating spaces that feel warm, considered and timeless.',
  'Soft textures, subtle tonal variation and beautifully resolved detailing bring depth and character throughout each residence, allowing the changing light, water and landscape beyond to remain the defining elements.',
  'Living spaces extend seamlessly to private decks, framing the marina as an ever-changing part of the home. Kitchens are designed with clean lines and refined finishes, while bedrooms offer a sense of calm, privacy and retreat.',
  'A commitment to quality, longevity and thoughtful design ensures each interior feels enduring rather than defined by passing trends.',
];

const materialityBody = [
  'Every material has been selected with intention chosen not only for its beauty, but for its ability to age gracefully and endure over time.',
  'Natural textures, refined finishes and carefully considered details create interiors that feel authentic, tactile and beautifully resolved.',
  'The result is a timeless foundation for living, where architecture, interiors and the surrounding waterfront setting exist in harmony.',
];

const schemes = [
  {
    eyebrow: 'The Light Palette (Sand)',
    heading: 'Softness in Simplicity.',
    body: [
      'Inspired by the natural warmth of the coastline, the Light Palette creates a calm and inviting interior environment.',
      'Gentle oak tones, warm whites and subtle caramel hues establish a sense of continuity throughout the residence, creating spaces that feel light, balanced and effortlessly connected.',
      'Designed as a retreat from the outside world, this palette reflects the quiet beauty of the marina, a place of warmth, ease and natural tranquillity.',
    ],
    image: '/images/lighttheme.jpg',
  },
  {
    eyebrow: 'The Dark Palette (Tide)',
    heading: 'Depth and Stillness.',
    body: [
      'A more grounded interpretation of waterfront living, the Dark Palette draws inspiration from the depth and stillness of the harbour.',
      'Layered neutrals, rich timber finishes and tactile textures create interiors with a sense of warmth, sophistication and quiet confidence.',
      'Balanced and enduring, this palette offers a deeper expression of the Boathouse Residences design philosophy, refined, composed and connected to the natural environment.',
    ],
    image: '/images/darktheme.jpg',
  },
];

export default function InteriorsPage() {
  return (
    <>
      <PageHero
        image="/hero-videos/InteriorDesign-poster.jpg"
        videoUrl="/hero-videos/InteriorDesign.mp4"
        title="A Refined Interior Palette"
      />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-[clamp(2.75rem,6vw,4.5rem)]">
            <ScrollReveal fadeOnly className="self-start max-w-[72rem]">
              <h2 className="text-left font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                Designed Around the Surrounds.
              </h2>
            </ScrollReveal>
            <ScrollReveal fadeOnly className="self-end max-w-[72rem]">
              <p className="text-balance text-right font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                The interiors of Boathouse Residences have been thoughtfully curated by Paula Herbert
                Studio, guided by a philosophy of timeless design, natural materiality and understated
                refinement.
              </p>
            </ScrollReveal>
            <ScrollReveal fadeOnly className="self-start max-w-[72rem]">
              <p className="text-balance text-left font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                Inspired by the surrounding marina environment, each residence reflects a considered
                balance between warmth, texture and simplicity, creating spaces that feel calm, enduring
                and deeply connected to their waterfront setting.
              </p>
            </ScrollReveal>
            <ScrollReveal fadeOnly className="self-end max-w-[72rem]">
              <p className="text-balance text-right font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal">
                Every detail has been carefully resolved. From the tactile quality of natural finishes to
                the relationship between light, space and outlook, the interiors provide a refined
                backdrop for life by the water.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319080823_0349_D.jpg"
        alt="Hobsonville Marina at the water's edge"
        height="min(70vh, 70dvh)"
        overlayOpacity={0.15}
      />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] md:items-center">
            <p className={`w-full text-center ${eyebrowClass}`}>A Refined Interior Palette</p>
            <h2 className={headingClass}>Thoughtful Simplicity.</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              {paletteBody.map((p, i) => (
                <p key={i} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {schemes.map((s, i) => {
        return (
          <Fragment key={s.eyebrow}>
            <section className={i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}>
              <div className="section-px section-py w-full max-w-none">
                <ScrollReveal className="mx-auto flex max-w-[44rem] flex-col items-start gap-[clamp(1.25rem,3vw,2rem)] text-left md:items-center md:text-center">
                  <p className={`w-full text-center ${eyebrowClass}`}>{s.eyebrow}</p>
                  <h2 className={headingClass}>{s.heading}</h2>
                  <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                    {s.body.map((p, j) => (
                      <p key={j} className={bodyClass}>
                        {p}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
                <div className="mx-auto mt-[clamp(5rem,9vw,8rem)] w-full max-w-[42rem]">
                  <ScrollReveal>
                    <div className="group relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.heading}
                        fill
                        sizes="(min-width:768px) 72rem, 90vw"
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
            portraitItemClassName="relative aspect-[4/5] w-[90vw] overflow-hidden rounded-sm md:w-[min(28.4vw,24.3rem)]"
            slides={[
              { src: '/images/final-renders/studio/interiorlounge_portrait.jpg', alt: 'Studio lounge' },
              { src: '/images/final-renders/studio/kitchen_portrait.jpg', alt: 'Studio kitchen' },
              { src: '/images/final-renders/studio/bathroom_portrait.jpg', alt: 'Studio bathroom' },
              { src: '/images/final-renders/studio/bedroom_portrait.jpg', alt: 'Studio bedroom' },
              { src: '/images/final-renders/2bedroom/living_portrait.jpg', alt: 'Two-bedroom living' },
              { src: '/images/final-renders/2bedroom/dining_portrait.jpg', alt: 'Two-bedroom dining' },
              { src: '/images/final-renders/2bedroom/bedroom_portrait.jpg', alt: 'Two-bedroom bedroom' },
              { src: '/images/final-renders/2bedroom/exteriordeck_portrait.jpg', alt: 'Two-bedroom deck' },
            ]}
          />
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] text-left md:items-center md:text-center">
            <h2 className={headingClass}>Crafted Through Detail.</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              {materialityBody.map((p, i) => (
                <p key={i} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] grid w-full max-w-[78rem] grid-cols-1 gap-[clamp(1.5rem,3.5vw,2.5rem)] md:grid-cols-3">
            {[
              { src: '/images/closeup2.jpeg', alt: 'Kitchen detail — timber joinery and stone benchtop' },
              { src: '/images/closeup3.jpeg', alt: 'Oak table detail on a textured rug' },
              { src: '/images/closeup4.jpeg', alt: 'Bathroom detail — fluted timber vanity and basin' },
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

      <section className="bg-linen-white">
        <div className="section-px section-py w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(0.85rem,2vw,1.35rem)] md:items-center">
            <p className="text-balance font-sans text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] font-light leading-[1.5] text-charcoal">
              Every element within Boathouse Residences has been thoughtfully considered, creating
              interiors that are refined yet effortless a timeless expression of life beside the water.
            </p>
            <p className="text-balance font-sans text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] font-light leading-[1.5] text-charcoal">
              Spaces designed not to compete with their surroundings, but to celebrate them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px pt-[var(--section-pad-y)] w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] md:items-center">
            <h2 className={headingClass}>Enquire Now</h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={bodyClass}>
                Discover Boathouse Residences where considered architecture, refined interiors and
                waterfront living come together in perfect balance.
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
