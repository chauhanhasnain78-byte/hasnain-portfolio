'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/motion/cursor'), {
  ssr: false,
});

export default function CursorWrapper() {
  return <CustomCursor />;
}
