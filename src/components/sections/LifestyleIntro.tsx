'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

export function LifestyleIntro({
  body,
  align = 'center',
  size = 'lg',
}: {
  body: string;
  align?: 'left' | 'center' | 'right';
  size?: 'lg' | 'md';
}) {
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const sizeClass =
    size === 'md'
      ? 'text-[clamp(1.4rem,2.85vw+0.7rem,3.5rem)]'
      : 'text-[clamp(1.65rem,3.7vw+0.85rem,4.5rem)]';
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  /** Boundary travels from -10% (band entirely above the text — nothing
   *  visible) to 110% (band entirely below — fully visible). Matches the
   *  ArchitecturalVision section. */
  const reveal = useMotionValue(reduceMotion ? 110 : -10);
  const mask = useMotionTemplate`linear-gradient(to bottom, black 0%, black ${reveal}%, transparent calc(${reveal}% + 10%))`;

  useEffect(() => {
    if (reduceMotion) {
      reveal.set(110);
      return;
    }
    if (!inView) return;
    const controls = animate(reveal, 110, {
      duration: 1.4,
      delay: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [inView, reduceMotion, reveal]);

  return (
    <section className="bg-salt">
      <div className={`section-px w-full py-[clamp(2.25rem,5vw+1rem,5.5rem)] ${alignClass}`}>
        <div className="mx-auto w-full max-w-[80rem]">
          <motion.p
            ref={ref}
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
            }}
            className={`font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] pb-[0.18em] ${sizeClass}`}
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
