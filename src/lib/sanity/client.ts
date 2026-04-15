import { createClient, type SanityClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export const sanityWriteClient: SanityClient | null =
  isSanityConfigured && process.env.SANITY_API_TOKEN
    ? createClient({
        projectId: projectId!,
        dataset,
        apiVersion,
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
      })
    : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}
