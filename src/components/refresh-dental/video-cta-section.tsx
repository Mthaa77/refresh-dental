'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

export default function VideoCtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #0f0c08 50%, #2C1810 100%)',
      }}
    >
      {/* Static gold orbs — no floating animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] left-[15%] h-64 w-64 rounded-full bg-champagne-gold/[0.07] blur-3xl"
        />
        <div
          className="absolute top-[40%] right-[10%] h-80 w-80 rounded-full bg-champagne-gold/[0.05] blur-3xl"
        />
        <div
          className="absolute bottom-[10%] left-[50%] h-56 w-56 rounded-full bg-champagne-gold/[0.06] blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Gold label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-jost text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-champagne-gold mb-6"
        >
          Your Journey Starts Here
        </motion.p>

        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent mx-auto mb-8"
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-light text-ivory text-shadow-ivory leading-tight mb-6"
        >
          Your Best Smile Is One
          <br />
          Appointment Away
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-jost text-ivory/75 text-base md:text-lg max-w-xl mx-auto mb-10 md:mb-12"
        >
          You deserve a smile that reflects the very best version of yourself. Let Dr. Malunga and her team create a bespoke treatment plan crafted uniquely for you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {/* Primary CTA — Book */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#A07D1A] px-8 py-4 font-jost text-sm font-semibold uppercase tracking-wider text-white shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:-translate-y-0.5 active:scale-[0.97] overflow-hidden"
          >
            {/* CSS shimmer overlay on hover */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
                <div
                  className="h-full w-1/3"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  }}
                />
              </div>
            </div>
            <span className="relative z-10">Book Your Free Consultation</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Secondary CTA — Call */}
          <a
            href="tel:+27614164649"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-8 py-4 font-jost text-sm font-semibold uppercase tracking-wider text-ivory/90 transition-all duration-300 hover:border-ivory/60 hover:text-ivory hover:-translate-y-0.5 active:scale-[0.97] hover:bg-ivory/5"
          >
            <Phone className="h-4 w-4" />
            Call 061 416 4649
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-jost text-xs md:text-sm text-ivory/55 tracking-wide"
        >
          ✓ No obligation · ✓ Complimentary consultation · ✓ All medical aids accepted
        </motion.p>
      </div>
    </section>
  );
}
