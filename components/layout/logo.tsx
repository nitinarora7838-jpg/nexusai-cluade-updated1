import Link from 'next/link';

/** Same mark as the Nexus AI Voice site: blue tile with sound bars. */
export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-brand-solid ${className}`} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="1.5" y="6" width="2" height="4" rx="1" fill="#fff" />
        <rect x="5" y="3.5" width="2" height="9" rx="1" fill="#fff" />
        <rect x="8.5" y="1.5" width="2" height="13" rx="1" fill="#fff" />
        <rect x="12" y="5" width="2" height="6" rx="1" fill="#fff" />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 rounded-md font-space text-[1.08rem] font-bold tracking-[-0.01em] text-fg"
    >
      <LogoMark />
      <span>
        Nexus <span className="font-semibold text-brand">AI</span>
      </span>
    </Link>
  );
}
