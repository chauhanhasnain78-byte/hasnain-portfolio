import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-surface border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-[3px]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
