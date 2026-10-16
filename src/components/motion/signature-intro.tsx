'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '@/lib/constants/site';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

export function SignatureIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Skip if reduced motion or already shown this session
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && sessionStorage.getItem('signature-shown')) return;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('signature-shown', 'true');
    }

    const startTimer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 10);

    // Auto-dismiss after animation
    const dismissTimer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 500);
    }, 2500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(dismissTimer);
    };
  }, [prefersReduced]);

  const skip = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  // Skip on key press or scroll attempt
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = () => skip();
    const handleWheel = (e: WheelEvent) => { e.preventDefault(); skip(); };
    const handleTouch = () => skip();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [isVisible, skip]);

  if (!isVisible) return null;

  const signatureName = SITE_CONFIG.signatureName;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      aria-hidden="true"
      onClick={skip}
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Signature SVG write-on effect */}
            <svg
              viewBox="0 0 400 120"
              className="w-[clamp(250px,60vw,500px)] h-auto"
              fill="none"
            >
              <defs>
                <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F5F5F5" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Signature text - elegant script-style */}
              <motion.text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-[4rem]"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontStyle="italic"
                fill="url(#signatureGradient)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {signatureName}
              </motion.text>

              {/* Underline flourish */}
              <motion.line
                x1="100"
                y1="85"
                x2="300"
                y2="85"
                stroke="url(#signatureGradient)"
                strokeWidth="1"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              />

              {/* Dot at the end */}
              <motion.circle
                cx="305"
                cy="85"
                r="2"
                fill="#3B82F6"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.6 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {isAnimating && (
        <button
          onClick={(e) => { e.stopPropagation(); skip(); }}
          className="absolute bottom-8 right-8 text-xs text-[#62626B] hover:text-[#92929A] transition-colors px-3 py-2 rounded-full border border-[rgba(255,255,255,0.06)] min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          Skip
        </button>
      )}
    </div>
  );
}
