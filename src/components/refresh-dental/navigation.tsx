'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Instagram, Facebook, Linkedin, Music } from 'lucide-react';

const LOGO_URL = '/images/refresh-dental-logo.jpg';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Team', href: '#team' },
  { label: 'Financing', href: '#financing' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Track which section is currently in viewport
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with the highest intersection ratio
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

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

  const handleBookAppointment = useCallback(
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

  // Staggered variants for mobile menu
  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeInOut' },
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
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.05 },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -15,
      filter: 'blur(4px)',
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/refresh_dental_', icon: Instagram },
    { label: 'Facebook', href: 'https://www.facebook.com/share/17deYWeBn9', icon: Facebook },
    { label: 'TikTok', href: 'https://www.tiktok.com/@refresh_dental', icon: Music },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/drlebogangmalunga', icon: Linkedin },
  ];

  return (
    <>
      {/* Desktop / Mobile Nav Bar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-champagne-gold/10' : ''
        }`}
        animate={{
          backgroundColor: scrolled ? '#FDFAF6' : 'rgba(26, 21, 16, 0)',
          boxShadow: scrolled
            ? '0 1px 20px rgba(26, 21, 16, 0.08)'
            : '0 0px 0px rgba(26, 21, 16, 0)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo + Brand Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
            <motion.img
              src={LOGO_URL}
              alt="Refresh Dental"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-champagne-gold/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            {/* Brand name — hidden on mobile */}
            <span
              className={`hidden font-cormorant text-xl font-light tracking-wide transition-colors duration-500 md:inline-block gold-gradient-text`}
            >
              Refresh Dental
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-6 lg:flex lg:gap-8">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative font-jost text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:text-champagne-gold"
                    style={{ color: isActive ? '#C9A96E' : scrolled ? '#1A1510' : '#FDFAF6' }}
                  >
                    {link.label}
                    {/* Gold underline animation */}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-champagne-gold to-gold-light"
                      initial={false}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    {/* Small dot indicator */}
                    <motion.span
                      className="absolute -bottom-[6px] left-1/2 h-[4px] w-[4px] rounded-full bg-champagne-gold"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ marginLeft: -2 }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            {/* Book Appointment CTA — hidden on mobile */}
            <motion.a
              href="#contact"
              onClick={handleBookAppointment}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#d4b078] px-6 py-2.5 font-jost text-sm font-semibold tracking-wide text-white shadow-gold transition-colors duration-300 md:inline-flex"
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(201, 169, 110, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="h-3.5 w-3.5" />
              Book Appointment
            </motion.a>

            {/* Hamburger — visible on mobile */}
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
            className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-espresso via-[#0f0c08] to-espresso md:hidden"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Decorative gold particle dots */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-[12%] left-[15%] h-1.5 w-1.5 rounded-full bg-champagne-gold/20" />
              <div className="absolute top-[25%] right-[10%] h-1 w-1 rounded-full bg-champagne-gold/15" />
              <div className="absolute bottom-[30%] left-[8%] h-1 w-1 rounded-full bg-champagne-gold/10" />
              <div className="absolute bottom-[20%] right-[20%] h-2 w-2 rounded-full bg-champagne-gold/10" />
            </div>

            {/* Dedicated Close Button — top right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/30 bg-champagne-gold/15 backdrop-blur-sm transition-colors duration-300 hover:bg-champagne-gold/25"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gold-light" />
            </button>

            {/* Top section: Logo + Brand Name + Tagline */}
            <div className="flex flex-col items-center pt-16 pb-4">
              <motion.img
                src={LOGO_URL}
                alt="Refresh Dental"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-champagne-gold/30 ring-offset-2 ring-offset-espresso"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.h2
                className="mt-3 font-cormorant text-2xl gold-gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Refresh Dental
              </motion.h2>
              <motion.p
                className="mt-1 font-jost text-sm text-ivory/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Premium Dental Care in Centurion
              </motion.p>
            </div>

            {/* Phone badge */}
            <motion.a
              href="tel:+27614164649"
              className="mb-4 flex items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/10 px-4 py-2 font-jost text-sm text-champagne-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Phone className="h-3.5 w-3.5" />
              061 416 4649
            </motion.a>

            {/* Gold divider line */}
            <motion.div
              className="mb-6 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            />

            {/* Nav Links */}
            <motion.ul
              className="flex flex-col items-center gap-5"
              variants={mobileLinkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.li key={link.href} variants={mobileLinkVariants}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative block pl-4 font-cormorant text-4xl font-light tracking-wide transition-colors duration-300 hover:text-gold-light ${
                        isActive ? 'text-gold-light' : 'text-champagne-gold'
                      }`}
                    >
                      {/* Gold left border indicator for active link */}
                      <motion.span
                        className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-champagne-gold to-gold-light"
                        initial={false}
                        animate={{
                          scaleY: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ originY: 0.5 }}
                      />
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Gold divider line */}
            <motion.div
              className="mt-6 mb-6 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* Book Appointment CTA */}
            <motion.a
              href="#contact"
              onClick={handleBookAppointment}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#d4b078] px-8 py-3 font-jost text-base font-semibold tracking-wide text-white shadow-gold"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(201, 169, 110, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="h-4 w-4" />
              Book Appointment
            </motion.a>

            {/* Social Icons Row */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 text-ivory/40 transition-colors duration-300 hover:border-champagne-gold/30 hover:text-champagne-gold"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
