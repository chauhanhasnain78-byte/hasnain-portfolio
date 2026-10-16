'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CURRENTLY_EXPLORING } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';

export function ExploringSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="exploring" className="!pt-0">
      <div ref={ref}>
        {/* Status chip */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28C840]" />
          </span>
          <span className="text-xs text-[#92929A]">Currently building</span>
        </motion.div>

        <motion.h3
          className="text-xl font-semibold text-[#F5F5F5] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Currently Exploring
        </motion.h3>

        <div className="flex flex-wrap gap-3 mb-8">
          {CURRENTLY_EXPLORING.map((item, i) => (
            <motion.span
              key={item}
              className="px-4 py-2 text-sm text-[#92929A] border border-[rgba(255,255,255,0.06)] rounded-full bg-[#0A0A0C] hover:border-[rgba(255,255,255,0.1)] transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-sm text-[#62626B] italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          This portfolio keeps evolving.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
