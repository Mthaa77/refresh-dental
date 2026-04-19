'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ArrowRight, CheckCircle } from 'lucide-react'

interface Service {
  name: string
  duration: string
  category: string
  desc: string
  longDesc: string
  benefits: string[]
  steps: string[]
  faqs: { q: string; a: string }[]
  who: string
}

const servicesData: Record<string, Service> = {
  'Dental Implants': {
    name: 'Dental Implants',
    duration: '1 hr 30 min',
    category: 'Specialised',
    desc: 'Permanent, natural-looking tooth replacement solutions',
    longDesc:
      'Dental implants are the gold standard for replacing missing teeth. A small titanium post is placed into the jawbone, acting as a permanent root for a custom-crafted crown that looks, feels, and functions like a natural tooth.',
    benefits: [
      'Permanent tooth replacement',
      'Preserves jawbone structure',
      'No impact on adjacent teeth',
      'Looks and feels completely natural',
    ],
    steps: [
      'Comprehensive consultation and 3D imaging',
      'Implant placement under local anaesthesia',
      'Healing period (3-6 months for osseointegration)',
      'Custom crown attachment and final fitting',
    ],
    faqs: [
      {
        q: 'How long do dental implants last?',
        a: 'With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years.',
      },
      {
        q: 'Is the procedure painful?',
        a: 'The procedure is performed under local anaesthesia, making it virtually pain-free. Most patients report less discomfort than a tooth extraction.',
      },
    ],
    who: 'Ideal for adults with one or more missing teeth who want a permanent, natural-looking solution.',
  },
  'Teeth Whitening': {
    name: 'Teeth Whitening',
    duration: '1 hr',
    category: 'Cosmetic',
    desc: 'Professional whitening for a brilliantly radiant smile',
    longDesc:
      'Our professional teeth whitening treatment uses advanced, dentist-supervised whitening systems to safely brighten your smile by several shades in just one session — far superior and safer than over-the-counter options.',
    benefits: [
      'Visible results in one session',
      'Safe for enamel and gums',
      'Boosts confidence instantly',
      'Long-lasting brightness',
    ],
    steps: [
      'Initial shade assessment and dental cleaning',
      'Protective gum barrier application',
      'Professional-grade whitening gel application',
      'LED light activation (multiple 15-min cycles)',
      'Final shade comparison and aftercare instructions',
    ],
    faqs: [
      {
        q: 'How white will my teeth get?',
        a: 'Most patients see 4-8 shades of improvement. Results vary based on the starting shade and type of staining.',
      },
      {
        q: 'How long does whitening last?',
        a: 'Results typically last 6-12 months depending on your diet and oral hygiene habits.',
      },
    ],
    who: 'Perfect for anyone with healthy teeth who wants a brighter, more confident smile.',
  },
  'Fillers & Neurotoxins': {
    name: 'Fillers & Neurotoxins',
    duration: '1 hr',
    category: 'Aesthetics',
    desc: 'Facial aesthetics to complement your refreshed smile',
    longDesc:
      'Dr. Malunga offers professional dermal filler and neurotoxin treatments that harmonise with your dental work. These non-surgical treatments smooth fine lines, restore volume, and enhance your natural facial aesthetics.',
    benefits: [
      'Non-surgical with minimal downtime',
      'Customised to your facial structure',
      'Complements dental aesthetic work',
      'Natural-looking, subtle results',
    ],
    steps: [
      'Facial assessment and treatment planning',
      'Targeted injections with fine-gauge needles',
      'Immediate results visible',
      'Follow-up review appointment scheduled',
    ],
    faqs: [
      {
        q: 'Are the results immediate?',
        a: 'Neurotoxins take 7-14 days for full effect. Fillers show immediate results with subtle improvement over 2 weeks.',
      },
      {
        q: 'How long do results last?',
        a: 'Neurotoxins last 3-4 months and fillers last 6-18 months depending on the product and treatment area.',
      },
    ],
    who: 'Adults looking to enhance their facial aesthetics with safe, professional non-surgical treatments.',
  },
  'Aligners / Slimming Wires': {
    name: 'Aligners / Slimming Wires',
    duration: '30 min',
    category: 'Cosmetic',
    desc: 'Invisible orthodontics for a perfectly aligned smile',
    longDesc:
      'Our clear aligner treatment — known as Slimming Wires — uses a series of custom-made, virtually invisible aligners to gradually straighten your teeth. Removable, comfortable, and perfect for adults and teens.',
    benefits: [
      'Virtually invisible treatment',
      'Removable for eating and cleaning',
      'Comfortable — no metal brackets',
      'Faster than traditional braces',
    ],
    steps: [
      '3D digital scan and treatment planning',
      'Custom aligner series fabrication',
      'Regular aligner changes (every 1-2 weeks)',
      'Progress monitoring and adjustments',
    ],
    faqs: [
      {
        q: 'How long does treatment take?',
        a: 'Treatment duration varies from 6-18 months depending on the complexity of your case.',
      },
      {
        q: 'Can I use medical aid?',
        a: 'Some medical aids cover orthodontic treatment. We can check your specific plan benefits for you.',
      },
    ],
    who: 'Ideal for adults and teens with mild to moderate alignment issues who want a discreet orthodontic solution.',
  },
}

// Default data for services without full detail
const defaultService = (name: string, duration: string, category: string, desc: string): Service => ({
  name,
  duration,
  category,
  desc,
  longDesc: `${name} at Refresh Dental is performed with the highest standards of care. Dr. Malunga uses modern techniques and equipment to ensure a comfortable, effective experience.`,
  benefits: ['Professional care by Dr. Malunga', 'Modern techniques and equipment', 'Comfortable environment', 'All medical aids accepted'],
  steps: [
    'Book your consultation',
    'Comprehensive assessment',
    'Personalised treatment plan',
    'Procedure and aftercare',
  ],
  faqs: [
    { q: 'Does medical aid cover this?', a: 'We accept all medical aids. Coverage depends on your specific plan — we handle the claims for you.' },
    { q: 'Is the procedure painful?', a: 'Dr. Malunga prioritises patient comfort. Local anaesthesia is used where needed, and most patients experience minimal discomfort.' },
  ],
  who: 'Anyone seeking professional dental care in a comfortable, modern environment.',
})

interface ServiceDetailDrawerProps {
  serviceKey: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ServiceDetailDrawer({ serviceKey, isOpen, onClose }: ServiceDetailDrawerProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  if (!serviceKey) return null

  const service = servicesData[serviceKey] || defaultService(serviceKey, '', '', '')

  if (!service) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-espresso/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-lg overflow-y-auto bg-ivory shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ivory/95 backdrop-blur-sm px-6 py-4 border-b border-soft-border">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne-gold">
                  {service.category}
                </span>
                <h2 className="font-cormorant text-2xl text-espresso">{service.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-border transition-colors hover:border-champagne-gold hover:text-champagne-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-8 space-y-10">
              {/* Duration & Description */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-sage-teal" />
                  <span className="font-jost text-sm text-sage-teal">{service.duration}</span>
                </div>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-warm">
                  {service.longDesc}
                </p>
              </div>

              {/* What to Expect */}
              <div>
                <h3 className="font-dm-serif text-xl text-espresso mb-4">What to Expect</h3>
                <div className="space-y-3">
                  {service.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold/10 text-xs font-semibold text-champagne-gold">
                        {i + 1}
                      </div>
                      <p className="font-jost text-sm text-brown-warm/80 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-dm-serif text-xl text-espresso mb-4">Benefits</h3>
                <div className="grid grid-cols-1 gap-2">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-sage-teal flex-shrink-0" />
                      <span className="font-jost text-sm text-brown-warm/80">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Is It For */}
              <div className="bg-sand rounded-2xl p-6">
                <h3 className="font-dm-serif text-xl text-espresso mb-2">Who Is This For?</h3>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/80">
                  {service.who}
                </p>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h3 className="font-dm-serif text-xl text-espresso mb-4">Questions</h3>
                  <div className="space-y-2">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border border-soft-border bg-white overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left"
                        >
                          <span className="pr-4 font-jost text-sm text-espresso">{faq.q}</span>
                          <motion.span
                            animate={{ rotate: activeFaq === i ? 45 : 0 }}
                            className="text-champagne-gold text-lg flex-shrink-0"
                          >
                            +
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-3 font-jost text-sm text-brown-warm/70">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href="#contact"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A96E] py-4 font-jost text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#b8964f] hover:shadow-lg"
              >
                Book This Service
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
