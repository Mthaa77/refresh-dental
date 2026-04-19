'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Phone, MessageCircle, Calendar } from 'lucide-react';

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  bgColor: string;
}

const actions: ActionItem[] = [
  {
    icon: <Phone className="h-4 w-4" />,
    label: 'Call Us',
    href: 'tel:+27614164649',
    bgColor: 'bg-sage-teal',
  },
  {
    icon: <MessageCircle className="h-4 w-4" />,
    label: 'WhatsApp',
    href: 'https://wa.me/27614164649?text=Hi%20Refresh%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment.',
    bgColor: 'bg-green-600',
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    label: 'Book Now',
    href: '#contact',
    bgColor: 'bg-champagne-gold',
  },
];

export default function QuickActionsFab() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Expanded action buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay on mobile for click-outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex items-center gap-3"
              >
                {/* Tooltip */}
                <span className="hidden sm:block whitespace-nowrap rounded-lg bg-espresso/90 backdrop-blur-md px-3 py-1.5 font-jost text-xs text-ivory shadow-elevated">
                  {action.label}
                </span>

                {/* Action button */}
                <a
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={handleAction}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
                  style={{ backgroundColor: action.bgColor === 'bg-sage-teal' ? '#3D7D6E' : action.bgColor === 'bg-green-600' ? '#16a34a' : '#C9A96E' }}
                  aria-label={action.label}
                >
                  {action.icon}
                </a>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={toggleOpen}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-gold transition-shadow duration-300 hover:shadow-gold-strong"
        style={{
          background: 'linear-gradient(135deg, #C9A96E, #d4b078)',
        }}
        aria-label="Quick actions menu"
      >
        <LayoutGrid className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
