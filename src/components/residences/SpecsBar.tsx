import { BedDouble, Bath, Car, Square, Trees } from 'lucide-react';

export function SpecsBar({
  bedrooms,
  bathrooms,
  parking,
  internalArea,
  externalArea,
}: {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  internalArea: number;
  externalArea?: number;
}) {
  const iconCls = 'h-[clamp(1.15rem,2.8vw,1.45rem)] w-[clamp(1.15rem,2.8vw,1.45rem)]';

  const items = [
    { icon: <BedDouble className={iconCls} strokeWidth={1.1} />, label: 'Bedrooms', value: bedrooms },
    { icon: <Bath className={iconCls} strokeWidth={1.1} />, label: 'Bathrooms', value: bathrooms },
    { icon: <Car className={iconCls} strokeWidth={1.1} />, label: 'Car Spaces', value: parking },
    { icon: <Square className={iconCls} strokeWidth={1.1} />, label: 'Internal', value: `${internalArea} m²` },
    externalArea != null
      ? { icon: <Trees className={iconCls} strokeWidth={1.1} />, label: 'External', value: `${externalArea} m²` }
      : null,
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string | number }[];

  return (
    <div className="grid grid-cols-2 gap-[clamp(1.25rem,4vw,2rem)] border-y border-harbour/15 py-[clamp(1.75rem,4vw,2.75rem)] md:grid-cols-5 md:gap-[clamp(0.65rem,2vw,1.1rem)]">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-[clamp(0.35rem,1vw,0.5rem)] text-center text-harbour"
        >
          {it.icon}
          <span className="font-sans uppercase tracking-[0.25em] text-rope text-[clamp(0.5625rem,0.18vw+0.48rem,0.65rem)]">
            {it.label}
          </span>
          <span className="font-display font-light text-[clamp(1.125rem,1vw+0.85rem,1.375rem)]">
            {it.value}
          </span>
        </div>
      ))}
    </div>
  );
}
