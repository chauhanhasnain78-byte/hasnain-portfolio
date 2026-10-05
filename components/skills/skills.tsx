import { Code, Palette, FileCode2, Smartphone, Terminal, Server, Database, GitBranch } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/icons';
import { SKILLS } from '@/lib/constants/site';
import { Reveal } from '@/components/motion/wrappers';
import { Section, Container } from '@/components/ui/layout';
import { cn } from '@/lib/utils/cn';

const iconMap: Record<string, React.ElementType> = {
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
    <Section id="skills" className="py-24 scroll-mt-20">
      <Container>
        <Reveal>
          <h2 className="font-bold text-3xl md:text-4xl mb-12 text-text">Tools I work with.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS.map((skill) => {
              const Icon = iconMap[skill.name] || Terminal;
              return (
                <div
                  key={skill.name}
                  className={cn(
                    "bg-surface border border-white/[0.08] rounded-xl p-4",
                    "flex flex-col items-center gap-3 text-center",
                    "hover:border-white/[0.14] hover:-translate-y-[3px] transition-all duration-300"
                  )}
                >
                  <Icon className="w-6 h-6 text-text-secondary" />
                  <span className="text-sm font-medium text-text">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
