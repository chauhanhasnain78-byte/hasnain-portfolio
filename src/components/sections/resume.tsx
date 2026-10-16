'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ExternalLink, Download } from 'lucide-react';
import { RESUME_LINKS } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';

interface ResumeSectionProps {
  hasResumePdf: boolean;
}

export function ResumeSection({ hasResumePdf }: ResumeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="resume">
      <motion.div
        ref={ref}
        className="max-w-3xl mx-auto surface-card p-8 sm:p-12 md:p-16 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Subtle ambient light glow in background of card */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <h2 className="relative text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-tight text-white leading-tight">
          Want the complete story?
        </h2>
        <p className="relative text-[clamp(0.938rem,1.2vw,1.125rem)] text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
          View my resume and explore my education, skills and work.
        </p>

        <div className="relative flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={RESUME_LINKS.online}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-[#070709] bg-white rounded-full hover:bg-slate-100 shadow-[0_0_28px_rgba(255,255,255,0.4)] transition-all min-h-[46px] hover:scale-105 active:scale-95"
          >
            <span>View Resume</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          {hasResumePdf && (
            <a
              href={`/resume/${RESUME_LINKS.pdf}`}
              download
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white rounded-full bg-[#161624] border border-white/20 hover:border-white/40 hover:bg-[#1E1E32] shadow-md transition-all min-h-[46px] hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download Resume</span>
            </a>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
