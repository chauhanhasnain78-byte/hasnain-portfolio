import { RevealText } from '@/components/motion/reveal-text';
import { Reveal } from '@/components/motion/reveal';
import { PROJECTS } from '@/lib/constants/site';
import { Tag } from '@/components/ui/tag';
import { BrowserFrame } from '@/components/work/browser-frame';
import { Container } from '@/components/ui/container';
import { socialCvPreviewExists } from '@/lib/utils/assets';

export function Work() {
  const hasPreview = socialCvPreviewExists();

  return (
    <section id="work" className="py-24 md:py-32 scroll-mt-20 relative">
      <Container>
        <div className="mb-16 flex flex-col gap-4">
          <RevealText as="h2" className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            Selected Work
          </RevealText>
          <Reveal>
            <p className="max-w-2xl text-lg text-text-secondary">
              A collection of things I&apos;ve built and explored.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.title}
              className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              {/* Project Info */}
              <div className={`flex flex-col gap-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <Reveal>
                  <h3 className="text-3xl font-bold text-text lg:text-4xl">{project.title}</h3>
                </Reveal>
                
                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                </Reveal>

                <Reveal delay={0.2} className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Reveal>

                <Reveal delay={0.3} className="mt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live website, opens in a new tab`}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 font-medium text-white transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    Live Website ↗
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} GitHub repository, opens in a new tab`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-transparent px-6 font-medium text-text transition-all hover:bg-white/5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    GitHub ↗
                  </a>
                </Reveal>
              </div>

              {/* Project Preview */}
              <Reveal 
                delay={0.2} 
                className={`relative w-full ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
              >
                <BrowserFrame 
                  href={project.liveUrl} 
                  previewImage={hasPreview ? '/images/social-cv-preview.png' : undefined}
                  title={project.title}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Work;
