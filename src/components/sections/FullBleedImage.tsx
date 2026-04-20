'use client';

import Image from 'next/image';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const luxeEase = [0.25, 0.1, 0.25, 1] as const;

const LEAD_PAD_SEC = 0.1;

/** Start playback when the block is this close to entering the viewport (scroll down). */
const IN_VIEW_MARGIN = '0px 0px 22% 0px';

export function FullBleedImage({
  src,
  alt,
  videoUrl,
}: {
  src: string;
  alt: string;
  videoUrl?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closingRef = useRef(false);
  const [closingStarted, setClosingStarted] = useState(false);
  const [curtainComplete, setCurtainComplete] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  const curtainDuration = reduceMotion ? 0 : 1.15;
  const leadBeforeEnd = curtainDuration + LEAD_PAD_SEC;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoUrl || !inView) return;

    const onPlaying = () => setVideoPlaying(true);
    el.addEventListener('playing', onPlaying);
    el.load();
    el.play().catch(() => {});

    return () => el.removeEventListener('playing', onPlaying);
  }, [videoUrl, inView]);

  const tryStartClosing = useCallback(
    (video: HTMLVideoElement) => {
      if (closingRef.current) return;
      const d = video.duration;
      if (!d || !Number.isFinite(d)) return;
      const remaining = d - video.currentTime;
      if (remaining <= leadBeforeEnd) {
        closingRef.current = true;
        setClosingStarted(true);
      }
    },
    [leadBeforeEnd],
  );

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      tryStartClosing(e.currentTarget);
    },
    [tryStartClosing],
  );

  const onEnded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      tryStartClosing(e.currentTarget);
    },
    [tryStartClosing],
  );

  const collapseAfterCurtain = Boolean(videoUrl && curtainComplete);

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden bg-salt',
        !reduceMotion && 'transition-[height] duration-700 ease-luxe',
        collapseAfterCurtain ? 'h-0' : 'h-[min(72vh,58vw)] md:h-[min(78vh,52vw)]',
      )}
    >
      <motion.div style={{ y }} className="absolute inset-[-3%]">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />

        {videoUrl && (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: videoPlaying ? 1 : 0 }}
              muted
              playsInline
              preload="none"
              aria-label={alt}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {closingStarted ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-salt"
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                transition={{ duration: curtainDuration, ease: luxeEase }}
                onAnimationComplete={() => {
                  if (videoUrl) setCurtainComplete(true);
                }}
              />
            ) : null}
          </>
        )}
      </motion.div>
    </section>
  );
}
