'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Zap,
  Heart,
  BadgeCheck,
} from 'lucide-react'
import Image from 'next/image'

/* ─── Data ──────────────────────────────────────────────── */

const SERVICES = [
  { id: 'checkup', label: 'General Check-Up & Cleaning', icon: '🦷', popular: true },
  { id: 'whitening', label: 'Teeth Whitening', icon: '✨', popular: true },
  { id: 'implants', label: 'Dental Implants', icon: '🔩', popular: false },
  { id: 'braces', label: 'Orthodontics / Braces', icon: '😁', popular: false },
  { id: 'crowns', label: 'Crowns & Bridges', icon: '👑', popular: false },
  { id: 'rootcanal', label: 'Root Canal Treatment', icon: '🏥', popular: false },
  { id: 'emergency', label: 'Emergency Dental', icon: '🚨', popular: true },
  { id: 'cosmetic', label: 'Cosmetic Dentistry', icon: '💎', popular: false },
]

const TIME_SLOTS = [
  { time: '08:30', label: 'Early Morning', status: 'available' as const },
  { time: '09:30', label: 'Morning', status: 'available' as const },
  { time: '10:30', label: 'Mid-Morning', status: 'limited' as const },
  { time: '11:30', label: 'Late Morning', status: 'available' as const },
  { time: '13:00', label: 'After Lunch', status: 'available' as const },
  { time: '14:00', label: 'Afternoon', status: 'limited' as const },
  { time: '15:00', label: 'Late Afternoon', status: 'full' as const },
  { time: '16:00', label: 'End of Day', status: 'available' as const },
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const TRUST_BADGES = [
  { icon: Shield, label: 'HPCSA Registered' },
  { icon: Star, label: '4.9★ Google Rating' },
  { icon: Zap, label: 'Same-Day Emergency' },
  { icon: Heart, label: 'Gentle Care Promise' },
]

type Step = 'welcome' | 'service' | 'datetime' | 'confirm'

function isDateAvailable(day: number, weekday: number): boolean {
  if (weekday === 0) return false
  if (weekday === 6) return (day % 2 === 1) // Alternate Saturdays only
  return (day + weekday * 3) % 3 !== 0
}

function getTimeSlotStatus(slotIndex: number, day: number): 'available' | 'limited' | 'full' {
  const code = (slotIndex * 7 + day * 3 + 1) % 5
  if (code === 0) return 'full'
  if (code === 1 || code === 2) return 'limited'
  return 'available'
}

/* ─── Step Progress Bar ─────────────────────────────────── */

function StepProgress({ current, steps }: { current: Step; steps: { key: Step; label: string; icon: typeof User }[] }) {
  const currentIdx = steps.findIndex(s => s.key === current)
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((step, idx) => {
        const Icon = step.icon
        const isActive = step.key === current
        const isDone = idx < currentIdx
        return (
          <div key={step.key} className="flex items-center">
            {idx > 0 && (
              <div className={`w-6 h-px mx-1 transition-colors duration-500 ${isDone ? 'bg-champagne-gold' : 'bg-champagne-gold/20'}`} />
            )}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-500 ${
              isActive
                ? 'bg-champagne-gold text-white shadow-md shadow-champagne-gold/25'
                : isDone
                  ? 'bg-champagne-gold/10 text-champagne-gold'
                  : 'bg-champagne-gold/5 text-brown-muted/50'
            }`}>
              {isDone ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                <Icon className="h-3.5 w-3.5" />
              )}
              <span className="font-jost text-[11px] font-semibold hidden sm:inline tracking-wide">
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Welcome Step ──────────────────────────────────────── */

function WelcomeStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="text-center space-y-6 py-4">
      {/* Hero Image */}
      <div className="relative mx-auto w-full max-w-md h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/clinic/clinic-reception.jpg"
          alt="Refresh Dental Clinic Reception"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-cormorant text-2xl text-white leading-tight">
            Your smile journey<br />starts here
          </p>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {TRUST_BADGES.map((badge) => {
          const Icon = badge.icon
          return (
            <div key={badge.label} className="flex items-center gap-2.5 bg-champagne-gold/[0.04] border border-champagne-gold/10 rounded-xl p-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-champagne-gold/10">
                <Icon className="h-4 w-4 text-champagne-gold" />
              </div>
              <span className="font-jost text-xs font-medium text-espresso leading-tight">{badge.label}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-2">
        <p className="font-jost text-sm text-brown-muted max-w-md mx-auto">
          Book your appointment in under 60 seconds. No phone queues, no waiting — just pick your service, choose a time, and you&apos;re all set.
        </p>
      </div>

      <button
        onClick={onContinue}
        className="inline-flex items-center gap-2 bg-champagne-gold text-white font-jost font-semibold rounded-2xl px-8 py-3.5 shadow-lg shadow-champagne-gold/25 hover:bg-champagne-gold/90 hover:shadow-xl hover:shadow-champagne-gold/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        Book Your Appointment
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="font-jost text-[11px] text-brown-muted/60">
        Walk-ins also welcome · Open Mon–Fri 8:00–17:00
      </p>
    </div>
  )
}

/* ─── Service Selection Step ────────────────────────────── */

function ServiceStep({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: string | null
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h3 className="font-dm-serif text-xl text-espresso">What brings you in today?</h3>
        <p className="font-jost text-sm text-brown-muted">Select the service you&apos;re interested in</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto">
        {SERVICES.map((service) => {
          const isSelected = selected === service.id
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-champagne-gold bg-champagne-gold/[0.08] shadow-sm shadow-champagne-gold/15 ring-1 ring-champagne-gold/30'
                  : 'border-soft-border bg-white/80 hover:border-champagne-gold/40 hover:bg-champagne-gold/[0.03]'
              }`}
            >
              <span className="text-xl flex-shrink-0">{service.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-jost text-sm font-medium truncate ${isSelected ? 'text-champagne-gold' : 'text-espresso'}`}>
                  {service.label}
                </p>
              </div>
              {service.popular && (
                <span className="flex-shrink-0 font-jost text-[9px] font-bold uppercase tracking-wider text-white bg-champagne-gold/80 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              {isSelected && (
                <div className="flex-shrink-0">
                  <Check className="h-4 w-4 text-champagne-gold" strokeWidth={2.5} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-jost text-sm text-brown-muted hover:text-espresso transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className={`flex items-center gap-2 font-jost text-sm font-semibold rounded-xl px-6 py-2.5 transition-all duration-200 ${
            selected
              ? 'bg-champagne-gold text-white shadow-md hover:bg-champagne-gold/90'
              : 'bg-brown-warm/10 text-brown-warm/40 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/* ─── Date & Time Step ──────────────────────────────────── */

function DateTimeStep({
  selectedDate,
  selectedTime,
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onSelectTime,
  onBack,
  onNext,
}: {
  selectedDate: number | null
  selectedTime: string | null
  currentMonth: number
  currentYear: number
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDate: (day: number) => void
  onSelectTime: (time: string) => void
  onBack: () => void
  onNext: () => void
}) {
  const today = useMemo(() => new Date(), [])
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const calendarDays = useMemo(() => {
    const days: { day: number; weekday: number; isCurrentMonth: boolean }[] = []
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = prevMonthDays - i
      const wd = (firstDayOfMonth - 1 - i + 7) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const wd = (firstDayOfMonth + d - 1) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: true })
    }
    const remaining = 42 - days.length
    for (let d = 1; d <= remaining; d++) {
      const wd = (firstDayOfMonth + daysInMonth + d - 1) % 7
      days.push({ day: d, weekday: wd, isCurrentMonth: false })
    }
    return days
  }, [daysInMonth, firstDayOfMonth, currentYear, currentMonth])

  const isToday = useCallback((day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }, [today, currentMonth, currentYear])

  const isPastDate = useCallback((day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }, [today, currentYear, currentMonth])

  const selectedWeekday = selectedDate ? (firstDayOfMonth + selectedDate - 1) % 7 : null
  const dynamicTimeSlots = useMemo(() => {
    if (!selectedDate) return TIME_SLOTS
    return TIME_SLOTS.map((slot, idx) => ({
      ...slot,
      status: getTimeSlotStatus(idx, selectedDate),
    }))
  }, [selectedDate])

  const canContinue = selectedDate !== null && selectedTime !== null

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h3 className="font-dm-serif text-xl text-espresso">Pick a date & time</h3>
        <p className="font-jost text-sm text-brown-muted">Choose what works best for your schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-3">
          {/* Month Nav */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-champagne-gold" />
              <h4 className="font-jost text-sm font-semibold text-espresso">Select Date</h4>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onPrevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-soft-border bg-white text-brown-warm hover:border-champagne-gold hover:text-champagne-gold transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-jost text-xs font-medium text-espresso min-w-[120px] text-center">
                {MONTHS[currentMonth]} {currentYear}
              </span>
              <button
                onClick={onNextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-soft-border bg-white text-brown-warm hover:border-champagne-gold hover:text-champagne-gold transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="text-center font-jost text-[10px] font-semibold text-brown-muted/70 uppercase tracking-wider py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              const available = item.isCurrentMonth && !isPastDate(item.day) && isDateAvailable(item.day, item.weekday)
              const todayDate = isToday(item.day) && item.isCurrentMonth
              const isSelected = selectedDate === item.day && item.isCurrentMonth
              return (
                <button
                  key={idx}
                  onClick={() => onSelectDate(item.day)}
                  disabled={!available && item.isCurrentMonth}
                  className={`
                    relative h-9 w-full rounded-lg text-sm font-jost transition-all duration-200
                    ${!item.isCurrentMonth ? 'text-transparent pointer-events-none' : ''}
                    ${available && !isSelected ? 'text-espresso hover:bg-champagne-gold/10 cursor-pointer' : ''}
                    ${!available && item.isCurrentMonth ? 'text-brown-warm/20 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-champagne-gold text-white shadow-md shadow-champagne-gold/25 scale-105' : ''}
                    ${todayDate && !isSelected ? 'ring-1.5 ring-champagne-gold/40 ring-inset' : ''}
                  `}
                >
                  {item.day}
                  {todayDate && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-champagne-gold" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-champagne-gold" />
              <span className="font-jost text-[10px] text-brown-muted/70">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-champagne-gold/30 ring-1.5 ring-champagne-gold/40" />
              <span className="font-jost text-[10px] text-brown-muted/70">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brown-warm/20" />
              <span className="font-jost text-[10px] text-brown-muted/70">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-champagne-gold" />
            <h4 className="font-jost text-sm font-semibold text-espresso">Select Time</h4>
          </div>

          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2">
              {dynamicTimeSlots.map((slot) => {
                const isSelectedTime = selectedTime === slot.time
                const isFull = slot.status === 'full'
                return (
                  <button
                    key={slot.time}
                    onClick={() => { if (!isFull) onSelectTime(slot.time) }}
                    disabled={isFull}
                    className={`
                      relative flex flex-col items-center rounded-xl border px-3 py-3 transition-all duration-200
                      ${isFull
                        ? 'border-brown-warm/10 bg-brown-warm/[0.03] cursor-not-allowed'
                        : isSelectedTime
                          ? 'border-champagne-gold bg-champagne-gold/[0.08] shadow-sm ring-1 ring-champagne-gold/20'
                          : 'border-soft-border bg-white/80 hover:border-champagne-gold/40 hover:bg-champagne-gold/[0.03] cursor-pointer'
                      }
                    `}
                  >
                    <span className={`font-jost text-sm font-bold ${isFull ? 'text-brown-warm/25 line-through' : isSelectedTime ? 'text-champagne-gold' : 'text-espresso'}`}>
                      {slot.time}
                    </span>
                    <span className={`font-jost text-[10px] mt-0.5 ${isFull ? 'text-brown-warm/20' : 'text-brown-muted/70'}`}>
                      {slot.label}
                    </span>
                    <span className={`font-jost text-[9px] mt-0.5 uppercase tracking-wider font-semibold ${
                      isFull ? 'text-brown-warm/20' : slot.status === 'limited' ? 'text-amber-600' : 'text-sage-teal'
                    }`}>
                      {isFull ? 'Full' : slot.status === 'limited' ? '2 slots left' : 'Available'}
                    </span>
                    {isSelectedTime && (
                      <div className="absolute top-1.5 right-1.5">
                        <Check className="h-3 w-3 text-champagne-gold" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-soft-border bg-sand/20 py-16">
              <p className="font-jost text-sm text-brown-muted/60 text-center">
                Pick a date first<br />
                <span className="text-xs">to see available time slots</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-jost text-sm text-brown-muted hover:text-espresso transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`flex items-center gap-2 font-jost text-sm font-semibold rounded-xl px-6 py-2.5 transition-all duration-200 ${
            canContinue
              ? 'bg-champagne-gold text-white shadow-md hover:bg-champagne-gold/90'
              : 'bg-brown-warm/10 text-brown-warm/40 cursor-not-allowed'
          }`}
        >
          Review Booking
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/* ─── Confirmation Step ─────────────────────────────────── */

function ConfirmStep({
  service,
  date,
  time,
  onBack,
  onBook,
  isSubmitting,
}: {
  service: string
  date: string
  time: string
  onBack: () => void
  onBook: () => void
  isSubmitting: boolean
}) {
  const [submitted, setSubmitted] = useState(false)

  const handleBook = () => {
    onBook()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center space-y-5 py-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage-teal/10 ring-4 ring-sage-teal/20">
          <BadgeCheck className="h-8 w-8 text-sage-teal" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="font-cormorant text-2xl text-espresso">You&apos;re all booked!</h3>
          <p className="font-jost text-sm text-brown-muted max-w-sm mx-auto">
            We&apos;ve received your appointment request. Dr. Malunga&apos;s team will confirm your booking via WhatsApp or email within the next few hours.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-champagne-gold/[0.04] border border-champagne-gold/15 rounded-2xl p-5 max-w-xs mx-auto text-left space-y-3">
          <div className="flex items-start gap-3">
            <Stethoscope className="h-4 w-4 text-champagne-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Service</p>
              <p className="font-jost text-sm font-medium text-espresso">{service}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-champagne-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Date</p>
              <p className="font-jost text-sm font-medium text-espresso">{date}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-champagne-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Time</p>
              <p className="font-jost text-sm font-medium text-espresso">{time}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <a
            href="https://wa.me/27614164649"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-jost font-semibold rounded-xl px-6 py-2.5 hover:bg-[#20BD5A] transition-colors shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Message Us on WhatsApp
          </a>
          <p className="font-jost text-[11px] text-brown-muted/60">
            Need to reschedule? Just send us a message.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h3 className="font-dm-serif text-xl text-espresso">Review your booking</h3>
        <p className="font-jost text-sm text-brown-muted">Confirm the details below look good</p>
      </div>

      {/* Summary Card */}
      <div className="max-w-sm mx-auto bg-gradient-to-br from-champagne-gold/[0.06] to-sage-teal/[0.04] border border-champagne-gold/15 rounded-2xl p-6 space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-champagne-gold/10">
              <Stethoscope className="h-4.5 w-4.5 text-champagne-gold" />
            </div>
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Service</p>
              <p className="font-jost text-sm font-semibold text-espresso">{service}</p>
            </div>
          </div>
          <div className="h-px bg-soft-border" />
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-champagne-gold/10">
              <Calendar className="h-4.5 w-4.5 text-champagne-gold" />
            </div>
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Date</p>
              <p className="font-jost text-sm font-semibold text-espresso">{date}</p>
            </div>
          </div>
          <div className="h-px bg-soft-border" />
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-champagne-gold/10">
              <Clock className="h-4.5 w-4.5 text-champagne-gold" />
            </div>
            <div>
              <p className="font-jost text-[10px] uppercase tracking-wider text-brown-muted/70">Time</p>
              <p className="font-jost text-sm font-semibold text-espresso">{time}</p>
            </div>
          </div>
        </div>

        {/* Practice Info */}
        <div className="bg-white/60 rounded-xl p-4 space-y-2 border border-soft-border/50">
          <p className="font-dm-serif text-sm text-espresso">Refresh Dental</p>
          <div className="flex items-center gap-1.5 text-brown-muted">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="font-jost text-xs">153 River Road, Lyttelton Manor, Centurion</span>
          </div>
          <div className="flex items-center gap-1.5 text-brown-muted">
            <Phone className="h-3 w-3 flex-shrink-0" />
            <span className="font-jost text-xs">012 883 3636</span>
          </div>
          <div className="flex items-center gap-1.5 text-brown-muted">
            <Mail className="h-3 w-3 flex-shrink-0" />
            <span className="font-jost text-xs">admin@refreshdental.co.za</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 max-w-sm mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-jost text-sm text-brown-muted hover:text-espresso transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          onClick={handleBook}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-champagne-gold text-white font-jost font-semibold rounded-xl px-8 py-3 shadow-lg shadow-champagne-gold/25 hover:bg-champagne-gold/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────── */

const STEPS = [
  { key: 'welcome' as Step, label: 'Welcome', icon: Sparkles },
  { key: 'service' as Step, label: 'Service', icon: Stethoscope },
  { key: 'datetime' as Step, label: 'Date & Time', icon: Calendar },
  { key: 'confirm' as Step, label: 'Confirm', icon: Check },
]

export default function OnlineBookingWidget() {
  const today = useMemo(() => new Date(), [])
  const [step, setStep] = useState<Step>('welcome')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Track the submission confirmation
  const [confirmed, setConfirmed] = useState(false)

  const transitionTo = useCallback((nextStep: Step) => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(nextStep)
      setIsAnimating(false)
    }, 200)
  }, [])

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

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
    setSelectedTime(null)
  }

  const handleConfirm = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setConfirmed(true)
    }, 1500)
  }

  const selectedWeekday = selectedDate ? (new Date(currentYear, currentMonth, selectedDate).getDay()) : null
  const selectedDateStr = selectedDate
    ? `${WEEKDAYS[selectedWeekday ?? 0]}, ${selectedDate} ${MONTHS[currentMonth]} ${currentYear}`
    : ''
  const selectedServiceLabel = SERVICES.find(s => s.id === selectedService)?.label ?? ''

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAFAF5] to-white border-y border-[#E3DACA] py-20 lg:py-28"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #B89830 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-champagne-gold/10 border border-champagne-gold/15 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-champagne-gold" />
            <span className="font-jost text-[11px] font-semibold uppercase tracking-[0.15em] text-champagne-gold">
              Schedule Your Visit
            </span>
          </div>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-espresso">
            Book an Appointment
          </h2>
          <p className="font-jost text-brown-muted mt-3 max-w-md mx-auto text-sm md:text-base">
            A seamless booking experience in four easy steps. Your smile deserves the best care.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-champagne-gold/15 bg-white/80 backdrop-blur-xl shadow-xl shadow-champagne-gold/[0.04] p-6 md:p-8 lg:p-10">
          {/* Progress Bar — hidden on welcome step */}
          {step !== 'welcome' && (
            <StepProgress current={step} steps={STEPS} />
          )}

          {/* Step Content with fade transition */}
          <div
            className={`transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
          >
            {step === 'welcome' && (
              <WelcomeStep onContinue={() => transitionTo('service')} />
            )}
            {step === 'service' && (
              <ServiceStep
                selected={selectedService}
                onSelect={setSelectedService}
                onNext={() => transitionTo('datetime')}
                onBack={() => transitionTo('welcome')}
              />
            )}
            {step === 'datetime' && (
              <DateTimeStep
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onSelectDate={handleDateSelect}
                onSelectTime={setSelectedTime}
                onBack={() => transitionTo('service')}
                onNext={() => transitionTo('confirm')}
              />
            )}
            {step === 'confirm' && (
              <ConfirmStep
                service={selectedServiceLabel}
                date={selectedDateStr}
                time={selectedTime ?? ''}
                onBack={() => transitionTo('datetime')}
                onBook={handleConfirm}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>

        {/* Bottom trust line */}
        {!confirmed && (
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-1.5 text-brown-muted/50">
              <Phone className="h-3 w-3" />
              <span className="font-jost text-[11px]">012 883 3636</span>
            </div>
            <div className="h-3 w-px bg-soft-border" />
            <div className="flex items-center gap-1.5 text-brown-muted/50">
              <MapPin className="h-3 w-3" />
              <span className="font-jost text-[11px]">Centurion, Pretoria</span>
            </div>
            <div className="h-3 w-px bg-soft-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-brown-muted/50">
              <Shield className="h-3 w-3" />
              <span className="font-jost text-[11px]">HPCSA Registered</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
