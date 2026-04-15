import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';
import { VisionParallaxImage } from '@/components/ui/VisionParallaxImage';

export function ArchitecturalVision({
  heading,
  body,
  imageSrc = '/images/design-craft-first-frame.jpg',
}: {
  heading: string;
  body: string;
  /** Still from the design-craft sequence (first frame), under /public. */
  imageSrc?: string;
}) {
  return (
    <section className="bg-salt">
      <div className="section-px section-py w-full">
        {/*
          Two tracks only: ~60% media / ~40% copy with a fixed column gap.
          The old 6fr + 1fr empty + 3fr grid left a wide dead zone between video and text.
        */}
        <div className="grid grid-cols-1 items-center gap-section lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-[clamp(1.5rem,3vw,2.5rem)] lg:gap-y-0 xl:gap-x-[clamp(2rem,3.5vw,3rem)]">
          <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-sm bg-driftwood/15 lg:aspect-auto lg:min-h-[min(85vh,38vw)] lg:max-h-[min(88vh,48vw)]">
            <VisionParallaxImage
              src={imageSrc}
              alt={`${heading} — design detail`}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <StaggerReveal className="flex min-w-0 flex-col items-start gap-[clamp(1rem,2vw,1.5rem)] text-left">
            <StaggerItem>
              <SectionHeading className="w-full text-left">{heading}</SectionHeading>
            </StaggerItem>
            <StaggerItem>
              <p className="type-body w-full font-sans text-charcoal">{body}</p>
            </StaggerItem>
            <StaggerItem className="w-full">
              <div className="flex w-full justify-center pt-2">
                <LinkButton href="/vision">Explore Vision</LinkButton>
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
