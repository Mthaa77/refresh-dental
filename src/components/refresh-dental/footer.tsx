'use client'

import { motion } from 'framer-motion'
import {
  Instagram,
  Facebook,
  Linkedin,
  Music,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Financing', href: '#financing' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Dental Implants',
  'Teeth Whitening',
  'Aligners',
  'Fillers',
  'Root Canal',
  'Scaling',
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/refresh_dental_',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/17deYWeBn9',
    icon: Facebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/drlebogangmalunga',
    icon: Linkedin,
    isBlueHover: true,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@refresh_dental',
    icon: Music,
  },
]

export default function Footer() {
  return (
    <footer className="bg-espresso relative">
      {/* Gold gradient line at top of footer */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-champagne-gold to-transparent shadow-elevated" />

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 shadow-inner-gold rounded-t-2xl">
        {/* Column 1 — Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/refresh-dental-logo.jpg"
              alt="Refresh Dental Logo"
              className="w-12 h-12 rounded-full object-cover ring-1 ring-champagne-gold/20"
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
            />
            <span className="font-cormorant text-2xl gold-gradient-text">
              Refresh Dental
            </span>
          </div>
          <p className="text-ivory/65 italic text-sm leading-relaxed">
            &ldquo;Refreshed smiles, refreshed lives.&rdquo;
          </p>

          {/* Social Icons with hover glow */}
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{
                  scale: 1.15,
                  boxShadow: social.isBlueHover
                    ? '0 0 16px rgba(59, 111, 160, 0.5)'
                    : '0 0 16px rgba(184, 152, 48, 0.5)',
                }}
                transition={{ duration: 0.25 }}
                className={`flex items-center justify-center h-11 w-11 rounded-full border border-ivory/25 text-ivory/65 transition-all duration-300 hover-lift ${
                  social.isBlueHover
                    ? 'hover:text-accent-blue hover:border-accent-blue/40'
                    : 'hover:text-champagne-gold hover:border-champagne-gold/40'
                } shadow-premium`}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="space-y-4">
          <h4 className="font-dm-serif text-ivory text-lg">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ivory/75 hover:text-champagne-gold transition-colors text-[15px] hover:underline hover:underline-offset-4 hover:decoration-champagne-gold/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div className="space-y-4">
          <h4 className="font-dm-serif text-soft-blue text-lg">Services</h4>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service}>
                <a href="#services" className="text-ivory/75 hover:text-champagne-gold transition-colors text-[15px] hover:underline hover:underline-offset-4 hover:decoration-champagne-gold/50">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div className="space-y-4">
          <h4 className="font-dm-serif text-ivory text-lg">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <span className="text-ivory/75 text-[15px]">
                153 River Road, Centurion
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <span className="text-ivory/75 text-[15px]">
                061 416 4649 / 012 883 3636
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <a
                href="mailto:admin@refreshdental.co.za"
                className="text-ivory/75 hover:text-champagne-gold transition-colors text-[15px]"
              >
                admin@refreshdental.co.za
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <a
                href="mailto:drlebo@refreshdental.co.za"
                className="text-ivory/75 hover:text-champagne-gold transition-colors text-[15px]"
              >
                drlebo@refreshdental.co.za
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center">
            <p className="text-ivory/55 text-xs">
              © 2025 Refresh Dental. Built by Carter Digitals.
            </p>
            <span className="hidden sm:inline text-ivory/45 text-xs">|</span>
            <a
              href="#"
              className="text-ivory/55 hover:text-champagne-gold transition-colors text-xs"
            >
              Privacy Policy
            </a>
          </div>
          {/* Animated back to top arrow — right aligned */}
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex items-center gap-1.5 text-ivory/55 hover:text-champagne-gold transition-colors rounded-full px-3 py-2 hover:bg-ivory/5 min-h-[44px]"
          >
            <span className="text-xs font-jost tracking-wider uppercase">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
