'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, BadgeCheck, Clock, Heart, ArrowRight } from 'lucide-react';

const guarantees = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: '100% Satisfaction Promise',
    description:
      "If you're not completely satisfied with your treatment, we'll make it right — no questions asked.",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: 'HPCSA Certified Practice',
    description:
      'Fully registered with the Health Professions Council of South Africa. Your safety is non-negotiable.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Same-Day Emergency Care',
    description:
      "Dental emergencies don't wait — and neither do we. Call us and we'll see you today.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Compassionate, Never Clinical',
    description:
      'We treat people, not just teeth. Expect warmth, empathy, and genuine care at every visit.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function GuaranteeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFAF6 0%, #F5EFE6 50%, #FDFAF6 100%)' }}
    >
      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="gold-gradient-text text-shadow-espresso font-cormorant text-3xl md:text-4xl lg:text-5xl font-light text-center mb-4"
        >
          Our Smile Satisfaction Guarantee
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-jost text-espresso/70 text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          We stand behind every treatment we perform with absolute confidence. Your satisfaction
          isn&apos;t just our goal — it&apos;s our promise.
        </motion.p>

        {/* Guarantee Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="glass-card shadow-elevated rounded-3xl p-8 md:p-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-8 md:gap-10"
          >
            {guarantees.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group flex items-start gap-5 md:gap-6 cursor-default"
              >
                {/* Gold circle icon */}
                <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-champagne-gold to-[#d4b078] text-white shadow-gold transition-transform duration-300 group-hover:scale-110 group-hover:shadow-gold-strong">
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <h3 className="font-dm-serif text-lg md:text-xl text-espresso mb-2 transition-colors duration-300 group-hover:text-champagne-gold">
                    {item.title}
                  </h3>
                  <p className="font-jost text-sm md:text-base text-espresso/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#d4b078] px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-wider text-white shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Experience the Refresh Dental Difference
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
