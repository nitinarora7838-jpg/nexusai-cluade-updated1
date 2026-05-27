'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Solutions',    href: '#products'     },
  { label: 'Automation',   href: '#automation'   },
  { label: 'Services',     href: '#services'     },
  { label: 'Industries',   href: '#industries'   },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About',        href: '#about'        },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  // Passive scroll listener — no performance impact
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="Nexus AI — home" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 flex-shrink-0" aria-hidden="true">
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6C63FF] opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300" />
            {/* Icon background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00D4FF] via-[#3B82F6] to-[#6C63FF]" />
            {/* Inner shine */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent" />
            {/* Lightning bolt */}
            <svg className="absolute inset-0 m-auto w-5 h-5 drop-shadow" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Nexus</span>
            <span className="gradient-text"> AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              role="listitem"
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a
            href="#contact"
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors font-medium"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="relative px-5 py-2.5 text-sm font-semibold text-[#0B1120] rounded-lg overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
            <span className="relative">Book Consultation</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-3 py-3 text-slate-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={close}
                className="mt-3 px-5 py-3 text-sm font-semibold text-[#0B1120] rounded-lg text-center bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
