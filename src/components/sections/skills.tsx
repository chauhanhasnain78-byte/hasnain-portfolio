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

      <div ref={ref} className="flex flex-wrap gap-3 sm:gap-4 max-w-4xl">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill}
            className="surface-pill group px-5 py-3.5 rounded-2xl cursor-default min-h-[48px] flex items-center gap-3 shadow-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span
              className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform"
              aria-hidden="true"
            >
              {skillIcons[skill] || '⚙️'}
            </span>
            <span className="text-sm font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
