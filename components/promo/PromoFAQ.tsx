const QAS: Array<{ q: string; a: string }> = [
  {
    q: '무료로 그램을 어떻게 줘요?',
    a: '광고비 대신 첫 그램으로 드립니다. 5,000명까지만, 그 이후엔 정가입니다. 12개월 자동이체로 베스팅되며, 정지 시 미베스팅 분만 회수됩니다.',
  },
  {
    q: '약정 강제인가요?',
    a: '아니요. 언제든 정지 가능. 정지 시점까지 베스팅된 파운더스 그램과 본인이 매입한 모든 그램은 회원님 것입니다. 강제 약정 없음.',
  },
  {
    q: '친구 코드는 어디서 받아요?',
    a: '가입 후 대시보드에서 GP-XXXX 형식의 본인 코드가 자동 생성됩니다. 카카오·인스타·문자로 직접 공유하시면 됩니다.',
  },
  {
    q: '5,000명 마감되면요?',
    a: '파운더스 그램은 종료. 등급별 정가 스프레드(2.0% — 1.0%)로 가입 가능하지만, 첫 그램은 더 이상 드리지 않습니다. 같은 가격은 두 번 오지 않습니다.',
  },
  {
    q: '친구 코드 두 개 쓸 수 있어요?',
    a: '한 코드만 적용됩니다. 동일 결제 수단·기기·거주지 자동 감지로 다중 적용은 차단합니다.',
  },
  {
    q: '신용카드로 결제 가능?',
    a: '자동이체는 KFTC CMS 출금이 기본. 일회성 추가 매입은 신용카드 가능하나, 카드 수수료 0.8%가 가산됩니다.',
  },
  {
    q: '환매할 때 크레딧 사라지나요?',
    a: '베스팅된 파운더스 그램은 본인 그램과 동일하게 환매·인출 가능. 미베스팅 분만 회수됩니다. 환매가는 LBMA 픽스 기준.',
  },
];

export function PromoFAQ() {
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § IX · FAQ
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
          질문은 솔직하게.
        </h2>

        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {QAS.map((qa, idx) => (
            <details
              key={idx}
              {...(idx === 0 ? { open: true } : {})}
              style={{
                borderBottom: '1px solid var(--rule)',
                padding: '18px 4px',
              }}
            >
              <summary
                lang="ko"
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 500,
                  fontSize: 17,
                  color: 'var(--ink)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <span>{qa.q}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 16,
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div
                lang="ko"
                style={{
                  marginTop: 14,
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: 'var(--ink-2)',
                }}
              >
                {qa.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
