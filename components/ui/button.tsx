import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  download?: boolean | string;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  href, 
  external, 
  download,
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#2F6BFF] text-white hover:bg-[#2F6BFF]/90",
    secondary: "border border-white/10 bg-transparent text-[#92929A] hover:text-white hover:bg-white/5",
    ghost: "bg-transparent text-[#92929A] hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a
        href={href}
        download={download}
        className={classes}
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
