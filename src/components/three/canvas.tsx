'use client';

import { useRef, useMemo, useEffect, useState, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
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
        (r1 - 0.5) * 22,
        (r2 - 0.5) * 22,
        (r3 - 0.5) * 22,
      ],
      speed: r4 * 0.4 + 0.1,
      offset: r5 * Math.PI * 2,
    });
  }
  return list;
}

const ALL_PARTICLES = createParticleData(500);

function Centerpiece({ detail = 32 }: { detail?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.normalizedY * 0.35,
      delta * 2
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.normalizedX * 0.35,
      delta * 2
    );
    meshRef.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, detail > 32 ? 4 : 2]} />
        <MeshDistortMaterial
          color="#121224"
          roughness={0.12}
          metalness={0.92}
          distort={0.32}
          speed={1.6}
          envMapIntensity={1.8}
        />
      </mesh>
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
      const scale = 0.02 + Math.sin(time + particle.offset) * 0.01;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#F5F5F5" transparent opacity={0.25} />
    </instancedMesh>
  );
}

// Perspective grid floor fading into distance fog
function GridFloor() {
  return (
    <group position={[0, -4.5, 0]}>
      <gridHelper args={[40, 40, '#2563EB', '#121217']} />
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

    // Responsive camera distance: farther in portrait so the centerpiece is never cut off
    const baseDistance = isPortrait ? 11 : 8;
    const targetX = Math.sin(progress * Math.PI) * 1.5 + mouse.normalizedX * 0.3;
    const targetY = -progress * 3.5 + mouse.normalizedY * 0.3;
    const targetZ = baseDistance + Math.cos(progress * Math.PI * 1.5) * 1.8;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2);

    state.camera.lookAt(0, -progress * 3, 0);
  });

  return null;
}

// Lights shift color per section journey
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

    // Shift from electric blue to soft violet as visitor scrolls down
    const r = THREE.MathUtils.lerp(0.23, 0.55, Math.sin(p * Math.PI));
    const g = THREE.MathUtils.lerp(0.51, 0.36, Math.sin(p * Math.PI));
    const b = THREE.MathUtils.lerp(0.96, 0.96, Math.sin(p * Math.PI));
    lightRef.current.color.setRGB(r, g, b);
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 8, 5]} intensity={0.35} color="#3B82F6" />
      <pointLight ref={lightRef} position={[0, 2, 4]} intensity={1.8} distance={16} />
      <directionalLight position={[-6, -4, -5]} intensity={0.2} color="#8B5CF6" />
      <fog attach="fog" args={['#050505', 8, 25]} />
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
      <Environment preset="night" />
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
