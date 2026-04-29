'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type Link = { href: string; label: string };

export function MobileMenu({
  open,
  onClose,
  links,
  compactLogo = false,
}: {
  open: boolean;
  onClose: () => void;
  links: Link[];
  /** Match smaller header logo on non-landing routes. */
  compactLogo?: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed inset-0 z-[60] bg-deep-navy/95 backdrop-blur-sm md:hidden',
            compactLogo && 'nav-logo-compact',
          )}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-full w-full flex-col section-px pt-[clamp(1.75rem,4vw,2.25rem)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="relative h-[var(--nav-logo-height)] w-[var(--nav-logo-width)] max-w-[calc(100vw-4.5rem)] shrink-0 overflow-hidden">
                <Image
                  src="/logos/logo-white.png"
                  alt="The Boathouse Residences"
                  fill
                  className="object-contain object-left"
                  sizes={
                    compactLogo
                      ? '(max-width: 768px) 58vw, 320px'
                      : '(max-width: 768px) 72vw, 448px'
                  }
                />
              </div>
              <button aria-label="Close menu" onClick={onClose} className="text-linen-white">
                <X size={26} strokeWidth={1.25} />
              </button>
            </div>

            <div className="mt-[clamp(3.5rem,10vw,5rem)] flex flex-col gap-[clamp(1.25rem,4vw,2rem)]">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="font-display font-light tracking-wide text-linen-white text-[clamp(1.75rem,5vw+0.75rem,2.75rem)] transition-colors hover:text-linen-white/70"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/enquire"
                  onClick={onClose}
                  className="inline-flex items-center rounded-none border border-white bg-transparent font-sans uppercase tracking-[0.2em] text-linen-white transition-colors hover:bg-linen-white hover:text-charcoal px-[clamp(1.35rem,3vw,2.25rem)] py-[clamp(0.65rem,1.5vw,0.9rem)] text-[clamp(0.75rem,0.35vw+0.65rem,0.875rem)]"
                >
                  Enquire
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
