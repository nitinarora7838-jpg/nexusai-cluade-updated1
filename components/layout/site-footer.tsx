import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { services } from '@/lib/services';
import { ctaHref, ctaLabel, siteConfig } from '@/lib/site';

const headingClass = 'mb-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted';
const linkClass = 'block py-2.5 text-muted transition-colors hover:text-fg sm:py-0';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[1] border-t border-line">
      <div className="mx-auto max-w-content px-5 pb-28 pt-14 sm:px-6">
        <div className="grid gap-9 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3.5 max-w-[40ch] text-[0.9rem] leading-relaxed text-muted">{siteConfig.shortDescription}</p>
          </div>
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className={headingClass}>
              Services
            </h2>
            <ul className="grid text-[0.9rem] sm:gap-[9px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="grid text-[0.9rem] sm:gap-[9px]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link href={ctaHref} className="block py-2.5 font-medium text-brand hover:text-brand-hover sm:py-0">
                  {ctaLabel} →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-11 flex flex-col gap-2 border-t border-line pt-[22px] font-mono text-[0.76rem] text-muted sm:flex-row sm:justify-between">
          <p>© {year} Nexus AI. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
