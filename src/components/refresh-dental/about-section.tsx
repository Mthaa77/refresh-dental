'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Heart, ShieldCheck, Sparkles, Tooth } from 'lucide-react';

const principles = [
  { icon: Heart, label: 'Care that listens', description: 'Your concerns and goals shape every recommendation.', color: 'bg-rose-50 text-rose-500 ring-rose-200/70' },
  { icon: ShieldCheck, label: 'Clinical confidence', description: 'Evidence-led treatment with clarity at every stage.', color: 'bg-teal-50 text-teal-600 ring-teal-200/70' },
  { icon: Award, label: 'Made for longevity', description: 'Thoughtful decisions that protect your future smile.', color: 'bg-amber-50 text-amber-600 ring-amber-200/70' },
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(251,191,36,0.18),transparent_23%),radial-gradient(circle_at_92%_70%,rgba(45,212,191,0.13),transparent_24%),radial-gradient(circle_at_76%_12%,rgba(125,211,252,0.11),transparent_20%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[7%] top-0 h-full w-px bg-gradient-to-b from-transparent via-champagne-gold/35 to-transparent" />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[540px] lg:mx-0"
        >
          <div aria-hidden="true" className="absolute -left-7 -top-7 h-28 w-28 border-l border-t border-champagne-gold/45" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-espresso shadow-[0_32px_75px_rgba(15,13,10,0.2)]">
            <Image
              src="/images/clinic/real/dr-malunga-graduation.jpg"
              alt="Dr. Lebogang Malunga, principal dentist at Refresh Dental"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-ivory/20 bg-espresso/55 p-4 backdrop-blur-lg sm:inset-x-8 sm:bottom-8 sm:p-5">
              <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/80">Principal Dentist</p>
              <p className="mt-1 font-cormorant text-2xl font-light leading-none text-ivory sm:text-3xl">Dr. Lebogang Malunga</p>
            </div>
          </div>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -7, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-3 top-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-500 shadow-[0_16px_34px_rgba(2,132,199,0.17)] sm:-right-6 sm:h-16 sm:w-16"
          >
            <Tooth className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.6} aria-hidden="true" />
          </motion.div>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 7, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-2 left-2 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-500 shadow-[0_14px_32px_rgba(217,119,6,0.17)] sm:left-4 sm:h-14 sm:w-14"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </motion.div>
          <div className="absolute -bottom-6 -right-3 max-w-[230px] rounded-2xl border border-rose-200/70 bg-rose-50/95 p-4 shadow-[0_18px_40px_rgba(244,63,94,0.12)] backdrop-blur-xl sm:-right-8 sm:p-5">
            <p className="font-cormorant text-2xl font-light leading-[0.95] text-espresso">A kinder, more personal standard of care.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pt-8 lg:pt-0"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-champagne-gold to-amber-300 sm:w-16" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-teal-700 sm:text-[11px]">The practice</span>
          </div>

          <h2 className="mt-7 max-w-3xl font-cormorant text-[clamp(3.35rem,6vw,6.6rem)] font-light leading-[0.86] tracking-[-0.055em] text-espresso [text-shadow:0_8px_28px_rgba(45,107,92,0.13)]">
            Clinical clarity.<br />
            <span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.16)]">Human warmth.</span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 font-jost text-base font-light leading-8 text-brown-muted sm:text-lg">
            <p>
              Refresh Dental was created for people who want more than a rushed appointment. Every visit is built around thoughtful conversation, honest guidance and modern dentistry delivered with a gentle hand.
            </p>
            <p>
              Dr. Malunga brings together cosmetic, restorative and preventive care in a space that feels calm, considered and focused on what matters to you.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {['BDS', 'PDD', 'HPCSA Registered', 'Centurion, South Africa'].map((credential, index) => (
              <span key={credential} className={`rounded-full border px-3.5 py-2 font-jost text-[10px] font-semibold uppercase tracking-[0.13em] ${index % 2 === 0 ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                {credential}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 border-y border-soft-border/70 py-8 sm:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.label} className="group">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:-translate-y-1 ${principle.color}`}>
                  <principle.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-cormorant text-2xl font-medium text-espresso [text-shadow:0_5px_16px_rgba(45,107,92,0.10)]">{principle.label}</h3>
                <p className="mt-1.5 font-jost text-xs leading-5 text-brown-muted">{principle.description}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="group mt-10 inline-flex items-center gap-3 font-jost text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700 transition-colors hover:text-espresso">
            Meet Dr. Malunga
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-300/60 bg-teal-50 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-teal-500 group-hover:text-ivory">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
