import type { Config } from 'tailwindcss';

/**
 * Nexus AI design tokens, matched to the Nexus AI Voice site (voice.nexus-aisolution.com):
 * deep navy-black background, blue accent, blue-tinted hairlines and translucent "glass" cards.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        space: ['var(--font-space)', 'Space Grotesk', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      colors: {
        // Brand palette (same values as the voice site)
        ink: '#020409', // page background
        panel: 'rgb(2 4 12 / 0.96)', // solid overlays: mobile menu, chat window
        fg: '#F4F4F5', // headings and primary text
        body: '#DFE6F3', // longer copy and list items
        muted: {
          DEFAULT: '#A1A1AA', // secondary copy (AA on ink)
          foreground: 'hsl(var(--muted-foreground))',
        },
        ice: '#C9D8F5', // small mono text on glass chips
        brand: {
          DEFAULT: '#4C8DFF', // text accents, links, labels
          hover: '#6FA4FF',
          solid: '#2563EB', // solid buttons (white text)
          'solid-hover': '#3B76F0',
          num: '#8FB4FF',
        },
        ok: '#4ADE80',
        line: 'rgb(120 160 255 / 0.14)',
        'line-2': 'rgb(140 180 255 / 0.24)',

        // shadcn/ui tokens (kept for components/ui/*)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgb(120 160 255 / 0.14)',
        input: 'rgb(140 180 255 / 0.24)',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        // Plays once on page load; pure CSS, so it never depends on JS or scrolling.
        'fade-up': 'fade-up 300ms ease-out both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
