'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'

interface DaySchedule {
  day: string
  hours: string
  timeRange: { open: number; close: number } | null
  note?: string
}

function getTodayIndex(): number {
  const d = new Date().getDay()
  // Convert Sunday=0 to our Monday-based index (Mon=0 ... Sun=6)
  return d === 0 ? 6 : d - 1
}

function isSecondSaturday(): boolean {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstSat = new Date(firstDay)
  firstSat.setDate(firstDay.getDate() + ((6 - firstDay.getDay() + 7) % 7))
  const diff = Math.floor((now.getDate() - firstSat.getDate()) / 7)
  return diff === 1
}

function isOpenNow(schedule: DaySchedule): boolean {
  if (!schedule.timeRange) return false
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  return currentMinutes >= schedule.timeRange.open && currentMinutes < schedule.timeRange.close
}

function isCurrentlyOpen(): boolean {
  const todayIdx = getTodayIndex()
  const schedule = schedules[todayIdx]

  // Saturday special case
  if (todayIdx === 5) {
    if (!isSecondSaturday()) return false
  }

  return isOpenNow(schedule)
}

const schedules: DaySchedule[] = [
  { day: 'Monday', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Tuesday', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Wednesday', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Thursday', hours: '08:00 – 17:00', timeRange: { open: 480, close: 1020 } },
  { day: 'Friday', hours: '08:00 – 15:00', timeRange: { open: 480, close: 900 } },
  { day: 'Saturday', hours: '08:00 – 12:00', timeRange: { open: 480, close: 720 }, note: 'Every 2nd Saturday' },
  { day: 'Sunday', hours: 'Closed', timeRange: null },
]

export default function TradingHours() {
  const todayIdx = useMemo(() => getTodayIndex(), [])
  const openNow = useMemo(() => isCurrentlyOpen(), [])
  const secondSat = useMemo(() => isSecondSaturday(), [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-soft-border bg-gradient-to-br from-[#FDFAF6] to-[#F5EFE6] p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne-gold/15">
            <Clock className="h-4.5 w-4.5 text-champagne-gold" />
          </div>
          <h4 className="font-dm-serif text-base text-espresso">Trading Hours</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              openNow
                ? 'bg-sage-teal/15 text-sage-teal'
                : 'bg-warm-blush/20 text-[#B85C4A]'
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                openNow ? 'bg-sage-teal animate-pulse' : 'bg-[#B85C4A]'
              }`}
            />
            {openNow ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Schedule List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-0"
      >
        {schedules.map((schedule, idx) => {
          const isToday = idx === todayIdx
          const isSatNote = idx === 5

          return (
            <motion.div
              key={schedule.day}
              variants={itemVariants}
              className={`flex items-center justify-between py-2.5 ${
                isToday
                  ? 'bg-champagne-gold/[0.07] rounded-lg px-3 -mx-3 border-l-2 border-champagne-gold'
                  : 'px-3 -mx-3 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-jost text-sm ${
                    isToday ? 'font-semibold text-espresso' : 'text-brown-warm/70'
                  }`}
                >
                  {schedule.day}
                  {isToday && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-champagne-gold font-semibold">
                      Today
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-jost text-sm ${
                    schedule.timeRange
                      ? isToday
                        ? 'font-medium text-sage-teal'
                        : 'text-brown-warm/80'
                      : 'text-brown-warm/40'
                  }`}
                >
                  {isSatNote && !secondSat && isToday ? 'Closed' : schedule.hours}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Emergency */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex items-center gap-2.5 rounded-xl bg-sage-teal/[0.08] border border-sage-teal/20 px-4 py-3"
      >
        <AlertTriangle className="h-4 w-4 text-sage-teal flex-shrink-0" />
        <div>
          <p className="font-jost text-xs font-semibold text-sage-teal uppercase tracking-wide">
            Emergency Available
          </p>
          <p className="font-jost text-xs text-brown-warm/70 mt-0.5">
            24/7 — Call{' '}
            <a
              href="tel:0614164649"
              className="text-sage-teal font-semibold hover:underline"
            >
              061 416 4649
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
