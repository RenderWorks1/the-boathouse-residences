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
import { VisionParallaxImage } from '@/components/ui/VisionParallaxImage';

export function ArchitecturalVision({
  heading,
  body,
  imageSrc = '/images/ropesonboatlandscape4k.jpeg',
}: {
  heading: string;
  body: string;
  imageSrc?: string;
}) {
  /** Watching the paragraph itself rather than the (much taller) section,
   *  so the trigger reliably fires when the text is on-screen. */
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  /** Boundary travels from -10% (band sits entirely above the text — nothing
   *  visible) to 110% (band entirely below — fully visible). 10% soft
   *  trailing edge for a gentle per-line fade. */
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
    <section className="bg-salt" aria-label={heading}>
      <div className="section-px pt-[clamp(2rem,4vw+0.75rem,4.5rem)] pb-[clamp(2rem,4vw+0.75rem,4.5rem)] w-full">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-[clamp(5rem,10vw,9rem)]">
          <motion.div
            className="relative mx-auto aspect-video w-full max-w-full overflow-hidden rounded-sm"
            style={{ transformOrigin: '50% 100%' }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <VisionParallaxImage
              src={imageSrc}
              alt={`${heading} — design detail`}
              className="absolute inset-0 h-full w-full"
              animate={false}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
            />
          </motion.div>
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
            className="font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] pb-[0.18em] text-[clamp(1.4rem,2.85vw+0.7rem,3.5rem)]"
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
