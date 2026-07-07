'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

type GoalId = 'enhance' | 'restore' | 'protect';
type PriorityId = 'confidence' | 'comfort' | 'clarity';

const goals = [
  {
    id: 'enhance',
    eyebrow: 'Smile & aesthetics',
    title: 'Enhance my smile',
    text: 'I want a brighter, more balanced smile that feels naturally mine.',
    route: 'Whitening, alignment, veneers or facial aesthetics',
    startingPoint: 'A smile-design conversation',
    accent: 'gold',
    icon: Sparkles,
  },
  {
    id: 'restore',
    eyebrow: 'Function & restoration',
    title: 'Restore comfort',
    text: 'I want help with a tooth, bite or smile that needs care and attention.',
    route: 'Restorations, crowns, implants or tooth-preserving care',
    startingPoint: 'A restorative care consultation',
    accent: 'teal',
    icon: Stethoscope,
  },
  {
    id: 'protect',
    eyebrow: 'Prevention & wellbeing',
    title: 'Protect my health',
    text: 'I want reassurance, a fresh start and a stronger oral-health routine.',
    route: 'Consultation, hygiene care and preventative guidance',
    startingPoint: 'A comprehensive oral-health check',
    accent: 'sapphire',
    icon: HeartPulse,
  },
] as const;

const priorities = [
  { id: 'confidence', title: 'Feel more confident', text: 'A natural-looking result that still feels like you.', icon: Sparkles },
  { id: 'comfort', title: 'Feel at ease', text: 'A gentler, unhurried experience from the first conversation.', icon: HeartPulse },
  { id: 'clarity', title: 'Understand my options', text: 'Clear guidance before deciding about treatment.', icon: CircleDot },
] as const;

const accents = {
  gold: {
    selected: 'border-champagne-gold/60 bg-champagne-gold/[0.12] shadow-[0_24px_68px_rgba(184,152,48,0.17)]',
    icon: 'border-champagne-gold/30 bg-champagne-gold/15 text-gold-pale',
    glow: 'bg-champagne-gold/25',
    label: 'text-gold-pale',
  },
  teal: {
    selected: 'border-teal-light/55 bg-sage-teal/[0.13] shadow-[0_24px_68px_rgba(45,107,92,0.18)]',
    icon: 'border-teal-light/25 bg-sage-teal/20 text-teal-light',
    glow: 'bg-sage-teal/30',
    label: 'text-teal-light',
  },
  sapphire: {
    selected: 'border-sapphire-light/55 bg-sapphire/[0.12] shadow-[0_24px_68px_rgba(41,75,126,0.18)]',
    icon: 'border-sapphire-light/25 bg-sapphire/20 text-sapphire-light',
    glow: 'bg-sapphire/30',
    label: 'text-sapphire-light',
  },
} as const;

export default function SmileRouteBuilder() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goalId, setGoalId] = useState<GoalId | null>(null);
  const [priorityId, setPriorityId] = useState<PriorityId | null>(null);

  const goal = useMemo(() => goals.find((item) => item.id === goalId) ?? goals[0], [goalId]);
  const priority = useMemo(() => priorities.find((item) => item.id === priorityId) ?? priorities[0], [priorityId]);
  const accent = accents[goal.accent];

  const beginConsultation = () => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('refresh-dental-route', JSON.stringify({ goal: goal.title, priority: priority.title }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="smile-route" className="relative isolate overflow-hidden bg-ivory py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_9%_12%,rgba(184,152,48,0.20),transparent_24%),radial-gradient(circle_at_93%_82%,rgba(45,107,92,0.16),transparent_26%),linear-gradient(142deg,#f8f3e9_0%,#efe6d5_50%,#e8f1ec_138%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(32,29,24,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(32,29,24,0.10)_1px,transparent_1px)] [background-size:70px_70px] [mask-image:radial-gradient(ellipse_76%_65%_at_50%_35%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-14 h-24 w-24 border-l border-t border-champagne-gold/65 sm:left-10 lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-14 right-6 h-28 w-28 border-b border-r border-sage-teal/40 sm:right-10 lg:right-16" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-11 bg-champagne-gold sm:w-16" /><span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-sage-teal sm:text-[11px]">Start with what matters to you</span></div>
            <h2 className="max-w-4xl font-cormorant text-[clamp(3.45rem,6.3vw,6.9rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso">Your smile does not need<br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(35,66,60,0.70)] sm:[-webkit-text-stroke:1.4px_rgba(35,66,60,0.70)]">a one-size-fits-all plan.</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="lg:pb-2">
            <p className="max-w-2xl font-jost text-base font-light leading-8 text-espresso/68 sm:text-lg">Tell us what is on your mind. This is not a diagnosis; it is a thoughtful way to discover the kind of conversation that may help you feel ready to begin.</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-jost text-xs text-espresso/56"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage-teal" aria-hidden="true" /> No pressure. No obligation.</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-champagne-gold" aria-hidden="true" /> Your questions come first.</span></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-12 overflow-hidden rounded-[2rem] border border-espresso/10 bg-ivory/70 shadow-[0_30px_95px_rgba(45,39,29,0.12)] backdrop-blur-xl sm:mt-16">
          <div className="flex flex-col border-b border-espresso/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/30 bg-champagne-gold/10 font-cormorant text-xl text-espresso">01</span><div><p className="font-jost text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-teal">The Refresh Route</p><p className="mt-1 font-jost text-sm text-espresso/58">A three-step introduction to a more personal dental visit.</p></div></div>
            <div className="mt-5 flex items-center gap-2 sm:mt-0" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((item) => <span key={item} className={`h-1.5 rounded-full transition-all duration-500 ${item <= step ? 'w-10 bg-champagne-gold' : 'w-6 bg-espresso/12'}`} />)}</div>
          </div>

          <div className="grid min-h-[580px] lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="relative overflow-hidden bg-espresso p-7 text-ivory sm:p-10 lg:p-12">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,152,48,0.28),transparent_27%),radial-gradient(circle_at_100%_80%,rgba(45,107,92,0.35),transparent_36%)]" />
              <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(240,235,225,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.12)_1px,transparent_1px)] [background-size:52px_52px]" />
              <div className="relative flex h-full flex-col justify-between"><div><span className="inline-flex rounded-full border border-ivory/20 bg-ivory/10 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-pale">Your private starting point</span><h3 className="mt-7 max-w-sm font-cormorant text-5xl font-light leading-[0.87] tracking-[-0.045em] sm:text-6xl">The next step feels lighter when it is clear.</h3><p className="mt-6 max-w-sm font-jost text-sm font-light leading-7 text-ivory/72">Choose what matters. We will shape the conversation around that, not around a pre-set package.</p></div>
                <div className="mt-12 space-y-3">{['Choose your goal', 'Name what matters most', 'See your starting point'].map((label, index) => { const current = step === index + 1; const complete = step > index + 1; return <div key={label} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${current ? 'border-champagne-gold/45 bg-ivory/10' : 'border-ivory/10 bg-ivory/[0.035]'}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full font-jost text-[10px] font-bold ${complete ? 'bg-champagne-gold text-espresso' : current ? 'border border-gold-pale text-gold-pale' : 'border border-ivory/25 text-ivory/45'}`}>{complete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span><span className={`font-jost text-xs ${current ? 'text-ivory' : 'text-ivory/55'}`}>{label}</span></div>; })}</div>
              </div>
            </aside>

            <div className="relative bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(246,241,231,0.8))] p-6 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                {step === 1 && <motion.div key="goal" initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 01 / Your intention</span><h3 className="mt-4 max-w-xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] text-espresso sm:text-6xl">What would you most like your smile to do for you?</h3>
                  <div className="mt-9 grid gap-3">{goals.map((item) => { const Icon = item.icon; const selected = item.id === goalId; const itemAccent = accents[item.accent]; return <button key={item.id} type="button" onClick={() => { setGoalId(item.id); setStep(2); }} aria-pressed={selected} className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${selected ? itemAccent.selected : 'border-espresso/12 bg-white/45 hover:-translate-y-0.5 hover:border-espresso/25 hover:bg-white/75'}`}><div aria-hidden="true" className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${itemAccent.glow} ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`} /><div className="relative flex items-start gap-4"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${itemAccent.icon}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="flex-1"><span className={`font-jost text-[10px] font-semibold uppercase tracking-[0.16em] ${itemAccent.label}`}>{item.eyebrow}</span><span className="mt-2 block font-cormorant text-3xl font-light leading-none text-espresso">{item.title}</span><span className="mt-3 block font-jost text-sm leading-6 text-espresso/62">{item.text}</span></span><ArrowRight className="mt-1 h-4 w-4 text-espresso/45 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></div></button>; })}</div>
                </motion.div>}

                {step === 2 && <motion.div key="priority" initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 02 / Your experience</span><h3 className="mt-4 max-w-xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] text-espresso sm:text-6xl">What would make this feel like the right kind of visit?</h3>
                  <div className="mt-9 grid gap-3">{priorities.map((item) => { const Icon = item.icon; const selected = item.id === priorityId; return <button key={item.id} type="button" onClick={() => { setPriorityId(item.id); setStep(3); }} aria-pressed={selected} className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${selected ? 'border-sage-teal/55 bg-sage-teal/[0.10] shadow-[0_20px_55px_rgba(45,107,92,0.12)]' : 'border-espresso/12 bg-white/45 hover:-translate-y-0.5 hover:border-espresso/25 hover:bg-white/75'}`}><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${selected ? 'border-teal-light/35 bg-sage-teal/20 text-sage-teal' : 'border-espresso/12 bg-ivory text-espresso/55'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="flex-1"><span className="block font-cormorant text-3xl font-light leading-none text-espresso">{item.title}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/60">{item.text}</span></span><span className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-sage-teal bg-sage-teal text-ivory' : 'border-espresso/15 text-transparent'}`}><Check className="h-3.5 w-3.5" aria-hidden="true" /></span></button>; })}</div>
                  <button type="button" onClick={() => setStep(1)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-espresso/15 px-5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso/65 transition-colors hover:border-espresso/35 hover:text-espresso"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Change my goal</button>
                </motion.div>}

                {step === 3 && <motion.div key="route" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Step 03 / Your Refresh Route</span><h3 className="mt-4 max-w-2xl font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] text-espresso sm:text-6xl">A calm, personalised place to begin.</h3>
                  <div className="relative mt-8 overflow-hidden rounded-[1.7rem] border border-espresso/12 bg-espresso p-6 text-ivory shadow-[0_26px_70px_rgba(38,32,24,0.24)] sm:p-8"><div aria-hidden="true" className={`absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl ${accent.glow}`} /><div className="relative"><div className="flex flex-wrap items-center justify-between gap-4"><span className={`inline-flex rounded-full border border-ivory/18 bg-ivory/10 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.16em] ${accent.label}`}>{goal.eyebrow}</span><span className="font-jost text-[10px] uppercase tracking-[0.16em] text-ivory/48">Built around your priorities</span></div><p className="mt-6 font-cormorant text-4xl font-light leading-[0.95] sm:text-5xl">Your ideal starting point: <span className="text-gold-pale">{goal.startingPoint}.</span></p><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.055] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">A considered focus</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/75">{goal.route}</p></div><div className="rounded-2xl border border-ivory/12 bg-ivory/[0.055] p-4"><p className="font-jost text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-pale/85">What matters to you</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/75">{priority.text}</p></div></div></div></div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(2)} className="inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-espresso/15 px-5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso/65 transition-colors hover:border-espresso/35 hover:text-espresso"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Refine my route</button><button type="button" onClick={beginConsultation} className="btn-gold-3d group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso">Begin my consultation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></button></div>
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
