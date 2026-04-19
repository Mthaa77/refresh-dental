'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LOGO_URL =
  'https://static.wixstatic.com/media/a78f12_d8df1e87d3a1425a86b2e603d0ede665~mv2.jpg';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Financing', href: '#financing' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  const handleBookOnline = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector('#contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  // Staggered variants for mobile menu links
  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
  };

  const mobileLinkContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.05 },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(4px)',
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <>
      {/* Desktop / Mobile Nav Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        animate={{
          backgroundColor: scrolled ? '#FDFAF6' : 'rgba(26, 21, 16, 0)',
          boxShadow: scrolled
            ? '0 1px 20px rgba(26, 21, 16, 0.08)'
            : '0 0px 0px rgba(26, 21, 16, 0)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
            <motion.img
              src={LOGO_URL}
              alt="Refresh Dental"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-jost text-sm font-medium tracking-wide transition-colors duration-300 hover:text-champagne-gold"
                  style={{ color: scrolled ? '#1A1510' : '#FDFAF6' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            {/* Book Online CTA - hidden on mobile */}
            <motion.a
              href="#contact"
              onClick={handleBookOnline}
              className="hidden rounded-full bg-champagne-gold px-6 py-2.5 font-jost text-sm font-semibold tracking-wide text-espresso transition-colors duration-300 hover:bg-gold-light md:inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Online
            </motion.a>

            {/* Hamburger - visible on mobile */}
            <button
              className="relative z-[60] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-champagne-gold" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu
                      className="h-6 w-6"
                      style={{ color: scrolled ? '#1A1510' : '#FDFAF6' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso md:hidden"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Nav Links */}
            <motion.ul
              className="flex flex-col items-center gap-6"
              variants={mobileLinkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={mobileLinkVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-jost text-3xl font-medium tracking-wide text-champagne-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileLinkVariants}>
                <motion.a
                  href="#contact"
                  onClick={handleBookOnline}
                  className="mt-4 inline-block rounded-full bg-champagne-gold px-8 py-3 font-jost text-lg font-semibold tracking-wide text-espresso transition-colors duration-300 hover:bg-gold-light"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Online
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
