import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Register your interest with the sales team at The Boathouse Residences.',
};

export default function EnquirePage() {
  return (
    <>
      <section className="bg-salt pt-[clamp(7rem,14vw+2rem,10rem)]">
        <div className="section-px section-py-tight w-full max-w-none">
          <ScrollReveal className="mx-auto flex max-w-[60rem] flex-col items-center gap-[clamp(1.75rem,4vw,3rem)] text-center">
            <h1 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
              Enquire Now
            </h1>
            <p className="text-balance font-sans text-[clamp(1rem,0.5vw+0.88rem,1.25rem)] font-light leading-[1.65] text-charcoal max-w-[44rem]">
              Our sales team will be in touch to welcome you to your new address on the water…
            </p>

            <div className="mt-[clamp(1rem,2.5vw,1.75rem)] grid w-full grid-cols-1 gap-[clamp(1rem,2.5vw,1.75rem)] font-sans text-charcoal/80 text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)] sm:grid-cols-3">
              <span className="flex items-start justify-center gap-3">
                <MapPin
                  className="mt-0.5 h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour"
                  strokeWidth={1.25}
                />
                <span className="text-left">
                  Display Suite open
                  <br />
                  by private appointment
                </span>
              </span>
              <a
                className="flex items-center justify-center gap-3 transition-colors hover:text-harbour"
                href="tel:+64210272 0203"
              >
                <Phone
                  className="h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour"
                  strokeWidth={1.25}
                />
                <span>021 027 20203</span>
              </a>
              <a
                className="flex items-center justify-center gap-3 transition-colors hover:text-harbour"
                href="mailto:info@boathouseresidences.com"
              >
                <Mail
                  className="h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour"
                  strokeWidth={1.25}
                />
                <span>info@boathouseresidences.com</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <EnquiryForm variant="page" />

      <section id="map" className="bg-linen-white pb-[var(--section-pad-y)]">
        <div className="section-px w-full max-w-none">
          <div className="aspect-[21/9] w-full overflow-hidden bg-driftwood/30">
            <iframe
              title="Hobsonville Marina map"
              loading="lazy"
              className="h-full w-full border-0"
              src="https://www.google.com/maps?q=Hobsonville+Marina+Auckland&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
