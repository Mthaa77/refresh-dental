'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Grid2X2,
  HeartPulse,
  Layers3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type ServiceCategory = 'all' | 'smile' | 'restorative' | 'essential' | 'surgical';
type ServiceTone = 'gold' | 'teal' | 'sapphire' | 'blush';

const categoryTabs = [
  { id: 'all', label: 'All treatments', icon: Grid2X2 },
  { id: 'smile', label: 'Smile & aesthetics', icon: Sparkles },
  { id: 'restorative', label: 'Restorative care', icon: Layers3 },
  { id: 'essential', label: 'Essential care', icon: HeartPulse },
  { id: 'surgical', label: 'Specialist care', icon: ShieldCheck },
] as const;

const services = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'surgical',
    eyebrow: 'Permanent tooth replacement',
    duration: '1 hr 30 min',
    summary: 'A considered route to restoring the look, feel and everyday function of a missing tooth.',
    detail: 'Your implant journey begins with a detailed consultation and a tailored plan designed around your oral health, comfort and long-term confidence.',
    focus: ['Consultation-led planning', 'Natural-looking restoration', 'Clear treatment timeline'],
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    tone: 'gold',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'smile',
    eyebrow: 'Cosmetic dentistry',
    duration: '1 hr',
    summary: 'Professional whitening options to bring a fresher, brighter energy to your smile.',
    detail: 'We will discuss your goals and recommend an approach that feels appropriate for your smile, lifestyle and sensitivity needs.',
    focus: ['In-chair options', 'Take-home guidance', 'Shade-led planning'],
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    tone: 'gold',
  },
  {
    id: 'fillers-neurotoxins',
    title: 'Fillers & Neurotoxins',
    category: 'smile',
    eyebrow: 'Facial aesthetics',
    duration: '1 hr',
    summary: 'Subtle facial-aesthetic treatments designed to complement—not overpower—your natural features.',
    detail: 'A calm, personalised consultation helps align your goals with a refined, balanced approach to facial aesthetics.',
    focus: ['Personalised consultation', 'Subtle enhancement', 'Balanced treatment plan'],
    image: '/images/clinic/environment/modern-operatory.jpg',
    tone: 'blush',
  },
  {
    id: 'aligners-slimming-wires',
    title: 'Aligners & Slimming Wires',
    category: 'smile',
    eyebrow: 'Discreet alignment',
    duration: '30 min',
    summary: 'Comfort-conscious alignment options for patients seeking a more balanced smile with less visual interruption.',
    detail: 'We will assess your smile, talk through suitable alignment options and outline the next steps with complete clarity.',
    focus: ['Discreet treatment options', 'Goal-based assessment', 'Step-by-step guidance'],
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    tone: 'teal',
  },
  {
    id: 'dental-consultation',
    title: 'Dental Consultation',
    category: 'essential',
    eyebrow: 'Your starting point',
    duration: '30 min',
    summary: 'A thorough, unhurried conversation about your oral health, concerns and the next step that makes sense for you.',
    detail: 'This is where we listen first. You will leave with clearer insight into your options and a treatment plan built around your needs.',
    focus: ['Full oral assessment', 'Questions welcomed', 'Clear next-step plan'],
    image: '/images/clinic/environment/modern-operatory.jpg',
    tone: 'sapphire',
  },
  {
    id: 'scaling-polishing',
    title: 'Scaling & Polishing',
    category: 'essential',
    eyebrow: 'Professional hygiene',
    duration: '30 min',
    summary: 'A professional clean designed to support gum health and help your smile feel refreshed.',
    detail: 'Regular hygiene visits form a gentle but important foundation for keeping your teeth and gums cared for between treatments.',
    focus: ['Gum-health focus', 'Fresh, polished finish', 'Preventive guidance'],
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    tone: 'teal',
  },
  {
    id: 'restorations',
    title: 'Restorations',
    category: 'restorative',
    eyebrow: 'Repair with precision',
    duration: '30 min',
    summary: 'Tooth-coloured restorative care designed to bring comfort, function and natural balance back to your smile.',
    detail: 'We look at the health and structure of the tooth first, then recommend a restoration that feels considered and appropriate.',
    focus: ['Tooth-coloured options', 'Function-first planning', 'Natural appearance'],
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    tone: 'gold',
  },
  {
    id: 'root-canal-therapy',
    title: 'Root Canal Therapy',
    category: 'surgical',
    eyebrow: 'Tooth-preserving care',
    duration: '1 hr 30 min',
    summary: 'Advanced endodontic care focused on relieving discomfort and helping preserve a compromised tooth.',
    detail: 'Your treatment is explained carefully before it begins, with a plan focused on comfort, precision and preserving your natural tooth where possible.',
    focus: ['Comfort-led care', 'Clear treatment explanation', 'Tooth-preserving approach'],
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    tone: 'blush',
  },
  {
    id: 'wisdom-teeth-removal',
    title: 'Wisdom Teeth Removal',
    category: 'surgical',
    eyebrow: 'Gentle extraction care',
    duration: '1 hr',
    summary: 'A carefully planned extraction experience with clear guidance before, during and after your visit.',
    detail: 'We assess the right path for your needs, talk through your options and make sure you understand the after-care process.',
    focus: ['Pre-treatment assessment', 'Guided after-care', 'Clear recovery advice'],
    image: '/images/clinic/environment/modern-operatory.jpg',
    tone: 'sapphire',
  },
  {
    id: 'dental-prosthesis',
    title: 'Dental Prosthesis',
    category: 'restorative',
    eyebrow: 'Comfort & function',
    duration: '30 min',
    summary: 'Precision-crafted prosthetic options designed around fit, ease and a more natural appearance.',
    detail: 'We consider comfort and day-to-day function alongside your smile goals to create a restorative option that fits your life.',
    focus: ['Comfort-led fitting', 'Function-focused care', 'Natural-looking finish'],
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    tone: 'gold',
  },
  {
    id: 'crowns-veneers',
    title: 'Crowns & Veneers',
    category: 'smile',
    eyebrow: 'Smile transformation',
    duration: '1 hr',
    summary: 'Custom-designed restorative and cosmetic options for shape, tone and confidence in your smile.',
    detail: 'A smile-design conversation helps us understand the details that matter to you before we create a tailored treatment path.',
    focus: ['Tailored smile design', 'Shape and shade planning', 'Restorative precision'],
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    tone: 'blush',
  },
  {
    id: 'fixed-dental-prosthesis',
    title: 'Fixed Dental Prosthesis',
    category: 'restorative',
    eyebrow: 'Long-term restoration',
    duration: '1 hr 30 min',
    summary: 'Fixed restorative solutions designed to rebuild everyday function with a confident, natural feel.',
    detail: 'We begin with your specific needs and explain the treatment route, materials and care plan in plain language.',
    focus: ['Long-term treatment planning', 'Stable restorative options', 'Personalised after-care'],
    image: '/images/clinic/environment/modern-operatory.jpg',
    tone: 'teal',
  },
] as const;

type ActiveCategory = (typeof categoryTabs)[number]['id'];
type Service = (typeof services)[number];

const toneClasses: Record<ServiceTone, { border: string; chip: string; icon: string; glow: string; line: string }> = {
  gold: {
    border: 'border-champagne-gold/25',
    chip: 'border-champagne-gold/25 bg-champagne-gold/10 text-gold-pale',
    icon: 'bg-champagne-gold/12 text-champagne-gold',
    glow: 'bg-champagne-gold/25',
    line: 'from-champagne-gold via-gold-pale to-transparent',
  },
  teal: {
    border: 'border-teal-light/25',
    chip: 'border-teal-light/25 bg-sage-teal/20 text-teal-light',
    icon: 'bg-sage-teal/20 text-teal-light',
    glow: 'bg-sage-teal/30',
    line: 'from-teal-light via-sage-teal to-transparent',
  },
  sapphire: {
    border: 'border-sapphire-light/25',
    chip: 'border-sapphire-light/25 bg-sapphire/15 text-sapphire-light',
    icon: 'bg-sapphire/15 text-sapphire-light',
    glow: 'bg-sapphire/25',
    line: 'from-sapphire-light via-sapphire to-transparent',
  },
  blush: {
    border: 'border-warm-blush/30',
    chip: 'border-warm-blush/30 bg-warm-blush/15 text-warm-blush',
    icon: 'bg-warm-blush/15 text-warm-blush',
    glow: 'bg-warm-blush/25',
    line: 'from-warm-blush via-gold-pale to-transparent',
  },
};

function getServiceNumber(id: string) {
  const index = services.findIndex((service) => service.id === id) + 1;
  return String(index).padStart(2, '0');
}

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);

  const filteredServices = useMemo(
    () => (activeCategory === 'all' ? services : services.filter((service) => service.category === activeCategory)),
    [activeCategory],
  );

  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0];
  const selectedTone = toneClasses[selectedService.tone];

  const changeCategory = (category: ActiveCategory) => {
    setActiveCategory(category);
    const firstVisibleService = category === 'all' ? services[0] : services.find((service) => service.category === category);
    if (firstVisibleService) setSelectedServiceId(firstVisibleService.id);
  };

  return (
    <section id="services" className="relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_11%,rgba(184,152,48,0.20),transparent_25%),radial-gradient(circle_at_8%_82%,rgba(45,107,92,0.28),transparent_29%),linear-gradient(135deg,#0F0D0A_0%,#17130e_56%,#102b26_145%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(240,235,225,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.10)_1px,transparent_1px)] [background-size:62px_62px] [mask-image:radial-gradient(ellipse_75%_60%_at_48%_22%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-16 h-20 w-20 border-l border-t border-champagne-gold/45 sm:left-10 lg:left-16" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-6 hidden h-24 w-24 border-b border-r border-champagne-gold/35 lg:block" />

      <div className="relative mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-ivory/15 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-champagne-gold sm:w-16" />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-pale/80 sm:text-[11px]">The complete care collection</span>
            </div>
            <h2 className="max-w-4xl font-cormorant text-[clamp(3.5rem,7vw,7.4rem)] font-light leading-[0.84] tracking-[-0.055em] text-ivory">
              Every kind of care.<br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(232,217,168,0.78)] sm:[-webkit-text-stroke:1.4px_rgba(232,217,168,0.78)]">One considered experience.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pb-2"
          >
            <p className="max-w-xl font-jost text-base font-light leading-8 text-ivory/70 sm:text-lg">
              Explore every treatment available at Refresh Dental. Filter by the kind of care you need, then select a service to preview what your visit could look like.
            </p>
            <div className="mt-7 flex items-center gap-3 text-ivory/55">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-gold/25 bg-champagne-gold/10 text-champagne-gold">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="font-jost text-sm">Not sure where to begin? Start with a consultation and we will guide you.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-4 border-b border-ivory/10 pb-9 sm:mt-11 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter dental treatments">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => changeCategory(tab.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-jost text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:text-[11px] ${
                    isActive
                      ? 'border-champagne-gold/60 bg-champagne-gold text-espresso shadow-[0_10px_26px_rgba(184,152,48,0.22)]'
                      : 'border-ivory/14 bg-ivory/[0.04] text-ivory/65 hover:border-gold-pale/40 hover:bg-ivory/[0.08] hover:text-ivory'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="font-jost text-xs text-ivory/45" aria-live="polite">
            Showing <span className="font-semibold text-gold-pale">{filteredServices.length}</span> of {services.length} treatments
          </p>
        </motion.div>

        <div className="mt-10 grid gap-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start xl:gap-10">
          <motion.aside
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.08, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="xl:sticky xl:top-28"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12, scale: prefersReducedMotion ? 1 : 0.99 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className={`relative isolate overflow-hidden rounded-[2rem] border bg-espresso/40 shadow-[0_30px_80px_rgba(0,0,0,0.36)] ${selectedTone.border}`}
              >
                <div className="relative aspect-[1.12/1] min-h-[360px] overflow-hidden sm:min-h-[440px]">
                  <Image
                    src={selectedService.image}
                    alt={`${selectedService.title} treatment at Refresh Dental`}
                    fill
                    sizes="(min-width: 1280px) 45vw, 100vw"
                    className="object-cover"
                    priority={selectedService.id === services[0].id}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,10,0.05)_0%,rgba(15,13,10,0.25)_38%,rgba(15,13,10,0.96)_100%)]" />
                  <div className={`absolute -right-14 top-7 h-44 w-44 rounded-full blur-3xl ${selectedTone.glow}`} />
                  <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-ivory/65 to-transparent" />

                  <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-4 sm:inset-x-8 sm:top-8">
                    <span className={`inline-flex rounded-full border px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${selectedTone.chip}`}>
                      {selectedService.eyebrow}
                    </span>
                    <span className="font-cormorant text-3xl font-light text-ivory/70">{getServiceNumber(selectedService.id)}</span>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                    <div className="flex items-center gap-2 text-gold-pale/85">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.16em]">Typical visit: {selectedService.duration}</span>
                    </div>
                    <h3 className="mt-4 max-w-2xl font-cormorant text-5xl font-light leading-[0.88] tracking-[-0.04em] text-ivory sm:text-6xl">
                      {selectedService.title}
                    </h3>
                    <p className="mt-4 max-w-xl font-jost text-sm font-light leading-7 text-ivory/74 sm:text-base">
                      {selectedService.summary}
                    </p>
                  </div>
                </div>

                <div className="relative p-6 sm:p-8">
                  <div className={`h-px w-24 bg-gradient-to-r ${selectedTone.line}`} />
                  <p className="mt-6 max-w-2xl font-jost text-sm font-light leading-7 text-ivory/70 sm:text-base">
                    {selectedService.detail}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {selectedService.focus.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 rounded-xl border border-ivory/10 bg-ivory/[0.045] p-3">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${selectedTone.icon}`}>
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span className="font-jost text-xs leading-5 text-ivory/75">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a href="#contact" className="btn-gold-3d group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso transition-transform duration-300 hover:-translate-y-0.5">
                      Discuss {selectedService.title}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                    <span className="font-jost text-xs text-ivory/45">Select any treatment on the right to explore it.</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.aside>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4" role="tabpanel" aria-label="Available dental treatments">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => {
                const isSelected = service.id === selectedService.id;
                const tone = toneClasses[service.tone];
                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12, scale: prefersReducedMotion ? 1 : 0.97 }}
                    transition={{ delay: Math.min(index * 0.035, 0.22), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    onClick={() => setSelectedServiceId(service.id)}
                    aria-pressed={isSelected}
                    className={`group relative min-h-[240px] overflow-hidden rounded-[1.4rem] border text-left shadow-[0_13px_30px_rgba(0,0,0,0.16)] transition-colors duration-300 ${
                      isSelected ? `${tone.border} bg-ivory/[0.11]` : 'border-ivory/12 bg-ivory/[0.045] hover:border-ivory/28 hover:bg-ivory/[0.08]'
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 38vw, 100vw"
                      className="object-cover opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-48"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(15,13,10,0.78)_0%,rgba(15,13,10,0.34)_52%,rgba(15,13,10,0.88)_100%)]" />
                    <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${tone.glow} ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    <div className={`absolute left-5 right-5 top-0 h-px bg-gradient-to-r ${tone.line} transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`} />

                    <div className="relative flex min-h-[240px] flex-col justify-between p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 font-jost text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${tone.chip}`}>
                          {service.eyebrow}
                        </span>
                        <span className="font-cormorant text-xl font-light text-ivory/60">{getServiceNumber(service.id)}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-ivory/52">
                          <Clock3 className="h-3 w-3" aria-hidden="true" />
                          <span className="font-jost text-[10px] font-medium uppercase tracking-[0.13em]">{service.duration}</span>
                        </div>
                        <h4 className="mt-3 font-cormorant text-3xl font-light leading-[0.93] tracking-[-0.03em] text-ivory sm:text-4xl">
                          {service.title}
                        </h4>
                        <p className="mt-3 pr-3 font-jost text-xs font-light leading-5 text-ivory/67 sm:text-sm">
                          {service.summary}
                        </p>
                        <span className={`mt-5 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isSelected ? 'text-gold-pale' : 'text-ivory/62 group-hover:text-gold-pale'}`}>
                          {isSelected ? 'Now exploring' : 'Explore treatment'}
                          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-10 flex flex-col gap-5 border-t border-ivory/14 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3 text-ivory/62">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne-gold/25 bg-champagne-gold/10 text-champagne-gold">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="max-w-2xl font-jost text-sm leading-6">Your care does not need to fit a preset package. We will help you build a treatment plan around your priorities.</p>
          </div>
          <a href="#contact" className="btn-gold-3d group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full px-7 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-espresso transition-transform duration-300 hover:-translate-y-0.5">
            Book a consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
