import { ProfilePhoto } from '@/components/hero/profile-photo';
import { HeroVisual } from '@/components/hero/hero-visual';
import { HeroContent } from '@/components/hero/hero-content';
import { Container } from '@/components/ui/container';

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] w-full items-center pt-24 pb-16 md:pt-32">
      <Container className="w-full">
        <HeroContent
          visual={
            <HeroVisual>
              <ProfilePhoto />
            </HeroVisual>
          }
        />
      </Container>
    </section>
  );
}

export default Hero;
