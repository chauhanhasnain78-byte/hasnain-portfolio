'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

function subscribeFinePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getFinePointerSnapshot(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CustomCursor() {
  const isFinePointer = useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, () => false);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);

  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.1 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isFinePointer || isReducedMotion) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const viewEl = target.closest('[data-cursor="view"]');
      const clickable = target.closest('a, button, [data-cursor]');
      
      if (viewEl) {
        setIsHovering(true);
        setHoverText('VIEW');
      } else if (clickable) {
        setIsHovering(true);
        setHoverText(null);
      } else {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isFinePointer, isReducedMotion]);

  if (!isFinePointer || isReducedMotion) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className={`fixed top-0 left-0 z-50 pointer-events-none rounded-full flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        hoverText
          ? 'w-20 h-20 bg-accent/20 backdrop-blur-md border border-accent/50 text-white text-[11px] font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(47,107,255,0.35)]'
          : isHovering
          ? 'w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20'
          : 'w-3.5 h-3.5 bg-white mix-blend-difference'
      }`}
    >
      {hoverText && <span className="select-none pl-0.5">{hoverText}</span>}
    </motion.div>
  );
}
