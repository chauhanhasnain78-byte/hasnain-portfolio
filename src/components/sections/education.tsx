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
        <div className="relative pl-8 border-l border-[rgba(255,255,255,0.06)]">
          {/* Timeline dot */}
          <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#3B82F6] border-2 border-[#050505]" />

          <div className="p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C]">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-[#101013] border border-[rgba(255,255,255,0.06)] flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[#F5F5F5] font-semibold">
                  {EDUCATION.degree}
                </h3>
                <p className="text-sm text-[#92929A]">
                  {EDUCATION.institution}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <span className="text-xs text-[#62626B] bg-[#101013] px-3 py-1 rounded-full">
                    {EDUCATION.year}
                  </span>
                  <span className="text-xs text-[#62626B] bg-[#101013] px-3 py-1 rounded-full">
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
