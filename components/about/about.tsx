import { RevealText } from '@/components/motion/reveal-text';
import { Reveal } from '@/components/motion/reveal';
import { SERVICES } from '@/lib/constants/site';
import { Container } from '@/components/ui/container';
import { Globe, Smartphone, Sparkles } from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  smartphone: Smartphone,
  sparkles: Sparkles,
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <div className="mb-12">
          <RevealText as="h2" className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            A little about me.
          </RevealText>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Info grid */}
          <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2 lg:content-start">
            <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-surface/30 p-5">
              <span className="text-sm font-medium text-text-secondary">Degree</span>
              <span className="font-semibold text-text">BSc Computer Science</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-surface/30 p-5">
              <span className="text-sm font-medium text-text-secondary">Status</span>
              <span className="font-semibold text-text">Third Year • Semester 5</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-surface/30 p-5">
              <span className="text-sm font-medium text-text-secondary">Location</span>
              <span className="font-semibold text-text">Mumbai, India</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-surface/30 p-5">
              <span className="text-sm font-medium text-text-secondary">Timeline</span>
              <span className="font-semibold text-text">Graduating 2027</span>
            </div>
          </Reveal>

          {/* About copy and Services */}
          <div className="flex flex-col gap-12">
            <Reveal>
              <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
                I&apos;m Hasnain Chauhan, a tech enthusiast actively engaged in web development projects like Social-CV and interested in exploring new AI tools. I enjoy participating in hackathons and experimenting with technology. Beyond coding, I enjoy gaming and spending great moments with friends at social gatherings.
              </p>
            </Reveal>

            <div className="space-y-6">
              <RevealText as="h3" className="text-xl font-bold text-text">
                What I Do
              </RevealText>
              
              <div className="grid gap-4 md:grid-cols-3">
                {SERVICES.map((service, i) => {
                  const Icon = serviceIcons[service.icon] || Globe;
                  return (
                    <Reveal key={service.title} delay={i * 0.1}>
                      <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/[0.06] bg-surface/30 p-6 transition-colors hover:bg-surface/50">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold text-text">{service.title}</h4>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {service.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
