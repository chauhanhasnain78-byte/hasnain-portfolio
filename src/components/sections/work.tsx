'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { SectionHeading } from '@/components/ui/section-heading';
import { usePrefersReducedMotion, useHasFinePointer } from '@/hooks/use-media-query';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

interface WorkSectionProps {
  hasSocialCvPreview: boolean;
  hasNavindiaPreview: boolean;
}

export function WorkSection({ hasSocialCvPreview, hasNavindiaPreview }: WorkSectionProps) {
  const previewMap: Record<string, boolean> = {
    'social-cv': hasSocialCvPreview,
    'navindia-enterprises': hasNavindiaPreview,
  };

  return (
    <SectionWrapper id="work">
      <SectionHeading
        title="Selected Work"
        subtitle="A collection of things I've built and explored."
      />

      <div className="space-y-24 lg:space-y-36">
        {PROJECTS.map((project, index) => (
          <ProjectScene
            key={project.id}
            project={project}
            index={index}
            hasPreview={previewMap[project.id] || false}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ProjectScene({
  project,
  index,
  hasPreview,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  hasPreview: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const isReversed = index % 2 === 1;
  const prefersReduced = usePrefersReducedMotion();
  const hasFinePointer = useHasFinePointer();

  // Desktop 3D Tilt calculation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const shineLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const shineTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasFinePointer || prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [hasFinePointer, prefersReduced, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center [perspective:1200px]`}
    >
      {/* Floating 3D Mini Browser Mockup Frame */}
      <motion.div
        className="flex-1 w-full [transform-style:preserve-3d]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50, rotateY: isReversed ? 8 : -8 }}
        animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} live website, opens in a new tab`}
          className="group block relative"
        >
          {/* Subtle glow edge on hover */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#3B82F6]/20 via-transparent to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />

          {/* Browser Container */}
          <motion.div
            style={prefersReduced || !hasFinePointer ? undefined : { rotateX, rotateY }}
            className="relative rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0C] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
          >
            {/* Browser Chrome Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[#0D0D10]/90">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
              </div>
              <div className="flex-1 max-w-[260px] mx-auto">
                <div className="bg-[#15151A] rounded-md px-3 py-1 text-[0.7rem] text-[#62626B] font-mono text-center truncate border border-[rgba(255,255,255,0.03)]">
                  {project.liveUrl.replace('https://', '')}
                </div>
              </div>
              <div className="w-10 flex justify-end" aria-hidden="true">
                <span className="text-[0.65rem] text-[#62626B]">●</span>
              </div>
            </div>

            {/* Browser Window Body */}
            <div className="aspect-[16/10] relative bg-gradient-to-b from-[#0F0F13] to-[#0A0A0C] overflow-hidden">
              {hasPreview ? (
                <Image
                  src={`/images/${project.previewImage}`}
                  alt={`Screenshot preview of ${project.title}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                /* Authentic Minimalist Centerpiece */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center select-none">
                  {/* Subtle grid pattern background */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

                  <motion.p
                    className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold tracking-tight text-[#F5F5F5] mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    {project.previewContent.heading}
                  </motion.p>
                  <p className="text-[clamp(0.813rem,1vw,0.938rem)] text-[#92929A] max-w-sm mb-5 font-normal leading-relaxed">
                    {project.previewContent.subheading}
                  </p>
                  {project.previewContent.cta && (
                    <span className="text-xs text-[#3B82F6] font-medium border border-[#3B82F6]/30 bg-[#3B82F6]/5 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      {project.previewContent.cta}
                    </span>
                  )}
                </div>
              )}

              {/* Specular glare on tilt */}
              {!prefersReduced && hasFinePointer && (
                <motion.div
                  style={{
                    background: 'radial-gradient(circle 200px at 50% 50%, rgba(255,255,255,0.12), transparent 70%)',
                    left: shineLeft,
                    top: shineTop,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute w-80 h-80 pointer-events-none rounded-full"
                />
              )}

              {/* Desktop Hover "VIEW" pill */}
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3.5 py-1.5 rounded-full bg-white text-[#050505] text-xs font-bold tracking-wider shadow-lg flex items-center gap-1.5">
                  VIEW ↗
                </span>
              </div>
            </div>
          </motion.div>
        </a>
      </motion.div>

      {/* Project Metadata & Links */}
      <motion.div
        className="flex-1 space-y-5"
        initial={{ opacity: 0, y: 35 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase">
            0{index + 1} • Project
          </span>
          <h3 className="text-[clamp(1.5rem,2.8vw,2rem)] font-bold text-[#F5F5F5] tracking-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-[#92929A] leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs text-[#92929A] border border-[rgba(255,255,255,0.06)] rounded-full bg-[#0A0A0C]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Links Outside the Frame */}
        <div className="flex items-center gap-6 pt-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live website in a new tab`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F5F5] hover:text-[#3B82F6] transition-colors min-h-[44px] group"
          >
            <span>Live Website</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub, opens in a new tab`}
            className="inline-flex items-center gap-2 text-sm text-[#92929A] hover:text-[#F5F5F5] transition-colors min-h-[44px] group"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
