import { EXPLORING } from '@/lib/constants/site';
import { Tag } from '@/components/ui/tag';
import { Reveal } from '@/components/motion/wrappers';
import { Section, Container } from '@/components/ui/layout';

export default function Exploring() {
  return (
    <Section aria-labelledby="exploring-heading" className="py-24 scroll-mt-20">
      <Container>
        <Reveal>
          <h2 id="exploring-heading" className="font-bold text-3xl md:text-4xl mb-8 text-text">
            Currently Exploring
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {EXPLORING.map((topic, idx) => (
              <Tag key={idx}>{topic}</Tag>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse motion-reduce:animate-none" />
              <span className="text-xs text-text-secondary font-medium">Currently building</span>
            </div>
            <p className="text-text-muted text-sm italic">
              This portfolio keeps evolving.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
