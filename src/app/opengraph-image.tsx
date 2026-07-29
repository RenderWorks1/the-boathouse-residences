import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * The card Google, Facebook, LinkedIn, WhatsApp and iMessage show when the
 * site is shared or previewed. Generated rather than committed as a flat file
 * so it stays in step with the logo and brand colours.
 *
 * Satori (which backs ImageResponse) can't reach the filesystem or the network
 * at render time, so the logo is read here at module scope and inlined.
 */
export const alt = 'The Boathouse Residences — waterfront homes at Hobsonville Marina, Auckland';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DEEP_NAVY = '#1A2228';
const LINEN_WHITE = '#EFEBE4';

const logo = readFileSync(join(process.cwd(), 'public/logos/logo-white.png'));
const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: DEEP_NAVY,
        }}
      >
        {/* Hairline frame — echoes the rule under the hero logo and stops the
            card reading as a bare rectangle in a crowded feed. */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: `1px solid ${LINEN_WHITE}`,
            opacity: 0.22,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={760} height={215} />
      </div>
    ),
    size,
  );
}
