'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  attemptPlay,
  primeForAutoplay,
  useAutoplayVideo,
  useSaveData,
} from '@/lib/video-autoplay';

/** Seconds before each clip's end to begin handing off to the partner. The
 *  partner is started + faded in over this window so there's no visible cut
 *  at the loop point. */
const CROSSFADE = 1.4;
/** Default playback rate — <1 slows the clip down for a calmer, more cinematic feel. */
const DEFAULT_PLAYBACK_RATE = 0.65;

/**
 * Seamlessly looping hero video using two stacked <video> elements that
 * crossfade. Eliminates the brief stutter native `loop` causes when a clip's
 * first/last frames don't match — by the time clip A is at its tail, clip B
 * has already started playing from t=0 underneath, and we fade between them.
 */
export function HeroVideo({
  src,
  poster,
  alt,
  playbackRate = DEFAULT_PLAYBACK_RATE,
}: {
  src: string;
  poster: string;
  alt: string;
  playbackRate?: number;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<'a' | 'b'>('a');
  /** True only once frames are genuinely advancing — until then the poster
   *  image below stays on top, so the browser's own play-button overlay is
   *  never what the visitor sees. */
  const playing = useAutoplayVideo([aRef, bRef]);
  /** Data Saver: don't pull two copies of a decorative clip down a connection
   *  the visitor has asked us to go easy on. The poster carries the section. */
  const saveData = useSaveData();
  const started = playing && !saveData;

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let cancelled = false;

    const onTime = (self: HTMLVideoElement, partner: HTMLVideoElement, swapTo: 'a' | 'b') => () => {
      if (cancelled) return;
      const d = self.duration;
      if (!d || !Number.isFinite(d)) return;
      if (d - self.currentTime <= CROSSFADE && partner.paused) {
        partner.currentTime = 0;
        attemptPlay(partner);
        setActive(swapTo);
      }
    };

    const onAEnded = () => {
      // Once A has fully handed off, reset it so it's ready for next swap.
      a.pause();
      a.currentTime = 0;
    };
    const onBEnded = () => {
      b.pause();
      b.currentTime = 0;
    };

    const aTime = onTime(a, b, 'b');
    const bTime = onTime(b, a, 'a');

    a.addEventListener('timeupdate', aTime);
    b.addEventListener('timeupdate', bTime);
    a.addEventListener('ended', onAEnded);
    b.addEventListener('ended', onBEnded);

    // Keep the rate pinned — a reload after a stalled start resets it.
    const pinRate = () => {
      a.playbackRate = playbackRate;
      b.playbackRate = playbackRate;
    };
    a.addEventListener('play', pinRate);
    b.addEventListener('play', pinRate);

    primeForAutoplay(a);
    primeForAutoplay(b);
    pinRate();
    attemptPlay(a);

    return () => {
      cancelled = true;
      a.removeEventListener('timeupdate', aTime);
      b.removeEventListener('timeupdate', bTime);
      a.removeEventListener('ended', onAEnded);
      b.removeEventListener('ended', onBEnded);
      a.removeEventListener('play', pinRate);
      b.removeEventListener('play', pinRate);
    };
  }, [playbackRate]);

  return (
    <>
      {/* Poster image sits beneath both videos so it shows during the very
          first decode and acts as a fallback if the video can't play. */}
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Under Data Saver the videos are never mounted, so nothing downloads
          and the poster above is the whole hero. Every other case still mounts
          them: only A autoplays — B is the crossfade partner and must stay
          paused until the handoff. useAutoplayVideo re-primes and retries for
          the cases the attribute can't cover (Low Power Mode, backgrounded
          load) and holds the poster on top until frames actually advance. */}
      {saveData ? null : (
        <>
          <video
            ref={aRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
            style={{ opacity: started && active === 'a' ? 1 : 0 }}
          >
            <source src={src} type="video/mp4" />
          </video>
          <video
            ref={bRef}
            muted
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
            style={{ opacity: started && active === 'b' ? 1 : 0 }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </>
      )}
    </>
  );
}
