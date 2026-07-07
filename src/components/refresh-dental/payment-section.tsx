'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';

const medicalAids = ['Discovery', 'Momentum', 'Bonitas', 'All schemes'];

const paymentPoints = [
  'All major medical aids accepted',
  'Flexible payment options available',
  'Clear guidance before treatment begins',
];

export default function PaymentSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="financing" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(184,152,48,0.17),transparent_27%),radial-gradient(circle_at_10%_80%,rgba(45,107,92,0.11),transparent_28%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-10 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-champagne-gold/30 to-transparent lg:block" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-champagne-gold sm:w-16" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-rich sm:text-[11px]">Payment & medical aid</span>
          </div>
          <h2 className="mt-7 font-cormorant text-[clamp(3.4rem,6vw,6.5rem)] font-light leading-[0.86] tracking-[-0.055em] text-espresso">
            Care should feel possible.
          </h2>
          <p className="mt-6 max-w-2xl font-jost text-base font-light leading-8 text-brown-muted sm:text-lg">
            We make the financial conversation simple and transparent, so you can focus on the care that is right for your health and confidence.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-7">
          <motion.article
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.05, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.75rem] border border-soft-border bg-card p-7 shadow-[0_22px_55px_rgba(15,13,10,0.09)] sm:p-10"
          >
            <div aria-hidden="true" className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-sage-teal/10 blur-3xl" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-teal/[0.09] text-sage-teal">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="relative mt-8 font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-teal">Medical aid welcome</p>
            <h3 className="relative mt-3 max-w-md font-cormorant text-4xl font-light leading-[0.95] tracking-[-0.035em] text-espresso">Bring your card. We&apos;ll help with the rest.</h3>
            <p className="relative mt-5 max-w-lg font-jost text-sm font-light leading-7 text-brown-muted sm:text-base">
              We accept all major South African medical aid schemes and will guide you through the practical details before your appointment.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-2">
              {medicalAids.map((aid) => (
                <span key={aid} className="rounded-full border border-sage-teal/15 bg-sage-teal/[0.07] px-3.5 py-2 font-jost text-[10px] font-semibold uppercase tracking-[0.13em] text-sage-teal">
                  {aid}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate min-h-[420px] overflow-hidden rounded-[1.75rem] border border-champagne-gold/25 bg-espresso p-7 text-ivory shadow-[0_22px_55px_rgba(15,13,10,0.18)] sm:p-10"
          >
            <Image
              src="/images/clinic/real/athenapay-installments.jpg"
              alt="Flexible payment options available at Refresh Dental"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="-z-20 object-cover opacity-45"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(125deg,rgba(15,13,10,0.96)_0%,rgba(15,13,10,0.78)_55%,rgba(45,107,92,0.55)_100%)]" />
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-champagne-gold/25 bg-champagne-gold/10 text-champagne-gold">
              <CreditCard className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-8 font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/75">Flexible payment options</p>
            <h3 className="mt-3 max-w-md font-cormorant text-4xl font-light leading-[0.95] tracking-[-0.035em] text-ivory">A treatment plan built around your reality.</h3>
            <p className="mt-5 max-w-lg font-jost text-sm font-light leading-7 text-ivory/72 sm:text-base">
              Ask our team about available payment arrangements, including Athena options for qualifying treatments. We will explain the process before you decide.
            </p>
            <a href="#contact" className="group mt-9 inline-flex items-center gap-3 font-jost text-[11px] font-bold uppercase tracking-[0.16em] text-gold-pale transition-colors hover:text-ivory">
              Discuss your options
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.13, duration: 0.65 }}
          className="mt-8 grid gap-4 rounded-[1.5rem] border border-champagne-gold/20 bg-ivory/70 p-5 shadow-[0_16px_40px_rgba(15,13,10,0.06)] backdrop-blur-sm sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne-gold/10 text-champagne-gold">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {paymentPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2 font-jost text-xs text-brown-muted">
                <Check className="h-3.5 w-3.5 text-sage-teal" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
          <a href="#contact" className="group inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-gold-rich transition-colors hover:text-espresso">
            Ask our team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
