'use client';

/**
 * Hero — brand reveal + full-bleed video.
 *
 * Sequence: `logoOnly` — mark on dark bg, video fully masked; `intro` — portal
 * opens from hidden to the small square; `reveal` — expands to full bleed;
 * `final` — logo travels to header + handoff. Logo uses scale from a fixed
 * header-sized box so move and zoom stay one smooth tween.
 */

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { dispatchHeroExpanded, dispatchHeroHandoff } from '@/lib/hero-handoff';
import {
  LOGO_CROSSFADE_EASE,
  LOGO_CROSSFADE_MS,
  LOGO_TRAVEL_S,
  logoHandoffDelayMs,
} from '@/lib/nav-header-layout';

type Stage = 'logoOnly' | 'intro' | 'reveal' | 'final';

type HeroProps = {
  videoUrl: string;
  image?: string;
  logoSrc?: string;
  logoAlt?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LAND = [0.33, 0, 0.05, 1] as const;

const INTRO_BG = '#1a1917';

/** Mask clips away all media — logo reads on solid intro bg only. */
const CLIP_HIDDEN = 'inset(50% 50% 50% 50%)';
const CLIP_CLOSED = 'inset(12% 38% 12% 38%)';
const CLIP_OPEN = 'inset(0% 0% 0% 0%)';

/**
 * Scale-up from the real header box (width/height = CSS vars the whole time).
 * Move + zoom run on one transform in Framer — avoids vw/calc vs. var() width
 * interpolation that makes travel and resize feel out of sync.
 */
const INTRO_LOGO_SCALE = 1.66;

/** Logo on dark bg only — no video portal yet (~1–2s). */
const LOGO_ONLY_HOLD_MS = 2000;
/** Portal grows from fully hidden → small square. */
const MASK_SQUARE_IN_S = 0.65;
/** Full-bleed expansion after the square is visible. */
const REVEAL_CLIP_S = 1.35;
/** When the rollup to full bleed starts (after hold + square-in). */
const REVEAL_START_MS = LOGO_ONLY_HOLD_MS + MASK_SQUARE_IN_S * 1000;
const FINAL_STAGE_MS = REVEAL_START_MS + REVEAL_CLIP_S * 1000;

export function Hero({
  videoUrl,
  image,
  logoSrc = '/images/logo4.png',
  logoAlt = 'The Boathouse Residences',
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>('logoOnly');
  const [videoReady, setVideoReady] = useState(false);

  // Prime decode immediately: load() + play() as early as possible so motion
  // isn’t waiting on the decoder when the mask opens.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const markReady = () => setVideoReady(true);
    el.addEventListener('loadeddata', markReady);
    el.addEventListener('loadedmetadata', markReady);
    el.addEventListener('canplay', markReady);
    el.addEventListener('playing', markReady);

    const attemptPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    el.load();
    attemptPlay();
    const raf = requestAnimationFrame(() => attemptPlay());

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('loadeddata', markReady);
      el.removeEventListener('loadedmetadata', markReady);
      el.removeEventListener('canplay', markReady);
      el.removeEventListener('playing', markReady);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setStage('final');
      return;
    }
    const toIntro = window.setTimeout(() => setStage('intro'), LOGO_ONLY_HOLD_MS);
    const toReveal = window.setTimeout(() => setStage('reveal'), REVEAL_START_MS);
    const toFinal = window.setTimeout(() => setStage('final'), FINAL_STAGE_MS);
    return () => {
      window.clearTimeout(toIntro);
      window.clearTimeout(toReveal);
      window.clearTimeout(toFinal);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (stage !== 'final') return;
    dispatchHeroExpanded();
    if (reducedMotion) {
      dispatchHeroHandoff();
      return;
    }
    const t = window.setTimeout(() => dispatchHeroHandoff(), logoHandoffDelayMs());
    return () => window.clearTimeout(t);
  }, [stage, reducedMotion]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const attemptPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    attemptPlay();
  }, [stage]);

  const maskVariants: Variants = {
    logoOnly: {
      clipPath: CLIP_HIDDEN,
      opacity: 1,
      transition: { duration: 0 },
    },
    intro: {
      clipPath: CLIP_CLOSED,
      opacity: 1,
      transition: { duration: MASK_SQUARE_IN_S, ease: EASE },
    },
    reveal: {
      clipPath: CLIP_OPEN,
      opacity: 1,
      transition: {
        duration: REVEAL_CLIP_S,
        ease: EASE,
      },
    },
    final: {
      clipPath: CLIP_OPEN,
      opacity: 1,
      transition: { duration: 0 },
    },
  };

  const crossfadeDelay = LOGO_TRAVEL_S - LOGO_CROSSFADE_MS / 1000;

  const logoTravelTransition = {
    type: 'tween' as const,
    duration: LOGO_TRAVEL_S,
    ease: EASE_LAND,
  };

  const logoCentre = {
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    width: 'var(--nav-logo-width)',
    height: 'var(--nav-logo-height)',
    scale: INTRO_LOGO_SCALE,
    opacity: 1,
    filter: 'blur(0px)',
  };

  const logoVariants: Variants = {
    logoOnly: {
      ...logoCentre,
      transition: {
        duration: 1.5,
        ease: EASE,
        delay: 0.2,
        opacity: { duration: 1.5, ease: 'easeOut', delay: 0.2 },
        filter: { duration: 1.65, ease: EASE, delay: 0.2 },
      },
    },
    intro: {
      ...logoCentre,
    },
    reveal: {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      width: 'var(--nav-logo-width)',
      height: 'var(--nav-logo-height)',
      scale: INTRO_LOGO_SCALE,
      opacity: 1,
      filter: 'blur(0px)',
    },
    final: {
      top: 'var(--nav-logo-slot-top)',
      left: '50%',
      x: '-50%',
      y: 0,
      width: 'var(--nav-logo-width)',
      height: 'var(--nav-logo-height)',
      scale: 1,
      opacity: 0,
      filter: 'blur(0px)',
      transition: {
        ...logoTravelTransition,
        opacity: {
          delay: crossfadeDelay,
          duration: LOGO_CROSSFADE_MS / 1000,
          ease: [...LOGO_CROSSFADE_EASE],
        },
      },
    },
  };

  return (
    <section
      aria-label="Hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: INTRO_BG }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ clipPath: CLIP_HIDDEN, opacity: 1 }}
        variants={maskVariants}
        animate={stage}
        style={{ willChange: 'clip-path' }}
      >
        {image && (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden
            className="pointer-events-none absolute inset-0 object-cover"
          />
        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep-navy/25 via-transparent to-deep-navy/40" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[60] overflow-hidden"
        style={{ transformOrigin: '50% 50%' }}
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: 'var(--nav-logo-width)',
          height: 'var(--nav-logo-height)',
          scale: INTRO_LOGO_SCALE,
          opacity: 0,
          filter: 'blur(10px)',
        }}
        variants={logoVariants}
        animate={stage}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          priority
          sizes="(max-width: 768px) 72vw, 448px"
          className="select-none object-contain object-center mix-blend-lighten"
          draggable={false}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={stage === 'final' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
        className="absolute bottom-[clamp(1.75rem,4vw,2.75rem)] left-1/2 z-30 -translate-x-1/2 text-linen-white"
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
