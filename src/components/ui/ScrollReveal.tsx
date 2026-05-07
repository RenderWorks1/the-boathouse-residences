'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

const offset = (d: Direction, distance: number) =>
  ({
    up: { y: distance, x: 0 },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }[d]);

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  fadeOnly = false,
  amount = 0.2,
  distance = 30,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Opacity-only fade (no slide offset) */
  fadeOnly?: boolean;
  /** Fraction of element that must be visible before animating in. */
  amount?: number;
  /** Pixels to translate from when hidden. Default 30. */
  distance?: number;
  /** When false, the animation re-runs both into and out of view (so the
   *  element pushes back out the same way it came in on scroll-up). */
  once?: boolean;
  className?: string;
}) {
  const variants: Variants = {
    hidden: fadeOnly ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1], delay },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked slide. The element's translate is tied directly to its
 * scroll position — as you scroll, it interpolates from `distance`px
 * (offscreen, in the `from` direction) to 0 (in place). Reverses naturally
 * when scrolling back up, since the transform follows the same scroll value.
 *
 * `range` controls how much scrolling drives a full 0→1 progress. The
 * tuple is passed straight to framer-motion's `useScroll` `offset`. A wider
 * range = slower animation (more scrolling required to settle).
 */
export function ScrollLinkedSlide({
  children,
  from = 'right',
  distance = 260,
  range = ['start end', 'center center'],
  className,
}: {
  children: ReactNode;
  from?: 'left' | 'right' | 'bottom' | 'top';
  distance?: number;
  range?: [string, string];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: range as any,
  });
  const horizontal = from === 'left' || from === 'right';
  const startX = from === 'right' ? distance : from === 'left' ? -distance : 0;
  const startY = from === 'bottom' ? distance : from === 'top' ? -distance : 0;
  const x = useTransform(scrollYProgress, [0, 1], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);
  return (
    <motion.div
      ref={ref}
      style={horizontal ? { x, opacity } : { y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset(direction, 30) },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
