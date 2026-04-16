import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';
import { VisionParallaxImage } from '@/components/ui/VisionParallaxImage';

export function ArchitecturalVision({
  heading,
  body,
  imageSrc = '/images/architectural-vision-frame.jpg',
}: {
  heading: string;
  body: string;
  /** Still from the nested sequence (~3s), under /public. */
  imageSrc?: string;
}) {
  return (
    <section className="bg-salt">
      <div className="section-px section-py w-full">
        <div className="mx-auto flex w-full max-w-full flex-col items-center gap-section">
          <div className="relative aspect-video w-[90%] max-w-full min-w-0 overflow-hidden rounded-sm bg-driftwood/15">
            <VisionParallaxImage
              src={imageSrc}
              alt={`${heading} — design detail`}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <StaggerReveal className="mx-auto flex w-full max-w-xs min-w-0 flex-col items-start gap-[clamp(1rem,2vw,1.5rem)] py-10 text-left sm:max-w-sm md:py-14">
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
