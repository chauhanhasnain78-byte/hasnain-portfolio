import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { Mail } from 'lucide-react';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './icons';

export interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  platform?: 'github' | 'linkedin' | 'instagram' | 'email';
  icon?: 'github' | 'linkedin' | 'instagram' | 'email';
  url?: string;
  href?: string;
  label?: string;
  ariaLabel?: string;
  external?: boolean;
}

export function SocialLink({
  platform,
  icon,
  url,
  href,
  label,
  ariaLabel,
  external,
  className,
  ...props
}: SocialLinkProps) {
  const targetIcon = platform || icon || 'email';
  const targetUrl = href || url || '#';
  const targetLabel = ariaLabel || label || targetIcon;
  const isExternal = external !== undefined ? external : !targetUrl.startsWith('mailto:');

  const renderIcon = () => {
    switch (targetIcon) {
      case 'github':
        return <GitHubIcon className="w-5 h-5" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5" />;
      case 'linkedin':
        return <LinkedInIcon className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <a
      href={targetUrl}
      aria-label={targetLabel}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] text-[#92929A] hover:text-white hover:bg-white/5 hover:border-white/[0.14] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent min-h-[44px] min-w-[44px]',
        className
      )}
      {...props}
    >
      {renderIcon()}
    </a>
  );
}
