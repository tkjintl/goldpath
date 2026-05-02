import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { T } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Heritage · Aurum',
  description:
    'Designate a beneficiary. Set a trigger. Aurum delivers the gold on the day, with a sealed certificate.',
};

export default function HeritagePage() {
  return (
    <>
      <Nav />
      <section style={{ padding: '100px 24px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            HERITAGE
          </div>
          <h1
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 6vw, 68px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.05,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            The long letter,
            <br />
            in gold.
          </h1>
          <div
            style={{
              fontFamily: T.serifKr,
              fontSize: 22,
              color: T.gold,
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            세대를 잇는 가장 조용한 방법.
          </div>
          <p
            style={{
              fontFamily: T.serif,
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 24,
              fontWeight: 400,
            }}
          >
            돌잡이의 금반지. 결혼식의 한 돈. 회갑의 금두꺼비. The Korean relationship
            with gold has never been about price. It has been about the quiet act of
            leaving something behind that the recipient knew, the moment they held it,
            had been intended for years.
          </p>
          <p
            style={{
              fontFamily: T.serif,
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 40,
              fontWeight: 400,
            }}
          >
            Aurum lets you do that across borders, across decades, and across the
            difficult conversations a parent does not always know how to start.
          </p>
        </div>
      </section>

      <section
        style={{
          padding: '80px 24px',
          background: T.bg1,
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 400,
              color: T.text,
              textAlign: 'center',
              marginBottom: 56,
              lineHeight: 1.2,
            }}
          >
            Four decisions. Made once. Honored forever.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24,
            }}
          >
            <Step
              n="01"
              h="Designate"
              body="Name the beneficiary. Their full name, relationship, contact details. They do not need to know yet."
            />
            <Step
              n="02"
              h="Trigger"
              body="A date — birthday, graduation, wedding. An age — 18, 25, 30. A condition — your manual signal. You choose."
            />
            <Step
              n="03"
              h="Allocate"
              body="The grams you set aside live in your allocation, earmarked. You can adjust until the trigger fires."
            />
            <Step
              n="04"
              h="Deliver"
              body="On the day, we transfer title to the beneficiary, mint a sealed certificate, and ship the bars or open their account — your choice."
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            THE CERTIFICATE
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: T.text,
              marginBottom: 28,
              lineHeight: 1.15,
            }}
          >
            What they actually receive.
          </h2>
          <p
            style={{
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 20,
            }}
          >
            A signed and stamped 증서, on archival paper, listing the date the
            allocation was first set, the weight in grams, the bar serials, and a
            personal note from you of any length you wish to write. The note is sealed
            and not opened by Aurum staff — only by the beneficiary, on the day.
          </p>
          <p
            style={{
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 32,
            }}
          >
            Optional: a physical bar shipment, a sealed envelope with the certificate, or
            a quiet account opening with no shipment at all. The recipient chooses what
            they want to do with the metal — they cannot lose it, only redirect it.
          </p>
          <Link
            href="/waitlist"
            style={{
              display: 'inline-block',
              background: T.gold,
              color: T.bg,
              padding: '16px 30px',
              fontFamily: T.sans,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.06em',
              borderRadius: 2,
            }}
          >
            REQUEST ACCESS →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Step({ n, h, body }: { n: string; h: string; body: string }) {
  return (
    <div
      style={{
        background: T.bg,
        border: `1px solid ${T.goldBorder}`,
        padding: 28,
      }}
    >
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.gold,
          letterSpacing: '0.28em',
          marginBottom: 16,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: T.serif,
          fontStyle: 'italic',
          fontSize: 24,
          color: T.text,
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        {h}
      </div>
      <div
        style={{
          fontFamily: T.sans,
          fontSize: 13,
          color: T.sub,
          lineHeight: 1.7,
        }}
      >
        {body}
      </div>
    </div>
  );
}
