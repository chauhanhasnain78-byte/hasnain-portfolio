'use client';

// CSS gradient fallback background.
// This sits beneath the 3D canvas. If WebGL loads, the canvas covers it.
// If WebGL fails, this provides a beautiful dark gradient scene.

export function Background() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#050505]" aria-hidden="true">
      {/* Soft gradient glow — electric blue */}
      <div
        className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw] opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, #2F6BFF 0%, transparent 50%)',
        }}
      />
      {/* Soft gradient glow — violet */}
      <div
        className="absolute w-[120vw] h-[120vh] -bottom-[10vh] -right-[10vw] opacity-[0.03]"
        style={{
          background: 'radial-gradient(ellipse at 70% 70%, #7C5CFF 0%, transparent 50%)',
        }}
      />
    </div>
  );
}

export default Background;
