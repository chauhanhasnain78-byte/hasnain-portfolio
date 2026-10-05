'use client';

export function Background() {
  const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]" aria-hidden="true">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Soft Radial Gradient Glow */}
      <div
        className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw] opacity-[0.06] transition-opacity md:motion-safe:animate-drift motion-reduce:animate-none"
        style={{
          background: 'radial-gradient(circle at center, #2F6BFF 0%, transparent 40%)',
        }}
      />

      {/* Grain / Noise Texture (Hidden on mobile and simplified) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay hidden md:block"
        style={{
          backgroundImage: `url("${noiseSvg}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />
    </div>
  );
}

export default Background;
