'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavPrimaryLink } from '@/components/marketing';
import { cn } from '@/lib/utils';
import { marketing } from '@/lib/theme';

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

const navLinkClass =
  'px-4 py-2 text-sm text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all duration-200 font-medium focus-visible:outline-2 focus-visible:outline-teal-600';

const mobileLinkClass =
  'px-3 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-all focus-visible:outline-2 focus-visible:outline-teal-600';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

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
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm py-5',
      )}
    >
      <div className={cn(marketing.container, 'flex items-center justify-between')}>
        <a href="/" aria-label="Nexus AI — home" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 flex-shrink-0" aria-hidden="true">
            <div className="absolute -inset-1 rounded-xl bg-teal-600/20 blur-md group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent" />
            <svg className="absolute inset-0 m-auto w-5 h-5 drop-shadow" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-slate-900">Nexus</span>
            <span className="gradient-text"> AI</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} role="listitem" className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a href="#contact" className="px-4 py-2 text-sm text-slate-700 hover:text-slate-900 transition-colors font-medium">
            Contact
          </a>
          <NavPrimaryLink href="#contact">Book Consultation</NavPrimaryLink>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden shadow-lg"
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
                  className={mobileLinkClass}
                >
                  {link.label}
                </motion.a>
              ))}
              <NavPrimaryLink href="#contact" onClick={close} className="mt-3 px-5 py-3 text-sm text-center">
                Book Consultation
              </NavPrimaryLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
