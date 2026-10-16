import { ImageResponse } from 'next/og';


export const alt = 'Chauhan Mohammed Hasnain — Computer Science Student & Web Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #050505, #0A0A0C, #101013)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#F5F5F5',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          CHAUHAN MOHAMMED HASNAIN
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#92929A',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Computer Science Student & Web Developer
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            fontSize: '24px',
            color: '#62626B',
          }}
        >
          HASNAIN.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            color: '#62626B',
          }}
        >
          Mumbai, India
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
