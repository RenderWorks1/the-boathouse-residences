import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading';
import { SpecsBar } from '@/components/residences/SpecsBar';
import { ResidenceGallery } from '@/components/residences/Lightbox';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';
import { residences, getResidenceBySlug } from '@/lib/placeholder-residences';
import { ChevronLeft } from 'lucide-react';

export function generateStaticParams() {
  return residences.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResidenceBySlug(params.slug);
  if (!r) return { title: 'Residence Not Found' };
  return {
    title: r.name,
    description: r.description,
  };
}

export default function ResidencePage({ params }: { params: { slug: string } }) {
  const residence = getResidenceBySlug(params.slug);
  if (!residence) notFound();

  return (
    <>
      <PageHero image={residence.featuredImage} eyebrow="Residence" title={residence.name} />

      <section className="bg-linen-white">
        <div className="section-px w-full max-w-none py-[clamp(2.5rem,6vw,6rem)]">
          <div className="mb-[clamp(1.75rem,4vw,2.75rem)] flex items-center justify-between">
            <Link
              href="/residences"
              className="inline-flex items-center gap-[clamp(0.35rem,1vw,0.5rem)] font-sans uppercase tracking-[0.25em] text-harbour hover:text-cta text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]"
            >
              <ChevronLeft className="h-[clamp(0.875rem,2vw,1rem)] w-[clamp(0.875rem,2vw,1rem)]" strokeWidth={1.25} />
              Back to Residences
            </Link>
            <StatusBadge status={residence.status} />
          </div>

          <ScrollReveal>
            <SpecsBar
              bedrooms={residence.bedrooms}
              bathrooms={residence.bathrooms}
              parking={residence.parking}
              internalArea={residence.internalArea}
              externalArea={residence.externalArea}
            />
          </ScrollReveal>

          <ScrollReveal className="mt-[clamp(2.5rem,6vw,4rem)] w-full max-w-none text-center">
            <Eyebrow>Description</Eyebrow>
            <div className="mt-[clamp(0.75rem,2vw,1.25rem)]">
              <SectionHeading>A Considered Home</SectionHeading>
            </div>
            <p className="type-body mt-[clamp(1.25rem,3vw,1.75rem)] font-sans text-charcoal">
              {residence.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-salt">
        <div className="section-px section-py-tight w-full max-w-none">
          <ScrollReveal className="mb-[clamp(2rem,4vw,3rem)] text-center">
            <Eyebrow>Gallery</Eyebrow>
            <div className="mt-[clamp(0.35rem,1vw,0.5rem)]">
              <SectionHeading>Scenes from the Residence</SectionHeading>
            </div>
          </ScrollReveal>
          <ResidenceGallery images={residence.gallery} alt={residence.name} />
        </div>
      </section>

      <section className="bg-sand">
        <div className="section-px section-py-tight w-full max-w-none text-center">
          <ScrollReveal className="flex flex-col items-center gap-[clamp(1rem,2.5vw,1.75rem)]">
            <Eyebrow>Next Step</Eyebrow>
            <SectionHeading>Register Your Interest</SectionHeading>
            <p className="type-body font-sans text-charcoal">
              Speak with our sales team for pricing, floorplans and private viewing times.
            </p>
            <LinkButton href="/enquire">Enquire Now</LinkButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
