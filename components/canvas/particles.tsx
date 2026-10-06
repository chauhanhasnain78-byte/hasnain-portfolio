'use client';

// Floating particles with real depth: near ones larger/brighter, far ones smaller/fainter.
// Count adapts to device capability via quality config.
// Uses a seeded random approach to satisfy React purity rules.

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QUALITY } from '@/lib/config/quality';

interface ParticlesProps {
  isMobile: boolean;
}

// Deterministic pseudo-random number generator (Mulberry32)
function createRng(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Particles({ isMobile }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? QUALITY.particles.mobile : QUALITY.particles.desktop;

  const [positions, sizes] = useMemo(() => {
    const rng = createRng(42); // deterministic seed
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere
      const r = 4 + rng() * 20;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Size inversely related to distance for depth illusion
      siz[i] = Math.max(0.5, (1 - (r - 4) / 20) * 3);
    }

    return [pos, siz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Very slow global rotation for a living feel
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 1.5 : 2}
        sizeAttenuation
        transparent
        opacity={0.4}
        color="#8090c0"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
