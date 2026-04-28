'use client';

import { useState } from 'react';
import { Linkedin, ArrowRight, ChevronDown, Phone, MessageCircle, Calendar } from 'lucide-react';

const credentials = [
  { label: 'BDS', desc: 'Bachelor of Dental Surgery' },
  { label: 'PDD', desc: 'Postgraduate Diploma in Dentistry' },
];

export default function AboutSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="about"
      className="relative bg-ivory py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Portrait Image with gold glow */}
          <div className="relative w-full lg:w-[45%] flex-shrink-0 lg:-ml-12 xl:-ml-20 overflow-hidden">
            {/* Static gold glow behind portrait */}
            <div
              className="absolute -inset-4 rounded-3xl bg-champagne-gold/10 blur-2xl pointer-events-none"
            />
            <div
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src="/images/clinic/real/dr-malunga-graduation.jpg"
                alt="Dr. Lebogang Malunga at Sefako Makgatho Health Sciences University graduation"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 border-2 border-champagne-gold/20 rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* Right — Content */}
          <div className="w-full lg:w-[55%] lg:py-8 shadow-elevated rounded-3xl bg-card border-soft-border p-6 md:p-10 animate-fade-in-up">
            {/* Gold label with blue accent dot */}
            <div className="flex items-center mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue mr-2" />
              <span className="inline-block font-jost text-xs tracking-[0.15em] text-champagne-gold uppercase">
                About Dr. Malunga
              </span>
            </div>

            <p className="font-jost text-base text-brown-muted max-w-md leading-relaxed mb-6">
              More than a dentist — a partner in your oral health journey.
            </p>

            {/* Static gold accent line */}
            <div
              className="h-[2px] bg-gradient-to-r from-champagne-gold to-champagne-gold/20 mb-6 origin-left w-full"
            />

            {/* H2 Name */}
            <h2
              className="font-cormorant font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 gold-gradient-text text-shadow-espresso animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Dr. Lebogang Malunga
            </h2>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {credentials.map((cred, i) => (
                <span
                  key={cred.label}
                  title={cred.desc}
                  className="inline-flex items-center gap-1.5 bg-champagne-gold/10 border border-champagne-gold/25 text-champagne-gold rounded-full px-3.5 py-1 font-jost text-xs tracking-wider uppercase cursor-default hover-lift"
                  style={{ animationDelay: `${0.8 + i * 0.15}s` }}
                >
                  <span className="font-semibold">{cred.label}</span>
                  <span className="hidden sm:inline text-champagne-gold/60 text-[10px]">{cred.desc}</span>
                </span>
              ))}
            </div>

            {/* Pull Quote */}
            <blockquote
              className="font-cormorant italic text-xl md:text-2xl text-sage-teal text-shadow-teal mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              &ldquo;A revitalised smile doesn&rsquo;t just change your appearance
              — it changes your life.&rdquo;
            </blockquote>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl section-subheading mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              BDS · PDD — Founder & Principal Dentist, Refresh Dental, Centurion
            </p>

            {/* Bio Paragraph */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                Dr. Lebogang Malunga founded Refresh Dental with a bold vision — to transform dental care from a clinical necessity into a life-changing experience that celebrates each patient&rsquo;s unique journey to confidence.
              </p>

              {/* Expandable read more section */}
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: showMore ? '600px' : '0px',
                  opacity: showMore ? 1 : 0,
                }}
              >
                <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                  With over a decade of hands-on experience spanning cosmetic, restorative, and specialised dentistry, Dr. Malunga has built a reputation for delivering exceptional results. Her commitment to continuous professional development ensures patients always receive the most advanced, evidence-based treatments available.
                </p>
                <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                  Beyond the clinic, Dr. Malunga is deeply invested in the Centurion
                  community. Dr. Malunga leads corporate dental wellness programmes, participates
                  in outreach initiatives, and mentors aspiring dental professionals. Her
                  approach is rooted in the belief that everyone deserves access to
                  compassionate, high-quality dental care.
                </p>
              </div>

              {/* Gold "Read More" toggle */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="group inline-flex items-center gap-1.5 text-champagne-gold font-jost text-sm font-medium tracking-wider uppercase mb-8 hover:text-[#A07D1A] transition-colors duration-300"
              >
                {showMore ? 'Read Less' : 'Read More'}
                <span
                  className="transition-transform duration-300"
                  style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </div>

            {/* Contact Info */}
            <div
              className="font-jost text-sm text-brown-warm mb-8 space-y-1 animate-fade-in-up"
              style={{ animationDelay: '0.45s' }}
            >
              <a
                href="mailto:drlebo@refreshdental.co.za"
                className="block hover:text-champagne-gold transition-colors duration-300"
              >
                drlebo@refreshdental.co.za
              </a>
              <a
                href="tel:+27614164649"
                className="block hover:text-champagne-gold transition-colors duration-300"
              >
                061 416 4649
              </a>
            </div>

            {/* CTA Button */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-sage-teal text-sage-teal hover:bg-sage-teal hover:text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3 transition-all duration-300 shadow-gold"
              >
                Meet Dr. Malunga
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Row */}
            <div
              className="flex items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: '0.55s' }}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sand border border-soft-border">
                <Linkedin className="w-4 h-4 text-brown-warm" />
              </div>
              <span className="font-jost text-sm text-brown-warm">
                HPCSA Registered
              </span>
            </div>
          </div>
        </div>

        {/* Inline CTA Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="tel:+27614164649"
            className="inline-flex items-center gap-2 bg-sage-teal text-white font-jost text-sm font-medium tracking-wider uppercase rounded-full px-6 py-3 transition-all duration-300 hover:bg-sage-teal/90 hover:shadow-teal"
          >
            <Phone className="w-4 w-4" />
            Call Us
          </a>
          <a
            href="https://wa.me/27614164649"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-jost text-sm font-medium tracking-wider uppercase rounded-full px-6 py-3 transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
          >
            <MessageCircle className="w-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-champagne-gold text-espresso font-jost text-sm font-semibold tracking-wider uppercase rounded-full px-6 py-3 transition-all duration-300 hover:bg-champagne-gold/90 hover:shadow-gold"
          >
            <Calendar className="w-4 w-4" />
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
