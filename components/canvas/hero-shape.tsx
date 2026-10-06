'use client';

// Hero centerpiece: elegant rotating abstract shape with glass/iridescent material.
// Reacts to mouse with gentle parallax rotation.

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { QUALITY } from '@/lib/config/quality';

interface HeroShapeProps {
  isMobile: boolean;
}

export default function HeroShape({ isMobile }: HeroShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });
  const detail = isMobile ? QUALITY.heroShape.mobileDetail : QUALITY.heroShape.desktopDetail;

  // Create a custom icosahedron geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 1);
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.y += delta * QUALITY.heroShape.rotationSpeed;
    meshRef.current.rotation.x += delta * QUALITY.heroShape.rotationSpeed * 0.3;

    // Mouse parallax (desktop only)
    if (!isMobile) {
      targetRotation.current.x = pointer.y * 0.3;
      targetRotation.current.y = pointer.x * 0.3;

      meshRef.current.rotation.x +=
        (targetRotation.current.x - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.y +=
        (targetRotation.current.y - meshRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.3}
          samples={isMobile ? 4 : detail > 64 ? 8 : 6}
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropicBlur={0.6}
          distortion={0.4}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0.0}
          toneMapped={true}
          color="#4080ff"
          transmission={0.95}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}
