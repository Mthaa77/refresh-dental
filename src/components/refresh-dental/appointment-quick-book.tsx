'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X, Check, Clock, User, Phone, ChevronDown } from 'lucide-react'

const SERVICES = [
  'General Consultation',
  'Teeth Whitening',
  'Dental Implants',
  'Root Canal',
  'Cosmetic Dentistry',
  'Emergency Dental',
]

const TIME_SLOTS = ['08:00', '10:00', '14:00', '16:00']

export default function AppointmentQuickBook() {
  const [isOpen, setIsOpen] = useState(false)
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      // Reset form
      setService('')
      setDate('')
      setTime('')
      setName('')
      setPhone('')
    }, 2000)
  }

  const isValid =
    service && date && time && name.trim().length > 0 && phone.trim().length > 0

  return (
    <>
      {/* Floating button with pulsing ring */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-14 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-champagne-gold shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Book Appointment"
      >
        {/* Pulsing gold ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-champagne-gold"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-champagne-gold"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.4, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.7,
          }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="calendar"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="h-6 w-6 text-white" strokeWidth={1.8} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Appointment panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 right-6 z-30 w-80 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl border border-champagne-gold/10"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-teal/10 mb-4"
                  >
                    <Check className="h-8 w-8 text-sage-teal" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="font-dm-serif text-lg text-espresso mb-1">
                    Request Sent!
                  </h3>
                  <p className="text-sm font-jost text-brown-warm/70 text-center">
                    We&apos;ll confirm your appointment shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Title */}
                  <div>
                    <h3 className="font-dm-serif text-lg text-espresso">
                      Quick Appointment
                    </h3>
                    <p className="text-xs font-jost text-brown-warm/60 mt-0.5">
                      Fill in to request a booking
                    </p>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="block text-xs font-jost font-medium text-brown-warm/70 mb-1.5">
                      Service
                    </label>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-soft-border bg-sand/40 px-3 py-2.5 pr-8 text-sm font-jost text-espresso focus:outline-none focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold/30 transition-colors"
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-warm/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date input */}
                  <div>
                    <label className="block text-xs font-jost font-medium text-brown-warm/70 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={today}
                      className="w-full rounded-xl border border-soft-border bg-sand/40 px-3 py-2.5 text-sm font-jost text-espresso focus:outline-none focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold/30 transition-colors"
                    />
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-jost font-medium text-brown-warm/70 mb-2">
                      <Clock className="h-3 w-3" /> Preferred Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <motion.button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-2 rounded-xl text-xs font-jost transition-colors duration-200 ${
                            time === slot
                              ? 'bg-champagne-gold text-white shadow-md'
                              : 'bg-sand/60 text-brown-warm hover:bg-sand'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone - inline */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="flex items-center gap-1 text-xs font-jost font-medium text-brown-warm/70 mb-1.5">
                        <User className="h-3 w-3" /> Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-soft-border bg-sand/40 px-3 py-2.5 text-sm font-jost text-espresso placeholder:text-brown-warm/30 focus:outline-none focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 text-xs font-jost font-medium text-brown-warm/70 mb-1.5">
                        <Phone className="h-3 w-3" /> Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Phone no."
                        className="w-full rounded-xl border border-soft-border bg-sand/40 px-3 py-2.5 text-sm font-jost text-espresso placeholder:text-brown-warm/30 focus:outline-none focus:border-champagne-gold focus:ring-1 focus:ring-champagne-gold/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full py-3 rounded-xl text-sm font-jost font-medium transition-colors duration-200 ${
                      isValid
                        ? 'bg-champagne-gold text-white shadow-md hover:bg-champagne-gold/90'
                        : 'bg-champagne-gold/40 text-white/50 cursor-not-allowed'
                    }`}
                    whileTap={isValid ? { scale: 0.98 } : undefined}
                  >
                    Request Appointment
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
