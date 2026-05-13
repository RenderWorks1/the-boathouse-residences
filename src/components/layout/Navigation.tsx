'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HERO_EXPANDED_EVENT,
  HERO_HANDOFF_EVENT,
  hasHeroIntroPlayed,
} from '@/lib/hero-handoff';
import {
  logoOpacityTransitionCss,
  NAV_HEADER_ROW_CLASS,
  NAV_LOGO_WRAPPER_CLASS,
} from '@/lib/nav-header-layout';
import { MobileMenu } from './MobileMenu';

const linksLeft = [
  { href: '/residences', label: 'The Residences' },
  { href: '/vision', label: 'Vision' },
  { href: '/lifestyle', label: 'Lifestyle & Location' },
];

const linksRight = [
  { href: '/interiors', label: 'Interior Design' },
  { href: '/faq', label: 'FAQs' },
];

const links = [...linksLeft, ...linksRight];

const navLinkClass =
  'relative font-sans uppercase tracking-[0.2em] text-[clamp(0.65rem,0.28vw+0.52rem,0.78rem)] transition-colors after:pointer-events-none after:absolute after:left-0 after:right-0 after:-bottom-[6px] after:h-px after:origin-center after:scale-x-0 aria-[current=page]:after:scale-x-100 after:transition-transform after:duration-300 after:ease-luxe';

/** Homepage: hide nav links / CTAs / menu until the hero is full-bleed; hide nav logo until flying-logo handoff. */
function homeChromeClass(isHome: boolean, visible: boolean) {
  if (!isHome) return '';
  return visible
    ? 'opacity-100 pointer-events-auto transition-opacity duration-700 ease-luxe'
    : 'pointer-events-none opacity-0';
}

export function Navigation() {
  const pathname = usePathname();
  /**
   * Captured at first render so the home page nav stays visible immediately on
   * client-side navigations back to `/` (after the intro has already played).
   */
  const skipHeroIntroRef = useRef(false);
  if (!skipHeroIntroRef.current && hasHeroIntroPlayed()) {
    skipHeroIntroRef.current = true;
  }
  const skipHeroIntro = skipHeroIntroRef.current;
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  /** Hero peel finished: show links, Enquire, hamburger. */
  const [heroExpanded, setHeroExpanded] = useState(skipHeroIntro);
  /** Flying logo crossfaded out: show real nav logo. */
  const [heroHandoffDone, setHeroHandoffDone] = useState(skipHeroIntro);

  const isHome = pathname === '/';
  const menuLinks = isHome ? links : [{ href: '/', label: 'Home' as const }, ...links];
  const transparentMode = isHome ? !scrolled : !pastHero;
  const headerHidden = isHome && pastHero;
  const homeChromeHidden = isHome && !heroExpanded;

  useEffect(() => {
    if (!isHome || skipHeroIntro) {
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
  }, [isHome, skipHeroIntro]);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (pathname === '/') {
        setPastHero(y >= window.innerHeight);
      } else {
        const heroEl = document.querySelector('[data-page-hero]');
        if (!heroEl) {
          // Page has no hero (e.g. /enquire) — treat as already-past-hero so
          // the header shows its solid state with no top scrim.
          setPastHero(true);
        } else {
          const heroHeight = heroEl.getBoundingClientRect().height;
          setPastHero(heroHeight > 0 && y >= heroHeight - 1);
        }
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
          !isHome && 'nav-logo-compact',
          headerHidden && 'pointer-events-none -translate-y-full opacity-0',
          !headerHidden &&
            (transparentMode
              ? 'bg-transparent'
              : 'bg-linen-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'),
        )}
      >
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[clamp(6rem,12vw,10rem)] bg-gradient-to-b from-black/55 via-black/25 to-transparent transition-opacity duration-500 ease-luxe',
            transparentMode && !headerHidden && !homeChromeHidden
              ? 'opacity-100'
              : 'opacity-0',
          )}
        />
        <div className={cn(NAV_HEADER_ROW_CLASS, 'relative')}>
          <div
            className={cn(
              'z-20 hidden min-w-0 flex-1 items-center justify-start gap-[clamp(1rem,2.2vw,2rem)] md:flex',
              homeChromeClass(isHome, heroExpanded),
            )}
          >
            {linksLeft.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    navLinkClass,
                    transparentMode
                      ? 'text-linen-white hover:text-linen-white/80'
                      : 'text-charcoal hover:text-harbour',
                    active && (transparentMode ? 'after:bg-linen-white' : 'after:bg-charcoal'),
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div
            className={cn(NAV_LOGO_WRAPPER_CLASS, isHome && !heroHandoffDone && 'pointer-events-none')}
            style={{
              opacity: isHome ? (heroHandoffDone ? 1 : 0) : 1,
              transition: logoOpacityTransitionCss(),
            }}
          >
            <Link
              href="/"
              aria-label="The Boathouse Residences — home"
              className="block h-full w-full"
            >
              <Image
                src={transparentMode ? '/logos/logo-white.png' : '/logos/logo-navy.png'}
                alt="The Boathouse Residences"
                fill
                className="object-contain object-center transition-opacity duration-300"
                sizes={
                  isHome
                    ? '(max-width: 768px) 72vw, 448px'
                    : '(max-width: 768px) 58vw, 320px'
                }
                priority
              />
            </Link>
          </div>

          <div
            className={cn(
              'z-20 flex min-w-0 flex-1 items-center justify-end gap-[clamp(0.75rem,1.75vw,1.5rem)]',
              homeChromeClass(isHome, heroExpanded),
            )}
          >
            <div className="hidden items-center gap-[clamp(1rem,2.2vw,2rem)] md:flex">
              {linksRight.map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      navLinkClass,
                      transparentMode
                        ? 'text-linen-white hover:text-linen-white/80'
                        : 'text-charcoal hover:text-harbour',
                      active && (transparentMode ? 'after:bg-linen-white' : 'after:bg-charcoal'),
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/enquire"
              className={cn(
                'hidden items-center rounded-none border bg-transparent font-sans uppercase tracking-[0.2em] transition-colors md:inline-flex px-[clamp(0.85rem,1.6vw,1.35rem)] py-[clamp(0.35rem,0.7vw,0.6rem)] text-[clamp(0.55rem,0.22vw+0.46rem,0.68rem)]',
                transparentMode
                  ? 'border-white text-linen-white hover:bg-linen-white hover:text-charcoal'
                  : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-linen-white',
              )}
            >
              Enquire Now
            </Link>
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

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        links={menuLinks}
        compactLogo={!isHome}
      />
    </>
  );
}
