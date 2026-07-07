'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Smile design',
    eyebrow: 'Cosmetic dentistry',
    description: 'Whitening, veneers and restorative artistry shaped around the smile you want to see in the mirror.',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    className: 'lg:col-span-7 lg:row-span-2 min-h-[430px] sm:min-h-[500px]',
    tone: 'gold',
  },
  {
    number: '02',
    title: 'Dental implants',
    eyebrow: 'Permanent restoration',
    description: 'A considered path to restoring function, confidence and a natural-looking smile.',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    className: 'lg:col-span-5 min-h-[300px]',
    tone: 'teal',
  },
  {
    number: '03',
    title: 'Preventive care',
    eyebrow: 'Healthy foundations',
    description: 'Gentle check-ups, hygiene and clear guidance to protect your smile long-term.',
    image: '/images/clinic/environment/modern-operatory.jpg',
    className: 'lg:col-span-5 min-h-[300px]',
    tone: 'ivory',
  },
  {
    number: '04',
    title: 'Restorative dentistry',
    eyebrow: 'Repair with precision',
    description: 'Thoughtful restorations, crowns and treatment plans that put comfort first.',
    image: '/images/clinic/procedures/treatment-in-progress.jpg',
    className: 'lg:col-span-4 min-h-[310px]',
    tone: 'ivory',
  },
  {
    number: '05',
    title: 'Clear alignment',
    eyebrow: 'Subtle transformation',
    description: 'Discreet orthodontic options for a more balanced, confident smile.',
    image: '/images/clinic/procedures/teeth-whitening-treatment.jpg',
    className: 'lg:col-span-4 min-h-[310px]',
    tone: 'teal',
  },
  {
    number: '06',
    title: 'Facial aesthetics',
    eyebrow: 'Finishing details',
    description: 'Non-surgical enhancements that complement your features with restraint and care.',
    image: '/images/clinic/environment/modern-operatory.jpg',
    className: 'lg:col-span-4 min-h-[310px]',
    tone: 'gold',
  },
] as const;

const cardGradients = {
  gold: 'from-espresso/92 via-espresso/55 to-champagne-gold/20',
  teal: 'from-espresso/92 via-espresso/62 to-sage-teal/45',
  ivory: 'from-espresso/90 via-espresso/58 to-brown-warm/40',
};

const cardAccents = {
  gold: 'border-champagne-gold/30 text-gold-pale',
  teal: 'border-teal-light/30 text-teal-light',
  ivory: 'border-ivory/30 text-ivory',
};

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(240,235,225,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_20%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-champagne-gold/20 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[480px] w-[480px] rounded-full bg-sage-teal/25 blur-[130px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-ivory/15 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-champagne-gold sm:w-16" />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-pale/80 sm:text-[11px]">Care, curated</span>
            </div>
            <h2 className="max-w-3xl font-cormorant text-[clamp(3.4rem,6vw,6.7rem)] font-light leading-[0.86] tracking-[-0.05em] text-ivory">
              Dentistry that feels as considered as it looks.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pb-2"
          >
            <p className="max-w-xl font-jost text-base font-light leading-8 text-ivory/70 sm:text-lg">
              From everyday prevention to confidence-changing treatment, your care plan is shaped around your health, your goals and your comfort—not a one-size-fits-all checklist.
            </p>
            <a href="#contact" className="group mt-7 inline-flex items-center gap-3 font-jost text-[11px] font-bold uppercase tracking-[0.16em] text-gold-pale transition-colors hover:text-ivory">
              Plan your visit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-12">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: Math.min(index * 0.07, 0.28), duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              className={`group relative isolate overflow-hidden rounded-[1.65rem] border bg-espresso/50 ${service.className} ${cardAccents[service.tone]}`}
            >
              <Image
                src={service.image}
                alt={`${service.title} treatment at Refresh Dental`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${cardGradients[service.tone]} transition-opacity duration-500 group-hover:opacity-85`} />
              <div aria-hidden="true" className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-ivory/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div aria-hidden="true" className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-champagne-gold/15 blur-3xl transition-opacity duration-500 group-hover:bg-champagne-gold/25" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className={`inline-flex rounded-full border bg-espresso/30 px-3 py-1.5 font-jost text-[10px] font-semibold uppercase tracking-[0.17em] backdrop-blur-sm ${cardAccents[service.tone]}`}>
                    {service.eyebrow}
                  </span>
                  <span className="font-cormorant text-2xl font-light text-ivory/55">{service.number}</span>
                </div>

                <div className="mt-20 max-w-[33rem]">
                  <h3 className="font-cormorant text-4xl font-light leading-[0.94] tracking-[-0.035em] text-ivory sm:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md font-jost text-sm font-light leading-6 text-ivory/76 sm:text-base sm:leading-7">
                    {service.description}
                  </p>
                  <a href="#contact" className="mt-7 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-gold-pale transition-colors hover:text-ivory">
                    Discuss this treatment
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-10 flex flex-col gap-5 border-t border-ivory/15 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3 text-ivory/65">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne-gold/25 bg-champagne-gold/10 text-champagne-gold">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="font-jost text-sm leading-6">Not sure where to start? Your first consultation is designed to make the next step clear.</p>
          </div>
          <a href="#contact" className="btn-gold-3d inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso transition-transform hover:-translate-y-0.5">
            <Check className="h-4 w-4" aria-hidden="true" />
            Book a consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
