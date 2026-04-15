import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'font-sans uppercase text-rope tracking-[0.3em]',
        'text-[clamp(0.625rem,0.22vw+0.52rem,0.72rem)]',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag
      className={cn(
        'font-display font-light uppercase tracking-[0.1em] text-harbour',
        'text-[clamp(1.625rem,1rem+1.35vw,3rem)]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
