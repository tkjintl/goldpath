import { ShareCardMockup } from './ShareCardMockup';

export function ReferralBlock() {
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § III · 친구 · REFERRAL
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 48px',
            color: 'var(--ink)',
          }}
        >
          같이 모으면, 둘 다{' '}
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>0.23g</span>.
        </h2>

        <div
          className="gp-referral-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Step
              n={1}
              title="당신의 코드를 친구에게."
              illustration={<ChatBubble />}
            />
            <Step
              n={2}
              title="친구가 첫 자동이체 완료."
              illustration={<CalendarIcon />}
            />
            <Step
              n={3}
              title="둘 다 0.23g 적립."
              illustration={<TwoCoins />}
            />
          </div>

          <ShareCardMockup variant="referral" showHeading={false} />
        </div>

        <div
          lang="ko"
          style={{
            marginTop: 56,
            border: '1px solid var(--rule)',
            padding: '24px 28px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12.5,
            lineHeight: 1.85,
            color: 'var(--ink-2)',
            letterSpacing: '0.04em',
            background: 'color-mix(in srgb, var(--accent) 4%, var(--bg))',
          }}
        >
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
            1단계만. 친구의 친구는 적용되지 않습니다.
          </strong>{' '}
          동일 결제 수단·동일 기기·동일 거주지 자동 감지. 가입 후 30일 내 첫 자동이체
          미실행 시 양쪽 적립 회수. 한 회원당 최대 10명. 이걸 다단계라고 부르고
          싶지 않아서, 1단계만 합니다.
        </div>

        <style>{`
          @media (max-width: 800px) {
            .gp-referral-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  illustration,
}: {
  n: number;
  title: string;
  illustration: React.ReactNode;
}) {
  return (
    <div
      className="gp-card-lift"
      style={{
        display: 'flex',
        gap: 18,
        alignItems: 'center',
        border: '1px solid var(--rule)',
        padding: '20px 22px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 36,
          color: 'var(--accent)',
          minWidth: 32,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div
          lang="ko"
          style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 600,
            fontSize: 16,
            color: 'var(--ink)',
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{illustration}</div>
    </div>
  );
}

function ChatBubble() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'color-mix(in srgb, var(--accent) 14%, var(--bg))',
        border: '1px solid var(--accent)',
        borderRadius: 12,
        padding: '8px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.18em',
        color: 'var(--accent)',
      }}
    >
      GP-XXXX
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect
        x="6"
        y="10"
        width="32"
        height="28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <line x1="6" y1="18" x2="38" y2="18" stroke="var(--accent)" strokeWidth="1.2" />
      <line x1="14" y1="6" x2="14" y2="14" stroke="var(--accent)" strokeWidth="1.2" />
      <line x1="30" y1="6" x2="30" y2="14" stroke="var(--accent)" strokeWidth="1.2" />
      <circle cx="22" cy="28" r="3" fill="var(--accent)" />
    </svg>
  );
}

function TwoCoins() {
  return (
    <svg width="56" height="44" viewBox="0 0 56 44" aria-hidden="true">
      <circle cx="18" cy="22" r="14" fill="var(--accent-bright)" stroke="var(--accent)" />
      <circle cx="18" cy="22" r="9" fill="none" stroke="var(--inv-ink)" opacity="0.4" />
      <circle cx="38" cy="22" r="14" fill="var(--accent)" stroke="var(--accent-dim)" />
      <circle cx="38" cy="22" r="9" fill="none" stroke="var(--inv-ink)" opacity="0.4" />
    </svg>
  );
}
