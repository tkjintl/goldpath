import Link from 'next/link';
import { requireSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ founder?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const founderNumber = sp.founder ? parseInt(sp.founder, 10) : null;

  return (
    <>
      <header style={{ marginBottom: 40, textAlign: 'center', paddingTop: 24 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          {founderNumber ? `파운더 #${founderNumber.toLocaleString()} / 5,000` : '환영합니다'}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          환영합니다,{' '}
          <em
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--accent)',
              fontWeight: 400,
            }}
          >
            {session.name}.
          </em>
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'var(--ink-2)',
            maxWidth: 540,
            margin: '0 auto',
          }}
        >
          파운더스 코호트 합류가 완료되었습니다.
          <br />이제 다음 단계로.
        </div>
      </header>

      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          background: 'var(--bg-2)',
          border: '1px solid var(--rule)',
          padding: 32,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          체크리스트 · ONBOARDING
        </div>

        <Step
          n="01"
          status="done"
          title="파운더스 코호트 합류"
          desc="등급 선택, 본인 정보 등록 완료."
        />

        <Step
          n="02"
          status="next"
          title="본인인증 · KYC"
          desc="신분증, 주소, 자금 출처 (소브린 등급). 5분 소요. Persona 연동 — Phase 2."
          cta={{ label: 'Phase 2 · 곧 공개', href: '/app/settings' }}
        />

        <Step
          n="03"
          status="locked"
          title="자동이체 등록"
          desc="토스페이먼츠 CMS로 연결. KYC 완료 후 다음 결제일에 첫 매입."
        />

        <Step
          n="04"
          status="optional"
          title="유산 수혜자 지정 · OPTIONAL"
          desc="자녀, 배우자, 손자녀에게 미래 전달 — 트리거 설정."
          cta={{ label: '유산 페이지로 →', href: '/app/heritage' }}
        />
      </section>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link
          href="/app"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--inv-ink)',
            padding: '16px 28px',
            fontFamily: 'var(--font-kr)',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.06em',
            borderRadius: 2,
          }}
        >
          대시보드로 →
        </Link>
      </div>
    </>
  );
}

function Step({
  n,
  status,
  title,
  desc,
  cta,
}: {
  n: string;
  status: 'done' | 'next' | 'locked' | 'optional';
  title: string;
  desc: string;
  cta?: { label: string; href: string };
}) {
  const colors = {
    done: { fg: 'var(--green)', icon: '✓' },
    next: { fg: 'var(--accent)', icon: '→' },
    locked: { fg: 'var(--ink-3)', icon: '·' },
    optional: { fg: 'var(--accent-dim)', icon: '○' },
  } as const;
  const c = colors[status];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 18,
        padding: '20px 0',
        borderBottom: '1px dashed var(--rule)',
        alignItems: 'baseline',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          color: c.fg,
        }}
      >
        {c.icon} {n}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 22,
            fontWeight: 500,
            color: status === 'locked' ? 'var(--ink-3)' : 'var(--ink)',
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 13,
            color: 'var(--ink-2)',
            lineHeight: 1.6,
          }}
        >
          {desc}
        </div>
      </div>
      {cta && (
        <Link
          href={cta.href as any}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: c.fg,
            border: `1px solid ${c.fg}`,
            padding: '6px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
