'use client';

import { useId } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SectionBackground
   A zero-layout-impact decorative layer. Drop it as the first child inside any
   `relative overflow-hidden` section. It adds:
     • An SVG dot-grid pattern (gold or teal variant)
     • 2–3 floating radial gold glow orbs
     • Up to 6 twinkling sparkle SVGs scattered around
   All elements are pointer-events-none and aria-hidden.
───────────────────────────────────────────────────────────────────────────── */

type Variant = 'gold' | 'teal' | 'gold-dark' | 'subtle';

interface SectionBackgroundProps {
  variant?: Variant;
  /** Show the dot-grid SVG pattern */
  dots?: boolean;
  /** Show the floating glow orbs */
  orbs?: boolean;
  /** Show the twinkling sparkle accents */
  sparkles?: boolean;
  /** Show the 3-D decorative ring SVG in the corner */
  ring?: boolean;
  className?: string;
}

/* ── Sparkle SVG (4-point star) ── */
function Sparkle({
  size = 16,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const r = size / 2;
  const arm = r * 0.88;
  const inner = r * 0.22;
  // 4-pointed star path centred at (r, r)
  const d = `M${r},${r - arm} C${r + inner},${r - inner} ${r + inner},${r - inner} ${r + arm},${r}
             C${r + inner},${r + inner} ${r + inner},${r + inner} ${r},${r + arm}
             C${r - inner},${r + inner} ${r - inner},${r + inner} ${r - arm},${r}
             C${r - inner},${r - inner} ${r - inner},${r - inner} ${r},${r - arm} Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d={d} fill="url(#sparkleGrad)" />
      <defs>
        <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#E8D9A8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#B89830" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── 3-D decorative ring SVG ── */
function DecorativeRing({ variant }: { variant: Variant }) {
  const stroke =
    variant === 'teal'
      ? 'rgba(45,107,92,0.22)'
      : variant === 'gold-dark'
      ? 'rgba(184,152,48,0.35)'
      : 'rgba(184,152,48,0.22)';
  const strokeInner =
    variant === 'teal'
      ? 'rgba(127,181,168,0.12)'
      : 'rgba(212,192,138,0.12)';

  return (
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none select-none spin-slow"
    >
      {/* Outer dashed ring */}
      <circle
        cx="130"
        cy="130"
        r="120"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="6 10"
      />
      {/* Middle ring */}
      <circle
        cx="130"
        cy="130"
        r="90"
        stroke={strokeInner}
        strokeWidth="1"
        strokeDasharray="3 18"
      />
      {/* Inner accent */}
      <circle
        cx="130"
        cy="130"
        r="60"
        stroke={stroke}
        strokeWidth="0.5"
      />
      {/* 4 cardinal tick marks */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 130 + 115 * Math.cos(rad);
        const y1 = 130 + 115 * Math.sin(rad);
        const x2 = 130 + 125 * Math.cos(rad);
        const y2 = 130 + 125 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ── Dot-grid SVG pattern ── */
function DotGridPattern({ variant, patternId }: { variant: Variant; patternId: string }) {
  const dotColor =
    variant === 'teal'
      ? 'rgba(45,107,92,0.16)'
      : variant === 'gold-dark'
      ? 'rgba(184,152,48,0.28)'
      : 'rgba(184,152,48,0.14)';

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={dotColor} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/* ── Main exported component ── */
export default function SectionBackground({
  variant = 'gold',
  dots = true,
  orbs = true,
  sparkles = true,
  ring = false,
  className = '',
}: SectionBackgroundProps) {
  const id = useId().replace(/:/g, '_');

  const orbColors =
    variant === 'teal'
      ? {
          a: 'radial-gradient(ellipse, rgba(45,107,92,0.18) 0%, transparent 70%)',
          b: 'radial-gradient(ellipse, rgba(127,181,168,0.12) 0%, transparent 70%)',
          c: 'radial-gradient(ellipse, rgba(184,152,48,0.10) 0%, transparent 70%)',
        }
      : variant === 'gold-dark'
      ? {
          a: 'radial-gradient(ellipse, rgba(184,152,48,0.28) 0%, transparent 70%)',
          b: 'radial-gradient(ellipse, rgba(212,192,138,0.18) 0%, transparent 70%)',
          c: 'radial-gradient(ellipse, rgba(45,107,92,0.12) 0%, transparent 70%)',
        }
      : variant === 'subtle'
      ? {
          a: 'radial-gradient(ellipse, rgba(184,152,48,0.09) 0%, transparent 70%)',
          b: 'radial-gradient(ellipse, rgba(45,107,92,0.07) 0%, transparent 70%)',
          c: 'radial-gradient(ellipse, rgba(212,192,138,0.07) 0%, transparent 70%)',
        }
      : {
          a: 'radial-gradient(ellipse, rgba(184,152,48,0.18) 0%, transparent 70%)',
          b: 'radial-gradient(ellipse, rgba(212,192,138,0.12) 0%, transparent 70%)',
          c: 'radial-gradient(ellipse, rgba(45,107,92,0.09) 0%, transparent 70%)',
        };

  const sparklePositions = [
    { top: '8%', left: '6%', size: 14, delay: 'sparkle-pop-delay-1' },
    { top: '12%', right: '9%', size: 10, delay: 'sparkle-pop-delay-2' },
    { top: '40%', left: '2%', size: 8, delay: 'sparkle-pop-delay-3' },
    { bottom: '18%', right: '5%', size: 16, delay: 'sparkle-pop-delay-4' },
    { bottom: '10%', left: '18%', size: 10, delay: 'sparkle-pop-delay-5' },
    { top: '60%', right: '15%', size: 12, delay: 'sparkle-pop-delay-1' },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Dot-grid pattern */}
      {dots && <DotGridPattern variant={variant} patternId={`dotGrid_${id}`} />}

      {/* Edge-fade mask over the dot grid so it doesn't hit section edges hard */}
      {dots && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(240,235,225,0.85) 100%)',
          }}
        />
      )}

      {/* Floating glow orbs */}
      {orbs && (
        <>
          <div
            className="absolute orb-drift"
            style={{
              top: '-10%',
              right: '-5%',
              width: '55%',
              height: '55%',
              background: orbColors.a,
            }}
          />
          <div
            className="absolute orb-drift-2"
            style={{
              bottom: '-15%',
              left: '-8%',
              width: '48%',
              height: '48%',
              background: orbColors.b,
            }}
          />
          <div
            className="absolute orb-drift-3"
            style={{
              top: '40%',
              right: '20%',
              width: '32%',
              height: '32%',
              background: orbColors.c,
            }}
          />
        </>
      )}

      {/* Twinkling sparkles */}
      {sparkles &&
        sparklePositions.map((pos, i) => (
          <div
            key={`${id}-sparkle-${i}`}
            className={`absolute ${pos.delay}`}
            style={{
              top: pos.top,
              bottom: (pos as { bottom?: string }).bottom,
              left: pos.left,
              right: (pos as { right?: string }).right,
              opacity: 0,
            }}
          >
            <Sparkle size={pos.size} />
          </div>
        ))}

      {/* 3-D decorative ring in corner */}
      {ring && (
        <div
          className="absolute -right-20 -bottom-20 opacity-40"
          style={{ zIndex: 1 }}
        >
          <DecorativeRing variant={variant} />
        </div>
      )}
    </div>
  );
}
