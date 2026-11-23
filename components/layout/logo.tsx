import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg font-space text-lg font-semibold text-fg">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#111827" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" />
        <path d="M17 7 L8 18 L16 18 L15 25 L24 14 L16 14 Z" fill="#00D4FF" />
      </svg>
      Nexus AI
    </Link>
  );
}
