'use client';

// Scroll-driven camera rig.
// Reads from the shared scroll-progress store.
// Camera moves forward, rotates, and shifts per section.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getScrollProgress } from '@/lib/store/scroll';

interface CameraRigProps {
  isMobile: boolean;
}

interface Keyframe {
  progress: number;
  pos: readonly [number, number, number];
  look: readonly [number, number, number];
}

// Define camera keyframes at different scroll positions
const KEYFRAMES: readonly Keyframe[] = [
  { progress: 0,    pos: [0, 0, 8],     look: [0, 0, 0]    },  // Hero
  { progress: 0.15, pos: [0, 0.5, 10],  look: [0, 0, 0]    },  // About
  { progress: 0.3,  pos: [2, 0, 12],    look: [0, 0, 2]    },  // Work
  { progress: 0.5,  pos: [-1, 1, 14],   look: [0, 0, 4]    },  // Skills
  { progress: 0.65, pos: [0, 0.5, 16],  look: [0, 0, 6]    },  // Education
  { progress: 0.8,  pos: [1, 0, 18],    look: [0, 0, 8]    },  // Resume
  { progress: 1,    pos: [0, 0, 20],    look: [0, 0, 10]   },  // Contact
];

function lerpKeyframes(
  progress: number,
  keyframes: readonly Keyframe[]
): { pos: [number, number, number]; look: [number, number, number] } {
  // Find the two keyframes to interpolate between
  let from: Keyframe = keyframes[0];
  let to: Keyframe = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (progress >= keyframes[i].progress && progress <= keyframes[i + 1].progress) {
      from = keyframes[i];
      to = keyframes[i + 1];
      break;
    }
  }

  const range = to.progress - from.progress;
  const t = range === 0 ? 0 : (progress - from.progress) / range;
  // Smooth easing
  const eased = t * t * (3 - 2 * t); // smoothstep

  return {
    pos: [
      THREE.MathUtils.lerp(from.pos[0], to.pos[0], eased),
      THREE.MathUtils.lerp(from.pos[1], to.pos[1], eased),
      THREE.MathUtils.lerp(from.pos[2], to.pos[2], eased),
    ],
    look: [
      THREE.MathUtils.lerp(from.look[0], to.look[0], eased),
      THREE.MathUtils.lerp(from.look[1], to.look[1], eased),
      THREE.MathUtils.lerp(from.look[2], to.look[2], eased),
    ],
  };
}

export default function CameraRig({ isMobile }: CameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 8));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const progress = getScrollProgress();

    if (isMobile) {
      // On mobile, only subtle camera drift, no full journey
      camera.position.set(0, Math.sin(progress * Math.PI) * 0.3, 8);
      camera.lookAt(0, 0, 0);
      return;
    }

    const { pos, look } = lerpKeyframes(progress, KEYFRAMES);

    // Smooth interpolation to target (prevents jitter)
    currentPos.current.lerp(
      new THREE.Vector3(pos[0], pos[1], pos[2]),
      0.05
    );
    targetLook.current.set(look[0], look[1], look[2]);
    currentLook.current.lerp(targetLook.current, 0.05);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
