'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ConfidenceSignal = {
  eyebrow: string
  title: string
  short: string
  detail: string
  proof: string
  icon: LucideIcon
  accent: string
  tint: string
}

const signals: ConfidenceSignal[] = [
  {
    eyebrow: 'Start gently',
    title: 'A first step with no pressure',
    short: 'Bring the question, not a perfect plan.',
    detail: 'Your consultation is a calm space to talk through what you are feeling, what you want to change and which options are worth considering before anything is booked.',
    proof: 'Consultation before commitment',
    icon: HeartHandshake,
    accent: 'text-teal-700',
    tint: 'bg-teal-50 border-teal-200',
  },
  {
    eyebrow: 'See the plan',
    title: 'Clear options, beautifully explained',
    short: 'Understand the why, timing and next step.',
    detail: 'We translate clinical recommendations into plain language, with realistic timelines and room for your questions so you can decide with confidence.',
    proof: 'Personalised treatment pathways',
    icon: ClipboardCheck,
    accent: 'text-sky-700',
    tint: 'bg-sky-50 border-sky-200',
  },
  {
    eyebrow: 'Know the options',
    title: 'Less surprise, more clarity',
    short: 'Talk through cover and payment before care.',
    detail: 'Our team can help you understand medical-aid benefits and explore interest-free payment plans through Athena before treatment begins.',
    proof: 'Cover and payment guidance',
    icon: ShieldCheck,
    accent: 'text-amber-700',
    tint: 'bg-amber-50 border-amber-200',
  },
  {
    eyebrow: 'Stay supported',
    title: 'A team that keeps the thread',
    short: 'From your first message to after-care.',
    detail: 'Ask a question by phone, WhatsApp or email and we will help you find the right route, including same-day guidance for urgent dental concerns.',
    proof: 'Friendly human support',
    icon: CalendarCheck2,
    accent: 'text-rose-700',
    tint: 'bg-rose-50 border-rose-200',
  },
]

export default function PatientConfidence() {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = signals[activeIndex]
  const ActiveIcon = active.icon

  return (
    <section id="confidence" className="relative isolate overflow-hidden border-y border-[#ded7c9] bg-[#f7f3eb] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-16 -z-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-0 -z-10 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(43,35,29,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(43,35,29,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_72%_68%_at_50%_42%,black,transparent)]" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:gap-20">
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3"><span className="h-px w-12 bg-gradient-to-r from-teal-600 to-amber-500" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800">The confidence layer</span></div>
            <h2 className="type-section-title mt-6 max-w-2xl text-espresso">Feel clear before you commit.</h2>
            <p className="type-body-lead mt-6 max-w-xl text-espresso/65">Premium care should feel considered from the first hello. Here is what you can expect before, during and after your next step.</p>
            <a href="#contact" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-espresso px-6 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-ivory shadow-[0_18px_34px_rgba(24,21,17,0.18)] transition hover:-translate-y-0.5 hover:bg-teal-800">Start a calm conversation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.08, duration: 0.7 }} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {signals.map((signal, index) => {
              const Icon = signal.icon
              const selected = activeIndex === index
              return (
                <motion.button key={signal.title} type="button" role="tab" aria-selected={selected} aria-controls={`confidence-panel-${index}`} onClick={() => setActiveIndex(index)} whileHover={prefersReducedMotion ? undefined : { y: -5 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }} className={`group relative min-h-[150px] rounded-[1.35rem] border p-4 text-left transition-all duration-300 sm:min-h-[174px] sm:p-5 ${selected ? `${signal.tint} shadow-[0_18px_40px_rgba(38,31,23,0.11)]` : 'border-espresso/10 bg-white/55 hover:border-espresso/20 hover:bg-white/80'}`}>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-white/70 ${selected ? signal.accent : 'border-espresso/10 text-espresso/50'}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                  <span className={`mt-5 block font-jost text-[9px] font-bold uppercase tracking-[0.15em] ${selected ? signal.accent : 'text-espresso/45'}`}>{String(index + 1).padStart(2, '0')} · {signal.eyebrow}</span>
                  <span className="mt-1.5 block font-elegant text-xl font-semibold leading-[0.95] text-espresso sm:text-2xl">{signal.title}</span>
                  {selected && <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-current opacity-45" aria-hidden="true" />}
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-espresso/10 bg-espresso text-ivory shadow-[0_28px_80px_rgba(24,21,17,0.18)] lg:grid-cols-[0.9fr_1.1fr]" role="tabpanel" id={`confidence-panel-${activeIndex}`} aria-live="polite">
          <div className="relative min-h-[260px] overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(45,212,191,0.3),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(251,191,36,0.24),transparent_32%),linear-gradient(140deg,#15221e,#172a2c 55%,#201a26)] p-7 sm:min-h-[300px] sm:p-10">
            <div aria-hidden="true" className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/15" />
            <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-teal-200/20" />
            <AnimatePresence mode="wait">
              <motion.div key={active.title} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }} transition={{ duration: 0.3 }} className="relative flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 font-jost text-[9px] font-bold uppercase tracking-[0.16em] text-teal-100"><ActiveIcon className="h-3.5 w-3.5" aria-hidden="true" /> {active.eyebrow}</span>
                  <p className="mt-8 max-w-md font-elegant text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.88] tracking-[-0.045em] text-white">{active.title}</p>
                </div>
                <p className="mt-10 font-jost text-[10px] font-bold uppercase tracking-[0.17em] text-amber-100/80">{active.proof}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-between bg-[#fffdf8] p-7 text-espresso sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={active.detail} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }} transition={{ duration: 0.3 }}>
                <p className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">Why it matters</p>
                <p className="mt-5 max-w-xl font-jost text-lg leading-8 text-espresso/70 sm:text-xl sm:leading-9">{active.detail}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {['A real person to guide you', 'Clear next-step language', 'Time to ask every question', 'Care shaped around you'].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-espresso/10 bg-white/70 px-4 py-3 font-jost text-xs font-semibold text-espresso/65"><Check className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />{item}</div>)}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-9 flex items-center justify-between gap-4 border-t border-espresso/10 pt-6"><span className="font-jost text-xs text-espresso/45">{String(activeIndex + 1).padStart(2, '0')} / {String(signals.length).padStart(2, '0')}</span><a href="#contact" className="group inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-teal-700 hover:text-espresso">Ask a question <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a></div>
          </div>
        </div>
      </div>
    </section>
  )
}
