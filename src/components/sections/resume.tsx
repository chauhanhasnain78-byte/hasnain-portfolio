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
        className="max-w-2xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
          Want the complete story?
        </h2>
        <p className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-[#92929A]">
          View my resume and explore my education, skills and work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={RESUME_LINKS.online}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#050505] bg-[#F5F5F5] rounded-full hover:bg-white transition-colors min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4" />
            View Resume ↗
          </a>
          {hasResumePdf && (
            <a
              href={`/resume/${RESUME_LINKS.pdf}`}
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#F5F5F5] rounded-full border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              Download Resume ↓
            </a>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
