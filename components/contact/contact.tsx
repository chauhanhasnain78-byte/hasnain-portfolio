'use client';

import { useState, useRef } from 'react';
import { SITE, LINKS } from '@/lib/constants/site';
import { submitContact } from '@/lib/contact';
import { Section, Container } from '@/components/ui/layout';
import { Reveal } from '@/components/motion/wrappers';
import { cn } from '@/lib/utils/cn';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const honeypot = formData.get('website') as string;

    // Honeypot spam check - silent exit if bot fills hidden field
    if (honeypot) {
      return;
    }

    const newErrors: typeof errors = {};
    if (!name?.trim()) newErrors.name = 'Name is required';
    if (!email?.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (!message?.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      submitContact({ name, email, message });
      // Opens mailto client; do NOT claim "Message sent"
      formRef.current.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="py-24 scroll-mt-20">
      <Container>
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Have an idea?<br />
              <span className="text-accent">Let&apos;s build it.</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg mb-8 leading-relaxed">
              I&apos;m always interested in exploring interesting ideas, projects and opportunities.
            </p>
            <a 
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            >
              Let&apos;s Talk ↗
            </a>
            
            <div className="mt-8 pt-8 border-t border-white/[0.08] max-w-xl mx-auto">
              <p className="text-sm text-text-secondary mb-2">Or reach out directly at:</p>
              <div className="text-accent text-xl font-medium select-all">
                {SITE.email}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-text mb-6">Send a message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="name" className="text-sm text-text-secondary mb-1.5 block">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-invalid={!!errors.name}
                    className={cn(
                      "bg-surface border border-white/[0.08] rounded-lg px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent w-full outline-none transition-all",
                      errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-text-secondary mb-1.5 block">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-invalid={!!errors.email}
                    className={cn(
                      "bg-surface border border-white/[0.08] rounded-lg px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent w-full outline-none transition-all",
                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-text-secondary mb-1.5 block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    aria-invalid={!!errors.message}
                    className={cn(
                      "bg-surface border border-white/[0.08] rounded-lg px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent w-full outline-none transition-all resize-y",
                      errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-surface-elevated border border-white/[0.08] hover:bg-white/[0.06] text-text font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 min-h-[44px] cursor-pointer"
                >
                  {isSubmitting ? 'Opening email...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-text mb-2">Connect</h3>
              
              <a 
                href={LINKS.socialCvRepo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-surface border border-white/[0.08] rounded-lg p-4 flex justify-between items-center hover:border-white/[0.14] transition-colors min-h-[44px]"
              >
                <span className="font-medium text-text">GitHub</span>
                <span className="text-sm text-text-secondary">Social-CV Repository ↗</span>
              </a>
              
              <a 
                href={LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-surface border border-white/[0.08] rounded-lg p-4 flex justify-between items-center hover:border-white/[0.14] transition-colors min-h-[44px]"
              >
                <span className="font-medium text-text">Instagram</span>
                <span className="text-sm text-text-secondary">Instagram ↗</span>
              </a>

              <a 
                href={`mailto:${SITE.email}`} 
                className="bg-surface border border-white/[0.08] rounded-lg p-4 flex justify-between items-center hover:border-white/[0.14] transition-colors min-h-[44px]"
              >
                <span className="font-medium text-text">Email</span>
                <span className="text-sm text-text-secondary">chauhanhasnain78@gmail.com ↗</span>
              </a>

              {LINKS.linkedin ? (
                <a 
                  href={LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-surface border border-white/[0.08] rounded-lg p-4 flex justify-between items-center hover:border-white/[0.14] transition-colors min-h-[44px]"
                >
                  <span className="font-medium text-text">LinkedIn</span>
                  <span className="text-sm text-text-secondary">↗</span>
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
