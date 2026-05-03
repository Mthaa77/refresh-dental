/**
 * GBP-CONFIG.TS
 * Google Business Profile Configuration
 * Centralized management for all GBP-related settings and metadata
 */

import { locations, type Location } from '@/lib/locations';

export interface GBPProfile {
  locationId: string;
  businessName: string;
  businessType: string;
  category: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  website: string;
  hours: Record<string, { open: string; close: string }>;
  services: GBPService[];
  attributes: Record<string, string | boolean>;
  photos: string[];
  reviewsUrl: string;
  bookingUrl?: string;
}

export interface GBPService {
  name: string;
  description: string;
  priceRange?: string;
  availableOnline?: boolean;
  bookingUrl?: string;
}

/**
 * Generate GBP profile from location data
 */
export function generateGBPProfile(location: Location): GBPProfile {
  return {
    locationId: location.id,
    businessName: location.name,
    businessType: 'Dentist',
    category: 'Dental Clinic',
    phone: location.phone,
    address: {
      street: location.streetAddress,
      city: location.city,
      province: location.province,
      postalCode: location.postalCode,
      country: location.country,
    },
    coordinates: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    website: 'https://www.refreshdental.co.za',
    hours: {
      MONDAY: { open: location.hours.weekday.opens, close: location.hours.weekday.closes },
      TUESDAY: { open: location.hours.weekday.opens, close: location.hours.weekday.closes },
      WEDNESDAY: { open: location.hours.weekday.opens, close: location.hours.weekday.closes },
      THURSDAY: { open: location.hours.weekday.opens, close: location.hours.weekday.closes },
      FRIDAY: { open: location.hours.friday?.opens || location.hours.weekday.opens, close: location.hours.friday?.closes || location.hours.weekday.closes },
      SATURDAY: { open: location.hours.saturday?.opens || 'CLOSED', close: location.hours.saturday?.closes || 'CLOSED' },
      SUNDAY: { open: 'CLOSED', close: 'CLOSED' },
    },
    services: [
      {
        name: 'Dental Implants',
        description: 'Permanent tooth replacement solutions from R15,000',
        priceRange: 'R15,000 - R35,000',
        availableOnline: false,
      },
      {
        name: 'Professional Teeth Whitening',
        description: 'In-chair LED-accelerated whitening - 8 shades in 60 minutes',
        priceRange: 'R3,500',
        availableOnline: false,
      },
      {
        name: 'Porcelain Veneers',
        description: 'Custom porcelain veneers for smile transformation',
        priceRange: 'R8,000 - R15,000',
        availableOnline: false,
      },
      {
        name: 'Clear Aligners',
        description: 'Invisible teeth straightening without metal braces',
        availableOnline: false,
      },
      {
        name: 'Root Canal Treatment',
        description: 'Painless endodontic therapy with modern techniques',
        availableOnline: false,
      },
      {
        name: 'Dental Crowns & Bridges',
        description: 'High-quality porcelain restorations, same-day CEREC available',
        availableOnline: false,
      },
      {
        name: 'Emergency Dental Care',
        description: 'Same-day emergency appointments for dental emergencies',
        availableOnline: false,
      },
    ],
    attributes: {
      'wheelchair_accessible_entrance': true,
      'wheelchair_accessible_parking': true,
      'wheelchair_accessible_restroom': true,
      'accepts_insurance': true,
      'offers_new_patient_exams': true,
      'offers_teeth_cleaning': true,
      'offers_emergency_care': true,
      'female_dentist_available': true,
      'credit_cards': true,
      'online_appointment_booking': true,
    },
    photos: [
      'https://www.refreshdental.co.za/images/clinic/real/dr-malunga-procedure.jpg',
      'https://www.refreshdental.co.za/images/clinic/real/clinic-interior.jpg',
      'https://www.refreshdental.co.za/images/clinic/real/clinic-reception.jpg',
    ],
    reviewsUrl: 'https://www.google.com/search?q=Refresh+Dental+Centurion',
    bookingUrl: 'https://www.refreshdental.co.za/#contact',
  };
}

/**
 * Get GBP profiles for all active locations
 */
export function getAllGBPProfiles(): GBPProfile[] {
  return Object.values(locations)
    .filter((loc) => loc.isActive)
    .map((loc) => generateGBPProfile(loc));
}

/**
 * Get primary location GBP profile
 */
export function getPrimaryGBPProfile(): GBPProfile {
  return generateGBPProfile(locations.centurion);
}

/**
 * GBP Meta Tags Helper
 * Returns meta tags optimized for Google Business Profile
 */
export function getGBPMetaTags(profile: GBPProfile): Record<string, string> {
  return {
    'business:contact_data:street_address': profile.address.street,
    'business:contact_data:locality': profile.address.city,
    'business:contact_data:region': profile.address.province,
    'business:contact_data:postal_code': profile.address.postalCode,
    'business:contact_data:country_name': profile.address.country,
    'business:contact_data:phone_number': profile.phone,
    'business:contact_data:website': profile.website,
    'og:business_type': profile.businessType,
    'og:business_category': profile.category,
  };
}

/**
 * SEO Checklist for GBP Optimization
 */
export const GBP_OPTIMIZATION_CHECKLIST = {
  'Profile Completion': [
    '✓ Complete business information (name, address, phone)',
    '✓ Upload high-quality photos (10-15 minimum)',
    '✓ Add all business hours and holidays',
    '✓ Verify business location with accurate coordinates',
    '✓ Add comprehensive business description (750+ chars)',
  ],
  'Services & Products': [
    '✓ Add all dental services with descriptions',
    '✓ Include pricing information where applicable',
    '✓ Upload service photos',
    '✓ Create service categories',
    '✓ Add online booking links',
  ],
  'Reviews Management': [
    '✓ Respond to all reviews (positive and negative)',
    '✓ Encourage patients to leave reviews (follow-up emails)',
    '✓ Monitor review sentiment and address concerns',
    '✓ Use review insights to improve services',
    '✓ Aim for 50+ reviews and 4.5+ rating',
  ],
  'Local Signals': [
    '✓ Verify HPCSA registration/credentials',
    '✓ Add professional associations (SADA membership)',
    '✓ Link to medical aid partnerships',
    '✓ Add special offers/promotions monthly',
    '✓ Post regular updates about new services/equipment',
  ],
  'Mobile Optimization': [
    '✓ Ensure website is mobile-friendly',
    '✓ Add click-to-call buttons',
    '✓ Implement easy appointment booking',
    '✓ Add direction links (Google Maps)',
    '✓ Optimize for voice search',
  ],
};

/**
 * GBP Verification Steps
 */
export const GBP_VERIFICATION_STEPS = [
  {
    step: 1,
    title: 'Create/Claim Business Profile',
    action: 'Go to https://business.google.com and claim your business',
    timeframe: 'Immediate',
  },
  {
    step: 2,
    title: 'Verify Business Ownership',
    action: 'Complete verification via postcard, phone, email, or video call',
    timeframe: '1-2 weeks (postcard) or instant (phone/video)',
  },
  {
    step: 3,
    title: 'Complete Profile Information',
    action: 'Add all business details, hours, services, and photos',
    timeframe: '1-2 hours',
  },
  {
    step: 4,
    title: 'Verify Professional Credentials',
    action: 'Add HPCSA registration and professional memberships',
    timeframe: '1 hour',
  },
  {
    step: 5,
    title: 'Request Initial Reviews',
    action: 'Ask first 10-15 satisfied patients to leave reviews',
    timeframe: '2-4 weeks',
  },
  {
    step: 6,
    title: 'Monitor & Optimize',
    action: 'Track metrics, respond to reviews, and update regularly',
    timeframe: 'Ongoing monthly',
  },
];
