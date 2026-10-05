'use client';

import { LazyMotion, domAnimation, m, MotionConfig, type Variants } from 'motion/react';
import Link from 'next/link';
import { SOCIALS } from '@/lib/constants/site';
import { SocialLink } from '@/components/ui/social-link';
import { ease } from '@/lib/animations/variants';
import { ReactNode } from 'react';

const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const heroFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

interface HeroContentProps {
  visual: ReactNode;
}

export function HeroContent({ visual }: HeroContentProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center"
        >
          {/* Left Side: Content */}
          <div className="flex flex-col items-start gap-6 lg:gap-8">
            <m.div variants={heroHeadline} className="flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary">
                COMPUTER SCIENCE STUDENT • WEB DEVELOPER
              </span>
              <h1 className="text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-text">
                I build digital experiences that solve real problems.
              </h1>
            </m.div>

            <m.p variants={heroFade} className="max-w-xl text-lg text-text-secondary md:text-xl leading-relaxed">
              I&apos;m Hasnain Chauhan, a tech enthusiast exploring web development, AI tools and digital products.
            </m.p>

            <m.div variants={heroFade} className="flex flex-wrap items-center gap-4">
              <Link
                href="#work"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-white transition-all hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
              >
                View My Work →
              </Link>
              <Link
                href="#resume"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-transparent px-8 font-medium text-text transition-all hover:bg-white/5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
              >
                View Resume ↗
              </Link>
            </m.div>

            <m.div variants={heroFade} className="flex items-center gap-3 pt-2">
              {SOCIALS.map((social) => (
                <SocialLink
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  ariaLabel={social.ariaLabel}
                  external={social.external}
                />
              ))}
            </m.div>
          </div>

          {/* Right Side: Visual */}
          <m.div variants={heroFade} className="flex justify-center lg:justify-end">
            {visual}
          </m.div>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
