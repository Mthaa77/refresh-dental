/**
 * LOCATION-SCHEMA-GENERATOR.TS
 * Dynamic JSON-LD schema generation for multi-location support
 * Enables proper structured data for each location independently
 */

import { type Location, getActiveLocations, DEFAULT_LOCATION_ID } from '@/lib/locations';

const SITE_URL = 'https://www.refreshdental.co.za';

/**
 * Generate complete LocalBusiness schema for a location
 */
export function generateLocationLocalBusinessSchema(location: Location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}/#dentist-${location.id}`,
    name: location.name,
    description: `Premium dental practice in ${location.city}, ${location.province}. HPCSA-registered. Dental implants, cosmetic dentistry, teeth whitening, veneers, clear aligners, root canal treatment, and emergency care.`,
    url: SITE_URL,
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.city,
      addressRegion: location.province,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    areaServed: location.serviceAreas || [],
    openingHoursSpecification: generateOpeningHoursSpecification(location),
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
    image: [
      `${SITE_URL}/images/clinic/real/dr-malunga-procedure.jpg`,
      `${SITE_URL}/images/clinic/real/clinic-interior.jpg`,
      `${SITE_URL}/images/clinic/real/clinic-reception.jpg`,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Dental Services at Refresh Dental — ${location.city}`,
      itemListElement: generateServiceOfferings(),
    },
  };
}

/**
 * Generate opening hours specification
 */
function generateOpeningHoursSpecification(location: Location) {
  const specs = [];

  // Weekdays
  specs.push({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: location.hours.weekday.opens,
    closes: location.hours.weekday.closes,
  });

  // Friday (may have different hours)
  if (location.hours.friday) {
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: location.hours.friday.opens,
      closes: location.hours.friday.closes,
    });
  } else {
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: location.hours.weekday.opens,
      closes: location.hours.weekday.closes,
    });
  }

  // Saturday
  if (location.hours.saturday) {
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: location.hours.saturday.opens,
      closes: location.hours.saturday.closes,
    });
  }

  // Sunday
  if (location.hours.sunday) {
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: location.hours.sunday.opens,
      closes: location.hours.sunday.closes,
    });
  }

  return specs;
}

/**
 * Generate service offerings schema
 */
function generateServiceOfferings() {
  const services = [
    {
      name: 'Dental Implants',
      price: '15000',
      description: 'Permanent titanium tooth replacement from R15,000',
    },
    {
      name: 'Professional Teeth Whitening',
      price: '3500',
      description: 'In-chair LED whitening — 8 shades in 60 minutes',
    },
    {
      name: 'Porcelain Veneers',
      price: '8000',
      description: 'Custom porcelain veneers (R8,000-R15,000)',
    },
    {
      name: 'Clear Aligners',
      price: 'Custom',
      description: 'Invisible teeth straightening without metal braces',
    },
    {
      name: 'Root Canal Treatment',
      price: 'Custom',
      description: 'Painless endodontic therapy with modern techniques',
    },
    {
      name: 'Dental Crowns & Bridges',
      price: 'Custom',
      description: 'High-quality restorations, same-day CEREC available',
    },
  ];

  return services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
      },
      price: service.price,
      priceCurrency: 'ZAR',
    },
  }));
}

/**
 * Generate location-specific FAQ schema
 */
export function generateLocationFAQSchema(locationId: string) {
  const location = { id: locationId }; // Simplified for template purposes

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I book an appointment at Refresh Dental in ${locationId}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book online at refreshdental.co.za or call us directly. Same-day emergency appointments are available.',
        },
      },
      {
        '@type': 'Question',
        name: 'What dental services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer dental implants, teeth whitening, porcelain veneers, clear aligners, root canal treatment, crowns, bridges, and emergency dental care.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you accept medical aid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we accept all major South African medical aids including Discovery, Bonitas, Momentum, Medihelp, and GEMS.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are payment plans available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer interest-free payment plans to make dental care more affordable.',
        },
      },
    ],
  };
}

/**
 * Generate breadcrumb schema for location pages
 */
export function generateLocationBreadcrumbSchema(locationId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${SITE_URL}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Refresh Dental ${locationId}`,
        item: `${SITE_URL}/locations/${locationId}`,
      },
    ],
  };
}

/**
 * Generate location sitemap entries
 */
export function generateLocationSitemapEntries() {
  const today = new Date();
  return getActiveLocations().map((location) => ({
    url: `${SITE_URL}/locations/${location.id}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
}

/**
 * Generate multi-location organization schema
 */
export function generateMultiLocationOrganizationSchema() {
  const activeLocations = getActiveLocations();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Refresh Dental',
    description: 'Premium dental practice with locations across South Africa',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/refresh-dental-logo.jpg`,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://www.instagram.com/refresh_dental_',
      'https://www.facebook.com/share/17deYWeBn9',
      'https://www.linkedin.com/in/drlebogangmalunga',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      itemListElement: activeLocations.map((location) => ({
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#dentist-${location.id}`,
        name: location.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.streetAddress,
          addressLocality: location.city,
          postalCode: location.postalCode,
        },
      })),
    },
  };
}

/**
 * Validate schema structure
 */
export function validateLocationSchema(schema: any): boolean {
  const requiredFields = ['@type', 'name', 'address', 'geo', 'telephone', 'url'];
  return requiredFields.every((field) => field in schema);
}

/**
 * Get all location canonical URLs for SEO
 */
export function getLocationCanonicalURLs(): Record<string, string> {
  const urls: Record<string, string> = {
    home: SITE_URL,
    locations: `${SITE_URL}/locations`,
  };

  getActiveLocations().forEach((location) => {
    urls[`location-${location.id}`] = `${SITE_URL}/locations/${location.id}`;
  });

  return urls;
}
