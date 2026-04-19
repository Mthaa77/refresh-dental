'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SectionItem {
  id: string
  label: string
  color: string
  glowColor: string
}

const sections: SectionItem[] = [
  { id: 'home', label: 'Home', color: '#0F0D0A', glowColor: 'rgba(15, 13, 10, 0.4)' },
  { id: 'about', label: 'About', color: '#B89830', glowColor: 'rgba(184, 152, 48, 0.5)' },
  { id: 'services', label: 'Services', color: '#2D6B5C', glowColor: 'rgba(45, 107, 92, 0.5)' },
  { id: 'testimonials', label: 'Testimonials', color: '#B89830', glowColor: 'rgba(184, 152, 48, 0.5)' },
  { id: 'financing', label: 'Payment', color: '#2D6B5C', glowColor: 'rgba(45, 107, 92, 0.5)' },
  { id: 'contact', label: 'Contact', color: '#B89830', glowColor: 'rgba(184, 152, 48, 0.5)' },
]

export default function PageSectionsNav() {
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [],
  )

  return (
    <nav
      role="navigation"
      aria-label="Section navigation"
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <div className="relative flex flex-col items-center gap-0">
        {/* Vertical connecting line */}
        <div
          className="absolute top-[8px] bottom-[8px] w-px"
          style={{ backgroundColor: 'rgba(184, 152, 48, 0.2)' }}
        />

        {sections.map((section, i) => {
          const isActive = activeSection === section.id
          const isHovered = hoveredIndex === i

          return (
            <div key={section.id} className="relative flex flex-col items-center">
              {/* Dot */}
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative z-10 my-3 flex items-center justify-center"
                aria-label={`Navigate to ${section.label} section`}
                aria-current={isActive ? 'true' : undefined}
              >
                <motion.div
                  animate={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    boxShadow: isActive
                      ? `0 0 12px 2px ${section.glowColor}`
                      : '0 0 0px 0px transparent',
                    backgroundColor: isActive ? section.color : 'rgba(184, 152, 48, 0.35)',
                  }}
                  whileHover={{
                    width: 11,
                    height: 11,
                    backgroundColor: section.color,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="cursor-pointer rounded-full"
                />
              </a>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -8, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="pointer-events-none absolute left-[24px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 font-jost text-xs font-medium tracking-wide text-espresso"
                    style={{
                      backgroundColor: 'rgba(253, 250, 246, 0.85)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(184, 152, 48, 0.25)',
                      boxShadow: '0 4px 12px -2px rgba(15, 13, 10, 0.1)',
                    }}
                  >
                    {section.label}
                    {/* Small arrow */}
                    <div
                      className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45"
                      style={{
                        backgroundColor: 'rgba(253, 250, 246, 0.85)',
                        borderLeft: '1px solid rgba(184, 152, 48, 0.25)',
                        borderBottom: '1px solid rgba(184, 152, 48, 0.25)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
