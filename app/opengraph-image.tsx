import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GoldPath — Singapore-vaulted physical gold for Korean retail';

export default async function OpenGraphImage() {
  const cream = '#F5EEDC';
  const gold = '#A67C3F';
  const ink = '#1F1A14';
  const ink2 = 'rgba(31, 26, 20, 0.66)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: cream,
          color: ink,
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 18,
            letterSpacing: '0.32em',
            color: gold,
            textTransform: 'uppercase',
          }}
        >
          TACC · GOLDPATH
        </div>

        {/* Centered display */}
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
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 168,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: ink,
            }}
          >
            매달 한 그램.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 32,
              lineHeight: 1.3,
              color: ink2,
              maxWidth: 980,
            }}
          >
            Singapore-vaulted physical gold for Korean retail.
          </div>
        </div>

        {/* Brass rule */}
        <div
          style={{
            display: 'flex',
            height: 2,
            background: gold,
            opacity: 0.5,
            marginBottom: 20,
          }}
        />

        {/* Bottom strip */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 16,
            letterSpacing: '0.22em',
            color: ink2,
            textTransform: 'uppercase',
          }}
        >
          MALCA-AMIT SGP · LLOYD&apos;S · BRINK&apos;S · MinLaw PSPM 2019
        </div>
      </div>
    ),
    { ...size },
  );
}
