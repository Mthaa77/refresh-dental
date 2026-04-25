'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'

const TIME_SLOTS = [
  { time: '09:00', status: 'available' as const },
  { time: '10:30', status: 'limited' as const },
  { time: '13:00', status: 'available' as const },
  { time: '15:00', status: 'full' as const },
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isDateAvailable(day: number, weekday: number): boolean {
  // Sundays always unavailable
  if (weekday === 0) return false
  // Deterministic pattern: available if (day + weekday * 3) % 3 !== 0
  return (day + weekday * 3) % 3 !== 0
}

function getTimeSlotStatus(slotIndex: number, day: number): 'available' | 'limited' | 'full' {
  // Deterministic status based on slot index and day
  const code = (slotIndex * 7 + day * 3 + 1) % 5
  if (code === 0) return 'full'
  if (code === 1 || code === 2) return 'limited'
  return 'available'
}

export default function OnlineBookingWidget() {
  const today = useMemo(() => new Date(), [])
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const calendarDays = (() => {
    const days: { day: number; weekday: number; isCurrentMonth: boolean }[] = []
    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = prevMonthDays - i
      const wd = (firstDayOfMonth - 1 - i + 7) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: false })
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const wd = (firstDayOfMonth + d - 1) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: true })
    }
    // Next month padding (fill to 42 cells)
    const remaining = 42 - days.length
    for (let d = 1; d <= remaining; d++) {
      const wd = (firstDayOfMonth + daysInMonth + d - 1) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: false })
    }
    return days
  })()

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth || isPastDate(day)) return
    setSelectedDate(day)
    setSelectedTime(null)
  }

  const selectedWeekday = selectedDate
    ? (firstDayOfMonth + selectedDate - 1) % 7
    : null

  const dynamicTimeSlots = (() => {
    if (!selectedDate || selectedWeekday === null) return TIME_SLOTS
    return TIME_SLOTS.map((slot, idx) => ({
      ...slot,
      status: getTimeSlotStatus(idx, selectedDate),
    }))
  })()

  const selectedDateStr = selectedDate
    ? `${WEEKDAYS[selectedWeekday ?? 0]}, ${selectedDate} ${MONTHS[currentMonth]} ${currentYear}`
    : null

  const canConfirm = selectedDate !== null && selectedTime !== null

  const confirmUrl = selectedDate && selectedTime
    ? `#contact?date=${encodeURIComponent(selectedDateStr ?? '')}&time=${encodeURIComponent(selectedTime)}`
    : '#contact'

  return (
    <section
      id="booking"
      className="bg-white border-y border-[#E3DACA] py-20 lg:py-24 overflow-hidden"
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
            Schedule Your Visit
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-espresso mt-3">
            Book an Appointment
          </h2>
          <p className="font-jost text-brown-muted mt-3 max-w-lg mx-auto">
            Select your preferred date and time below. We&apos;ll confirm your
            appointment within 24 hours.
          </p>
        </motion.div>

        {/* Main Card — Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto rounded-3xl border border-champagne-gold/20 bg-white/70 backdrop-blur-xl shadow-lg shadow-champagne-gold/5 p-6 md:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Column — Calendar */}
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-champagne-gold" />
                  <h3 className="font-dm-serif text-lg text-espresso">
                    Select Date
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handlePrevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-soft-border bg-white/80 text-brown-warm hover:border-champagne-gold hover:text-champagne-gold transition-colors"
                    whileTap={{ scale: 0.92 }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                  <span className="font-jost text-sm font-medium text-espresso min-w-[140px] text-center">
                    {MONTHS[currentMonth]} {currentYear}
                  </span>
                  <motion.button
                    onClick={handleNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-soft-border bg-white/80 text-brown-warm hover:border-champagne-gold hover:text-champagne-gold transition-colors"
                    whileTap={{ scale: 0.92 }}
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1">
                {WEEKDAYS.map((wd) => (
                  <div
                    key={wd}
                    className="text-center font-jost text-[11px] font-semibold text-brown-muted/80 uppercase tracking-wider py-1"
                  >
                    {wd}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, idx) => {
                  const available =
                    item.isCurrentMonth &&
                    !isPastDate(item.day) &&
                    isDateAvailable(item.day, item.weekday)
                  const todayDate = isToday(item.day) && item.isCurrentMonth
                  const isSelected = selectedDate === item.day && item.isCurrentMonth

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleDateSelect(item.day, item.isCurrentMonth)}
                      disabled={!available && item.isCurrentMonth}
                      className={`
                        relative h-9 w-full rounded-lg text-sm font-jost transition-colors duration-200
                        ${!item.isCurrentMonth ? 'text-transparent' : ''}
                        ${available && !isSelected ? 'text-espresso hover:bg-champagne-gold/10 cursor-pointer' : ''}
                        ${!available && item.isCurrentMonth ? 'text-brown-warm/25 cursor-not-allowed' : ''}
                        ${isSelected ? 'bg-champagne-gold text-white shadow-md' : ''}
                        ${todayDate && !isSelected ? 'ring-1 ring-champagne-gold/40' : ''}
                      `}
                      whileTap={available ? { scale: 0.9 } : undefined}
                    >
                      {item.day}
                      {todayDate && !isSelected && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-champagne-gold" />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-champagne-gold" />
                  <span className="font-jost text-[11px] text-brown-muted/80">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-brown-warm/20" />
                  <span className="font-jost text-[11px] text-brown-muted/80">Unavailable</span>
                </div>
              </div>
            </div>

            {/* Right Column — Time Slots + Summary */}
            <div className="space-y-6">
              {/* Time Slot Picker */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-champagne-gold" />
                  <h3 className="font-dm-serif text-lg text-espresso">
                    Select Time
                  </h3>
                </div>

                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {dynamicTimeSlots.map((slot) => {
                      const isSelectedTime = selectedTime === slot.time
                      const isFull = slot.status === 'full'

                      return (
                        <motion.button
                          key={slot.time}
                          onClick={() => {
                            if (!isFull) setSelectedTime(slot.time)
                          }}
                          disabled={isFull}
                          className={`
                            relative flex flex-col items-center rounded-xl border px-3 py-3 transition-all duration-200
                            ${isFull
                              ? 'border-brown-warm/15 bg-brown-warm/[0.04] cursor-not-allowed'
                              : isSelectedTime
                                ? 'border-champagne-gold bg-champagne-gold/10 shadow-sm'
                                : 'border-soft-border bg-white/80 hover:border-champagne-gold/50 hover:bg-champagne-gold/[0.04] cursor-pointer'
                            }
                          `}
                          whileTap={!isFull ? { scale: 0.95 } : undefined}
                        >
                          <span
                            className={`font-jost text-sm font-semibold ${
                              isFull
                                ? 'text-brown-warm/30 line-through'
                                : isSelectedTime
                                  ? 'text-champagne-gold'
                                  : 'text-espresso'
                            }`}
                          >
                            {slot.time}
                          </span>
                          <span
                            className={`font-jost text-[10px] mt-0.5 uppercase tracking-wider ${
                              isFull
                                ? 'text-brown-warm/25'
                                : slot.status === 'limited'
                                  ? 'text-[#B8860B]'
                                  : 'text-sage-teal'
                            }`}
                          >
                            {isFull ? 'Full' : slot.status === 'limited' ? 'Limited' : 'Available'}
                          </span>
                          {isSelectedTime && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-1.5 right-1.5"
                            >
                              <Check className="h-3.5 w-3.5 text-champagne-gold" strokeWidth={3} />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-soft-border bg-sand/30 py-10">
                    <p className="font-jost text-sm text-brown-muted/70">
                      Select a date to view available times
                    </p>
                  </div>
                )}
              </div>

              {/* Summary Card */}
              <AnimatePresence>
                {canConfirm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-champagne-gold/20 bg-gradient-to-br from-champagne-gold/[0.06] to-sage-teal/[0.04] p-5 space-y-3">
                      <h4 className="font-dm-serif text-base text-espresso">
                        Booking Summary
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-champagne-gold" />
                          <span className="font-jost text-sm text-brown-warm">
                            {selectedDateStr}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-champagne-gold" />
                          <span className="font-jost text-sm text-brown-warm">
                            {selectedTime}
                          </span>
                        </div>
                      </div>

                      {/* Confirm Button */}
                      <motion.a
                        href={confirmUrl}
                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-champagne-gold px-5 py-3 font-jost text-sm font-semibold text-white shadow-md hover:bg-champagne-gold/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                        Confirm Booking
                      </motion.a>

                      <p className="font-jost text-[11px] text-brown-muted/70 text-center">
                        You&apos;ll be redirected to our contact form to complete your booking
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
