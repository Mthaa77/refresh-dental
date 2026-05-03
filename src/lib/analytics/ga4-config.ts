/**
 * GA4-CONFIG.TS
 * Google Analytics 4 Configuration & Event Tracking
 * Centralized configuration for all analytics tracking
 */

/**
 * GA4 Measurement ID (from Google Analytics)
 * ⚠️  USER ACTION REQUIRED: Set this in your environment variables
 * Format: G-XXXXXXXXXX
 */
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';

/**
 * Google Tag Manager ID (optional, if using GTM)
 * Format: GTM-XXXXXXX
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

/**
 * Environment detection
 */
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * GA4 Event Categories for Dental Practice
 */
export enum EventCategory {
  // Appointment & Booking
  APPOINTMENT_CLICK = 'appointment_click',
  APPOINTMENT_FORM_START = 'appointment_form_start',
  APPOINTMENT_FORM_SUBMIT = 'appointment_form_submit',
  APPOINTMENT_BOOKED = 'appointment_booked',

  // Contact & Inquiry
  CONTACT_FORM_START = 'contact_form_start',
  CONTACT_FORM_SUBMIT = 'contact_form_submit',
  PHONE_CLICK = 'phone_click',
  EMAIL_CLICK = 'email_click',
  WHATSAPP_CLICK = 'whatsapp_click',

  // Service Inquiry
  SERVICE_INQUIRY = 'service_inquiry',
  SERVICE_PAGE_VIEW = 'service_page_view',
  BOOKING_PAGE_VIEW = 'booking_page_view',

  // Content Engagement
  BLOG_PAGE_VIEW = 'blog_page_view',
  GUIDE_START = 'guide_start',
  GUIDE_COMPLETE = 'guide_complete',
  CONTENT_DOWNLOAD = 'content_download',

  // Video Engagement
  VIDEO_START = 'video_start',
  VIDEO_COMPLETE = 'video_complete',
  TESTIMONIAL_VIEW = 'testimonial_view',

  // Emergency & Urgent
  EMERGENCY_CLICK = 'emergency_click',
  URGENT_CONTACT = 'urgent_contact',

  // Medical Aid
  MEDICAL_AID_INQUIRY = 'medical_aid_inquiry',
  PAYMENT_PLAN_INQUIRY = 'payment_plan_inquiry',

  // Social & Sharing
  SOCIAL_SHARE = 'social_share',
  REVIEW_CLICK = 'review_click',
  REVIEW_SUBMIT = 'review_submit',

  // Page & Navigation
  PAGE_VIEW = 'page_view',
  SCROLL_DEPTH = 'scroll_depth',
  SITE_SEARCH = 'site_search',

  // Conversion Events (Highest Priority)
  CONVERSION = 'conversion',
  BOOKING_CONVERSION = 'booking_conversion',
  INQUIRY_CONVERSION = 'inquiry_conversion',
}

/**
 * GA4 Event Parameters
 */
export interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  booking_type?: string;
  service?: string;
  source?: string;
  location?: string;
  medical_aid?: string;
  urgency?: 'normal' | 'emergency' | 'urgent';
  [key: string]: any;
}

/**
 * Service categories for tracking
 */
export const Services = {
  DENTAL_IMPLANTS: 'dental_implants',
  TEETH_WHITENING: 'teeth_whitening',
  PORCELAIN_VENEERS: 'porcelain_veneers',
  CLEAR_ALIGNERS: 'clear_aligners',
  ROOT_CANAL: 'root_canal',
  DENTAL_CROWNS: 'dental_crowns',
  EMERGENCY_CARE: 'emergency_care',
  CONSULTATION: 'consultation',
} as const;

/**
 * Medical aid options for tracking
 */
export const MedicalAids = {
  DISCOVERY: 'discovery',
  BONITAS: 'bonitas',
  MOMENTUM: 'momentum',
  MEDIHELP: 'medihelp',
  GEMS: 'gems',
  OTHER: 'other',
} as const;

/**
 * Locations for multi-location tracking
 */
export const Locations = {
  CENTURION: 'centurion',
  // Add future locations here as they launch
} as const;

/**
 * Traffic sources for attribution
 */
export const TrafficSources = {
  ORGANIC: 'organic',
  LOCAL_PACK: 'local_pack',
  DIRECT: 'direct',
  REFERRAL: 'referral',
  PAID: 'paid',
  SOCIAL: 'social',
  EMAIL: 'email',
  AFFILIATE: 'affiliate',
} as const;

/**
 * GTM/GA4 Script injection for Next.js
 * Use in layout.tsx or _document.tsx
 */
export function getAnalyticsScripts() {
  return [
    {
      id: 'google-tag-manager-head',
      type: 'text/partytown',
      strategy: 'afterInteractive' as const,
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA4_MEASUREMENT_ID}', {
          'anonymize_ip': false,
          'allow_google_signals': true,
          'allow_ad_personalization_signals': true,
        });
      `,
    },
  ];
}

/**
 * Core GA4 Events Configuration
 */
export const GA4_EVENTS = {
  /**
   * Appointment Booking Events
   */
  appointmentClick: (service: string, source: string = 'website') => ({
    event: EventCategory.APPOINTMENT_CLICK,
    event_category: 'engagement',
    event_label: `appointment_click_${service}`,
    service,
    source,
  }),

  appointmentFormStart: (service: string) => ({
    event: EventCategory.APPOINTMENT_FORM_START,
    event_category: 'form',
    event_label: `appointment_form_start_${service}`,
    service,
  }),

  appointmentFormSubmit: (service: string, success: boolean = true) => ({
    event: EventCategory.APPOINTMENT_FORM_SUBMIT,
    event_category: 'form',
    event_label: `appointment_form_submit_${service}`,
    value: success ? 1 : 0,
    service,
  }),

  appointmentBooked: (
    service: string,
    bookingMethod: 'online' | 'phone' | 'form' = 'online'
  ) => ({
    event: EventCategory.APPOINTMENT_BOOKED,
    event_category: 'conversion',
    event_label: `booking_${service}_${bookingMethod}`,
    value: 1,
    conversion_type: 'booking',
    service,
    booking_method: bookingMethod,
  }),

  /**
   * Contact & Inquiry Events
   */
  contactFormSubmit: (success: boolean = true, message?: string) => ({
    event: EventCategory.CONTACT_FORM_SUBMIT,
    event_category: 'form',
    event_label: 'contact_form_submit',
    value: success ? 1 : 0,
    success,
  }),

  phoneClick: (location: string = 'centurion') => ({
    event: EventCategory.PHONE_CLICK,
    event_category: 'engagement',
    event_label: 'phone_click',
    location,
    phone_type: 'business',
  }),

  emergencyClick: () => ({
    event: EventCategory.EMERGENCY_CLICK,
    event_category: 'engagement',
    event_label: 'emergency_button_click',
    urgency: 'emergency',
  }),

  /**
   * Service Inquiry Events
   */
  serviceInquiry: (service: string, method: string = 'form') => ({
    event: EventCategory.SERVICE_INQUIRY,
    event_category: 'engagement',
    event_label: `service_inquiry_${service}`,
    service,
    inquiry_method: method,
  }),

  servicePageView: (service: string) => ({
    event: EventCategory.SERVICE_PAGE_VIEW,
    event_category: 'page_view',
    event_label: `service_page_${service}`,
    service,
  }),

  /**
   * Content Engagement Events
   */
  guideStart: (guideId: string, title: string) => ({
    event: EventCategory.GUIDE_START,
    event_category: 'engagement',
    event_label: `guide_start_${guideId}`,
    guide_id: guideId,
    guide_title: title,
  }),

  guideComplete: (guideId: string, timeSpent: number) => ({
    event: EventCategory.GUIDE_COMPLETE,
    event_category: 'engagement',
    event_label: `guide_complete_${guideId}`,
    value: timeSpent,
    guide_id: guideId,
  }),

  contentDownload: (contentType: string, contentName: string) => ({
    event: EventCategory.CONTENT_DOWNLOAD,
    event_category: 'engagement',
    event_label: `download_${contentType}`,
    content_type: contentType,
    content_name: contentName,
  }),

  /**
   * Video Engagement Events
   */
  videoStart: (videoId: string, videoTitle: string) => ({
    event: EventCategory.VIDEO_START,
    event_category: 'video',
    event_label: `video_start_${videoId}`,
    video_id: videoId,
    video_title: videoTitle,
  }),

  videoComplete: (videoId: string) => ({
    event: EventCategory.VIDEO_COMPLETE,
    event_category: 'video',
    event_label: `video_complete_${videoId}`,
    video_id: videoId,
  }),

  /**
   * Review Events
   */
  reviewClick: () => ({
    event: EventCategory.REVIEW_CLICK,
    event_category: 'engagement',
    event_label: 'review_link_click',
  }),

  reviewSubmit: (rating: number) => ({
    event: EventCategory.REVIEW_SUBMIT,
    event_category: 'engagement',
    event_label: 'review_submitted',
    rating,
  }),

  /**
   * Conversion Events (Priority)
   */
  bookingConversion: (service: string, value: number = 1) => ({
    event: EventCategory.BOOKING_CONVERSION,
    event_category: 'conversion',
    event_label: `booking_${service}`,
    value,
    conversion_type: 'booking',
    service,
  }),

  inquiryConversion: (source: string = 'website') => ({
    event: EventCategory.INQUIRY_CONVERSION,
    event_category: 'conversion',
    event_label: 'inquiry_conversion',
    value: 1,
    conversion_source: source,
  }),

  /**
   * Medical Aid Events
   */
  medicalAidInquiry: (medicalAid: string, service: string) => ({
    event: EventCategory.MEDICAL_AID_INQUIRY,
    event_category: 'engagement',
    event_label: `medical_aid_inquiry_${medicalAid}`,
    medical_aid: medicalAid,
    service,
  }),

  /**
   * Page View Events
   */
  pageView: (pagePath: string, pageTitle: string, location: string = 'centurion') => ({
    event: EventCategory.PAGE_VIEW,
    page_path: pagePath,
    page_title: pageTitle,
    location,
  }),

  /**
   * Scroll Depth Tracking
   */
  scrollDepth: (depth: number, section: string) => ({
    event: EventCategory.SCROLL_DEPTH,
    event_category: 'engagement',
    scroll_depth_percentage: depth,
    section,
  }),

  /**
   * Social Sharing
   */
  socialShare: (network: string, contentType: string, contentId: string) => ({
    event: EventCategory.SOCIAL_SHARE,
    event_category: 'engagement',
    event_label: `share_${network}_${contentType}`,
    social_network: network,
    content_type: contentType,
    content_id: contentId,
  }),
};

/**
 * Goal Completions for Reporting
 * These should be set up as Conversions in Google Analytics
 */
export const CONVERSION_GOALS = {
  APPOINTMENT_BOOKING: {
    name: 'Appointment Booking',
    eventName: EventCategory.BOOKING_CONVERSION,
    description: 'User successfully booked an appointment',
  },
  CONTACT_FORM: {
    name: 'Contact Form Submission',
    eventName: EventCategory.CONTACT_FORM_SUBMIT,
    description: 'User submitted the contact form',
  },
  PHONE_CALL: {
    name: 'Phone Call Click',
    eventName: EventCategory.PHONE_CLICK,
    description: 'User clicked phone number to initiate call',
  },
  EMERGENCY_CONTACT: {
    name: 'Emergency Contact Click',
    eventName: EventCategory.EMERGENCY_CLICK,
    description: 'User initiated emergency contact',
  },
  SERVICE_INQUIRY: {
    name: 'Service Inquiry',
    eventName: EventCategory.SERVICE_INQUIRY,
    description: 'User inquired about a specific service',
  },
  MEDICAL_AID_INQUIRY: {
    name: 'Medical Aid Inquiry',
    eventName: EventCategory.MEDICAL_AID_INQUIRY,
    description: 'User inquired about medical aid coverage',
  },
  REVIEW_SUBMISSION: {
    name: 'Review Submission',
    eventName: EventCategory.REVIEW_SUBMIT,
    description: 'User submitted a review',
  },
};

/**
 * GA4 Utility: Send custom event
 * Use this in components to track events
 * @param eventName - Event category/name
 * @param params - Event parameters
 */
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...(isDevelopment && { debug_mode: true }),
      ...params,
    });
  }

  if (isDevelopment) {
    console.log('[GA4 Event]', eventName, params);
  }
}

/**
 * GA4 Utility: Set user properties
 * @param properties - User properties to set
 */
export function setUserProperties(properties: Record<string, string>) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('set', {
      'user_properties': properties,
    });
  }
}

/**
 * GA4 Utility: Track page view
 * Use in page components for manual tracking
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('config', GA4_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}

/**
 * GA4 Utility: Identify user (for conversion tracking)
 * @param userId - Unique user identifier
 * @param email - User email (optional)
 */
export function identifyUser(userId: string, email?: string) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('config', GA4_MEASUREMENT_ID, {
      'user_id': userId,
      ...(email && { 'user_email': email }),
    });
  }
}

/**
 * Required configuration for .env.local
 */
export const ENV_REQUIREMENTS = {
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: {
    description: 'Google Analytics 4 Measurement ID',
    format: 'G-XXXXXXXXXX',
    required: true,
    link: 'https://support.google.com/analytics/answer/9539674',
  },
};

/**
 * Setup Instructions
 */
export const ANALYTICS_SETUP_GUIDE = `
# Google Analytics 4 Setup Instructions

## Step 1: Create GA4 Property
1. Go to https://analytics.google.com/
2. Click "Create" → "Property"
3. Set property name to "Refresh Dental"
4. Select "Web" as platform
5. Enter website URL: https://www.refreshdental.co.za

## Step 2: Get Measurement ID
1. Go to Admin → Data Streams
2. Click on web data stream
3. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Step 3: Add to Environment Variables
1. Add to .env.local:
   NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

## Step 4: Install gtag Script
✓ Already implemented in layout.tsx

## Step 5: Verify Installation
1. Go to Realtime report in GA4
2. Visit your website in a new tab
3. You should see active users in realtime

## Step 6: Set Up Conversion Goals
1. Admin → Conversions
2. Create conversion for:
   - appointment_booked
   - contact_form_submit
   - phone_click
   - inquiry_conversion

## Step 7: Create Custom Reports
1. Reports → Create custom report
2. Add dimensions: Service, Medical Aid, Location
3. Add metrics: Users, Sessions, Conversions

## Reference
- GA4 Setup Docs: https://support.google.com/analytics/answer/9744165
- Event Tracking: https://support.google.com/analytics/answer/9234069
`;

export default GA4_EVENTS;
