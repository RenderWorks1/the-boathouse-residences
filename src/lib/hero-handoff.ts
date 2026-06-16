/** Fired when the hero peel finishes and the media is full-bleed (`final` stage). Nav chrome (links, CTAs) may appear. */
export const HERO_EXPANDED_EVENT = 'boathouse:hero-expanded';

/** Fired when the flying logo hands off to the real header logo (crossfade). */
export const HERO_HANDOFF_EVENT = 'boathouse:hero-handoff';

/**
 * Module-level flag that survives client-side navigation but resets on hard
 * refresh — lets Hero and Navigation share the "intro already played this
 * session" decision without depending on event-dispatch timing across the
 * parent/child useEffect boundary.
 */
let heroIntroPlayed = false;

/**
 * True once the persistent app shell (nav) has mounted. Set after the first
 * page is shown, so it stays false during the very first document load and
 * becomes true for every client-side navigation thereafter. Resets on hard
 * refresh.
 */
let appMounted = false;

export function hasHeroIntroPlayed() {
  return heroIntroPlayed;
}

export function markHeroIntroPlayed() {
  heroIntroPlayed = true;
}

export function markAppMounted() {
  appMounted = true;
}

/**
 * The brand intro should play only on a genuine first/direct load of the home
 * page. Skip it if it already played this session, or if the app shell has
 * already mounted — i.e. the user reached home via client-side navigation
 * (e.g. clicking the nav logo from another page).
 */
export function shouldSkipHeroIntro() {
  return heroIntroPlayed || appMounted;
}

export function dispatchHeroExpanded() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(HERO_EXPANDED_EVENT));
}

export function dispatchHeroHandoff() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(HERO_HANDOFF_EVENT));
}

/** Run expanded + logo handoff in one synchronous turn so nav chrome and crossfade start together. */
export function dispatchHeroFinalReveal() {
  dispatchHeroExpanded();
  dispatchHeroHandoff();
}
