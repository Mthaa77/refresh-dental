'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music,
  Phone,
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About the practice', href: '#about' },
  { label: 'Treatment atlas', href: '#services' },
  { label: 'Financing', href: '#financing' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Dental Implants',
  'Teeth Whitening',
  'Aligners',
  'Crowns & Veneers',
  'Root Canal Therapy',
  'Scaling & Polishing',
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/refresh_dental_', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/share/17deYWeBn9', icon: Facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/drlebogangmalunga', icon: Linkedin },
  { label: 'TikTok', href: 'https://www.tiktok.com/@refresh_dental', icon: Music },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d0c0a] text-ivory" role="contentinfo">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-[34rem] w-[34rem] rounded-full bg-teal-900/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber-900/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20" itemScope itemType="https://schema.org/Dentist">
        <div className="grid gap-8 border-b border-ivory/12 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-16">
          <div>
            <p className="font-jost text-[10px] font-bold uppercase tracking-[0.24em] text-amber-200/80">Your next chapter starts here</p>
            <h2 className="mt-4 max-w-3xl font-elegant text-[clamp(2.8rem,5.5vw,6rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-ivory">Ready for a calmer dental experience?</h2>
            <p className="mt-5 max-w-xl font-jost text-base leading-7 text-ivory/58">A friendly conversation is all it takes to find the right next step for your smile.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-amber-200 px-6 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-[#1b1713] shadow-[0_18px_36px_rgba(251,191,36,0.16)] transition hover:-translate-y-0.5 hover:bg-white">Book a consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>
            <a href="tel:+27614164649" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-ivory/18 bg-ivory/[0.05] px-6 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-ivory/80 transition hover:border-teal-200/45 hover:bg-teal-900/30 hover:text-white"><Phone className="h-4 w-4 text-teal-200" aria-hidden="true" /> 061 416 4649</a>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.15fr] lg:gap-10 lg:py-16">
          <div>
            <a href="#home" className="group inline-flex items-center gap-3" itemProp="url">
              <img src="/images/refresh-dental-logo.jpg" alt="Refresh Dental logo" className="h-14 w-14 rounded-2xl object-cover ring-1 ring-amber-200/25 transition group-hover:ring-amber-200/60" width={56} height={56} loading="lazy" decoding="async" />
              <span className="font-elegant text-3xl font-semibold text-ivory" itemProp="name">Refresh Dental</span>
            </a>
            <p className="mt-6 max-w-xs font-jost text-sm leading-6 text-ivory/55" itemProp="slogan">Refreshed smiles, refreshed lives — with thoughtful dentistry for real life.</p>
            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} whileHover={{ y: -3, scale: 1.06 }} whileTap={{ scale: 0.96 }} className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 bg-ivory/[0.04] text-ivory/55 transition hover:border-amber-200/50 hover:bg-amber-200/10 hover:text-amber-100"><Icon className="h-4 w-4" aria-hidden="true" /></motion.a>
              })}
            </div>
          </div>

          <div>
            <h3 className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/80">Explore</h3>
            <ul className="mt-5 space-y-3">{quickLinks.map((link) => <li key={link.label}><a href={link.href} className="group inline-flex items-center gap-2 font-jost text-sm text-ivory/60 transition hover:text-white"><span className="h-px w-0 bg-teal-200 transition-all group-hover:w-3" />{link.label}</a></li>)}</ul>
          </div>

          <div>
            <h3 className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/80">Popular care</h3>
            <ul className="mt-5 space-y-3">{services.map((service) => <li key={service}><a href="#services" className="group inline-flex items-center gap-2 font-jost text-sm text-ivory/60 transition hover:text-white"><span className="h-px w-0 bg-teal-200 transition-all group-hover:w-3" />{service}</a></li>)}</ul>
          </div>

          <div>
            <h3 className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/80">Find us</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" aria-hidden="true" /><span className="font-jost text-sm leading-6 text-ivory/60"><span itemProp="streetAddress">153 River Road</span><br /><span itemProp="addressLocality">Lyttelton Manor, Centurion</span><br /><span itemProp="addressRegion">Gauteng</span> <span itemProp="postalCode">0157</span></span></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-teal-200" aria-hidden="true" /><a href="tel:+27614164649" className="font-jost text-sm text-ivory/60 transition hover:text-white" itemProp="telephone">061 416 4649</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-teal-200" aria-hidden="true" /><a href="mailto:admin@refreshdental.co.za" className="break-all font-jost text-sm text-ivory/60 transition hover:text-white">admin@refreshdental.co.za</a></li>
            </ul>
            <a href="#contact" className="group mt-6 inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-amber-200 hover:text-white">Plan your visit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/12 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-jost text-[11px] text-ivory/38"><span>© 2025 Refresh Dental</span><span className="hidden h-1 w-1 rounded-full bg-ivory/25 sm:block" /><a href="#" className="transition hover:text-ivory/75">Privacy Policy</a><span className="hidden h-1 w-1 rounded-full bg-ivory/25 sm:block" /><span>Centurion · Pretoria</span></div>
          <motion.a href="#home" aria-label="Back to top" whileHover={{ y: -2 }} className="group inline-flex items-center gap-2 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-ivory/45 transition hover:text-amber-200"><span>Back to top</span><span className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 transition group-hover:border-amber-200/50"><ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /></span></motion.a>
        </div>
      </div>
    </footer>
  )
}
