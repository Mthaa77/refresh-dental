'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { X, Clock, ArrowRight, CheckCircle, Star, Shield, Heart, Sparkles, Zap, Smile } from 'lucide-react'

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
  'Dental Consultation': {
    name: 'Dental Consultation',
    duration: '30 min',
    category: 'General',
    desc: 'Comprehensive oral health assessment',
    longDesc:
      'A thorough dental consultation is the foundation of great oral health. Dr. Malunga performs a complete examination of your teeth, gums, and soft tissues, using digital X-rays and visual assessment to create a personalised care plan tailored to your needs.',
    benefits: [
      'Complete oral health assessment',
      'Digital X-rays for accurate diagnosis',
      'Personalised treatment planning',
      'Early detection of potential issues',
    ],
    steps: [
      'Medical history review and symptom discussion',
      'Comprehensive examination of teeth and gums',
      'Digital X-rays and diagnostic imaging',
      'Treatment plan presentation and discussion',
    ],
    faqs: [
      {
        q: 'How often should I have a dental consultation?',
        a: 'We recommend a check-up every 6 months, though some patients may benefit from more frequent visits depending on their oral health needs.',
      },
      {
        q: 'What should I bring to my first consultation?',
        a: 'Please bring your ID, medical aid card, a list of current medications, and any previous dental records or X-rays you may have.',
      },
    ],
    who: 'Everyone — routine consultations are essential for maintaining optimal oral health and catching problems early.',
  },
  'Scaling and Polishing': {
    name: 'Scaling and Polishing',
    duration: '30 min',
    category: 'General',
    desc: 'Deep clean for optimal oral hygiene',
    longDesc:
      'Professional scaling and polishing removes plaque and tartar build-up that regular brushing cannot reach. This deep cleaning treatment leaves your teeth feeling incredibly smooth and fresh while protecting against gum disease and tooth decay.',
    benefits: [
      'Removes stubborn tartar build-up',
      'Prevents gum disease and gingivitis',
      'Leaves teeth feeling smooth and fresh',
      'Reduces risk of tooth decay',
    ],
    steps: [
      'Initial assessment of gum health',
      'Ultrasonic scaling to remove tartar',
      'Hand scaling for detailed cleaning',
      'Professional polishing and fluoride treatment',
    ],
    faqs: [
      {
        q: 'Does scaling hurt?',
        a: 'Most patients experience minimal discomfort. If you have sensitive gums or teeth, we can apply a numbing gel to keep you comfortable throughout.',
      },
      {
        q: 'How often should I have scaling done?',
        a: 'We recommend professional scaling every 6 months, though patients with gum disease may need it every 3-4 months.',
      },
    ],
    who: 'Recommended for everyone as part of a routine preventive care programme — the cornerstone of healthy teeth and gums.',
  },
  'Restorations': {
    name: 'Restorations',
    duration: '30 min',
    category: 'General',
    desc: 'Tooth-coloured fillings and restorative care',
    longDesc:
      'Our tooth-coloured restorations seamlessly repair cavities and damaged teeth using composite resin that matches your natural tooth colour. Dr. Malunga uses minimally invasive techniques to preserve as much healthy tooth structure as possible.',
    benefits: [
      'Natural-looking tooth-coloured material',
      'Minimally invasive procedure',
      'Strengthens weakened teeth',
      'Long-lasting durable results',
    ],
    steps: [
      'Assessment of decay or damage',
      'Gentle removal of compromised tooth structure',
      'Application of tooth-coloured composite resin',
      'Shaping, polishing, and bite adjustment',
    ],
    faqs: [
      {
        q: 'How long do composite fillings last?',
        a: 'With proper care, composite fillings typically last 5-10 years. Their longevity depends on the location of the filling and your oral hygiene habits.',
      },
      {
        q: 'Are tooth-coloured fillings as strong as metal ones?',
        a: 'Modern composite resins are extremely durable and suitable for most restorations. For very large cavities, we may recommend a crown for added strength.',
      },
    ],
    who: 'Anyone with cavities, chipped, or damaged teeth who wants a natural-looking, long-lasting repair.',
  },
  'Root Canal Therapy': {
    name: 'Root Canal Therapy',
    duration: '1 hr 30 min',
    category: 'Specialised',
    desc: 'Pain-free advanced endodontic treatment',
    longDesc:
      'Root canal therapy saves teeth that would otherwise need extraction. Dr. Malunga uses advanced rotary instruments and modern techniques to clean and seal the infected root canal, relieving pain while preserving your natural tooth for years to come.',
    benefits: [
      'Saves natural tooth from extraction',
      'Eliminates infection and pain',
      'Prevents spread of bacterial infection',
      'Restores full chewing function',
    ],
    steps: [
      'Digital X-ray and pulp vitality testing',
      'Local anaesthesia and rubber dam placement',
      'Infected pulp removal and canal cleaning',
      'Canal shaping and disinfection',
      'Root canal filling and sealing',
    ],
    faqs: [
      {
        q: 'Is root canal treatment painful?',
        a: 'Modern root canal therapy is performed under effective local anaesthesia and is generally no more uncomfortable than having a filling. Most patients report significant pain relief after treatment.',
      },
      {
        q: 'How many visits does it take?',
        a: 'Most root canal treatments can be completed in a single visit of approximately 1 hour 30 minutes. Complex cases may require a second appointment.',
      },
    ],
    who: 'Patients experiencing severe tooth pain, sensitivity to temperature, or those diagnosed with an infected or inflamed tooth pulp.',
  },
  'Wisdom Teeth Removal': {
    name: 'Wisdom Teeth Removal',
    duration: '1 hr',
    category: 'Specialised',
    desc: 'Safe and comfortable extraction',
    longDesc:
      'Wisdom teeth that are impacted, decayed, or causing crowding can lead to significant discomfort and oral health complications. Dr. Malunga performs safe, efficient extractions using gentle techniques to minimise recovery time and ensure your comfort.',
    benefits: [
      'Prevents crowding and misalignment',
      'Eliminates pain and recurring infections',
      'Reduces risk of cysts and tumours',
      'Simplifies long-term oral hygiene',
    ],
    steps: [
      'Panoramic X-ray and treatment planning',
      'Administration of local anaesthesia',
      'Precise extraction using specialised instruments',
      'Post-operative care instructions and follow-up',
    ],
    faqs: [
      {
        q: 'What is the recovery time?',
        a: 'Most patients recover fully within 5-7 days. You may experience mild swelling and discomfort for the first 2-3 days, which is easily managed with prescribed medication.',
      },
      {
        q: 'Do all wisdom teeth need to be removed?',
        a: 'Not always. If your wisdom teeth are fully erupted, properly aligned, and healthy, they may not require removal. Dr. Malunga will assess your specific situation.',
      },
    ],
    who: 'Young adults and patients with problematic wisdom teeth causing pain, crowding, or recurring infections.',
  },
  'Dental Prosthesis': {
    name: 'Dental Prosthesis',
    duration: '30 min',
    category: 'Specialised',
    desc: 'Custom-crafted dentures for natural function',
    longDesc:
      'Custom dentures restore your smile and chewing function when multiple teeth are missing. Dr. Malunga crafts each prosthesis with precision to ensure a comfortable fit, natural appearance, and restored confidence in your daily life.',
    benefits: [
      'Restores complete smile and facial structure',
      'Improves chewing and speaking ability',
      'Custom-crafted for comfort and fit',
      'Removable for easy cleaning',
    ],
    steps: [
      'Comprehensive oral assessment and impressions',
      'Bite registration and aesthetic try-in',
      'Prosthesis fabrication by dental laboratory',
      'Fitting, adjustments, and oral hygiene guidance',
    ],
    faqs: [
      {
        q: 'How long do dentures last?',
        a: 'With proper care, quality dentures last 5-8 years. Over time, your gums and bone structure change, so periodic relining or replacement may be needed.',
      },
      {
        q: 'Will dentures look natural?',
        a: 'Absolutely. Modern dentures are crafted with high-quality teeth and gum-coloured bases that closely mimic natural appearance. Dr. Malunga pays careful attention to shade, shape, and arrangement.',
      },
    ],
    who: 'Patients with multiple missing teeth seeking a reliable, removable solution to restore their smile and function.',
  },
  'Crowns and Veneers': {
    name: 'Crowns and Veneers',
    duration: '1 hr',
    category: 'Cosmetic',
    desc: 'Premium restorations for a flawless finish',
    longDesc:
      'Crowns and veneers are transformative cosmetic restorations that correct chips, severe discolouration, misshapen teeth, and gaps. Using premium ceramic materials, Dr. Malunga creates restorations that blend seamlessly with your natural teeth for a stunning, durable result.',
    benefits: [
      'Dramatic smile transformation',
      'Natural-looking ceramic materials',
      'Corrects multiple aesthetic concerns',
      'Long-lasting and stain-resistant',
    ],
    steps: [
      'Smile design consultation and digital planning',
      'Tooth preparation and precise impressions',
      'Temporary restoration placement',
      'Custom ceramic crown or veneer bonding',
    ],
    faqs: [
      {
        q: 'What is the difference between a crown and a veneer?',
        a: 'A crown covers the entire tooth and is ideal for heavily damaged teeth, while a veneer is a thin shell bonded to the front surface, perfect for cosmetic improvements on otherwise healthy teeth.',
      },
      {
        q: 'How long do crowns and veneers last?',
        a: 'With proper care, ceramic crowns and veneers can last 10-15 years or longer. Regular check-ups and good oral hygiene are essential for longevity.',
      },
    ],
    who: 'Anyone seeking to correct chipped, discoloured, misaligned, or worn teeth for a picture-perfect smile.',
  },
  'Fixed Dental Prosthesis': {
    name: 'Fixed Dental Prosthesis',
    duration: '1 hr 30 min',
    category: 'Specialised',
    desc: 'Permanent bridges and fixed prosthetic solutions',
    longDesc:
      'A fixed dental prosthesis (bridge) permanently replaces one or more missing teeth by anchoring custom crowns to adjacent healthy teeth. This non-removable solution restores both function and aesthetics, giving you the confidence of a complete smile without the hassle of dentures.',
    benefits: [
      'Permanent, non-removable solution',
      'Restores full biting and chewing function',
      'Prevents neighbouring teeth from shifting',
      'Natural appearance with custom shading',
    ],
    steps: [
      'Assessment and bridge design planning',
      'Preparation of abutment teeth and impressions',
      'Temporary bridge placement',
      'Custom bridge fitting, adjustment, and cementation',
    ],
    faqs: [
      {
        q: 'How is a bridge different from an implant?',
        a: 'A bridge uses adjacent teeth as support, while an implant is anchored directly in the jawbone. Both are excellent options — Dr. Malunga will recommend the best solution based on your specific case.',
      },
      {
        q: 'How long does a fixed bridge last?',
        a: 'A well-maintained fixed bridge typically lasts 10-15 years. Good oral hygiene and regular dental visits significantly extend its lifespan.',
      },
    ],
    who: 'Patients with one or more missing teeth who want a permanent, stable restoration that looks and feels natural.',
  },
}

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

// Benefit icons map for the icon grid
const benefitIcons = [Sparkles, Shield, Heart, Star, Zap, Smile]

interface ServiceDetailDrawerProps {
  serviceKey: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ServiceDetailDrawer({ serviceKey, isOpen, onClose }: ServiceDetailDrawerProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const drawerContentRef = useRef<HTMLDivElement>(null)

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
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-lg overflow-hidden bg-ivory shadow-2xl"
          >
            {/* Parallax background gradient */}
            <DrawerBackground />

            <div ref={drawerContentRef} className="relative h-full overflow-y-auto">
              {/* Shimmer drawer handle/grip at top */}
              <div className="sticky top-0 z-20 flex justify-center pt-3 pb-1 bg-ivory/90 backdrop-blur-sm">
                <motion.div
                  className="h-1 w-16 rounded-full overflow-hidden bg-champagne-gold/15 relative"
                  aria-hidden="true"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #B89830, #D4C08A, transparent)',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
              </div>

              {/* Header */}
              <div className="sticky top-5 z-10 flex items-center justify-between bg-ivory/95 backdrop-blur-sm px-6 py-4 border-b border-soft-border">
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
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-sage-teal" />
                    <span className="font-jost text-sm text-sage-teal">{service.duration}</span>
                  </div>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-warm">
                    {service.longDesc}
                  </p>
                </motion.div>

                {/* What to Expect — Animated Step Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-dm-serif text-xl text-espresso mb-6">What to Expect</h3>
                  <StepTimeline steps={service.steps} />
                </motion.div>

                {/* Benefits — Icon Grid with Staggered Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-dm-serif text-xl text-espresso mb-4">Benefits</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {service.benefits.map((b, i) => {
                      const IconComponent = benefitIcons[i % benefitIcons.length]
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 16, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.35 + i * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="flex items-start gap-2.5 rounded-xl border border-soft-border bg-white p-3.5"
                        >
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-champagne-gold/10">
                            <IconComponent className="h-4 w-4 text-champagne-gold" />
                          </div>
                          <span className="font-jost text-xs text-brown-muted leading-relaxed pt-1">
                            {b}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Who Is It For */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-sand rounded-2xl p-6"
                >
                  <h3 className="font-dm-serif text-xl text-espresso mb-2">Who Is This For?</h3>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
                    {service.who}
                  </p>
                </motion.div>

                {/* FAQs */}
                {service.faqs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
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
                                <p className="px-4 pb-3 font-jost text-sm text-brown-muted">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Pulsing "Book Now" CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pb-8"
                >
                  <motion.a
                    href="#contact"
                    onClick={onClose}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(184, 152, 48, 0.4)',
                        '0 0 0 10px rgba(184, 152, 48, 0)',
                        '0 0 0 0 rgba(184, 152, 48, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px -4px rgba(184, 152, 48, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B89830] py-4 font-jost text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#A07D1A]"
                  >
                    Book This Service
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Step Timeline with animated circles connected by line
function StepTimeline({ steps }: { steps: string[] }) {
  return (
    <div className="relative space-y-0">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
          className="relative flex gap-4"
        >
          {/* Circle + connecting line */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, backgroundColor: 'rgba(184, 152, 48, 0.1)' }}
              animate={{ scale: 1, backgroundColor: '#B89830' }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
            >
              <motion.span
                initial={{ color: '#B89830' }}
                animate={{ color: '#FFFFFF' }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                className="text-xs font-semibold font-jost"
              >
                {i + 1}
              </motion.span>
            </motion.div>
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                className="w-[2px] flex-1 min-h-[24px] bg-gradient-to-b from-champagne-gold to-champagne-gold/20 origin-top"
              />
            )}
          </div>
          <div className="pb-6">
            <p className="font-jost text-sm text-brown-muted pt-0.5">{step}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Subtle parallax background gradient for the drawer
function DrawerBackground() {
  return (
    <div
      className="absolute inset-0 z-[0] pointer-events-none"
      aria-hidden="true"
    >
      {/* Top-left subtle gold glow */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(184, 152, 48, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Bottom-right subtle teal glow */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(45, 107, 92, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, 12, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
