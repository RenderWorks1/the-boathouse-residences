import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Residence } from '@/lib/placeholder-residences';
import { BedDouble, Bath, Car, Square } from 'lucide-react';

export function ResidenceCard({ residence }: { residence: Residence }) {
  return (
    <Link
      href={`/residences/${residence.slug}`}
      className="group block overflow-hidden bg-linen-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,45,61,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={residence.featuredImage}
          alt={residence.name}
          fill
          sizes="(min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-[clamp(0.65rem,2vw,1.1rem)] top-[clamp(0.65rem,2vw,1.1rem)]">
          <StatusBadge status={residence.status} />
        </div>
      </div>
      <div className="p-[clamp(1.25rem,3.5vw,2.25rem)]">
        <h3 className="font-display font-light text-harbour text-[clamp(1.25rem,1vw+1rem,1.875rem)]">
          {residence.name}
        </h3>
        <div className="mt-[clamp(1rem,2.5vw,1.35rem)] flex flex-wrap gap-[clamp(1rem,3vw,1.75rem)] font-sans text-charcoal/80 text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
          <Spec
            icon={
              <BedDouble className="h-[clamp(0.875rem,2vw,1.05rem)] w-[clamp(0.875rem,2vw,1.05rem)]" strokeWidth={1.25} />
            }
            value={`${residence.bedrooms} Bed`}
          />
          <Spec
            icon={
              <Bath className="h-[clamp(0.875rem,2vw,1.05rem)] w-[clamp(0.875rem,2vw,1.05rem)]" strokeWidth={1.25} />
            }
            value={`${residence.bathrooms} Bath`}
          />
          <Spec
            icon={
              <Car className="h-[clamp(0.875rem,2vw,1.05rem)] w-[clamp(0.875rem,2vw,1.05rem)]" strokeWidth={1.25} />
            }
            value={`${residence.parking} Car`}
          />
          <Spec
            icon={
              <Square className="h-[clamp(0.875rem,2vw,1.05rem)] w-[clamp(0.875rem,2vw,1.05rem)]" strokeWidth={1.25} />
            }
            value={`${residence.internalArea} m²`}
          />
        </div>
        <p className="type-body mt-[clamp(1.25rem,3vw,1.75rem)] line-clamp-2 font-sans text-charcoal/70">
          {residence.description}
        </p>
        <span className="mt-[clamp(1.25rem,3vw,1.75rem)] inline-block font-sans uppercase tracking-[0.25em] text-cta text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]">
          View Details →
        </span>
      </div>
    </Link>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-harbour">
      {icon}
      <span className="font-light">{value}</span>
    </span>
  );
}
