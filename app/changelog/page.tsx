import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '변경 기록 · Changelog · GoldPath' };

type Entry = {
  date: string;
  title: string;
  bullets: string[];
};

const ENTRIES: Entry[] = [
  {
    date: '2026-05-03',
    title: 'Wave 1 콘텐츠 정합성 스윕',
    bullets: [
      'WhyStrip의 "23×" / "2008년 이후 분기 최고치" 표현을 검증된 수치로 교체.',
      'Footer의 MAS-PSPM 표기를 MinLaw ACD로 정정.',
      '/trust, /about, /why-singapore, /tax 신규 게시.',
      '/faq, /calculator, /heritage 본문 작성.',
      '사이트맵, robots, OG 이미지 게시.',
    ],
  },
  {
    date: '2026-05-03',
    title: '사전 등록 흐름 점검',
    bullets: [
      '/ops/login 무한 리다이렉트 수정.',
      '코호트 카운트 하드코드 제거 → getSignupCount() 도출.',
      '운영 큐 카운트를 배열에서 도출하도록 변경.',
    ],
  },
  {
    date: '2026-05-02',
    title: 'Phase 1 공개',
    bullets: [
      '공개 사이트 14개 라우트 + 회원 포털 8개 + 운영 포털 10개 게시.',
      '가격 오라클 (Stooq + Frankfurter) 가동.',
      '회원 가입 플로우 + 환영 페이지 가동.',
      '테마 시스템 (7 방향) 등록, GP 잠금.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '72px 28px 96px',
        }}
      >
        <header style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              color: 'var(--accent)',
              marginBottom: 18,
            }}
          >
            § CHANGELOG
          </div>
          <h1
            lang="ko"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            변경 기록 · CHANGELOG
          </h1>
          <p
            lang="ko"
            style={{
              fontFamily: 'var(--font-kr)',
              fontSize: 17,
              color: 'var(--ink-2)',
              marginTop: 18,
              lineHeight: 1.6,
            }}
          >
            투명성도 제품의 일부입니다.
          </p>
        </header>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {ENTRIES.map((e, i) => (
            <li
              key={i}
              style={{
                borderTop: i === 0 ? 'none' : '1px solid var(--rule)',
                paddingTop: i === 0 ? 0 : 36,
                paddingBottom: 36,
              }}
            >
              <article>
                <time
                  dateTime={e.date}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    color: 'var(--ink-3)',
                    marginBottom: 10,
                  }}
                >
                  {e.date}
                </time>
                <h2
                  lang="ko"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    fontSize: 26,
                    color: 'var(--ink)',
                    margin: '0 0 18px',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {e.title}
                </h2>
                <ul
                  lang="ko"
                  style={{
                    fontFamily: 'var(--font-krs)',
                    fontSize: 15,
                    color: 'var(--ink-2)',
                    lineHeight: 1.7,
                    paddingLeft: 20,
                    margin: 0,
                  }}
                >
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ marginBottom: 6 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        <p
          lang="ko"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--ink-3)',
            marginTop: 24,
            paddingTop: 24,
            borderTop: '1px solid var(--rule)',
            textTransform: 'uppercase',
          }}
        >
          이 페이지는 수동으로 갱신됩니다. 다음 갱신: Wave 2 완료 후.
        </p>
      </main>
      <Footer />
    </>
  );
}
