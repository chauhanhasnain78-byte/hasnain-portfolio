'use client';

import { motion, Variants, TargetAndTransition } from 'motion/react';
import { fadeUp, fadeIn } from '@/lib/animations/variants';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'none';
}

export function Reveal({ children, className, delay, direction = 'up' }: RevealProps) {
  const baseVariant = direction === 'up' ? fadeUp : fadeIn;
  
  const variants: Variants = delay && baseVariant
    ? {
        hidden: baseVariant.hidden,
        visible: {
          ...(baseVariant.visible as TargetAndTransition),
          transition: {
            ...((baseVariant.visible as TargetAndTransition)?.transition || {}),
            delay,
          },
        },
      }
    : baseVariant;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
