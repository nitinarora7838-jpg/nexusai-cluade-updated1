import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { services } from '@/lib/services';
import { ctaHref, ctaLabel, siteConfig } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.shortDescription}</p>
        </div>
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="font-inter text-sm font-semibold">
            Services
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="text-muted hover:text-fg">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-inter text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="text-muted hover:text-fg">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link href={ctaHref} className="font-medium text-brand hover:underline">
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>© {year} Nexus AI. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
