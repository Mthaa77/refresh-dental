'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Heart,
  PartyPopper,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import DentalToothMark from './dental-tooth-mark';

const steps = [
  {
    number: '01',
    title: 'Book your visit',
    short: 'Choose a time that works for real life.',
    description: 'Book online, by phone or WhatsApp. Our friendly team will help you find a time that feels easy, not stressful.',
    duration: 'A few minutes',
    image: '/images/clinic/environment/modern-operatory.jpg',
    alt: 'Refresh Dental clinic in Centurion',
    icon: CalendarDays,
    card: 'border-amber-300 bg-amber-50 shadow-[0_16px_40px_rgba(217,119,6,0.12)]',
    iconStyle: 'border-amber-200 bg-amber-100 text-amber-600',
    chip: 'bg-amber-100 text-amber-700',
    glow: 'bg-amber-300/25',
    label: 'Your first hello',
  },
  {
    number: '02',
    title: 'Meet Dr. Malunga',
    short: 'Tell us what is on your mind.',
    description: 'This is a calm, unhurried conversation where your concerns, goals and comfort come first.',
    duration: 'Around 30 minutes',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    alt: 'Dental consultation at Refresh Dental',
    icon: Stethoscope,
    card: 'border-teal-300 bg-teal-50 shadow-[0_16px_40px_rgba(13,148,136,0.12)]',
    iconStyle: 'border-teal-200 bg-teal-100 text-teal-600',
    chip: 'bg-teal-100 text-teal-700',
    glow: 'bg-teal-300/25',
    label: 'A listening visit',
  },
  {
    number: '03',
    title: 'See your options',
    short: 'Understand the route before deciding.',
    description: 'We explain suitable care pathways, expected timing and the practical questions that matter to you.',
    duration: 'At your pace',
    image: '/images/clinic/team/thandi-mokoena-hygienist.jpg',
    alt: 'Refresh Dental team member discussing care options',
    icon: ClipboardList,
    card: 'border-sky-300 bg-sky-50 shadow-[0_16px_40px_rgba(2,132,199,0.12)]',
    iconStyle: 'border-sky-200 bg-sky-100 text-sky-600',
    chip: 'bg-sky-100 text-sky-700',
    glow: 'bg-sky-300/25',
    label: 'Clearer choices',
  },
  {
    number: '04',
    title: 'Receive gentle care',
    short: 'Modern dentistry with a gentler touch.',
    description: 'When you are ready, treatment is delivered with clinical care, clear communication and attention to comfort.',
    duration: 'Tailored to you',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    alt: 'Professional dental treatment at Refresh Dental',
    icon: Heart,
    card: 'border-rose-300 bg-rose-50 shadow-[0_16px_40px_rgba(244,63,94,0.12)]',
    iconStyle: 'border-rose-200 bg-rose-100 text-rose-500',
    chip: 'bg-rose-100 text-rose-700',
    glow: 'bg-rose-300/25',
    label: 'Care in action',
  },
  {
    number: '05',
    title: 'Enjoy your smile',
    short: 'Leave with a plan you feel good about.',
    description: 'You will know what happens next, how to care for your smile, and where the Refresh Dental team can support you.',
    duration: 'Long-term confidence',
    image: '/images/clinic/team/staff-collaboration.jpg',
    alt: 'Refresh Dental team celebrating a patient smile journey',
    icon: PartyPopper,
    card: 'border-violet-300 bg-violet-50 shadow-[0_16px_40px_rgba(124,58,237,0.12)]',
    iconStyle: 'border-violet-200 bg-violet-100 text-violet-600',
    chip: 'bg-violet-100 text-violet-700',
    glow: 'bg-violet-300/25',
    label: 'Your smile story',
  },
] as const;

export default function FriendlyTreatmentProcess() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="process" className="relative isolate overflow-hidden bg-[#f8fbf8] py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_16%,rgba(251,191,36,0.18),transparent_22%),radial-gradient(circle_at_90%_20%,rgba(125,211,252,0.20),transparent_25%),radial-gradient(circle_at_72%_88%,rgba(45,212,191,0.16),transparent_24%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(35,66,60,0.26)_1px,transparent_1px)] [background-size:15px_15px]" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <motion.header
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-teal-200 bg-white text-teal-600 shadow-[0_16px_36px_rgba(13,148,136,0.13)]"><DentalToothMark className="h-8 w-8" aria-hidden="true" /></span>
          <p className="mt-6 font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">A calm path from hello to confidence</p>
          <h2 className="mt-4 font-cormorant text-[clamp(3.5rem,6.4vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso [text-shadow:0_8px_28px_rgba(45,107,92,0.12)]">
            Your smile journey,<br />
            <span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.14)]">made wonderfully clear.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-jost text-base font-light leading-8 text-espresso/67 sm:text-lg">No rush, no jargon and no pressure. Explore each part of the Refresh Dental experience and see how a first visit can feel.</p>
        </motion.header>

        <div className="mt-12 grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:gap-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_24px_70px_rgba(43,68,55,0.12)] backdrop-blur-xl sm:p-5"
          >
            <div aria-hidden="true" className={`absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl ${active.glow}`} />
            <AnimatePresence mode="wait">
              <motion.div key={active.number} initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="relative">
                <div className="relative aspect-[1.08/0.88] overflow-hidden rounded-[1.55rem] border border-white bg-sand shadow-[0_16px_42px_rgba(35,66,60,0.13)]">
                  <Image src={active.image} alt={active.alt} fill sizes="(min-width: 1280px) 45vw, 100vw" className="object-cover" priority={activeIndex === 0} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,10,0.02)_0%,rgba(15,13,10,0.08)_50%,rgba(15,13,10,0.58)_100%)]" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7"><span className={`rounded-full px-3 py-1.5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] ${active.chip}`}>{active.label}</span><span className="rounded-full border border-white/35 bg-espresso/45 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">Step {active.number}</span></div>
                </div>
                <div className="mt-6 flex items-center gap-3"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${active.iconStyle}`}><ActiveIcon className="h-5 w-5" aria-hidden="true" /></span><span><span className="block font-jost text-[10px] font-bold uppercase tracking-[0.17em] text-teal-700">{active.duration}</span><span className="mt-1 block font-cormorant text-3xl font-light leading-none text-espresso">{active.title}</span></span></div>
                <p className="mt-5 max-w-xl font-jost text-base font-light leading-8 text-espresso/66">{active.description}</p>
                <div className="mt-6 flex items-center gap-2 font-jost text-sm text-espresso/58"><Check className="h-4 w-4 text-teal-600" aria-hidden="true" /> Your questions are always welcome.</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3"
            role="tablist"
            aria-label="Your Refresh Dental visit steps"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const selected = index === activeIndex;
              return (
                <button key={step.number} type="button" role="tab" aria-selected={selected} onClick={() => setActiveIndex(index)} className={`group relative flex items-center gap-4 overflow-hidden rounded-[1.45rem] border p-4 text-left transition-all duration-300 sm:p-5 ${selected ? step.card : 'border-espresso/10 bg-white/60 shadow-[0_10px_28px_rgba(35,66,60,0.06)] hover:-translate-y-0.5 hover:border-espresso/20 hover:bg-white'}`}>
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${selected ? step.iconStyle : 'border-espresso/10 bg-ivory text-espresso/52'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1"><span className="font-jost text-[9px] font-bold uppercase tracking-[0.16em] text-espresso/48">Step {step.number}</span><span className="mt-1 block font-cormorant text-3xl font-light leading-none text-espresso">{step.title}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/60">{step.short}</span></span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border font-jost text-[10px] font-bold transition-all duration-300 ${selected ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/12 text-espresso/45 group-hover:border-teal-300 group-hover:text-teal-700'}`}>{index + 1}</span>
                </button>
              );
            })}
            <a href="#contact" className="group mt-3 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-espresso px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-ivory shadow-[0_16px_32px_rgba(15,13,10,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700">Start with a conversation <ArrowRight className="h-4 w-4 text-gold-pale transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            ['A calmer first visit', 'We move at a pace that respects you.', Heart],
            ['Clear practical guidance', 'Care choices and questions are welcome.', ClipboardList],
            ['A smile worth celebrating', 'Your confidence is part of the outcome.', Sparkles],
          ].map(([title, detail, Icon]) => (
            <div key={title as string} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-[0_10px_24px_rgba(35,66,60,0.06)]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Icon className="h-4 w-4" aria-hidden="true" /></span><span><span className="font-jost text-xs font-bold uppercase tracking-[0.12em] text-espresso">{title}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/59">{detail}</span></span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
