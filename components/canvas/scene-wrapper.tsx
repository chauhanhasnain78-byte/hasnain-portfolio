'use client';

// Client wrapper for dynamic import of the 3D scene.
// ssr: false because Three.js requires DOM/WebGL.

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/canvas/scene'), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, rgba(47,107,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(124,92,255,0.04) 0%, transparent 50%), #050505',
      }}
    />
  ),
});

export default function SceneWrapper() {
  return <Scene />;
}
