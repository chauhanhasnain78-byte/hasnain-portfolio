'use client';

// Scene atmosphere: fog, perspective grid floor, soft ambient lighting,
// and a slowly shifting aurora gradient in the background.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

interface AtmosphereProps {
  isMobile: boolean;
}

export default function Atmosphere({ isMobile }: AtmosphereProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const colorA = useRef(new THREE.Color('#2F6BFF'));
  const colorB = useRef(new THREE.Color('#7C5CFF'));

  useFrame((state) => {
    if (lightRef.current) {
      // Slowly shift the point light color between electric blue and violet
      const t = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 + 0.5;
      lightRef.current.color.lerpColors(colorA.current, colorB.current, t);
    }
  });

  return (
    <>
      {/* Exponential fog intrinsic to R3F */}
      <fogExp2 attach="fog" args={['#050510', 0.035]} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.15} color="#a0b0d0" />

      {/* Key light — shifting blue/violet */}
      <pointLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={isMobile ? 15 : 30}
        distance={30}
        color="#2F6BFF"
      />

      {/* Fill light — soft warm */}
      <pointLight
        position={[-5, -3, -5]}
        intensity={isMobile ? 5 : 10}
        distance={20}
        color="#7C5CFF"
      />

      {/* Perspective grid floor fading into fog */}
      {!isMobile && (
        <gridHelper
          args={[80, 80, '#1a1a2e', '#1a1a2e']}
          position={[0, -4, 0]}
        />
      )}

      {/* Environment for reflections on the glass material */}
      <Environment preset="night" background={false} />
    </>
  );
}
