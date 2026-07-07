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
    copy: 'For qualifying treatments, ask our team about available Athena options. We will explain the process and the practical details before you make a decision.',
    points: ['Ask about qualifying treatments', 'Explore available arrangements', 'Decide with the full picture'],
    icon: WalletCards,
    tone: 'gold',
  },
  {
    id: 'clarity',
    label: 'Care clarity',
    eyebrow: 'No financial fog',
    title: 'Questions are part of good care.',
    copy: 'Your visit should make space for the questions behind the decision—from treatment choices to practical payment considerations.',
    points: ['No rushed conversations', 'Clear treatment pathways', 'Support before you commit'],
    icon: HeartHandshake,
    tone: 'sapphire',
  },
] as const;

const schemes = ['Discovery', 'Momentum', 'Bonitas', 'GEMS', 'Fedhealth', 'All major schemes'];

const toneClasses = {
  teal: {
    tab: 'border-sage-teal/40 bg-sage-teal/10 text-sage-teal',
    icon: 'border-teal-light/30 bg-sage-teal/15 text-teal-light',
    glow: 'bg-sage-teal/30',
    line: 'from-teal-light via-sage-teal to-transparent',
  },
  gold: {
    tab: 'border-champagne-gold/45 bg-champagne-gold/10 text-gold-rich',
    icon: 'border-champagne-gold/30 bg-champagne-gold/12 text-champagne-gold',
    glow: 'bg-champagne-gold/28',
    line: 'from-champagne-gold via-gold-pale to-transparent',
  },
  sapphire: {
    tab: 'border-sapphire-light/35 bg-sapphire/10 text-sapphire',
    icon: 'border-sapphire-light/25 bg-sapphire/12 text-sapphire-light',
    glow: 'bg-sapphire/28',
    line: 'from-sapphire-light via-sapphire to-transparent',
  },
} as const;

export default function PaymentSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState<FundingTrackId>('medical');
  const activeTrack = fundingTracks.find((track) => track.id === activeTrackId) ?? fundingTracks[0];
  const ActiveIcon = activeTrack.icon;
  const activeTone = toneClasses[activeTrack.tone];

  return (
    <section id="financing" className="relative isolate overflow-hidden bg-sand py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_17%,rgba(45,107,92,0.17),transparent_26%),radial-gradient(circle_at_90%_12%,rgba(184,152,48,0.22),transparent_25%),linear-gradient(142deg,#f4eee2_0%,#eee3d1_52%,#e6f0ea_145%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(32,29,24,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(32,29,24,0.10)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_77%_68%_at_52%_44%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-16 h-24 w-24 border-l border-t border-champagne-gold/60 sm:left-10 lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-6 h-28 w-28 border-b border-r border-sage-teal/40 sm:right-10 lg:right-16" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-espresso/12 pb-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end lg:gap-16 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-11 bg-champagne-gold sm:w-16" />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-sage-teal sm:text-[11px]">Payment & medical aid, reimagined</span>
            </div>
            <h2 className="max-w-4xl font-cormorant text-[clamp(3.5rem,6.6vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso">
              Let the care feel certain.<br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(35,66,60,0.70)] sm:[-webkit-text-stroke:1.4px_rgba(35,66,60,0.70)]">Not the conversation around it.</span>
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
              Every treatment decision deserves a calm, honest conversation. Explore how we help make the practical side of your care feel more considered from the start.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-jost text-xs text-espresso/58">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-sage-teal" aria-hidden="true" /> Medical aids welcome</span>
              <span className="inline-flex items-center gap-2"><CircleHelp className="h-4 w-4 text-champagne-gold" aria-hidden="true" /> Ask every question</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-7 xl:grid-cols-[0.94fr_1.06fr] xl:items-stretch xl:gap-10 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-espresso/12 bg-ivory/70 p-5 shadow-[0_28px_80px_rgba(40,32,21,0.11)] backdrop-blur-xl sm:p-7"
          >
            <div aria-hidden="true" className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-sage-teal/15 blur-3xl" />
            <div className="relative">
              <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Explore your care conversation</p>
              <div className="mt-5 grid gap-2" role="tablist" aria-label="Payment and medical aid topics">
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
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${selected ? tone.tab : 'border-espresso/10 bg-white/50 hover:-translate-y-0.5 hover:border-espresso/22 hover:bg-white/80'}`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${selected ? tone.icon : 'border-espresso/10 bg-ivory text-espresso/52'}`}>
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-espresso/48">0{index + 1}</span>
                        <span className="mt-1 block font-cormorant text-3xl font-light leading-none text-espresso">{track.label}</span>
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${selected ? 'translate-x-1 text-espresso' : 'text-espresso/40 group-hover:translate-x-1'}`} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrack.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-espresso p-6 text-ivory sm:p-7"
                >
                  <div aria-hidden="true" className={`absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl ${activeTone.glow}`} />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_48%)]" />
                  <div className="relative">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${activeTone.icon}`}><ActiveIcon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                    <p className="mt-6 font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-pale/80">{activeTrack.eyebrow}</p>
                    <h3 className="mt-3 max-w-lg font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.035em] text-ivory sm:text-5xl">{activeTrack.title}</h3>
                    <p className="mt-5 max-w-xl font-jost text-sm font-light leading-7 text-ivory/72 sm:text-base">{activeTrack.copy}</p>
                    <div className="mt-7 grid gap-2 sm:grid-cols-3">
                      {activeTrack.points.map((point) => (
                        <span key={point} className="flex items-start gap-2 rounded-xl border border-ivory/10 bg-ivory/[0.055] p-3 font-jost text-xs leading-5 text-ivory/76">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-pale" aria-hidden="true" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate min-h-[660px] overflow-hidden rounded-[2rem] border border-champagne-gold/28 bg-espresso shadow-[0_34px_95px_rgba(15,13,10,0.27)]"
          >
            <div className="absolute inset-x-0 top-0 h-[56%] overflow-hidden">
              <Image
                src="/images/clinic/real/athenapay-installments.jpg"
                alt="Athena payment options at Refresh Dental"
                fill
                sizes="(min-width: 1280px) 50vw, 100vw"
                className="object-cover object-center"
                quality={92}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,10,0.05)_0%,rgba(15,13,10,0.20)_38%,rgba(15,13,10,0.92)_100%)]" />
              <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-ivory/70 to-transparent sm:inset-x-9" />
            </div>

            <div className="relative flex min-h-[660px] flex-col justify-end p-6 text-ivory sm:p-9 lg:p-10">
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-ivory/24 bg-espresso/40 px-3 py-2 backdrop-blur-md sm:right-9 sm:top-9">
                <CreditCard className="h-3.5 w-3.5 text-champagne-gold" aria-hidden="true" />
                <span className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-ivory">Athena options</span>
              </div>
              <div className="absolute left-6 top-[41%] right-6 rounded-[1.4rem] border border-ivory/15 bg-espresso/80 p-4 backdrop-blur-xl sm:left-9 sm:right-auto sm:top-[43%] sm:w-[300px] sm:p-5">
                <p className="font-jost text-[9px] font-semibold uppercase tracking-[0.17em] text-gold-pale/80">Visible care, practical support</p>
                <p className="mt-2 font-cormorant text-2xl font-light leading-[0.95] text-ivory">The financial conversation belongs in the light.</p>
              </div>

              <div className="relative">
                <div className="h-px w-24 bg-gradient-to-r from-champagne-gold via-gold-pale to-transparent" />
                <p className="mt-6 font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/78">Athena, clearly in view</p>
                <h3 className="mt-3 max-w-xl font-cormorant text-5xl font-light leading-[0.88] tracking-[-0.045em] text-ivory sm:text-6xl">Your smile plan can meet you where life is.</h3>
                <p className="mt-5 max-w-xl font-jost text-sm font-light leading-7 text-ivory/73 sm:text-base">Ask Refresh Dental about Athena options for qualifying treatments. The team will take you through the available pathway and practical steps before you decide.</p>
                <a href="#contact" className="btn-gold-3d group mt-8 inline-flex min-h-13 items-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso transition-transform duration-300 hover:-translate-y-0.5">
                  Discuss payment options
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.65 }}
          className="mt-9 overflow-hidden rounded-[1.75rem] border border-espresso/12 bg-ivory/80 shadow-[0_18px_50px_rgba(15,13,10,0.07)] sm:mt-11"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden border-b border-espresso/10 bg-[linear-gradient(145deg,#173c35_0%,#102b26_100%)] p-6 text-ivory sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div aria-hidden="true" className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-champagne-gold/20 blur-3xl" />
              <div className="relative"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-pale/25 bg-champagne-gold/10 text-gold-pale"><Sparkles className="h-4 w-4" aria-hidden="true" /></span><p className="mt-5 font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/80">A simple way to begin</p><h3 className="mt-3 max-w-sm font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.035em]">Three calm steps before your treatment decision.</h3></div>
            </div>
            <div className="grid gap-0 divide-y divide-espresso/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ['01', 'Share your goal', 'Tell us what you would like to explore.'],
                ['02', 'Understand your route', 'Get a clearer view of treatment and practical choices.'],
                ['03', 'Decide with confidence', 'Move forward only when the plan feels right for you.'],
              ].map(([number, title, text]) => (
                <div key={number} className="p-5 sm:p-6"><span className="font-cormorant text-3xl font-light text-champagne-gold">{number}</span><p className="mt-4 font-jost text-xs font-semibold uppercase tracking-[0.14em] text-espresso">{title}</p><p className="mt-2 font-jost text-sm leading-6 text-brown-muted">{text}</p></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-espresso/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {schemes.map((scheme) => <span key={scheme} className="inline-flex items-center gap-2 font-jost text-[10px] font-semibold uppercase tracking-[0.12em] text-espresso/58"><Check className="h-3.5 w-3.5 text-sage-teal" aria-hidden="true" /> {scheme}</span>)}
            </div>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-gold-rich transition-colors hover:text-espresso">Ask the team <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
