import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Vision',
  description:
    'A disciplined design vision shaped by Hobsonville Marina — composed, enduring and naturally aligned with its setting.',
};

const visionSectionTitleClass =
  'mb-[clamp(1.35rem,3vw,2.35rem)] w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.75rem)] font-normal leading-[1.15] tracking-tight text-charcoal';
const visionSectionBodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';

export default function VisionPage() {
  return (
    <>
      <PageHero image="/images/sectionheros/DJI_20260319080713_0341_D.jpg" title="A Clear Vision" />

      <section className="bg-salt">
        <div className="section-px section-py w-full max-w-none">
          <ScrollReveal className="flex max-w-[78rem] flex-col items-start text-left">
            <h2 className="mb-[clamp(1.35rem,3vw,2.35rem)] w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              A Clear Vision
            </h2>
            <p className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal max-w-[60rem]">
              Boathouse Residences is guided by a disciplined design vision, with architecture that
              responds directly to its marina setting. Through careful attention to form, proportion and
              materiality, the result is a collection of homes that feel composed, enduring and naturally
              aligned with the marina.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-linen-white">
        <div className="section-px section-py grid w-full max-w-none items-center gap-section md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="group relative h-[min(75vh,75dvh)] w-full min-h-0 overflow-hidden">
              <Image
                src="/images/2bedroom_v3_.jpg"
                alt="Simon and Paula — a shared vision"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="flex flex-col md:px-[clamp(0.5rem,2vw,1.5rem)]">
              <h2 className={visionSectionTitleClass}>
                A Shared Vision
              </h2>
              <p className={visionSectionBodyClass}>
                Simon and Paula bring a considered and disciplined approach to the development, with a
                focus on creating homes that prioritise longevity, functionality and design integrity.
                Their vision centres on delivering residences that feel resolved and balanced, with an
                emphasis on quality, restraint and lasting value.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319081312_0375_D.jpg"
        alt="The marina from above"
        height="min(75vh, 75dvh)"
        overlayOpacity={0.15}
      />

      <section className="bg-sand">
        <div className="section-px section-py grid w-full max-w-none items-center gap-section md:grid-cols-2 md:[&>*:first-child]:order-2">
          <ScrollReveal direction="right">
            <div className="group relative h-[min(75vh,75dvh)] w-full min-h-0 overflow-hidden">
              <Image
                src="/images/2bedroom_v10_.jpg"
                alt="Design philosophy shaped by the marina"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <div className="flex flex-col md:px-[clamp(0.5rem,2vw,1.5rem)]">
              <h2 className={visionSectionTitleClass}>
                Shaped by the Marina
              </h2>
              <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                <p className={visionSectionBodyClass}>
                  The design of Boathouse Residences is informed by its position alongside Hobsonville
                  Marina, with a strong emphasis on light, outlook and spatial flow. Materials reflect the
                  surrounding coastal environment, while architectural forms are carefully composed to sit
                  comfortably within their context.
                </p>
                <p className={visionSectionBodyClass}>
                  The result is a collection of homes that feel calm, resolved and intrinsically connected
                  to place.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
