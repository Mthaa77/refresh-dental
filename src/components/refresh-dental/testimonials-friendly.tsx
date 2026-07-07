'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Heart, MessageCircle, Quote, Sparkles, Star } from 'lucide-react';
import DentalToothMark from './dental-tooth-mark';

const stories = [
  {
    name: 'Phillimon Utla',
    initials: 'PU',
    image: '/images/clinic/team/thandi-mokoena-hygienist.jpg',
    treatment: 'General check-up',
    date: 'Recent Google review',
    quote: 'The team was super friendly and made me feel really comfortable. Dr. Lebo explained everything clearly and did not rush through anything.',
    highlight: 'Explained everything clearly',
    color: 'amber',
    panel: 'border-amber-200 bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    glow: 'bg-amber-300/25',
  },
  {
    name: 'Shaun Kleynhans',
    initials: 'SK',
    image: '/images/clinic/team/sarah-dental-assistant.jpg',
    treatment: 'Cosmetic treatment',
    date: 'Recent Google review',
    quote: 'Dr Lebogang and her staff were truly amazing. Her kindness and gentle way of carrying out the procedure was excellent.',
    highlight: 'Kindness and gentle care',
    color: 'teal',
    panel: 'border-teal-200 bg-teal-50',
    icon: 'bg-teal-100 text-teal-600',
    glow: 'bg-teal-300/25',
  },
  {
    name: 'Adaani Frost',
    initials: 'AF',
    image: '/images/clinic/team/staff-collaboration.jpg',
    treatment: 'Emergency care',
    date: 'Recent Google review',
    quote: 'Dr. Malunga made herself available for a dental emergency within minutes of our call. Fast, efficient, courteous and professional.',
    highlight: 'Available when it mattered',
    color: 'sky',
    panel: 'border-sky-200 bg-sky-50',
    icon: 'bg-sky-100 text-sky-600',
    glow: 'bg-sky-300/25',
  },
] as const;

export default function FriendlyTestimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stories[activeIndex];

  return (
    <section id="testimonials" className="relative isolate overflow-hidden bg-[#fffaf3] py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_9%_17%,rgba(251,191,36,0.19),transparent_22%),radial-gradient(circle_at_92%_76%,rgba(125,211,252,0.19),transparent_25%),radial-gradient(circle_at_72%_12%,rgba(45,212,191,0.13),transparent_22%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(35,66,60,0.23)_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-amber-200 bg-white text-amber-600 shadow-[0_16px_36px_rgba(217,119,6,0.12)]"><DentalToothMark className="h-8 w-8" aria-hidden="true" /></div>
          <p className="mt-6 font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">Patient stories, shared with a smile</p>
          <h2 className="mt-4 font-cormorant text-[clamp(3.5rem,6.4vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso [text-shadow:0_8px_28px_rgba(45,107,92,0.12)]">
            Real people. Real comfort.<br />
            <span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.14)]">Real reasons to smile.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-jost text-base font-light leading-8 text-espresso/67 sm:text-lg">A friendly welcome, clearer answers and care that helps people feel safe in the chair. Hear it in their own words.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-amber-200 bg-white/85 px-5 py-2.5 shadow-[0_14px_30px_rgba(217,119,6,0.10)]"><span className="flex items-center gap-1">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />)}</span><span className="font-cormorant text-2xl font-semibold text-espresso">5.0</span><span className="h-4 w-px bg-espresso/12" /><span className="font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-espresso/60">Google rating</span></div>
        </motion.div>

        <div className="mt-12 grid gap-7 xl:grid-cols-[1.05fr_0.95fr] xl:items-stretch xl:gap-10 sm:mt-16">
          <motion.article
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-espresso/10 bg-espresso p-7 text-ivory shadow-[0_32px_82px_rgba(15,13,10,0.25)] sm:p-10"
          >
            <div aria-hidden="true" className={`absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${active.glow}`} />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_48%)]" />
            <motion.div key={active.name} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-5"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active.icon}`}><Quote className="h-6 w-6" aria-hidden="true" /></span><span className="inline-flex items-center gap-1.5 rounded-full border border-ivory/14 bg-ivory/[0.06] px-3 py-1.5 font-jost text-[10px] font-bold uppercase tracking-[0.13em] text-ivory/75"><BadgeCheck className="h-3.5 w-3.5 text-teal-light" aria-hidden="true" /> Verified review</span></div>
              <p className="mt-8 font-cormorant text-[clamp(2.4rem,4.6vw,4.6rem)] font-light leading-[0.95] tracking-[-0.045em] text-ivory">“{active.quote}”</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ivory/12 pt-6"><span className="inline-flex items-center gap-2 font-jost text-xs text-gold-pale"><Sparkles className="h-4 w-4" aria-hidden="true" /> {active.highlight}</span><span className="inline-flex items-center gap-2 font-jost text-xs text-ivory/57"><Heart className="h-4 w-4 text-rose-300" aria-hidden="true" /> {active.treatment}</span></div>
              <div className="mt-auto flex items-center gap-3 pt-9"><Image src={active.image} alt="" width={52} height={52} className="h-13 w-13 rounded-2xl border border-ivory/15 object-cover" /><span><span className="block font-jost text-sm font-semibold text-ivory">{active.name}</span><span className="mt-1 block font-jost text-xs text-ivory/55">{active.date}</span></span></div>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3"
            role="tablist"
            aria-label="Patient testimonials"
          >
            {stories.map((story, index) => {
              const selected = index === activeIndex;
              return (
                <button key={story.name} type="button" role="tab" aria-selected={selected} onClick={() => setActiveIndex(index)} className={`group flex items-center gap-4 rounded-[1.45rem] border p-4 text-left transition-all duration-300 sm:p-5 ${selected ? story.panel : 'border-espresso/10 bg-white/70 shadow-[0_10px_28px_rgba(35,66,60,0.06)] hover:-translate-y-0.5 hover:border-espresso/20 hover:bg-white'}`}>
                  <Image src={story.image} alt="" width={60} height={60} className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-sm" />
                  <span className="min-w-0 flex-1"><span className="flex items-center gap-1">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />)}</span><span className="mt-3 block font-cormorant text-3xl font-light leading-none text-espresso">{story.name}</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/60">{story.highlight}</span></span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border font-jost text-[10px] font-bold ${selected ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/12 text-espresso/45 group-hover:border-teal-300 group-hover:text-teal-700'}`}>{index + 1}</span>
                </button>
              );
            })}
            <div className="mt-3 rounded-[1.45rem] border border-teal-200 bg-teal-50/80 p-5"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-white text-teal-600"><MessageCircle className="h-4 w-4" aria-hidden="true" /></span><span><span className="font-jost text-xs font-bold uppercase tracking-[0.12em] text-teal-800">Nervous about seeing a dentist?</span><span className="mt-2 block font-jost text-sm leading-6 text-espresso/62">Tell us when you book. We will make space for your questions and help your first visit feel easier.</span><a href="#contact" className="group mt-4 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700 hover:text-espresso">Talk to the team <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a></span></div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
