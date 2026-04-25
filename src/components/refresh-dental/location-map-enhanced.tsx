'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Car,
  Clock,
} from 'lucide-react'

interface DayInfo {
  day: string
  hours: string
  timeRange: { open: number; close: number } | null
  note?: string
}

const SCHEDULE: DayInfo[] = [
  { day: 'Mon', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Tue', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Wed', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Thu', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Fri', hours: '08:00 – 15:00', timeRange: { open: 480, close: 900 } },
  { day: 'Sat', hours: '08:00 – 12:00*', timeRange: { open: 480, close: 720 }, note: '2nd Sat only' },
  { day: 'Sun', hours: 'Closed', timeRange: null },
]

function getTodayIndex(): number {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

function isOpenNow(): boolean {
  const idx = getTodayIndex()
  const day = SCHEDULE[idx]
  if (!day.timeRange) return false
  if (idx === 5) {
    // Saturday — check 2nd Saturday
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstSat = new Date(firstDay)
    firstSat.setDate(firstDay.getDate() + ((6 - firstDay.getDay() + 7) % 7))
    const diff = Math.floor((now.getDate() - firstSat.getDate()) / 7)
    if (diff !== 1) return false
  }
  const now = new Date()
  const mins = now.getHours() * 60 + now.getMinutes()
  return mins >= day.timeRange.open && mins < day.timeRange.close
}

const INFO_CARDS = [
  {
    icon: MapPin,
    label: 'Address',
    value: '153 River Road, Lyttelton Manor,\nCenturion, Pretoria 0157',
    href: 'https://maps.google.com/maps?q=153+River+Road,+Centurion,+Pretoria+0157',
    linkText: 'View on Maps',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '012 883 3636\n061 416 4649',
    href: 'tel:0128833636',
    linkText: 'Call Us',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'admin@refreshdental.co.za',
    href: 'mailto:admin@refreshdental.co.za',
    linkText: 'Send Email',
  },
]

export default function LocationMapEnhanced() {
  const todayIdx = useMemo(() => getTodayIndex(), [])
  const openNow = useMemo(() => isOpenNow(), [])

  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=153+River+Road+Lyttelton+Manor+Centurion+Pretoria+0157'

  return (
    <section
      id="location"
      className="bg-[#F0EBE1] py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-champagne-gold text-xs font-semibold uppercase tracking-[0.2em] font-jost">
            Visit Us
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-espresso mt-3">
            Find Our Practice
          </h2>
          <p className="font-jost text-brown-muted mt-3 max-w-lg mx-auto">
            Located inside the Family Wellness Centre in Lyttelton Manor,
            Centurion. Free parking available on-site.
          </p>
        </motion.div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-lg border border-champagne-gold/15 mb-10"
        >
          {/* Static marker pin — no bounce animation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute top-6 left-6 z-10"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-champagne-gold shadow-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="h-2 w-0.5 bg-champagne-gold/60 -mt-0.5" />
              <span
                className="h-1 w-1 rounded-full bg-champagne-gold"
              />
            </div>
          </motion.div>

          <iframe
            src="https://maps.google.com/maps?q=153+River+Road,+Centurion,+Pretoria+0157&output=embed"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Refresh Dental Centurion Location"
            className="w-full"
          />
        </motion.div>

        {/* Info Cards — 3 Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        >
          {INFO_CARDS.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.label === 'Address' ? '_blank' : undefined}
                rel={card.label === 'Address' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="group rounded-2xl border border-soft-border bg-white p-6 hover:border-champagne-gold/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne-gold/10 mb-4 group-hover:bg-champagne-gold/15 transition-colors">
                  <Icon className="h-5 w-5 text-champagne-gold" />
                </div>
                <h4 className="font-dm-serif text-base text-espresso mb-1.5">
                  {card.label}
                </h4>
                <p className="font-jost text-sm text-brown-muted whitespace-pre-line leading-relaxed">
                  {card.value}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 font-jost text-xs font-semibold text-champagne-gold uppercase tracking-wider">
                  {card.linkText}
                  <Navigation className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Bottom Row: Get Directions + Business Hours + Parking Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Get Directions Button */}
          <motion.a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-2xl bg-champagne-gold px-6 py-4 font-jost text-sm font-semibold text-white shadow-md hover:bg-champagne-gold/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Navigation className="h-4.5 w-4.5" />
            Get Directions
          </motion.a>

          {/* Business Hours Summary */}
          <div className="rounded-2xl border border-soft-border bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-champagne-gold" />
                <span className="font-dm-serif text-sm text-espresso">
                  Business Hours
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${openNow ? 'bg-sage-teal' : 'bg-[#B85C4A]'}`}
                />
                <span
                  className={`font-jost text-xs font-semibold ${
                    openNow ? 'text-sage-teal' : 'text-[#B85C4A]'
                  }`}
                >
                  {openNow ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              {SCHEDULE.map((s, idx) => {
                const isToday = idx === todayIdx
                return (
                  <div
                    key={s.day}
                    className={`flex items-center justify-between text-xs font-jost py-1 px-2 rounded-lg transition-colors ${
                      isToday ? 'bg-champagne-gold/[0.07]' : ''
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isToday ? 'text-espresso' : 'text-brown-muted/80'
                      }`}
                    >
                      {s.day}
                      {isToday && (
                        <span className="ml-1.5 text-[9px] uppercase tracking-wider text-champagne-gold font-bold">
                          Today
                        </span>
                      )}
                    </span>
                    <span
                      className={
                        s.timeRange
                          ? isToday
                            ? 'text-sage-teal font-medium'
                            : 'text-brown-muted'
                          : 'text-brown-warm/30'
                      }
                    >
                      {s.hours}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="font-jost text-[10px] text-brown-warm/30 mt-2">
              * Saturday: Every 2nd Saturday of the month
            </p>
          </div>

          {/* Free Parking Badge + Additional Info */}
          <div className="flex flex-col gap-4">
            {/* Parking Badge */}
            <div className="flex-1 rounded-2xl border border-sage-teal/20 bg-sage-teal/[0.05] p-5 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-teal/10 mb-3"
              >
                <Car className="h-6 w-6 text-sage-teal" />
              </motion.div>
              <span className="font-dm-serif text-base text-espresso mb-1">
                Free Parking
              </span>
              <span className="font-jost text-xs text-brown-muted/90">
                Ample on-site parking available at the Family Wellness Centre
              </span>
            </div>

            {/* Quick Contact */}
            <div className="rounded-2xl border border-champagne-gold/15 bg-champagne-gold/[0.04] p-4 flex items-center gap-3">
              <Phone className="h-5 w-5 text-champagne-gold flex-shrink-0" />
              <div>
                <p className="font-jost text-xs text-brown-muted/80">Emergency Line</p>
                <a
                  href="tel:0614164649"
                  className="font-jost text-sm font-semibold text-espresso hover:text-champagne-gold transition-colors"
                >
                  061 416 4649
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
