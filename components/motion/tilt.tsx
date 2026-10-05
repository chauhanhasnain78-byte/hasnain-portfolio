'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Tilt({ children, className, maxTilt = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isHoverable || isReducedMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const xPct = (clientX - left) / width;
    const yPct = (clientY - top) / height;

    const tiltX = (xPct - 0.5) * 2 * maxTilt;
    const tiltY = (yPct - 0.5) * -2 * maxTilt;

    x.set(tiltX);
    y.set(tiltY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ 
        rotateX, 
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  );
}
