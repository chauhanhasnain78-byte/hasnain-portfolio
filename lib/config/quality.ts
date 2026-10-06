// lib/config/quality.ts
// Single config file to tune 3D quality up or down.
// Change these values to adjust performance vs visual fidelity.

export const QUALITY = {
  // Device pixel ratio cap (higher = sharper but more GPU load)
  maxDpr: 2,
  minDpr: 1,

  // Particles
  particles: {
    desktop: 800,
    mobile: 200,
    reducedMotion: 0,
  },

  // Hero 3D shape
  heroShape: {
    desktopDetail: 128,  // icosahedron detail segments
    mobileDetail: 64,
    rotationSpeed: 0.15,
  },

  // Post-processing
  bloom: {
    enabled: true,
    intensity: 0.4,
    luminanceThreshold: 0.8,
    luminanceSmoothing: 0.9,
  },

  // Camera journey
  camera: {
    fov: 45,
    near: 0.1,
    far: 200,
    smoothFactor: 0.05,
  },

  // Floating browser (work section)
  floatingBrowser: {
    tiltRange: 8,  // degrees max tilt toward cursor
    floatAmplitude: 0.15,
    floatSpeed: 1.5,
  },

  // Skills depth layers
  skills: {
    depthRange: 2,       // z-distance spread
    cursorInfluence: 0.3, // how much cursor pushes pills
  },

  // Scroll
  lenis: {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  },

  // Mobile detection threshold (width in px)
  mobileBreakpoint: 768,

  // Performance monitor thresholds
  performance: {
    // If average FPS drops below this, degrade quality
    degradeThreshold: 45,
    // If average FPS rises above this, restore quality
    restoreThreshold: 55,
  },
} as const;

export type QualityConfig = typeof QUALITY;
