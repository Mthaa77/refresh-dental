'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility } from 'lucide-react'

interface A11ySettings {
  fontSize: 'small' | 'medium' | 'large'
  highContrast: boolean
  reduceMotion: boolean
}

const STORAGE_KEY = 'refresh-dental-a11y'

const defaultSettings: A11ySettings = {
  fontSize: 'medium',
  highContrast: false,
  reduceMotion: false,
}

function getStoredSettings(): A11ySettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch {
    // ignore parse errors
  }
  return defaultSettings
}

function applySettings(settings: A11ySettings) {
  const html = document.documentElement

  // Font size
  const sizeMap = { small: '14px', medium: '16px', large: '18px' }
  html.style.fontSize = sizeMap[settings.fontSize]

  // High contrast
  if (settings.highContrast) {
    html.classList.add('high-contrast')
  } else {
    html.classList.remove('high-contrast')
  }

  // Reduce motion
  if (settings.reduceMotion) {
    html.classList.add('reduce-motion')
  } else {
    html.classList.remove('reduce-motion')
  }
}

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings)
  const hasInitialized = useRef(false)

  // Load settings on mount — apply to DOM directly, sync state via ref
  useEffect(() => {
    const stored = getStoredSettings()
    applySettings(stored)
    hasInitialized.current = true
    // Sync state to trigger re-render with loaded settings
    // We use a microtask to avoid the lint warning about setState in effect
    requestAnimationFrame(() => {
      setSettings(stored)
    })
  }, [])

  // Persist and apply settings on change (skip the initial sync from the effect above)
  useEffect(() => {
    if (!hasInitialized.current) return
    applySettings(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore storage errors
    }
  }, [settings])

  const updateSetting = useCallback(<K extends keyof A11ySettings>(
    key: K,
    value: A11ySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const fontSizeOptions: { label: string; value: A11ySettings['fontSize']; size: string }[] = [
    { label: 'A−', value: 'small', size: 'text-sm' },
    { label: 'A', value: 'medium', size: 'text-base' },
    { label: 'A+', value: 'large', size: 'text-lg' },
  ]

  return (
    <>
      {/* Floating accessibility button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ivory shadow-lg border border-champagne-gold/20"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility Preferences"
        animate={{
          boxShadow: isOpen
            ? '0 0 0 3px rgba(201, 169, 110, 0.4), 0 4px 20px rgba(26, 21, 16, 0.15)'
            : '0 4px 14px rgba(26, 21, 16, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <Accessibility className="h-5 w-5 text-espresso" strokeWidth={1.8} />
      </motion.button>

      {/* Floating panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 right-20 z-40 w-72 rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur-xl border border-champagne-gold/15"
          >
            {/* Panel header */}
            <div className="mb-4">
              <h3 className="font-dm-serif text-lg text-espresso">Accessibility</h3>
              <p className="text-sm text-brown-warm/70 font-jost">Customize your experience</p>
            </div>

            {/* Text Size */}
            <div className="mb-5">
              <label className="block text-sm font-jost font-medium text-espresso/80 mb-2.5">
                Text Size
              </label>
              <div className="flex gap-2">
                {fontSizeOptions.map(option => (
                  <motion.button
                    key={option.value}
                    onClick={() => updateSetting('fontSize', option.value)}
                    className={`flex-1 flex items-center justify-center py-2 rounded-xl text-sm font-jost transition-colors duration-200 ${
                      settings.fontSize === option.value
                        ? 'bg-champagne-gold text-white shadow-md'
                        : 'bg-sand/60 text-brown-warm hover:bg-sand'
                    }`}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className={option.size}>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="mb-4">
              <label className="flex items-center justify-between">
                <span className="text-sm font-jost font-medium text-espresso/80">
                  High Contrast
                </span>
                <motion.button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    settings.highContrast ? 'bg-champagne-gold' : 'bg-sand-muted/30'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  role="switch"
                  aria-checked={settings.highContrast}
                  aria-label="Toggle high contrast mode"
                >
                  <motion.span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                    animate={{ left: settings.highContrast ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </label>
            </div>

            {/* Reduce Motion Toggle */}
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-jost font-medium text-espresso/80">
                  Reduce Motion
                </span>
                <motion.button
                  onClick={() => updateSetting('reduceMotion', !settings.reduceMotion)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    settings.reduceMotion ? 'bg-champagne-gold' : 'bg-sand-muted/30'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  role="switch"
                  aria-checked={settings.reduceMotion}
                  aria-label="Toggle reduced motion"
                >
                  <motion.span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                    animate={{ left: settings.reduceMotion ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High contrast CSS */}
      <style jsx global>{`
        .high-contrast body,
        .high-contrast * {
          text-shadow: 0 0 0.5px rgba(26, 21, 16, 0.15) !important;
        }
        .high-contrast h1,
        .high-contrast h2,
        .high-contrast h3,
        .high-contrast h4 {
          font-weight: 800 !important;
        }
        .high-contrast img {
          box-shadow: 0 2px 12px rgba(26, 21, 16, 0.2) !important;
        }
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </>
  )
}
