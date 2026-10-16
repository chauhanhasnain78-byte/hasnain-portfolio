'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ABOUT_CONTENT, WHAT_I_DO } from '@/lib/constants/site';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { SectionHeading } from '@/components/ui/section-heading';
import { Code, Smartphone, Lightbulb } from 'lucide-react';

const whatIDoIcons = [Code, Smartphone, Lightbulb];

export function AboutSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-50px' });

  return (
    <SectionWrapper id="about">
      <SectionHeading title={ABOUT_CONTENT.heading} />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* About text & Info Cards */}
        <div className="space-y-8">
          <p className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-slate-300 leading-relaxed font-normal">
            {ABOUT_CONTENT.description}
          </p>

          {/* Elevated Info cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3.5 sm:gap-4">
            {ABOUT_CONTENT.infoCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="surface-card surface-card-hover p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[96px]"
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-[0.72rem] text-blue-400 font-bold uppercase tracking-wider mb-1.5">
                  {card.label}
                </p>
                <p className="text-sm sm:text-base text-white font-semibold">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What I Do */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span>What I Do</span>
            <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent inline-block" />
          </h3>
          <div className="space-y-4">
            {WHAT_I_DO.map((item, i) => {
              const Icon = whatIDoIcons[i];
              return (
                <motion.div
                  key={item.title}
                  className="surface-card surface-card-hover group p-5 sm:p-6 rounded-2xl transition-all cursor-default"
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1.5 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
