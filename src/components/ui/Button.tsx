import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Base = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-deep-navy text-linen-white shadow-sm hover:bg-harbour hover:text-linen-white',
  outline: 'border border-linen-white/70 text-linen-white hover:bg-linen-white hover:text-charcoal',
  ghost: 'text-harbour hover:text-deep-navy',
};

const base =
  'inline-flex items-center justify-center rounded-full font-sans uppercase tracking-[0.2em] transition-colors duration-300 ' +
  'px-[clamp(1.35rem,2.5vw+0.5rem,2.25rem)] py-[clamp(0.65rem,1vw+0.45rem,0.95rem)] ' +
  'text-[clamp(0.625rem,0.28vw+0.52rem,0.75rem)]';

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: Base & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = 'primary',
  className,
  children,
}: Base & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
