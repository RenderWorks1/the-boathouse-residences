'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ParallaxSectionProps = {
  image: string;
  alt?: string;
  /** Section height. Preset tokens or any CSS value. Default `'lg'`. */
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'screen' | string;
  /** 0–1. Dark overlay opacity over the image. Default 0. */
  overlayOpacity?: number;
  /** Optional centred content (headline, copy, CTA) rendered over the image. */
  children?: ReactNode;
  className?: string;
  /** Kept for API compatibility — ignored in fixed-background mode. */
  strength?: number;
  /** Kept for API compatibility — ignored (CSS background can't be `priority`). */
  priority?: boolean;
};

const heightPresets: Record<string, string> = {
  sm: 'h-[40vh] min-h-[20rem]',
  md: 'h-[55vh] min-h-[22rem]',
  lg: 'h-[70vh] min-h-[26rem]',
  xl: 'h-[85vh] min-h-[32rem]',
  screen: 'h-screen',
};

function resolveHeight(height: ParallaxSectionProps['height']) {
  if (!height) return heightPresets.lg;
  if (height in heightPresets) return heightPresets[height as keyof typeof heightPresets];
  return undefined;
}

export function ParallaxSection({
  image,
  alt,
  height = 'lg',
  overlayOpacity = 0,
  children,
  className,
}: ParallaxSectionProps) {
  const resolvedHeightClass = resolveHeight(height);
  const inlineHeight = resolvedHeightClass ? undefined : { height };
  const safeOverlay = Math.max(0, Math.min(1, overlayOpacity));

  return (
    <section
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      style={inlineHeight}
      className={cn(
        'relative w-full overflow-hidden bg-deep-navy',
        resolvedHeightClass,
        className,
      )}
    >
      {/*
        The image is painted as a CSS background with `background-attachment: fixed` on desktop,
        which anchors it to the viewport while the section (and the rest of the page) scrolls
        past. Mobile falls back to `scroll` because iOS Safari ignores `fixed` — the image is
        still `cover`-cropped and sharp, just not locked to the viewport.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat [background-attachment:scroll] md:[background-attachment:fixed] motion-reduce:[background-attachment:scroll]"
        style={{ backgroundImage: `url(${image})` }}
      />

      {safeOverlay > 0 && (
        <div aria-hidden className="absolute inset-0 bg-deep-navy" style={{ opacity: safeOverlay }} />
      )}

      {children ? (
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-linen-white md:px-10">
          <div className="max-w-3xl">{children}</div>
        </div>
      ) : null}
    </section>
  );
}
