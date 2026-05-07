import { HeroVideo } from '@/components/shared/HeroVideo';

/**
 * Full-bleed continuously-looping video section. Uses HeroVideo for the
 * crossfaded seamless loop and overlays a subtle dark tint for legibility
 * and tonal consistency with the rest of the page.
 */
export function FullBleedVideo({
  src,
  poster,
  alt,
  height = 'min(80vh, 80dvh)',
  tint = 'rgba(26, 34, 40, 0.32)',
}: {
  src: string;
  poster: string;
  alt: string;
  /** Section height. Any CSS value. Default ~80vh. */
  height?: string;
  /** Overlay colour (rgba/hex). Default Harbour-Slate-tinged shadow. */
  tint?: string;
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-deep-navy"
      style={{ height }}
      role="img"
      aria-label={alt}
    >
      <HeroVideo src={src} poster={poster} alt={alt} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: tint }}
      />
    </section>
  );
}
