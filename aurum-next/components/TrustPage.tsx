import { T } from '@/lib/tokens';

type Item = { label: string; value: string };

export function TrustPage(props: {
  title: string;
  subtitle: string;
  items?: Item[];
  paragraphs: string[];
  status?: 'live' | 'in-progress' | 'planned';
  statusNote?: string;
}) {
  const statusColors: Record<string, string> = {
    live: T.green,
    'in-progress': T.gold,
    planned: T.muted,
  };
  return (
    <article style={{ maxWidth: 760 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          marginBottom: 8,
          flexWrap: 'wrap',
        }}
      >
        <h2
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            color: T.text,
            letterSpacing: '-0.01em',
          }}
        >
          {props.title}
        </h2>
        {props.status && (
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: statusColors[props.status],
              letterSpacing: '0.22em',
              border: `1px solid ${statusColors[props.status]}`,
              padding: '3px 8px',
              borderRadius: 2,
            }}
          >
            {props.status.toUpperCase()}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: T.serif,
          fontStyle: 'italic',
          fontSize: 17,
          color: T.goldD,
          marginBottom: 28,
        }}
      >
        {props.subtitle}
      </div>
      {props.statusNote && (
        <div
          style={{
            background: T.bg1,
            border: `1px solid ${T.goldBorder}`,
            padding: '14px 18px',
            fontFamily: T.sans,
            fontSize: 13,
            color: T.sub,
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          {props.statusNote}
        </div>
      )}
      {props.items && props.items.length > 0 && (
        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '16px 28px',
            marginBottom: 32,
            paddingBottom: 32,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          {props.items.map((it) => (
            <div key={it.label} style={{ display: 'contents' }}>
              <dt
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: T.gold,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  alignSelf: 'baseline',
                }}
              >
                {it.label}
              </dt>
              <dd
                style={{
                  fontFamily: T.sans,
                  fontSize: 14,
                  color: T.text,
                  lineHeight: 1.6,
                }}
              >
                {it.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {props.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.85,
              fontWeight: 400,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
