/**
 * SEO-METRICS.TS
 * Key Performance Indicators & Metrics for SEO Tracking
 * Monitor these metrics monthly to measure SEO success
 */

/**
 * KPI Categories
 */
export enum KPICategory {
  SEARCH_VISIBILITY = 'search_visibility',
  RANKINGS = 'rankings',
  TRAFFIC = 'traffic',
  ENGAGEMENT = 'engagement',
  CONVERSIONS = 'conversions',
  AUTHORITY = 'authority',
  LOCAL = 'local',
  TECHNICAL = 'technical',
}

/**
 * KPI Definition
 */
export interface KPI {
  id: string;
  name: string;
  category: KPICategory;
  description: string;
  target: number;
  baseline?: number;
  unit: string;
  measurement_frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  data_source: string;
  tools: string[];
  improvement_trend: 'up' | 'down' | 'neutral';
  benchmark?: string;
}

/**
 * Core SEO Metrics & KPIs
 */
export const seoMetrics: Record<string, KPI> = {
  /**
   * ═════════════════════════════════════════════
   * SEARCH VISIBILITY METRICS
   * ═════════════════════════════════════════════
   */

  organic_traffic: {
    id: 'organic_traffic',
    name: 'Organic Traffic (Sessions)',
    category: KPICategory.TRAFFIC,
    description: 'Total sessions from organic search (Google, Bing, etc.)',
    target: 2000, // Monthly target
    unit: 'sessions/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4', 'Google Search Console'],
    improvement_trend: 'up',
    benchmark: '+ 20% MoM growth target',
  },

  organic_users: {
    id: 'organic_users',
    name: 'Organic Users (Unique Visitors)',
    category: KPICategory.TRAFFIC,
    description: 'Unique users arriving from organic search',
    target: 1500, // Monthly target
    unit: 'users/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'up',
    benchmark: 'Baseline + 25% at 6 months',
  },

  search_visibility: {
    id: 'search_visibility',
    name: 'Search Visibility Score',
    category: KPICategory.SEARCH_VISIBILITY,
    description: 'Overall visibility in search results (SEMrush metric 0-100)',
    target: 65,
    baseline: 35,
    unit: 'score',
    measurement_frequency: 'weekly',
    data_source: 'SEMrush',
    tools: ['SEMrush', 'Ahrefs'],
    improvement_trend: 'up',
    benchmark: '+20 points at 6 months',
  },

  indexed_pages: {
    id: 'indexed_pages',
    name: 'Indexed Pages',
    category: KPICategory.TECHNICAL,
    description: 'Total pages indexed by Google',
    target: 50,
    unit: 'pages',
    measurement_frequency: 'monthly',
    data_source: 'Google Search Console',
    tools: ['Google Search Console'],
    improvement_trend: 'up',
    benchmark: 'All important pages should be indexed',
  },

  /**
   * ═════════════════════════════════════════════
   * RANKING METRICS
   * ═════════════════════════════════════════════
   */

  keyword_rankings_top10: {
    id: 'keyword_rankings_top10',
    name: 'Keywords Ranking Top 10',
    category: KPICategory.RANKINGS,
    description: 'Number of target keywords ranking in top 10 of SERPs',
    target: 25,
    baseline: 5,
    unit: 'keywords',
    measurement_frequency: 'weekly',
    data_source: 'Rank Tracker (SEMrush/Ahrefs)',
    tools: ['SEMrush', 'Ahrefs', 'Rank Math'],
    improvement_trend: 'up',
    benchmark: '+5 keywords/month target',
  },

  keyword_rankings_top3: {
    id: 'keyword_rankings_top3',
    name: 'Keywords Ranking Top 3 (Featured)',
    category: KPICategory.RANKINGS,
    description: 'Number of target keywords in positions 1-3',
    target: 10,
    unit: 'keywords',
    measurement_frequency: 'weekly',
    data_source: 'Rank Tracker',
    tools: ['SEMrush', 'Ahrefs', 'Rank Math'],
    improvement_trend: 'up',
    benchmark: 'Premium placement targets',
  },

  local_pack_visibility: {
    id: 'local_pack_visibility',
    name: 'Local Pack Rankings (Google Maps)',
    category: KPICategory.LOCAL,
    description: 'Keywords where business appears in Google Local Pack (top 3 map results)',
    target: 15,
    unit: 'keywords',
    measurement_frequency: 'weekly',
    data_source: 'Google Business Profile / Rank Tracker',
    tools: ['Google Business Profile', 'SEMrush Local', 'Ahrefs'],
    improvement_trend: 'up',
    benchmark: 'Top priority for local dominance',
  },

  local_pack_position_average: {
    id: 'local_pack_position_avg',
    name: 'Local Pack Average Position',
    category: KPICategory.LOCAL,
    description: 'Average position in Google Local Pack across tracked keywords',
    target: 2.5,
    unit: 'position',
    measurement_frequency: 'weekly',
    data_source: 'Local SEO Tools',
    tools: ['SEMrush Local', 'Moz Local'],
    improvement_trend: 'down', // Lower is better for position
    benchmark: 'Target #1-3 positions',
  },

  /**
   * ═════════════════════════════════════════════
   * AUTHORITY & BACKLINK METRICS
   * ═════════════════════════════════════════════
   */

  backlinks_total: {
    id: 'backlinks_total',
    name: 'Total Backlinks',
    category: KPICategory.AUTHORITY,
    description: 'Total number of backlinks pointing to domain',
    target: 50,
    baseline: 10,
    unit: 'backlinks',
    measurement_frequency: 'monthly',
    data_source: 'Ahrefs / SEMrush',
    tools: ['Ahrefs', 'SEMrush', 'Backlink Auditor'],
    improvement_trend: 'up',
    benchmark: '+5-10 new links/month target',
  },

  referring_domains: {
    id: 'referring_domains',
    name: 'Referring Domains',
    category: KPICategory.AUTHORITY,
    description: 'Number of unique domains linking to your site',
    target: 30,
    baseline: 8,
    unit: 'domains',
    measurement_frequency: 'monthly',
    data_source: 'Ahrefs / SEMrush',
    tools: ['Ahrefs', 'SEMrush'],
    improvement_trend: 'up',
    benchmark: '+3-5 new domains/month target',
  },

  domain_authority: {
    id: 'domain_authority',
    name: 'Domain Authority (DA)',
    category: KPICategory.AUTHORITY,
    description: 'Ahrefs Domain Rating (0-100 scale)',
    target: 45,
    baseline: 20,
    unit: 'DA score',
    measurement_frequency: 'monthly',
    data_source: 'Ahrefs',
    tools: ['Ahrefs'],
    improvement_trend: 'up',
    benchmark: '+5-10 points at 6 months',
  },

  citation_count: {
    id: 'citation_count',
    name: 'Local Citations',
    category: KPICategory.LOCAL,
    description: 'Number of business directory listings (NAP citations)',
    target: 100,
    baseline: 5,
    unit: 'citations',
    measurement_frequency: 'monthly',
    data_source: 'Moz Local / Yext / SEMrush',
    tools: ['Moz Local', 'Yext', 'SEMrush', 'Whitespark'],
    improvement_trend: 'up',
    benchmark: 'Comprehensive directory coverage',
  },

  citation_consistency: {
    id: 'citation_consistency',
    name: 'NAP Consistency Score',
    category: KPICategory.LOCAL,
    description: 'Percentage of citations with correct Name, Address, Phone',
    target: 95,
    unit: '%',
    measurement_frequency: 'monthly',
    data_source: 'Moz Local',
    tools: ['Moz Local', 'Yext'],
    improvement_trend: 'up',
    benchmark: '95%+ consistency is critical',
  },

  /**
   * ═════════════════════════════════════════════
   * ENGAGEMENT METRICS
   * ═════════════════════════════════════════════
   */

  average_session_duration: {
    id: 'avg_session_duration',
    name: 'Average Session Duration',
    category: KPICategory.ENGAGEMENT,
    description: 'Average time users spend on site per session',
    target: 180, // seconds (3 minutes)
    unit: 'seconds',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'up',
    benchmark: '3+ minutes indicates quality content',
  },

  pages_per_session: {
    id: 'pages_per_session',
    name: 'Pages Per Session',
    category: KPICategory.ENGAGEMENT,
    description: 'Average number of pages viewed per session',
    target: 2.5,
    unit: 'pages',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'up',
    benchmark: '2.5+ pages/session is healthy',
  },

  bounce_rate: {
    id: 'bounce_rate',
    name: 'Bounce Rate',
    category: KPICategory.ENGAGEMENT,
    description: 'Percentage of sessions that bounce without interaction',
    target: 40,
    unit: '%',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'down', // Lower is better
    benchmark: 'Below 50% is target',
  },

  scroll_depth: {
    id: 'scroll_depth',
    name: 'Average Scroll Depth',
    category: KPICategory.ENGAGEMENT,
    description: 'Average percentage of page scrolled by users',
    target: 70,
    unit: '%',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'up',
    benchmark: '70%+ indicates good content engagement',
  },

  /**
   * ═════════════════════════════════════════════
   * CONVERSION METRICS
   * ═════════════════════════════════════════════
   */

  appointment_bookings: {
    id: 'appointment_bookings',
    name: 'Appointment Bookings (Organic)',
    category: KPICategory.CONVERSIONS,
    description: 'Number of appointment bookings from organic search',
    target: 20,
    unit: 'bookings/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4 / CRM',
    tools: ['Google Analytics 4', 'Booking system'],
    improvement_trend: 'up',
    benchmark: 'Primary conversion goal',
  },

  contact_form_submissions: {
    id: 'contact_form_submissions',
    name: 'Contact Form Submissions',
    category: KPICategory.CONVERSIONS,
    description: 'Number of contact form submissions from organic traffic',
    target: 30,
    unit: 'submissions/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4 / Form tracker',
    tools: ['Google Analytics 4', 'Formspree'],
    improvement_trend: 'up',
    benchmark: 'Secondary conversion metric',
  },

  phone_calls: {
    id: 'phone_calls',
    name: 'Phone Calls from Website',
    category: KPICategory.CONVERSIONS,
    description: 'Number of phone clicks/calls initiated from website',
    target: 40,
    unit: 'calls/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4 / Call tracking',
    tools: ['Google Analytics 4', 'Call tracking software'],
    improvement_trend: 'up',
    benchmark: 'Important micro-conversion',
  },

  organic_conversion_rate: {
    id: 'organic_conversion_rate',
    name: 'Organic Conversion Rate',
    category: KPICategory.CONVERSIONS,
    description: 'Percentage of organic traffic that converts (any goal)',
    target: 3.5,
    unit: '%',
    measurement_frequency: 'monthly',
    data_source: 'Google Analytics 4',
    tools: ['Google Analytics 4'],
    improvement_trend: 'up',
    benchmark: '2-5% is typical for services',
  },

  /**
   * ═════════════════════════════════════════════
   * LOCAL BUSINESS METRICS
   * ═════════════════════════════════════════════
   */

  google_business_profile_views: {
    id: 'gbp_views',
    name: 'Google Business Profile Views',
    category: KPICategory.LOCAL,
    description: 'Number of views on Google Business Profile',
    target: 500,
    unit: 'views/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Business Profile Insights',
    tools: ['Google Business Profile'],
    improvement_trend: 'up',
    benchmark: '+50% at 6 months',
  },

  google_reviews_count: {
    id: 'google_reviews_count',
    name: 'Google Reviews',
    category: KPICategory.LOCAL,
    description: 'Total number of Google reviews',
    target: 50,
    baseline: 15,
    unit: 'reviews',
    measurement_frequency: 'monthly',
    data_source: 'Google Business Profile',
    tools: ['Google Business Profile', 'Review monitoring'],
    improvement_trend: 'up',
    benchmark: 'Target 1-2 new reviews/week',
  },

  average_rating: {
    id: 'average_rating',
    name: 'Average Review Rating',
    category: KPICategory.LOCAL,
    description: 'Average star rating across all reviews',
    target: 4.5,
    unit: 'stars',
    measurement_frequency: 'monthly',
    data_source: 'Google Business Profile',
    tools: ['Google Business Profile'],
    improvement_trend: 'up',
    benchmark: '4.5+ stars is excellent',
  },

  actions_from_gbp: {
    id: 'actions_from_gbp',
    name: 'Actions from Google Business Profile',
    category: KPICategory.LOCAL,
    description: 'Clicks to website, call, or direction requests from GBP',
    target: 100,
    unit: 'actions/month',
    measurement_frequency: 'monthly',
    data_source: 'Google Business Profile Insights',
    tools: ['Google Business Profile'],
    improvement_trend: 'up',
    benchmark: 'Key traffic driver metric',
  },

  /**
   * ═════════════════════════════════════════════
   * TECHNICAL SEO METRICS
   * ═════════════════════════════════════════════
   */

  page_load_speed: {
    id: 'page_load_speed',
    name: 'Page Load Speed (LCP)',
    category: KPICategory.TECHNICAL,
    description: 'Largest Contentful Paint time in seconds',
    target: 2.5,
    unit: 'seconds',
    measurement_frequency: 'weekly',
    data_source: 'Google PageSpeed Insights',
    tools: ['PageSpeed Insights', 'GTmetrix', 'WebPageTest'],
    improvement_trend: 'down', // Lower is better
    benchmark: 'Under 2.5s is "Good" (CWV)',
  },

  core_web_vitals_score: {
    id: 'cwv_score',
    name: 'Core Web Vitals Score',
    category: KPICategory.TECHNICAL,
    description: 'Overall Core Web Vitals performance (LCP, FID, CLS)',
    target: 90,
    unit: 'score',
    measurement_frequency: 'weekly',
    data_source: 'Google PageSpeed Insights',
    tools: ['PageSpeed Insights'],
    improvement_trend: 'up',
    benchmark: '90+ is target',
  },

  mobile_usability_issues: {
    id: 'mobile_usability',
    name: 'Mobile Usability Issues',
    category: KPICategory.TECHNICAL,
    description: 'Number of mobile usability issues in GSC',
    target: 0,
    unit: 'issues',
    measurement_frequency: 'weekly',
    data_source: 'Google Search Console',
    tools: ['Google Search Console'],
    improvement_trend: 'down', // Lower is better
    benchmark: '0 issues = fully mobile optimized',
  },

  crawl_errors: {
    id: 'crawl_errors',
    name: 'Crawl Errors',
    category: KPICategory.TECHNICAL,
    description: 'Number of crawl errors reported in GSC',
    target: 0,
    unit: 'errors',
    measurement_frequency: 'weekly',
    data_source: 'Google Search Console',
    tools: ['Google Search Console'],
    improvement_trend: 'down',
    benchmark: '0 errors = healthy crawlability',
  },

  schema_markup_validity: {
    id: 'schema_validity',
    name: 'Schema Markup Validity',
    category: KPICategory.TECHNICAL,
    description: 'Percentage of valid schema markup (no errors/warnings)',
    target: 100,
    unit: '%',
    measurement_frequency: 'monthly',
    data_source: 'Schema.org validator',
    tools: ['Google Rich Results Test', 'Schema.org validator'],
    improvement_trend: 'up',
    benchmark: '100% valid = optimized for rich snippets',
  },
};

/**
 * Get KPI by ID
 */
export function getKPI(id: string): KPI | undefined {
  return seoMetrics[id];
}

/**
 * Get all KPIs by category
 */
export function getKPIsByCategory(category: KPICategory): KPI[] {
  return Object.values(seoMetrics).filter((kpi) => kpi.category === category);
}

/**
 * Calculate KPI performance (baseline comparison)
 */
export function calculateKPIPerformance(
  kpiId: string,
  currentValue: number
): {
  kpi: KPI;
  currentValue: number;
  improvement: number;
  improvementPercent: number;
  status: 'excellent' | 'good' | 'needs_attention' | 'critical';
} | null {
  const kpi = getKPI(kpiId);
  if (!kpi || !kpi.baseline) return null;

  const improvement = currentValue - kpi.baseline;
  const improvementPercent = (improvement / kpi.baseline) * 100;

  let status: 'excellent' | 'good' | 'needs_attention' | 'critical';
  if (kpi.improvement_trend === 'up') {
    if (improvementPercent >= 50) status = 'excellent';
    else if (improvementPercent >= 25) status = 'good';
    else if (improvementPercent >= 0) status = 'needs_attention';
    else status = 'critical';
  } else {
    // For metrics where lower is better
    if (improvement <= -50) status = 'excellent';
    else if (improvement <= -25) status = 'good';
    else if (improvement <= 0) status = 'needs_attention';
    else status = 'critical';
  }

  return { kpi, currentValue, improvement, improvementPercent, status };
}

/**
 * Monthly reporting categories
 */
export const REPORTING_SECTIONS = {
  OVERVIEW: {
    name: 'Executive Overview',
    kpis: [
      'organic_traffic',
      'organic_users',
      'organic_conversion_rate',
      'domain_authority',
    ],
  },
  RANKINGS: {
    name: 'Rankings & Visibility',
    kpis: [
      'search_visibility',
      'keyword_rankings_top10',
      'keyword_rankings_top3',
      'local_pack_visibility',
    ],
  },
  AUTHORITY: {
    name: 'Authority & Backlinks',
    kpis: [
      'backlinks_total',
      'referring_domains',
      'domain_authority',
      'citation_count',
    ],
  },
  ENGAGEMENT: {
    name: 'User Engagement',
    kpis: [
      'average_session_duration',
      'pages_per_session',
      'bounce_rate',
      'scroll_depth',
    ],
  },
  CONVERSIONS: {
    name: 'Conversions & Goals',
    kpis: [
      'appointment_bookings',
      'contact_form_submissions',
      'phone_calls',
      'organic_conversion_rate',
    ],
  },
  LOCAL: {
    name: 'Local Business Performance',
    kpis: [
      'local_pack_visibility',
      'google_business_profile_views',
      'google_reviews_count',
      'average_rating',
      'citation_count',
    ],
  },
  TECHNICAL: {
    name: 'Technical SEO Health',
    kpis: [
      'page_load_speed',
      'core_web_vitals_score',
      'mobile_usability_issues',
      'crawl_errors',
      'schema_markup_validity',
    ],
  },
};

/**
 * Monthly reporting template
 */
export const MONTHLY_REPORTING_CHECKLIST = [
  {
    task: 'Collect all KPI data from tools',
    frequency: 'Monthly',
    tools: ['GA4', 'GSC', 'SEMrush', 'GBP', 'Ahrefs'],
  },
  {
    task: 'Calculate month-over-month growth',
    frequency: 'Monthly',
    tools: ['Excel/Sheets'],
  },
  {
    task: 'Identify top traffic sources',
    frequency: 'Monthly',
    tools: ['GA4'],
  },
  {
    task: 'Review ranking changes (top 10 keywords)',
    frequency: 'Monthly',
    tools: ['SEMrush Rank Tracker'],
  },
  {
    task: 'Analyze user engagement by page/section',
    frequency: 'Monthly',
    tools: ['GA4'],
  },
  {
    task: 'Track conversion goals completion',
    frequency: 'Monthly',
    tools: ['GA4'],
  },
  {
    task: 'Monitor backlink acquisition',
    frequency: 'Monthly',
    tools: ['Ahrefs'],
  },
  {
    task: 'Audit NAP consistency',
    frequency: 'Quarterly',
    tools: ['Moz Local'],
  },
  {
    task: 'Create monthly report with insights',
    frequency: 'Monthly',
    tools: ['Google Data Studio / Excel'],
  },
  {
    task: 'Share findings with stakeholders',
    frequency: 'Monthly',
    tools: ['Email / Presentation'],
  },
];

export const DEFAULT_MONTHLY_TARGETS = {
  organic_growth_rate: 0.15, // 15% month-over-month
  conversion_rate_improvement: 0.1, // 10% improvement
  new_backlinks_per_month: 5,
  new_reviews_per_month: 10,
  keyword_ranking_improvement: 3, // 3 positions up average
};
