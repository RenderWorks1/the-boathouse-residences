import type { MetadataRoute } from 'next';
import { residences } from '@/lib/placeholder-residences';

const base = 'https://theboathouseresidences.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/lifestyle', '/residences', '/vision', '/updates', '/enquire'];
  const staticEntries = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));
  const residenceEntries = residences.map((r) => ({
    url: `${base}/residences/${r.slug}`,
    lastModified: now,
  }));
  return [...staticEntries, ...residenceEntries];
}
