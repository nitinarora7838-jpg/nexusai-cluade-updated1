import type { Config } from 'tailwindcss';

/**
 * Nexus AI design tokens.
 * - One accent colour (brand #00D4FF), used only for buttons, links and small highlights.
 * - Dark background, slightly lighter surfaces, thin white borders at ~8% opacity.
 * - Spacing uses Tailwind's default scale in 8px steps (2, 4, 6, 8, 12, 16, 24…).
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
        space: ['var(--font-space)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
      },
      colors: {
        // Brand palette
        ink: '#0B1120', // page background
        surface: '#111827', // cards and alternating sections
        fg: '#F8FAFC', // headings and primary text
        body: '#CBD5E1', // list items and longer copy (AA on ink and surface)
        muted: {
          DEFAULT: '#94A3B8', // secondary copy (AA on ink and surface)
          foreground: 'hsl(var(--muted-foreground))',
        },
        brand: {
          DEFAULT: '#00D4FF',
          hover: '#5CE3FF',
        },
        line: 'rgb(255 255 255 / 0.08)',

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
        border: 'rgb(255 255 255 / 0.08)',
        input: 'rgb(255 255 255 / 0.14)',
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
