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

  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/refresh_dental_', icon: Instagram },
    { label: 'Facebook', href: 'https://www.facebook.com/share/17deYWeBn9', icon: Facebook },
    { label: 'TikTok', href: 'https://www.tiktok.com/@refresh_dental', icon: Music },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/drlebogangmalunga', icon: Linkedin },
  ];

  return (
    <>
      {/* ========== NAVBAR ========== */}
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
        {/* Thin gold accent line at top of navbar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
          {/* Logo + Brand + Dentist Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3.5">
            <img
              src={LOGO_URL}
              alt="Dr. Lebogang Malunga — Refresh Dental"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-champagne-gold/25 shadow-gold transition-transform duration-200 hover:scale-105 active:scale-95"
            />
            {/* Brand + Dentist Name — hidden on mobile */}
            <div className="hidden md:flex flex-col">
              <span className="gold-gradient-text font-cormorant text-[22px] font-semibold tracking-wide leading-none">
                Dr. Lebogang Malunga
              </span>
              <span
                className="font-jost text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-500"
                style={{ color: scrolled ? '#B89830' : 'rgba(240, 235, 225, 0.6)' }}
              >
                Refresh Dental — Centurion
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-5 xl:flex xl:gap-7">
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
                    {/* Active gold underline */}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-champagne-gold to-gold-light transition-all duration-350"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            {/* Phone + Book CTA — hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+27614164649"
                className="flex items-center gap-1.5 font-jost text-[12px] font-medium tracking-wide transition-colors duration-300 hover:text-champagne-gold"
                style={{ color: scrolled ? '#5A5045' : 'rgba(240, 235, 225, 0.7)' }}
              >
                <Phone className="h-3.5 w-3.5" />
                061 416 4649
              </a>
              <a
                href="#contact"
                onClick={handleBookAppointment}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#A07D1A] px-5 py-2.5 font-jost text-[13px] font-semibold tracking-wide text-white shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:scale-[1.03] active:scale-[0.97]"
              >
                Book Now
              </a>
            </div>

            {/* Hamburger — visible on mobile */}
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

      {/* ========== MOBILE FULL-SCREEN OVERLAY ========== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-espresso via-[#0a0d18] to-espresso md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/30 bg-champagne-gold/15 backdrop-blur-sm transition-colors duration-300 hover:bg-champagne-gold/25"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gold-light" />
            </button>

            {/* Logo + Dentist Name */}
            <div className="flex flex-col items-center pt-16 pb-4">
              <motion.img
                src={LOGO_URL}
                alt="Dr. Lebogang Malunga"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-champagne-gold/30 ring-offset-2 ring-offset-espresso"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.h2
                className="mt-3 font-cormorant text-2xl font-semibold gold-gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Dr. Lebogang Malunga
              </motion.h2>
              <motion.p
                className="mt-1 font-jost text-sm text-ivory/55 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Refresh Dental — Centurion
              </motion.p>
            </div>

            {/* Phone badge */}
            <motion.a
              href="tel:+27614164649"
              className="mb-5 flex min-h-[44px] items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/10 px-5 py-2.5 font-jost text-sm text-champagne-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Phone className="h-3.5 w-3.5" />
              061 416 4649
            </motion.a>

            {/* Divider */}
            <div className="mb-5 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

            {/* Nav Links */}
            <ul className="flex flex-col items-center gap-5">
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative block min-h-[44px] cursor-pointer pl-4 font-cormorant text-4xl font-light leading-[44px] tracking-wide transition-colors duration-300 hover:text-gold-light ${
                        isActive ? 'text-gold-light' : 'text-champagne-gold'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="mt-6 mb-6 h-px w-32 bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

            {/* Book CTA */}
            <motion.a
              href="#contact"
              onClick={handleBookAppointment}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-gold to-[#A07D1A] px-8 py-3 font-jost text-base font-semibold tracking-wide text-white shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:scale-[1.03]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Phone className="h-4 w-4" />
              Book Appointment
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
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
