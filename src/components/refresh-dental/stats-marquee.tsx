'use client'

const marqueeItems = [
  { text: '★ 5.0 Google Rating', color: 'gold' as const },
  { text: '500+ Happy Patients', color: 'gold' as const },
  { text: '10+ Years Experience', color: 'gold' as const },
  { text: 'HPCSA Registered', color: 'teal' as const },
  { text: 'All Medical Aids Accepted', color: 'teal' as const },
  { text: 'Interest-Free Payment Plans', color: 'gold' as const },
  { text: '24/7 Emergency Available', color: 'red' as const },
  { text: 'State-of-the-Art Technology', color: 'blue' as const },
]

function ItemColor({ item }: { item: (typeof marqueeItems)[number] }) {
  switch (item.color) {
    case 'gold':
      return (
        <span
          className="bg-gradient-to-r from-champagne-gold to-gold-light bg-clip-text font-semibold text-transparent"
        >
          {item.text}
        </span>
      )
    case 'teal':
      return <span className="text-sage-teal font-semibold">{item.text}</span>
    case 'red':
      return <span className="text-accent-red font-semibold">{item.text}</span>
    case 'blue':
      return <span className="text-accent-blue font-semibold">{item.text}</span>
  }
}

export default function StatsMarquee() {
  // Duplicate items for seamless infinite loop
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <section className="relative overflow-hidden bg-espresso py-5">
      {/* CSS-only marquee animation */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .stats-marquee-track {
          animation: marquee-left 30s linear infinite;
        }
      `}</style>

      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Subtle top/bottom gradient borders */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.3), transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.15), transparent)',
        }}
      />

      <div className="flex items-center gap-8 whitespace-nowrap stats-marquee-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 font-jost text-sm tracking-wide">
            <span className="uppercase">
              <ItemColor item={item} />
            </span>
            <span className="text-champagne-gold/40 text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  )
}
