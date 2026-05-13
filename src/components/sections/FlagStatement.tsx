'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

/**
 * Two-column statement section: image on the left, big faded paragraph on
 * the right with the same line-by-line mask-wipe reveal as the
 * ArchitecturalVision and LifestyleIntro sections.
 */
export function FlagStatement({
  imageSrc,
  imageAlt,
  body,
  tint = 'rgba(0, 0, 0, 0.4)',
  imageSide = 'left',
}: {
  imageSrc: string;
  imageAlt: string;
  body: string;
  /** Overlay colour painted over the image. Default = subtle dark wash. */
  tint?: string;
  /** Which column the image renders in. Default 'left'. */
  imageSide?: 'left' | 'right';
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reveal = useMotionValue(reduceMotion ? 110 : -10);
  const mask = useMotionTemplate`linear-gradient(to bottom, black 0%, black ${reveal}%, transparent calc(${reveal}% + 10%))`;

  /** Scroll-linked image opacity. 0 when the image's top hits the viewport
   *  bottom (out of view), 1 by the time its centre reaches viewport centre.
   *  Reverses naturally on scroll-up because opacity tracks the same scroll
   *  value in both directions. */
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'center center'],
  });
  const imageOpacity = useTransform(
    scrollYProgress,
    reduceMotion ? [0, 1] : [0, 1],
    reduceMotion ? [1, 1] : [0, 1],
  );

  useEffect(() => {
    if (reduceMotion) {
      reveal.set(110);
      return;
    }
    if (!inView) return;
    const controls = animate(reveal, 110, {
      duration: 4.5,
      delay: 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [inView, reduceMotion, reveal]);

  return (
    <section className="bg-salt">
      <div className="section-px py-[clamp(4rem,9vw+1.5rem,9rem)] w-full">
        <div
          className={`mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-[clamp(2rem,4vw,4rem)] ${
            imageSide === 'right'
              ? 'md:grid-cols-[1fr_28rem] md:justify-end'
              : 'md:grid-cols-[28rem_1fr] md:justify-start'
          }`}
        >
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0 }}
            style={{ opacity: imageOpacity }}
            className={`relative h-[min(90vh,90dvh)] w-full overflow-hidden rounded-sm md:w-[28rem] ${
              imageSide === 'right' ? 'md:order-2' : ''
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width:768px) 28rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: tint }}
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
            className={`font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] text-[clamp(1.7rem,3vw+0.8rem,3.6rem)] ${
              imageSide === 'right' ? 'md:order-1' : ''
            }`}
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
