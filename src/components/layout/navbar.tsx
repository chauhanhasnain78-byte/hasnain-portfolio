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
      scrollTo(href, -100);
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
              ? 'rounded-full border border-white/[0.15] bg-[#0E0E18]/90 backdrop-blur-xl px-6 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
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
            className="text-lg font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors z-50 relative"
          >
            {SITE_CONFIG.logo}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  'px-3.5 py-1.5 text-sm transition-all rounded-full font-medium',
                  activeSection === item.href.replace('#', '')
                    ? 'text-white bg-white/[0.14] border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-white'
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
            className="hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-semibold text-[#070709] bg-white hover:bg-slate-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all hover:scale-105"
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
          'fixed inset-0 z-40 bg-[#07070A]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col items-center gap-3 w-full max-w-xs px-4">
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
                'w-full text-center px-6 py-3.5 text-xl font-medium rounded-2xl transition-all duration-300 min-h-[48px] flex items-center justify-center',
                activeSection === item.href.replace('#', '')
                  ? 'text-white bg-white/10 border border-white/20 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
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
            className="mt-6 w-full text-center px-8 py-3.5 text-base font-bold text-[#070709] bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all min-h-[48px] flex items-center justify-center"
          >
            Let&apos;s Talk ↗
          </a>
        </nav>
      </div>
    </>
  );
}
