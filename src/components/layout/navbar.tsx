'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants/site';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useLenis } from '@/components/providers/lenis-provider';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection } = useScrollProgress();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap - focus first item
      firstFocusRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  // Focus trap
  useEffect(() => {
    if (!isMobileMenuOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [isMobileMenuOpen]);

  const { scrollTo } = useLenis();

  const handleNavClick = useCallback(
    (href: string) => {
      setIsMobileMenuOpen(false);
      scrollTo(href, -80);
    },
    [scrollTo]
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-2 mt-2 mx-auto max-w-[min(calc(100%-2rem),1280px)]'
            : 'py-4'
        )}
      >
        <nav
          className={cn(
            'mx-auto flex items-center justify-between transition-all duration-500 container-padding',
            isScrolled
              ? 'rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,12,0.85)] lg:backdrop-blur-xl px-6 py-2.5'
              : 'max-w-[1280px] py-2'
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-lg font-bold tracking-tight text-[#F5F5F5] hover:text-[#3B82F6] transition-colors z-50 relative"
          >
            {SITE_CONFIG.logo}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  'px-3 py-2 text-sm transition-colors rounded-full',
                  activeSection === item.href.replace('#', '')
                    ? 'text-[#F5F5F5] bg-[rgba(255,255,255,0.06)]'
                    : 'text-[#92929A] hover:text-[#F5F5F5]'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#F5F5F5] rounded-full border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all"
          >
            Let&apos;s Talk ↗
          </a>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 flex flex-col items-center justify-center w-11 h-11 gap-1.5"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300',
                isMobileMenuOpen && 'rotate-45 translate-y-[4px]'
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300',
                isMobileMenuOpen && '-rotate-45 -translate-y-[4px]'
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-[#050505] transition-all duration-500 lg:hidden flex flex-col items-center justify-center',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col items-center gap-2">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              ref={i === 0 ? firstFocusRef : undefined}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                'px-6 py-3 text-2xl font-light transition-all duration-300 min-h-[44px] flex items-center',
                activeSection === item.href.replace('#', '')
                  ? 'text-[#F5F5F5]'
                  : 'text-[#92929A] hover:text-[#F5F5F5]'
              )}
              style={{ transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="mt-6 px-8 py-3 text-lg font-medium text-[#F5F5F5] rounded-full border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-all min-h-[44px] flex items-center"
          >
            Let&apos;s Talk ↗
          </a>
        </nav>
      </div>
    </>
  );
}
