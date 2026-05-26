import { Zap } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────
type LinkCategory = 'Products' | 'Services' | 'Industries' | 'Company';

const LINKS: Record<LinkCategory, string[]> = {
  Products:   ['AI Payroll', 'AI PMO Copilot', 'Workflow Engine', 'Analytics Dashboard', 'Support Agent'],
  Services:   ['AI Consulting', 'AI Transformation', 'Product Development', 'Enterprise Integration'],
  Industries: ['Finance', 'Healthcare', 'Retail', 'Logistics', 'SaaS', 'Manufacturing'],
  Company:    ['About', 'Careers', 'Blog', 'Press', 'Contact'],
};

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Security'] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative bg-[#080e1a] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8 flex-shrink-0" aria-hidden="true">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-[#6C63FF]" />
                <Zap className="absolute inset-0 m-auto w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Nexus <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 max-w-[200px]">
              Enterprise AI Solutions that transform business operations at scale.
            </p>
            <a
              href="mailto:ai@nexus-aisolution.com"
              className="text-xs text-slate-500 hover:text-[#00D4FF] transition-colors block mb-4"
            >
              ai@nexus-aisolution.com
            </a>
            <div className="flex gap-2" aria-label="Social links">
              {(['LinkedIn', 'Twitter', 'GitHub'] as const).map((name, i) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass border border-white/5 flex items-center justify-center text-xs text-slate-500 hover:text-white hover:border-white/15 transition-all focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
                >
                  {['Li', 'Tw', 'Gh'][i]}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {(Object.entries(LINKS) as [LinkCategory, string[]][]).map(([cat, items]) => (
            <nav key={cat} aria-label={`${cat} links`}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
                {cat}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-slate-600 hover:text-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700 text-center sm:text-left">
            &copy; {year} Nexus AI Inc. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex gap-4 sm:gap-6">
              {LEGAL_LINKS.map(l => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs text-slate-700 hover:text-slate-400 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
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
