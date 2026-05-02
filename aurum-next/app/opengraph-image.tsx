import { ImageResponse } from 'next/og';

// Open Graph card — system fonts only (no Google Fonts fetch).
// Dark background, gold "Au" mark, AURUM wordmark, tagline + mono footer.

export const runtime = 'nodejs';
export const alt = 'Aurum — Quietly compounds. Permanently stays.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 88px',
          position: 'relative',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* subtle gold border frame */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: '1px solid rgba(197,165,114,0.18)',
            display: 'flex',
          }}
        />

        {/* top mono row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'ui-monospace, "Courier New", monospace',
            fontSize: 16,
            color: '#8a7d6b',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
          }}
        >
          <span>Est. MMXXVI</span>
          <span>Singapore</span>
        </div>

        {/* center block */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                border: '1px solid rgba(197,165,114,0.5)',
                background:
                  'linear-gradient(135deg, rgba(197,165,114,0.12), rgba(197,165,114,0.02))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontStyle: 'italic',
                fontSize: 56,
                color: '#C5A572',
                lineHeight: 1,
              }}
            >
              Au
            </div>
            <div
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 76,
                fontWeight: 700,
                color: '#e8e3d8',
                letterSpacing: '0.04em',
                display: 'flex',
              }}
            >
              AURUM
            </div>
          </div>

          <div
            style={{
              fontStyle: 'italic',
              fontSize: 64,
              color: '#e8e3d8',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            Quietly compounds.
          </div>
          <div
            style={{
              fontStyle: 'italic',
              fontSize: 64,
              color: '#C5A572',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            Permanently stays.
          </div>
        </div>

        {/* bottom mono row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'ui-monospace, "Courier New", monospace',
            fontSize: 14,
            color: '#8a7d6b',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
          }}
        >
          <span>MMXXVI · Singapore</span>
          <span>Allocated · Insured · Heritage</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
