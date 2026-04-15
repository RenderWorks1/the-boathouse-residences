import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';

export function ResidencesPreview({
  image,
  heading,
  body,
}: {
  image: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="bg-sand">
      <div className="section-px section-py grid w-full items-center gap-section md:grid-cols-2 md:gap-[clamp(2.5rem,5vw,5rem)]">
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={image}
              alt="A Boathouse residence interior"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)] md:pl-[clamp(0.75rem,2vw,1.5rem)]">
            <SectionHeading>{heading}</SectionHeading>
            <p className="type-body font-sans text-charcoal">{body}</p>
            <div className="mt-4">
              <LinkButton href="/residences">View Residences</LinkButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
