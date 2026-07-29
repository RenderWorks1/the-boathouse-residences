import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxSection } from '@/components/sections/ParallaxSection';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Vision',
  description:
    'A disciplined design vision shaped by Hobsonville Marina — composed, enduring and naturally aligned with its setting.',
};

const visionSectionTitleClass =
  'mb-[clamp(1.35rem,3vw,2.35rem)] w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.75rem)] font-normal leading-[1.15] tracking-tight text-charcoal md:text-left';
const visionSectionBodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';

export default function VisionPage() {
  return (
    <>
      <PageHero
        image="/hero-videos/vision-poster.jpg"
        title="A Clear Vision"
        videoUrl="/hero-videos/vision.mp4"
      />

      <section className="bg-salt">
        <div className="section-px section-py mx-auto w-full max-w-[88rem]">
          <ScrollReveal className="flex max-w-[78rem] flex-col items-start text-left">
            {/* h1: the page's first heading, so it carries the page. */}
            <h1 className="mb-[clamp(1.35rem,3vw,2.35rem)] w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal md:text-left">
              A Clear Vision.
            </h1>
            <div className="flex max-w-[60rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={visionSectionBodyClass}>
                Boathouse Residences is the result of a vision to create something truly considered — a collection of waterfront residences shaped by architecture, craftsmanship and a deep connection to place.
              </p>
              <p className={visionSectionBodyClass}>
                Guided by a disciplined design philosophy, every element has been carefully resolved, from form and proportion to materiality and experience.
              </p>
              <p className={visionSectionBodyClass}>
                The result is a collection that feels timeless yet contemporary; refined yet effortless; intrinsically connected to its marina setting.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-linen-white">
        <div className="section-px section-py mx-auto grid w-full max-w-[88rem] items-center gap-section md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="group relative h-[min(55vh,55dvh)] w-full min-h-0 overflow-hidden">
              <Image
                src="/images/simon-and-paula.webp"
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
                A Shared Vision.
              </h2>
              <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                <p className={visionSectionBodyClass}>
                  Simon and Paula Herbert bring a shared passion for thoughtful design, enduring quality and creating places that stand apart.
                </p>
                <p className={visionSectionBodyClass}>
                  Their approach is grounded in restraint, attention to detail and a belief that exceptional spaces are created through considered decisions.
                </p>
                <p className={visionSectionBodyClass}>
                  Together, they have shaped Boathouse Residences around a clear philosophy: to create residences that feel beautifully resolved, purposeful and designed to endure.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ParallaxSection
        image="/images/sectionheros/DJI_20260319081312_0375_D.jpg"
        alt="The marina from above"
        height="min(75vh, 75dvh)"
        overlayOpacity={0}
      />

      <section className="bg-sand">
        <div className="section-px section-py mx-auto grid w-full max-w-[88rem] items-center gap-section md:grid-cols-2 md:[&>*:first-child]:order-2">
          <ScrollReveal direction="right">
            <div className="group relative mx-auto h-[min(55vh,55dvh)] w-full min-h-0 max-w-[34rem] overflow-hidden">
              <Image
                src="/images/hobsonville-10.jpg"
                alt="Hobsonville Marina and moored boats from above"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <div className="flex flex-col md:px-[clamp(0.5rem,2vw,1.5rem)]">
              <h2 className={visionSectionTitleClass}>
                Shaped by the Marina.
              </h2>
              <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
                <p className={visionSectionBodyClass}>
                  The design of Boathouse Residences begins with its extraordinary waterfront setting.
                </p>
                <p className={visionSectionBodyClass}>
                  The changing light across the harbour, the movement of the marina and the natural textures of the coastline have informed every aspect of the design.
                </p>
                <p className={visionSectionBodyClass}>
                  Carefully selected materials, considered architectural forms and a focus on natural connection allow each residence to sit harmoniously within its surroundings.
                </p>
                <p className={visionSectionBodyClass}>
                  The result is a collection that feels calm, authentic and deeply connected to place.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-linen-white">
        <div className="section-px section-py mx-auto w-full max-w-[88rem]">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] text-left md:items-center md:text-center">
            <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Designed for Now. Created to Endure.
            </h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={visionSectionBodyClass}>
                Boathouse Residences represents a considered approach to waterfront living where architecture, interiors and environment come together in balance.
              </p>
              <p className={visionSectionBodyClass}>
                A place shaped by vision, defined by design and created to be experienced for generations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px pt-[var(--section-pad-y)] w-full max-w-none text-left md:text-center">
          <ScrollReveal className="mx-auto flex max-w-[62rem] flex-col items-start gap-[clamp(1.35rem,3vw,2.35rem)] md:items-center">
            <h2 className="w-full text-center font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Enquire Now
            </h2>
            <div className="flex max-w-[52rem] flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              <p className={visionSectionBodyClass}>
                Discover Boathouse Residences where architecture, interiors and environment come together
                in balance beside the water.
              </p>
              <p className={visionSectionBodyClass}>
                Our sales team welcomes you to arrange a private viewing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <EnquiryForm hideIntro />
    </>
  );
}
