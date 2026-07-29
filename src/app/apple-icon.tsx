import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';

/** Home-screen icon for iOS. Apple rounds the corners itself, so the mark is
 *  set slightly smaller than the tab icon's to survive the crop. */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={size.width} fill={0.46} />, size);
}
