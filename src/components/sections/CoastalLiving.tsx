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
        <ScrollReveal
          fadeOnly
          duration={0.95}
          className="section-px mb-[clamp(2.5rem,5vw,3.5rem)] flex flex-col items-center gap-section-sm text-center"
        >
          <h2 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
            Coastal Living
          </h2>
        </ScrollReveal>
        <ImageCarousel slides={slides} />
      </div>
    </section>
  );
}
