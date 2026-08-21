'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

const trustPoints = [
  { icon: Star, label: '5.0 Google rating', accent: 'text-champagne-gold' },
  { icon: ShieldCheck, label: 'HPCSA registered', accent: 'text-teal-light' },
  { icon: Sparkles, label: 'Interest-free plans', accent: 'text-gold-light' },
];

const firstVisitDetails = [
  { icon: Clock3, label: '30-minute consultation' },
  { icon: Check, label: 'All medical aids accepted' },
  { icon: MapPin, label: '153 River Road, Centurion' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.075]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Welcome to Refresh Dental — premium dental care in Centurion"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-espresso sm:min-h-[820px] lg:min-h-screen"
    >
      {/* Cinematic image treatment: calm, clinical and deliberately dark enough for text. */}
      <motion.div
        style={{ scale: prefersReducedMotion ? 1 : backgroundScale }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="/images/clinic/real/dr-malunga-procedure.jpg"
          alt="Dr. Lebogang Malunga performing a dental procedure at Refresh Dental in Centurion"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,13,10,0.96)_0%,rgba(15,13,10,0.86)_38%,rgba(15,13,10,0.42)_66%,rgba(15,13,10,0.64)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,10,0.10)_0%,rgba(15,13,10,0.02)_42%,rgba(15,13,10,0.84)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(184,152,48,0.18),transparent_28%),radial-gradient(circle_at_30%_76%,rgba(45,107,92,0.18),transparent_31%)]" />
      </motion.div>

      {/* Fine technical grid adds a modern clinical edge without competing with the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(240,235,225,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.1)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(90deg,black,transparent_78%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-0 h-full w-px bg-gradient-to-b from-transparent via-champagne-gold/50 to-transparent lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-24 z-0 h-16 w-16 border-l border-t border-champagne-gold/50 sm:left-10 lg:left-16 lg:top-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-6 z-0 hidden h-20 w-20 border-b border-r border-champagne-gold/40 lg:block" />

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : contentOpacity }}
        className="relative z-10 w-full"
        itemScope
        itemType="https://schema.org/Dentist"
      >
        <div className="mx-auto grid w-full max-w-[1600px] items-end gap-12 px-6 pb-28 pt-36 sm:px-10 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-16 lg:px-16 lg:pb-24 lg:pt-32 xl:grid-cols-[minmax(0,1fr)_390px] xl:px-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={reveal} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-light/35 bg-sage-teal/20 px-3.5 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-light opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-light" />
                </span>
                <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory sm:text-[11px]">
                  Accepting new patients
                </span>
              </span>
              <span className="font-jost text-[10px] font-medium uppercase tracking-[0.2em] text-gold-pale/75 sm:text-[11px]">
                Centurion, South Africa
              </span>
            </motion.div>

            <motion.p
              variants={reveal}
              className="mb-3 font-signature text-[clamp(2rem,4vw,3.6rem)] leading-none text-gold-pale"
            >
              Dentistry, thoughtfully elevated
            </motion.p>

            <motion.h1
              variants={reveal}
              itemProp="name"
              className="type-hero max-w-[11ch] text-ivory"
            >
              <span className="block">A brighter smile.</span>
              <span className="block pl-[0.08em] text-transparent [-webkit-text-stroke:1px_rgba(232,217,168,0.78)] sm:[-webkit-text-stroke:1.5px_rgba(232,217,168,0.78)]">
                Your way.
              </span>
            </motion.h1>

            <motion.div variants={reveal} className="mt-8 flex items-center gap-4 sm:mt-10">
              <div className="h-px w-10 bg-gradient-to-r from-champagne-gold to-gold-pale/15 sm:w-16" />
              <p className="font-jost text-xs font-semibold uppercase tracking-[0.22em] text-gold-pale/85 sm:text-sm">
                Dr. Lebogang Malunga
              </p>
            </motion.div>

            <motion.p
              variants={reveal}
              className="mt-6 max-w-[640px] font-jost text-base font-light leading-8 text-ivory/78 sm:text-lg sm:leading-8"
            >
              Premium dental care that feels personal from the very first conversation. From preventive visits to complete smile transformations, every detail is designed around your comfort, confidence and long-term health.
            </motion.p>

            <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-2.5" aria-label="Practice credentials">
              {trustPoints.map((point) => (
                <span
                  key={point.label}
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.07] px-3.5 py-2 backdrop-blur-md"
                >
                  <point.icon className={`h-3.5 w-3.5 ${point.accent}`} aria-hidden="true" />
                  <span className="font-jost text-[10px] font-medium uppercase tracking-[0.11em] text-ivory/80 sm:text-[11px]">
                    {point.label}
                  </span>
                </span>
              ))}
            </motion.div>

            <motion.div variants={reveal} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.a
                href="#contact"
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.015 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="btn-gold-3d group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 font-jost text-xs font-bold uppercase tracking-[0.16em] text-espresso shadow-[0_14px_34px_rgba(184,152,48,0.24)] transition-shadow hover:shadow-[0_18px_44px_rgba(184,152,48,0.38)]"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="tel:+27614164649"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-ivory/20 bg-espresso/20 px-7 font-jost text-xs font-semibold uppercase tracking-[0.16em] text-ivory backdrop-blur-md transition-colors hover:border-gold-pale/60 hover:bg-ivory/10"
              >
                <Phone className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                Call the practice
              </motion.a>
            </motion.div>

            <motion.div variants={reveal} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 font-jost text-xs text-ivory/58 sm:text-sm">
              <a href="tel:+27614164649" className="inline-flex items-center gap-2 transition-colors hover:text-gold-pale">
                <Phone className="h-3.5 w-3.5 text-champagne-gold" aria-hidden="true" />
                +27 61 416 4649
              </a>
              <span className="hidden h-4 w-px bg-ivory/20 sm:block" />
              <a href="#location" className="inline-flex items-center gap-2 transition-colors hover:text-gold-pale">
                <MapPin className="h-3.5 w-3.5 text-champagne-gold" aria-hidden="true" />
                153 River Road, Centurion
              </a>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.52, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden overflow-hidden rounded-[1.7rem] border border-champagne-gold/25 bg-espresso/55 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl lg:block"
            aria-label="First visit information"
          >
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/80 to-transparent" />
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-champagne-gold/15 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-champagne-gold/25 bg-champagne-gold/10 text-champagne-gold">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-pale/75">
                  First visit
                </span>
              </div>

              <h2 className="max-w-[280px] font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.03em] text-ivory">
                Begin with a conversation.
              </h2>
              <p className="mt-4 font-jost text-sm leading-6 text-ivory/66">
                A calm, clear introduction to your smile goals and the care that fits you best.
              </p>

              <ul className="mt-7 space-y-4 border-t border-ivory/12 pt-6">
                {firstVisitDetails.map((detail) => (
                  <li key={detail.label} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-teal/15 text-teal-light ring-1 ring-inset ring-teal-light/15">
                      <detail.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="font-jost text-xs leading-5 text-ivory/78">{detail.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 font-jost text-[11px] font-bold uppercase tracking-[0.16em] text-champagne-gold transition-colors hover:text-gold-pale"
              >
                Check availability
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.65 }}
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="Scroll to learn more about Refresh Dental"
      >
        <span className="font-jost text-[9px] font-medium uppercase tracking-[0.24em] text-ivory/40">Discover Refresh</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ivory/15 bg-ivory/[0.05] text-champagne-gold/80">
          <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </motion.a>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ivory via-ivory/45 to-transparent" />
    </section>
  );
}
