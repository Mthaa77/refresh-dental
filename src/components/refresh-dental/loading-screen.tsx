'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = '/images/refresh-dental-logo.jpg';

const SESSION_KEY = 'refresh-dental-loading-seen';

// Deterministic sparkle positions around the logo
const sparkleParticles = [
  { x: '30%', y: '25%', size: 6, delay: 0, duration: 3.5 },
  { x: '70%', y: '22%', size: 4, delay: 0.5, duration: 4.2 },
  { x: '22%', y: '60%', size: 5, delay: 1.0, duration: 3.8 },
  { x: '78%', y: '58%', size: 4, delay: 0.8, duration: 4.5 },
  { x: '45%', y: '18%', size: 3, delay: 1.5, duration: 3.2 },
  { x: '55%', y: '72%', size: 5, delay: 0.3, duration: 4.0 },
  { x: '18%', y: '40%', size: 4, delay: 1.8, duration: 3.6 },
  { x: '82%', y: '38%', size: 3, delay: 2.0, duration: 4.3 },
];

const sparkleFloat = (p: { delay: number; duration: number }) => ({
  opacity: [0, 0.7, 0.3, 0.7, 0],
  scale: [0, 1, 0.6, 1, 0],
  y: [0, -10, -5, -14, -8],
  transition: {
    duration: p.duration,
    delay: p.delay,
    repeat: Infinity,
    repeatDelay: 2,
    ease: 'easeInOut',
  },
});

// Diamond SVG ornament for gold line
function DiamondOrnament() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="mx-auto block"
    >
      <path
        d="M5 0L10 5L5 10L0 5L5 0Z"
        fill="#B89830"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default function LoadingScreen() {
  // `null` = undecided (SSR-safe), `true` = show, `false` = hide
  const [phase, setPhase] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setPhase(false);
  }, []);

  useEffect(() => {
    // Avoid setting state synchronously — schedule a microtask
    const id = requestAnimationFrame(() => {
      const alreadySeen = sessionStorage.getItem(SESSION_KEY);
      if (alreadySeen) {
        setPhase(false);
        return;
      }

      // Mark as seen for this session
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase(true);

      // Begin exit animation after 1.2s
      timerRef.current = setTimeout(dismiss, 1200);
    });

    return () => {
      cancelAnimationFrame(id);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismiss]);

  // During SSR / hydration, render nothing until we decide
  if (phase === null) return null;

  return (
    <AnimatePresence>
      {phase && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Grain texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />

          {/* Floating sparkle particles */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {sparkleParticles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-champagne-gold/60"
                style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
                animate={sparkleFloat(p)}
              />
            ))}
          </div>

          {/* Radial gradient glow behind logo */}
          <motion.div
            className="pointer-events-none absolute z-0 h-48 w-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(184, 152, 48, 0.12) 0%, rgba(184, 152, 48, 0.05) 40%, transparent 70%)',
              filter: 'blur(24px)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Logo + Tagline group */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Logo */}
            <motion.img
              src={LOGO_URL}
              alt="Refresh Dental"
              width={100}
              height={100}
              className="h-28 w-28 rounded-full object-cover ring-2 ring-champagne-gold/30 ring-offset-2 ring-offset-espresso sm:h-32 sm:w-32"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            />

            {/* Tagline */}
            <motion.p
              className="font-cormorant max-w-xs text-center text-xl font-normal italic tracking-wide text-champagne-gold sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            >
              Refreshed smiles, refreshed lives.
            </motion.p>
          </motion.div>

          {/* Gold line accent with diamond ornament */}
          <motion.div
            className="relative z-10 mt-8 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-gold/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'right center' }}
            />
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <DiamondOrnament />
            </motion.div>
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-gold/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'left center' }}
            />
          </motion.div>

          {/* Premium loading progress bar */}
          <motion.div
            className="relative z-10 mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-champagne-gold/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <motion.div
              className="h-full w-full rounded-full bg-gradient-to-r from-champagne-gold/80 via-gold-light to-champagne-gold/80"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left center' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
