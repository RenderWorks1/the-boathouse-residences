'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HERO_EXPANDED_EVENT, HERO_HANDOFF_EVENT } from '@/lib/hero-handoff';
import {
  logoOpacityTransitionCss,
  NAV_HEADER_ROW_CLASS,
  NAV_LOGO_WRAPPER_CLASS,
} from '@/lib/nav-header-layout';
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

/** Homepage: hide nav links / CTAs / menu until the hero is full-bleed; hide nav logo until flying-logo handoff. */
function homeChromeClass(isHome: boolean, visible: boolean) {
  if (!isHome) return '';
  return visible
    ? 'opacity-100 pointer-events-auto transition-opacity duration-700 ease-luxe'
    : 'pointer-events-none opacity-0';
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  /** Hero peel finished: show links, Enquire, hamburger. */
  const [heroExpanded, setHeroExpanded] = useState(false);
  /** Flying logo crossfaded out: show real nav logo. */
  const [heroHandoffDone, setHeroHandoffDone] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const transparentMode = isHome && !scrolled;
  const headerHidden = isHome && pastHero;
  const homeChromeHidden = isHome && !heroExpanded;

  useEffect(() => {
    if (!isHome) {
      setHeroExpanded(true);
      setHeroHandoffDone(true);
      return;
    }
    setHeroExpanded(false);
    setHeroHandoffDone(false);
    const onExpanded = () => setHeroExpanded(true);
    const onHandoff = () => setHeroHandoffDone(true);
    window.addEventListener(HERO_EXPANDED_EVENT, onExpanded);
    window.addEventListener(HERO_HANDOFF_EVENT, onHandoff);
    const fallback = window.setTimeout(() => {
      setHeroExpanded(true);
      setHeroHandoffDone(true);
    }, 8000);
    return () => {
      window.removeEventListener(HERO_EXPANDED_EVENT, onExpanded);
      window.removeEventListener(HERO_HANDOFF_EVENT, onHandoff);
      window.clearTimeout(fallback);
    };
  }, [isHome]);

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
        aria-hidden={headerHidden || homeChromeHidden}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          headerHidden && 'pointer-events-none -translate-y-full opacity-0',
          !headerHidden &&
            (transparentMode
              ? 'bg-transparent'
              : 'bg-linen-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'),
        )}
      >
        <div className={NAV_HEADER_ROW_CLASS}>
          <div
            className={cn(
              'z-20 hidden min-w-0 flex-1 items-center justify-start gap-[clamp(1rem,2.2vw,2rem)] md:flex',
              homeChromeClass(isHome, heroExpanded),
            )}
          >
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

          <div
            className={cn(NAV_LOGO_WRAPPER_CLASS, isHome && !heroHandoffDone && 'pointer-events-none')}
            style={{
              opacity: isHome ? (heroHandoffDone ? 1 : 0) : 1,
              transition: logoOpacityTransitionCss(),
            }}
          >
            <Image
              src="/images/logo4.png"
              alt="The Boathouse Residences"
              fill
              className={cn(
                'object-contain object-center transition-[filter] duration-300',
                transparentMode ? 'mix-blend-lighten' : 'invert',
              )}
              sizes="(max-width: 768px) 72vw, 448px"
              priority
            />
          </div>

          <div
            className={cn(
              'z-20 flex min-w-0 flex-1 items-center justify-end gap-[clamp(0.75rem,1.75vw,1.5rem)]',
              homeChromeClass(isHome, heroExpanded),
            )}
          >
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
