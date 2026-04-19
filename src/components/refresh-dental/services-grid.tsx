'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import ServiceDetailDrawer from './service-detail-drawer'

const services = [
  { name: "Dental Implants", duration: "1 hr 30 min", category: "Specialised", desc: "Permanent, natural-looking tooth replacement solutions", span: "col-span-2 row-span-2" },
  { name: "Teeth Whitening", duration: "1 hr", category: "Cosmetic", desc: "Professional whitening for a brilliantly radiant smile", span: "col-span-2" },
  { name: "Fillers & Neurotoxins", duration: "1 hr", category: "Aesthetics", desc: "Facial aesthetics to complement your refreshed smile", span: "col-span-2" },
  { name: "Aligners / Slimming Wires", duration: "30 min", category: "Cosmetic", desc: "Invisible orthodontics for a perfectly aligned smile", span: "col-span-2" },
  { name: "Dental Consultation", duration: "30 min", category: "General", desc: "Comprehensive oral health assessment", span: "" },
  { name: "Scaling and Polishing", duration: "30 min", category: "General", desc: "Deep clean for optimal oral hygiene", span: "" },
  { name: "Restorations", duration: "30 min", category: "General", desc: "Tooth-coloured fillings and restorative care", span: "" },
  { name: "Root Canal Therapy", duration: "1 hr 30 min", category: "Specialised", desc: "Pain-free advanced endodontic treatment", span: "" },
  { name: "Wisdom Teeth Removal", duration: "1 hr", category: "Specialised", desc: "Safe and comfortable extraction", span: "" },
  { name: "Dental Prosthesis", duration: "30 min", category: "Specialised", desc: "Custom-crafted dentures for natural function", span: "" },
  { name: "Crowns and Veneers", duration: "1 hr", category: "Cosmetic", desc: "Premium restorations for a flawless finish", span: "" },
  { name: "Fixed Dental Prosthesis", duration: "1 hr 30 min", category: "Specialised", desc: "Permanent bridges and fixed prosthetic solutions", span: "" },
]

const categories = ["All", "General", "Cosmetic", "Specialised", "Aesthetics"]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <>
    <section id="services" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            What We Offer
          </span>
          <h2
            className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso"
          >
            Everything Your Smile Needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            From routine check-ups to advanced cosmetic procedures — all under
            one roof.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-champagne-gold text-white shadow-md"
                  : "bg-white text-sand-muted hover:bg-champagne-gold/10 hover:text-espresso"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-5"
        >
          {filteredServices.map((service, idx) => {
            const isLarge = service.span.includes("row-span-2")
            return (
              <motion.div
                key={service.name}
                variants={cardVariants}
                layout
                onClick={() => setSelectedService(service.name)}
                className={`${service.span} group cursor-pointer overflow-hidden rounded-2xl border border-soft-border bg-white transition-all duration-300 ${
                  isLarge
                    ? "relative min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
                    : "min-h-[160px] md:min-h-[180px]"
                }`}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 12px 40px -8px rgba(201, 169, 110, 0.18), 0 4px 12px -2px rgba(26, 21, 16, 0.08)",
                  borderColor: "rgba(201, 169, 110, 0.6)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Large card warm gradient overlay */}
                {isLarge && (
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 via-sand/40 to-warm-blush/20 pointer-events-none" />
                )}

                <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                  {/* Top */}
                  <div>
                    {/* Duration Badge */}
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[10px] font-medium tracking-wide text-sand-muted">
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </span>
                      <span className="inline-flex rounded-full bg-champagne-gold/8 px-2.5 py-1 text-[10px] font-medium tracking-wide text-champagne-gold">
                        {service.category}
                      </span>
                    </div>

                    {/* Service Name */}
                    <h3
                      className={`font-cormorant text-xl font-semibold leading-snug text-espresso ${
                        isLarge ? "text-2xl md:text-3xl lg:text-4xl" : ""
                      }`}
                    >
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 font-jost text-sm font-light leading-relaxed text-brown-warm/60">
                      {service.desc}
                    </p>
                  </div>

                  {/* Book CTA */}
                  <div className="mt-auto flex items-center gap-1.5 pt-4">
                    <span className="font-jost text-xs font-medium uppercase tracking-wider text-champagne-gold transition-colors duration-200 group-hover:text-champagne-gold/80">
                      Book
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-champagne-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <button className="group inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold px-8 py-3 font-jost text-sm font-semibold uppercase tracking-widest text-champagne-gold transition-all duration-300 hover:bg-champagne-gold hover:text-white hover:shadow-lg">
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
    <ServiceDetailDrawer
      serviceKey={selectedService}
      isOpen={!!selectedService}
      onClose={() => setSelectedService(null)}
    />
    </>
  )
}
