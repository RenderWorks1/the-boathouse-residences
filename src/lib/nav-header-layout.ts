/**
 * Shared layout strings for the fixed header row and logo wrapper.
 * Navigation and Hero flying logo must use these verbatim so size/position match.
 */
export const NAV_HEADER_ROW_CLASS =
  'relative flex min-h-[var(--nav-header-bar-height)] w-full items-center section-px py-[calc(var(--nav-pad-y)+0.5rem)] md:py-[var(--nav-pad-y)]';

export const NAV_LOGO_WRAPPER_CLASS =
  'absolute left-1/2 top-1/2 z-10 block h-[var(--nav-logo-height)] w-[var(--nav-logo-width)] -translate-x-1/2 -translate-y-1/2 shrink-0 overflow-hidden md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0';

/** Flying logo: viewport-centre hero mark → header slot (Hero `final` variant — keep in sync). */
export const LOGO_TRAVEL_S = 1.85;

/** Logo crossfade: flying layer out + nav logo in — same ms and curve in both places. */
export const LOGO_CROSSFADE_MS = 420;
export const LOGO_CROSSFADE_EASE = [0.4, 0, 0.2, 1] as const;

/** When to fire handoff so crossfade ends as travel finishes. */
export function logoHandoffDelayMs() {
  return Math.max(0, Math.round(LOGO_TRAVEL_S * 1000 - LOGO_CROSSFADE_MS));
}

export function logoOpacityTransitionCss() {
  const [a, b, c, d] = LOGO_CROSSFADE_EASE;
  return `opacity ${LOGO_CROSSFADE_MS}ms cubic-bezier(${a}, ${b}, ${c}, ${d})`;
}
