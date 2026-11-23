import Link from 'next/link';
import { isExternalHref, type Service } from '@/lib/services';
import { CheckList } from '@/components/check-list';
import { IconBadge } from '@/components/icon-badge';

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const headingId = `service-${service.slug}`;
  const external = isExternalHref(service.href);
  return (
    <article aria-labelledby={headingId} className="glass-card glass-card-hover flex flex-col rounded-xl px-6 py-7">
      <IconBadge icon={service.icon} />
      <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand-num">
        {String(index + 1).padStart(2, '0')} · {service.tag}
      </p>
      <h3 id={headingId} className="mt-2 text-[1.22rem] font-semibold tracking-[-0.01em]">
        {service.name}
      </h3>
      <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{service.definition}</p>
      <CheckList items={service.cardBullets} className="mt-4 border-t border-line pt-[14px] text-[0.88rem]" />
      <div className="mt-auto pt-6">
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">Best for: </span>
          {service.bestFor}
        </p>
        <Link
          href={service.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover hover:underline hover:underline-offset-4"
        >
          {external ? 'Explore AI Voice Agents' : 'Learn more'}
          <span className="sr-only">{external ? ' (opens the Nexus AI Voice site)' : ` about ${service.name}`}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
