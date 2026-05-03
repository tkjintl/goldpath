import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'FAQ · GoldPath' };

type QA = { q: string; en?: string; a: React.ReactNode };

const items: QA[] = [
  {
    q: '정말 금이 있어요?',
    en: 'Is the gold actually there?',
    a: (
      <>
        <p>
          예. 회원의 그램은 싱가포르 Malca-Amit FreePort 금고에
          회원 명의로 배분(allocated) 보관됩니다. Brink&rsquo;s가
          분기마다 감사하며, Lloyd&rsquo;s of London specie 보험으로
          전액 부보됩니다.
        </p>
        <p>
          상세 구조 — <a href="/trust">/trust</a>.
        </p>
      </>
    ),
  },
  {
    q: 'GoldPath이 도산하면 어떻게 되나요?',
    en: 'What if GoldPath goes bankrupt?',
    a: (
      <p>
        회원의 그램은 싱가포르 라이선스 신탁(trustee) 명의로
        분리 보관됩니다 — bankruptcy-remote 구조입니다. GoldPath은
        운영자일 뿐, 자산의 보유자가 아닙니다. 상세 →{' '}
        <a href="/trust">/trust</a>.
      </p>
    ),
  },
  {
    q: '신탁 구조는 무엇인가요?',
    en: 'How is the trust structured?',
    a: (
      <p>
        회원 → SG 라이선스 신탁 → Malca-Amit 금고. 세 단계 모두
        분리되어 있으며, GoldPath은 운영자(operator)이지 자산
        보유자가 아닙니다.
      </p>
    ),
  },
  {
    q: '몇 g부터 인출 가능한가요?',
    en: 'What is the minimum physical withdrawal?',
    a: (
      <p>
        실물 인출은 100g LBMA 굿딜리버리 바 단위로 가능합니다.
        그 미만 잔고는 KRW 환매(T+72h)로 회수할 수 있습니다.
      </p>
    ),
  },
  {
    q: '한국으로 배송 vs KRW 매도 — 차이는?',
    en: 'Ship to Korea vs sell to KRW?',
    a: (
      <p>
        실물 배송 시 회원이 운송비와 관세를 부담합니다. KRW 매도는
        LBMA 픽스에 환매되어 등록 계좌로 입금됩니다. MZ 회원의
        대다수는 매도를 선택합니다.
      </p>
    ),
  },
  {
    q: '5,000명이 마감되면 진짜 끝인가요?',
    en: 'Is the 5,000 cap really hard?',
    a: (
      <p>
        첫 코호트(Founding 5,000)만 마감입니다. 다음 라운드는 새
        픽스에서 시작됩니다 — 같은 가격은 다시 오지 않습니다.
      </p>
    ),
  },
  {
    q: '자동이체가 실패하면 어떻게 되나요?',
    en: 'What if my auto-debit fails?',
    a: (
      <p>
        1차 재시도는 D+3, 2차는 D+7에 진행됩니다. 그 이후에도
        실패하면 일시 중지되며, 통지 후 회원이 직접 갱신해야
        합니다. 멤버십은 종료되지 않습니다.
      </p>
    ),
  },
  {
    q: '세금은 어떻게 되나요?',
    en: 'What about taxes?',
    a: (
      <p>
        일반 안내는 <a href="/tax">/tax</a>를 참고하세요. GoldPath은
        세무 자문이 아닙니다.
      </p>
    ),
  },
  {
    q: '김치 프리미엄이 사라지면요?',
    en: 'What if the kimchi premium collapses?',
    a: (
      <p>
        GoldPath의 가격 우위는 김치 프리미엄이 아닙니다. 싱가포르
        IPM 부가세 면제 + LBMA 직매입 구조에서 발생합니다 —
        프리미엄 변동과 무관하게 한국 소매보다 낮은 가격을
        유지합니다.
      </p>
    ),
  },
  {
    q: '회원이 사망하면 어떻게 되나요?',
    en: 'What happens upon a member&rsquo;s death?',
    a: (
      <p>
        상속자(beneficiary)와 트리거(날짜·연령·이벤트)를 미리
        지정할 수 있습니다. 조건 충족 시 봉인 증서가 자동
        발송됩니다. 상세 → <a href="/heritage">/heritage</a>.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
          color: 'var(--ink)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          § VI · FAQ
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            lineHeight: 1.1,
            margin: '0 0 1rem',
          }}
        >
          질문은 솔직하게.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            lineHeight: 1.7,
            opacity: 0.78,
            marginBottom: '3rem',
          }}
        >
          금이 정말 있는지, 사기가 아닌지, 언제든 매도할 수 있는지 —
          회원이 이미 의심하고 있는 모든 것에 대한 답.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((it, i) => (
            <details
              key={i}
              style={{
                borderTop: '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
                padding: '1.25rem 0',
              }}
            >
              <summary
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '1rem',
                }}
              >
                <span>{it.q}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </summary>
              <div
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  opacity: 0.85,
                }}
              >
                {it.en && (
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      opacity: 0.6,
                      margin: '0 0 0.6rem',
                    }}
                  >
                    {it.en}
                  </p>
                )}
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
