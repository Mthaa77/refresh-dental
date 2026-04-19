'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'

export default function LocationSection() {
  return (
    <section id="contact" className="bg-ivory py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left Column — Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl overflow-hidden shadow-sm border border-soft-border h-full min-h-[400px]"
        >
          <iframe
            src="https://maps.google.com/maps?q=153+River+Road,+Centurion,+Pretoria+0157&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Refresh Dental Location"
            className="w-full h-full"
          />
        </motion.div>

        {/* Right Column — Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col justify-center space-y-8"
        >
          {/* Label + Heading */}
          <div className="space-y-3">
            <span className="text-champagne-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Find Us
            </span>
            <h3 className="font-dm-serif text-2xl text-espresso">
              Inside Family Wellness Centre
            </h3>
          </div>

          {/* Address Block */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-champagne-gold mt-0.5 shrink-0" />
              <p className="text-brown-warm leading-relaxed">
                153 River Road, Lyttelton Manor, Centurion, Pretoria 0157
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-champagne-gold shrink-0" />
              <p className="text-brown-warm">
                <a
                  href="tel:0128833636"
                  className="hover:text-champagne-gold transition-colors"
                >
                  012 883 3636
                </a>
                {' '}&{' '}
                <a
                  href="tel:0614164649"
                  className="hover:text-champagne-gold transition-colors"
                >
                  061 416 4649
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-champagne-gold shrink-0" />
              <p className="text-brown-warm">
                <a
                  href="mailto:admin@refreshdental.co.za"
                  className="hover:text-champagne-gold transition-colors"
                >
                  admin@refreshdental.co.za
                </a>
              </p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/27614164649"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-6 py-3 w-fit hover:bg-[#20BD5A] transition-colors shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Emergency Callout */}
          <div className="bg-warm-blush/30 border border-warm-blush rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warm-blush" />
              <h4 className="font-dm-serif text-lg text-espresso">
                Dental Emergency?
              </h4>
            </div>
            <p className="text-brown-muted text-sm leading-relaxed">
              Dr. Malunga is available for urgent cases. Call immediately for
              same-day emergency appointments.
            </p>
            <a
              href="tel:0614164649"
              className="inline-flex items-center gap-2 bg-champagne-gold text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:bg-champagne-gold/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              061 416 4649
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
