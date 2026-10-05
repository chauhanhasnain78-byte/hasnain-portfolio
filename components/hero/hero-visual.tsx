import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface HeroVisualProps {
  children: ReactNode;
  className?: string;
}

export function HeroVisual({ children, className }: HeroVisualProps) {
  return (
    <div className={cn('relative w-full max-w-[400px]', className)}>
      {/* Decorative frames */}
      <div className="absolute -inset-4 rounded-3xl border border-white/[0.06]" />
      <div className="absolute -inset-8 rounded-[2rem] border border-white/[0.06] hidden md:block" />
      
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 -z-10 rounded-2xl opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(47,107,255,0.05)_0%,transparent_50%)] blur-3xl" />

      {/* Content (Profile Photo) */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
