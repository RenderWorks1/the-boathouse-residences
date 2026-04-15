'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

const offset = (d: Direction) =>
  ({ up: { y: 30, x: 0 }, left: { x: -30, y: 0 }, right: { x: 30, y: 0 } }[d]);

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction) },
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
      viewport={{ once: true, amount: 0.2 }}
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
        hidden: { opacity: 0, ...offset(direction) },
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
