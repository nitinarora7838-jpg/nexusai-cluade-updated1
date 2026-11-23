'use client';

import { useEffect } from 'react';
import { voiceSiteUrl } from '@/lib/site';

/**
 * Makes the jump to the AI Voice Agents site feel like part of this site:
 * - warms up the voice site when a visitor points at (or focuses) a link to it,
 * - fades this page out before leaving, so the voice site (same dark background) fades in.
 * Only plain same-tab clicks are intercepted; new-tab clicks and reduced motion are left alone.
 */
export function VoiceTransition() {
  useEffect(() => {
    const voiceHost = new URL(voiceSiteUrl).host;
    let prefetched = false;

    const voiceLink = (target: EventTarget | null): HTMLAnchorElement | null => {
      const a = target instanceof Element ? target.closest('a') : null;
      if (!a?.href) return null;
      try {
        return new URL(a.href).host === voiceHost ? a : null;
      } catch {
        return null;
      }
    };

    const warmUp = (e: Event) => {
      if (prefetched || !voiceLink(e.target)) return;
      prefetched = true;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `${voiceSiteUrl}/`;
      document.head.appendChild(link);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = voiceLink(e.target);
      if (!a || (a.target && a.target !== '_self')) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      document.documentElement.classList.add('is-leaving');
      window.setTimeout(() => window.location.assign(a.href), 220);
    };

    // Coming back with the browser's Back button can restore this page from memory: show it again.
    const onPageShow = () => document.documentElement.classList.remove('is-leaving');

    document.addEventListener('pointerover', warmUp, { passive: true });
    document.addEventListener('focusin', warmUp);
    document.addEventListener('touchstart', warmUp, { passive: true });
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      document.removeEventListener('pointerover', warmUp);
      document.removeEventListener('focusin', warmUp);
      document.removeEventListener('touchstart', warmUp);
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return null;
}
