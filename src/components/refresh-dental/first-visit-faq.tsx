import { CalendarDays, Check, MessageCircle, ShieldCheck } from 'lucide-react'

const steps = [
  'Tell us what is bothering you or what you would love to improve.',
  'We guide you toward the right consultation or treatment conversation.',
  'You receive a clear next step before making any decision.',
] as const

const questions = [
  ['What should I bring?', 'Bring your ID, medical-aid details if applicable, and any questions you would like answered.'],
  ['What if I feel nervous?', 'Tell the team when you book. Your appointment can be paced more gently with extra time for explanations.'],
  ['Will I receive a treatment plan?', 'Your dentist will explain findings, options and the recommended next step before treatment is confirmed.'],
  ['Can I ask about payment options?', 'Yes. Payment and medical-aid questions are part of the consultation and should be clarified before you commit.'],
] as const

export default function FirstVisitFAQ() {
  return (
    <section id="first-visit" className="relative overflow-hidden bg-[#eef8f5] py-24 text-[#231d1c] sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(45,212,191,0.20),transparent_23%),radial-gradient(circle_at_90%_16%,rgba(251,191,36,0.20),transparent_23%),radial-gradient(circle_at_82%_88%,rgba(244,114,182,0.14),transparent_22%)]" />
      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid overflow-hidden rounded-[2.3rem] border border-white bg-white/80 shadow-[0_32px_90px_rgba(35,66,60,0.14)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-[#183b35] p-8 text-white sm:p-12 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(251,191,36,0.28),transparent_24%),radial-gradient(circle_at_88%_84%,rgba(56,189,248,0.24),transparent_28%)]" />
            <div className="relative">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-amber-200"><CalendarDays className="h-6 w-6" aria-hidden="true" /></span>
              <p className="mt-7 font-jost text-[10px] font-bold uppercase tracking-[0.22em] text-amber-200">Your first visit</p>
              <h2 className="mt-4 font-cormorant text-[clamp(3.5rem,5.4vw,6rem)] font-light leading-[0.85] tracking-[-0.05em]">A calmer beginning changes everything.</h2>
              <p className="mt-6 max-w-lg font-jost text-base font-light leading-8 text-white/68">You do not need to know exactly what treatment you need. Begin with the concern, the goal or the question. The team will help shape the next step.</p>
              <div className="mt-9 space-y-4">{steps.map((step, index) => <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-300 font-jost text-xs font-bold text-[#183b35]">{index + 1}</span><p className="font-jost text-sm leading-6 text-white/74">{step}</p></div>)}</div>
              <a href="#contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3.5 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-[#183b35]"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Request a consultation</a>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-14">
            <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-teal-700" aria-hidden="true" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">Questions before you book</span></div>
            <h3 className="mt-5 font-cormorant text-5xl font-light leading-[0.9] tracking-[-0.04em] sm:text-6xl">Clarity is part of the care.</h3>
            <div className="mt-9 divide-y divide-black/8 border-y border-black/8">{questions.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-cormorant text-2xl font-medium"><span>{question}</span><span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-teal-700 transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-xl pr-10 font-jost text-sm leading-7 text-black/58">{answer}</p></details>)}</div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-teal-200 bg-teal-50 p-4"><Check className="h-5 w-5 text-teal-700" aria-hidden="true" /><p className="mt-3 font-jost text-sm font-semibold">Questions are welcome</p></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><ShieldCheck className="h-5 w-5 text-amber-700" aria-hidden="true" /><p className="mt-3 font-jost text-sm font-semibold">No pressure to decide immediately</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
