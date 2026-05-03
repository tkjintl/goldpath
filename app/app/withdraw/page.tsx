import { requireSession } from '@/lib/auth';
import { buildAccount } from "@/lib/demo";
import { getPriceSnapshot, fmtKRW } from '@/lib/pricing';
import { PortalSection, PortalCard } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function WithdrawPage() {
  const session = await requireSession();
  const acct = await buildAccount(session.email);
  const price = await getPriceSnapshot();
  const krwValue = Math.round(acct.gramsOwned * price.aurumKrwPerGram);

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 인출 · WITHDRAW
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          항상 <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>회원님의 금.</em>
        </h1>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-3)', marginTop: 8 }}>
          현재 보유: {acct.gramsOwned.toFixed(3)}g · {fmtKRW(krwValue)}
        </div>
      </header>

      <PortalSection eyebrow="§ I · 매도 · SELL-BACK" title="원화로 매도, 72시간 입금">
        <PortalCard>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 24 }}>
            <Stat label="현재 매수가" value={fmtKRW(price.aurumKrwPerGram) + ' /g'} />
            <Stat label="매도 스프레드" value="50 bps" hint="LBMA 픽스 − 0.5%" />
            <Stat label="입금 통화" value="KRW" hint="국내 본인 명의 계좌" />
            <Stat label="처리 시간" value="72시간" hint="라이선스 신탁 거쳐서" />
          </div>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 20, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
            매도는 다음 LBMA 픽스에 체결되며, 체결가가 확정되면 회원님 본인 명의 계좌로 송금됩니다. 부분 매도 가능. 약정 없음.
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
            PHASE 2 · 매도 신청 →
          </button>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ II · 실물 인출 · PHYSICAL" title="바 인출 · 싱가포르 또는 배송">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <BarOption weight="100g" label="100g 바" desc="가장 권장. 정련소 직출고. 싱가포르 수령 또는 Malca-Amit 배송." enabled={acct.gramsOwned >= 100} />
          <BarOption weight="1kg" label="1kg 바" desc="기관급 표준. 가장 낮은 단위 프리미엄. 싱가포르 또는 배송." enabled={acct.gramsOwned >= 1000} />
          <BarOption weight="10g" label="10g 바" desc="작은 단위. 키네바 가공비 별도." enabled={acct.gramsOwned >= 10} />
          <BarOption weight="1g" label="1g 바" desc="기념용. 가공비가 가격 대비 높음." enabled={acct.gramsOwned >= 1} caution />
        </div>
        <div style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-3)' }}>
          한국 배송 시 인천 통관 + 부가세 10% 발생. 회원님이 수입자로 등록됩니다.
        </div>
      </PortalSection>

      <PortalSection eyebrow="§ III · 유산 전달 · HERITAGE TRANSFER" title="다른 사람에게 전달">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 18 }}>
            금을 인출하지 않고 수혜자 계정으로 직접 이전합니다. 봉인된 증서가 함께 발급됩니다. 한국 증여세 신고는 회원님 책임.
          </div>
          <a
            href="/app/heritage"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--accent)',
              borderBottom: '1px solid var(--accent)',
            }}
          >
            유산 페이지로 →
          </a>
        </PortalCard>
      </PortalSection>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 32, color: 'var(--ink)', fontWeight: 500, lineHeight: 1 }}>{value}</div>
      {hint && <div style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

function BarOption({ weight, label, desc, enabled, caution }: { weight: string; label: string; desc: string; enabled: boolean; caution?: boolean }) {
  return (
    <div style={{
      background: 'var(--bg)',
      border: `1px solid ${enabled ? 'var(--rule-strong)' : 'var(--rule)'}`,
      padding: 22,
      opacity: enabled ? 1 : 0.5,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: caution ? 'var(--red)' : 'var(--accent)', marginBottom: 8 }}>
        {weight} {caution ? '· 비효율' : ''}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, color: 'var(--ink)', fontWeight: 500, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 14 }}>
        {desc}
      </div>
      {!enabled && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-3)' }}>
          잔액 부족
        </div>
      )}
    </div>
  );
}
