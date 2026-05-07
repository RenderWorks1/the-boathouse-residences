'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let cancelled = false;
    const tryPlay = (el: HTMLVideoElement) => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const onPlaying = () => setStarted(true);

    const onTime = (self: HTMLVideoElement, partner: HTMLVideoElement, swapTo: 'a' | 'b') => () => {
      if (cancelled) return;
      const d = self.duration;
      if (!d || !Number.isFinite(d)) return;
      if (d - self.currentTime <= CROSSFADE && partner.paused) {
        partner.currentTime = 0;
        tryPlay(partner);
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
    a.addEventListener('playing', onPlaying);
    b.addEventListener('playing', onPlaying);

    a.playbackRate = playbackRate;
    b.playbackRate = playbackRate;
    a.load();
    b.load();
    tryPlay(a);

    return () => {
      cancelled = true;
      a.removeEventListener('timeupdate', aTime);
      b.removeEventListener('timeupdate', bTime);
      a.removeEventListener('ended', onAEnded);
      b.removeEventListener('ended', onBEnded);
      a.removeEventListener('playing', onPlaying);
      b.removeEventListener('playing', onPlaying);
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
      <video
        ref={aRef}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
        style={{ opacity: started && active === 'a' ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={bRef}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
        style={{ opacity: started && active === 'b' ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
