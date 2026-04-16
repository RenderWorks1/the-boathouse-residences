'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';

import 'lenis/dist/lenis.css';

const luxury: LenisOptions = {
  autoRaf: true,
  lerp: 0.088,
  duration: 1.35,
  smoothWheel: true,
  wheelMultiplier: 0.88,
  touchMultiplier: 1,
  anchors: true,
  stopInertiaOnNavigate: true,
};

const reducedMotionOpts: LenisOptions = {
  ...luxury,
  lerp: 1,
  smoothWheel: false,
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<LenisOptions>(luxury);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setOptions(mq.matches ? reducedMotionOpts : luxury);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
