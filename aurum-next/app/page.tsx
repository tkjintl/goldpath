import Link from 'next/link';
import { T } from '@/lib/tokens';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { AUSquare } from '@/components/AUSquare';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Wedge />
      <ProofStrip />
      <Heritage />
      <Mechanism />
      <Honest />
      <CTA />
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HERO — English-first, heritage angle, no drop scarcity
// ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: 24,
          fontFamily: T.mono,
          fontSize: 10,
          letterSpacing: '0.34em',
          color: T.goldD,
          textTransform: 'uppercase',
        }}
      >
        Est. MMXXIV · Singapore
      </div>
      <div
        style={{
          position: 'absolute',
          top: 28,
          right: 24,
          fontFamily: T.mono,
          fontSize: 10,
          letterSpacing: '0.32em',
          color: T.goldD,
        }}
      >
        Closed beta · USA · CA · SG · HK
      </div>

      <div style={{ maxWidth: 980 }}>
        <div
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(38px, 7vw, 84px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: T.text,
            marginBottom: 16,
          }}
        >
          Quietly compounds.
        </div>
        <div
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(38px, 7vw, 84px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: T.gold,
            marginBottom: 36,
          }}
        >
          Permanently stays.
        </div>
        <div
          style={{
            fontFamily: T.serifKr,
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            fontWeight: 300,
            color: T.sub,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          조용하게 쌓이고, 세대를 넘어 남는다.
        </div>

        <div
          style={{
            fontFamily: T.sans,
            fontSize: 16,
            color: T.sub,
            lineHeight: 1.7,
            maxWidth: 620,
            margin: '0 auto 44px',
          }}
        >
          Allocated physical gold for the Korean diaspora — vaulted in Singapore,
          Lloyd's-insured, redeemable as bars or USD. Built for the 1.7 million Koreans
          living abroad who want assets outside Korean custody and a clean way to gift
          across generations.
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/waitlist"
            style={{
              background: T.gold,
              color: T.bg,
              padding: '16px 28px',
              fontFamily: T.sans,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.06em',
              borderRadius: 2,
            }}
          >
            REQUEST ACCESS →
          </Link>
          <Link
            href="/heritage"
            style={{
              border: `1px solid ${T.goldBorder}`,
              color: T.gold,
              padding: '16px 28px',
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 16,
              borderRadius: 2,
            }}
          >
            Read about Heritage →
          </Link>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          fontFamily: T.mono,
          fontSize: 9,
          letterSpacing: '0.32em',
          color: T.goldD,
        }}
      >
        SCROLL · §I — V
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// WEDGE — what makes this defensible (honest)
// ─────────────────────────────────────────────────────────────────────
function Wedge() {
  const points = [
    {
      n: 'I',
      h: 'Outside Korean custody',
      sub: 'Offshore allocation by design',
      body: 'KRX gold and bank gold-banking accounts are custodied with KSD in Korea. Aurum is allocated in Singapore, in your name, segregated from Aurum\'s balance sheet through a licensed trust company. The point is not tax — it is jurisdiction.',
    },
    {
      n: 'II',
      h: 'Heritage built in',
      sub: 'Gift across borders, across generations',
      body: 'Designate a beneficiary. Set a trigger — a date, an age, a manual moment. We mint a sealed certificate and ship it where it needs to be. The 증여 / 상속 conversation made calmer.',
    },
    {
      n: 'III',
      h: 'Physical, redeemable, real',
      sub: '100g + bars · Singapore or shipped',
      body: 'Withdraw allocated bars from the vault — collected in Singapore or shipped via Malca-Amit logistics. Or sell back at LBMA fix and receive USD/SGD/HKD within 72 hours.',
    },
  ];

  return (
    <section
      style={{
        padding: '100px 24px',
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        background: T.bg1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            §I · WHY AURUM
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(32px, 4.8vw, 52px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.15,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            Three things you cannot get
            <br />
            from a domestic gold account.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
          }}
        >
          {points.map((p) => (
            <article
              key={p.n}
              style={{
                background: T.bg,
                border: `1px solid ${T.goldBorder}`,
                padding: 28,
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: T.serif,
                  fontStyle: 'italic',
                  fontSize: 56,
                  color: T.gold,
                  lineHeight: 1,
                  fontWeight: 300,
                  marginBottom: 12,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontFamily: T.sans,
                  fontSize: 18,
                  fontWeight: 600,
                  color: T.text,
                  marginBottom: 6,
                }}
              >
                {p.h}
              </div>
              <div
                style={{
                  fontFamily: T.serif,
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: T.goldD,
                  marginBottom: 18,
                  borderBottom: `1px solid ${T.border}`,
                  paddingBottom: 14,
                }}
              >
                {p.sub}
              </div>
              <div
                style={{
                  fontFamily: T.serif,
                  fontSize: 15,
                  color: T.sub,
                  lineHeight: 1.75,
                  fontWeight: 400,
                }}
              >
                {p.body}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PROOF — vault, insurance, audit (trust links)
// ─────────────────────────────────────────────────────────────────────
function ProofStrip() {
  const items = [
    { lbl: 'VAULT', val: 'Malca-Amit', sub: 'Singapore FTZ', href: '/trust/vault' },
    { lbl: 'INSURANCE', val: "Lloyd's", sub: 'Specie policy', href: '/trust/insurance' },
    { lbl: 'AUDIT', val: "Brink's", sub: 'Quarterly attestation', href: '/trust/audits' },
    { lbl: 'REGULATOR', val: 'MAS · MinLaw', sub: 'PSPM-registered', href: '/trust/regulators' },
  ];
  return (
    <section
      style={{
        padding: '60px 24px',
        background: T.deepBlack,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
        }}
      >
        {items.map((it) => (
          <Link
            key={it.lbl}
            href={it.href as any}
            style={{
              borderLeft: `1px solid ${T.goldBorder}`,
              paddingLeft: 18,
              transition: 'border-color 0.3s',
            }}
          >
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                color: T.goldD,
                letterSpacing: '0.28em',
                marginBottom: 8,
              }}
            >
              {it.lbl}
            </div>
            <div
              style={{
                fontFamily: T.serif,
                fontStyle: 'italic',
                fontSize: 26,
                color: T.gold,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {it.val}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.sub }}>{it.sub}</div>
            <div
              style={{
                fontFamily: T.serif,
                fontStyle: 'italic',
                fontSize: 12,
                color: T.goldD,
                marginTop: 12,
              }}
            >
              Read →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HERITAGE — the differentiator (no Korean incumbent does this)
// ─────────────────────────────────────────────────────────────────────
function Heritage() {
  return (
    <section style={{ padding: '120px 24px' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 16,
            }}
          >
            §II · HERITAGE
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: '-0.01em',
            }}
          >
            Gold has always been
            <br />
            the long letter.
          </h2>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 28,
              fontWeight: 400,
            }}
          >
            돌잡이 reaches for it. 결혼 marks it. 회갑 returns to it. The Korean
            relationship with gold has never been about price — it has been about the
            quiet act of leaving something behind.
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.85,
              marginBottom: 32,
              fontWeight: 400,
            }}
          >
            Aurum lets you designate a beneficiary, set a trigger — a birthday, a
            graduation, an age, a date — and we deliver the gold on that day. With a
            sealed certificate, signed and stamped, that says you were thinking of them
            long before they knew.
          </div>
          <Link
            href="/heritage"
            style={{
              display: 'inline-block',
              borderBottom: `1px solid ${T.gold}`,
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 18,
              color: T.gold,
              paddingBottom: 4,
            }}
          >
            How heritage works →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MECHANISM — how it actually works (4 honest steps)
// ─────────────────────────────────────────────────────────────────────
function Mechanism() {
  const steps = [
    {
      n: '01',
      h: 'Identity',
      body: 'Passport, address, source of funds. Cleared through Persona + ComplyAdvantage. Five to ten minutes.',
    },
    {
      n: '02',
      h: 'Funding',
      body: 'ACH from US/Canada, wire from Singapore/Hong Kong. No KRW collection — the customer is the remitter of record.',
    },
    {
      n: '03',
      h: 'Allocation',
      body: 'We buy at the daily LBMA fix and post the grams to your ledger. Allocated bars enter the Singapore vault under your title via a licensed trust company.',
    },
    {
      n: '04',
      h: 'Withdrawal',
      body: 'Sell back in 72 hours, withdraw 100g+ bars in Singapore or shipped, or designate a beneficiary for heritage transfer. Always your gold.',
    },
  ];
  return (
    <section
      style={{
        padding: '100px 24px',
        background: T.bg1,
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            §III · MECHANISM
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.2,
              maxWidth: 680,
              margin: '0 auto',
            }}
          >
            Four steps. No leverage. No yield promises.
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            background: T.bg,
            border: `1px solid ${T.goldBorder}`,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                padding: '32px 24px',
                borderRight: i < steps.length - 1 ? `1px solid ${T.border}` : 'none',
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: T.gold,
                  letterSpacing: '0.28em',
                  marginBottom: 14,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: T.serif,
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: T.text,
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {s.h}
              </div>
              <div
                style={{
                  fontFamily: T.sans,
                  fontSize: 13,
                  color: T.sub,
                  lineHeight: 1.7,
                }}
              >
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HONEST — what we don't promise (trust through honesty)
// ─────────────────────────────────────────────────────────────────────
function Honest() {
  const items = [
    {
      h: 'We are not cheaper than KRX gold.',
      body: 'If you are a Korean resident with a brokerage account, KRX gold is tax-free and lower-spread. We are a different product, for a different reason — offshore custody, physical redemption, heritage gifting.',
    },
    {
      h: 'Gold does not always go up.',
      body: 'It has historically preserved purchasing power across multi-decade horizons. It can lose 30%+ in a single year. We do not predict price.',
    },
    {
      h: 'We do not solicit Korean residents.',
      body: 'Until we hold a Korean license or partnership with a domestic counterparty, Aurum is offered only to residents of the United States, Canada, Singapore, and Hong Kong. This is a regulatory line, and we hold it.',
    },
  ];
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 44 }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            §IV · HONEST
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.2,
            }}
          >
            What we will not pretend.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                paddingTop: 28,
                borderTop: `1px solid ${T.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: T.serif,
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: T.text,
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {it.h}
              </div>
              <div
                style={{
                  fontFamily: T.sans,
                  fontSize: 14,
                  color: T.sub,
                  lineHeight: 1.75,
                  maxWidth: 760,
                }}
              >
                {it.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CTA — closing door
// ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section
      style={{
        padding: '120px 24px',
        background: T.deepBlack,
        textAlign: 'center',
        borderTop: `1px solid ${T.goldBorder}`,
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
          <AUSquare size={48} />
        </div>
        <h2
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 400,
            color: T.text,
            lineHeight: 1.05,
            marginBottom: 18,
            letterSpacing: '-0.02em',
          }}
        >
          Closed beta.
        </h2>
        <div
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 22,
            color: T.gold,
            marginBottom: 36,
            fontWeight: 400,
          }}
        >
          Onboarding the first hundred members.
        </div>
        <div
          style={{
            fontFamily: T.sans,
            fontSize: 14,
            color: T.sub,
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 540,
            margin: '0 auto 40px',
          }}
        >
          Request access if you are a Korean diaspora resident in the US, Canada,
          Singapore, or Hong Kong. Tell us a little about why this fits — we read every
          one.
        </div>
        <Link
          href="/waitlist"
          style={{
            display: 'inline-block',
            background: T.gold,
            color: T.bg,
            padding: '18px 36px',
            fontFamily: T.sans,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.08em',
            borderRadius: 2,
          }}
        >
          REQUEST ACCESS →
        </Link>
      </div>
    </section>
  );
}
