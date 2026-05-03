import { requireSession } from '@/lib/auth';
import { buildAccount } from "@/lib/demo";
import { fmtKRW } from '@/lib/pricing';
import { PortalSection, PortalCard, StatBig } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function ReferralsPage() {
  const session = await requireSession();
  const acct = await buildAccount(session.email);

  // Demo referral state
  const referralLink = `goldpath.kr/r/${acct.founderNumber}`;
  const referralsJoined = (acct.streakMonths * 3) % 23;
  const referralCreditKRW = referralsJoined * 50_000;

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 추천 · REFERRALS
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          혼자 쌓는 게 <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>아닙니다.</em>
        </h1>
      </header>

      <PortalSection eyebrow="§ I · 추천 링크" title="회원님 전용 링크">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(20px, 2.4vw, 28px)', color: 'var(--ink)', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--rule-strong)', marginBottom: 16, letterSpacing: '0.04em' }}>
            {referralLink}
          </div>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            추천된 친구가 가입하면 첫 자동이체 즉시 회원님 계정에 <strong style={{ color: 'var(--accent)' }}>₩50K 크레딧</strong>이 적립됩니다. 친구는 등급별 파운더스 기프트를 그대로 받습니다. 추천 한도 없음.
          </div>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ II · 진행 상황" title="누적 추천 + 크레딧">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <PortalCard label="추천 가입자">
            <StatBig value={referralsJoined.toString()} hint="누적 합류" />
          </PortalCard>
          <PortalCard label="추천 크레딧">
            <StatBig value={fmtKRW(referralCreditKRW)} hint="원화 기준 적립" />
          </PortalCard>
          <PortalCard label="이번 달 신규">
            <StatBig value={Math.min(3, referralsJoined).toString()} hint="활성 자동이체" />
          </PortalCard>
        </div>
      </PortalSection>

      <PortalSection eyebrow="§ III · 추천 트리 · 무한 단계 X" title="직접 추천만 인정">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, maxWidth: 720 }}>
            GoldPath의 추천 보상은 회원님이 직접 추천한 1단계 가입자에 한합니다. 다단계 마케팅 (MLM) 구조가 아닙니다. 한국 방문판매법상 다단계 등록 의무 발생을 회피하기 위한 의도적 설계입니다.
          </div>
        </PortalCard>
      </PortalSection>
    </>
  );
}
