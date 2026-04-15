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
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: '50% 100%' }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.9, ease: luxeEase }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
