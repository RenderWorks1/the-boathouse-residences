'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const sources = [
  'Direct Mail',
  'Website',
  'Social Media',
  'Referral',
  'Real Estate Portal',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function EnquiryForm({
  variant = 'section',
  residenceId,
}: {
  variant?: 'section' | 'page';
  residenceId?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    if (residenceId) (payload as Record<string, unknown>).residenceId = residenceId;

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Submission failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  const inputClass =
    'w-full border-b border-charcoal/20 bg-transparent px-0 py-[clamp(0.65rem,1.2vw,0.85rem)] font-sans text-charcoal placeholder:text-charcoal/45 focus:border-harbour focus:outline-none ' +
    'text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]';

  const body = (
    <>
      <ScrollReveal className="mb-[clamp(2rem,4vw,3rem)] flex flex-col items-center gap-section-sm text-center">
        <h2 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
          Enquire Now
        </h2>
        <p className="type-body mt-2 font-sans text-charcoal">
          Leave your details and our sales team will be in touch with availability,
          price guides and private viewing times.
        </p>
      </ScrollReveal>

      {status === 'success' ? (
        <ScrollReveal>
          <div className="mx-auto w-full max-w-none rounded-sm border border-harbour/20 bg-linen-white/60 p-[clamp(1.75rem,4vw,2.75rem)] text-center">
            <p className="font-display text-[clamp(1.25rem,1vw+1rem,1.5rem)] text-harbour">Thank you.</p>
            <p className="type-body mt-3 font-sans text-charcoal">
              We&apos;ve received your enquiry. Our team will be in touch shortly.
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal>
          <form onSubmit={onSubmit} className="w-full max-w-none">
            <div className="grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.75rem)] md:grid-cols-2">
              <input name="firstName" placeholder="First Name" className={inputClass} />
              <input name="lastName" placeholder="Last Name" className={inputClass} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                className={inputClass}
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone Number *"
                className={inputClass}
              />
            </div>

            <div className="mt-8">
              <label className="block font-sans uppercase tracking-[0.25em] text-rope text-[clamp(0.625rem,0.2vw+0.52rem,0.7rem)]">
                How did you hear about us?
              </label>
              <select
                name="source"
                defaultValue=""
                className={cn(inputClass, 'mt-2 cursor-pointer')}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {status === 'error' && (
              <p className="mt-6 font-sans text-sm text-sold">{error}</p>
            )}

            <div className="mt-[clamp(1.75rem,3vw,2.5rem)] flex justify-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center rounded-full bg-cta font-sans uppercase tracking-[0.25em] text-white transition-colors hover:bg-cta-hover disabled:opacity-60 md:w-auto px-[clamp(1.75rem,3.5vw,2.75rem)] py-[clamp(0.85rem,1.5vw,1.1rem)] text-[clamp(0.625rem,0.28vw+0.52rem,0.75rem)]"
              >
                {status === 'loading' ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
        </ScrollReveal>
      )}

      <div className="mt-[clamp(2.5rem,5vw,4rem)] text-center font-sans font-light leading-loose text-charcoal/70 text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
        <p className="font-display uppercase tracking-[0.3em] text-harbour text-[clamp(0.65rem,0.22vw+0.55rem,0.8rem)]">
          Sales Suite Open Daily
        </p>
        <p className="mt-3 text-sm">123 Boathouse Way, Waterfront City</p>
        <p className="text-sm">1300 BOATHOUSE</p>
        <p className="text-sm">info@boathouseresidences.com</p>
      </div>
    </>
  );

  return (
    <section
      id="enquire"
      className={cn('bg-salt', variant === 'section' ? 'section-py' : 'section-py-tight')}
    >
      <div
        className={cn(
          'w-full px-[calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))]',
          variant === 'section' ? 'mx-auto max-w-3xl' : 'max-w-none',
        )}
      >
        {body}
      </div>
    </section>
  );
}
