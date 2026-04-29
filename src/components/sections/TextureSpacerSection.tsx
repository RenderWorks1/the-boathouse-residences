'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const luxeEase = [0.25, 0.1, 0.25, 1] as const;

export function TextureSpacerSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /** Scroll parallax: left block drifts down→up, right block up→down for depth. */
  const yLeftParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [56, -56],
  );
  const yRightParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-48, 48],
  );

  const fade = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 1.15, ease: luxeEase, delay },
    viewport: { once: true, amount: 0.35 },
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[clamp(28rem,68vh,56rem)] w-full overflow-hidden bg-salt"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/sb7.jpg')] bg-cover bg-center bg-no-repeat" />

      <div className="relative z-10 min-h-[clamp(28rem,68vh,56rem)] w-full">
        <motion.div
          className="absolute left-0 top-0 max-w-[min(34rem,92vw)] section-px pt-[clamp(3.25rem,9vw,6rem)] text-left will-change-transform"
          style={{ y: yLeftParallax }}
          {...fade(0)}
        >
          <motion.p
            className="font-display text-[clamp(2.25rem,3.25vw+1.1rem,3.75rem)] font-light leading-snug tracking-wide text-charcoal"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -5, 0, 4, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 16,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          >
            Calm by design
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 max-w-[min(32rem,90vw)] section-px pb-[clamp(3.25rem,9vw,6rem)] text-right will-change-transform"
          style={{ y: yRightParallax }}
          {...fade(0.35)}
        >
          <motion.p
            className="font-display text-[clamp(1.75rem,2.15vw+1rem,2.85rem)] font-light leading-relaxed tracking-wide text-charcoal/90"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 4, 0, -5, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          >
            Where architecture meets the tide.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
