import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Transpile three.js packages
  transpilePackages: ['three'],
};

export default nextConfig;
