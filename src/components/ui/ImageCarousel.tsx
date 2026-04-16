'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = { src: string; alt: string };

export function ImageCarousel({ slides }: { slides: Slide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
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
      <motion.div
        ref={scrollerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="no-scrollbar flex snap-x snap-mandatory gap-[clamp(0.65rem,2vw,1.1rem)] overflow-x-auto pb-[clamp(0.75rem,2vw,1.1rem)] px-[calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))] [scroll-padding-inline:calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))]"
      >
        {slides.map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="relative aspect-[4/5] w-[min(70vw,28rem)] flex-none snap-center overflow-hidden rounded-sm md:aspect-[3/4] md:w-[min(22vw,20rem)]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width:768px) 25vw, 70vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="mt-[clamp(1.25rem,3vw,2rem)] flex justify-center gap-[clamp(0.35rem,1vw,0.5rem)]"
      >
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
      </motion.div>
    </div>
  );
}
