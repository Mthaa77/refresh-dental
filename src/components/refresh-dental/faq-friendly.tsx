'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  CreditCard,
  HeartHandshake,
  MessageCircle,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import DentalToothMark from './dental-tooth-mark';

type Category = 'All' | 'First visit' | 'Payment' | 'Smile care' | 'Urgent care';

const categoryStyles: Record<Exclude<Category, 'All'>, { pill: string; icon: string; rail: string }> = {
  'First visit': { pill: 'border-teal-200 bg-teal-50 text-teal-700', icon: 'bg-teal-100 text-teal-600', rail: 'from-teal-400 via-teal-500 to-transparent' },
  Payment: { pill: 'border-amber-200 bg-amber-50 text-amber-700', icon: 'bg-amber-100 text-amber-600', rail: 'from-amber-400 via-amber-500 to-transparent' },
  'Smile care': { pill: 'border-sky-200 bg-sky-50 text-sky-700', icon: 'bg-sky-100 text-sky-600', rail: 'from-sky-400 via-sky-500 to-transparent' },
  'Urgent care': { pill: 'border-rose-200 bg-rose-50 text-rose-700', icon: 'bg-rose-100 text-rose-500', rail: 'from-rose-400 via-rose-500 to-transparent' },
};

const questions = [
  {
    category: 'Payment',
    question: 'Can I use my medical aid?',
    answer: 'Please bring your medical-aid details when you speak with us or arrive for your visit. Our team will guide you through the practical next step and help you understand what information may be needed before a treatment plan is confirmed.',
    icon: ShieldCheck,
  },
  {
    category: 'Payment',
    question: 'How do Athena options work?',
    answer: 'For qualifying treatments, you can ask the Refresh Dental team about available Athena options. We will explain the process, practical considerations and next steps clearly before you decide.',
    icon: CreditCard,
  },
  {
    category: 'First visit',
    question: 'What happens at a first consultation?',
    answer: 'Your first visit begins with a conversation. Dr. Malunga will listen to your concerns and goals, assess your oral health where appropriate, and talk you through suitable next steps in a calm, pressure-free way.',
    icon: CalendarDays,
  },
  {
    category: 'Urgent care',
    question: 'Can you help with a dental emergency?',
    answer: 'For urgent dental concerns, call the practice as soon as possible on 061 416 4649. The team will assess the situation with you and advise on the most appropriate next step and appointment availability.',
    icon: Phone,
  },
  {
    category: 'Smile care',
    question: 'Is professional whitening right for me?',
    answer: 'Whitening is never one-size-fits-all. A consultation helps us understand your smile goals, existing dental work and sensitivity needs so that we can recommend the most appropriate approach for you.',
    icon: Sparkles,
  },
  {
    category: 'Smile care',
    question: 'What are aligners and Slimming Wires?',
    answer: 'These are discreet alignment options that may help guide teeth into a more balanced position. Your consultation is the right place to discuss suitability, realistic timing and how the process would fit your daily life.',
    icon: HeartHandshake,
  },
  {
    category: 'Smile care',
    question: 'Do you offer facial aesthetic treatments?',
    answer: 'Refresh Dental can discuss facial-aesthetic treatments as part of a considered smile and wellbeing conversation. Suitability and an appropriate plan are always assessed personally during consultation.',
    icon: Sparkles,
  },
  {
    category: 'First visit',
    question: 'How do I book an appointment?',
    answer: 'You can book through the contact form, phone the practice on 061 416 4649, or send a WhatsApp message. Tell us what you would like help with and we will guide you toward the right type of appointment.',
    icon: MessageCircle,
  },
] as const;

const categories: Category[] = ['All', 'First visit', 'Payment', 'Smile care', 'Urgent care'];

export default function FriendlyFAQ() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return questions.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = !query || item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative isolate overflow-hidden bg-[#fbfdfc] py-24 text-espresso sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_17%,rgba(45,212,191,0.17),transparent_23%),radial-gradient(circle_at_90%_24%,rgba(251,191,36,0.20),transparent_24%),radial-gradient(circle_at_80%_84%,rgba(125,211,252,0.16),transparent_23%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(35,66,60,0.24)_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-4xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-sky-200 bg-white text-sky-600 shadow-[0_16px_36px_rgba(2,132,199,0.12)]"><DentalToothMark className="h-8 w-8" aria-hidden="true" /></span>
          <p className="mt-6 font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">Helpful answers, without the jargon</p>
          <h2 className="mt-4 font-cormorant text-[clamp(3.5rem,6.4vw,7rem)] font-light leading-[0.85] tracking-[-0.055em] text-espresso [text-shadow:0_8px_28px_rgba(45,107,92,0.12)]">Questions are welcome.<br /><span className="bg-gradient-to-r from-teal-600 via-sky-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_10px_32px_rgba(2,132,199,0.14)]">So are honest answers.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl font-jost text-base font-light leading-8 text-espresso/67 sm:text-lg">Pick a topic, search for your question, or simply start where you are. The team is here when you need a more personal conversation.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.08, duration: 0.65 }} className="mx-auto mt-10 max-w-5xl rounded-[1.6rem] border border-white/90 bg-white/75 p-3 shadow-[0_18px_50px_rgba(35,66,60,0.09)] backdrop-blur-xl sm:mt-12 sm:p-4">
          <div className="relative"><Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-600" aria-hidden="true" /><input type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setOpenQuestion(null); }} placeholder="Search a question, for example: first visit or payment..." className="min-h-14 w-full rounded-[1.15rem] border border-espresso/10 bg-[#fffdf9] py-3 pl-12 pr-5 font-jost text-sm text-espresso outline-none transition-all placeholder:text-espresso/38 focus:border-teal-300 focus:ring-4 focus:ring-teal-100" /></div>
          <div className="mt-3 flex flex-wrap gap-2">{categories.map((category) => { const active = activeCategory === category; return <button key={category} type="button" onClick={() => { setActiveCategory(category); setOpenQuestion(null); }} className={`rounded-full border px-3.5 py-2 font-jost text-[10px] font-bold uppercase tracking-[0.13em] transition-all ${active ? category === 'All' ? 'border-espresso bg-espresso text-ivory' : categoryStyles[category].pill : 'border-espresso/10 bg-white text-espresso/58 hover:border-teal-300 hover:text-teal-700'}`}>{category}</button>; })}</div>
        </motion.div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.38fr] xl:items-start xl:gap-10">
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.1, duration: 0.7 }} className="space-y-3">
            <p className="px-1 font-jost text-xs text-espresso/50"><span className="font-semibold text-teal-700">{filtered.length}</span> helpful answer{filtered.length === 1 ? '' : 's'} for you</p>
            {filtered.map((item, index) => {
              const isOpen = openQuestion === index;
              const style = categoryStyles[item.category];
              const Icon = item.icon;
              return (
                <div key={item.question} className={`relative overflow-hidden rounded-[1.35rem] border bg-white/80 shadow-[0_10px_26px_rgba(35,66,60,0.06)] transition-all ${isOpen ? style.pill : 'border-espresso/10'}`}>
                  <div aria-hidden="true" className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${style.rail} ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                  <button type="button" onClick={() => setOpenQuestion(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center gap-4 p-5 text-left sm:p-6">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${style.icon}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1"><span className="font-jost text-[9px] font-bold uppercase tracking-[0.16em] text-espresso/48">{item.category}</span><span className="mt-1 block font-cormorant text-3xl font-light leading-none text-espresso sm:text-4xl">{item.question}</span></span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? 'rotate-45 border-espresso bg-espresso text-ivory' : 'border-espresso/12 text-espresso/48'}`}><Plus className="h-4 w-4" aria-hidden="true" /></span>
                  </button>
                  <AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><div className="px-5 pb-6 pl-[5.25rem] pr-6 sm:px-6 sm:pb-7 sm:pl-[6.4rem]"><div className="h-px bg-espresso/10" /><p className="mt-5 font-jost text-sm font-light leading-7 text-espresso/68 sm:text-base">{item.answer}</p><div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-700"><Check className="h-3.5 w-3.5" aria-hidden="true" /> Still unsure? The team will help.</div></div></motion.div>}</AnimatePresence>
                </div>
              );
            })}
            {filtered.length === 0 && <div className="rounded-[1.5rem] border border-dashed border-teal-300 bg-teal-50/70 p-10 text-center"><CircleHelp className="mx-auto h-7 w-7 text-teal-600" aria-hidden="true" /><p className="mt-4 font-cormorant text-3xl font-light text-espresso">We could not find that answer yet.</p><p className="mx-auto mt-3 max-w-md font-jost text-sm leading-6 text-espresso/60">Try a different phrase or speak to the Refresh Dental team for a more personal answer.</p></div>}
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: 0.14, duration: 0.7 }} className="relative overflow-hidden rounded-[1.75rem] bg-espresso p-6 text-ivory shadow-[0_25px_66px_rgba(15,13,10,0.22)] sm:p-7 xl:sticky xl:top-28">
            <div aria-hidden="true" className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-amber-300/25 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_48%)]" />
            <div className="relative"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-light/25 bg-teal-400/15 text-teal-light"><HeartHandshake className="h-5 w-5" aria-hidden="true" /></span><p className="mt-6 font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-gold-pale/80">A real person is one click away</p><h3 className="mt-3 font-cormorant text-4xl font-light leading-[0.92]">Prefer a little reassurance before you book?</h3><p className="mt-5 font-jost text-sm font-light leading-7 text-ivory/70">Tell us what is worrying you, what you would like to change, or simply that you are nervous. We will take it from there.</p><a href="#contact" className="btn-gold-3d group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso">Talk to the team <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></a></div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
