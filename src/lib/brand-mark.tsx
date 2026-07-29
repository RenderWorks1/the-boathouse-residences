import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Shared artwork for the generated icons.
 *
 * Satori (behind next/og) can't read files or fetch at render time, so the
 * logo is loaded once here at module scope and inlined as a data URI.
 */
export const DEEP_NAVY = '#1A2228';
export const LINEN_WHITE = '#EFEBE4';

const logo = readFileSync(join(process.cwd(), 'public/logos/logo-white.png'));
export const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

/** Natural size of logo-white.png. */
const LOGO_W = 1600;
const LOGO_H = 452;

/** Measured bounding box of the B in BOATHOUSE, in the logo's own pixels. The
 *  full wordmark is 3.5:1 and hairline-thin, so it turns to mush anywhere near
 *  favicon sizes — a browser tab gets 16px. The single letter survives. */
const B = { x: 31, y: 126, w: 94, h: 152 };

/**
 * The B alone, centred in a square, by scaling the whole wordmark up and
 * clipping to just that glyph — cheaper and sharper than shipping a second
 * cropped asset that could drift from the logo.
 *
 * `fill` is how much of the square's height the letter takes up.
 */
export function BrandMark({ size, fill = 0.52 }: { size: number; fill?: number }) {
  const scale = (size * fill) / B.h;
  const markW = B.w * scale;
  const markH = B.h * scale;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DEEP_NAVY,
      }}
    >
      {/* Clipped to the glyph's own box, not to the square: the wordmark is one
          image, so anything looser lets the neighbouring T and O bleed in. */}
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: markW,
          height: markH,
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={LOGO_W * scale}
          height={LOGO_H * scale}
          style={{
            position: 'absolute',
            left: -B.x * scale,
            top: -B.y * scale,
          }}
        />
      </div>
    </div>
  );
}
