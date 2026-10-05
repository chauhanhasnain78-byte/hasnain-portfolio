import { SOCIALS, SITE } from '@/lib/constants/site';
import { Container } from '@/components/ui/layout';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.08] bg-bg">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="text-xl font-bold text-text mb-2 tracking-tight block">
            {SITE.brand}
          </span>
          <p className="text-text-secondary text-sm">
            {SITE.tagline}
          </p>
        </div>

        <div className="flex items-center gap-6 mb-8">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={social.ariaLabel}
              className="text-text-secondary hover:text-text transition-colors text-sm font-medium min-h-[44px] flex items-center"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-text-muted text-xs">
          <p>© 2026 {SITE.name}</p>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/[0.15]" />
          <p>{SITE.location}</p>
        </div>
      </Container>
    </footer>
  );
}
