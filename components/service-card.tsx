import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/services';
import { CheckList } from '@/components/check-list';
import { IconBadge } from '@/components/icon-badge';

export function ServiceCard({ service }: { service: Service }) {
  const headingId = `service-${service.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-white/15 sm:p-8"
    >
      <IconBadge icon={service.icon} />
      <h3 id={headingId} className="mt-5 text-xl font-semibold">
        {service.name}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{service.definition}</p>
      <CheckList items={service.cardBullets} className="mt-6 text-sm" />
      <div className="mt-auto pt-6">
        <p className="border-t border-line pt-5 text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">Best for: </span>
          {service.bestFor}
        </p>
        <Link
          href={service.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover hover:underline"
        >
          Learn more<span className="sr-only"> about {service.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
