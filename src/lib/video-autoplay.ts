'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Inline background video autoplay, made reliable.
 *
 * A muted inline video is still blocked outright in iOS Low Power Mode, in
 * Data Saver, when the tab is backgrounded during load, and whenever a
 * hydration reorder leaves the element momentarily un-muted. A blocked video
 * is exactly what makes the browser paint its play-button overlay.
 *
 * `primeForAutoplay` guarantees the element itself satisfies every autoplay
 * precondition; `useAutoplayVideo` retries on every signal that can lift a
 * block, and reports playback as started only once frames are genuinely
 * advancing — so the caller can keep a poster image on top until then and
 * the play button is never what the visitor sees.
 */

/** The Network Information API isn't in TypeScript's DOM lib, and is absent
 *  entirely in Safari and Firefox — hence every field optional. */
type NetworkInformation = {
  saveData?: boolean;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
};

/**
 * True when the visitor has switched on Data Saver.
 *
 * Distinct from an autoplay block: nothing is stopping the video here, the
 * visitor has simply asked not to be sent large files, and a decorative hero
 * clip is exactly that. Callers should skip the download rather than play it.
 *
 * Deliberately starts `false` and resolves after mount. Reading `navigator`
 * during render would make the server and client markup disagree, and React
 * would discard the hydrated tree. Only Chromium implements this, so Safari
 * and Firefox simply never opt in — Low Power Mode there is still handled by
 * `useAutoplayVideo` holding the poster on top.
 */
export function useSaveData(): boolean {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;
    if (!conn) return;

    const sync = () => setSaveData(Boolean(conn.saveData));
    sync();
    // The setting can be toggled mid-session.
    conn.addEventListener?.('change', sync);
    return () => conn.removeEventListener?.('change', sync);
  }, []);

  return saveData;
}

/** Force every attribute/property a browser checks before permitting inline
 *  muted playback. Deliberately does *not* touch `autoplay`: that's the
 *  caller's decision, and setting it on a crossfade partner would start it
 *  early and break the handoff. Safe to call repeatedly. */
export function primeForAutoplay(el: HTMLVideoElement) {
  el.muted = true;
  el.defaultMuted = true;
  el.volume = 0;
  el.playsInline = true;
  el.controls = false;
  // Mirror onto the content attributes — older WebKit reads these, not the
  // properties, when deciding whether playback is permitted.
  el.setAttribute('muted', '');
  el.setAttribute('playsinline', '');
  el.setAttribute('webkit-playsinline', 'true');
}

/** Fire-and-forget play attempt. A rejected promise only means the browser
 *  isn't willing to start yet — the next signal will try again. */
export function attemptPlay(el: HTMLVideoElement) {
  primeForAutoplay(el);
  const p = el.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

/** True only when the element is actually rendering frames — `canplay` and
 *  `loadeddata` both fire on videos the browser has refused to start. */
function isProgressing(el: HTMLVideoElement) {
  return !el.paused && !el.ended && el.readyState >= 2 && el.currentTime > 0;
}

/** How long to keep polling before falling back to event/gesture-driven
 *  retries only. Covers a slow first decode without spinning forever when
 *  autoplay is hard-blocked (Low Power Mode). */
const POLL_INTERVAL_MS = 400;
const POLL_ATTEMPTS = 40;
/** Floor between play attempts. `scroll` and `pointerdown` fire in bursts;
 *  without this a hard-blocked video would queue a rejected promise per
 *  event for as long as the visitor keeps scrolling. */
const RETRY_THROTTLE_MS = 250;

/**
 * Keeps one or more decorative videos playing and reports whether playback
 * has genuinely started.
 *
 * Pass every video that makes up the visual (the crossfade pair counts as
 * one): a rescue attempt only fires when *all* of them are paused, so a
 * deliberate handoff between two elements is never interrupted.
 */
export function useAutoplayVideo(
  refs: Array<RefObject<HTMLVideoElement | null>>,
): boolean {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const els = refs.map((r) => r.current).filter(Boolean) as HTMLVideoElement[];
    if (els.length === 0) return;

    els.forEach(primeForAutoplay);

    let cancelled = false;
    let attempts = 0;
    let lastAttempt = 0;

    const sync = () => {
      if (cancelled) return;
      setPlaying(els.some(isProgressing));
    };

    /** Restart the primary element, but only if nothing is running — during a
     *  crossfade the partner is mid-handoff and must be left alone. */
    const rescue = () => {
      if (cancelled) return;
      sync();
      if (els.some((el) => !el.paused)) return;
      const now = Date.now();
      if (now - lastAttempt < RETRY_THROTTLE_MS) return;
      lastAttempt = now;
      attemptPlay(els[0]);
    };

    const elementEvents = [
      'playing',
      'timeupdate',
      'pause',
      'ended',
      'emptied',
      'stalled',
      'error',
    ] as const;
    const loadEvents = ['loadedmetadata', 'loadeddata', 'canplay', 'suspend'] as const;

    els.forEach((el) => {
      elementEvents.forEach((e) => el.addEventListener(e, sync));
      loadEvents.forEach((e) => el.addEventListener(e, rescue));
    });

    // Page-level signals that can lift an autoplay block.
    const onVisibility = () => {
      if (document.visibilityState === 'visible') rescue();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', rescue);
    window.addEventListener('focus', rescue);

    // A user gesture always unblocks playback — this is the safety net for
    // Low Power Mode, where nothing else will ever start the video.
    const gestures = ['touchstart', 'pointerdown', 'click', 'keydown', 'scroll'] as const;
    gestures.forEach((e) =>
      window.addEventListener(e, rescue, { passive: true, capture: true }),
    );

    const poll = window.setInterval(() => {
      if (cancelled) return;
      attempts += 1;
      if (els.some(isProgressing) || attempts > POLL_ATTEMPTS) {
        window.clearInterval(poll);
        sync();
        return;
      }
      rescue();
    }, POLL_INTERVAL_MS);

    rescue();

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      els.forEach((el) => {
        elementEvents.forEach((e) => el.removeEventListener(e, sync));
        loadEvents.forEach((e) => el.removeEventListener(e, rescue));
      });
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', rescue);
      window.removeEventListener('focus', rescue);
      gestures.forEach((e) =>
        window.removeEventListener(e, rescue, { capture: true } as EventListenerOptions),
      );
    };
    // Refs are stable objects — this wires up once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return playing;
}
