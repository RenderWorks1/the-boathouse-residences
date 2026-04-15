import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ResidenceCard } from '@/components/residences/ResidenceCard';
import { residences } from '@/lib/placeholder-residences';

export const metadata: Metadata = {
  title: 'Residences',
  description:
    'A curated collection of one, two and three bedroom waterfront residences at The Boathouse.',
};

export default function ResidencesPage() {
  return (
    <>
      <PageHero image="/images/2bedroom_v5.jpg" eyebrow="The Collection" title="Residences" />

      <section className="bg-salt">
        <div className="section-px section-py-tight w-full max-w-none text-center">
          <ScrollReveal className="flex flex-col items-center gap-section-sm">
            <Eyebrow>Overview</Eyebrow>
            <SectionHeading>An Intimate Collection</SectionHeading>
            <p className="type-body mt-[clamp(0.35rem,1vw,0.5rem)] font-sans text-charcoal">
              Nine residences, each oriented to the water, each meticulously considered.
              From the compact water studio to the rooftop terrace home, every plan responds to
              light, aspect and the particular rhythm of the harbour.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-linen-white">
        <div className="section-px section-py-tight w-full max-w-none">
          <div className="grid gap-[clamp(1.75rem,4vw,2.75rem)] md:grid-cols-2">
            {residences.map((r) => (
              <ScrollReveal key={r._id}>
                <ResidenceCard residence={r} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
