'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is currently in viewport
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -15,
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-champagne-gold/10' : ''
        }`}
        style={{
          backgroundColor: scrolled ? '#F0EBE1' : 'rgba(15, 13, 10, 0)',
          boxShadow: scrolled
            ? '0 1px 20px rgba(15, 13, 10, 0.08)'
            : '0 0px 0px rgba(15, 13, 10, 0)',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo + Brand Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Refresh Dental"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-champagne-gold/20 transition-transform duration-200 hover:scale-105 active:scale-95"
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
                    className="relative font-jost text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:text-[#A07D1A]"
                    style={{ color: isActive ? '#B89830' : scrolled ? '#0F0D0A' : '#F0EBE1' }}
                  >
                    {link.label}
                    {/* Gold underline */}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-champagne-gold to-gold-light transition-all duration-350"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />
                    {/* Small dot indicator */}
                    <span
                      className="absolute -bottom-[6px] left-1/2 h-[4px] w-[4px] rounded-full bg-champagne-gold transition-all duration-300"
                      style={{
                        marginLeft: -2,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0)',
                      }}
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
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#A07D1A] px-6 py-2.5 font-jost text-sm font-semibold tracking-wide text-white shadow-gold transition-colors duration-300 md:inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="h-3.5 w-3.5" />
              Book Appointment
            </motion.a>

            {/* Hamburger — visible on mobile, 44px touch target */}
            <button
              className="relative z-[60] flex h-11 w-11 items-center justify-center md:hidden"
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
                      style={{ color: scrolled ? '#0F0D0A' : '#F0EBE1' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-espresso via-[#0a0d18] to-espresso md:hidden"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Static decorative dots */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-[12%] left-[15%] h-1.5 w-1.5 rounded-full bg-champagne-gold/20" />
              <div className="absolute top-[25%] right-[10%] h-1 w-1 rounded-full bg-champagne-gold/15" />
              <div className="absolute bottom-[30%] left-[8%] h-1 w-1 rounded-full bg-champagne-gold/10" />
              <div className="absolute bottom-[20%] right-[20%] h-2 w-2 rounded-full bg-champagne-gold/10" />
              <div className="absolute top-[18%] right-[30%] h-1.5 w-1.5 rounded-full bg-accent-blue/15" />
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
                className="mt-1 font-jost text-sm text-ivory/55"
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
              className="mb-4 flex min-h-[44px] items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/10 px-5 py-2.5 font-jost text-sm text-champagne-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Phone className="h-3.5 w-3.5" />
              061 416 4649
            </motion.a>

            {/* Gold divider line */}
            <div className="mb-6 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

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
                      className={`relative block min-h-[44px] cursor-pointer pl-4 font-cormorant text-4xl font-light leading-[44px] tracking-wide transition-colors duration-300 hover:text-gold-light ${
                        isActive ? 'text-gold-light' : 'text-champagne-gold'
                      }`}
                    >
                      {/* Gold left border indicator for active link */}
                      <span
                        className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-champagne-gold to-gold-light transition-all duration-300"
                        style={{
                          scaleY: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                          originY: 0.5,
                        }}
                      />
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Gold divider line */}
            <div className="mt-6 mb-6 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

            {/* Book Appointment CTA */}
            <motion.a
              href="#contact"
              onClick={handleBookAppointment}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#A07D1A] px-8 py-3 font-jost text-base font-semibold tracking-wide text-white shadow-gold"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="h-4 w-4" />
              Book Appointment
            </motion.a>

            {/* Social Icons Row */}
            <div
              className="flex items-center gap-5 animate-fade-in-up"
              style={{ animationDelay: '0.9s' }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/55 transition-all duration-200 hover:scale-[1.15] hover:border-champagne-gold/30 hover:text-champagne-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
