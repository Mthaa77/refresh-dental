/**
 * ANALYTICS-EVENTS.TS
 * Reusable analytics event tracking utilities
 * Import and use these functions in your components
 */

import { GA4_EVENTS, trackEvent, Services, MedicalAids, Locations } from '@/lib/analytics/ga4-config';

/**
 * ═════════════════════════════════════════════
 * APPOINTMENT & BOOKING EVENTS
 * ═════════════════════════════════════════════
 */

export function trackAppointmentClick(service: string, location = 'centurion') {
  trackEvent('appointment_click', {
    service,
    location,
    timestamp: new Date().toISOString(),
  });
}

export function trackAppointmentFormStart(service: string) {
  const event = GA4_EVENTS.appointmentFormStart(service);
  trackEvent(event.event, event);
}

export function trackAppointmentFormSubmit(
  service: string,
  success: boolean = true,
  details?: Record<string, any>
) {
  const event = GA4_EVENTS.appointmentFormSubmit(service, success);
  trackEvent(event.event, { ...event, ...details });
}

export function trackAppointmentBooked(
  service: string,
  bookingMethod: 'online' | 'phone' | 'form' = 'online'
) {
  const event = GA4_EVENTS.appointmentBooked(service, bookingMethod);
  trackEvent(event.event, event);
}

/**
 * ═════════════════════════════════════════════
 * CONTACT & COMMUNICATION EVENTS
 * ═════════════════════════════════════════════
 */

export function trackContactFormSubmit(success: boolean = true) {
  const event = GA4_EVENTS.contactFormSubmit(success);
  trackEvent(event.event, event);
}

export function trackPhoneClick(source = 'phone_button') {
  const event = GA4_EVENTS.phoneClick('centurion');
  trackEvent(event.event, { ...event, source });
}

export function trackEmergencyClick() {
  const event = GA4_EVENTS.emergencyClick();
  trackEvent(event.event, event);
}

export function trackWhatsAppClick(service?: string) {
  trackEvent('whatsapp_click', {
    communication_channel: 'whatsapp',
    service,
    timestamp: new Date().toISOString(),
  });
}

export function trackEmailClick() {
  trackEvent('email_click', {
    communication_channel: 'email',
  });
}

/**
 * ═════════════════════════════════════════════
 * SERVICE INQUIRY & NAVIGATION EVENTS
 * ═════════════════════════════════════════════
 */

export function trackServiceInquiry(service: string, method = 'form') {
  const event = GA4_EVENTS.serviceInquiry(service, method);
  trackEvent(event.event, event);
}

export function trackServicePageView(service: string) {
  const event = GA4_EVENTS.servicePageView(service);
  trackEvent(event.event, event);
}

export function trackGalleryView(category: string, count: number) {
  trackEvent('gallery_view', {
    category,
    photo_count: count,
  });
}

/**
 * ═════════════════════════════════════════════
 * CONTENT ENGAGEMENT EVENTS
 * ═════════════════════════════════════════════
 */

export function trackGuideStart(guideId: string, guideTitle: string) {
  const event = GA4_EVENTS.guideStart(guideId, guideTitle);
  trackEvent(event.event, event);
}

export function trackGuideComplete(guideId: string, timeSpent: number) {
  const event = GA4_EVENTS.guideComplete(guideId, timeSpent);
  trackEvent(event.event, event);
}

export function trackBlogPostView(postId: string, postTitle: string) {
  trackEvent('blog_post_view', {
    post_id: postId,
    post_title: postTitle,
    content_type: 'blog',
  });
}

export function trackContentDownload(contentType: string, contentName: string) {
  const event = GA4_EVENTS.contentDownload(contentType, contentName);
  trackEvent(event.event, event);
}

/**
 * ═════════════════════════════════════════════
 * VIDEO ENGAGEMENT EVENTS
 * ═════════════════════════════════════════════
 */

export function trackVideoStart(videoId: string, videoTitle: string) {
  const event = GA4_EVENTS.videoStart(videoId, videoTitle);
  trackEvent(event.event, event);
}

export function trackVideoComplete(videoId: string, duration?: number) {
  const event = GA4_EVENTS.videoComplete(videoId);
  trackEvent(event.event, { ...event, duration });
}

export function trackTestimonialView(testmonialId: string, service?: string) {
  trackEvent('testimonial_view', {
    testimonial_id: testmonialId,
    service,
    content_type: 'testimonial',
  });
}

/**
 * ═════════════════════════════════════════════
 * REVIEW EVENTS
 * ═════════════════════════════════════════════
 */

export function trackReviewClick(platform: string = 'google') {
  const event = GA4_EVENTS.reviewClick();
  trackEvent(event.event, { ...event, platform });
}

export function trackReviewSubmit(rating: number, platform: string = 'google') {
  const event = GA4_EVENTS.reviewSubmit(rating);
  trackEvent(event.event, { ...event, platform });
}

/**
 * ═════════════════════════════════════════════
 * CONVERSION EVENTS (HIGHEST PRIORITY)
 * ═════════════════════════════════════════════
 */

export function trackBookingConversion(service: string, value = 1) {
  const event = GA4_EVENTS.bookingConversion(service, value);
  trackEvent(event.event, event);
  console.log(`[v0] Booking conversion tracked: ${service}`);
}

export function trackInquiryConversion(source = 'website') {
  const event = GA4_EVENTS.inquiryConversion(source);
  trackEvent(event.event, event);
  console.log(`[v0] Inquiry conversion tracked from: ${source}`);
}

export function trackConsultationBooked(service: string, bookingType: 'online' | 'phone' = 'online') {
  trackEvent('consultation_booked', {
    service,
    booking_type: bookingType,
    conversion_type: 'consultation',
    value: 1,
  });
  console.log(`[v0] Consultation booking tracked: ${service}`);
}

/**
 * ═════════════════════════════════════════════
 * MEDICAL AID & FINANCIAL EVENTS
 * ═════════════════════════════════════════════
 */

export function trackMedicalAidInquiry(medicalAid: string, service: string) {
  const event = GA4_EVENTS.medicalAidInquiry(medicalAid, service);
  trackEvent(event.event, event);
}

export function trackPaymentPlanInquiry(service: string) {
  trackEvent('payment_plan_inquiry', {
    service,
    inquiry_type: 'financing',
  });
}

export function trackMedicalAidComparison() {
  trackEvent('medical_aid_comparison_view', {
    content_type: 'tool',
  });
}

/**
 * ═════════════════════════════════════════════
 * ENGAGEMENT & INTERACTION EVENTS
 * ═════════════════════════════════════════════
 */

export function trackScrollDepth(depth: number, section: string) {
  const event = GA4_EVENTS.scrollDepth(depth, section);
  trackEvent(event.event, event);
}

export function trackSocialShare(network: string, contentType: string, contentId: string) {
  const event = GA4_EVENTS.socialShare(network, contentType, contentId);
  trackEvent(event.event, event);
}

export function trackSiteSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('site_search', {
    search_term: searchTerm,
    result_count: resultsCount,
  });
}

export function trackAccordionToggle(sectionName: string, opened: boolean) {
  trackEvent('accordion_toggle', {
    section: sectionName,
    state: opened ? 'open' : 'closed',
  });
}

export function trackTabSwitch(tabName: string) {
  trackEvent('tab_switch', {
    tab_name: tabName,
  });
}

/**
 * ═════════════════════════════════════════════
 * TECHNICAL & ERROR EVENTS
 * ═════════════════════════════════════════════
 */

export function trackFormError(formName: string, errorMessage: string) {
  trackEvent('form_error', {
    form_name: formName,
    error_message: errorMessage,
  });
}

export function trackLoadError(componentName: string, errorType: string) {
  trackEvent('load_error', {
    component: componentName,
    error_type: errorType,
  });
}

export function trackPageError(errorMessage: string, stack?: string) {
  trackEvent('page_error', {
    error_message: errorMessage,
    error_stack: stack?.substring(0, 100),
  });
}

/**
 * ═════════════════════════════════════════════
 * TIMING & PERFORMANCE EVENTS
 * ═════════════════════════════════════════════
 */

export function trackComponentLoadTime(componentName: string, loadTimeMs: number) {
  if (window.gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: componentName,
      value: loadTimeMs,
      event_category: 'performance',
      event_label: `load_${componentName}`,
    });
  }
}

export function trackFormSubmitTime(formName: string, submittimeMs: number) {
  if (window.gtag) {
    (window as any).gtag('event', 'form_submission_time', {
      form_name: formName,
      duration_ms: submittimeMs,
      event_category: 'performance',
    });
  }
}

/**
 * ═════════════════════════════════════════════
 * UTILITY FUNCTIONS
 * ═════════════════════════════════════════════
 */

/**
 * Track any custom event not covered above
 */
export function trackCustomEvent(
  eventName: string,
  eventData: Record<string, any> = {}
) {
  trackEvent(eventName, {
    ...eventData,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Create a timing tracker for measuring durations
 */
export function createTimingTracker(eventName: string) {
  const startTime = performance.now();

  return {
    complete: (metadata?: Record<string, any>) => {
      const duration = performance.now() - startTime;
      trackEvent(`${eventName}_complete`, {
        duration_ms: Math.round(duration),
        ...metadata,
      });
    },
  };
}

/**
 * Track click on element (useful for buttons, links)
 */
export function trackElementClick(
  element: string,
  action: string,
  label?: string
) {
  trackEvent('element_click', {
    element,
    action,
    label,
  });
}

/**
 * Common event tracking for CTA buttons
 */
export function trackCTAClick(
  buttonText: string,
  destination: string,
  service?: string
) {
  trackEvent('cta_click', {
    button_text: buttonText,
    destination,
    service,
  });
}

/**
 * ═════════════════════════════════════════════
 * EXPORT SUMMARY FOR QUICK REFERENCE
 * ═════════════════════════════════════════════
 */

export const analyticsEvents = {
  // Booking
  appointmentClick: trackAppointmentClick,
  appointmentFormStart: trackAppointmentFormStart,
  appointmentFormSubmit: trackAppointmentFormSubmit,
  appointmentBooked: trackAppointmentBooked,

  // Contact
  contactFormSubmit: trackContactFormSubmit,
  phoneClick: trackPhoneClick,
  emergencyClick: trackEmergencyClick,
  whatsAppClick: trackWhatsAppClick,

  // Conversions
  bookingConversion: trackBookingConversion,
  inquiryConversion: trackInquiryConversion,
  consultationBooked: trackConsultationBooked,

  // Content
  guideStart: trackGuideStart,
  guideComplete: trackGuideComplete,
  blogPostView: trackBlogPostView,
  contentDownload: trackContentDownload,

  // Video
  videoStart: trackVideoStart,
  videoComplete: trackVideoComplete,
  testimonialView: trackTestimonialView,

  // Reviews
  reviewClick: trackReviewClick,
  reviewSubmit: trackReviewSubmit,

  // Utility
  trackCustomEvent,
  createTimingTracker,
  trackElementClick,
  trackCTAClick,
};
