export function PromoDisclosure() {
  return (
    <section
      style={{
        padding: 32,
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          lineHeight: 1.85,
          letterSpacing: '0.04em',
          color: 'var(--ink-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            color: 'var(--accent)',
            letterSpacing: '0.28em',
            fontWeight: 600,
          }}
        >
          공시 · DISCLOSURE
        </div>
        <p lang="ko" style={{ margin: 0 }}>
          파운더스 그램은 한국 세법상 일반 소득(기타소득)으로 분류될 수 있으며,
          12개월 베스팅 완료 시 회원님께 신고 가이드를 송부합니다. 베스팅 미완료 시
          미베스팅 분은 회수되며 과세 사건이 발생하지 않습니다.
        </p>
        <p lang="ko" style={{ margin: 0 }}>
          본 적립 상품은 한국 자본시장법상 금융투자상품이 아닙니다 — 실물 금 정기
          매입 서비스입니다. GoldPath은 싱가포르 MAS Precious Stones and Precious
          Metals (Anti-Money Laundering and Terrorism Financing) Act 등록
          사업자(TACC Pte. Ltd.)이며, 한국 내 별도 등록 절차는 진행 중입니다.
        </p>
        <p lang="ko" style={{ margin: 0 }}>
          금 시세는 변동합니다 — 손실 가능성을 포함합니다. 과거 수익률은 미래
          수익을 보장하지 않습니다. LBMA + 2.0% 매입 가격은 국제 현물가에
          연동되며, 한국 소매가는 김치 프리미엄·VAT를 포함합니다.
        </p>
      </div>
    </section>
  );
}
