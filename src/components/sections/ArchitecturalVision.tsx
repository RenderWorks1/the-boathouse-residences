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
          <StaggerReveal className="mx-auto flex w-full max-w-none min-w-0 flex-col items-center gap-[clamp(1.75rem,3.5vw+0.35rem,2.75rem)] py-10 text-center sm:max-w-md md:max-w-lg md:py-14">
            <StaggerItem>
              <h2 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                {heading}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="w-full font-sans text-[clamp(1.125rem,0.52vw+0.95rem,1.375rem)] font-light leading-[1.65] text-charcoal">
                {body}
              </p>
            </StaggerItem>
            <StaggerItem className="w-full pt-6 md:pt-8">
              <div className="flex w-full justify-center">
                <LinkButton
                  href="/vision"
                  variant="ghost"
                  className="font-vision normal-case tracking-tight text-charcoal hover:text-charcoal/85 hover:bg-charcoal/[0.06] border border-charcoal/25 rounded-sm px-[clamp(1.25rem,2vw+0.5rem,1.85rem)] py-[clamp(0.55rem,0.9vw+0.35rem,0.75rem)] text-[clamp(0.875rem,0.5vw+0.75rem,1rem)] font-normal shadow-none transition-colors hover:border-charcoal/40"
                >
                  Explore Vision
                </LinkButton>
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
