'use client';

import { useScrollProgress } from '@/hooks/use-scroll-progress';

export function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
