'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const newProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(Math.max(newProgress, 0), 1));

    // Determine active section
    const sections = ['home', 'about', 'work', 'skills', 'education', 'resume', 'contact'];
    const navHeight = 80;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navHeight + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  return { progress, activeSection };
}
