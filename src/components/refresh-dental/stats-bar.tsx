'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StatItem({ value, suffix, label, delay, isInView }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="text-center"
    >
      <div className="font-cormorant text-4xl md:text-5xl text-[#E8D5B0] mb-2">
        <AnimatedCounter value={value} suffix={suffix} isInView={isInView} />
      </div>
      <div className="font-jost uppercase tracking-wider text-xs text-[#FDFAF6]/60">
        {label}
      </div>
    </motion.div>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'Smiles Refreshed', delay: 0 },
  { value: 12, suffix: '', label: 'Services Available', delay: 0.15 },
  { value: 3, suffix: '', label: 'Locations History', delay: 0.3 },
  { value: 5, suffix: '★', label: 'Google Rating', delay: 0.45 },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="bg-espresso py-12 px-4"
      aria-label="Practice statistics"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            delay={stat.delay}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}
