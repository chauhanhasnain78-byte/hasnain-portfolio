import { EDUCATION } from '@/lib/constants/site';
import { Reveal } from '@/components/motion/wrappers';
import { Section, Container } from '@/components/ui/layout';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <Section id="education" className="py-24 scroll-mt-20">
      <Container>
        <Reveal>
          <h2 className="font-bold text-3xl md:text-4xl mb-12 text-text">Education</h2>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-surface border-l-2 border-accent rounded-r-xl p-6 border-y border-r border-white/[0.08]">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-lg text-text">{EDUCATION.institution}</h3>
              </div>
              <p className="text-text-secondary mb-3">{EDUCATION.degree}</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
                <span className="text-text-secondary">{EDUCATION.status}</span>
                <span className="text-accent font-medium">
                  Expected Graduation: {EDUCATION.graduation}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
