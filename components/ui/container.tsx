import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto px-5 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}
