'use client';

import dynamic from 'next/dynamic';
import { Suspense, useSyncExternalStore } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

const ThreeCanvas = dynamic(() => import('./canvas').then((mod) => mod.ThreeCanvas), {
  ssr: false,
});

const emptySubscribe = () => () => {};

let cachedWebGL: boolean | null = null;
function checkWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  if (cachedWebGL !== null) return cachedWebGL;
  try {
    const canvas = document.createElement('canvas');
    cachedWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    return cachedWebGL;
  } catch {
    cachedWebGL = false;
    return false;
  }
}

export function Scene() {
  const prefersReduced = usePrefersReducedMotion();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const supportsWebGL = useSyncExternalStore(
    emptySubscribe,
    () => checkWebGL(),
    () => false
  );

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* CSS gradient fallback - always visible */}
      <div className="absolute inset-0 bg-[#07070A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_60%)]" />
      </div>

      {/* 3D Canvas - loaded after first paint */}
      {isMounted && supportsWebGL && !prefersReduced && (
        <Suspense fallback={null}>
          <ThreeCanvas />
        </Suspense>
      )}
    </div>
  );
}
