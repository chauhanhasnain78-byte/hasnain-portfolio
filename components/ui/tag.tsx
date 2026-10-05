import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type TagProps = React.HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, children, ...props }: TagProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-xs rounded-full bg-white/[0.05] border border-white/[0.08] text-text-secondary font-medium tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
