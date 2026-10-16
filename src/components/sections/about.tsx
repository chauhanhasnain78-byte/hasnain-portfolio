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
      
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* About text */}
        <div className="space-y-8">
          <p className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-[#92929A] leading-relaxed">
            {ABOUT_CONTENT.description}
          </p>

          {/* Info cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3">
            {ABOUT_CONTENT.infoCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] hover:border-[rgba(255,255,255,0.1)] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-[0.75rem] text-[#62626B] uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className="text-sm text-[#F5F5F5] font-medium">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What I Do */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#F5F5F5]">What I Do</h3>
          <div className="space-y-4">
            {WHAT_I_DO.map((item, i) => {
              const Icon = whatIDoIcons[i];
              return (
                <motion.div
                  key={item.title}
                  className="group p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] hover:border-[rgba(255,255,255,0.1)] transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#101013] border border-[rgba(255,255,255,0.06)] flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="text-[#F5F5F5] font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-[#92929A]">{item.description}</p>
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
