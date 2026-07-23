/**
 * Shared submit path for every enquiry form on the site.
 *
 * Generates one event ID per submission attempt and hands that same ID to the
 * browser Pixel and (via the request body) the server Conversions API, so Meta
 * recognises the pair as one conversion and deduplicates it.
 *
 * The browser Lead fires only after the API confirms success. It does not fire
 * on submit-button click, on a validation failure, or on a request that errored
 * — a retry re-enters this function and mints a fresh ID, so a retried
 * submission is a new event rather than a duplicate of a failed one.
 *
 * Any future lead-generating form (brochure download, project-specific enquiry)
 * should call this instead of fetching /api/enquiry directly, and gets correct
 * Pixel + CAPI tracking for free.
 */

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
  }
}

export async function submitLead(payload: Record<string, unknown>): Promise<void> {
  const leadEventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const res = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, leadEventId }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || 'Submission failed');
  }

  // Only a confirmed 2xx reaches this line.
  window.fbq?.('track', 'Lead', {}, { eventID: leadEventId });
}
