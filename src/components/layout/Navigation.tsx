'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

const links = [
  { href: '/', label: 'Home' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/residences', label: 'Residences' },
  { href: '/vision', label: 'Vision' },
  { href: '/updates', label: 'Updates' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const transparentMode = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          transparentMode
            ? 'bg-transparent'
            : 'bg-linen-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]',
        )}
      >
        <div className="flex w-full items-center justify-between section-px py-[var(--nav-pad-y)]">
          <Link href="/" className="group block leading-none">
            <span
              className={cn(
                'block font-display font-normal tracking-[0.08em] transition-colors text-[clamp(1.125rem,1.2vw+0.75rem,1.5rem)]',
                transparentMode ? 'text-linen-white' : 'text-charcoal',
              )}
            >
              THE BOATHOUSE
            </span>
            <span
              className={cn(
                'mt-1 block font-display font-normal uppercase tracking-[0.35em] transition-colors text-[clamp(0.625rem,0.25vw+0.52rem,0.8rem)]',
                transparentMode ? 'text-linen-white/85' : 'text-harbour',
              )}
            >
              Residences
            </span>
          </Link>

          <nav className="hidden items-center md:flex gap-[clamp(1.25rem,2.5vw,2.35rem)]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={pathname === l.href}
                className={cn(
                  'nav-link font-sans uppercase tracking-[0.2em] transition-colors text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]',
                  transparentMode
                    ? 'text-linen-white hover:text-white'
                    : 'text-charcoal hover:text-harbour',
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/enquire"
              className="inline-flex items-center rounded-full bg-deep-navy font-sans uppercase tracking-[0.2em] text-linen-white shadow-sm transition-colors duration-300 hover:bg-harbour hover:text-linen-white px-[clamp(1rem,2vw,1.65rem)] py-[clamp(0.45rem,0.9vw,0.7rem)] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]"
            >
              Enquire
            </Link>
          </nav>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={cn(
              'md:hidden transition-colors',
              transparentMode ? 'text-linen-white' : 'text-charcoal',
            )}
          >
            <Menu className="h-[clamp(1.35rem,3.5vw,1.65rem)] w-[clamp(1.35rem,3.5vw,1.65rem)]" strokeWidth={1.25} />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
