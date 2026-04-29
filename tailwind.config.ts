import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand pack alignment: Harbour Slate (primary), Driftwood (accent),
        // Shell / Dune Linen (neutrals), Tide, Ink. Tokens keep existing roles.
        sand: '#DCD6CB',
        driftwood: '#B0A393',
        harbour: '#35434B',
        'deep-navy': '#1A2228',
        'linen-white': '#EFEBE4',
        rope: '#9D8C7C',
        'sea-foam': '#A9B6BC',
        salt: '#F6F4EE',
        charcoal: '#26292F',
        cta: '#7E6B58',
        'cta-hover': '#5F4F3F',
        available: '#6B8F71',
        'under-offer': '#C4A35A',
        sold: '#8B4D4D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        vision: ['var(--font-vision-display)', 'Georgia', 'serif'],
        gilroy: ['var(--font-gilroy)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
