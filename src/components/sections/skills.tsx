'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SKILLS } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { SectionHeading } from '@/components/ui/section-heading';

const skillIcons: Record<string, string> = {
  HTML: '🌐',
  CSS: '🎨',
  JavaScript: '⚡',
  Flutter: '📱',
  Dart: '🎯',
  'Node.js': '🟢',
  MySQL: '🗄️',
  Git: '🔀',
  GitHub: '🐱',
};

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Tools I work with." />

      <div ref={ref} className="flex flex-wrap gap-3 md:gap-4 max-w-3xl">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill}
            className="group px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] hover:border-[rgba(255,255,255,0.12)] hover:bg-[#101013] transition-all duration-300 cursor-default min-h-[44px] flex items-center gap-2.5"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="text-lg" aria-hidden="true">
              {skillIcons[skill] || '⚙️'}
            </span>
            <span className="text-sm font-medium text-[#F5F5F5]">{skill}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
