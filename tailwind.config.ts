import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sand: '#E8DFD3',
        driftwood: '#C4B5A3',
        harbour: '#4A6670',
        'deep-navy': '#1E2D3D',
        'linen-white': '#F5F1EC',
        rope: '#A69178',
        'sea-foam': '#B8C9C3',
        salt: '#FAFAF8',
        charcoal: '#2C2C2C',
        cta: '#8B7355',
        'cta-hover': '#6E5A42',
        available: '#6B8F71',
        'under-offer': '#C4A35A',
        sold: '#8B4D4D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        vision: ['var(--font-vision-display)', 'Georgia', 'serif'],
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
