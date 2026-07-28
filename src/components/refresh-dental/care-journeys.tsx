import { ArrowRight, HeartPulse, ShieldCheck, Sparkles, Stethoscope, WandSparkles } from 'lucide-react'

const journeys = [
  {
    eyebrow: 'Enhance',
    title: 'Shape a smile that feels unmistakably yours.',
    copy: 'Explore whitening, alignment, veneers and subtle aesthetic options through one calm, design-led conversation.',
    icon: Sparkles,
    accent: 'from-amber-300 via-orange-200 to-rose-300',
    panel: 'bg-[#fff7e7]',
    text: 'text-amber-800',
    treatments: ['Whitening', 'Aligners', 'Veneers', 'Facial aesthetics'],
  },
  {
    eyebrow: 'Restore',
    title: 'Bring comfort, confidence and function back into balance.',
    copy: 'Start with what is uncomfortable or missing, then build a restorative path around your health and everyday life.',
    icon: Stethoscope,
    accent: 'from-teal-300 via-emerald-200 to-sky-300',
    panel: 'bg-[#edf9f5]',
    text: 'text-teal-800',
    treatments: ['Restorations', 'Crowns', 'Implants', 'Root canal care'],
  },
  {
    eyebrow: 'Protect',
    title: 'Make prevention feel less routine and more personal.',
    copy: 'A thoughtful check-up, professional hygiene and clear guidance can help protect the smile you already love.',
    icon: HeartPulse,
    accent: 'from-sky-300 via-indigo-200 to-violet-300',
    panel: 'bg-[#eef4ff]',
    text: 'text-sky-800',
    treatments: ['Consultations', 'Hygiene care', 'Preventive planning', 'Urgent guidance'],
  },
] as const

const featuredTreatments = [
  { name: 'Smile Design', note: 'Whitening, alignment and veneers', icon: WandSparkles, tone: 'bg-rose-50 text-rose-600 border-rose-200' },
  { name: 'Restorative Care', note: 'Repair, protect and rebuild', icon: ShieldCheck, tone: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Dental Implants', note: 'Consultation-led tooth replacement', icon: Stethoscope, tone: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Essential Dentistry', note: 'Check-ups, hygiene and prevention', icon: HeartPulse, tone: 'bg-sky-50 text-sky-700 border-sky-200' },
  { name: 'Facial Aesthetics', note: 'Refined, balanced enhancements', icon: Sparkles, tone: 'bg-violet-50 text-violet-700 border-violet-200' },
  { name: 'Urgent Dental Care', note: 'Prompt guidance when discomfort strikes', icon: ShieldCheck, tone: 'bg-orange-50 text-orange-700 border-orange-200' },
] as const

export default function CareJourneys() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#120f17] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_9%_12%,rgba(251,191,36,0.22),transparent_24%),radial-gradient(circle_at_92%_18%,rgba(56,189,248,0.20),transparent_25%),radial-gradient(circle_at_76%_86%,rgba(244,114,182,0.18),transparent_25%),linear-gradient(145deg,#120f17_0%,#17241f_56%,#16162b_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_42%,black,transparent)]" />

      <div className="mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-white/12 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <div className="flex items-center gap-3"><span className="h-px w-14 bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.25em] text-amber-100">Choose your smile journey</span></div>
            <h2 className="mt-6 max-w-4xl font-cormorant text-[clamp(3.7rem,7vw,7.6rem)] font-light leading-[0.82] tracking-[-0.055em]">Less catalogue.<br /><span className="bg-gradient-to-r from-amber-200 via-rose-300 to-sky-300 bg-clip-text text-transparent">More direction.</span></h2>
          </div>
          <p className="max-w-2xl font-jost text-base font-light leading-8 text-white/68 sm:text-lg">Begin with what you want your smile to feel like. We will connect that goal to the right conversation, rather than forcing you through a wall of treatment names.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 sm:mt-16">
          {journeys.map((journey, index) => {
            const Icon = journey.icon
            return (
              <article key={journey.eyebrow} className={`group relative overflow-hidden rounded-[2rem] border border-white/12 ${journey.panel} p-7 text-[#241b20] shadow-[0_26px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-2 sm:p-9`}>
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${journey.accent}`} />
                <div className="flex items-center justify-between"><span className={`font-jost text-[10px] font-bold uppercase tracking-[0.2em] ${journey.text}`}>0{index + 1} · {journey.eyebrow}</span><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/8 bg-white/80 shadow-sm"><Icon className="h-5 w-5" aria-hidden="true" /></span></div>
                <h3 className="mt-8 font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.035em] sm:text-5xl">{journey.title}</h3>
                <p className="mt-5 font-jost text-sm leading-7 text-black/60">{journey.copy}</p>
                <div className="mt-7 flex flex-wrap gap-2">{journey.treatments.map((treatment) => <span key={treatment} className="rounded-full border border-black/8 bg-white/65 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.11em] text-black/60">{treatment}</span>)}</div>
                <a href="#contact" className={`mt-8 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] ${journey.text}`}>Start this conversation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>
              </article>
            )
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/14 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 border-b border-white/12 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-sky-200">Featured care</p><h3 className="mt-3 font-cormorant text-4xl font-light sm:text-5xl">Six clear starting points.</h3></div><a href="#contact" className="inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-amber-200">Ask about another treatment <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{featuredTreatments.map((item) => { const Icon = item.icon; return <div key={item.name} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:bg-white/[0.08]"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.tone}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span><span><span className="block font-cormorant text-2xl font-light">{item.name}</span><span className="mt-1 block font-jost text-xs text-white/52">{item.note}</span></span></div> })}</div>
        </div>
      </div>
    </section>
  )
}
