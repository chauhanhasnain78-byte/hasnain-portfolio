'use client';

import { motion } from 'motion/react';
import { ease } from '@/lib/animations/variants';
import type React from 'react';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  key?: React.Key;
}

export function RevealText({ children, className, delay = 0, as = 'div' }: RevealTextProps) {
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px' }}
      transition={{
        duration: 0.5,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default RevealText;
