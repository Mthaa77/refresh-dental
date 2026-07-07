'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import DentalToothMark from './dental-tooth-mark';

type FundingTrackId = 'medical' | 'athena' | 'clarity';

const fundingTracks = [
  {
    id: 'medical',
    label: 'Medical aid',
    eyebrow: 'Bring your scheme details',
    title: 'Care starts with a clear conversation.',
    copy: 'Bring your medical-aid information to the conversation. Our team will help you understand the practical next step before a treatment plan is confirmed.',
    points: ['All major medical aids welcome', 'Guidance before your appointment', 'A clear next-step conversation'],
    icon: ShieldCheck,
    tone: 'teal',
  },
  {
    id: 'athena',
    label: 'Athena options',
    eyebrow: 'Flexible care pathways',
    title: 'A beautiful plan should fit real life.',
    copy: 'For qualifying treatments, ask our team about available Athena options. We will explain the process and practical details before you make a decision.',
    points: ['Ask about qualifying treatments', 'Explore available arrangements', 'Decide with the full picture'],
    icon: WalletCards,
    tone: 'gold',
  },
  {
    id: 'clarity',
    label: 'Care clarity',
    eyebrow: 'No financial fog',
    title: 'Questions are part of good care.',
    copy: 'Your visit should make space for the questions behind a decision—from treatment choices to practical payment considerations.',
    points: ['No rushed conversations', 'Clear treatment pathways', 'Support before you commit'],
    icon: HeartHandshake,
    tone: 'sapphire',
  },
] as const;

const schemes = ['Discovery', 'Momentum', 'Bonitas', 'GEMS', 'Fedhealth', 'All major schemes'];

const toneClasses = {
  teal: {
    tab: 'border-teal-300/70 bg-teal-50 text-teal-700 shadow-[0_16px_38px_rgba(13,148,136,0.10)]',
    icon: 'border-teal-200 bg-teal-50 text-teal-600',
    glow: 'bg-teal-400/25',
    line: 'from-teal-400 via-teal-500 to-transparent',
  },
  gold: {
    tab: 'border-amber-300/75 bg-amber-50 text-amber-700 shadow-[0_16px_38px_rgba(217,119,6,0.11)]',
    icon: 'border-amber-200 bg-amber-50 text-amber-600',
    glow: 'bg-amber-400/25',
    line: 'from-amber-400 via-amber-500 to-transparent',
  },
  sapphire: {
    tab: 'border-sky-300/70 bg-sky-50 text-sky-700 shadow-[0_16px_38px_rgba(2,132,199,0.11)]',
    icon: 'border-sky-200 bg-sky-50 text-sky-600',
    glow: 'bg-sky-400/25',
    line: 'from-sky-400 via-sky-500 to-transparent',
  },
} as const;

export default function PaymentSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState<FundingTrackId>('medical');
  const activeTrack = fundingTracks.find((track) => track.id === activeTrackId) ?? fundingTracks[0];
  const ActiveIcon = activeTrack.icon;
  const activeTone = toneClasses[activeTrack.tone];

  return (
    <section id="financing" className="relative isolate overflow-hidden bg-[#fbf5e9] py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_9%_14%,rgba(45,212,191,0.18),transparent_23%),radial-gradient(circle_at_88%_18%,rgba(251,191,36,0.23),transparent_25%),radial-gradient(circle_at_82%_81%,rgba(125,211,252,0.18),transparent_22%),linear-gradient(145deg,#fffaf1_0%,#f7ecd8_50%,#edf8f4_140%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(35,66,60,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(35,66,60,0.10)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_77%_68%_at_52%_44%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-16 h-24 w-24 border-l border-t border-amber-300/65 sm:left-10 lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-6 h-28 w-28 border-b border-r border-teal-300/55 sm:right-10 lg:right-16" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-espresso/12 pb-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end lg:gap-16 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-11 bg-gradient-to-r from-amber-400 to-sky-400 sm:w-16" />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-teal-700 sm:text-[11px]">Payment & medical aid, made clearer</span>
            </div>
            <h2 className="max-w-4xl font-cormorant text-[clamp(3.5rem,6.6vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso [text-shadow:0_8px_28px_rgba(45,107,92,0.12)]">
              Let the care feel certain.<br />
              <span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.14)]">Not the conversation around it.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pb-2"
          >
            <p className="max-w-xl font-jost text-base font-light leading-8 text-espresso/68 sm:text-lg">
              Every treatment decision deserves a calm, honest conversation. We make room for the practical questions so that your next step feels as considered as your care.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-jost text-xs text-espresso/58">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-teal-600" aria-hidden="true" /> Medical aids welcome</span>
              <span className="inline-flex items-center gap-2"><CircleHelp className="h-4 w-4 text-amber-600" aria-hidden="true" /> Ask every question</span>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-[1180px] sm:mt-16"
        >
          <div aria-hidden="true" className="absolute -left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-teal-300/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-7 top-1/3 h-44 w-44 rounded-full bg-amber-300/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-10 left-1/2 h-16 w-[62%] -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative rounded-[2rem] bg-gradient-to-br from-amber-300 via-[#fef9ec] to-teal-300 p-[2px] shadow-[0_28px_82px_rgba(52,68,58,0.16)]">
            <div className="rounded-[1.92rem] bg-[#fffdf9] p-3 sm:p-5">
              <Image
                src="/images/clinic/real/athenapay-installments.jpg"
                alt="Athena payment options at Refresh Dental"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="h-auto w-full rounded-[1.45rem] border border-amber-100 object-cover shadow-[0_18px_46px_rgba(15,13,10,0.10)]"
                quality={92}
              />
            </div>
          </div>

          <figcaption className="relative mx-auto mt-6 grid max-w-[1050px] gap-6 rounded-[1.5rem] border border-amber-200/65 bg-white/80 p-5 shadow-[0_16px_42px_rgba(100,78,31,0.09)] backdrop-blur-xl sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-[0_12px_28px_rgba(217,119,6,0.12)]"><CreditCard className="h-6 w-6" aria-hidden="true" /></span>
            <div>
              <p className="font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">Athena, clearly in view</p>
              <p className="mt-2 font-cormorant text-3xl font-light leading-[0.95] text-espresso sm:text-4xl">A smile plan can meet you where life is.</p>
              <p className="mt-3 max-w-2xl font-jost text-sm leading-6 text-espresso/63">Ask the Refresh Dental team about Athena options for qualifying treatments. We will explain the available pathway and practical steps before you decide.</p>
            </div>
            <a href="#contact" className="btn-gold-3d group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso transition-transform duration-300 hover:-translate-y-0.5">Discuss Athena options <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
          </figcaption>
        </motion.figure>

        <div className="mt-12 grid gap-7 xl:grid-cols-[0.9fr_1.1fr] xl:items-stretch xl:gap-10 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-espresso/12 bg-ivory/70 p-5 shadow-[0_22px_70px_rgba(40,32,21,0.10)] backdrop-blur-xl sm:p-7"
          >
            <div aria-hidden="true" className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-teal-300/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 text-teal-600"><DentalToothMark className="h-6 w-6" aria-hidden="true" /></span><span><span className="block font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">Your care, your questions</span><span className="mt-1 block font-jost text-sm text-espresso/58">Choose the conversation you need.</span></span></div>
              <div className="mt-6 grid gap-2" role="tablist" aria-label="Payment and medical aid topics">
                {fundingTracks.map((track, index) => {
                  const Icon = track.icon;
                  const selected = track.id === activeTrackId;
                  const tone = toneClasses[track.tone];
                  return (
                    <button
                      key={track.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTrackId(track.id)}
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${selected ? tone.tab : 'border-espresso/10 bg-white/55 hover:-translate-y-0.5 hover:border-espresso/22 hover:bg-white/85'}`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${selected ? tone.icon : 'border-espresso/10 bg-ivory text-espresso/52'}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                      <span className="flex-1"><span className="block font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-espresso/48">0{index + 1}</span><span className="mt-1 block font-cormorant text-3xl font-light leading-none text-espresso">{track.label}</span></span>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${selected ? 'translate-x-1 text-espresso' : 'text-espresso/40 group-hover:translate-x-1'}`} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-espresso p-6 text-ivory shadow-[0_30px_85px_rgba(15,13,10,0.26)] sm:p-8 lg:p-10"
          >
            <div aria-hidden="true" className={`absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl ${activeTone.glow}`} />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_46%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col justify-between"
              >
                <div>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${activeTone.icon}`}><ActiveIcon className="h-5 w-5" aria-hidden="true" /></span>
                  <p className="mt-7 font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-pale/80">{activeTrack.eyebrow}</p>
                  <h3 className="mt-3 max-w-xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] text-ivory sm:text-6xl">{activeTrack.title}</h3>
                  <p className="mt-5 max-w-2xl font-jost text-sm font-light leading-7 text-ivory/73 sm:text-base">{activeTrack.copy}</p>
                </div>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {activeTrack.points.map((point) => <span key={point} className="flex items-start gap-2 rounded-xl border border-ivory/10 bg-ivory/[0.055] p-3 font-jost text-xs leading-5 text-ivory/78"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-pale" aria-hidden="true" />{point}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.65 }}
          className="mt-9 overflow-hidden rounded-[1.75rem] border border-espresso/12 bg-ivory/80 shadow-[0_18px_50px_rgba(15,13,10,0.07)] sm:mt-11"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden border-b border-espresso/10 bg-[linear-gradient(145deg,#133a33_0%,#0f2924_100%)] p-6 text-ivory sm:p-8 lg:border-b-0 lg:border-r lg:p-9"><div aria-hidden="true" className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" /><div className="relative"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-pale/25 bg-amber-300/10 text-gold-pale"><Sparkles className="h-4 w-4" aria-hidden="true" /></span><p className="mt-5 font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/80">A simple way to begin</p><h3 className="mt-3 max-w-sm font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.035em]">Three calm steps before your treatment decision.</h3></div></div>
            <div className="grid gap-0 divide-y divide-espresso/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ['01', 'Share your goal', 'Tell us what you would like to explore.'],
                ['02', 'Understand your route', 'Get a clearer view of treatment and practical choices.'],
                ['03', 'Decide with confidence', 'Move forward only when the plan feels right for you.'],
              ].map(([number, title, text]) => <div key={number} className="p-5 sm:p-6"><span className="font-cormorant text-3xl font-light text-amber-600">{number}</span><p className="mt-4 font-jost text-xs font-semibold uppercase tracking-[0.14em] text-espresso">{title}</p><p className="mt-2 font-jost text-sm leading-6 text-brown-muted">{text}</p></div>)}
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-espresso/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"><div className="flex flex-wrap gap-x-5 gap-y-2">{schemes.map((scheme) => <span key={scheme} className="inline-flex items-center gap-2 font-jost text-[10px] font-semibold uppercase tracking-[0.12em] text-espresso/58"><Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" /> {scheme}</span>)}</div><a href="#contact" className="group inline-flex shrink-0 items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-teal-700 transition-colors hover:text-espresso">Ask the team <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a></div>
        </motion.div>
      </div>
    </section>
  );
}
