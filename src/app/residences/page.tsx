import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal, ScrollLinkedSlide } from '@/components/ui/ScrollReveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'The Residences',
  description:
    'A limited collection of studio, one and two bedroom homes along the edge of Hobsonville Marina.',
};

type SlideDirection = 'left' | 'right';
type CarouselSlide = { src: string; alt: string };

const studioRenders: CarouselSlide[] = [
  { src: '/images/final-renders/studio/kitchen_landscape.jpg', alt: 'Studio kitchen' },
  { src: '/images/final-renders/studio/interiorlounge_portrait.jpg', alt: 'Studio lounge' },
  { src: '/images/final-renders/studio/interiordining_portrait.jpg', alt: 'Studio dining' },
  { src: '/images/final-renders/studio/kitchen_portrait.jpg', alt: 'Studio kitchen detail' },
  { src: '/images/final-renders/studio/bedroom_portrait.jpg', alt: 'Studio bedroom' },
  { src: '/images/final-renders/studio/bathroom_portrait.jpg', alt: 'Studio bathroom' },
  { src: '/images/final-renders/studio/exteriordeckdaytime_portrait.jpg', alt: 'Studio deck by day' },
  { src: '/images/final-renders/studio/bedroom_landscape.jpg', alt: 'Studio bedroom outlook' },
];

const twoBedroomRenders: CarouselSlide[] = [
  { src: '/images/final-renders/2bedroom/living_portrait.jpg', alt: 'Two-bedroom living' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait.jpg', alt: 'Two-bedroom bedroom' },
  { src: '/images/final-renders/2bedroom/dining_portrait.jpg', alt: 'Two-bedroom dining' },
  { src: '/images/final-renders/2bedroom/bathroom_portrait.jpg', alt: 'Two-bedroom bathroom' },
  { src: '/images/final-renders/2bedroom/living_portrait2.jpg', alt: 'Two-bedroom living detail' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait2.jpg', alt: 'Two-bedroom second bedroom' },
  { src: '/images/final-renders/2bedroom/bedroom_portrait3.jpg', alt: 'Two-bedroom bedroom view' },
  { src: '/images/final-renders/2bedroom/exteriorday_portrait2.jpg', alt: 'Two-bedroom exterior' },
  { src: '/images/final-renders/2bedroom/exteriornight_portrait2.jpg', alt: 'Two-bedroom marina outlook at night' },
];

const residenceTypes: Array<{
  eyebrow: string;
  heading: string;
  body: string[];
  image?: string;
  layout: 'left' | 'right';
  slideFrom?: SlideDirection;
  elevated?: boolean;
  carousel?: CarouselSlide[];
}> = [
  {
    eyebrow: 'Studio',
    heading: 'Considered in Every Detail.',
    body: [
      'Designed with purpose and precision, the Studio Residences make the most of every element.',
      'Open-plan interiors create a seamless flow between living, kitchen and outdoor spaces, while carefully considered detailing and a refined material palette bring a sense of warmth and sophistication.',
      'Thoughtfully designed for modern waterfront living, each residence offers a beautifully balanced experience where simplicity meets functionality.',
    ],
    layout: 'left',
    carousel: studioRenders,
  },
  {
    eyebrow: 'One Bedroom',
    heading: 'Balanced by Design.',
    body: [
      'Offering a natural balance of openness and retreat, the One Bedroom Residences have been designed around the way people want to reside.',
      'Living spaces extend effortlessly towards private outdoor areas, drawing in natural light and uninterrupted marina outlooks, while carefully positioned bedrooms provide a sense of privacy and calm.',
      'Every element has been considered to create a residence that feels refined, relaxed and connected to the water beyond.',
    ],
    image: '/images/final-renders/studio/exteriordeckdaytime_portrait.jpg',
    layout: 'right',
    slideFrom: 'right',
  },
  {
    eyebrow: 'Two Bedroom',
    heading: 'Elevated in Scale.',
    body: [
      'The Two Bedroom Residences offer a heightened sense of space, proportion and connection.',
      'Generous living areas extend naturally towards the marina, creating a seamless relationship between indoors and out, while considered layouts balance openness with privacy.',
      'Designed for those seeking greater flexibility and a deeper connection to the waterfront, these residences offer an elevated expression of life by the water.',
    ],
    layout: 'left',
    elevated: true,
    carousel: twoBedroomRenders,
  },
];

const residenceEyebrowClass =
  'font-sans uppercase tracking-[0.32em] text-harbour text-[clamp(0.875rem,0.35vw+0.78rem,1.05rem)]';
const bodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
      {items.map((p, i) => (
        <p key={i} className={bodyClass}>
          {p}
        </p>
      ))}
    </div>
  );
}

export default function ResidencesPage() {
  return (
    <>
      <PageHero
        image="/hero-videos/BHRtrimmed-poster.jpg"
        title="A Collection by the Water"
        videoUrl="/hero-videos/BHRtrimmed.mp4"
      />

      <section className="bg-salt">
        <div className="section-px section-py mx-auto w-full max-w-[80rem]">
          <ScrollReveal className="flex max-w-[78rem] flex-col items-start text-left">
            {/* h1: the page's first heading, so it carries the page. */}
            <h1 className="mb-[clamp(1.35rem,3vw,2.35rem)] w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal md:text-left">
              A Collection by the Water.
            </h1>
            <div className="max-w-[60rem]">
              <Paragraphs
                items={[
                  'A considered collection of Studio, One Bedroom and Two Bedroom residences, thoughtfully positioned along the edge of Hobsonville Marina.',
                  'Designed to embrace light, outlook and connection to the water, each residence reflects a commitment to timeless design, refined detailing and the art of considered living.',
                  'From intimate retreats to more generous waterfront residences, every space has been carefully resolved to create a sense of calm, comfort and enduring quality.',
                ]}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {residenceTypes.map((r, i) => {
        const left = r.layout === 'left';
        const isElevated = r.elevated === true;
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
            <section className={`overflow-x-clip ${i % 2 === 0 ? 'bg-linen-white' : 'bg-sand'}`}>
              {r.carousel ? (
                <div className="section-py w-full max-w-none">
                  <ScrollReveal className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex max-w-[44rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] px-[var(--section-pad-x)] text-left md:items-center md:text-center">
                    <span className={`self-center text-center ${residenceEyebrowClass}`}>{r.eyebrow}</span>
                    <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                      {r.heading}
                    </h2>
                    <Paragraphs items={r.body} />
                  </ScrollReveal>
                  <ImageCarousel
                    slides={r.carousel}
                    portraitItemClassName="relative aspect-[4/5] w-[min(78vw,34rem)] overflow-hidden rounded-sm md:aspect-[3/4] md:w-[min(30vw,26rem)]"
                  />
                </div>
              ) : r.slideFrom && r.image ? (
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
                      <span className={`text-center md:text-left ${residenceEyebrowClass}`}>{r.eyebrow}</span>
                      <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal md:text-left">
                        {r.heading}
                      </h2>
                      <Paragraphs items={r.body} />
                    </div>
                  </div>
                </ScrollLinkedSlide>
              ) : null}
            </section>
          </Fragment>
        );
      })}

      <section className="bg-linen-white">
        <div className="section-py w-full max-w-none">
          <ScrollReveal className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex max-w-[78rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] px-[var(--section-pad-x)] text-left md:items-center md:text-center">
            <span className={`self-center text-center ${residenceEyebrowClass}`}>Floor Plans</span>
            <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Considered Layouts.
            </h2>
            <div className="max-w-[52rem]">
              <Paragraphs
                items={[
                  'Every residence has been thoughtfully planned to maximise natural light, functionality and connection to the surrounding environment.',
                  'Explore the considered layouts and discover a residence designed around the way you want to live.',
                ]}
              />
            </div>
          </ScrollReveal>
          <ImageCarousel
            variant="landscape"
            slides={[
              {
                src: '/floorplans/studio-fp.jpg',
                alt: 'Studio floor plan',
                label: 'Studio',
              },
              {
                src: '/floorplans/one-bed-fp.jpg',
                alt: 'One bedroom floor plan',
                label: 'One Bedroom',
              },
              {
                src: '/floorplans/two-bed-fp.jpg',
                alt: 'Two bedroom floor plan',
                label: 'Two Bedroom',
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px section-py mx-auto w-full max-w-[80rem] text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(0.85rem,2vw,1.35rem)] md:items-center">
            <p className="text-balance font-sans text-[clamp(0.95rem,0.4vw+0.82rem,1.2rem)] font-light leading-[1.6] text-charcoal">
              Across every residence, thoughtful proportions, refined materials and natural light come
              together to create spaces that feel timeless, considered and deeply connected to the marina.
            </p>
            <p className="text-balance font-sans text-[clamp(0.95rem,0.4vw+0.82rem,1.2rem)] font-light leading-[1.6] text-charcoal">
              A new address on the water, designed to be experienced.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px pt-[var(--section-pad-y)] w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] md:items-center">
            <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Enquire Now
            </h2>
            <div className="max-w-[52rem]">
              <Paragraphs
                items={[
                  'Our sales team will welcome you to Boathouse Residences and provide further information about this unique waterfront collection.',
                ]}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
      <EnquiryForm hideIntro />
    </>
  );
}
