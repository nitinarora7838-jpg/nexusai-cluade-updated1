import {
  FOOTER_EMAIL,
  FOOTER_LEGAL_LINKS,
  FOOTER_LINKS,
  FOOTER_SOCIAL,
  FOOTER_SOCIAL_SHORT,
  type FooterLinkCategory,
} from '@/lib/content/footer';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" aria-label="Site footer" className="relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 flex-shrink-0" aria-hidden="true">
                <div className="absolute -inset-0.5 rounded-xl bg-teal-600/20 blur-sm" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent" />
                <svg
                  className="absolute inset-0 m-auto w-4 h-4 drop-shadow"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900">
                Nexus <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-[200px]">
              Enterprise AI Solutions that transform business operations at scale.
            </p>
            <a
              href={`mailto:${FOOTER_EMAIL}`}
              className="text-xs text-slate-500 hover:text-teal-600 transition-colors block mb-4"
            >
              {FOOTER_EMAIL}
            </a>
            <div className="flex gap-2" aria-label="Social links">
              {FOOTER_SOCIAL.map((name, i) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all focus-visible:outline-2 focus-visible:outline-teal-600"
                >
                  {FOOTER_SOCIAL_SHORT[i]}
                </a>
              ))}
            </div>
          </div>

          {(Object.entries(FOOTER_LINKS) as [FooterLinkCategory, string[]][]).map(([cat, items]) => (
            <nav key={cat} aria-label={`${cat} links`}>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest mb-3 sm:mb-4">
                {cat}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {year} Nexus AI Inc. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex gap-4 sm:gap-6">
              {FOOTER_LEGAL_LINKS.map(l => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs text-slate-500 hover:text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
