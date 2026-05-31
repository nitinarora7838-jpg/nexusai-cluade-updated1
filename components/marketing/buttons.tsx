import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { marketing } from '@/lib/theme';

type LinkProps = ComponentPropsWithoutRef<'a'> & {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3.5 sm:py-4 text-sm sm:text-base',
  lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base',
} as const;

export function PrimaryLink({
  children,
  className,
  size = 'md',
  fullWidth,
  ...props
}: LinkProps) {
  return (
    <a
      className={cn(
        marketing.primaryBtn,
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function SecondaryLink({
  children,
  className,
  size = 'md',
  fullWidth,
  ...props
}: LinkProps) {
  return (
    <a
      className={cn(
        marketing.secondaryBtn,
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function NavPrimaryLink({ children, className, ...props }: LinkProps) {
  return (
    <a className={cn(marketing.navBtn, 'px-5 py-2.5 text-sm', className)} {...props}>
      {children}
    </a>
  );
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export function PrimaryButton({
  children,
  className,
  size = 'md',
  fullWidth,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        marketing.primaryBtn,
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
