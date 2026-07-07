'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import ContactForm from './contact-form';
import TradingHours from './trading-hours';

const contactMethods = [
  {
    icon: Phone,
    label: 'Call the practice',
    value: '061 416 4649',
    href: 'tel:+27614164649',
  },
  {
    icon: MessageCircle,
    label: 'Message on WhatsApp',
    value: 'Chat with our team',
    href: 'https://wa.me/27614164649',
  },
  {
    icon: Mail,
    label: 'Email us',
    value: 'admin@refreshdental.co.za',
    href: 'mailto:admin@refreshdental.co.za',
  },
];

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(184,152,48,0.22),transparent_25%),radial-gradient(circle_at_88%_76%,rgba(45,107,92,0.28),transparent_28%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(240,235,225,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.10)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:linear-gradient(135deg,black,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-16 h-20 w-20 border-l border-t border-champagne-gold/45 sm:left-12 lg:left-16" />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-20 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-champagne-gold sm:w-16" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-pale/75 sm:text-[11px]">Start your visit</span>
          </div>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[clamp(3.5rem,6.2vw,6.8rem)] font-light leading-[0.84] tracking-[-0.055em] text-ivory">
            A better dental visit starts here.
          </h2>
          <p className="mt-7 max-w-xl font-jost text-base font-light leading-8 text-ivory/70 sm:text-lg">
            Tell us what you need, what has been on your mind, or what you would like to change. We will help you find the right next step.
          </p>

          <div className="mt-10 space-y-3">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('https') ? '_blank' : undefined}
                rel={method.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-champagne-gold/35 hover:bg-ivory/[0.08]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne-gold/10 text-champagne-gold">
                  <method.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-jost text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory/45">{method.label}</span>
                  <span className="mt-1 block truncate font-jost text-sm text-ivory/88">{method.value}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-gold-pale/70 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-10 border-t border-ivory/12 pt-8">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale/75">Visit the practice</p>
            <p className="mt-3 font-cormorant text-3xl font-light leading-[1.05] text-ivory">Family Wellness Centre</p>
            <p className="mt-2 font-jost text-sm leading-6 text-ivory/65">153 River Road, Lyttelton Manor, Centurion, Pretoria 0157</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=153+River+Road+Lyttelton+Manor+Centurion+Pretoria+0157"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.16em] text-gold-pale transition-colors hover:text-ivory"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get directions
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 max-w-sm rounded-2xl border border-ivory/12 bg-ivory/[0.045] p-5 backdrop-blur-md">
            <TradingHours />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-champagne-gold/25 bg-ivory p-1 shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
        >
          <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />
          <div className="relative rounded-[1.82rem] bg-[linear-gradient(150deg,#FAF7F2_0%,#F0EBE1_58%,#E8E1D5_100%)] p-6 sm:p-9 lg:p-11">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich">Consultation request</p>
                <h3 className="mt-3 font-cormorant text-4xl font-light leading-[0.92] tracking-[-0.035em] text-espresso sm:text-5xl">Let&apos;s talk about your smile.</h3>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-teal/[0.08] text-sage-teal sm:flex">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
