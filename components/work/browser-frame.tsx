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
    <Tilt maxTilt={7} className="w-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live website, opens in a new tab`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-surface shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(47,107,255,0.12)] transition-all duration-500 hover:border-white/[0.2] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(47,107,255,0.22)]"
        data-cursor="view"
      >
        {/* Specular glass reflection overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Browser Chrome */}
        <div className="relative z-10 flex h-11 w-full items-center gap-2 border-b border-white/[0.06] bg-surface-elevated/70 backdrop-blur-md px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-[#FF5F56]/80 transition-colors group-hover:bg-[#FF5F56]" />
            <div className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 transition-colors group-hover:bg-[#FFBD2E]" />
            <div className="h-3 w-3 rounded-full bg-[#27C93F]/80 transition-colors group-hover:bg-[#27C93F]" />
          </div>
          <div className="mx-auto flex h-6 max-w-[65%] items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.05] px-4 text-[10px] sm:text-xs text-text-secondary/80 font-mono truncate">
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
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center bg-gradient-to-b from-surface/50 to-bg">
              <h4 className="text-3xl font-bold tracking-tight text-text md:text-5xl uppercase">
                {title}
              </h4>
              <p className="text-lg text-text-secondary">
                AI-Powered CV Builder
              </p>
              <span className="mt-4 rounded-full bg-accent/15 border border-accent/30 px-5 py-2 text-sm font-medium text-accent shadow-[0_0_20px_rgba(47,107,255,0.2)]">
                Create your CV
              </span>
            </div>
          )}
        </div>
      </a>
    </Tilt>
  );
}
