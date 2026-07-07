'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  Tooth,
} from 'lucide-react';

const badges = [
  {
    icon: HeartHandshake,
    label: 'Gentle by design',
    detail: 'A calm, judgement-free space for every smile.',
    className: 'border-rose-200/80 bg-rose-50/80 text-rose-500 shadow-[0_18px_40px_rgba(244,63,94,0.12)]',
  },
  {
    icon: BadgeCheck,
    label: '5.0 Google rating',
    detail: 'Trusted by happy patients in Centurion.',
    className: 'border-amber-200/80 bg-amber-50/85 text-amber-600 shadow-[0_18px_40px_rgba(217,119,6,0.13)]',
  },
  {
    icon: ShieldCheck,
    label: 'HPCSA registered',
    detail: 'Professional care, thoughtfully delivered.',
    className: 'border-teal-200/80 bg-teal-50/85 text-teal-600 shadow-[0_18px_40px_rgba(13,148,136,0.12)]',
  },
  {
    icon: Sparkles,
    label: 'Smile plans made personal',
    detail: 'Every treatment starts with listening.',
    className: 'border-sky-200/80 bg-sky-50/85 text-sky-600 shadow-[0_18px_40px_rgba(2,132,199,0.12)]',
  },
] as const;

export default function FriendlyDentalBadges() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="The Refresh Dental care promise" className="relative isolate overflow-hidden bg-[#fcf8f0] py-14 text-espresso sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_9%_25%,rgba(251,191,36,0.20),transparent_22%),radial-gradient(circle_at_88%_76%,rgba(125,211,252,0.20),transparent_25%),radial-gradient(circle_at_78%_6%,rgba(45,212,191,0.13),transparent_22%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(35,66,60,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(35,66,60,0.10)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_72%_75%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto flex h-[255px] max-w-[315px] items-center justify-center sm:h-[300px] sm:max-w-[360px]">
              <div aria-hidden="true" className="absolute inset-6 rounded-full border border-amber-300/45 bg-gradient-to-br from-amber-100/80 via-[#fffdf9] to-sky-100/75 shadow-[0_30px_70px_rgba(92,72,39,0.13)]" />
              <div aria-hidden="true" className="absolute inset-12 rounded-full border border-teal-200/65 border-dashed" />
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity }}
                className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[2.1rem] border border-white/80 bg-white/90 shadow-[0_22px_48px_rgba(92,72,39,0.18)] sm:h-36 sm:w-36"
              >
                <Tooth className="h-16 w-16 text-teal-500 drop-shadow-[0_8px_12px_rgba(13,148,136,0.28)] sm:h-[4.5rem] sm:w-[4.5rem]" strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
              <motion.span
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], rotate: [0, -9, 0] }}
                transition={{ duration: 3.7, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
                className="absolute left-2 top-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 shadow-[0_16px_32px_rgba(244,63,94,0.16)] sm:left-3 sm:top-12"
              >
                <HeartHandshake className="h-6 w-6" aria-hidden="true" />
              </motion.span>
              <motion.span
                animate={prefersReducedMotion ? undefined : { y: [0, 7, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4.1, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
                className="absolute right-1 top-12 flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-500 shadow-[0_16px_32px_rgba(217,119,6,0.16)] sm:right-3 sm:top-14"
              >
                <Star className="h-6 w-6 fill-current" aria-hidden="true" />
              </motion.span>
              <motion.span
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
                className="absolute bottom-3 right-10 flex h-13 w-13 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-500 shadow-[0_16px_32px_rgba(2,132,199,0.15)]"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <span aria-hidden="true" className="absolute bottom-1 left-11 h-2.5 w-2.5 rounded-full bg-teal-400 shadow-[0_0_0_8px_rgba(45,212,191,0.12)]" />
              <span aria-hidden="true" className="absolute right-2 bottom-20 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_7px_rgba(251,191,36,0.12)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3"><span className="h-px w-12 bg-gradient-to-r from-teal-500 to-sky-400" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700 sm:text-[11px]">A more human kind of dental care</span></div>
            <h2 className="mt-6 max-w-3xl font-cormorant text-[clamp(3.4rem,5.4vw,6.2rem)] font-light leading-[0.86] tracking-[-0.055em] text-espresso [text-shadow:0_8px_26px_rgba(45,107,92,0.12)]">
              Serious about your smile.<br />
              <span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.16)]">Softly focused on how you feel.</span>
            </h2>
            <p className="mt-6 max-w-2xl font-jost text-base font-light leading-8 text-espresso/68 sm:text-lg">From a first check-up to a complete smile transformation, Refresh Dental pairs modern clinical care with a warmer welcome, clearer answers and a little more joy in the experience.</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`group rounded-2xl border p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${badge.className}`}
                  >
                    <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-current/15 bg-white/70 shadow-sm"><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span><span><span className="block font-jost text-xs font-bold uppercase tracking-[0.12em] text-espresso">{badge.label}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/62">{badge.detail}</span></span></div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
