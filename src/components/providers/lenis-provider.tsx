'use client';

import { useEffect, useRef, createContext, useContext, useCallback, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : isTouch ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const el = document.getElementById(targetId);
          if (el) {
            lenis.scrollTo(el, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, offset = -80) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
