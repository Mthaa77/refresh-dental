'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type VisitIntentId = 'new-smile' | 'care-concern' | 'wellness';
type VisitPreferenceId = 'gentle' | 'clarity' | 'time';

const visitIntents = [
  {
    id: 'new-smile',
    label: 'I am ready to invest in my smile',
    short: 'Smile transformation',
    detail: 'I want to explore a brighter, more balanced or more confident smile.',
    start: 'A private smile consultation',
    icon: Sparkles,
    accent: 'gold',
  },
  {
    id: 'care-concern',
    label: 'I have something that needs attention',
    short: 'Dental concern',
    detail: 'I want careful guidance around discomfort, function or a specific tooth.',
    start: 'A focused clinical consultation',
    icon: CircleHelp,
    accent: 'teal',
  },
  {
    id: 'wellness',
    label: 'I want to stay ahead of my oral health',
    short: 'Ongoing wellbeing',
    detail: 'I want a professional check-in, hygiene support and a clearer routine.',
    start: 'A comprehensive wellness visit',
    icon: ShieldCheck,
    accent: 'sapphire',
  },
] as const;

const preferences = [
  { id: 'gentle', label: 'A gentler, calmer experience', text: 'I appreciate time to settle in, ask questions and move at a considered pace.', icon: HeartHandshake },
  { id: 'clarity', label: 'Clear options and cost guidance', text: 'I want to understand the path, the choices and the next steps before deciding.', icon: MessageCircle },
  { id: 'time', label: 'A visit that respects my time', text: 'I want a well-organised appointment with a clear focus from the start.', icon: CalendarDays },
] as const;

const accentClasses = {
  gold: { tag: 'border-champagne-gold/30 bg-champagne-gold/10 text-gold-pale', glow: 'bg-champagne-gold/25', line: 'from-champagne-gold via-gold-pale to-transparent' },
  teal: { tag: 'border-teal-light/25 bg-sage-teal/20 text-teal-light', glow: 'bg-sage-teal/30', line: 'from-teal-light via-sage-teal to-transparent' },
  sapphire: { tag: 'border-sapphire-light/25 bg-sapphire/20 text-sapphire-light', glow: 'bg-sapphire/30', line: 'from-sapphire-light via-sapphire to-transparent' },
} as const;

export default function FirstVisitConcierge() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [intentId, setIntentId] = useState<VisitIntentId | null>(null);
  const [preferenceId, setPreferenceId] = useState<VisitPreferenceId | null>(null);

  const intent = useMemo(() => visitIntents.find((item) => item.id === intentId) ?? visitIntents[0], [intentId]);
  const preference = useMemo(() => preferences.find((item) => item.id === preferenceId) ?? preferences[0], [preferenceId]);
  const accent = accentClasses[intent.accent];

  const scrollToContact = () => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('refresh-dental-visit-pass', JSON.stringify({ intent: intent.label, preference: preference.label }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="first-visit" className="relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_19%,rgba(45,107,92,0.36),transparent_28%),radial-gradient(circle_at_89%_77%,rgba(184,152,48,0.23),transparent_24%),linear-gradient(138deg,#0d0c09_0%,#17120d_56%,#0e302a_138%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(240,235,225,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.10)_1px,transparent_1px)] [background-size:66px_66px] [mask-image:radial-gradient(ellipse_72%_68%_at_52%_45%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-6 top-14 h-24 w-24 border-r border-t border-champagne-gold/40 sm:right-10 lg:right-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-14 left-6 hidden h-24 w-24 border-b border-l border-teal-light/35 lg:block" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-ivory/14 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-11 bg-champagne-gold sm:w-16" /><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-pale/85 sm:text-[11px]">A first visit, thoughtfully reimagined</span></div>
            <h2 className="max-w-4xl font-cormorant text-[clamp(3.45rem,6.6vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-ivory">The confidence to book<br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(232,217,168,0.78)] sm:[-webkit-text-stroke:1.4px_rgba(232,217,168,0.78)]">starts before you arrive.</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.08, duration: 0.74, ease: [0.22, 1, 0.36, 1] }} className="lg:pb-2">
            <p className="max-w-xl font-jost text-base font-light leading-8 text-ivory/70 sm:text-lg">Your first appointment should not feel like a leap into the unknown. Build a simple visit pass and see the kind of experience we will prepare around you.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3"><span className="rounded-xl border border-ivory/12 bg-ivory/[0.05] px-3 py-3 font-jost text-xs text-ivory/68">Questions first</span><span className="rounded-xl border border-ivory/12 bg-ivory/[0.05] px-3 py-3 font-jost text-xs text-ivory/68">Plan before treatment</span><span className="rounded-xl border border-ivory/12 bg-ivory/[0.05] px-3 py-3 font-jost text-xs text-ivory/68">A pace that respects you</span></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-12 grid overflow-hidden rounded-[2rem] border border-ivory/14 bg-ivory/[0.035] shadow-[0_34px_100px_rgba(0,0,0,0.35)] lg:grid-cols-[0.92fr_1.08fr] sm:mt-16">
          <aside className="relative overflow-hidden border-b border-ivory/12 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),transparent_52%)]" />
            <div aria-hidden="true" className="absolute -left-14 top-12 h-56 w-56 rounded-full bg-sage-teal/25 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div><span className="inline-flex rounded-full border border-champagne-gold/25 bg-champagne-gold/10 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-pale">Your first-visit concierge</span><h3 className="mt-7 max-w-sm font-cormorant text-5xl font-light leading-[0.88] tracking-[-0.045em] sm:text-6xl">Choose the beginning that feels right for you.</h3><p className="mt-6 max-w-sm font-jost text-sm font-light leading-7 text-ivory/68">A few thoughtful choices help transform uncertainty into a clear next step.</p></div>
              <div className="mt-12 space-y-4"><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">Before your visit</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/72">Tell us the one thing you want to change, understand or feel better about.</p></div><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">In your consultation</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/72">Explore your options with room to ask every question that matters to you.</p></div><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">After the conversation</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/72">Leave knowing what your next step could be, without pressure to rush a decision.</p></div></div>
            </div>
          </aside>

          <div className="relative bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(244,238,226,0.93))] p-6 text-espresso sm:p-10 lg:p-12">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-5"><div><p className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-teal">Build your visit pass</p><p className="mt-1 font-jost text-sm text-espresso/56">Designed for a more assured first step.</p></div><div className="flex items-center gap-2" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((item) => <span key={item} className={`h-1.5 rounded-full transition-all duration-500 ${item <= step ? 'w-9 bg-sage-teal' : 'w-5 bg-espresso/12'}`} />)}</div></div>

            <AnimatePresence mode="wait">
              {step === 1 && <motion.div key="intent" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="pt-8"><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 01 / Your reason</span><h3 className="mt-4 max-w-2xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] sm:text-6xl">Where should your first visit begin?</h3><div className="mt-8 grid gap-3">{visitIntents.map((item) => { const Icon = item.icon; const selected = item.id === intentId; const itemAccent = accentClasses[item.accent]; return <button key={item.id} type="button" onClick={() => { setIntentId(item.id); setStep(2); }} aria-pressed={selected} className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${selected ? 'border-sage-teal/55 bg-sage-teal/[0.09]' : 'border-espresso/12 bg-white/70 hover:-translate-y-0.5 hover:border-espresso/25 hover:bg-white'}`}><div aria-hidden="true" className={`absolute -right-8 -top-10 h-32 w-32 rounded-full blur-3xl ${itemAccent.glow} ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`} /><div className="relative flex items-start gap-4"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${itemAccent.tag}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="flex-1"><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/48">{item.short}</span><span className="mt-2 block font-cormorant text-3xl font-light leading-none text-espresso">{item.label}</span><span className="mt-3 block font-jost text-sm leading-6 text-espresso/62">{item.detail}</span></span><ArrowRight className="mt-1 h-4 w-4 text-espresso/45 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></div></button>; })}</div></motion.div>}

              {step === 2 && <motion.div key="preference" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="pt-8"><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 02 / Your preference</span><h3 className="mt-4 max-w-2xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] sm:text-6xl">What would help you feel ready to commit?</h3><div className="mt-8 grid gap-3">{preferences.map((item) => { const Icon = item.icon; const selected = item.id === preferenceId; return <button key={item.id} type="button" onClick={() => { setPreferenceId(item.id); setStep(3); }} aria-pressed={selected} className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${selected ? 'border-champagne-gold/55 bg-champagne-gold/[0.11] shadow-[0_20px_55px_rgba(184,152,48,0.10)]' : 'border-espresso/12 bg-white/70 hover:-translate-y-0.5 hover:border-espresso/25 hover:bg-white'}`}><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${selected ? 'border-champagne-gold/30 bg-champagne-gold/15 text-champagne-gold' : 'border-espresso/12 bg-ivory text-espresso/55'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="flex-1"><span className="block font-cormorant text-3xl font-light leading-none text-espresso">{item.label}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/60">{item.text}</span></span><span className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-champagne-gold bg-champagne-gold text-espresso' : 'border-espresso/15 text-transparent'}`}><Check className="h-3.5 w-3.5" aria-hidden="true" /></span></button>; })}</div><button type="button" onClick={() => setStep(1)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-espresso/15 px-5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso/65 transition-colors hover:border-espresso/35 hover:text-espresso"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Change my reason</button></motion.div>}

              {step === 3 && <motion.div key="passport" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15, scale: prefersReducedMotion ? 1 : 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="pt-8"><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 03 / Your visit pass</span><h3 className="mt-4 max-w-2xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] sm:text-6xl">This is how we will help your first step feel more certain.</h3><div className="relative mt-8 overflow-hidden rounded-[1.7rem] border border-espresso/12 bg-espresso p-6 text-ivory shadow-[0_26px_70px_rgba(38,32,24,0.24)] sm:p-8"><div aria-hidden="true" className={`absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl ${accent.glow}`} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_45%,transparent_100%)]" /><div className="relative"><div className="flex flex-wrap items-center justify-between gap-4"><span className={`inline-flex rounded-full border px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.16em] ${accent.tag}`}>{intent.short}</span><span className="font-jost text-[10px] uppercase tracking-[0.16em] text-ivory/48">Prepared around you</span></div><p className="mt-6 font-cormorant text-4xl font-light leading-[0.95] sm:text-5xl">Your first step: <span className="text-gold-pale">{intent.start}.</span></p><div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.055] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">Your focus</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/75">{intent.detail}</p></div><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.055] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">Your preference</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/75">{preference.text}</p></div><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.055] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">Your next move</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/75">Reserve a conversation and let us take it from there.</p></div></div></div></div><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(2)} className="inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-espresso/15 px-5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso/65 transition-colors hover:border-espresso/35 hover:text-espresso"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Refine my pass</button><button type="button" onClick={scrollToContact} className="btn-gold-3d group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso">Reserve my consultation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></button></div></motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
