import { requireSession } from '@/lib/auth';
import { buildAccount } from "@/lib/demo";
import { PortalSection, PortalCard } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await requireSession();
  const acct = await buildAccount(session.email);

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 설정 · SETTINGS
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          회원 설정.
        </h1>
      </header>

      <PortalSection eyebrow="§ I · 프로필" title="기본 정보">
        <PortalCard>
          <Field label="이름 · NAME" value={session.name} />
          <Field label="이메일 · EMAIL" value={session.email} />
          <Field label="파운더 번호 · FOUNDER" value={`#${acct.founderNumber.toLocaleString()} / 5,000`} />
          <Field label="가입일 · JOINED" value={acct.joinDate} />
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ II · KYC · 본인인증" title="신원 확인 상태">
        <PortalCard>
          <Field label="KFTC 본인인증" value="확인 완료" status="ok" />
          <Field label="여권" value="확인 완료" status="ok" />
          <Field label="자금 출처 · SOURCE OF FUNDS" value="해당 없음 — 등급 한도 내" status="info" />
          <Field label="EDD" value="해당 없음" status="info" />
          <div style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-3)' }}>
            소브린 (V) 등급 가입 또는 누적 ₩100M 초과 시 자금 출처 추가 검증이 자동 발동됩니다.
          </div>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ III · 보안" title="MFA · Passkey">
        <PortalCard>
          <Field label="2단계 인증 · MFA" value="비활성 — Phase 2" status="warn" />
          <Field label="패스키 · PASSKEY" value="비활성 — Phase 2" status="warn" />
          <Field label="이메일 알림" value="활성" status="ok" />
          <Field label="카카오 알림톡" value="비활성 — 가입 시 등록" status="info" />
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ IV · 알림" title="언제 연락드릴지">
        <PortalCard>
          <Field label="자동이체 직전 알림" value="3일 전 · 1일 전" status="ok" />
          <Field label="매입 체결 알림" value="활성 — 이메일" status="ok" />
          <Field label="분기별 감사 보고서" value="활성 — 이메일" status="ok" />
          <Field label="마케팅 이메일" value="비활성" status="info" />
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ V · 계정 종료" title="구독 일시정지 · 종료">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 18 }}>
            구독은 언제든 일시정지 또는 종료 가능합니다. 종료 시 보유 그램은 그대로 유지되며, 매도 또는 실물 인출이 가능합니다. 12개월 이전 종료 시 미베스팅 파운더스 크레딧은 자동 차감됩니다.
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button disabled style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              border: '1px solid var(--rule-strong)', color: 'var(--ink)', padding: '10px 18px',
              borderRadius: 2, opacity: 0.5, cursor: 'not-allowed',
            }}>일시정지</button>
            <button disabled style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              border: '1px solid var(--red)', color: 'var(--red)', padding: '10px 18px',
              borderRadius: 2, opacity: 0.5, cursor: 'not-allowed',
            }}>구독 종료</button>
          </div>
        </PortalCard>
      </PortalSection>
    </>
  );
}

function Field({ label, value, status }: { label: string; value: string; status?: 'ok' | 'warn' | 'info' }) {
  const color =
    status === 'ok' ? 'var(--green)' :
    status === 'warn' ? 'var(--accent-dim)' :
    'var(--ink-2)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '14px 0', borderBottom: '1px dashed var(--rule)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', alignSelf: 'center' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color, alignSelf: 'center' }}>
        {value}
      </div>
    </div>
  );
}
