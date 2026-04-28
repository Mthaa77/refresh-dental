import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Serif_Display, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.refreshdental.co.za'),
  title: {
    default: 'Refresh Dental — Premium Dental Care in Centurion | Dr. Lebogang Malunga',
    template: '%s | Refresh Dental Centurion',
  },
  description:
    'Experience premium dental care in Centurion, Pretoria. Dr. Lebogang Malunga offers cosmetic dentistry, dental implants, teeth whitening, veneers, root canals & more. HPCSA registered. Book your consultation today!',
  keywords: [
    'dentist Centurion',
    'dentist Pretoria',
    'dental implants Centurion',
    'teeth whitening Centurion',
    'Dr Lebogang Malunga',
    'cosmetic dentistry Pretoria',
    'Refresh Dental',
    'female dentist Centurion',
    'dental fillers Centurion',
    'clear aligners Centurion',
    'dental veneers',
    'root canal treatment',
    'dental crowns Centurion',
    'wisdom teeth removal',
    'dental clinic Centurion',
    'emergency dentist Centurion',
    'dental cleaning Centurion',
    'smile makeover',
  ],
  authors: [{ name: 'Dr. Lebogang Malunga', url: 'https://www.refreshdental.co.za' }],
  creator: 'Refresh Dental',
  publisher: 'Refresh Dental',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.refreshdental.co.za',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://www.refreshdental.co.za',
    siteName: 'Refresh Dental',
    title: 'Refresh Dental — Premium Dental Care in Centurion',
    description:
      'Your Smile, Refreshed. Revived. Premium dental care by Dr. Lebogang Malunga in Centurion, Pretoria. HPCSA registered dentist offering cosmetic dentistry, implants & more.',
    images: [
      {
        url: '/images/dental-clinic-interior.png',
        width: 1200,
        height: 630,
        alt: 'Refresh Dental — Modern Premium Dental Clinic in Centurion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refresh Dental — Premium Dental Care in Centurion',
    description: 'Your Smile, Refreshed. Revived. Premium dental care by Dr. Lebogang Malunga.',
    images: ['/images/dental-clinic-interior.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'health',
  icons: {
    icon: '/images/refresh-dental-logo.jpg',
    apple: '/images/refresh-dental-logo.jpg',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": "https://www.refreshdental.co.za/#dentist",
      name: "Refresh Dental",
      description: "Premium dental care in Centurion by Dr. Lebogang Malunga. HPCSA registered dental practice offering cosmetic dentistry, dental implants, teeth whitening, and comprehensive oral healthcare.",
      url: "https://www.refreshdental.co.za",
      logo: "https://www.refreshdental.co.za/images/refresh-dental-logo.jpg",
      image: "https://www.refreshdental.co.za/images/dental-clinic-interior.png",
      telephone: "+27614164649",
      email: "info@refreshdental.co.za",
      address: {
        "@type": "PostalAddress",
        streetAddress: "153 River Road",
        addressLocality: "Centurion",
        addressRegion: "Gauteng",
        postalCode: "0157",
        addressCountry: "ZA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -25.8600,
        longitude: 28.1800,
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "17:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "15:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
      ],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "3",
        bestRating: "5",
      },
      founder: {
        "@type": "Person",
        name: "Dr. Lebogang Malunga",
        jobTitle: "Principal Dentist",
        credential: "BDS, PDD",
        memberOf: {
          "@type": "Organization",
          name: "Health Professions Council of South Africa (HPCSA)",
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dental Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Implants", description: "Permanent tooth replacement solutions" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teeth Whitening", description: "Professional teeth whitening treatments" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Veneers", description: "Porcelain and composite veneers" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Root Canal Treatment", description: "Painless root canal therapy" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Crowns", description: "Custom dental crowns and bridges" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clear Aligners", description: "Invisible orthodontic treatment" } },
        ],
      },
      areaServed: {
        "@type": "City",
        name: "Centurion",
        containedInPlace: { "@type": "AdministrativeArea", name: "Gauteng" },
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.refreshdental.co.za/#website",
      url: "https://www.refreshdental.co.za",
      name: "Refresh Dental",
      publisher: { "@id": "https://www.refreshdental.co.za/#dentist" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.refreshdental.co.za/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a dental implant cost in South Africa?",
          acceptedAnswer: { "@type": "Answer", text: "Dental implants in South Africa typically range from R15,000 to R35,000 per implant. At Refresh Dental, we offer flexible payment plans through Athena to make implants affordable." },
        },
        {
          "@type": "Question",
          name: "Does medical aid cover dental implants?",
          acceptedAnswer: { "@type": "Answer", text: "Most South African medical aids cover a portion of dental implant costs. We work with major providers including Discovery Health, Bonitas, Momentum, Medihelp, and GEMS. Contact us for a detailed benefits check." },
        },
        {
          "@type": "Question",
          name: "How long do dental veneers last?",
          acceptedAnswer: { "@type": "Answer", text: "Porcelain veneers typically last 10-15 years with proper care, while composite veneers last 5-7 years. At Refresh Dental, we use premium materials for maximum longevity." },
        },
        {
          "@type": "Question",
          name: "Is teeth whitening safe?",
          acceptedAnswer: { "@type": "Answer", text: "Professional teeth whitening performed by a qualified dentist is safe and effective. Dr. Malunga uses clinically proven whitening systems that protect enamel while delivering visible results." },
        },
        {
          "@type": "Question",
          name: "What should I do in a dental emergency?",
          acceptedAnswer: { "@type": "Answer", text: "For dental emergencies, contact Refresh Dental immediately at +27614164649. We offer emergency dental services. In the meantime, rinse with warm salt water, apply a cold compress, and take over-the-counter pain relief." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.refreshdental.co.za/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.refreshdental.co.za" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <meta name="theme-color" content="#B89830" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${cormorant.variable} ${dmSerif.variable} ${jost.variable} ${playfair.variable} antialiased bg-ivory text-espresso`}
      >
        <div className="sr-only" aria-hidden="true">
          <h2>About Refresh Dental</h2>
          <p>Refresh Dental is a premium dental practice located at 153 River Road, Centurion, Gauteng, South Africa. Founded by Dr. Lebogang Malunga, an HPCSA-registered dentist with qualifications in BDS and PDD, the practice offers comprehensive dental services including dental implants, teeth whitening, porcelain veneers, root canal treatment, dental crowns and bridges, clear aligners, wisdom teeth extraction, and emergency dental care.</p>
          <h2>Dental Services Offered</h2>
          <p>Services include: General Dentistry (consultations, scaling, polishing, fillings), Cosmetic Dentistry (teeth whitening, veneers, bonding), Specialised Dentistry (root canals, implants, wisdom teeth), Dental Aesthetics (dental fillers, smile makeovers). The practice serves Centurion, Pretoria, Midrand, Johannesburg, and surrounding Gauteng areas.</p>
          <h2>Insurance and Payment</h2>
          <p>Refresh Dental accepts all major South African medical aids including Discovery Health, Bonitas, Momentum Health, Medihelp, GEMS, Bankmed, and Fedhealth. Flexible payment plans available through Athena. Credit card and EFT accepted.</p>
          <h2>Operating Hours</h2>
          <p>Monday to Thursday: 08:00-17:00, Friday: 08:00-15:00, Saturday (2nd Saturday): 08:00-12:00, Sunday: Closed. Emergency dental services available 24/7.</p>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
