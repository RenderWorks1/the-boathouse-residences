import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Vision',
  description: 'The architectural philosophy, materials and craft behind The Boathouse Residences.',
};

const sections = [
  {
    heading: 'Architectural Philosophy',
    body: 'A careful response to site and sea — low horizontal lines, deep eaves, and a rhythm of timber screens that shelter the façade through the day. Every residence is oriented to catch the harbour light and the easterly breeze.',
    image: '/images/2bedroom_v3_.jpg',
    layout: 'left' as const,
  },
  {
    heading: 'Materials & Finishes',
    body: 'Travertine floors, tumbled limestone benchtops, oiled oak joinery, plaster walls washed in natural pigment. The palette is warm and quiet, chosen to soften with age and reflect the tones of the shoreline outside.',
    image: '/images/studio_int_v2.jpg',
    layout: 'right' as const,
  },
  {
    heading: 'Indoor-Outdoor Integration',
    body: 'Full-height sliding walls retract to open entire living rooms to the terrace. Outdoor kitchens, deep covered loggias and private plunge pools extend the home to the edge of the view.',
    image: '/images/2bedroom_v10_.jpg',
    layout: 'left' as const,
  },
  {
    heading: 'A Considered Sustainability',
    body: 'Cross-flow ventilation, high-performance glazing, rooftop solar and harvested greywater work quietly behind the scenes. Comfort by design, not by appliance.',
    image: '/images/studio_int_v7.jpg',
    layout: 'right' as const,
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHero image="/images/2bedroom_v6.jpg" eyebrow="Design Story" title="Vision" />

      {sections.map((s, i) => {
        const left = s.layout === 'left';
        return (
          <section key={i} className={i % 2 === 0 ? 'bg-salt' : 'bg-linen-white'}>
            <div
              className={`section-px section-py grid w-full max-w-none items-center gap-section md:grid-cols-2 ${
                left ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              <ScrollReveal direction={left ? 'left' : 'right'}>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image src={s.image} alt={s.heading} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
              </ScrollReveal>
              <ScrollReveal direction={left ? 'right' : 'left'}>
                <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)] md:px-[clamp(0.5rem,2vw,1.5rem)]">
                  <Eyebrow>Design</Eyebrow>
                  <SectionHeading>{s.heading}</SectionHeading>
                  <p className="type-body font-sans text-charcoal">{s.body}</p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      <section className="bg-sand">
        <div className="section-px section-py w-full max-w-none text-center">
          <ScrollReveal className="flex flex-col items-center gap-[clamp(1rem,2.5vw,1.75rem)]">
            <Eyebrow>Explore</Eyebrow>
            <SectionHeading>See the Residences</SectionHeading>
            <p className="type-body font-sans text-charcoal">
              A considered collection of one, two and three bedroom homes. View available floorplans, pricing and statuses.
            </p>
            <div className="mt-2">
              <LinkButton href="/residences">Explore Residences</LinkButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
