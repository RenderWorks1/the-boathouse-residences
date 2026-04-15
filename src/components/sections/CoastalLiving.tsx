import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export function CoastalLiving({
  slides,
}: {
  slides: { src: string; alt: string }[];
}) {
  return (
    <section className="bg-linen-white">
      <div className="section-py w-full">
        <ScrollReveal className="section-px mb-[clamp(2.5rem,5vw,3.5rem)] flex flex-col items-center gap-section-sm text-center">
          <SectionHeading>Coastal Living</SectionHeading>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ImageCarousel slides={slides} />
        </ScrollReveal>
      </div>
    </section>
  );
}
