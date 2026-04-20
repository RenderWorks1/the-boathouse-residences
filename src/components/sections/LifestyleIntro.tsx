import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';

export function LifestyleIntro({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="bg-salt">
      <div className="section-px w-full pb-[var(--section-pad-y)] pt-[clamp(5.5rem,12vw+2rem,11rem)] text-center">
        <StaggerReveal className="flex w-full flex-col items-center gap-section">
          <StaggerItem>
            <h2 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              {heading}
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="font-sans font-light leading-[1.65] text-charcoal px-0 md:px-[clamp(2.5rem,8vw,16rem)] text-[clamp(1.0625rem,0.55vw+0.92rem,1.375rem)]">
              {body}
            </p>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
