'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { SectionHeading } from '@/components/ui/section-heading';

export function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="education">
      <SectionHeading title="Education" />

      <motion.div
        ref={ref}
        className="max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative pl-7 sm:pl-8 border-l-2 border-blue-500/30">
          {/* Glowing timeline dot */}
          <div className="absolute left-0 top-1 -translate-x-[9px] w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_16px_#3B82F6] border-2 border-[#07070A]" />

          <div className="surface-card surface-card-hover p-6 sm:p-7 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 shadow-inner flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-2.5">
                <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-tight">
                  {EDUCATION.degree}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {EDUCATION.institution}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <span className="text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/25 px-3.5 py-1.5 rounded-full shadow-sm">
                    {EDUCATION.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-[#1A1A28] border border-white/[0.12] px-3.5 py-1.5 rounded-full shadow-sm">
                    {EDUCATION.graduation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
