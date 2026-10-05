import { resumePdfExists } from '@/lib/utils/assets';
import { LINKS } from '@/lib/constants/site';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/wrappers';
import { Section, Container } from '@/components/ui/layout';

export default function Resume() {
  const hasPdf = resumePdfExists();

  return (
    <Section id="resume" className="py-32 bg-surface-elevated/40 border-y border-white/[0.08] scroll-mt-20">
      <Container className="text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Want the complete story?
          </h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto text-lg">
            View my resume and explore my education, skills and work.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={LINKS.onlineCv}
              external
              variant="primary"
              className="w-full sm:w-auto min-h-[44px]"
            >
              View Resume ↗
            </Button>
            
            {hasPdf && (
              <Button
                href="/resume/hasnain-resume.pdf"
                variant="secondary"
                className="w-full sm:w-auto min-h-[44px]"
                download
              >
                Download Resume ↓
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
