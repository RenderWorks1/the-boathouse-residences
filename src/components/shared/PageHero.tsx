import Image from 'next/image';

export function PageHero({
  image,
  eyebrow,
  title,
}: {
  image: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="relative h-[min(75vh,55vw)] min-h-[16rem] w-full overflow-hidden md:h-[min(78vh,50vw)]">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/40 via-deep-navy/10 to-deep-navy/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(0.75rem,2vw,1.25rem)] section-px text-center text-linen-white">
        {eyebrow && (
          <span className="font-sans uppercase tracking-[0.35em] text-linen-white/80 text-[clamp(0.625rem,0.22vw+0.52rem,0.75rem)]">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display font-light uppercase tracking-[0.1em] text-[clamp(2.25rem,2.5vw+1.25rem,4.5rem)]">
          {title}
        </h1>
      </div>
    </section>
  );
}
