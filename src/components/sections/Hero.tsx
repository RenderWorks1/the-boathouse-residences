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
import {
  dispatchHeroExpanded,
  dispatchHeroHandoff,
  hasHeroIntroPlayed,
  markHeroIntroPlayed,
} from '@/lib/hero-handoff';
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

const INTRO_BG = '#C7C3BD';

/** Mask clips away all media — logo reads on solid intro bg only. */
const CLIP_HIDDEN = 'inset(50% 50% 50% 50%)';
/** Bottom anchor for the growth — keeps the bottom edge fixed while the
 *  top edge moves upward, so the box appears to grow only upwards. Tuned
 *  so the line sits just below the centred logo. */
const CLIP_BOTTOM = 32;
/** Horizontal line just below the logo. Zero height (top + bottom = 100%). */
const CLIP_LINE = `inset(${100 - CLIP_BOTTOM}% 38% ${CLIP_BOTTOM}% 38%)`;
/** Box grown only upward — top has shrunk, bottom stays anchored. */
const CLIP_CLOSED = `inset(22% 38% ${CLIP_BOTTOM}% 38%)`;
const CLIP_OPEN = 'inset(0% 0% 0% 0%)';

/**
 * Scale-up from the real header box (width/height = CSS vars the whole time).
 * Move + zoom run on one transform in Framer — avoids vw/calc vs. var() width
 * interpolation that makes travel and resize feel out of sync.
 */
const INTRO_LOGO_SCALE = 2.6;

/** Logo on dark bg only — no video portal yet (~1–2s). */
const LOGO_ONLY_HOLD_MS = 2000;
/** Portal grows from fully hidden → small square. */
const MASK_SQUARE_IN_S = 1.4;
/** Full-bleed expansion after the square is visible. */
const REVEAL_CLIP_S = 2.4;
/** When the rollup to full bleed starts (after hold + square-in). */
const REVEAL_START_MS = LOGO_ONLY_HOLD_MS + MASK_SQUARE_IN_S * 1000;
const FINAL_STAGE_MS = REVEAL_START_MS + REVEAL_CLIP_S * 1000;


export function Hero({
  videoUrl,
  image,
  logoSrc = '/logos/logo-white.png',
  logoAlt = 'The Boathouse Residences',
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  /** Captured at first render — stable across re-renders even after the flag flips to true.
   *  Skip the intro if (a) it has already played in this session, or (b) the page
   *  is loading with the user already scrolled past the hero (e.g. after a hard
   *  refresh further down the page) — otherwise the fixed flying logo would
   *  briefly cover the section the user is actually looking at. */
  const skipIntroRef = useRef(
    hasHeroIntroPlayed() ||
      (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.4),
  );
  const skipIntro = skipIntroRef.current;
  const [stage, setStage] = useState<Stage>(() =>
    skipIntroRef.current ? 'final' : 'logoOnly',
  );
  const [videoReady, setVideoReady] = useState(false);
  /** True once the hero logo image has finished decoding/loading. The intro
   *  sequence waits on this so the logo is visible from the very first frame
   *  of the animation rather than popping in part-way through. */
  const [logoReady, setLogoReady] = useState(false);

  // Safety fallback: if the load callback never fires (slow network / odd
  // cache state), kick off the intro after 2.5s so the page never stalls.
  useEffect(() => {
    if (logoReady) return;
    const t = window.setTimeout(() => setLogoReady(true), 2500);
    return () => window.clearTimeout(t);
  }, [logoReady]);

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
    if (skipIntro || reducedMotion) {
      setStage('final');
      return;
    }
    // Don't start the intro timeline until the logo image has loaded — the
    // animation depends on the logo being visible from frame 1.
    if (!logoReady) return;
    const toIntro = window.setTimeout(() => setStage('intro'), LOGO_ONLY_HOLD_MS);
    const toReveal = window.setTimeout(() => setStage('reveal'), REVEAL_START_MS);
    const toFinal = window.setTimeout(() => setStage('final'), FINAL_STAGE_MS);
    return () => {
      window.clearTimeout(toIntro);
      window.clearTimeout(toReveal);
      window.clearTimeout(toFinal);
    };
  }, [reducedMotion, skipIntro, logoReady]);

  useEffect(() => {
    if (skipIntro || reducedMotion) {
      if (stage === 'final') {
        dispatchHeroExpanded();
        dispatchHeroHandoff();
        markHeroIntroPlayed();
      }
      return;
    }
    if (stage === 'reveal') {
      // Logo travel runs in parallel with the reveal mask expansion.
      // Hand off to the nav logo as the crossfade window begins.
      const t = window.setTimeout(() => {
        dispatchHeroHandoff();
      }, logoHandoffDelayMs());
      return () => window.clearTimeout(t);
    }
    if (stage === 'final') {
      dispatchHeroExpanded();
      markHeroIntroPlayed();
    }
  }, [stage, reducedMotion, skipIntro]);

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
    // Mask collapsed to a zero-height horizontal line at vertical centre.
    // Stationary — the line stays in place, then grows.
    logoOnly: {
      clipPath: CLIP_LINE,
      opacity: 1,
      transition: { duration: 0 },
    },
    // Vertical growth: top + bottom insets shrink so the horizontal line
    // expands upward and downward into the centred square.
    intro: {
      clipPath: CLIP_CLOSED,
      opacity: 1,
      transition: { duration: MASK_SQUARE_IN_S, ease: EASE },
    },
    // Even expansion from the square out to full bleed.
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

  const logoTravelTarget = {
    top: 'var(--nav-logo-slot-top)',
    left: '50%',
    x: '-50%',
    y: 0,
    width: 'var(--nav-logo-width)',
    height: 'var(--nav-logo-height)',
    scale: 1,
    opacity: 0,
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
    // Logo travels to the header slot in parallel with the mask reveal
    // expanding to full bleed. Crossfade to the nav logo near the end of
    // the travel.
    reveal: {
      ...logoTravelTarget,
      transition: {
        ...logoTravelTransition,
        opacity: {
          delay: crossfadeDelay,
          duration: LOGO_CROSSFADE_MS / 1000,
          ease: [...LOGO_CROSSFADE_EASE],
        },
      },
    },
    final: {
      ...logoTravelTarget,
      transition: { duration: 0 },
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
        initial={skipIntro ? false : { clipPath: CLIP_LINE, opacity: 1 }}
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

      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[60] overflow-hidden"
        style={{ transformOrigin: '50% 50%' }}
        initial={
          skipIntro
            ? false
            : {
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: 'var(--nav-logo-width)',
                height: 'var(--nav-logo-height)',
                scale: INTRO_LOGO_SCALE,
                opacity: 0,
                filter: 'blur(10px)',
              }
        }
        variants={logoVariants}
        animate={stage}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 72vw, 448px"
          className="select-none object-contain object-center"
          draggable={false}
          onLoadingComplete={() => setLogoReady(true)}
        />
      </motion.div>

      <motion.div
        initial={skipIntro ? false : { opacity: 0, y: 10 }}
        animate={stage === 'final' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={skipIntro ? { duration: 0 } : { duration: 1.0, ease: EASE, delay: 0.25 }}
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
