import { requireSession } from '@/lib/auth';
import { PortalSection, PortalCard } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function PortalHeritagePage() {
  await requireSession();
  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 유산 · HERITAGE
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          금은 늘 <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>가장 긴 편지.</em>
        </h1>
      </header>

      <PortalSection eyebrow="§ I · 수혜자 · BENEFICIARIES" title="아직 지정된 수혜자 없음">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 20, maxWidth: 640 }}>
            수혜자를 지정하고 트리거를 설정하면 — 생일, 졸업, 특정 나이, 특정 날짜 — 그날에 금이 자동으로 이전됩니다. 봉인된 증서와 함께. 회원님이 오래 전부터 생각해왔다는 것을, 받는 순간 알 수 있도록.
          </div>
          <button
            disabled
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              background: 'var(--accent)',
              color: 'var(--inv-ink)',
              padding: '12px 20px',
              borderRadius: 2,
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            PHASE 2 · 수혜자 지정 →
          </button>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ II · 트리거 종류" title="언제 전달되나요?">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <TriggerCard label="DATE" title="특정 날짜" body="결혼식, 생일, 졸업식. 그날 자정 (KST) 자동 이전." />
          <TriggerCard label="AGE" title="특정 나이" body="자녀가 18세, 25세, 30세가 되면. 주민번호로 자동 계산." />
          <TriggerCard label="MANUAL" title="직접 신호" body="회원님이 직접 트리거할 때까지 보류. 변동 가능." />
          <TriggerCard label="ESTATE" title="상속" body="법적 상속 절차 검증 후 전달. 한국 상속세는 별도." />
        </div>
      </PortalSection>

      <PortalSection eyebrow="§ III · 증서 · CERTIFICATE" title="수혜자가 받는 것">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, maxWidth: 720 }}>
            서명 · 인장이 찍힌 증서, 아카이벌 페이퍼에 인쇄. 적립 시작일, 그램 무게, 바 시리얼, 회원님이 직접 작성한 비공개 메시지가 봉인되어 함께 전달됩니다. 메시지는 GoldPath 직원이 열람하지 않으며, 수혜자만 그날에 열어볼 수 있습니다.
          </div>
        </PortalCard>
      </PortalSection>
    </>
  );
}

function TriggerCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <PortalCard label={label}>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 24, color: 'var(--ink)', fontWeight: 500, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
        {body}
      </div>
    </PortalCard>
  );
}
