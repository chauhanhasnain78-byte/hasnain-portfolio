export const COLORS = {
  base: '#050505',
  surface: {
    1: '#0A0A0C',
    2: '#101013',
    3: '#151519',
  },
  text: {
    primary: '#F5F5F5',
    secondary: '#92929A',
    muted: '#62626B',
  },
  accent: {
    blue: '#3B82F6',
    violet: '#8B5CF6',
    blueGlow: 'rgba(59, 130, 246, 0.15)',
    violetGlow: 'rgba(139, 92, 246, 0.15)',
  },
  border: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.1)',
} as const;

export const FONT_SIZES = {
  // clamp(min, preferred, max)
  heroName: 'clamp(2.5rem, 8vw, 8rem)',
  heroNameMobile: 'clamp(2rem, 10vw, 3.5rem)',
  sectionHeading: 'clamp(2rem, 5vw, 4rem)',
  cardTitle: 'clamp(1.25rem, 2.5vw, 1.75rem)',
  body: 'clamp(0.938rem, 1.2vw, 1.125rem)',
  small: 'clamp(0.75rem, 1vw, 0.875rem)',
  eyebrow: 'clamp(0.688rem, 1vw, 0.813rem)',
} as const;

export const SPACING = {
  sectionPadding: 'clamp(4rem, 10vh, 8rem)',
  containerMaxWidth: '1280px',
  containerPadding: 'clamp(1rem, 4vw, 2rem)',
  navHeight: '4rem',
} as const;

export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  smoothOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 100, damping: 20 },
  springFast: { type: 'spring' as const, stiffness: 300, damping: 30 },
} as const;

export const BREAKPOINTS = {
  xs: 360,
  sm: 480,
  md: 640,
  tablet: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1920,
} as const;

export const QUALITY_TIERS = {
  high: {
    dpr: 2,
    particles: 500,
    postProcessing: true,
    geometryDetail: 64,
  },
  medium: {
    dpr: 1.5,
    particles: 200,
    postProcessing: true,
    geometryDetail: 32,
  },
  low: {
    dpr: 1,
    particles: 80,
    postProcessing: false,
    geometryDetail: 16,
  },
} as const;

export type QualityTier = keyof typeof QUALITY_TIERS;
