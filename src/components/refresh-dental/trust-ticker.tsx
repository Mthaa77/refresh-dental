'use client';

const row1Items = [
  '★ 5.0 Google Rating',
  '500+ Happy Patients',
  'HPCSA Registered',
  'All Medical Aids Accepted',
];

const row2Items = [
  'Interest-Free Payment Plans',
  'Same-Day Emergencies',
  '10+ Years Experience',
  'State-of-the-Art Technology',
];

const separator = '◆';

function buildRow(items: string[], separator: string) {
  const row = items.map((item) => `${separator}  ${item}  `).join('');
  // Duplicate for seamless infinite loop
  return `${row}${row}`;
}

export default function TrustTicker() {
  return (
    <div className="relative bg-espresso overflow-hidden py-3 sm:py-4">
      {/* CSS-only marquee animations */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 35s linear infinite;
        }
        .marquee-left-slow {
          animation: marquee-left 45s linear infinite;
        }
      `}</style>

      {/* Gold gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, #B89830 20%, #D4C08A 50%, #B89830 80%, transparent)',
        }}
      />
      {/* Gold gradient bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, #2D6B5C 20%, #7FB5A8 50%, #2D6B5C 80%, transparent)',
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Row 1 — scrolls left */}
      <div className="flex items-center gap-2 mb-1 sm:mb-2">
        <div className="flex shrink-0 whitespace-nowrap marquee-left">
          <span className="font-jost text-xs sm:text-sm tracking-wider uppercase">
            {buildRow(row1Items, separator).split('').map((char, i) => (
              <span
                key={i}
                className={
                  char === '★' || char === separator
                    ? 'text-champagne-gold'
                    : 'text-teal-light/90'
                }
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Row 2 — scrolls right (desktop only, merged into single row on mobile) */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex shrink-0 whitespace-nowrap marquee-right">
          <span className="font-jost text-xs sm:text-sm tracking-wider uppercase">
            {buildRow(row2Items, separator).split('').map((char, i) => (
              <span
                key={i}
                className={
                  char === '★' || char === separator
                    ? 'text-teal-light'
                    : 'text-champagne-gold/90'
                }
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Mobile: single row with all items scrolling left */}
      <div className="flex sm:hidden items-center gap-2 mt-1">
        <div className="flex shrink-0 whitespace-nowrap marquee-left-slow">
          <span className="font-jost text-xs tracking-wider uppercase">
            {buildRow(
              [...row1Items, ...row2Items],
              separator
            )
              .split('')
              .map((char, i) => (
                <span
                  key={i}
                  className={
                    char === '★' || char === separator
                      ? 'text-champagne-gold'
                      : 'text-teal-light/90'
                  }
                >
                  {char}
                </span>
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}
