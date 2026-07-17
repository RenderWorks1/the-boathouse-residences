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
  heading,
  body,
  tint = 'transparent',
  imageSide = 'left',
}: {
  imageSrc: string;
  imageAlt: string;
  /** Optional heading rendered above the body copy (serif display). */
  heading?: string;
  body: string | string[];
  /** Overlay colour painted over the image. Default = subtle dark wash. */
  tint?: string;
  /** Which column the image renders in. Default 'left'. */
  imageSide?: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paragraphs = Array.isArray(body) ? body : [body];
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
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
      duration: 1.4,
      delay: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [inView, reduceMotion, reveal]);

  return (
    <section className="bg-salt">
      <div className="section-px py-[clamp(2.25rem,5vw+1rem,5.5rem)] w-full">
        <div
          className={`mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-[clamp(2rem,4vw,4rem)] ${
            imageSide === 'right'
              ? 'md:grid-cols-[1fr_23rem] md:justify-end'
              : 'md:grid-cols-[23rem_1fr] md:justify-start'
          }`}
        >
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0 }}
            style={{ opacity: imageOpacity }}
            className={`relative h-[min(46vh,46dvh)] w-full overflow-hidden rounded-sm md:h-[min(72vh,72dvh)] md:w-[23rem] ${
              imageSide === 'right' ? 'md:order-2' : ''
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width:768px) 23rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: tint }}
            />
          </motion.div>
          <motion.div
            ref={ref}
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
            }}
            className={imageSide === 'right' ? 'md:order-1' : ''}
          >
            {heading && (
              <h2 className="mb-[clamp(1.1rem,2.5vw,1.85rem)] w-full font-vision text-[clamp(1.5rem,0.92rem+1.15vw,2.75rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                {heading}
              </h2>
            )}
            <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal/85"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
