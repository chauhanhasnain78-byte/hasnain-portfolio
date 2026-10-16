'use client';

import { useRef, useMemo, useEffect, useState, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { QUALITY_TIERS, type QualityTier } from '@/lib/constants/theme';
import { detectQualityTier } from '@/lib/utils';

interface ParticleData {
  position: [number, number, number];
  speed: number;
  offset: number;
}

// Precompute deterministic particle positions at module initialization
function createParticleData(count: number): ParticleData[] {
  const list: ParticleData[] = [];
  for (let i = 0; i < count; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + 78.233)) % 1;
    const r2 = Math.abs(Math.sin((i + 1) * 39.346 + 11.135)) % 1;
    const r3 = Math.abs(Math.sin((i + 2) * 73.156 + 54.321)) % 1;
    const r4 = Math.abs(Math.sin((i + 3) * 91.827 + 23.456)) % 1;
    const r5 = Math.abs(Math.sin((i + 4) * 45.678 + 87.654)) % 1;

    list.push({
      position: [
        (r1 - 0.5) * 24,
        (r2 - 0.5) * 24,
        (r3 - 0.5) * 24,
      ],
      speed: r4 * 0.35 + 0.1,
      offset: r5 * Math.PI * 2,
    });
  }
  return list;
}

const ALL_PARTICLES = createParticleData(400);

// Luminous, translucent crystalline centerpiece that never turns into a black blob
function Centerpiece({ detail = 32 }: { detail?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();
  const { viewport } = useThree();
  const isPortrait = viewport.width < viewport.height;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.normalizedY * 0.25,
      delta * 2
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.normalizedX * 0.25,
      delta * 2
    );

    if (outerRef.current) outerRef.current.rotation.y += delta * 0.18;
    if (wireframeRef.current) wireframeRef.current.rotation.z -= delta * 0.12;
    if (innerRef.current) innerRef.current.rotation.x += delta * 0.3;
  });

  const baseScale = isPortrait ? 1.05 : 1.5;

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef} scale={baseScale}>
        {/* Outer glowing crystal shell */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1, detail > 32 ? 2 : 1]} />
          <meshPhysicalMaterial
            color="#60A5FA"
            emissive="#1E1B4B"
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transmission={0.55}
            ior={1.45}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Outer illuminated geometric wireframe cage */}
        <mesh ref={wireframeRef} scale={1.08}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#93C5FD"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Inner radiant energy core */}
        <mesh ref={innerRef} scale={0.42}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#8B5CF6"
            emissiveIntensity={1.8}
            roughness={0.15}
            metalness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => ALL_PARTICLES.slice(0, count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.position[0] + Math.sin(time * particle.speed + particle.offset) * 0.5,
        particle.position[1] + Math.cos(time * particle.speed + particle.offset) * 0.5,
        particle.position[2]
      );
      const scale = 0.025 + Math.sin(time + particle.offset) * 0.012;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#93C5FD" transparent opacity={0.45} />
    </instancedMesh>
  );
}

// Subtle, deep perspective grid floor that gently recedes
function GridFloor() {
  return (
    <group position={[0, -5.5, 0]}>
      <gridHelper args={[60, 60, '#312E81', '#0F0F1A']} />
    </group>
  );
}

// Scroll-driven camera journey with responsive portrait/landscape adjustment
function CameraRig() {
  const { viewport } = useThree();
  const mouse = useMousePosition();
  const isPortrait = viewport.width < viewport.height;

  useFrame((state, delta) => {
    const docHeight =
      typeof document !== 'undefined'
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;

    // In portrait, keep camera slightly farther and shift centerpiece so it never blocks text
    const baseDistance = isPortrait ? 12 : 8.5;
    const targetX = (isPortrait ? 0.6 : 1.8) * Math.sin(progress * Math.PI) + mouse.normalizedX * 0.25;
    const targetY = -progress * 4 + mouse.normalizedY * 0.25;
    const targetZ = baseDistance + Math.cos(progress * Math.PI * 1.2) * 1.5;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2);

    state.camera.lookAt(0, -progress * 3.5, 0);
  });

  return null;
}

// Dynamic studio lights with bright, energetic specular highlights
function DynamicLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const docHeight =
      typeof document !== 'undefined'
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const p = docHeight > 0 ? scrollY / docHeight : 0;

    // Shift from electric cyan-blue to luminous violet
    const r = THREE.MathUtils.lerp(0.2, 0.65, Math.sin(p * Math.PI));
    const g = THREE.MathUtils.lerp(0.65, 0.35, Math.sin(p * Math.PI));
    const b = THREE.MathUtils.lerp(1.0, 0.98, Math.sin(p * Math.PI));
    lightRef.current.color.setRGB(r, g, b);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 10, 6]} intensity={1.2} color="#60A5FA" />
      <pointLight ref={lightRef} position={[0, 3, 4]} intensity={2.2} distance={20} />
      <directionalLight position={[-8, -4, -6]} intensity={0.8} color="#C084FC" />
      <fog attach="fog" args={['#07070A', 10, 30]} />
    </>
  );
}

function SceneContent({ particleCount, geometryDetail }: { particleCount: number; geometryDetail: number }) {
  return (
    <>
      <CameraRig />
      <DynamicLighting />
      <Centerpiece detail={geometryDetail} />
      <Particles count={particleCount} />
      <GridFloor />
      <Environment preset="city" />
    </>
  );
}

const emptySubscribe = () => () => {};

export function ThreeCanvas() {
  const tier: QualityTier = useSyncExternalStore(
    emptySubscribe,
    () => detectQualityTier(),
    () => 'medium' as QualityTier
  );

  const [dpr, setDpr] = useState<number>(() => QUALITY_TIERS[tier].dpr);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handler = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const config = QUALITY_TIERS[tier];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%' }}
      frameloop={isVisible ? 'always' : 'never'}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio || 1, 2))}
      >
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
      <SceneContent
        particleCount={config.particles}
        geometryDetail={config.geometryDetail}
      />
    </Canvas>
  );
}
