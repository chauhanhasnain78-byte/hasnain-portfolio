// lib/animations/variants.ts
// Shared animation variants and easing. One set used everywhere.

import type { Variants, Transition } from "motion/react";

// Primary easing curve — smooth, premium feel (cubic-bezier 4-tuple)
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Standard durations
export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  hero: 0.8,
} as const;

// Shared transition
export const transition: Transition = {
  duration: duration.normal,
  ease,
};

// Fade up — the primary reveal animation
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

// Fade up for mobile — shorter distance
export const fadeUpMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

// Fade in only (no movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease },
  },
};

// Scale up with fade
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease },
  },
};

// Stagger container
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
export const staggerContainer = stagger;

// Hero-specific stagger (slower, more dramatic)
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Hero headline with brief blur
export const heroHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.hero,
      ease,
    },
  },
};

// Clip-path reveal for headings
export const clipReveal: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease,
    },
  },
};

// Nav item animation
export const navItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast, ease },
  },
};
