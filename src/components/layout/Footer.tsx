import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-deep-navy text-linen-white">
      <div className="section-px section-py-tight w-full max-w-none">
        <div className="flex justify-center">
          <Link
            href="/"
            className="relative mb-[clamp(1.75rem,4vw,2.75rem)] block h-[clamp(6.5rem,22vw,14rem)] w-[min(98vw,90rem)] overflow-hidden"
          >
            <Image
              src="/images/logo4subtext.png"
              alt="The Boathouse Residences — Hobsonville, Pine Harbour, and Bayswater Marinas"
              fill
              className="object-contain object-center mix-blend-lighten"
              sizes="(max-width: 768px) 98vw, 1440px"
            />
          </Link>
        </div>

        <div className="text-center font-sans font-light leading-loose text-driftwood text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
          <p>123 Boathouse Way, Waterfront City</p>
          <p>1300 BOATHOUSE</p>
          <p>
            <a href="mailto:info@boathouseresidences.com" className="hover:text-linen-white transition-colors">
              info@boathouseresidences.com
            </a>
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] h-px w-full bg-linen-white/10" />

        <div className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] md:grid-cols-3 md:items-center md:gap-4">
          <div className="text-left">
            <p className="font-sans tracking-wide text-driftwood text-[clamp(0.65rem,0.25vw+0.55rem,0.8rem)]">
              © {new Date().getFullYear()} The Boathouse Residences. All rights reserved.
            </p>
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

          <div className="flex flex-wrap justify-end gap-[clamp(0.75rem,2vw,1.1rem)] uppercase tracking-[0.2em] text-driftwood/70 text-[clamp(0.625rem,0.2vw+0.52rem,0.7rem)] md:text-right">
            <Link href="/enquire" className="hover:text-linen-white transition-colors">Contact</Link>
            <span className="text-driftwood/50">·</span>
            <Link href="/updates" className="hover:text-linen-white transition-colors">Updates</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
