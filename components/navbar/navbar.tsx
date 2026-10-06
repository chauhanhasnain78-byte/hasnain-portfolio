'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { NAV } from '@/lib/constants/site';
import { cn } from '@/lib/utils/cn';
import { Menu, X } from 'lucide-react';
import { getLenis } from '@/components/providers/lenis-provider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Scroll to section using Lenis for smooth scroll with offset
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();

    const lenis = getLenis();
    const target = document.querySelector(href);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      } else {
        // Fallback if Lenis not loaded (reduced motion)
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
        <div 
          className={cn(
            "max-w-6xl mx-auto flex items-center justify-between",
            "border border-white/[0.08] rounded-full px-6 transition-all duration-300 pointer-events-auto",
            "bg-bg/80 backdrop-blur-xl backdrop-saturate-150",
            isScrolled ? "py-2 shadow-lg shadow-black/20" : "py-3"
          )}
        >
          <a 
            href="#home" 
            className="font-bold text-lg text-text tracking-tight min-h-[44px] min-w-[44px] flex items-center"
            onClick={(e) => scrollToSection(e, '#home')}
          >
            HASNAIN.
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-text relative",
                    isActive ? "text-text" : "text-text-secondary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Let&apos;s Talk ↗
            </a>
          </div>

          <button
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-text-secondary hover:text-text"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-[100] bg-bg flex flex-col transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        style={{
          clipPath: isMobileMenuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'
        }}
      >
        <div className="flex items-center justify-between p-6">
          <span className="font-bold text-lg text-text tracking-tight">HASNAIN.</span>
          <button
            aria-label="Close menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-secondary hover:text-text"
            onClick={closeMenu}
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-8">
          {NAV.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  "text-3xl font-bold transition-colors min-h-[44px] flex items-center",
                  isActive ? "text-accent" : "text-text hover:text-text"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="mt-4 inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white text-lg font-medium"
          >
            Let&apos;s Talk ↗
          </a>
        </nav>
      </div>
    </>
  );
}
