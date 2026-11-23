import Link from 'next/link';
import { ButtonLink } from '@/components/button-link';
import { Logo } from '@/components/layout/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ctaHref, ctaLabel, mainNav } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded text-sm font-medium text-body transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={ctaHref} className="hidden lg:inline-flex">
          {ctaLabel}
        </ButtonLink>
        <MobileNav />
      </div>
    </header>
  );
}
