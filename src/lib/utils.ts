// Simple className merger without clsx dependency
export type ClassValue = string | number | boolean | undefined | null;

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Check if we're on the client
export const isClient = typeof window !== 'undefined';

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (!isClient) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check if device has fine pointer (mouse)
export function hasFinePointer(): boolean {
  if (!isClient) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// Check for WebGL support
export function supportsWebGL(): boolean {
  if (!isClient) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Detect quality tier based on device capabilities
export function detectQualityTier(): 'high' | 'medium' | 'low' {
  if (!isClient) return 'medium';
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency || 4;
  // Check device memory (Chrome only)
  const memory = (navigator as unknown as Record<string, unknown>).deviceMemory as number | undefined;
  
  if (isMobile || cores <= 2 || (memory && memory <= 2)) {
    return 'low';
  }
  
  if (cores >= 8 && (!memory || memory >= 8)) {
    return 'high';
  }
  
  return 'medium';
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

// Lerp
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// Map a value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
