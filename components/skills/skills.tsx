'use client';

import { Code, Palette, FileCode2, Smartphone, Terminal, Server, Database, GitBranch } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/icons';
import { SKILLS } from '@/lib/constants/site';
import { Reveal } from '@/components/motion/reveal';
import { Section, Container } from '@/components/ui/layout';
import { Tilt } from '@/components/motion/tilt';
import { cn } from '@/lib/utils/cn';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'HTML': Code,
  'CSS': Palette,
  'JavaScript': FileCode2,
  'Flutter': Smartphone,
  'Dart': Terminal,
  'Node.js': Server,
  'MySQL': Database,
  'Git': GitBranch,
  'GitHub': GitHubIcon,
};

export default function Skills() {
  return (
    <Section id="skills" className="py-24 scroll-mt-20 relative">
      <Container>
        <Reveal>
          <h2 className="font-bold text-3xl md:text-4xl mb-12 text-text">Tools I work with.</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = iconMap[skill.name] || Terminal;
            return (
              <Reveal key={skill.name} delay={i * 0.05}>
                <Tilt maxTilt={8}>
                  <div
                    className={cn(
                      "bg-surface/80 backdrop-blur-sm border border-white/[0.08] rounded-xl p-5",
                      "flex flex-col items-center gap-3 text-center",
                      "hover:border-white/[0.14] hover:-translate-y-[3px] hover:shadow-lg hover:shadow-accent/5",
                      "transition-all duration-300 cursor-default"
                    )}
                  >
                    <div className="p-2.5 rounded-lg bg-white/[0.03]">
                      <Icon className="w-6 h-6 text-text-secondary" />
                    </div>
                    <span className="text-sm font-medium text-text">{skill.name}</span>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
