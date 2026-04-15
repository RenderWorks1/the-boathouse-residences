'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BuildUpdate } from '@/lib/placeholder-updates';
import { formatDate } from '@/lib/utils';

export function UpdateCard({ update }: { update: BuildUpdate }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const scrollTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const next = Math.max(0, Math.min(update.images.length - 1, i));
    const child = el.children[next] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
    setIdx(next);
  };

  return (
    <article className="mb-[clamp(2.5rem,6vw,4rem)] border-b border-harbour/10 pb-[clamp(2.5rem,6vw,4rem)] last:border-b-0 last:pb-0">
      <div className="mb-[clamp(1rem,2.5vw,1.5rem)] flex flex-wrap items-center gap-[clamp(0.65rem,2vw,1.1rem)]">
        <span className="font-sans uppercase tracking-[0.3em] text-rope text-[clamp(0.625rem,0.22vw+0.52rem,0.72rem)]">
          {formatDate(update.date)}
        </span>
        {update.milestone && (
          <span className="inline-flex items-center rounded-full bg-sea-foam/30 px-[clamp(0.65rem,1.5vw,0.85rem)] py-[clamp(0.2rem,0.8vw,0.35rem)] font-sans uppercase tracking-[0.2em] text-harbour text-[clamp(0.5625rem,0.18vw+0.48rem,0.65rem)]">
            {update.milestone}
          </span>
        )}
      </div>

      <h3 className="font-display font-light text-harbour text-[clamp(1.5rem,1.2vw+1.05rem,2.5rem)]">
        {update.title}
      </h3>

      <div className="relative mt-[clamp(1.5rem,3vw,2rem)]">
        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {update.images.map((src, i) => (
            <div key={i} className="relative aspect-[16/9] w-full flex-none snap-center">
              <Image
                src={src}
                alt={`${update.title} — image ${i + 1}`}
                fill
                sizes="(min-width:768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {update.images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => scrollTo(idx - 1)}
              className="absolute left-[clamp(0.5rem,2vw,0.85rem)] top-1/2 -translate-y-1/2 rounded-full bg-linen-white/90 p-[clamp(0.35rem,1vw,0.5rem)] text-harbour shadow-md transition-opacity hover:bg-linen-white"
            >
              <ChevronLeft className="h-[clamp(1rem,2.5vw,1.2rem)] w-[clamp(1rem,2.5vw,1.2rem)]" strokeWidth={1.25} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => scrollTo(idx + 1)}
              className="absolute right-[clamp(0.5rem,2vw,0.85rem)] top-1/2 -translate-y-1/2 rounded-full bg-linen-white/90 p-[clamp(0.35rem,1vw,0.5rem)] text-harbour shadow-md transition-opacity hover:bg-linen-white"
            >
              <ChevronRight className="h-[clamp(1rem,2.5vw,1.2rem)] w-[clamp(1rem,2.5vw,1.2rem)]" strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>

      <p className="type-body mt-[clamp(1.5rem,3vw,2rem)] font-sans text-charcoal">
        {update.body}
      </p>
    </article>
  );
}
