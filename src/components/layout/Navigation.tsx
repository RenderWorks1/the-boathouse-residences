'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const transparentMode = isHome && !scrolled;
  const headerHidden = isHome && pastHero;

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (pathname === '/') {
        setPastHero(y >= window.innerHeight);
      } else {
        setPastHero(false);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  useEffect(() => {
    if (pastHero) setOpen(false);
  }, [pastHero]);

  return (
    <>
      <header
        aria-hidden={headerHidden}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          headerHidden && 'pointer-events-none -translate-y-full opacity-0',
          !headerHidden &&
            (transparentMode
              ? 'bg-transparent'
              : 'bg-linen-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'),
        )}
      >
        <div className="flex w-full items-center justify-between section-px py-[var(--nav-pad-y)]">
          <Link
            href="/"
            className="relative block h-[clamp(2.65rem,6.5vw,4.1rem)] w-[min(68vw,28rem)] shrink-0 overflow-hidden md:w-[min(50vw,28rem)] lg:w-[min(40vw,28rem)]"
          >
            <Image
              src="/images/newlogo4.png"
              alt="The Boathouse Residences"
              fill
              className={cn(
                'object-contain object-left [clip-path:inset(14%_0_14%_0)] transition-[filter] duration-300',
                transparentMode && 'brightness-0 invert',
              )}
              sizes="(max-width: 768px) 75vw, 512px"
              priority
            />
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
              className="inline-flex items-center rounded-xl bg-deep-navy font-sans uppercase tracking-[0.2em] text-linen-white shadow-sm transition-colors duration-300 hover:bg-harbour hover:text-linen-white px-[clamp(1rem,2vw,1.65rem)] py-[clamp(0.45rem,0.9vw,0.7rem)] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]"
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
