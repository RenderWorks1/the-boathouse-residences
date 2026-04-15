'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = { src: string; alt: string };

export function ImageCarousel({ slides }: { slides: Slide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      children.forEach((c, i) => {
        const mid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - 16, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-[clamp(0.65rem,2vw,1.1rem)] overflow-x-auto pb-[clamp(0.75rem,2vw,1.1rem)] px-[calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))] [scroll-padding-inline:calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))]"
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative aspect-[4/5] w-[min(70vw,28rem)] flex-none snap-center overflow-hidden rounded-sm md:aspect-[3/4] md:w-[min(22vw,20rem)]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width:768px) 25vw, 70vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="mt-[clamp(1.25rem,3vw,2rem)] flex justify-center gap-[clamp(0.35rem,1vw,0.5rem)]">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn(
              'h-[clamp(0.3rem,0.6vw,0.4rem)] rounded-full transition-all duration-300',
              i === active ? 'w-[clamp(1.5rem,4vw,2rem)] bg-harbour' : 'w-[clamp(0.3rem,0.6vw,0.4rem)] bg-driftwood',
            )}
          />
        ))}
      </div>
    </div>
  );
}
