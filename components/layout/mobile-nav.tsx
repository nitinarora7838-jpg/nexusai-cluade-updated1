'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { buttonClasses } from '@/components/button-link';
import { ctaHref, ctaLabel, mainNav } from '@/lib/site';

/**
 * Mobile menu built on native <details>, so it opens even before JavaScript loads.
 * JavaScript only adds closing on navigation, link click and the Escape key.
 */
export function MobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  const close = () => ref.current?.removeAttribute('open');

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ref.current?.open) {
        close();
        ref.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <details ref={ref} className="group lg:hidden">
      <summary className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-line-2 text-fg hover:bg-white/5">
        <span className="sr-only">Menu</span>
        <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
        <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
      </summary>
      <div className="absolute inset-x-0 top-full border-b border-line bg-panel px-5 pb-5 pt-2 backdrop-blur-md sm:px-6">
        <nav aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[48px] items-center border-b border-line py-3.5 font-space text-[1.05rem] font-semibold text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={ctaHref} onClick={close} className={buttonClasses('primary', 'mt-4 w-full')}>
          {ctaLabel}
        </Link>
      </div>
    </details>
  );
}
