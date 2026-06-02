'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HeroVideo } from '@/components/shared/HeroVideo';

/**
 * Full-bleed continuously-looping video section. Uses HeroVideo for the
 * crossfaded seamless loop and overlays a subtle dark tint for legibility
 * and tonal consistency with the rest of the page. The video subtly scales
 * up as the section travels through the viewport for a soft parallax feel.
 */
export function FullBleedVideo({
  src,
  poster,
  alt,
  height,
  tint = 'rgba(26, 34, 40, 0.32)',
}: {
  src: string;
  poster: string;
  alt: string;
  /** Section height. Any CSS value. If omitted, falls back to a responsive
   *  short strip on mobile and ~80vh on desktop. */
  height?: string;
  /** Overlay colour (rgba/hex). Default Harbour-Slate-tinged shadow. */
  tint?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.12],
  );

  return (
    <section
      ref={ref}
      className={
        height
          ? 'relative w-full overflow-hidden bg-deep-navy'
          : 'relative w-full overflow-hidden bg-deep-navy h-[70vh] min-h-[26rem]'
      }
      style={height ? { height } : undefined}
      role="img"
      aria-label={alt}
    >
      <motion.div
        style={{ scale, transformOrigin: '50% 50%' }}
        className="absolute inset-0 will-change-transform"
      >
        <HeroVideo src={src} poster={poster} alt={alt} />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: tint }}
      />
    </section>
  );
}
