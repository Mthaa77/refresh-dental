'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search, ThumbsUp, ThumbsDown, MessageCircle, ArrowRight } from 'lucide-react'

type Category = 'Payment' | 'General' | 'Emergency' | 'Cosmetic' | 'Aesthetics'

const categoryColors: Record<Category, string> = {
  Payment: '#B89830',
  General: '#2D6B5C',
  Emergency: '#A63D40',
  Cosmetic: '#D4C08A',
  Aesthetics: '#B89830',
}

const categoryGradients: Record<Category, string> = {
  Payment: 'from-champagne-gold to-gold-light',
  General: 'from-sage-teal to-sage-teal/40',
  Emergency: 'from-accent-red to-accent-red/40',
  Cosmetic: 'from-gold-light to-champagne-gold/40',
  Aesthetics: 'from-champagne-gold to-champagne-gold/50',
}

const faqs: {
  question: string
  answer: string
  category: Category
}[] = [
  {
    question: 'Do you accept medical aids?',
    answer:
      'Yes! We accept ALL major South African medical aid schemes, including Discovery, Bonitas, Momentum, Medihelp, GEMS, and many more. Simply bring your medical aid card to your appointment and we handle the rest — no paperwork stress, no lengthy claim forms. Our team submits claims directly so you can focus on your smile.',
    category: 'Payment',
  },
  {
    question: 'How do the interest-free payment plans work?',
    answer:
      'We\'ve partnered with Athena to offer flexible, interest-free payment plans that make premium dental care accessible to everyone. Choose between 3 months (4 instalments) or 6 months (7 instalments). A once-off 6% processing fee applies, and there is absolutely no interest charged — ever. Use our online calculator on the financing section to estimate your monthly payments before you commit.',
    category: 'Payment',
  },
  {
    question: 'What should I expect at my first consultation?',
    answer:
      'Your first consultation is a comprehensive 30-minute experience designed to give you complete clarity. Dr. Malunga will perform a thorough oral examination, take digital X-rays if needed, discuss your concerns and goals, and recommend a personalised treatment plan. There is absolutely no obligation to proceed — we believe in informed, pressure-free care so you can make the best decision for your smile.',
    category: 'General',
  },
  {
    question: 'Do you offer emergency dental appointments?',
    answer:
      'Absolutely — dental emergencies don\'t wait, and neither do we. Dr. Malunga is available for urgent cases including severe toothache, broken teeth, knocked-out teeth, and abscesses. Call us immediately at 061 416 4649 and we will do our absolute best to see you the same day. We\'re also conveniently located close to OR Tambo International Airport for travellers in need.',
    category: 'Emergency',
  },
  {
    question: 'Is teeth whitening safe?',
    answer:
      'Professional teeth whitening performed at Refresh Dental is completely safe and supervised directly by Dr. Malunga. We use only industry-leading whitening systems that deliver brilliant results without compromising your enamel health. Most patients see a dramatic improvement in just one session, and we provide detailed aftercare instructions to maintain your bright new smile for months to come.',
    category: 'Cosmetic',
  },
  {
    question: 'What are "Slimming Wires" (clear aligners)?',
    answer:
      'Slimming Wires are our branded clear aligner treatment — a modern, virtually invisible alternative to traditional metal braces. They gradually and gently straighten your teeth using a series of custom-made, transparent aligners. They are removable for eating and cleaning, exceptionally comfortable, and perfect for adults and teens who want a confident smile without the look of braces. Treatment typically takes 6–18 months depending on complexity.',
    category: 'Cosmetic',
  },
  {
    question: 'Do you offer facial aesthetic treatments?',
    answer:
      'Yes! Dr. Malunga is a qualified aesthetic practitioner offering professional filler and neurotoxin treatments to beautifully complement your refreshed smile. These non-surgical treatments can smooth fine lines and wrinkles, restore youthful facial volume, and enhance your natural features — all administered with the same meticulous care, precision, and attention to detail as our dental services.',
    category: 'Aesthetics',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'We\'ve made booking as easy as possible! You can call us at 061 416 4649, send a WhatsApp message to the same number, or use the contact form on this website. Our friendly team will respond promptly and help you find a convenient time. New patients are always welcome — we can\'t wait to meet you and start your smile journey together.',
    category: 'General',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({})

  const expandedCount = openIndex !== null ? 1 : 0

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs
    const q = searchQuery.toLowerCase()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setFeedback((prev) => ({ ...prev, [index]: type }))
  }

  return (
    <section className="bg-ivory py-20 md:py-28 overflow-hidden">
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
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Frequently Asked Questions
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Got questions? We&rsquo;ve got answers. If you don&rsquo;t find what you&rsquo;re looking for, our friendly team is just a phone call away.
          </motion.p>
        </motion.div>

        {/* Search/Filter Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-soft-border bg-card py-3 pl-11 pr-4 font-jost text-sm text-espresso placeholder:text-sand-muted/60 outline-none transition-all focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/10"
            />
            {searchQuery && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-jost text-brown-muted/80"
              >
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Expanded counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center justify-between"
        >
          <span className="font-jost text-xs text-brown-muted/80 uppercase tracking-wider">
            {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''}
          </span>
          {expandedCount > 0 && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-xs font-jost text-champagne-gold"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne-gold" />
              1 expanded
            </motion.span>
          )}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-soft-border bg-card transition-all duration-300 relative shadow-premium hover-glow hover:border-champagne-gold/30"
              style={{
                boxShadow:
                  openIndex === i
                    ? '0 8px 32px -4px rgba(184, 152, 48, 0.15)'
                    : 'none',
                borderColor:
                  openIndex === i
                    ? 'rgba(184, 152, 48, 0.45)'
                    : undefined,
              }}
            >
              {/* Animated gradient left border based on category */}
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${categoryGradients[faq.category]}`}
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
                      backgroundColor: openIndex === i ? (i % 2 === 0 ? '#B89830' : '#3B6FA0') : (i % 2 === 0 ? 'rgba(184, 152, 48, 0.1)' : 'rgba(59, 111, 160, 0.1)'),
                      color: openIndex === i ? '#FFFFFF' : (i % 2 === 0 ? '#B89830' : '#3B6FA0'),
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="font-dm-serif text-lg md:text-xl text-espresso">
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
                    <div className="px-6 pb-6 pt-0 pl-[3.25rem] blue-tint rounded-b-2xl">
                      <div className="h-px bg-soft-border mb-4" />
                      <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
                        {faq.answer}
                      </p>

                      {/* "Did this answer your question?" feedback row */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="mt-5 flex items-center gap-3"
                      >
                        <span className="font-jost text-xs text-brown-muted/80">
                          Did this answer your question?
                        </span>
                        <div className="flex items-center gap-1.5">
                          <motion.button
                            onClick={() => handleFeedback(i, 'up')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-jost transition-colors ${
                              feedback[i] === 'up'
                                ? 'bg-sage-teal/10 text-sage-teal'
                                : 'bg-sand/50 text-brown-muted/80 hover:text-sage-teal'
                            }`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            Yes
                          </motion.button>
                          <motion.button
                            onClick={() => handleFeedback(i, 'down')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-jost transition-colors ${
                              feedback[i] === 'down'
                                ? 'bg-warm-blush/10 text-warm-blush'
                                : 'bg-sand/50 text-brown-muted/80 hover:text-warm-blush'
                            }`}
                          >
                            <ThumbsDown className="h-3 w-3" />
                            No
                          </motion.button>
                        </div>
                        {feedback[i] && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-jost text-[10px] text-sage-teal/70"
                          >
                            Thank you for your feedback!
                          </motion.span>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <Search className="mx-auto h-8 w-8 text-sand-muted/40 mb-3" />
              <p className="font-jost text-sm text-brown-muted/80">
                No questions match &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 font-jost text-xs text-champagne-gold underline underline-offset-2"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>

        {/* "Still have questions?" CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-champagne-gold/20 bg-gradient-to-br from-champagne-gold/5 via-card to-gold-light/5 p-8 text-center"
          >
            {/* Decorative corner accents */}
            <svg className="absolute top-3 left-3 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 2 L2 10 L10 10" stroke="#B89830" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            </svg>
            <svg className="absolute top-3 right-3 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M18 2 L18 10 L10 10" stroke="#B89830" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            </svg>
            <svg className="absolute bottom-3 left-3 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 18 L2 10 L10 10" stroke="#B89830" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            </svg>
            <svg className="absolute bottom-3 right-3 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M18 18 L18 10 L10 10" stroke="#B89830" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            </svg>

            <motion.div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-champagne-gold/10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircle className="h-5 w-5 text-champagne-gold" />
            </motion.div>
            <h3 className="font-dm-serif text-xl text-espresso mb-2">
              Still Have Questions?
            </h3>
            <p className="font-jost text-sm text-brown-muted mb-6 max-w-sm mx-auto">
              We&apos;d love to hear from you. Get in touch with our friendly team and we&apos;ll help you with anything you need.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-7 py-3 font-jost text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#A07D1A] hover:shadow-lg hover:shadow-champagne-gold/20"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
