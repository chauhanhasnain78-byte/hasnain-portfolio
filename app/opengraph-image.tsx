import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/constants';

export const alt = `${SITE.name} - Portfolio`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '60px',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#92929A',
              fontWeight: 500,
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            {SITE.title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '4px',
                background: '#2F6BFF',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
