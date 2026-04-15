import type { ResidenceStatus } from '@/components/ui/StatusBadge';
import { residenceGallery, studioGallery } from './placeholder-images';

export type Residence = {
  _id: string;
  name: string;
  slug: string;
  status: ResidenceStatus;
  featuredImage: string;
  gallery: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  internalArea: number;
  externalArea?: number;
  description: string;
};

export const residences: Residence[] = [
  {
    _id: '1',
    name: 'Residence 01 — Marina View',
    slug: 'residence-01',
    status: 'Available',
    featuredImage: residenceGallery[0],
    gallery: residenceGallery.slice(0, 6),
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    internalArea: 112,
    externalArea: 18,
    description:
      'A generous two-bedroom residence oriented north-east over the marina. Full-height sliders open the living space to a deep covered terrace, with a stone kitchen anchoring the plan.',
  },
  {
    _id: '2',
    name: 'Residence 04 — Harbour Corner',
    slug: 'residence-04',
    status: 'Under Offer',
    featuredImage: residenceGallery[3],
    gallery: residenceGallery.slice(3, 9),
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    internalArea: 124,
    externalArea: 22,
    description:
      'A dual-aspect corner home capturing both the morning harbour light and the soft wash of late afternoon sun along the headland. Expansive terraces on two sides.',
  },
  {
    _id: '3',
    name: 'Residence 07 — Water Studio',
    slug: 'residence-07',
    status: 'Available',
    featuredImage: studioGallery[0],
    gallery: studioGallery,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    internalArea: 62,
    externalArea: 8,
    description:
      'A considered one-bedroom studio with linen-toned interiors, crafted joinery and a quiet outlook across the inner marina.',
  },
  {
    _id: '4',
    name: 'Residence 09 — Sky Terrace',
    slug: 'residence-09',
    status: 'Sold',
    featuredImage: residenceGallery[6],
    gallery: residenceGallery.slice(6),
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    internalArea: 138,
    externalArea: 34,
    description:
      'A rooftop residence with wrap-around terrace and private plunge pool. The most expansive floor plan in the collection.',
  },
];

export function getResidenceBySlug(slug: string) {
  return residences.find((r) => r.slug === slug) || null;
}
