import Link from 'next/link';
import { ButtonLink } from '@/components/button-link';
import { Logo } from '@/components/layout/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ctaHref, ctaLabel, mainNav } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[rgba(9,9,10,0.78)] backdrop-blur-md">
      <div className="mx-auto flex h-[66px] max-w-content items-center gap-7 px-5 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-[26px]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded text-[0.9rem] text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={ctaHref} size="sm" className="ml-auto hidden lg:ml-0 lg:inline-flex">
          {ctaLabel}
        </ButtonLink>
        <div className="ml-auto lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
