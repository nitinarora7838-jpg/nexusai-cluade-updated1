'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, marketing } from '@/lib/theme';

interface SectionHeaderProps {
  label: string;
  headingId?: string;
  titlePrimary: string;
  titleAccent: string;
  description?: string;
  className?: string;
  headingClassName?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  label,
  headingId,
  titlePrimary,
  titleAccent,
  description,
  className,
  headingClassName,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <motion.div
      {...fadeInUp}
      className={cn(
        align === 'center' ? 'text-center mb-12 sm:mb-16' : 'mb-12 sm:mb-16',
        className,
      )}
    >
      <div className="tag-pill mb-4">{label}</div>
      <h2
        id={headingId}
        className={cn(marketing.heading, headingClassName)}
        style={marketing.fontSpace}
      >
        <span className="text-slate-900">{titlePrimary}</span>
        <br />
        <span className="gradient-text">{titleAccent}</span>
      </h2>
      {description && (
        <p className={cn(marketing.subheading, align === 'left' && 'mx-0')}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
