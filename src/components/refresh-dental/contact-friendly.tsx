'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Mail, MapPin, MessageCircle, Navigation, Phone, Sparkles } from 'lucide-react';
import ContactForm from './contact-form';
import DentalToothMark from './dental-tooth-mark';
import TradingHours from './trading-hours';

const contactMethods = [
  { icon: Phone, label: 'Call the practice', value: '061 416 4649', href: 'tel:+27614164649', style: 'border-teal-200 bg-teal-50 text-teal-600 shadow-[0_12px_26px_rgba(13,148,136,0.12)]' },
  { icon: MessageCircle, label: 'Message on WhatsApp', value: 'Chat with our friendly team', href: 'https://wa.me/27614164649', style: 'border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_12px_26px_rgba(16,185,129,0.12)]' },
  { icon: Mail, label: 'Email us', value: 'admin@refreshdental.co.za', href: 'mailto:admin@refreshdental.co.za', style: 'border-sky-200 bg-sky-50 text-sky-600 shadow-[0_12px_26px_rgba(2,132,199,0.12)]' },
] as const;

export default function FriendlyContact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_15%,rgba(45,212,191,0.28),transparent_25%),radial-gradient(circle_at_91%_18%,rgba(251,191,36,0.24),transparent_26%),radial-gradient(circle_at_80%_88%,rgba(125,211,252,0.18),transparent_24%),linear-gradient(140deg,#0d0c09_0%,#17201b_58%,#103c35_145%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(240,235,225,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.10)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:radial-gradient(ellipse_78%_70%_at_52%_45%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-16 h-20 w-20 rounded-full border border-amber-300/45 sm:left-12 lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-7 h-20 w-20 rotate-12 rounded-2xl border border-sky-300/35 sm:right-14" />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-20 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <span className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-teal-light/25 bg-teal-400/15 text-teal-light shadow-[0_16px_36px_rgba(45,212,191,0.14)]"><DentalToothMark className="h-8 w-8" aria-hidden="true" /></span>
          <p className="mt-7 font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-gold-pale/82">Your friendly next step</p>
          <h2 className="type-section-title mt-4 max-w-2xl text-ivory">A better dental visit<br /><span className="bg-gradient-to-r from-teal-light via-sky-300 to-gold-pale bg-clip-text text-transparent">can start today.</span></h2>
          <p className="type-body-lead mt-7 max-w-xl text-ivory/72">Tell us what you need, what has been on your mind, or just that you are ready to feel better about your smile. We will guide you to the right next step.</p>
          <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-ivory/14 bg-ivory/[0.06] px-4 py-2 font-jost text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory/74"><Sparkles className="h-3.5 w-3.5 text-gold-pale" aria-hidden="true" /> New patients are warmly welcome</div>

          <div className="mt-6 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {[
              ['01', 'Warm welcome'],
              ['02', 'Clear guidance'],
              ['03', 'No-pressure start'],
            ].map(([number, label]) => <div key={label} className="rounded-2xl border border-ivory/12 bg-ivory/[0.045] px-3 py-3 backdrop-blur-md sm:px-4"><p className="font-elegant text-2xl leading-none text-gold-pale">{number}</p><p className="mt-2 font-jost text-[9px] font-bold uppercase tracking-[0.12em] text-ivory/48">{label}</p></div>)}
          </div>

          <div className="mt-9 space-y-3">{contactMethods.map((method) => { const Icon = method.icon; return <a key={method.label} href={method.href} target={method.href.startsWith('https') ? '_blank' : undefined} rel={method.href.startsWith('https') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-4 rounded-2xl border border-ivory/11 bg-ivory/[0.045] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-ivory/26 hover:bg-ivory/[0.085]"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${method.style}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block font-jost text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory/47">{method.label}</span><span className="mt-1 block truncate font-jost text-sm text-ivory/88">{method.value}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-gold-pale/75 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a>; })}</div>

          <div className="mt-10 grid gap-4 border-t border-ivory/12 pt-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-gold-pale/78">Visit the practice</p><p className="mt-3 font-elegant text-3xl font-semibold leading-[1.05] text-ivory">Family Wellness Centre</p><p className="mt-2 font-jost text-sm leading-6 text-ivory/66">153 River Road, Lyttelton Manor, Centurion, Pretoria 0157</p></div><a href="https://www.google.com/maps/dir/?api=1&destination=153+River+Road+Lyttelton+Manor+Centurion+Pretoria+0157" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-gold-pale hover:text-ivory"><Navigation className="h-4 w-4" aria-hidden="true" /> Directions <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a></div>
          <div className="mt-8 max-w-sm rounded-[1.35rem] border border-ivory/12 bg-ivory/[0.045] p-5 backdrop-blur-md"><TradingHours /></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div aria-hidden="true" className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-br from-amber-300/45 via-transparent to-teal-300/35 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-ivory/20 bg-[#fffdf9] p-1 shadow-[0_35px_90px_rgba(0,0,0,0.35)]"><div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" /><div className="relative rounded-[1.82rem] bg-[radial-gradient(circle_at_82%_4%,rgba(125,211,252,0.22),transparent_27%),radial-gradient(circle_at_8%_90%,rgba(251,191,36,0.16),transparent_25%),linear-gradient(150deg,#fffdfa_0%,#f3eee2_58%,#e9f4ef_140%)] p-6 sm:p-9 lg:p-11"><div className="mb-8 flex items-start justify-between gap-5"><div><p className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">Consultation request</p><h3 className="mt-3 font-elegant text-4xl font-semibold leading-[0.92] tracking-[-0.035em] text-espresso sm:text-5xl">Let&apos;s talk about your smile.</h3><p className="mt-3 max-w-md font-jost text-sm leading-6 text-espresso/59">There is no perfect message to write. Start with what is bothering you or what you would love to improve.</p></div><span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 sm:flex"><CalendarDays className="h-5 w-5" aria-hidden="true" /></span></div><ContactForm /></div></div>
        </motion.div>
      </div>
    </section>
  );
}
