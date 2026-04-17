'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

const linksLeft = [
  { href: '/', label: 'Home' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/residences', label: 'Residences' },
];

const linksRight = [
  { href: '/vision', label: 'Vision' },
  { href: '/updates', label: 'Updates' },
];

const links = [...linksLeft, ...linksRight];

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
        <div className="relative flex w-full items-center section-px py-[calc(var(--nav-pad-y)+0.5rem)] md:py-[var(--nav-pad-y)]">
          <div className="z-20 hidden min-w-0 flex-1 items-center justify-start gap-[clamp(1rem,2.2vw,2rem)] md:flex">
            {linksLeft.map((l) => (
              <span
                key={l.href}
                className={cn(
                  'cursor-default select-none font-sans uppercase tracking-[0.2em] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]',
                  transparentMode ? 'text-linen-white' : 'text-charcoal',
                )}
              >
                {l.label}
              </span>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 block h-[clamp(3.5rem,7.5vw,5rem)] w-[min(72vw,32rem)] -translate-x-1/2 -translate-y-1/2 shrink-0 overflow-hidden md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0">
            <Image
              src="/images/newlogo5nosub.png"
              alt="The Boathouse Residences"
              fill
              className={cn(
                'object-contain object-center transition-[filter] duration-300',
                transparentMode && 'brightness-0 invert',
              )}
              sizes="(max-width: 768px) 72vw, 512px"
              priority
            />
          </div>

          <div className="z-20 flex min-w-0 flex-1 items-center justify-end gap-[clamp(0.75rem,1.75vw,1.5rem)]">
            <div className="hidden items-center gap-[clamp(1rem,2.2vw,2rem)] md:flex">
              {linksRight.map((l) => (
                <span
                  key={l.href}
                  className={cn(
                    'cursor-default select-none font-sans uppercase tracking-[0.2em] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]',
                    transparentMode ? 'text-linen-white' : 'text-charcoal',
                  )}
                >
                  {l.label}
                </span>
              ))}
            </div>
            <span
              className={cn(
                'hidden cursor-default select-none items-center rounded-none border bg-transparent font-sans uppercase tracking-[0.2em] md:inline-flex px-[clamp(1rem,2vw,1.65rem)] py-[clamp(0.45rem,0.9vw,0.7rem)] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)]',
                transparentMode ? 'border-white text-linen-white' : 'border-charcoal text-charcoal',
              )}
            >
              Enquire
            </span>
            <button
              aria-label="Open menu"
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                'md:hidden transition-colors',
                transparentMode ? 'text-linen-white' : 'text-charcoal',
              )}
            >
              <Menu className="h-[clamp(1.35rem,3.5vw,1.65rem)] w-[clamp(1.35rem,3.5vw,1.65rem)]" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
