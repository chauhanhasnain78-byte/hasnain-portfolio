'use client';

import { useRef, useState, useCallback, type FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Send } from 'lucide-react';
import { CONTACT_CONTENT, SOCIAL_LINKS } from '@/lib/constants/site';
import { submitContact } from '@/lib/contact';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { cn } from '@/lib/utils';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Invalid email';
    if (!formState.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const result = submitContact(formState);
    setStatus(result.message);
    if (result.success) {
      setFormState({ name: '', email: '', message: '', honeypot: '' });
    }
  }, [formState]);

  const linkCards = [
    {
      label: 'GitHub',
      href: SOCIAL_LINKS.github,
      icon: <GitHubIcon className="w-5 h-5" />,
      external: true,
    },
    {
      label: 'Instagram',
      href: SOCIAL_LINKS.instagram,
      icon: <InstagramIcon className="w-5 h-5" />,
      external: true,
    },
    {
      label: 'Email',
      href: SOCIAL_LINKS.email,
      icon: <Mail className="w-5 h-5" />,
      external: false,
    },
  ];

  return (
    <SectionWrapper id="contact">
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - text and links */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
            {CONTACT_CONTENT.heading}
          </h2>
          <p className="text-[clamp(0.938rem,1.2vw,1.125rem)] text-[#92929A] max-w-md">
            {CONTACT_CONTENT.description}
          </p>

          <a
            href={CONTACT_CONTENT.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#050505] bg-[#F5F5F5] rounded-full hover:bg-white transition-colors min-h-[44px]"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_CONTENT.ctaLabel}
          </a>

          {/* Link cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {linkCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                aria-label={card.external ? `${card.label}, opens in a new tab` : card.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] hover:border-[rgba(255,255,255,0.12)] transition-all min-h-[44px]"
              >
                <span className="text-[#92929A]">{card.icon}</span>
                <span className="text-sm text-[#F5F5F5]">{card.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right - form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Honeypot */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            >
              <label htmlFor="honeypot">Do not fill this</label>
              <input
                id="honeypot"
                name="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formState.honeypot}
                onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm text-[#92929A] mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-[#0A0A0C] border text-[#F5F5F5] text-sm transition-colors focus:outline-none focus:border-[#3B82F6]',
                  errors.name ? 'border-red-500' : 'border-[rgba(255,255,255,0.06)]'
                )}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#92929A] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-[#0A0A0C] border text-[#F5F5F5] text-sm transition-colors focus:outline-none focus:border-[#3B82F6]',
                  errors.email ? 'border-red-500' : 'border-[rgba(255,255,255,0.06)]'
                )}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-[#92929A] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-[#0A0A0C] border text-[#F5F5F5] text-sm transition-colors focus:outline-none focus:border-[#3B82F6] resize-none',
                  errors.message ? 'border-red-500' : 'border-[rgba(255,255,255,0.06)]'
                )}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#050505] bg-[#F5F5F5] rounded-full hover:bg-white transition-colors min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>

            {status && (
              <p className="text-sm text-[#92929A]" role="status">{status}</p>
            )}
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
