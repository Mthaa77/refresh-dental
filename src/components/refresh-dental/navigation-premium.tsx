'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  HeartPulse,
  Menu,
  Phone,
  Sparkles,
  WalletCards,
  X,
} from 'lucide-react';

const LOGO_URL = '/images/refresh-dental-logo.jpg';

const PRIMARY_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'The Practice', href: '#about' },
  { label: 'Treatments', href: '#services' },
  { label: 'Reviews', href: '#testimonials' },
] as const;

const JOURNEY_LINKS = [
  {
    label: 'Find your Smile Route',
    detail: 'Discover a more personal place to begin.',
    href: '#smile-route',
    icon: Sparkles,
    tone: 'gold',
  },
  {
    label: 'Plan your first visit',
    detail: 'Build an experience around what matters to you.',
    href: '#first-visit',
    icon: CalendarDays,
    tone: 'teal',
  },
  {
    label: 'Payment & medical aid',
    detail: 'Explore a calmer care conversation.',
    href: '#financing',
    icon: WalletCards,
    tone: 'sapphire',
  },
] as const;

const MOBILE_LINKS = [
  ...PRIMARY_LINKS.slice(0, 3),
  ...JOURNEY_LINKS.map(({ label, href }) => ({ label, href })),
  PRIMARY_LINKS[3],
  { label: 'Contact', href: '#contact' },
];

const toneClasses = {
  gold: 'border-champagne-gold/25 bg-champagne-gold/10 text-gold-pale',
  teal: 'border-teal-light/25 bg-sage-teal/20 text-teal-light',
  sapphire: 'border-sapphire-light/25 bg-sapphire/20 text-sapphire-light',
} as const;

export default function PremiumNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  const observedLinks = useMemo(
    () => [
      ...PRIMARY_LINKS,
      ...JOURNEY_LINKS.map(({ label, href }) => ({ label, href })),
      { label: 'Contact', href: '#contact' },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 26);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = observedLinks
      .map((link) => document.querySelector(link.href))
      .filter((target): target is HTMLElement => target instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: '-32% 0px -54% 0px', threshold: [0.08, 0.2, 0.45] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [observedLinks]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileOpen(false);
    setJourneyOpen(false);
    setActiveHref(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navTextClass = scrolled ? 'text-espresso/70 hover:text-espresso' : 'text-ivory/75 hover:text-ivory';

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-champagne-gold/15 bg-ivory/92 shadow-[0_14px_34px_rgba(15,13,10,0.09)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className={`h-px bg-gradient-to-r from-transparent via-champagne-gold/70 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        <nav aria-label="Main navigation" className="mx-auto flex h-[78px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <a href="#home" onClick={(event) => scrollTo(event, '#home')} className="group flex items-center gap-3">
            <span className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-1 transition-all duration-300 ${scrolled ? 'ring-champagne-gold/35 shadow-[0_6px_15px_rgba(15,13,10,0.08)]' : 'ring-ivory/25'}`}>
              <img src={LOGO_URL} alt="Refresh Dental" width={44} height={44} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="hidden flex-col sm:flex">
              <span className={`font-cormorant text-[23px] font-semibold leading-none tracking-[-0.02em] ${scrolled ? 'text-espresso' : 'text-ivory'}`}>Refresh Dental</span>
              <span className={`mt-1 font-jost text-[9px] font-semibold uppercase tracking-[0.22em] ${scrolled ? 'text-gold-rich' : 'text-gold-pale/75'}`}>Centurion · Dr. Malunga</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 xl:flex">
            {PRIMARY_LINKS.map((link) => {
              const active = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => scrollTo(event, link.href)}
                  className={`group relative font-jost text-[10px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${active ? (scrolled ? 'text-espresso' : 'text-ivory') : navTextClass}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-px bg-champagne-gold transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}

            <div className="relative" onMouseEnter={() => setJourneyOpen(true)} onMouseLeave={() => setJourneyOpen(false)}>
              <button
                type="button"
                onClick={() => setJourneyOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={journeyOpen}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-jost text-[10px] font-semibold uppercase tracking-[0.13em] transition-all duration-300 ${
                  journeyOpen || JOURNEY_LINKS.some((link) => link.href === activeHref)
                    ? scrolled
                      ? 'border-champagne-gold/35 bg-champagne-gold/10 text-espresso'
                      : 'border-gold-pale/35 bg-ivory/10 text-ivory'
                    : scrolled
                      ? 'border-espresso/10 text-espresso/70 hover:border-champagne-gold/30 hover:text-espresso'
                      : 'border-ivory/16 text-ivory/75 hover:border-gold-pale/35 hover:text-ivory'
                }`}
              >
                Your journey
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${journeyOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {journeyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    role="menu"
                    className="absolute right-0 top-[calc(100%+14px)] w-[385px] overflow-hidden rounded-[1.5rem] border border-champagne-gold/20 bg-[linear-gradient(145deg,rgba(22,18,13,0.98),rgba(20,52,46,0.97))] p-3 text-ivory shadow-[0_28px_75px_rgba(15,13,10,0.28)] backdrop-blur-2xl"
                  >
                    <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(240,235,225,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
                    <div className="relative p-3 pb-4">
                      <p className="font-jost text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-pale/75">Begin where it feels right</p>
                      <p className="mt-2 max-w-[270px] font-cormorant text-3xl font-light leading-[0.92]">A more personal route through your care.</p>
                    </div>
                    <div className="relative space-y-1">
                      {JOURNEY_LINKS.map((link) => {
                        const Icon = link.icon;
                        const active = activeHref === link.href;
                        return (
                          <a key={link.href} href={link.href} onClick={(event) => scrollTo(event, link.href)} role="menuitem" className={`group flex items-center gap-3 rounded-xl p-3 transition-colors ${active ? 'bg-ivory/12' : 'hover:bg-ivory/[0.08]'}`}>
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${toneClasses[link.tone]}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                            <span className="flex-1"><span className="block font-jost text-xs font-semibold text-ivory">{link.label}</span><span className="mt-1 block font-jost text-[11px] leading-5 text-ivory/58">{link.detail}</span></span>
                            <ArrowRight className="h-4 w-4 text-champagne-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                    <div className="relative mt-3 flex items-center justify-between border-t border-ivory/10 px-3 pt-4"><span className="inline-flex items-center gap-2 font-jost text-[10px] text-ivory/58"><HeartPulse className="h-3.5 w-3.5 text-teal-light" aria-hidden="true" /> Care that starts with listening.</span><a href="#contact" onClick={(event) => scrollTo(event, '#contact')} className="font-jost text-[10px] font-bold uppercase tracking-[0.13em] text-gold-pale hover:text-ivory">Book now</a></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a href="#smile-route" onClick={(event) => scrollTo(event, '#smile-route')} className={`hidden items-center gap-2 rounded-full border px-3 py-2 font-jost text-[9px] font-semibold uppercase tracking-[0.13em] transition-all duration-300 2xl:inline-flex ${scrolled ? 'border-sage-teal/20 bg-sage-teal/[0.07] text-sage-teal hover:bg-sage-teal/12' : 'border-ivory/15 bg-ivory/[0.08] text-ivory hover:bg-ivory/[0.14]'}`}><Sparkles className="h-3 w-3 text-champagne-gold" aria-hidden="true" /> Find your route</a>
            <a href="tel:+27614164649" className={`hidden items-center gap-2 font-jost text-[11px] font-semibold tracking-wide transition-colors lg:inline-flex ${navTextClass}`}><Phone className="h-3.5 w-3.5 text-champagne-gold" aria-hidden="true" /> 061 416 4649</a>
            <a href="#contact" onClick={(event) => scrollTo(event, '#contact')} className="btn-gold-3d hidden items-center gap-2 rounded-full px-5 py-2.5 font-jost text-[10px] font-bold uppercase tracking-[0.15em] text-espresso transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex">Book now <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
            <button onClick={() => setMobileOpen((open) => !open)} className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${scrolled ? 'border-champagne-gold/25 text-espresso' : 'border-ivory/20 text-ivory'}`} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex min-h-screen flex-col bg-[radial-gradient(circle_at_75%_15%,rgba(184,152,48,0.2),transparent_28%),radial-gradient(circle_at_6%_80%,rgba(45,107,92,0.27),transparent_30%),linear-gradient(145deg,#0F0D0A_0%,#19150f_58%,#173c35_140%)] px-7 pb-10 pt-28 lg:hidden">
            <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(240,235,225,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,225,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col">
              <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-pale/70">Refresh Dental · Centurion</p>
              <p className="mt-3 max-w-[290px] font-cormorant text-5xl font-light leading-[0.88] text-ivory">Where would you like your care journey to begin?</p>
              <a href="#smile-route" onClick={(event) => scrollTo(event, '#smile-route')} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-pale/25 bg-ivory/10 px-4 py-2.5 font-jost text-[10px] font-bold uppercase tracking-[0.14em] text-gold-pale"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Find my Smile Route</a>
              <div className="my-8 h-px w-full bg-gradient-to-r from-champagne-gold/45 via-ivory/10 to-transparent" />
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {MOBILE_LINKS.map((link, index) => {
                  const active = activeHref === link.href;
                  return <motion.a key={link.href} href={link.href} onClick={(event) => scrollTo(event, link.href)} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.045, duration: 0.35 }} className={`group flex items-center justify-between border-b py-3 font-cormorant text-3xl font-light transition-colors ${active ? 'border-gold-pale/35 text-gold-pale' : 'border-ivory/10 text-ivory hover:text-gold-pale'}`}>{link.label}<ArrowRight className="h-4 w-4 text-champagne-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></motion.a>;
                })}
              </nav>
              <div className="mt-auto pt-8"><a href="tel:+27614164649" className="inline-flex items-center gap-2 font-jost text-sm text-ivory/75"><Phone className="h-4 w-4 text-champagne-gold" aria-hidden="true" /> 061 416 4649</a><a href="#contact" onClick={(event) => scrollTo(event, '#contact')} className="btn-gold-3d mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full font-jost text-xs font-bold uppercase tracking-[0.16em] text-espresso">Book a consultation <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
