'use client';

import Image from 'next/image';
import { Tilt } from '@/components/motion/tilt';

interface BrowserFrameProps {
  href: string;
  previewImage?: string;
  title: string;
}

export function BrowserFrame({ href, previewImage, title }: BrowserFrameProps) {
  return (
    <Tilt className="w-full transition-transform duration-300 hover:scale-[1.02]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live website, opens in a new tab`}
        className="block w-full overflow-hidden rounded-xl border border-white/[0.08] bg-surface shadow-2xl transition-all"
        data-cursor="view"
      >
        {/* Browser Chrome */}
        <div className="flex h-10 w-full items-center gap-2 border-b border-white/[0.04] bg-white/[0.02] px-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="mx-auto flex h-6 max-w-[60%] items-center justify-center rounded-md bg-white/[0.05] px-3 text-[10px] sm:text-xs text-text-secondary/70 truncate">
            {href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative aspect-[16/10] w-full bg-[#050505]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`${title} preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
              <h4 className="text-3xl font-bold tracking-tight text-text md:text-5xl uppercase">
                {title}
              </h4>
              <p className="text-lg text-text-secondary">
                AI-Powered CV Builder
              </p>
              <span className="mt-4 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                Create your CV
              </span>
            </div>
          )}
        </div>
      </a>
    </Tilt>
  );
}
