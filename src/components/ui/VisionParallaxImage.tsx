'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

const luxeEase = [0.25, 0.1, 0.25, 1] as const;

/**
 * One-time “grow up” reveal (bottom-anchored scale + opacity) when the block enters view.
 */
export function VisionParallaxImage({
  src,
  alt,
  className,
  animate = true,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Disable the grow-up entrance when the parent wrapper already animates in. */
  animate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const skip = !animate || reduceMotion;

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: '50% 100%' }}
        initial={skip ? false : { opacity: 0, scale: 0.86 }}
        whileInView={skip ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.9, ease: luxeEase }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="90vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
