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

function DiamondIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 text-champagne-gold/60 mx-auto mb-2"
      fill="currentColor"
    >
      <path d="M8 0L10 6L8 16L6 6Z" />
    </svg>
  );
}

function StatItem({ value, suffix, label, delay, isInView, index, total }: StatItemProps) {
  const [countingDone, setCountingDone] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="text-center relative shadow-premium rounded-2xl p-4 md:p-5 hover-lift"
    >
      {/* Diamond icon above number */}
      <DiamondIcon />

      <div className="font-cormorant text-4xl md:text-5xl text-[#E8D5B0] mb-2 relative text-shadow-gold-strong">
        <AnimatedCounter
          value={value}
          suffix={suffix}
          isInView={isInView}
          onComplete={() => setCountingDone(true)}
        />
        {/* Pulsing glow when counting finishes */}
        {countingDone && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-champagne-gold/20 blur-xl -z-10"
          />
        )}
      </div>
      <div className="font-jost uppercase tracking-wider text-xs text-[#FDFAF6]/60">
        {label}
      </div>

      {/* Vertical golden separator between stats on desktop */}
      {index < total - 1 && (
        <div className="hidden md:block absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent" />
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
      className="relative bg-espresso py-12 px-4 overflow-hidden"
      aria-label="Practice statistics"
    >
      {/* Section title */}
      <h3 className="text-center text-lg sm:text-xl font-cormorant font-light text-[#E8D5B0] mb-10 text-shadow-gold tracking-wider">
        The Numbers Behind Confident Smiles
      </h3>
      {/* Subtle gradient texture overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/[0.03] via-transparent to-champagne-gold/[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-champagne-gold/[0.02] to-transparent" />
      </div>

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
