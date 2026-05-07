import { ImageCarousel } from '@/components/ui/ImageCarousel';

export function CoastalLiving({
  slides,
}: {
  slides: { src: string; alt: string }[];
}) {
  return (
    <section className="bg-linen-white">
      <div className="section-py w-full">
        <ImageCarousel slides={slides} />
      </div>
    </section>
  );
}
