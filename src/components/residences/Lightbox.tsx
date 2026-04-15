'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ResidenceGallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % images.length));
      if (e.key === 'ArrowLeft')
        setOpen((o) => (o === null ? o : (o - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-[clamp(0.45rem,1.5vw,0.75rem)] md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              sizes="(min-width:768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-deep-navy/95 p-[clamp(0.75rem,2vw,1.25rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-[clamp(1rem,3vw,1.75rem)] top-[clamp(1rem,3vw,1.75rem)] text-linen-white"
            >
              <X className="h-[clamp(1.35rem,3.5vw,1.75rem)] w-[clamp(1.35rem,3.5vw,1.75rem)]" strokeWidth={1.25} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o === null ? o : (o - 1 + images.length) % images.length));
              }}
              className="absolute left-[clamp(0.75rem,2.5vw,2.75rem)] text-linen-white"
            >
              <ChevronLeft className="h-[clamp(1.5rem,4vw,2rem)] w-[clamp(1.5rem,4vw,2rem)]" strokeWidth={1} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o === null ? o : (o + 1) % images.length));
              }}
              className="absolute right-[clamp(0.75rem,2.5vw,2.75rem)] text-linen-white"
            >
              <ChevronRight className="h-[clamp(1.5rem,4vw,2rem)] w-[clamp(1.5rem,4vw,2rem)]" strokeWidth={1} />
            </button>
            <div
              className="relative h-[min(85vh,85vw)] w-full max-w-[min(90vw,80rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[open]} alt={`${alt} — ${open + 1}`} fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
