import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-brand text-ink hover:bg-brand-hover',
  secondary: 'border border-white/15 text-fg hover:border-white/30 hover:bg-white/5',
} as const;

export const buttonClasses = (variant: keyof typeof variants = 'primary', className?: string) =>
  cn(
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
    variants[variant],
    className,
  );

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = 'primary', className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}
