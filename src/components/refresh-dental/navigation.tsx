'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';

const LOGO_URL = '/images/refresh-dental-logo.jpg';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'The Practice', href: '#about' },
  { label: 'Care', href: '#services' },
  { label: 'Your Visit', href: '#process' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navTextClass = scrolled ? 'text-espresso/75 hover:text-espresso' : 'text-ivory/75 hover:text-ivory';

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-champagne-gold/15 bg-ivory/90 shadow-[0_12px_30px_rgba(15,13,10,0.08)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className={`h-px bg-gradient-to-r from-transparent via-champagne-gold/70 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        <nav aria-label="Main navigation" className="mx-auto flex h-[76px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <a href="#home" onClick={(event) => scrollTo(event, '#home')} className="group flex items-center gap-3">
            <span className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-1 transition-all duration-300 ${scrolled ? 'ring-champagne-gold/35' : 'ring-ivory/25'}`}>
              <img src={LOGO_URL} alt="Refresh Dental" width={44} height={44} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="hidden flex-col sm:flex">
              <span className={`font-cormorant text-[23px] font-semibold leading-none tracking-[-0.02em] ${scrolled ? 'text-espresso' : 'text-ivory'}`}>
                Refresh Dental
              </span>
              <span className={`mt-1 font-jost text-[9px] font-semibold uppercase tracking-[0.22em] ${scrolled ? 'text-gold-rich' : 'text-gold-pale/75'}`}>
                Centurion · Dr. Malunga
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 xl:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollTo(event, link.href)}
                className={`relative font-jost text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${navTextClass} after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-champagne-gold after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+27614164649" className={`hidden items-center gap-2 font-jost text-[11px] font-semibold tracking-wide transition-colors lg:inline-flex ${navTextClass}`}>
              <Phone className="h-3.5 w-3.5 text-champagne-gold" aria-hidden="true" />
              061 416 4649
            </a>
            <a
              href="#contact"
              onClick={(event) => scrollTo(event, '#contact')}
              className="btn-gold-3d hidden items-center gap-2 rounded-full px-5 py-2.5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              Book now
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${scrolled ? 'border-champagne-gold/25 text-espresso' : 'border-ivory/20 text-ivory'}`}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex min-h-screen flex-col bg-[radial-gradient(circle_at_75%_15%,rgba(184,152,48,0.2),transparent_28%),linear-gradient(145deg,#0F0D0A_0%,#19150f_58%,#173c35_140%)] px-7 pb-10 pt-28 md:hidden"
          >
            <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(240,235,225,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col">
              <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-pale/70">Refresh Dental</p>
              <p className="mt-3 max-w-[260px] font-cormorant text-4xl font-light leading-[0.92] text-ivory">Care that begins with listening.</p>

              <div className="my-10 h-px w-full bg-gradient-to-r from-champagne-gold/45 via-ivory/10 to-transparent" />
              <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => scrollTo(event, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                    className="group flex items-center justify-between border-b border-ivory/10 py-3 font-cormorant text-3xl font-light text-ivory transition-colors hover:text-gold-pale"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-champagne-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <a href="tel:+27614164649" className="inline-flex items-center gap-2 font-jost text-sm text-ivory/75">
                  <Phone className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                  061 416 4649
                </a>
                <a
                  href="#contact"
                  onClick={(event) => scrollTo(event, '#contact')}
                  className="btn-gold-3d mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full font-jost text-xs font-bold uppercase tracking-[0.16em] text-espresso"
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
