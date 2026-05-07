import Image from 'next/image';
import { HeroVideo } from './HeroVideo';

export function PageHero({
  image,
  title,
  videoUrl,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  /** Optional video to play continuously over the poster image. */
  videoUrl?: string;
}) {
  return (
    <section
      data-page-hero
      className="relative h-screen h-[100dvh] min-h-[16rem] w-full overflow-hidden"
    >
      {videoUrl ? (
        <HeroVideo src={videoUrl} poster={image} alt={title} />
      ) : (
        <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/30 via-transparent to-deep-navy/40" />
    </section>
  );
}
