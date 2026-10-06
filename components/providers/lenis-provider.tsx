'use client';

// Lenis smooth scroll provider synced with GSAP ScrollTrigger.
// One scroll engine for the entire app — no duplicate listeners.

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setScrollProgress, setScrollVelocity } from '@/lib/store/scroll';

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

// Global Lenis instance — accessible for scrollTo from navbar
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Update shared scroll progress store
    lenis.on('scroll', (e: Lenis) => {
      const progress = e.progress;
      setScrollProgress(progress);
      setScrollVelocity(e.velocity);
    });

    // Drive Lenis from GSAP's RAF ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
