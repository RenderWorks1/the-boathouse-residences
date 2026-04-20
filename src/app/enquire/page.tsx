import Image from 'next/image';
import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Register your interest with the sales team at The Boathouse Residences.',
};

export default function EnquirePage() {
  return (
    <>
      <section className="bg-linen-white pt-[clamp(5.5rem,12vw+2rem,8rem)]">
        <div className="grid w-full max-w-none grid-cols-1 gap-0 md:grid-cols-2">
          <div className="relative hidden min-h-[min(50vh,45vw)] md:block">
            <Image
              src="/images/2bedroom_v7.jpg"
              alt="The Boathouse Residences"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="bg-salt section-px py-[var(--section-pad-y)] md:py-[var(--section-pad-y)]">
            <Eyebrow>Register Interest</Eyebrow>
            <div className="mt-[clamp(0.5rem,1.5vw,0.85rem)]">
              <h1 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
                Enquire
              </h1>
            </div>
            <p className="type-body mt-[clamp(1.25rem,3vw,1.75rem)] font-sans text-charcoal">
              Leave your details with our sales team and we&apos;ll be in touch with availability,
              price guides and private viewing times.
            </p>

            <div className="mt-[clamp(2rem,4vw,2.75rem)] flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)] font-sans text-charcoal/80 text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
              <a className="flex items-start gap-3 hover:text-harbour" href="#map">
                <MapPin
                  className="mt-0.5 h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour"
                  strokeWidth={1.25}
                />
                <span>
                  Sales Suite — 123 Boathouse Way,
                  <br /> Waterfront City
                </span>
              </a>
              <a className="flex items-center gap-3 hover:text-harbour" href="tel:1300262846">
                <Phone className="h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour" strokeWidth={1.25} />
                <span>1300 BOATHOUSE</span>
              </a>
              <a className="flex items-center gap-3 hover:text-harbour" href="mailto:info@boathouseresidences.com">
                <Mail className="h-[clamp(1rem,2.2vw,1.2rem)] w-[clamp(1rem,2.2vw,1.2rem)] shrink-0 text-harbour" strokeWidth={1.25} />
                <span>info@boathouseresidences.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <EnquiryForm variant="page" />

      <section id="map" className="bg-linen-white pb-[var(--section-pad-y)]">
        <div className="section-px w-full max-w-none">
          <div className="aspect-[21/9] w-full overflow-hidden bg-driftwood/30">
            <iframe
              title="Sales Suite map"
              loading="lazy"
              className="h-full w-full border-0"
              src="https://www.google.com/maps?q=Darling+Harbour+Sydney&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
