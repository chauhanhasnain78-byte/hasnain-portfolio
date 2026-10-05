'use client';

import { motion, Variants, TargetAndTransition } from 'motion/react';
import { clipReveal } from '@/lib/animations/variants';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function RevealText({ children, className, delay, as = 'div' }: RevealTextProps) {
  const variants: Variants = delay && clipReveal
    ? {
        hidden: clipReveal.hidden,
        visible: {
          ...(clipReveal.visible as TargetAndTransition),
          transition: {
            ...((clipReveal.visible as TargetAndTransition)?.transition || {}),
            delay,
          },
        },
      }
    : clipReveal;

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
