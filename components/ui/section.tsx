import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  ariaLabelledBy?: string;
  'aria-labelledby'?: string;
}

export function Section({
  className,
  children,
  id,
  ariaLabelledBy,
  'aria-labelledby': ariaLabelledByAttr,
  ...props
}: SectionProps) {
  return (
    <section 
      id={id} 
      aria-labelledby={ariaLabelledBy || ariaLabelledByAttr}
      className={cn("py-24 md:py-32", className)} 
      {...props}
    >
      {children}
    </section>
  );
}
