'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type BentoImage = { src: string; alt: string };

// Intrinsic dimensions so each tile keeps the render's natural aspect ratio
// (portraits stay tall, landscapes stay wide) instead of being cropped to a
// fixed cell. Only the landscape exports carry "landscape" in their filename.
const LANDSCAPE = { w: 1920, h: 1080 };
const PORTRAIT = { w: 1500, h: 2000 };
const dims = (src: string) => (/landscape/i.test(src) ? LANDSCAPE : PORTRAIT);

export function BentoGallery({ images }: { images: BentoImage[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((o) => (o === null ? o : (o + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="columns-2 [column-gap:clamp(0.5rem,1.2vw,0.9rem)] md:columns-3"
      >
        {images.map((img, i) => {
          const d = dims(img.src);
          return (
            <motion.button
              key={img.src}
              type="button"
              variants={item}
              onClick={() => setOpen(i)}
              aria-label={`Expand: ${img.alt}`}
              className="group mb-[clamp(0.5rem,1.2vw,0.9rem)] block w-full cursor-zoom-in overflow-hidden rounded-sm bg-sand [break-inside:avoid]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={d.w}
                height={d.h}
                sizes="(min-width:768px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-luxe will-change-transform group-hover:scale-[1.04]"
              />
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-deep-navy/95 p-[clamp(0.75rem,2vw,1.5rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-[clamp(1rem,3vw,1.75rem)] top-[clamp(1rem,3vw,1.75rem)] text-linen-white/80 transition-colors hover:text-linen-white"
            >
              <X className="h-[clamp(1.35rem,3.5vw,1.75rem)] w-[clamp(1.35rem,3.5vw,1.75rem)]" strokeWidth={1.25} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-[clamp(0.5rem,2.5vw,2.75rem)] text-linen-white/80 transition-colors hover:text-linen-white"
            >
              <ChevronLeft className="h-[clamp(1.5rem,4vw,2rem)] w-[clamp(1.5rem,4vw,2rem)]" strokeWidth={1} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-[clamp(0.5rem,2.5vw,2.75rem)] text-linen-white/80 transition-colors hover:text-linen-white"
            >
              <ChevronRight className="h-[clamp(1.5rem,4vw,2rem)] w-[clamp(1.5rem,4vw,2rem)]" strokeWidth={1} />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex h-[min(88vh,88vw)] w-full max-w-[min(92vw,82rem)] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[open].src}
                alt={images[open].alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
