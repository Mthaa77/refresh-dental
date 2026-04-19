'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Do you accept medical aids?',
    answer:
      'Yes! We accept ALL major South African medical aid schemes. Simply bring your medical aid card to your appointment and we handle the rest — no paperwork stress for you.',
  },
  {
    question: 'How do the interest-free payment plans work?',
    answer:
      'We\'ve partnered with Athena to offer flexible payment plans. Choose between 3 months (4 instalments) or 6 months (7 instalments). A once-off 6% processing fee applies, and there is absolutely no interest charged. Use our online calculator to estimate your monthly payments.',
  },
  {
    question: 'What should I expect at my first consultation?',
    answer:
      'Your first consultation is a comprehensive 30-minute assessment. Dr. Malunga will examine your oral health, discuss any concerns, and recommend a personalised treatment plan. There is no obligation to proceed — we believe in informed, comfortable care.',
  },
  {
    question: 'Do you offer emergency dental appointments?',
    answer:
      'Absolutely. Dr. Malunga is available for urgent dental emergencies. Call us immediately at 061 416 4649 and we will do our best to see you the same day. We are also conveniently located close to OR Tambo International Airport.',
  },
  {
    question: 'Is teeth whitening safe?',
    answer:
      'Professional teeth whitening performed at Refresh Dental is completely safe and supervised by Dr. Malunga. We use industry-leading whitening systems that deliver brilliant results without compromising enamel health. Most patients see results in just one session.',
  },
  {
    question: 'What are "Slimming Wires" (clear aligners)?',
    answer:
      'Slimming Wires are our branded clear aligner treatment — a modern, virtually invisible alternative to traditional braces. They gradually straighten your teeth using a series of custom-made, transparent aligners. They are removable, comfortable, and perfect for adults and teens.',
  },
  {
    question: 'Do you offer facial aesthetic treatments?',
    answer:
      'Yes! Dr. Malunga offers professional filler and neurotoxin treatments to complement your refreshed smile. These non-surgical treatments can smooth fine lines, restore facial volume, and enhance your natural features — all administered with the same care and precision as our dental services.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book an appointment by calling us at 061 416 4649, sending a WhatsApp message, or using the contact form on this website. We look forward to welcoming you to Refresh Dental.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Common Questions
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-warm/70">
            Everything you need to know about your visit to Refresh Dental.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-soft-border bg-white transition-all duration-300 relative"
              style={{
                boxShadow:
                  openIndex === i
                    ? '0 8px 32px -4px rgba(201, 169, 110, 0.12)'
                    : 'none',
                borderColor:
                  openIndex === i
                    ? 'rgba(201, 169, 110, 0.4)'
                    : undefined,
              }}
            >
              {/* Gold accent bar on left side when open */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-champagne-gold to-champagne-gold/30 rounded-l-2xl"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: 'top' }}
              />

              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-sand/30"
              >
                <span className="flex items-center gap-3 pr-4">
                  {/* Number circle */}
                  <motion.span
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-jost font-semibold transition-all duration-300"
                    animate={{
                      backgroundColor: openIndex === i ? '#C9A96E' : 'rgba(201, 169, 110, 0.1)',
                      color: openIndex === i ? '#FFFFFF' : '#C9A96E',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="font-dm-serif text-lg text-espresso">
                    {faq.question}
                  </span>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus className="h-5 w-5 text-champagne-gold" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, scale: 0.98 }}
                    animate={{ height: 'auto', opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 pl-[3.25rem]">
                      <div className="h-px bg-soft-border mb-4" />
                      <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/80">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="font-jost text-sm text-brown-warm/70">
            Still have questions?{' '}
            <a
              href="#contact"
              className="font-medium text-champagne-gold underline underline-offset-4 decoration-champagne-gold/30 transition-colors hover:decoration-champagne-gold"
            >
              Get in touch with us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
