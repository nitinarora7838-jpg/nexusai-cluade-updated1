import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  // Solid blue, like the voice site's main buttons
  primary: 'rounded-md bg-brand-solid text-white hover:-translate-y-px hover:bg-brand-solid-hover',
  // Transparent frosted glass
  secondary: 'btn-glass rounded-full text-fg',
} as const;

const sizes = {
  md: 'min-h-[48px] px-[22px] py-[13px] text-[0.95rem]',
  sm: 'min-h-[40px] px-4 py-[11px] text-[0.86rem]',
} as const;

export const buttonClasses = (
  variant: keyof typeof variants = 'primary',
  className?: string,
  size: keyof typeof sizes = 'md',
) =>
  cn(
    'inline-flex items-center justify-center gap-2 font-semibold leading-none transition-[background-color,transform,border-color] duration-150',
    sizes[size],
    variants[variant],
    className,
  );

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = 'primary', size = 'md', className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className, size)}>
      {children}
    </Link>
  );
}
