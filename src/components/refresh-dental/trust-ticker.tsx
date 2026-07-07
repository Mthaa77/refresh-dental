'use client';

import FriendlyDentalBadges from './friendly-dental-badges';

const row1Items = [
  '★ 5.0 Google Rating',
  'Gentle, judgement-free care',
  'HPCSA Registered',
  'All Medical Aids Welcome',
];

const row2Items = [
  'Smile Plans Made Personal',
  'Same-Day Emergencies',
  'Modern Dentistry, Warm Welcome',
  'Athena Payment Options Available',
];

const separator = '◆';

function buildRow(items: string[], itemSeparator: string) {
  const row = items.map((item) => `${itemSeparator}  ${item}  `).join('');
  return `${row}${row}`;
}

export default function TrustTicker() {
  return (
    <>
      <div className="relative overflow-hidden bg-espresso py-3 sm:py-4">
        <style>{`
          @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          @keyframes marquee-left-slow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-left { animation: marquee-left 30s linear infinite; }
          .marquee-right { animation: marquee-right 35s linear infinite; }
          .marquee-left-slow { animation: marquee-left 45s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .marquee-left, .marquee-right, .marquee-left-slow { animation-play-state: paused; } }
        `}</style>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-light to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_center,rgba(240,235,225,0.35)_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="relative flex items-center gap-2 pb-1 sm:pb-2">
          <div className="flex shrink-0 whitespace-nowrap marquee-left">
            <span className="font-jost text-xs uppercase tracking-wider sm:text-sm">
              {buildRow(row1Items, separator).split('').map((char, index) => (
                <span key={index} className={char === '★' || char === separator ? 'text-champagne-gold' : 'text-teal-light/90'}>{char}</span>
              ))}
            </span>
          </div>
        </div>

        <div className="relative hidden items-center gap-2 sm:flex">
          <div className="flex shrink-0 whitespace-nowrap marquee-right">
            <span className="font-jost text-xs uppercase tracking-wider sm:text-sm">
              {buildRow(row2Items, separator).split('').map((char, index) => (
                <span key={index} className={char === '★' || char === separator ? 'text-teal-light' : 'text-gold-pale/90'}>{char}</span>
              ))}
            </span>
          </div>
        </div>

        <div className="relative mt-1 flex items-center gap-2 sm:hidden">
          <div className="flex shrink-0 whitespace-nowrap marquee-left-slow">
            <span className="font-jost text-xs uppercase tracking-wider">
              {buildRow([...row1Items, ...row2Items], separator).split('').map((char, index) => (
                <span key={index} className={char === '★' || char === separator ? 'text-champagne-gold' : 'text-teal-light/90'}>{char}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <FriendlyDentalBadges />
    </>
  );
}
