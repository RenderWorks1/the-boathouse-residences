import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-deep-navy text-linen-white">
      <div className="section-px section-py-tight w-full max-w-none">
        <div className="text-center font-sans font-light leading-loose text-driftwood text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
          <p className="font-display uppercase tracking-[0.3em] text-linen-white text-[clamp(0.75rem,0.35vw+0.65rem,0.9rem)]">
            Sales Suite Open Daily
          </p>
          <p className="mt-[clamp(0.75rem,2vw,1.25rem)]">123 Boathouse Way, Waterfront City</p>
          <p>1300 BOATHOUSE</p>
          <p>
            <a href="mailto:info@boathouseresidences.com" className="hover:text-linen-white transition-colors">
              info@boathouseresidences.com
            </a>
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] h-px w-full bg-linen-white/10" />

        <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-section md:grid-cols-3 md:items-center">
          <div className="flex items-center justify-center md:justify-start">
            <div className="font-display text-linen-white/70">
              <p className="uppercase tracking-[0.3em] text-[clamp(0.65rem,0.25vw+0.55rem,0.75rem)]">
                Developed by
              </p>
              <p className="mt-1 tracking-wide text-[clamp(1rem,1vw+0.75rem,1.25rem)]">Boathouse Group</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[clamp(1rem,2.5vw,1.75rem)]">
            <a
              href="#"
              aria-label="Instagram"
              className="text-driftwood transition-colors hover:text-linen-white"
            >
              <Instagram className="h-[clamp(1rem,2.2vw,1.35rem)] w-[clamp(1rem,2.2vw,1.35rem)]" strokeWidth={1.25} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-driftwood transition-colors hover:text-linen-white"
            >
              <Facebook className="h-[clamp(1rem,2.2vw,1.35rem)] w-[clamp(1rem,2.2vw,1.35rem)]" strokeWidth={1.25} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="font-sans tracking-wide text-driftwood text-[clamp(0.65rem,0.25vw+0.55rem,0.8rem)]">
              © {new Date().getFullYear()} The Boathouse Residences. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center gap-[clamp(0.75rem,2vw,1.1rem)] uppercase tracking-[0.2em] text-driftwood/70 md:justify-end text-[clamp(0.625rem,0.2vw+0.52rem,0.7rem)]">
              <Link href="/enquire" className="hover:text-linen-white transition-colors">Contact</Link>
              <span>·</span>
              <Link href="/updates" className="hover:text-linen-white transition-colors">Updates</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
