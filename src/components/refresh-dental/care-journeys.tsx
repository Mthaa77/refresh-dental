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
type CategoryKey = Exclude<CategoryId, 'all'>

type Palette = {
  accent: string
  soft: string
  ink: string
  glow: string
}

type Treatment = {
  id: string
  title: string
  eyebrow: string
  category: CategoryKey
  summary: string
  detail: string
  duration: string
  image: string
  icon: LucideIcon
  palette: Palette
  highlights: readonly string[]
}

const categoryMeta: Record<CategoryKey, { label: string; short: string; icon: LucideIcon; accent: string }> = {
  smile: { label: 'Smile & aesthetics', short: 'Shape, tone and confidence', icon: Sparkles, accent: '#e6477c' },
  restorative: { label: 'Restorative care', short: 'Strength, comfort and function', icon: Layers3, accent: '#e26b36' },
  essential: { label: 'Essential dentistry', short: 'Healthy foundations, simply explained', icon: HeartPulse, accent: '#0c9a95' },
  surgical: { label: 'Advanced care', short: 'Precision when it matters', icon: ShieldCheck, accent: '#6357d9' },
}

const categories: Array<{ id: CategoryId; label: string; icon: LucideIcon; accent: string }> = [
  { id: 'all', label: 'All pathways', icon: Grid2X2, accent: '#1f2937' },
  ...Object.entries(categoryMeta).map(([id, meta]) => ({ id: id as CategoryKey, label: meta.label, icon: meta.icon, accent: meta.accent })),
]

const treatments: Treatment[] = [
  {
    id: 'consultation',
    title: 'Dental Consultation',
    eyebrow: 'Your clear starting point',
    category: 'essential',
    summary: 'A thoughtful conversation, full oral assessment and a treatment path shaped around your concerns.',
    detail: 'Begin without pressure. Use the consultation to understand what is happening, ask every question and leave with a practical next step.',
    duration: 'Approx. 30 min',
    image: '/images/clinic/environment/modern-operatory.jpg',
    icon: Stethoscope,
    palette: { accent: '#0c9a95', soft: '#d9f7f0', ink: '#08736f', glow: 'rgba(12,154,149,0.28)' },
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
    palette: { accent: '#1c9ca9', soft: '#d9f7ff', ink: '#0b6e7d', glow: 'rgba(28,156,169,0.24)' },
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
    palette: { accent: '#e99a28', soft: '#fff1c9', ink: '#9b5d07', glow: 'rgba(233,154,40,0.25)' },
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
    palette: { accent: '#4389e8', soft: '#dfeeff', ink: '#215aa8', glow: 'rgba(67,137,232,0.25)' },
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
    palette: { accent: '#d64d9a', soft: '#ffe2f1', ink: '#9a2e69', glow: 'rgba(214,77,154,0.23)' },
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
    palette: { accent: '#7d5bdd', soft: '#eee5ff', ink: '#5c3ca8', glow: 'rgba(125,91,221,0.23)' },
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
    palette: { accent: '#e46c39', soft: '#ffeadb', ink: '#a6431f', glow: 'rgba(228,108,57,0.25)' },
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
    palette: { accent: '#d84967', soft: '#ffe0e5', ink: '#9e2945', glow: 'rgba(216,73,103,0.24)' },
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
    palette: { accent: '#5865d8', soft: '#e3e6ff', ink: '#3844a3', glow: 'rgba(88,101,216,0.24)' },
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
    palette: { accent: '#e3a42e', soft: '#fff1c8', ink: '#996b08', glow: 'rgba(227,164,46,0.25)' },
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
    palette: { accent: '#1b9d87', soft: '#d9f6e9', ink: '#08715e', glow: 'rgba(27,157,135,0.24)' },
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
    palette: { accent: '#2f9d9a', soft: '#d9f1ef', ink: '#146a6a', glow: 'rgba(47,157,154,0.23)' },
    highlights: ['Long-term planning', 'Stable restorative options', 'Personalised after-care'],
  },
]

function treatmentIndex(treatment: Treatment) {
  return String(treatments.findIndex((item) => item.id === treatment.id) + 1).padStart(2, '0')
}

export default function CareJourneys() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [selectedId, setSelectedId] = useState(treatments[0].id)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const visibleTreatments = useMemo(
    () => activeCategory === 'all' ? treatments : treatments.filter((treatment) => treatment.category === activeCategory),
    [activeCategory],
  )
  const selectedTreatment = treatments.find((treatment) => treatment.id === selectedId) ?? visibleTreatments[0] ?? treatments[0]
  const SelectedIcon = selectedTreatment.icon
  const selectedCategory = categoryMeta[selectedTreatment.category]

  const selectCategory = (category: CategoryId) => {
    setActiveCategory(category)
    const next = category === 'all' ? treatments[0] : treatments.find((treatment) => treatment.category === category)
    if (next) setSelectedId(next.id)
  }

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 })
  }

  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#fbf8f2] py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-44 top-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#b8f3e7]/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-[36%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[#ffe0ee]/65 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(31,41,55,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(31,41,55,0.045)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,black,transparent)]" />

      <div className="mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="grid gap-10 border-b border-espresso/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20 lg:pb-12">
          <div>
            <div className="flex items-center gap-3"><span className="h-px w-14 bg-gradient-to-r from-[#e6477c] via-[#e99a28] to-[#0c9a95]" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-[#08736f]">The treatment spectrum</span></div>
            <h2 className="type-section-title mt-6 max-w-4xl text-espresso">Your smile has more<br /><span className="bg-gradient-to-r from-[#df477d] via-[#e98e2e] to-[#109c93] bg-clip-text text-transparent">than one direction.</span></h2>
          </div>
          <div className="max-w-lg lg:pb-1">
            <p className="type-body-lead text-espresso/65">Explore care by what you want to feel, change or protect. Pick a pathway and the atlas will bring the right conversation into focus.</p>
            <div className="mt-6 flex flex-wrap gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-espresso/55"><span className="rounded-full border border-espresso/10 bg-white/75 px-3 py-2">12 pathways</span><span className="rounded-full border border-espresso/10 bg-white/75 px-3 py-2">5 care modes</span><span className="rounded-full border border-espresso/10 bg-white/75 px-3 py-2">Consultation first</span></div>
          </div>
        </motion.div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden" role="tablist" aria-label="Treatment categories">
          {categories.map((category) => {
            const Icon = category.icon
            const selected = activeCategory === category.id
            return <button key={category.id} id={`atlas-tab-mobile-${category.id}`} type="button" role="tab" aria-selected={selected} aria-controls="atlas-stage" onClick={() => selectCategory(category.id)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 font-jost text-[10px] font-bold uppercase tracking-[0.13em] transition-all ${selected ? 'border-espresso bg-espresso text-white shadow-[0_12px_25px_rgba(15,13,10,0.17)]' : 'border-espresso/12 bg-white/70 text-espresso/60 hover:border-espresso/30 hover:bg-white'}`}><Icon className="h-4 w-4" aria-hidden="true" />{category.label}</button>
          })}
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[230px_minmax(0,1fr)_274px] xl:items-start">
          <aside className="hidden rounded-[1.8rem] border border-espresso/10 bg-white/70 p-3 shadow-[0_18px_50px_rgba(46,35,24,0.06)] backdrop-blur-xl xl:block" aria-label="Treatment categories">
            <p className="px-3 pb-3 pt-2 font-jost text-[9px] font-bold uppercase tracking-[0.18em] text-espresso/40">Browse by intention</p>
            <div className="space-y-1" role="tablist" aria-orientation="vertical">
              {categories.map((category) => {
                const Icon = category.icon
                const selected = activeCategory === category.id
                return <button key={category.id} id={`atlas-tab-${category.id}`} type="button" role="tab" aria-selected={selected} aria-controls="atlas-stage" onClick={() => selectCategory(category.id)} className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all ${selected ? 'bg-espresso text-white shadow-[0_12px_24px_rgba(15,13,10,0.13)]' : 'text-espresso/55 hover:bg-espresso/[0.05] hover:text-espresso'}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border" style={{ color: selected ? '#fff' : category.accent, borderColor: selected ? 'rgba(255,255,255,0.22)' : `${category.accent}35`, backgroundColor: selected ? 'rgba(255,255,255,0.12)' : `${category.accent}10` }}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="min-w-0"><span className="block font-jost text-[10px] font-bold uppercase tracking-[0.11em]">{category.label}</span><span className={`mt-1 block font-jost text-[10px] leading-4 ${selected ? 'text-white/55' : 'text-espresso/38'}`}>{category.id === 'all' ? 'The complete spectrum' : categoryMeta[category.id].short}</span></span></button>
              })}
            </div>
            <div className="mt-4 rounded-2xl border border-espresso/10 bg-[#fff9e9] p-4"><p className="font-elegant text-2xl font-semibold leading-none text-espresso">Not sure?</p><p className="mt-2 font-jost text-[11px] leading-5 text-espresso/55">Start with the question, not the treatment name.</p><a href="#contact" className="group mt-4 inline-flex items-center gap-2 font-jost text-[9px] font-bold uppercase tracking-[0.14em] text-[#9b5d07]">Talk it through <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a></div>
          </aside>

          <div id="atlas-stage" role="tabpanel" aria-live="polite" aria-labelledby={`atlas-tab-${activeCategory}`} onMouseMove={handlePointerMove} onMouseLeave={() => setPointer({ x: 0, y: 0 })} className="relative min-w-0">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[2.2rem] blur-2xl transition-colors duration-700" style={{ background: selectedTreatment.palette.glow, opacity: 0.38 }} />
            <AnimatePresence mode="wait">
              <motion.article key={selectedTreatment.id} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18, scale: prefersReducedMotion ? 1 : 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12, scale: prefersReducedMotion ? 1 : 0.99 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[2.1rem] border border-white/80 shadow-[0_30px_90px_rgba(46,35,24,0.16)]" style={{ background: `linear-gradient(135deg, ${selectedTreatment.palette.soft} 0%, #fffdf8 56%, #f0ecff 130%)` }}>
                <div aria-hidden="true" className="absolute inset-x-8 top-0 h-1.5 rounded-b-full" style={{ background: `linear-gradient(90deg, ${selectedTreatment.palette.accent}, #e6477c, #e99a28, #0c9a95)` }} />
                <div aria-hidden="true" className="pointer-events-none absolute h-56 w-56 rounded-full blur-3xl transition-transform duration-300" style={{ background: selectedTreatment.palette.glow, left: `calc(50% + ${pointer.x * 80}px)`, top: `calc(28% + ${pointer.y * 50}px)`, opacity: 0.55 }} />
                <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">
                    <Image src={selectedTreatment.image} alt={`${selectedTreatment.title} at Refresh Dental`} fill sizes="(min-width: 1280px) 32vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121516]/85 via-[#121516]/15 to-transparent" />
                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-[#121516]/35 px-3 py-2 font-jost text-[9px] font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: selectedTreatment.palette.accent }} /> Now exploring</div>
                    <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/18 bg-[#121516]/60 p-5 text-white backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-6"><p className="font-jost text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">{selectedCategory.label}</p><p className="mt-2 max-w-sm font-elegant text-3xl font-semibold leading-[0.94] sm:text-4xl">A clearer route to {selectedTreatment.title.toLowerCase()}.</p></div>
                  </div>

                  <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
                    <div className="flex items-start justify-between gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/75 shadow-sm" style={{ color: selectedTreatment.palette.ink, borderColor: `${selectedTreatment.palette.accent}35` }}><SelectedIcon className="h-6 w-6" aria-hidden="true" /></span><span className="rounded-full border border-espresso/10 bg-white/70 px-3 py-2 font-jost text-[9px] font-bold uppercase tracking-[0.14em] text-espresso/48">{treatmentIndex(selectedTreatment)} / 12</span></div>
                    <p className="mt-8 font-jost text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: selectedTreatment.palette.ink }}>{selectedTreatment.eyebrow}</p>
                    <h3 className="mt-3 max-w-xl font-elegant text-[clamp(3rem,5vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-espresso">{selectedTreatment.title}</h3>
                    <p className="mt-6 max-w-xl font-jost text-base font-medium leading-7 text-espresso/70 sm:text-lg">{selectedTreatment.summary}</p>
                    <p className="mt-4 max-w-xl font-jost text-sm leading-7 text-espresso/52">{selectedTreatment.detail}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-2"><span className="rounded-full border border-espresso/10 bg-white/70 px-3 py-2 font-jost text-[10px] font-bold uppercase tracking-[0.13em] text-espresso/56">{selectedTreatment.duration}</span><span className="rounded-full border border-espresso/10 bg-white/70 px-3 py-2 font-jost text-[10px] font-bold uppercase tracking-[0.13em] text-espresso/56">Consultation first</span></div>
                    <div className="mt-7 grid gap-2 sm:grid-cols-3">{selectedTreatment.highlights.map((highlight) => <div key={highlight} className="rounded-2xl border border-espresso/10 bg-white/65 p-3.5"><Check className="h-4 w-4" style={{ color: selectedTreatment.palette.accent }} aria-hidden="true" /><p className="mt-2 font-jost text-[11px] font-semibold leading-5 text-espresso/60">{highlight}</p></div>)}</div>
                    <div className="mt-auto flex flex-col gap-4 border-t border-espresso/10 pt-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs font-jost text-[11px] leading-5 text-espresso/45">Suitability, timing and cost are confirmed in a professional consultation.</p><a href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_16px_30px_rgba(15,13,10,0.16)] transition hover:-translate-y-0.5" style={{ backgroundColor: selectedTreatment.palette.ink }}>Discuss this pathway <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a></div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <aside className="rounded-[1.8rem] border border-espresso/10 bg-white/75 p-3 shadow-[0_18px_50px_rgba(46,35,24,0.06)] backdrop-blur-xl" aria-label="Treatment pathway list">
            <div className="flex items-center justify-between px-3 pb-3 pt-2"><div><p className="font-jost text-[9px] font-bold uppercase tracking-[0.18em] text-espresso/40">Pathway map</p><p className="mt-1 font-jost text-[11px] text-espresso/45">Choose a treatment to preview</p></div><span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-[10px] font-bold text-white">{visibleTreatments.length}</span></div>
            <div className="grid max-h-[566px] gap-2 overflow-y-auto pr-1 [scrollbar-color:rgba(31,41,55,0.18)_transparent] sm:grid-cols-2 xl:grid-cols-1">
              {visibleTreatments.map((treatment) => { const Icon = treatment.icon; const selected = treatment.id === selectedTreatment.id; return <motion.button key={treatment.id} type="button" aria-label={`Preview ${treatment.title}`} aria-pressed={selected} onClick={() => setSelectedId(treatment.id)} whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }} className={`group relative flex min-h-[78px] items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all ${selected ? 'border-espresso/15 bg-espresso text-white shadow-[0_12px_24px_rgba(15,13,10,0.14)]' : 'border-espresso/8 bg-white/55 text-espresso hover:border-espresso/18 hover:bg-white'}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border" style={{ color: selected ? '#fff' : treatment.palette.ink, borderColor: selected ? 'rgba(255,255,255,0.2)' : `${treatment.palette.accent}35`, backgroundColor: selected ? 'rgba(255,255,255,0.10)' : treatment.palette.soft }}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className={`block font-jost text-[8px] font-bold uppercase tracking-[0.13em] ${selected ? 'text-white/48' : 'text-espresso/38'}`}>{treatmentIndex(treatment)} · {treatment.eyebrow}</span><span className={`mt-1 block font-elegant text-lg font-semibold leading-[0.94] ${selected ? 'text-white' : 'text-espresso'}`}>{treatment.title}</span></span><ChevronRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${selected ? 'text-white/55' : 'text-espresso/25'}`} aria-hidden="true" /></motion.button> })}
            </div>
          </aside>
        </div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.12, duration: 0.6 }} className="mt-6 overflow-hidden rounded-[1.5rem] border border-espresso/10 bg-gradient-to-r from-[#fff0c7] via-[#ffe5f1] to-[#dff8f1] p-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-6"><div><p className="font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-espresso/48">The easiest place to begin</p><p className="mt-2 font-elegant text-2xl font-semibold leading-none text-espresso sm:text-3xl">Bring the concern. We&apos;ll help name the next step.</p></div><a href="#contact" className="group mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-5 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#08736f] sm:mt-0">Start with a conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a></motion.div>
      </div>
    </section>
  )
}
