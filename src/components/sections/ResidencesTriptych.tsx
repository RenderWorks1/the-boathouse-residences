'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TriptychItem = {
  /** First image shown on reveal. */
  primary: string;
  /** Second image that cross-fades in after the reveal settles. */
  secondary: string;
  alt: string;
  /** Optional per-column link (e.g. to a residence detail page). */
  href?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  items: [TriptychItem, TriptychItem, TriptychItem];
  /** Delay (ms) after the last column reveals before crossfades begin. Default 1400. */
  swapDelay?: number;
  /** Crossfade duration (s). Default 1.2. */
  crossfadeDuration?: number;
  /** Time (ms) between each column swap. Default 400. */
  columnStaggerMs?: number;
  className?: string;
};

export function ResidencesTriptych({
  eyebrow = 'The Collection',
  heading,
  items,
  swapDelay = 2800,
  crossfadeDuration = 2.2,
  columnStaggerMs = 900,
  className,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  // Which image is visible in each of the three columns (false = primary, true = secondary).
  const [swapped, setSwapped] = useState<[boolean, boolean, boolean]>([false, false, false]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    // After the reveal settles, flip each column from primary → secondary, one after another.
    [0, 1, 2].forEach((i) => {
      timers.push(
        setTimeout(() => {
          setSwapped((prev) => {
            const next = [...prev] as [boolean, boolean, boolean];
            next[i] = true;
            return next;
          });
        }, swapDelay + i * columnStaggerMs),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion, swapDelay, columnStaggerMs]);

  return (
    <section className={cn('bg-linen-white', className)}>
      <div
        ref={sectionRef}
        className="mx-auto w-full max-w-[110rem] px-[clamp(1.5rem,8vw,8rem)] py-[clamp(5rem,12vw,10rem)]"
      >
        {(eyebrow || heading) && (
        <div className="mb-[clamp(2rem,5vw,3.5rem)] flex flex-col items-center gap-3 text-center">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center rounded-full border border-harbour/20 bg-salt px-[clamp(1rem,2.5vw,1.5rem)] py-[clamp(0.35rem,1vw,0.55rem)] font-sans uppercase tracking-[0.3em] text-harbour text-[clamp(0.625rem,0.22vw+0.52rem,0.75rem)]"
            >
              {eyebrow}
            </motion.span>
          )}
          {heading && (
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="font-display font-light uppercase tracking-[0.1em] text-harbour text-[clamp(1.625rem,1rem+1.35vw,3rem)]"
            >
              {heading}
            </motion.h2>
          )}
        </div>
        )}

        <div className="grid grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
              transition={{
                duration: 1.8,
                ease: [0.22, 0.61, 0.36, 1],
                delay: i * 0.55,
              }}
              className="relative aspect-[3/4] w-full overflow-hidden [will-change:clip-path]"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ y: '8%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{
                  duration: 1.8,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: i * 0.55,
                }}
              >
                <TriptychImage
                  item={item}
                  swapped={swapped[i]}
                  crossfadeDuration={crossfadeDuration}
                />
              </motion.div>
              {item.href && (
                <Link
                  href={item.href}
                  aria-label={item.alt}
                  className="absolute inset-0 z-10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TriptychImage({
  item,
  swapped,
  crossfadeDuration,
}: {
  item: TriptychItem;
  swapped: boolean;
  crossfadeDuration: number;
}) {
  return (
    <>
      <Image
        src={item.primary}
        alt={item.alt}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className="object-cover"
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: swapped ? 1 : 0 }}
        transition={{ duration: crossfadeDuration, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={item.secondary}
          alt=""
          fill
          sizes="(min-width:768px) 33vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </>
  );
}
