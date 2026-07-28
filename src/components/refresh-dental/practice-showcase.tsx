import Image from 'next/image'
import { Camera, HeartHandshake, MonitorUp, Sparkles } from 'lucide-react'

const details = [
  { icon: HeartHandshake, title: 'Warm, human care', copy: 'A calmer environment with space for questions.' },
  { icon: MonitorUp, title: 'Modern clinical tools', copy: 'Technology supports clearer planning and communication.' },
  { icon: Sparkles, title: 'Thoughtful details', copy: 'Every visual and physical touchpoint feels considered.' },
] as const

export default function PracticeShowcase() {
  return (
    <section id="practice" className="relative overflow-hidden bg-[#fff8ef] py-24 text-[#261d1b] sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(244,114,182,0.16),transparent_22%),radial-gradient(circle_at_92%_16%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_72%_85%,rgba(45,212,191,0.15),transparent_24%)]" />
      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-3"><span className="h-px w-14 bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">Inside Refresh Dental</span></div>
            <h2 className="mt-6 font-cormorant text-[clamp(3.6rem,6.5vw,7rem)] font-light leading-[0.84] tracking-[-0.055em]">Clinical confidence.<br /><span className="bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">Without the coldness.</span></h2>
            <p className="mt-7 max-w-xl font-jost text-base leading-8 text-black/62 sm:text-lg">The practice experience is designed to feel polished, calm and reassuring. Modern dentistry meets a warmer visual language, so patients understand the care before they ever sit in the chair.</p>
            <div className="mt-9 space-y-3">{details.map((item) => { const Icon = item.icon; return <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-black/8 bg-white/70 p-4 shadow-[0_14px_34px_rgba(60,45,35,0.07)]"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-sky-100 text-teal-700"><Icon className="h-5 w-5" aria-hidden="true" /></span><span><span className="block font-cormorant text-2xl font-medium">{item.title}</span><span className="mt-1 block font-jost text-sm leading-6 text-black/55">{item.copy}</span></span></div> })}</div>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2">
            <figure className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white shadow-[0_32px_80px_rgba(68,48,35,0.18)] sm:row-span-2">
              <Image src="/images/clinic/real/clinic-interior.jpg" alt="Refresh Dental clinic interior" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur-xl"><span className="flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200"><Camera className="h-4 w-4" aria-hidden="true" /> Practice atmosphere</span><p className="mt-2 font-cormorant text-3xl font-light">A setting designed to help patients exhale.</p></figcaption>
            </figure>
            <figure className="relative min-h-[270px] overflow-hidden rounded-[2rem] border border-white shadow-[0_24px_60px_rgba(68,48,35,0.14)]"><Image src="/images/clinic/real/dr-malunga-procedure.jpg" alt="Dr Malunga delivering dental care" fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent" /></figure>
            <div className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-100 via-rose-50 to-amber-100 p-7 shadow-[0_24px_60px_rgba(68,48,35,0.12)]"><span className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700">The premium difference</span><p className="mt-4 font-cormorant text-4xl font-light leading-[0.92]">Clearer conversations. Softer edges. Better first impressions.</p><a href="#contact" className="mt-7 inline-flex rounded-full bg-[#241b20] px-5 py-3 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-white">Visit the practice</a></div>
          </div>
        </div>
      </div>
    </section>
  )
}
