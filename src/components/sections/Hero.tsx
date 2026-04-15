'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero({
  image,
  videoUrl,
}: {
  image: string;
  videoUrl?: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={image}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={image}
          alt="The Boathouse Residences — waterfront exterior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Top nav readability + subtle bottom darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/30 via-transparent to-deep-navy/40" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-[clamp(1.75rem,4vw,2.75rem)] left-1/2 -translate-x-1/2 text-linen-white"
      >
        <div className="flex flex-col items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <span className="font-sans uppercase tracking-[0.35em] text-[clamp(0.5625rem,0.18vw+0.48rem,0.65rem)]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            <ChevronDown
              className="h-[clamp(1rem,2.5vw,1.125rem)] w-[clamp(1rem,2.5vw,1.125rem)]"
              strokeWidth={1}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
