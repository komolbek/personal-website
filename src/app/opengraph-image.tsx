import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Necto Automations - IT Solutions & Software Development';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 16,
              display: 'flex',
            }}
          >
            Necto Automations
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
              marginBottom: 40,
              display: 'flex',
            }}
          >
            IT Solutions & Software Development
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['CRM Systems', 'Web & Mobile', 'AI Integration', 'Business Automation'].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 18,
                    background: 'rgba(99, 102, 241, 0.1)',
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 40,
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            necto.uz — Tashkent, Uzbekistan
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
