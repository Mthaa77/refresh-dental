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
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 — Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://static.wixstatic.com/media/a78f12_d8df1e87d3a1425a86b2e603d0ede665~mv2.jpg"
              alt="Refresh Dental Logo"
              className="w-10 h-10 rounded object-cover"
              width={40}
              height={40}
            />
            <span className="font-cormorant text-xl text-ivory">
              Refresh Dental
            </span>
          </div>
          <p className="text-ivory/50 italic text-sm leading-relaxed">
            &ldquo;Refreshed smiles, refreshed lives.&rdquo;
          </p>

          {/* Social Icons with hover glow */}
          <div className="flex items-center gap-4 pt-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 16px rgba(201, 169, 110, 0.5)',
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-ivory/15 text-ivory/50 hover:text-champagne-gold hover:border-champagne-gold/40 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="space-y-4">
          <h4 className="font-dm-serif text-ivory text-lg">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ivory/60 hover:text-champagne-gold transition-colors text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div className="space-y-4">
          <h4 className="font-dm-serif text-ivory text-lg">Services</h4>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service}>
                <span className="text-ivory/60 text-sm">{service}</span>
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
              <span className="text-ivory/60 text-sm">
                153 River Road, Centurion
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <span className="text-ivory/60 text-sm">
                061 416 4649 / 012 883 3636
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <a
                href="mailto:admin@refreshdental.co.za"
                className="text-ivory/60 hover:text-champagne-gold transition-colors text-sm"
              >
                admin@refreshdental.co.za
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-champagne-gold mt-0.5 shrink-0" />
              <a
                href="mailto:drlebo@refreshdental.co.za"
                className="text-ivory/60 hover:text-champagne-gold transition-colors text-sm"
              >
                drlebo@refreshdental.co.za
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-ivory/40 text-xs">
            © 2025 Refresh Dental. Built by Carter Digitals.
          </p>
          <span className="hidden sm:inline text-ivory/20 text-xs">|</span>
          <a
            href="#"
            className="text-ivory/40 hover:text-champagne-gold transition-colors text-xs"
          >
            Privacy Policy
          </a>
          {/* Animated back to top arrow */}
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="ml-auto sm:ml-0 flex items-center gap-1 text-ivory/40 hover:text-champagne-gold transition-colors"
          >
            <span className="text-xs font-jost tracking-wider uppercase hidden sm:inline">Top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
