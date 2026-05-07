'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
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

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, opts: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export function EnquiryForm({
  variant = 'section',
  residenceId,
}: {
  variant?: 'section' | 'page';
  residenceId?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [emailMismatch, setEmailMismatch] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    function renderWidget() {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY!,
        callback: (token) => setCaptchaToken(token),
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
        theme: 'light',
      });
    }
    if (window.turnstile) renderWidget();
    else window.onloadTurnstileCallback = renderWidget;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setEmailMismatch(false);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const confirmEmail = String(fd.get('confirmEmail') || '').trim();
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setEmailMismatch(true);
      return;
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setStatus('error');
      setError('Please complete the verification.');
      return;
    }

    setStatus('loading');
    fd.delete('confirmEmail');
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    if (residenceId) payload.residenceId = residenceId;
    if (captchaToken) payload.turnstileToken = captchaToken;

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
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setCaptchaToken('');
      }
    }
  }

  const inputClass =
    'w-full border-b border-charcoal/20 bg-transparent px-0 py-[clamp(0.65rem,1.2vw,0.85rem)] font-sans text-charcoal placeholder:text-charcoal/45 focus:border-harbour focus:outline-none ' +
    'text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]';

  const body = (
    <>
      {variant === 'section' && (
        <ScrollReveal className="mb-[clamp(2rem,4vw,3rem)] flex flex-col items-center gap-section-sm text-center">
          <h2 className="w-full font-sans font-light tracking-tight text-charcoal/45 leading-[1.15] pb-[0.18em] text-[clamp(1.65rem,3.4vw+0.85rem,4.25rem)]">
            Enquire Now
          </h2>
          <p className="type-body mt-2 font-sans text-charcoal">
            Our sales team will be in touch to welcome you to your new address on the water…
          </p>
        </ScrollReveal>
      )}

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
                name="confirmEmail"
                type="email"
                required
                placeholder="Confirm Email Address *"
                className={inputClass}
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone Number *"
                className={cn(inputClass, 'md:col-span-2')}
              />
            </div>

            {emailMismatch && (
              <p className="mt-3 font-sans text-sm text-sold">
                Email addresses do not match.
              </p>
            )}

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

            {TURNSTILE_SITE_KEY && (
              <div
                ref={turnstileRef}
                className="mt-[clamp(1.75rem,3vw,2.25rem)] flex min-h-[65px] justify-center"
              />
            )}

            {status === 'error' && (
              <p className="mt-6 font-sans text-sm text-sold">{error}</p>
            )}

            <div className="mt-[clamp(1.75rem,3vw,2.5rem)] flex justify-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center rounded-full bg-harbour font-sans uppercase tracking-[0.25em] text-white transition-colors hover:bg-deep-navy disabled:opacity-60 md:w-auto px-[clamp(1.75rem,3.5vw,2.75rem)] py-[clamp(0.85rem,1.5vw,1.1rem)] text-[clamp(0.625rem,0.28vw+0.52rem,0.75rem)]"
              >
                {status === 'loading' ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
        </ScrollReveal>
      )}
    </>
  );

  return (
    <section
      id="enquire"
      className={cn('bg-salt', variant === 'section' ? 'section-py' : 'section-py-tight')}
    >
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
          strategy="afterInteractive"
          async
          defer
        />
      )}
      <div
        className={cn(
          'w-full',
          variant === 'section'
            ? 'mx-auto max-w-3xl px-[calc(var(--section-pad-x)+clamp(0.75rem,3vw,2rem))]'
            : 'mx-auto max-w-5xl px-[calc(var(--section-pad-x)+clamp(1.5rem,6vw,5rem))]',
        )}
      >
        {body}
      </div>
    </section>
  );
}
