import { cn } from '@/lib/utils';

export type ResidenceStatus = 'Available' | 'Under Offer' | 'Sold';

const styles: Record<ResidenceStatus, string> = {
  Available: 'bg-available/15 text-available',
  'Under Offer': 'bg-under-offer/15 text-under-offer',
  Sold: 'bg-sold/15 text-sold',
};

export function StatusBadge({ status }: { status: ResidenceStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-sans uppercase tracking-[0.2em] px-[clamp(0.65rem,1.5vw,0.85rem)] py-[clamp(0.2rem,0.8vw,0.35rem)] text-[clamp(0.5625rem,0.18vw+0.48rem,0.65rem)]',
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
