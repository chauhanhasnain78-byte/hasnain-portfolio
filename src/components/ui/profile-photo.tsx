'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants/site';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

interface ProfilePhotoProps {
  hasPhoto?: boolean;
}

export function ProfilePhoto({ hasPhoto = true }: ProfilePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  // Mouse tilt tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Tilt transforms (max ~8 degrees)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Specular light sweep position
  const shineX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const shineY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const [tapSweep, setTapSweep] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleTap = useCallback(() => {
    setTapSweep(true);
    setTimeout(() => setTapSweep(false), 1000);
  }, []);

  const shouldShowPhoto = hasPhoto && !imageError;

  return (
    <div
      ref={containerRef}
      className="relative [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      {/* Decorative ambient rim glow */}
      <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-[#3B82F6]/35 via-transparent to-[#8B5CF6]/35 blur-md pointer-events-none" />

      {/* Orbiting arc lines - decorative */}
      <div className="absolute -inset-6 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(59, 130, 246, 0.18)"
            strokeWidth="0.4"
            strokeDasharray="18 32"
          />
        </svg>
      </div>
      <div className="absolute -inset-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full animate-[spin_35s_linear_infinite_reverse]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="0.4"
            strokeDasharray="12 40"
          />
        </svg>
      </div>

      {/* Main 3D Tilting Frame */}
      <motion.div
        style={prefersReduced ? undefined : { rotateX, rotateY }}
        className="relative z-10 w-[clamp(240px,32vw,360px)] aspect-[4/5] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#0A0A0C] shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Photo Content */}
        <div className="absolute inset-0 z-10 w-full h-full bg-[#0A0A0C]">
          {shouldShowPhoto ? (
            <Image
              src="/images/profile-photo.jpg"
              alt="Portrait of Chauhan Mohammed Hasnain"
              fill
              priority
              unoptimized
              className="object-cover object-top"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 360px"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Premium HMH Monogram fallback */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0A0C] via-[#0F0F14] to-[#15151D] select-none p-6 text-center">
              <div className="relative flex items-center justify-center">
                <span className="text-[clamp(3.5rem,7vw,6rem)] font-extrabold tracking-widest text-white/[0.08]">
                  {SITE_CONFIG.monogram}
                </span>
                <span className="absolute text-[clamp(3.5rem,7vw,6rem)] font-extrabold tracking-widest bg-gradient-to-r from-[#F5F5F5] via-[#93C5FD] to-[#C4B5FD] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  {SITE_CONFIG.monogram}
                </span>
              </div>
              <p className="mt-2 text-[0.688rem] tracking-[0.3em] uppercase text-[#92929A]">
                Chauhan Mohammed Hasnain
              </p>
            </div>
          )}
        </div>

        {/* Specular light sweep on desktop mouse move / touch tap */}
        {!prefersReduced && (
          <motion.div
            style={{
              background: 'radial-gradient(circle 180px at 50% 50%, rgba(255,255,255,0.22), transparent 70%)',
              left: shineX,
              top: shineY,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute z-20 w-72 h-72 pointer-events-none rounded-full transition-opacity duration-300 ${
              tapSweep ? 'opacity-100' : 'opacity-70'
            }`}
          />
        )}

        {/* Bottom subtle gradient for contrast & depth */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
