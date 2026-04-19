'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, Sparkles, Star } from 'lucide-react';

interface CounterItem {
  icon: React.ReactNode;
  value: number;
  displayValue: string;
  suffix: string;
  label: string;
  decimals?: number;
}

const counters: CounterItem[] = [
  { icon: <Award className="h-6 w-6" />, value: 10, displayValue: '10', suffix: '+', label: 'Years of Excellence' },
  { icon: <Heart className="h-6 w-6" />, value: 15000, displayValue: '15,000', suffix: '+', label: 'Patients Served' },
  { icon: <Sparkles className="h-6 w-6" />, value: 25000, displayValue: '25,000', suffix: '+', label: 'Procedures Completed' },
  { icon: <Star className="h-6 w-6" />, value: 4.9, displayValue: '4.9', suffix: '', label: 'Average Rating', decimals: 1 },
];

function AnimatedNumber({
  targetValue,
  suffix,
  decimals = 0,
  isInView,
  onComplete,
}: {
  targetValue: number;
  suffix: string;
  decimals?: number;
  isInView: boolean;
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const tickRef = useRef<(ts: number) => void>(() => {});

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    tickRef.current = (timestamp: number) => {
      const start = startTimeRef.current ?? timestamp;
      startTimeRef.current = start;

      const duration = 2200;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetValue;

      if (decimals > 0) {
        setCount(parseFloat(current.toFixed(decimals)));
      } else {
        setCount(Math.floor(current));
      }

      if (progress < 1) {
        requestAnimationFrame(tickRef.current);
      } else {
        setCount(targetValue);
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current();
        }
      }
    };
  }, [targetValue, decimals]);

  // Start animation when entering view
  useEffect(() => {
    if (!isInView) return;

    startTimeRef.current = null;
    completedRef.current = false;
    requestAnimationFrame(tickRef.current);
  }, [isInView]);

  // Reset when leaving view
  const prevInViewRef = useRef(isInView);
  useEffect(() => {
    if (prevInViewRef.current && !isInView) {
      requestAnimationFrame(() => {
        setCount(0);
      });
      startTimeRef.current = null;
      completedRef.current = false;
    }
    prevInViewRef.current = isInView;
  }, [isInView]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return num.toLocaleString('en-US');
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

function CounterCard({
  item,
  index,
  isInView,
}: {
  item: CounterItem;
  index: number;
  isInView: boolean;
}) {
  const [pulseDone, setPulseDone] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative text-center group"
    >
      {/* Gold icon circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/30 bg-champagne-gold/10 text-champagne-gold"
      >
        {item.icon}
      </motion.div>

      {/* Counter number */}
      <div className="relative mb-3">
        <div className="font-cormorant text-6xl md:text-7xl font-light text-champagne-gold text-shadow-gold-strong">
          <AnimatedNumber
            targetValue={item.value}
            suffix={item.suffix}
            decimals={item.decimals}
            isInView={isInView}
            onComplete={() => setPulseDone(true)}
          />
        </div>
        {/* Gold pulse glow when counting finishes */}
        {pulseDone && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 -z-10 rounded-full bg-champagne-gold/25 blur-2xl"
          />
        )}
      </div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        className="font-jost text-sm md:text-base tracking-wider text-ivory/70 uppercase"
      >
        {item.label}
      </motion.p>

      {/* Gold separator — only show on md+ between items */}
      {index < counters.length - 1 && (
        <div className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-champagne-gold/30 to-transparent" />
      )}
    </motion.div>
  );
}

export default function AnimatedCounterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #1A0F0A 30%, #2C1810 70%, #1A0F0A 100%)',
      }}
    >
      {/* Subtle gold gradient texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/[0.04] via-transparent to-champagne-gold/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-champagne-gold/[0.02] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="shimmer-text text-shadow-gold font-cormorant text-3xl md:text-4xl lg:text-5xl font-light text-center mb-4"
        >
          Our Impact, By the Numbers
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-ivory/60 font-jost text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          Every number represents a real smile, a real story, a real life changed.
        </motion.p>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-6">
          {counters.map((item, index) => (
            <CounterCard
              key={item.label}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
