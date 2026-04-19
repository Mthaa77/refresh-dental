'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL =
  'https://static.wixstatic.com/media/a78f12_d8df1e87d3a1425a86b2e603d0ede665~mv2.jpg';

const SESSION_KEY = 'refresh-dental-loading-seen';

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
          {/* Logo + Tagline group */}
          <motion.div
            className="flex flex-col items-center gap-6"
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
              className="h-24 w-24 rounded-full object-cover sm:h-[100px] sm:w-[100px]"
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

          {/* Subtle gold line accent */}
          <motion.div
            className="mt-8 h-px w-16 bg-champagne-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
