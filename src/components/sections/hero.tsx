'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { Mail } from 'lucide-react';
import { SITE_CONFIG, HERO_CONTENT, SOCIAL_LINKS } from '@/lib/constants/site';
import { ProfilePhoto } from '@/components/ui/profile-photo';
import { usePrefersReducedMotion, useHasFinePointer } from '@/hooks/use-media-query';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface HeroSectionProps {
  hasProfilePhoto: boolean;
}

export function HeroSection({ hasProfilePhoto }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const prefersReduced = usePrefersReducedMotion();
  const hasFinePointer = useHasFinePointer();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax scroll-out: Name moves slower than photo
  const nameParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Pointer position for decorative 3D background depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const depthX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 100 });
  const depthY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 100 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!hasFinePointer || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [hasFinePointer, prefersReduced, mouseX, mouseY]);

  const [sweepActive, setSweepActive] = useState(false);

  // Gentle light sweep repeating while hero is in view
  useEffect(() => {
    if (!isInView || prefersReduced) return;
    const interval = setInterval(() => {
      setSweepActive(true);
      setTimeout(() => setSweepActive(false), 1400);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView, prefersReduced]);

  const triggerTapSweep = useCallback(() => {
    setSweepActive(true);
    setTimeout(() => setSweepActive(false), 1200);
  }, []);

  const nameWords = SITE_CONFIG.name.toUpperCase().split(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onClick={triggerTapSweep}
      className="relative min-h-[100svh] flex items-center overflow-hidden [perspective:1200px] pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] container-padding w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left content: Identity first */}
          <motion.div
            style={prefersReduced ? undefined : { y: nameParallaxY, opacity: nameOpacity }}
            className="flex-1 space-y-6 lg:space-y-8"
          >
            {/* 1. Name - THE ONLY <h1> */}
            <div className="relative">
              {/* Decorative faint outlined 3D shadow copy behind name */}
              {!prefersReduced && (
                <motion.div
                  style={{ x: depthX, y: depthY }}
                  aria-hidden="true"
                  className="absolute inset-0 select-none pointer-events-none text-[clamp(2.25rem,5.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-tighter text-transparent stroke-text opacity-20"
                >
                  {SITE_CONFIG.name.toUpperCase()}
                </motion.div>
              )}

              <h1
                aria-label={SITE_CONFIG.name.toUpperCase()}
                className="relative text-[clamp(2.25rem,5.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-tighter select-none"
              >
                {nameWords.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        aria-hidden="true"
                        className="inline-block relative overflow-hidden transition-transform duration-200"
                        initial={
                          prefersReduced
                            ? { opacity: 0 }
                            : { opacity: 0, y: 70, rotateX: -45, filter: 'blur(8px)' }
                        }
                        animate={
                          isInView
                            ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
                            : {}
                        }
                        transition={{
                          duration: 0.65,
                          delay: 0.35 + wordIndex * 0.12 + letterIndex * 0.035,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <span className="text-[#F5F5F5]">{letter}</span>
                      </motion.span>
                    ))}
                  </span>
                ))}

                {/* Light sweep highlight overlay */}
                {!prefersReduced && (
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transition-transform duration-1000 ${
                      sweepActive ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                    }`}
                  />
                )}
              </h1>
            </div>

            {/* Mobile/Tablet Portrait Photo: placed directly under name per spec */}
            <div className="lg:hidden my-4 flex justify-center sm:justify-start">
              <ProfilePhoto hasPhoto={hasProfilePhoto} />
            </div>

            {/* 2. Eyebrow Line */}
            <motion.p
              className="text-[clamp(0.688rem,1vw,0.813rem)] tracking-[0.25em] text-blue-400 uppercase font-semibold flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span>{HERO_CONTENT.eyebrow}</span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-slate-300 font-normal">{SITE_CONFIG.location}</span>
            </motion.p>

            {/* 3. Supporting lines */}
            <div className="space-y-2.5 max-w-xl">
              <motion.p
                className="text-[clamp(1rem,1.5vw,1.25rem)] text-white font-semibold leading-snug drop-shadow-sm"
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.6, delay: 0.95 }}
              >
                {HERO_CONTENT.tagline}
              </motion.p>
              <motion.p
                className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-slate-300 leading-relaxed font-normal"
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.6, delay: 1.05 }}
              >
                {HERO_CONTENT.description}
              </motion.p>
            </div>

            {/* 4. Action Buttons (High contrast radiant + elevated secondary) */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-[#070709] bg-white rounded-full hover:bg-slate-100 hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] transition-all min-h-[46px] hover:scale-105 active:scale-95"
              >
                <span>View My Work</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full bg-[#161624] border border-white/20 hover:border-white/40 hover:bg-[#1E1E32] shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all min-h-[46px] hover:scale-105 active:scale-95"
              >
                <span>View Resume</span>
                <span className="text-blue-400">↗</span>
              </a>
            </motion.div>

            {/* 5. Social icons */}
            <motion.div
              className="flex items-center gap-3.5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub, opens in a new tab"
                className="text-slate-300 hover:text-white bg-[#141420] border border-white/[0.14] hover:border-blue-400 hover:bg-[#1C1C2C] shadow-md hover:scale-110 transition-all p-2.5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram, opens in a new tab"
                className="text-slate-300 hover:text-white bg-[#141420] border border-white/[0.14] hover:border-blue-400 hover:bg-[#1C1C2C] shadow-md hover:scale-110 transition-all p-2.5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                aria-label="Send email"
                className="text-slate-300 hover:text-white bg-[#141420] border border-white/[0.14] hover:border-blue-400 hover:bg-[#1C1C2C] shadow-md hover:scale-110 transition-all p-2.5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile photo / Monogram (Desktop & Tablet Landscape) */}
          <motion.div
            style={prefersReduced ? undefined : { y: photoParallaxY }}
            className="hidden lg:block mt-12 lg:mt-0 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProfilePhoto hasPhoto={hasProfilePhoto} />
          </motion.div>
        </div>
      </div>

      {/* Gradient scrim for perfect text readability over 3D canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/45 to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-[1]" />
    </section>
  );
}
