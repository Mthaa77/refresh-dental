'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, Calendar, MessageSquare, CheckCircle } from 'lucide-react'

const serviceOptions = [
  'Dental Implants',
  'Dental Consultation',
  'Scaling and Polishing',
  'Restorations',
  'Teeth Whitening',
  'Aligners / Slimming Wires',
  'Root Canal Therapy',
  'Wisdom Teeth Removal',
  'Dental Prosthesis',
  'Crowns and Veneers',
  'Fixed Dental Prosthesis',
  'Fillers & Neurotoxins',
  'Other / Not Sure',
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
        message: '',
      })
    }, 5000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const inputClassName =
    'w-full rounded-xl border border-soft-border bg-white py-3.5 pl-10 pr-4 font-jost text-sm text-espresso placeholder:text-sand-muted/60 outline-none transition-all focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/10'

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-teal/10"
        >
          <CheckCircle className="h-10 w-10 text-sage-teal" />
        </motion.div>
        <h3 className="font-cormorant text-3xl text-espresso mb-2">
          Message Sent!
        </h3>
        <p className="font-jost text-sm text-brown-muted max-w-sm">
          Thank you, {formData.firstName}! We&apos;ll get back to you within 24
          hours. For urgent matters, please call 061 416 4649.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="space-y-5"
    >
      {/* Name Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
          />
          {/* Gold underline on focus */}
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'firstName' ? 1 : 0,
              opacity: focusedField === 'firstName' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
          />
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'lastName' ? 1 : 0,
              opacity: focusedField === 'lastName' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>

      {/* Email & Phone */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Mail className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
          />
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'email' ? 1 : 0,
              opacity: focusedField === 'email' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
          />
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'phone' ? 1 : 0,
              opacity: focusedField === 'phone' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>

      {/* Service Select */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            onFocus={() => setFocusedField('service')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full appearance-none rounded-xl border border-soft-border bg-white py-3.5 px-4 font-jost text-sm text-espresso outline-none transition-all focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/10 [&>option]:text-espresso [&>option]:font-jost"
          >
            <option value="" disabled>
              Select a Service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'service' ? 1 : 0,
              opacity: focusedField === 'service' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>

      {/* Preferred Date */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Calendar className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            onFocus={() => setFocusedField('preferredDate')}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
          />
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'preferredDate' ? 1 : 0,
              opacity: focusedField === 'preferredDate' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>

      {/* Message */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-sand-muted" />
          <textarea
            name="message"
            placeholder="Tell us about your concern or what you need..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className="w-full resize-none rounded-xl border border-soft-border bg-white py-3.5 pl-10 pr-4 font-jost text-sm text-espresso placeholder:text-sand-muted/60 outline-none transition-all focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/10"
          />
          <motion.div
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: focusedField === 'message' ? 1 : 0,
              opacity: focusedField === 'message' ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#B89830] py-4 font-jost text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#A07D1A] hover:shadow-lg hover:shadow-champagne-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          ) : (
            <>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Send Message
            </>
          )}
        </button>
        {/* CSS spinner keyframe */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </motion.form>
  )
}
