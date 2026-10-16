'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CURRENTLY_EXPLORING } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';

export function ExploringSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="exploring" className="!pt-4">
      <div ref={ref}>
        {/* Status chip */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-emerald-300 tracking-wide">
            Currently building
          </span>
        </motion.div>

        <motion.h3
          className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span>Currently Exploring</span>
          <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent inline-block" />
        </motion.h3>

        <div className="flex flex-wrap gap-3 sm:gap-3.5 mb-8">
          {CURRENTLY_EXPLORING.map((item, i) => (
            <motion.span
              key={item}
              className="surface-pill group px-4.5 py-2.5 text-sm font-semibold text-blue-100 hover:text-white rounded-full flex items-center gap-2 cursor-default shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
              <span>{item}</span>
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-sm text-slate-400 italic"
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
