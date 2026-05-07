'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const luxeEase = [0.25, 0.1, 0.25, 1] as const;

export function RippleSpacerSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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
      className="relative min-h-[clamp(24rem,60vh,48rem)] w-full overflow-hidden bg-salt"
    >
      {/* Animated water-ripple background — two layers of fractal-noise
          turbulence tinted with feColorMatrix to brand colours, each cycling
          its baseFrequency on a different period for a gentle shimmering
          surface. No underlying texture image. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="ripple-tint-a" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves={2} seed={4}>
              {!reduceMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="42s"
                  values="0.014;0.024;0.014"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.42
                      0 0 0 0 0.49
                      0 0 0 0 0.55
                      0 0 0 0.7 0"
            />
          </filter>

          <filter id="ripple-tint-b" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves={1} seed={9}>
              {!reduceMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="28s"
                  values="0.028;0.04;0.028"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.78
                      0 0 0 0 0.76
                      0 0 0 0 0.72
                      0 0 0 0.55 0"
            />
          </filter>
        </defs>

        <rect width="100%" height="100%" filter="url(#ripple-tint-a)" opacity="0.55" />
        <rect width="100%" height="100%" filter="url(#ripple-tint-b)" opacity="0.35" />
      </svg>

      {/* Slow caustic-like radial highlights — these shift very slowly to
          give a sense of light dancing on water. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(60% 40% at 25% 35%, rgba(255,255,255,0.18), transparent 70%),' +
            'radial-gradient(50% 35% at 75% 60%, rgba(255,255,255,0.12), transparent 70%),' +
            'radial-gradient(45% 45% at 50% 85%, rgba(255,255,255,0.1), transparent 70%)',
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: [
                  '0% 0%, 0% 0%, 0% 0%',
                  '4% -3%, -3% 4%, 2% -2%',
                  '0% 0%, 0% 0%, 0% 0%',
                ],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 48,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />

      <div className="relative z-10 min-h-[clamp(24rem,60vh,48rem)] w-full">
        <motion.div
          className="absolute left-0 top-0 w-[44%] min-w-[16rem] max-w-[44%] section-px pt-[clamp(1.5rem,4vw,3rem)] text-left will-change-transform"
          style={{ y: yLeftParallax }}
          {...fade(0)}
        >
          <motion.p
            className="font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] text-[clamp(1.85rem,3vw+0.85rem,4.25rem)]"
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
          className="absolute bottom-0 right-0 w-[44%] min-w-[16rem] max-w-[44%] section-px pb-[clamp(1.5rem,4vw,3rem)] text-right will-change-transform"
          style={{ y: yRightParallax }}
          {...fade(0.35)}
        >
          <motion.p
            className="font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] text-[clamp(1.85rem,3vw+0.85rem,4.25rem)]"
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
