'use client';

// Persistent fullscreen 3D Canvas behind the entire page.
// Lazy-loaded after first paint. Falls back to CSS gradient if no WebGL.

import { Suspense, useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, Preload } from '@react-three/drei';
import { QUALITY } from '@/lib/config/quality';
import HeroShape from '@/components/canvas/hero-shape';
import Particles from '@/components/canvas/particles';
import Atmosphere from '@/components/canvas/atmosphere';
import CameraRig from '@/components/canvas/camera-rig';

// Detect WebGL support — runs once, cached
const webGLSupport = (() => {
  if (typeof window === 'undefined') return true; // assume true for SSR
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
})();

// Detect mobile
function useIsMobile(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(`(max-width: ${QUALITY.mobileBreakpoint}px)`);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(`(max-width: ${QUALITY.mobileBreakpoint}px)`).matches,
    () => false
  );
}

// Detect reduced motion
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

const CSS_FALLBACK = (
  <div
    className="fixed inset-0 -z-10 pointer-events-none"
    aria-hidden="true"
    style={{
      background:
        'radial-gradient(ellipse at 30% 20%, rgba(47,107,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(124,92,255,0.06) 0%, transparent 50%), #050505',
    }}
  />
);

export default function Scene() {
  const [dpr, setDpr] = useState<number>(QUALITY.maxDpr);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  // Pause canvas when tab is hidden
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // CSS gradient fallback for no WebGL
  if (!webGLSupport) {
    return CSS_FALLBACK;
  }

  // Reduced motion: static calm scene, no 3D
  if (reducedMotion) {
    return CSS_FALLBACK;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: QUALITY.camera.fov,
          near: QUALITY.camera.near,
          far: QUALITY.camera.far,
          position: [0, 0, 8],
        }}
        frameloop={isVisible ? 'always' : 'never'}
        style={{ background: '#050505' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr((prev) => Math.max(QUALITY.minDpr, prev - 0.5))}
          onIncline={() => setDpr((prev) => Math.min(QUALITY.maxDpr, prev + 0.5))}
        >
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>

        <Suspense fallback={null}>
          <CameraRig isMobile={isMobile} />
          <Atmosphere isMobile={isMobile} />
          <HeroShape isMobile={isMobile} />
          <Particles isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
