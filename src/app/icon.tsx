import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';

/** Browser tab / bookmark icon. Rendered large and left to downscale, so it
 *  stays sharp on the 32px and 48px slots as well as the 16px one. */
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<BrandMark size={size.width} />, size);
}
