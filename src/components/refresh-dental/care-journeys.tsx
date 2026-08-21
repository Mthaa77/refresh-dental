'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Bone,
  Check,
  ChevronRight,
  CircleDot,
  Droplets,
  Grid2X2,
  HeartPulse,
  Layers3,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  WandSparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type CategoryId = 'all' | 'smile' | 'restorative' | 'essential' | 'surgical'
type ToneId = 'amber' | 'rose' | 'teal' | 'sky' | 'violet'

type Treatment = {
  id: string
  title: string
  eyebrow: string
  category: Exclude<CategoryId, 'all'>
  summary: string
  detail: string
  duration: string
  image: string
  icon: LucideIcon
  tone: ToneId
  highlights: readonly string[]
}

const categories = [
  { id: 'all', label: 'All offerings', icon: Grid2X2 },
  { id: 'smile', label: 'Smile & aesthetics', icon: Sparkles },
  { id: 'restorative', label: 'Restorative care', icon: Layers3 },
  { id: 'essential', label: 'Essential dentistry', icon: HeartPulse },
  { id: 'surgical', label: 'Advanced care', icon: ShieldCheck },
] as const

const treatments: Treatment[] = [
  {
    id: 'consultation',
    title: 'Dental Consultation',
    eyebrow: 'Your clear starting point',
    category: 'essential',
    summary: 'A thoughtful conversation, full oral assessment and a treatment path shaped around your concerns.',
    detail: 'Begin without pressure. The consultation creates space to understand what is happening, ask every question and leave with a practical next step.',
    duration: 'Approx. 30 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: Stethoscope,
    tone: 'sky',
    highlights: ['Full oral assessment', 'Questions welcomed', 'Clear next-step guidance'],
  },
  {
    id: 'hygiene',
    title: 'Scaling & Polishing',
    eyebrow: 'Professional hygiene',
    category: 'essential',
    summary: 'A refreshing professional clean that supports healthier gums and a brighter-feeling smile.',
    detail: 'Regular hygiene care helps protect the foundation of your smile while giving you personalised guidance for daily oral health.',
    duration: 'Approx. 30 min',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    icon: Droplets,
    tone: 'teal',
    highlights: ['Gum-health focus', 'Fresh polished finish', 'Preventive guidance'],
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    eyebrow: 'Cosmetic dentistry',
    category: 'smile',
    summary: 'Professional whitening options planned around your goals, lifestyle and sensitivity needs.',
    detail: 'Explore a brighter smile through a clinically guided approach, with realistic expectations and after-care explained before treatment.',
    duration: 'Approx. 60 min',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    icon: Sparkles,
    tone: 'amber',
    highlights: ['Shade-led planning', 'Sensitivity considered', 'After-care guidance'],
  },
  {
    id: 'aligners',
    title: 'Aligners & Slimming Wires',
    eyebrow: 'Discreet alignment',
    category: 'smile',
    summary: 'Comfort-conscious alignment options for a more balanced smile with less visual interruption.',
    detail: 'Your smile is assessed first, then suitable alignment routes are explained clearly so you understand the commitment and expected journey.',
    duration: 'Assessment from 30 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: ScanFace,
    tone: 'sky',
    highlights: ['Goal-based assessment', 'Discreet options', 'Step-by-step planning'],
  },
  {
    id: 'crowns-veneers',
    title: 'Crowns & Veneers',
    eyebrow: 'Smile transformation',
    category: 'smile',
    summary: 'Custom restorative and cosmetic options for shape, tone, strength and renewed confidence.',
    detail: 'A design-led consultation explores the details that matter to you before any recommendation is made.',
    duration: 'Planning from 60 min',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    icon: WandSparkles,
    tone: 'rose',
    highlights: ['Tailored smile design', 'Shape and shade planning', 'Restorative precision'],
  },
  {
    id: 'facial-aesthetics',
    title: 'Fillers & Neurotoxins',
    eyebrow: 'Facial aesthetics',
    category: 'smile',
    summary: 'Subtle aesthetic treatments designed to complement rather than overpower your natural features.',
    detail: 'A calm, personalised consultation aligns your goals with a refined and balanced treatment approach.',
    duration: 'Approx. 60 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: CircleDot,
    tone: 'violet',
    highlights: ['Personalised consultation', 'Subtle enhancement', 'Balanced planning'],
  },
  {
    id: 'restorations',
    title: 'Dental Restorations',
    eyebrow: 'Repair with precision',
    category: 'restorative',
    summary: 'Tooth-coloured restorative care designed to bring comfort, function and natural balance back.',
    detail: 'The health and structure of the tooth are considered first, followed by a restoration plan that feels appropriate and clearly explained.',
    duration: 'From 30 min',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    icon: Layers3,
    tone: 'amber',
    highlights: ['Tooth-coloured options', 'Function-first planning', 'Natural appearance'],
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    eyebrow: 'Tooth-preserving care',
    category: 'surgical',
    summary: 'Advanced care focused on relieving discomfort and helping preserve a compromised tooth.',
    detail: 'Treatment is explained carefully before it begins, with attention to comfort, precision and preserving your natural tooth where possible.',
    duration: 'Approx. 90 min',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    icon: Bone,
    tone: 'rose',
    highlights: ['Comfort-led care', 'Clear explanation', 'Tooth-preserving approach'],
  },
  {
    id: 'wisdom-teeth',
    title: 'Wisdom Teeth Removal',
    eyebrow: 'Planned extraction care',
    category: 'surgical',
    summary: 'A carefully planned extraction experience with guidance before, during and after your visit.',
    detail: 'The team assesses the safest route for your needs and makes sure the recovery and after-care process feels clear.',
    duration: 'Approx. 60 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: ShieldCheck,
    tone: 'sky',
    highlights: ['Pre-treatment assessment', 'Guided after-care', 'Recovery advice'],
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    eyebrow: 'Tooth replacement',
    category: 'surgical',
    summary: 'A consultation-led path to restoring the look, feel and everyday function of a missing tooth.',
    detail: 'Your implant journey begins with detailed planning around oral health, comfort, timing and the long-term result you want to protect.',
    duration: 'Planning from 90 min',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    icon: BadgeCheck,
    tone: 'amber',
    highlights: ['Consultation-led planning', 'Natural-looking restoration', 'Clear treatment timeline'],
  },
  {
    id: 'prosthesis',
    title: 'Dental Prosthesis',
    eyebrow: 'Comfort & function',
    category: 'restorative',
    summary: 'Precision-crafted prosthetic options designed around fit, ease and a more natural appearance.',
    detail: 'Comfort and day-to-day function are considered alongside your smile goals to shape a restorative option that fits your life.',
    duration: 'Assessment from 30 min',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    icon: HeartPulse,
    tone: 'teal',
    highlights: ['Comfort-led fitting', 'Function-focused care', 'Natural-looking finish'],
  },
  {
    id: 'fixed-prosthesis',
    title: 'Fixed Dental Prosthesis',
    eyebrow: 'Long-term restoration',
    category: 'restorative',
    summary: 'Fixed restorative solutions designed to rebuild everyday function with a confident, natural feel.',
    detail: 'Your specific needs guide the treatment route, materials and after-care plan, all explained in straightforward language.',
    duration: 'Planning from 90 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: Layers3,
    tone: 'teal',
    highlights: ['Long-term planning', 'Stable restorative options', 'Personalised after-care'],
  },
]

const toneClasses: Record<ToneId, { badge: string; glow: string; accent: string; selected: string }> = {
  amber: {
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    glow: 'bg-amber-300/30',
    accent: 'from-amber-300 via-orange-300 to-rose-300',
    selected: 'border-amber-300 bg-amber-50/95 shadow-[0_18px_44px_rgba(217,119,6,0.14)]',
  },
  rose: {
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
    glow: 'bg-rose-300/30',
    accent: 'from-rose-300 via-pink-300 to-violet-300',
    selected: 'border-rose-300 bg-rose-50/95 shadow-[0_18px_44px_rgba(225,29,72,0.13)]',
  },
  teal: {
    badge: 'border-teal-200 bg-teal-50 text-teal-700',
    glow: 'bg-teal-300/30',
    accent: 'from-teal-300 via-emerald-300 to-sky-300',
    selected: 'border-teal-300 bg-teal-50/95 shadow-[0_18px_44px_rgba(13,148,136,0.13)]',
  },
  sky: {
    badge: 'border-sky-200 bg-sky-50 text-sky-700',
    glow: 'bg-sky-300/30',
    accent: 'from-sky-300 via-blue-300 to-violet-300',
    selected: 'border-sky-300 bg-sky-50/95 shadow-[0_18px_44px_rgba(2,132,199,0.13)]',
  },
  violet: {
    badge: 'border-violet-200 bg-violet-50 text-violet-700',
    glow: 'bg-violet-300/30',
    accent: 'from-violet-300 via-fuchsia-300 to-rose-300',
    selected: 'border-violet-300 bg-violet-50/95 shadow-[0_18px_44px_rgba(124,58,237,0.13)]',
  },
}

export default function CareJourneys() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [selectedId, setSelectedId] = useState(treatments[0].id)

  const visibleTreatments = useMemo(
    () => activeCategory === 'all' ? treatments : treatments.filter((treatment) => treatment.category === activeCategory),
    [activeCategory],
  )

  const selectedTreatment = treatments.find((treatment) => treatment.id === selectedId) ?? visibleTreatments[0] ?? treatments[0]
  const SelectedIcon = selectedTreatment.icon
  const selectedTone = toneClasses[selectedTreatment.tone]
  const selectedIndex = treatments.findIndex((treatment) => treatment.id === selectedTreatment.id)

  const selectCategory = (category: CategoryId) => {
    setActiveCategory(category)
    const firstTreatment = category === 'all' ? treatments[0] : treatments.find((treatment) => treatment.category === category)
    if (firstTreatment) setSelectedId(firstTreatment.id)
  }

  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#100d16] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_12%,rgba(251,191,36,0.24),transparent_24%),radial-gradient(circle_at_94%_20%,rgba(56,189,248,0.22),transparent_25%),radial-gradient(circle_at_78%_88%,rgba(244,114,182,0.20),transparent_25%),linear-gradient(145deg,#100d16_0%,#13231e_52%,#17142b_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_42%,black,transparent)]" />

      <div className="mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-white/12 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.72 }}>
            <div className="flex items-center gap-3"><span className="h-px w-14 bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.25em] text-amber-100">The treatment atlas</span></div>
            <h2 className="mt-6 max-w-5xl font-elegant text-[clamp(3.8rem,7vw,7.8rem)] font-medium leading-[0.82] tracking-[-0.055em] text-white">Every offering.<br /><span className="bg-gradient-to-r from-amber-200 via-rose-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_14px_35px_rgba(244,114,182,0.16)]">Beautifully organised.</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.08, duration: 0.72 }} className="lg:pb-2">
            <p className="max-w-2xl font-jost text-base font-light leading-8 text-white/70 sm:text-lg">Explore the full Refresh Dental offering without the usual catalogue clutter. Choose a category, compare treatments and open the conversation that fits your smile.</p>
            <div className="mt-6 flex flex-wrap gap-3 font-jost text-xs text-white/58"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-teal-300" aria-hidden="true" /> Twelve treatment pathways</span><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-300" aria-hidden="true" /> Consultation before commitment</span></div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { value: '12', label: 'care pathways', tone: 'text-amber-200' },
            { value: '03', label: 'ways to begin', tone: 'text-teal-200' },
            { value: '01', label: 'calm next step', tone: 'text-sky-200' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-md sm:px-5">
              <p className={`font-elegant text-3xl leading-none ${stat.tone}`}>{stat.value}</p>
              <p className="mt-1.5 font-jost text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Treatment categories">
          {categories.map((category) => {
            const Icon = category.icon
            const selected = category.id === activeCategory
            return (
              <button key={category.id} id={`treatment-tab-${category.id}`} type="button" role="tab" aria-selected={selected} aria-controls={`treatment-panel-${category.id}`} onClick={() => selectCategory(category.id)} className={`group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-5 font-jost text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${selected ? 'border-white bg-white text-[#17121c] shadow-[0_14px_34px_rgba(255,255,255,0.16)]' : 'border-white/14 bg-white/[0.055] text-white/68 hover:border-white/30 hover:bg-white/[0.10] hover:text-white'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {category.label}
                {selected && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 px-1 font-jost text-[10px] font-bold uppercase tracking-[0.17em] text-white/40">
          <span>{visibleTreatments.length} {visibleTreatments.length === 1 ? 'pathway' : 'pathways'} in this view</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Select a card to preview</span>
        </div>

        <div className="mt-3 grid gap-7 xl:grid-cols-[0.72fr_1.28fr] xl:items-stretch">
          <div id={`treatment-panel-${activeCategory}`} role="tabpanel" aria-labelledby={`treatment-tab-${activeCategory}`} className="rounded-[2rem] border border-white/12 bg-white/[0.055] p-3 backdrop-blur-xl sm:p-4">
            <div className="grid max-h-[760px] gap-2 overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.18)_transparent] sm:grid-cols-2 xl:grid-cols-1">
              {visibleTreatments.map((treatment, index) => {
                const Icon = treatment.icon
                const tone = toneClasses[treatment.tone]
                const selected = treatment.id === selectedTreatment.id
                return (
                  <motion.button key={treatment.id} type="button" aria-label={`Preview ${treatment.title}`} aria-pressed={selected} onClick={() => setSelectedId(treatment.id)} whileHover={prefersReducedMotion ? undefined : { y: -3 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }} className={`group relative flex items-center gap-4 overflow-hidden rounded-[1.35rem] border p-4 text-left transition-all duration-300 sm:p-5 ${selected ? tone.selected : 'border-white/8 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.08]'}`}>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${tone.badge}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1"><span className={`block font-jost text-[9px] font-bold uppercase tracking-[0.16em] ${selected ? 'text-[#17121c]/55' : 'text-white/40'}`}>{String(index + 1).padStart(2, '0')} · {treatment.eyebrow}</span><span className={`mt-1.5 block font-elegant text-xl font-semibold leading-tight sm:text-2xl ${selected ? 'text-[#17121c]' : 'text-white'}`}>{treatment.title}</span><span className={`mt-2 block font-jost text-[10px] leading-4 ${selected ? 'text-[#17121c]/56' : 'text-white/42'}`}>{treatment.duration}</span></span>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${selected ? 'text-[#17121c]/55' : 'text-white/35'}`} aria-hidden="true" />
                    {selected && <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-teal-500" aria-hidden="true" />}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={selectedTreatment.id} id="treatment-preview" aria-live="polite" initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -14 }} transition={{ duration: 0.35 }} className="relative overflow-hidden rounded-[2.2rem] border border-white/14 bg-[#fdf8f0] text-[#211a20] shadow-[0_34px_100px_rgba(0,0,0,0.32)]">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${selectedTone.accent}`} />
              <div className="grid h-full lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
                  <Image src={selectedTreatment.image} alt={`${selectedTreatment.title} at Refresh Dental`} fill sizes="(min-width: 1280px) 40vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17121c]/82 via-[#17121c]/12 to-transparent" />
                  <div className={`absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl ${selectedTone.glow}`} aria-hidden="true" />
                  <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] border border-white/18 bg-[#17121c]/62 p-5 text-white backdrop-blur-xl sm:inset-x-8 sm:bottom-8">
                    <p className="font-jost text-[9px] font-bold uppercase tracking-[0.18em] text-white/56">Selected treatment</p>
                    <p className="mt-2 font-elegant text-3xl font-semibold leading-none sm:text-4xl">{selectedTreatment.title}</p>
                    <p className="mt-3 font-jost text-xs text-white/62">{selectedTreatment.duration}</p>
                  </div>
                </div>

                <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="flex items-start justify-between gap-5">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm ${selectedTone.badge}`}><SelectedIcon className="h-6 w-6" aria-hidden="true" /></span>
                    <span className="rounded-full border border-[#211a20]/10 bg-white px-3 py-1.5 font-jost text-[9px] font-bold uppercase tracking-[0.14em] text-[#211a20]/54">{String(selectedIndex + 1).padStart(2, '0')} / 12 · {selectedTreatment.category}</span>
                  </div>
                  <p className="mt-8 font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">{selectedTreatment.eyebrow}</p>
                  <h3 className="mt-3 font-elegant text-[clamp(3rem,5vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-[#211a20]">{selectedTreatment.title}</h3>
                  <p className="mt-6 font-jost text-base font-medium leading-7 text-[#211a20]/72 sm:text-lg">{selectedTreatment.summary}</p>
                  <p className="mt-4 font-jost text-sm leading-7 text-[#211a20]/58">{selectedTreatment.detail}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {selectedTreatment.highlights.map((highlight) => <div key={highlight} className="rounded-2xl border border-[#211a20]/9 bg-white/75 p-4"><Check className="h-4 w-4 text-teal-600" aria-hidden="true" /><p className="mt-3 font-jost text-xs font-semibold leading-5 text-[#211a20]/68">{highlight}</p></div>)}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-[#211a20]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm font-jost text-xs leading-5 text-[#211a20]/50">Treatment suitability and timing are confirmed during a professional consultation.</p>
                    <a href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#17121c] px-6 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_15px_34px_rgba(23,18,28,0.22)] transition hover:-translate-y-0.5 hover:bg-teal-700">Discuss this treatment <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-white/12 bg-white/[0.045] px-5 py-4 font-jost text-xs text-white/56 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Not sure which treatment name fits what you are experiencing?</span>
          <a href="#contact" className="group inline-flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-amber-200 hover:text-white">Start with a consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
