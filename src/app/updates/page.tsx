import type { Metadata } from 'next';
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading';
import { UpdateCard } from '@/components/updates/UpdateCard';
import { buildUpdates } from '@/lib/placeholder-updates';

export const metadata: Metadata = {
  title: 'Build Updates',
  description: 'Monthly construction progress from The Boathouse Residences site.',
};

export default function UpdatesPage() {
  return (
    <>
      <section className="bg-sand pb-[clamp(3rem,6vw,6rem)] pt-[clamp(7rem,14vw+2rem,12rem)]">
        <div className="section-px w-full max-w-none text-center">
          <Eyebrow>From the Site</Eyebrow>
          <div className="mt-[clamp(0.5rem,1.5vw,0.85rem)]">
            <SectionHeading as="h1" className="text-[clamp(2rem,3vw+1.25rem,3.75rem)]">
              Build Updates
            </SectionHeading>
          </div>
          <p className="type-body mx-auto mt-[clamp(1.25rem,3vw,1.75rem)] max-w-none font-sans text-charcoal">
            A monthly journal of construction progress, milestones and moments on site — from
            foundations through to handover.
          </p>
        </div>
      </section>

      <section className="bg-linen-white">
        <div className="section-px section-py-tight w-full max-w-none">
          {buildUpdates.map((u) => (
            <UpdateCard key={u._id} update={u} />
          ))}
        </div>
      </section>
    </>
  );
}
