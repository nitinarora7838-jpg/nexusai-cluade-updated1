'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { marketing } from '@/lib/theme';

type MarketingCardProps = Omit<HTMLMotionProps<'article'>, 'ref'> & {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
};

const paddingClasses = {
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-5 sm:p-7',
} as const;

export function MarketingCard({
  children,
  hover = true,
  padding = 'md',
  className,
  ...motionProps
}: MarketingCardProps) {
  return (
    <motion.article
      className={cn(
        hover ? marketing.card : marketing.cardStatic,
        paddingClasses[padding],
        'overflow-hidden',
        className,
      )}
      {...motionProps}
    >
      {children}
    </motion.article>
  );
}
