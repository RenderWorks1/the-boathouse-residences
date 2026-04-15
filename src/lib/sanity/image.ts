import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { projectId, dataset } from './client';

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity not configured');
  return builder.image(source);
}
