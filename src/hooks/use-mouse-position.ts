'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const rafRef = useRef<number>(0);
  const latestEvent = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    const { x, y } = latestEvent.current;
    setPosition({
      x,
      y,
      normalizedX: (x / window.innerWidth) * 2 - 1,
      normalizedY: -(y / window.innerHeight) * 2 + 1,
    });
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    // Only track on devices with fine pointer
    const hasFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFine) return;

    const onMouseMove = (e: MouseEvent) => {
      latestEvent.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return position;
}
