'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
  index: number;
  total: number;
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
  onComplete,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      const start = startTimeRef.current ?? timestamp;
      startTimeRef.current = start;

      const duration = 2000;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
        onComplete();
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value, onComplete]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function DiamondIcon({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="mx-auto mb-2"
      style={{
        width: 12,
        height: 12,
        color: 'rgba(184, 152, 48, 0.6)',
        opacity: isInView ? 0.8 : 0.4,
        transition: 'opacity 0.5s ease',
      }}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path d="M8 0L10 6L8 16L6 6Z" />
      </svg>
    </div>
  );
}

function StatItem({ value, suffix, label, delay, isInView, index, total }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="text-center relative shadow-premium rounded-2xl p-4 md:p-5 transition-all duration-400"
      whileHover={{
        background: 'rgba(15, 13, 10, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(184, 152, 48, 0.15)',
        boxShadow: '0 8px 32px rgba(15, 13, 10, 0.3)',
      }}
    >
      {/* Diamond icon above number */}
      <DiamondIcon isInView={isInView} />

      {/* Stat number */}
      <div
        className="font-cormorant text-4xl md:text-5xl text-[#D4C08A] mb-2 relative text-shadow-gold-strong"
      >
        <AnimatedCounter
          value={value}
          suffix={suffix}
          isInView={isInView}
          onComplete={() => {}}
        />
      </div>
      <div className="font-jost uppercase tracking-[0.18em] text-xs text-[#F0EBE1]/60">
        {label}
      </div>

      {/* Vertical golden separator between stats on desktop */}
      {index < total - 1 && (
        <div className="hidden md:block absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-champagne-gold/30 to-transparent" />
      )}

      {/* Horizontal gold gradient line separator on mobile */}
      {index < total - 1 && (
        <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-px" style={{
          background: 'linear-gradient(90deg, transparent 0%, #D4C08A 50%, transparent 100%)',
        }} />
      )}
    </motion.div>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'Happy Smiles', delay: 0 },
  { value: 12, suffix: '', label: 'Specialised Treatments', delay: 0.15 },
  { value: 3, suffix: '', label: 'Convenient Locations', delay: 0.3 },
  { value: 5, suffix: '★', label: 'Google 5★ Rating', delay: 0.45 },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-12 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F0D0A 0%, #1A1510 25%, #0F0D0A 50%, #1C1712 75%, #0F0D0A 100%)',
      }}
      aria-label="Practice statistics"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }} />

      {/* Dramatic gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/[0.04] via-transparent to-champagne-gold/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-champagne-gold/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-warm-blush/[0.03] via-transparent to-champagne-gold/[0.02]" />
      </div>

      {/* Section title with subtle blue glow */}
      <h3 className="relative text-center text-lg sm:text-xl font-cormorant font-light text-[#D4C08A] mb-10 text-shadow-gold text-shadow-blue tracking-wider">
        The Numbers Behind Confident Smiles
      </h3>

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            delay={stat.delay}
            isInView={isInView}
            index={index}
            total={stats.length}
          />
        ))}
      </div>
    </section>
  );
}
