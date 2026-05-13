'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = { src: string; alt: string; label?: string };

type Variant = 'portrait' | 'landscape';

export function ImageCarousel({
  slides,
  variant = 'portrait',
}: {
  slides: Slide[];
  variant?: Variant;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [reachableCount, setReachableCount] = useState(slides.length);
  const reduceMotion = useReducedMotion();

  const { containerVariants, itemVariants } = useMemo(() => {
    const item: Variants = {
      hidden: reduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
    const container: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.11,
          delayChildren: reduceMotion ? 0 : 0.05,
        },
      },
    };
    return { containerVariants: container, itemVariants: item };
  }, [reduceMotion]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const padLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      const isAtStart = el.scrollLeft <= 1;
      const isAtEnd = el.scrollLeft >= maxScroll - 1;
      setAtStart(isAtStart);
      setAtEnd(isAtEnd);
      // A slide is a reachable "page" when its snap-start position fits within
      // the scroll range (i.e. offsetLeft - padLeft <= maxScroll). Slides
      // beyond that are visible as the trailing tail of the last reachable
      // page and don't get their own dot.
      let lastReachable = 0;
      children.forEach((c, i) => {
        if (c.offsetLeft - padLeft <= maxScroll + 1) lastReachable = i;
      });
      const reachable = lastReachable + 1;
      setReachableCount(reachable);
      if (isAtEnd) {
        setActive(reachable - 1);
        return;
      }
      const ref = el.scrollLeft + padLeft;
      let nearest = 0;
      let best = Infinity;
      children.forEach((c, i) => {
        if (i >= reachable) return;
        const d = Math.abs(c.offsetLeft - ref);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const stepSize = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    return first.offsetWidth + gap;
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    const padLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = child.offsetLeft - padLeft;
    el.scrollTo({ left: Math.max(0, Math.min(maxScroll, target)), behavior: 'smooth' });
  };

  const prev = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: -stepSize(), behavior: 'smooth' });
  };
  const next = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: stepSize(), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <motion.div
        ref={scrollerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="no-scrollbar flex snap-x snap-mandatory gap-[clamp(1.5rem,3.5vw,2.5rem)] overflow-x-auto pb-[clamp(0.75rem,2vw,1.1rem)] px-[calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))] [scroll-padding-inline:calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))]"
      >
        {slides.map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={cn(
              'flex-none snap-start',
              variant === 'landscape'
                ? 'flex w-[min(88vw,56rem)] flex-col gap-[clamp(0.85rem,2vw,1.4rem)] md:w-[min(60vw,52rem)]'
                : 'relative aspect-[4/5] w-[min(78vw,32rem)] overflow-hidden rounded-sm md:w-[min(28vw,26rem)]',
            )}
          >
            {variant === 'landscape' ? (
              <>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#E4E0DC]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width:768px) 60vw, 88vw"
                    className="object-contain"
                  />
                </div>
                {s.label ? (
                  <span className="block text-center font-sans uppercase tracking-[0.32em] text-harbour text-[clamp(0.75rem,0.28vw+0.65rem,0.9rem)]">
                    {s.label}
                  </span>
                ) : null}
              </>
            ) : (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width:768px) 25vw, 70vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="mt-[clamp(1.25rem,3vw,2rem)] flex items-center justify-center gap-[clamp(0.85rem,2vw,1.25rem)]"
      >
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          disabled={atStart}
          className="inline-flex h-[clamp(2.25rem,4vw,2.75rem)] w-[clamp(2.25rem,4vw,2.75rem)] items-center justify-center rounded-full border border-harbour/30 text-harbour transition-colors duration-300 hover:bg-harbour hover:text-linen-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-harbour"
        >
          <ChevronLeft className="h-[clamp(1rem,2vw,1.25rem)] w-[clamp(1rem,2vw,1.25rem)]" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-[clamp(0.35rem,1vw,0.5rem)]">
          {Array.from({ length: reachableCount }).map((_, i) => (
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

        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          disabled={atEnd}
          className="inline-flex h-[clamp(2.25rem,4vw,2.75rem)] w-[clamp(2.25rem,4vw,2.75rem)] items-center justify-center rounded-full border border-harbour/30 text-harbour transition-colors duration-300 hover:bg-harbour hover:text-linen-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-harbour"
        >
          <ChevronRight className="h-[clamp(1rem,2vw,1.25rem)] w-[clamp(1rem,2vw,1.25rem)]" strokeWidth={1.5} />
        </button>
      </motion.div>
    </div>
  );
}
