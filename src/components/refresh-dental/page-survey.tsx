'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send, CheckCircle2, MessageSquare } from 'lucide-react'

const EXPERIENCE_OPTIONS = [
  { emoji: '😊', label: 'Great', value: 'great' },
  { emoji: '🙂', label: 'Good', value: 'good' },
  { emoji: '😐', label: 'Okay', value: 'okay' },
  { emoji: '😕', label: 'Poor', value: 'poor' },
]

export default function PageSurvey() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [experience, setExperience] = useState('')
  const [recommend, setRecommend] = useState<'yes' | 'no' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const displayRating = hoverRating || rating
  const canSubmit = rating > 0 && experience !== '' && recommend !== null

  const handleSubmit = () => {
    if (!canSubmit) return
    setIsSubmitted(true)
  }

  const charCount = feedback.length
  const maxChars = 200

  return (
    <section
      id="survey"
      className="bg-[#0F0D0A] py-20 lg:py-24 overflow-hidden relative"
    >
      {/* Gold border frame */}
      <div className="absolute inset-4 md:inset-8 rounded-3xl border border-champagne-gold/15 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <MessageSquare className="h-8 w-8 text-champagne-gold mx-auto mb-3" />
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1]">
            How Are We Doing?
          </h2>
          <p className="font-jost text-[#F0EBE1]/50 mt-3 max-w-md mx-auto">
            Your feedback helps us improve. It only takes a moment and means
            the world to our team.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Thank You State */
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-champagne-gold/10 border border-champagne-gold/20 mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-champagne-gold" />
              </motion.div>
              <h3 className="font-cormorant text-2xl md:text-3xl text-[#F0EBE1] mb-3">
                Thank You!
              </h3>
              <p className="font-jost text-[#F0EBE1]/50 max-w-sm mx-auto leading-relaxed">
                Your feedback has been received. We truly appreciate you taking
                the time to share your experience with us.
              </p>
              <motion.div
                className="mt-6 flex justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-champagne-gold fill-champagne-gold"
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            /* Survey Form */
            <motion.div
              key="survey-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Question 1: Star Rating */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center"
              >
                <label className="block font-dm-serif text-lg text-[#F0EBE1] mb-4">
                  How would you rate your visit?
                </label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="relative"
                    >
                      <Star
                        className={`h-8 w-8 md:h-10 md:w-10 transition-transform duration-200 ${
                          star <= displayRating
                            ? 'text-champagne-gold fill-champagne-gold scale-110'
                            : 'text-[#F0EBE1]/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="font-jost text-xs text-champagne-gold mt-2">
                    {rating === 1 && 'We\'re sorry to hear that'}
                    {rating === 2 && 'We\'ll work to improve'}
                    {rating === 3 && 'Thanks for your feedback'}
                    {rating === 4 && 'Glad you had a good visit!'}
                    {rating === 5 && 'Wonderful! We\'re thrilled!'}
                  </p>
                )}
              </motion.div>

              {/* Question 2: Emoji Experience */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center"
              >
                <label className="block font-dm-serif text-lg text-[#F0EBE1] mb-4">
                  How was your experience?
                </label>
                <div className="flex justify-center gap-3 md:gap-4">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setExperience(opt.value)}
                      className={`
                        flex flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 md:px-5 md:py-4 transition-all duration-200
                        ${experience === opt.value
                          ? 'border-champagne-gold bg-champagne-gold/10'
                          : 'border-[#F0EBE1]/10 bg-[#F0EBE1]/[0.03] hover:border-[#F0EBE1]/20 hover:bg-[#F0EBE1]/[0.06]'
                        }
                      `}
                    >
                      <span className="text-2xl md:text-3xl">{opt.emoji}</span>
                      <span
                        className={`font-jost text-xs ${
                          experience === opt.value
                            ? 'text-champagne-gold font-semibold'
                            : 'text-[#F0EBE1]/40'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Question 3: Recommend Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center"
              >
                <label className="block font-dm-serif text-lg text-[#F0EBE1] mb-4">
                  Would you recommend us?
                </label>
                <div className="flex justify-center">
                  <div className="inline-flex rounded-xl border border-[#F0EBE1]/10 bg-[#F0EBE1]/[0.03] p-1 relative">
                    {(['yes', 'no'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setRecommend(option)}
                        className={`
                          relative px-8 py-2.5 rounded-lg font-jost text-sm font-medium transition-colors duration-200
                          ${recommend === option
                            ? 'text-[#0F0D0A]'
                            : 'text-[#F0EBE1]/40 hover:text-[#F0EBE1]/60'
                          }
                        `}
                      >
                        {recommend === option && (
                          <span
                            className="absolute inset-0 rounded-lg bg-champagne-gold transition-all duration-300"
                          />
                        )}
                        <span className="relative z-10 capitalize">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Question 4: Free-text Feedback */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-center"
              >
                <label className="block font-dm-serif text-lg text-[#F0EBE1] mb-4">
                  Any feedback?
                </label>
                <div className="max-w-md mx-auto">
                  <textarea
                    value={feedback}
                    onChange={(e) => {
                      if (e.target.value.length <= maxChars) {
                        setFeedback(e.target.value)
                      }
                    }}
                    placeholder="Tell us what you think..."
                    rows={3}
                    maxLength={maxChars}
                    className="w-full rounded-xl border border-[#F0EBE1]/10 bg-[#F0EBE1]/[0.04] px-4 py-3 font-jost text-sm text-[#F0EBE1] placeholder:text-[#F0EBE1]/20 focus:outline-none focus:border-champagne-gold/40 focus:ring-1 focus:ring-champagne-gold/20 transition-colors resize-none"
                  />
                  <div className="flex justify-end mt-1">
                    <span
                      className={`font-jost text-[10px] ${
                        charCount > maxChars - 30
                          ? 'text-[#B85C4A]'
                          : 'text-[#F0EBE1]/20'
                      }`}
                    >
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-center pt-2"
              >
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`
                    inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 font-jost text-sm font-semibold transition-colors duration-200
                    ${canSubmit
                      ? 'bg-champagne-gold text-white shadow-lg shadow-champagne-gold/20 hover:bg-champagne-gold/90'
                      : 'bg-champagne-gold/20 text-champagne-gold/40 cursor-not-allowed'
                    }
                  `}
                >
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </button>
                {!canSubmit && (
                  <p className="font-jost text-[11px] text-[#F0EBE1]/20 mt-3">
                    Please complete all required fields to submit
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
