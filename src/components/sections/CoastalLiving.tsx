import { ImageCarousel } from '@/components/ui/ImageCarousel';

export function CoastalLiving({
  slides,
}: {
  slides: { src: string; alt: string }[];
}) {
  return (
    <section className="bg-linen-white">
      <div className="pt-[5.5rem] pb-[var(--section-pad-y)] w-full md:pt-[var(--section-pad-y)]">
        <ImageCarousel
          slides={slides}
          portraitItemClassName="relative aspect-[3/4] w-[84vw] overflow-hidden rounded-sm md:w-[min(26vw,29.3rem)]"
        />
      </div>
    </section>
  );
}
