/** Fired when the hero peel finishes and the media is full-bleed (`final` stage). Nav chrome (links, CTAs) may appear. */
export const HERO_EXPANDED_EVENT = 'boathouse:hero-expanded';

/** Fired when the flying logo hands off to the real header logo (crossfade). */
export const HERO_HANDOFF_EVENT = 'boathouse:hero-handoff';

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
