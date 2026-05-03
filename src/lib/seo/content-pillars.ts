/**
 * CONTENT-PILLARS.TS
 * Content strategy & topic clusters for SEO
 * Defines pillar pages and supporting content for link-building strategy
 */

export interface ContentPillar {
  id: string;
  pillarTitle: string;
  pillarPage: string;
  description: string;
  targetKeywords: string[];
  content: ContentCluster[];
  backlinkedOpportunities: string[];
  estimatedSearchVolume: number;
  priorityLevel: 'High' | 'Medium' | 'Low';
  contentGap?: string;
}

export interface ContentCluster {
  title: string;
  url?: string;
  description: string;
  keywords: string[];
  contentLength: number; // words
  targetAudience: string;
  internalLinks: string[];
}

/**
 * Main content pillars for Refresh Dental
 * Organized by topic cluster for comprehensive coverage & internal linking
 */
export const contentPillars: ContentPillar[] = [
  /**
   * PILLAR 1: Dental Implants
   * High-value, high-intent keyword cluster
   * Excellent for backlinks & local authority
   */
  {
    id: 'implants',
    pillarTitle: 'The Complete Guide to Dental Implants in South Africa',
    pillarPage: '/guides/dental-implants',
    description: 'Comprehensive resource covering dental implants, costs, procedures, and alternatives in South Africa',
    targetKeywords: [
      'dental implants South Africa',
      'dental implants Centurion',
      'dental implant cost South Africa',
      'all-on-4 implants',
      'implant dentist Pretoria',
      'tooth implant procedure',
      'dental implant surgery',
      'implant vs bridge',
    ],
    priorityLevel: 'High',
    estimatedSearchVolume: 2400,
    content: [
      {
        title: 'What Are Dental Implants & How Do They Work',
        description: 'Deep dive into implant components, bone integration, and long-term success rates',
        keywords: ['dental implants', 'implant components', 'osseointegration', 'titanium implants'],
        contentLength: 2500,
        targetAudience: 'Patients considering implants',
        internalLinks: ['/services#implants', '/about#dr-malunga'],
      },
      {
        title: 'Dental Implant Cost in South Africa: Complete Breakdown',
        description: 'Transparent pricing guide for single, multiple, and all-on-4 implants with medical aid info',
        keywords: ['dental implant cost', 'implant price South Africa', 'all-on-4 cost', 'implant financing'],
        contentLength: 2000,
        targetAudience: 'Cost-conscious patients',
        internalLinks: ['/financing', '/services#implants'],
      },
      {
        title: 'Dental Implant vs Bridge vs Denture: Which Is Best for You',
        description: 'Comparison of tooth replacement options with pros/cons',
        keywords: ['implant vs bridge', 'implant vs denture', 'tooth replacement options'],
        contentLength: 2000,
        targetAudience: 'Decision-stage patients',
        internalLinks: ['/services#implants', '/services#crowns'],
      },
      {
        title: 'The Dental Implant Procedure Step-by-Step',
        description: 'Timeline and process explanation to reduce patient anxiety',
        keywords: ['implant procedure', 'implant surgery', 'implant timeline', 'implant recovery'],
        contentLength: 1500,
        targetAudience: 'Patients preparing for procedure',
        internalLinks: ['/services#implants'],
      },
      {
        title: 'Dental Implants Near Me: Finding the Right Centurion Implantologist',
        description: 'Local search optimized content for Centurion area',
        keywords: ['dental implants near me', 'implants Centurion', 'implant dentist Centurion'],
        contentLength: 1200,
        targetAudience: 'Local Centurion patients',
        internalLinks: ['/about', '/contact'],
      },
    ],
    backlinkedOpportunities: [
      'Medical publications (implant safety)',
      'Patient education blogs',
      'Dental hygiene sites',
      'Medical aid educational content',
      'Centurion health directories',
    ],
  },

  /**
   * PILLAR 2: Cosmetic Dentistry
   * High-intent commercial keywords
   * Attractive for lifestyle & beauty publications
   */
  {
    id: 'cosmetic',
    pillarTitle: 'Complete Guide to Cosmetic Dentistry & Smile Makeovers',
    pillarPage: '/guides/cosmetic-dentistry',
    description: 'Comprehensive cosmetic dentistry guide covering whitening, veneers, and complete smile transformations',
    targetKeywords: [
      'cosmetic dentistry Centurion',
      'teeth whitening',
      'porcelain veneers',
      'smile makeover',
      'professional teeth whitening',
      'dental veneers cost',
      'smile design',
      'cosmetic dental procedures',
    ],
    priorityLevel: 'High',
    estimatedSearchVolume: 1800,
    content: [
      {
        title: 'Professional Teeth Whitening: Complete Guide',
        description: 'In-depth guide to professional vs at-home whitening with results timeline',
        keywords: ['teeth whitening', 'professional teeth whitening', 'whitening cost', 'whitening procedure'],
        contentLength: 2000,
        targetAudience: 'Appearance-conscious patients',
        internalLinks: ['/services#whitening', '/contact'],
      },
      {
        title: 'Porcelain Dental Veneers: Achieving Your Dream Smile',
        description: 'Complete resource on veneer design, placement, and maintenance',
        keywords: ['porcelain veneers', 'dental veneers', 'veneers cost', 'veneer procedure'],
        contentLength: 2000,
        targetAudience: 'Cosmetic procedure candidates',
        internalLinks: ['/services#veneers'],
      },
      {
        title: 'Digital Smile Design: See Your New Smile Before Treatment',
        description: 'Technology explanation and benefits for smile planning',
        keywords: ['smile design', 'digital smile design', 'smile planning'],
        contentLength: 1500,
        targetAudience: 'Tech-interested patients',
        internalLinks: ['/technology', '/services#veneers'],
      },
      {
        title: 'Complete Smile Makeover: Combining Multiple Cosmetic Procedures',
        description: 'Guide to combination treatments for maximum transformation',
        keywords: ['smile makeover', 'complete smile transformation', 'cosmetic dentistry treatment plan'],
        contentLength: 2000,
        targetAudience: 'Major procedure candidates',
        internalLinks: ['/services#cosmetic', '/services#whitening', '/services#veneers'],
      },
    ],
    backlinkedOpportunities: [
      'Beauty & lifestyle blogs',
      'Magazine articles',
      'Social media influencer collaborations',
      'Celebrity dentistry publications',
      'Cosmetic procedure guides',
    ],
  },

  /**
   * PILLAR 3: Orthodontics & Teeth Straightening
   * Growing search demand, esp. clear aligners
   */
  {
    id: 'orthodontics',
    pillarTitle: 'Clear Aligners & Invisible Braces: Complete Teeth Straightening Guide',
    pillarPage: '/guides/clear-aligners',
    description: 'Comprehensive guide to modern teeth straightening with clear aligners vs traditional braces',
    targetKeywords: [
      'clear aligners',
      'Invisalign alternative',
      'invisible braces Centurion',
      'teeth straightening',
      'clear aligner cost',
      'aligner treatment time',
      'orthodontics Centurion',
    ],
    priorityLevel: 'Medium',
    estimatedSearchVolume: 1200,
    content: [
      {
        title: 'Clear Aligners vs Traditional Braces: Complete Comparison',
        description: 'In-depth comparison of modern aligners vs metal braces',
        keywords: ['clear aligners vs braces', 'Invisalign alternative', 'invisible braces'],
        contentLength: 2000,
        targetAudience: 'Orthodontic candidates',
        internalLinks: ['/services#aligners'],
      },
      {
        title: 'How Long Do Clear Aligners Take? Timeline & Results',
        description: 'Realistic expectations for treatment duration and progress',
        keywords: ['aligner treatment time', 'clear aligner duration', 'teeth straightening timeline'],
        contentLength: 1500,
        targetAudience: 'Timeline-conscious patients',
        internalLinks: ['/services#aligners'],
      },
      {
        title: 'Clear Aligner Cost & Financing Options South Africa',
        description: 'Pricing guide and payment plan availability',
        keywords: ['clear aligner cost', 'aligner price', 'aligner financing'],
        contentLength: 1200,
        targetAudience: 'Budget-conscious patients',
        internalLinks: ['/financing', '/contact'],
      },
    ],
    backlinkedOpportunities: [
      'Dental health blogs',
      'Orthodontic resource sites',
      'Teen health/parenting blogs',
      'Medical aid educational content',
    ],
  },

  /**
   * PILLAR 4: Restorative & General Dentistry
   * Volume-heavy keywords, broad appeal
   */
  {
    id: 'restorative',
    pillarTitle: 'General & Restorative Dentistry: Complete Patient Guide',
    pillarPage: '/guides/general-dentistry',
    description: 'Comprehensive guide to fillings, crowns, root canals, and general dental care',
    targetKeywords: [
      'root canal treatment',
      'dental crown',
      'dental filling',
      'emergency dentist',
      'tooth extraction',
      'dental bridge',
      'tooth decay treatment',
    ],
    priorityLevel: 'Medium',
    estimatedSearchVolume: 2000,
    content: [
      {
        title: 'Root Canal Treatment: The Complete Guide',
        description: 'Demystify root canals — what they are, why needed, and procedure details',
        keywords: ['root canal', 'root canal treatment', 'root canal procedure', 'dental pain relief'],
        contentLength: 2500,
        targetAudience: 'Patients in pain or facing procedures',
        internalLinks: ['/services#root-canal', '/emergency'],
      },
      {
        title: 'Dental Crowns & Bridges: Restoring Your Smile',
        description: 'Guide to crown and bridge procedures, materials, and longevity',
        keywords: ['dental crown', 'dental bridge', 'crown procedure', 'bridge procedure'],
        contentLength: 2000,
        targetAudience: 'Restoration candidates',
        internalLinks: ['/services#crowns'],
      },
      {
        title: 'Finding an Emergency Dentist: What to Know',
        description: 'Emergency dental care guide and when to seek immediate help',
        keywords: ['emergency dentist', 'emergency dental care', 'dental emergency', 'emergency tooth pain'],
        contentLength: 1500,
        targetAudience: 'Patients in distress',
        internalLinks: ['/emergency', '/contact'],
      },
    ],
    backlinkedOpportunities: [
      'Health & wellness sites',
      'Pain management blogs',
      'Medical directories',
      'Emergency health resources',
    ],
  },

  /**
   * PILLAR 5: Local & Practical Dentistry
   * High geo-intent, local pack optimization
   */
  {
    id: 'local',
    pillarTitle: 'Finding the Best Dentist in Centurion: Your Complete Guide',
    pillarPage: '/guides/centurion-dentist',
    description: 'Local guide to choosing a dentist in Centurion with selection criteria and FAQs',
    targetKeywords: [
      'best dentist Centurion',
      'dentist Centurion',
      'dental clinic Centurion',
      'dentist near me',
      'female dentist Centurion',
      'HPCSA registered dentist',
    ],
    priorityLevel: 'High',
    estimatedSearchVolume: 800,
    content: [
      {
        title: 'How to Choose the Right Dentist in Centurion',
        description: 'Guide with selection criteria, questions to ask, and red flags',
        keywords: ['choose dentist', 'dentist selection', 'finding dentist Centurion'],
        contentLength: 1500,
        targetAudience: 'New patients / relocating to area',
        internalLinks: ['/about', '/team', '/technology'],
      },
      {
        title: 'Dental Care with Medical Aid in South Africa: Complete Guide',
        description: 'Navigate medical aid coverage for dental procedures',
        keywords: ['dental medical aid', 'Discovery dentist', 'Bonitas dental', 'medical aid dental cover'],
        contentLength: 2000,
        targetAudience: 'Medical aid holders',
        internalLinks: ['/contact', '/financing'],
      },
      {
        title: 'Female Dentist in Centurion: Why Patient Gender Matters',
        description: 'Discussion of female dental practitioners and patient preferences',
        keywords: ['female dentist', 'female dentist Centurion', 'woman dentist'],
        contentLength: 1200,
        targetAudience: 'Patients preferring female practitioners',
        internalLinks: ['/about#dr-malunga', '/team'],
      },
    ],
    backlinkedOpportunities: [
      'Centurion local business directories',
      'Pretoria lifestyle & relocation guides',
      'South African healthcare consumer sites',
      'Medical aid educational resources',
      'Local media & community sites',
    ],
  },

  /**
   * PILLAR 6: Advanced & Specialty Topics
   * Authority & thought leadership
   */
  {
    id: 'advanced',
    pillarTitle: 'Advanced Dental Procedures & Technology at Refresh Dental',
    pillarPage: '/guides/advanced-dentistry',
    description: 'Deep-dive into latest dental technologies, advanced procedures, and innovations',
    targetKeywords: [
      'CEREC crowns',
      'dental implant technology',
      'digital dentistry',
      'laser dentistry',
      'dental technology',
      'modern dental care',
    ],
    priorityLevel: 'Low',
    estimatedSearchVolume: 400,
    content: [
      {
        title: 'CEREC Same-Day Crowns: Modern Dentistry at Its Best',
        description: 'Explanation of CAD/CAM technology and same-day crown benefits',
        keywords: ['CEREC crowns', 'same-day crowns', 'digital crowns'],
        contentLength: 1500,
        targetAudience: 'Tech-interested patients valuing convenience',
        internalLinks: ['/technology', '/services#crowns'],
      },
    ],
    backlinkedOpportunities: [
      'Dental technology publications',
      'Professional dentistry blogs',
      'Innovation & technology websites',
      'Medical technology journals',
    ],
  },
];

/**
 * Internal linking map — which content pages should link to each other
 */
export const internalLinkingMap: Record<string, string[]> = {
  '/': [
    '/guides/dental-implants',
    '/guides/cosmetic-dentistry',
    '/guides/clear-aligners',
    '/services',
    '/about',
  ],
  '/guides/dental-implants': [
    '/services#implants',
    '/contact',
    '/financing',
    '/guides/implant-vs-bridge',
    '/about#dr-malunga',
  ],
  '/guides/cosmetic-dentistry': [
    '/services#whitening',
    '/services#veneers',
    '/technology',
    '/contact',
  ],
  '/guides/clear-aligners': [
    '/services#aligners',
    '/contact',
    '/financing',
  ],
  '/guides/general-dentistry': [
    '/services#root-canal',
    '/services#crowns',
    '/emergency',
    '/contact',
  ],
  '/guides/centurion-dentist': [
    '/about',
    '/team',
    '/technology',
    '/contact',
    '/testimonials',
  ],
};

/**
 * Get content pillar by ID
 */
export function getContentPillar(id: string): ContentPillar | undefined {
  return contentPillars.find((pillar) => pillar.id === id);
}

/**
 * Get all high-priority pillars
 */
export function getHighPriorityPillars(): ContentPillar[] {
  return contentPillars.filter((p) => p.priorityLevel === 'High');
}

/**
 * Get content clusters for a pillar
 */
export function getContentClusters(pillarId: string): ContentCluster[] {
  const pillar = getContentPillar(pillarId);
  return pillar?.content || [];
}

/**
 * Calculate total estimated word count for a pillar
 */
export function calculatePillarWordCount(pillarId: string): number {
  const clusters = getContentClusters(pillarId);
  return clusters.reduce((total, cluster) => total + cluster.contentLength, 0);
}

/**
 * Get all internal linking targets
 */
export function getInternalLinkTargets(url: string): string[] {
  return internalLinkingMap[url] || [];
}

/**
 * Content calendar template (monthly posting schedule)
 */
export const contentCalendar = {
  month: 'January',
  schedule: [
    {
      week: 1,
      pillarId: 'implants',
      topic: 'Dental Implant Cost in South Africa',
      priority: 'High',
      estimatedLength: 2000,
    },
    {
      week: 2,
      pillarId: 'cosmetic',
      topic: 'Professional Teeth Whitening Guide',
      priority: 'High',
      estimatedLength: 2000,
    },
    {
      week: 3,
      pillarId: 'local',
      topic: 'Medical Aid Dental Coverage Explained',
      priority: 'High',
      estimatedLength: 2000,
    },
    {
      week: 4,
      pillarId: 'restorative',
      topic: 'Emergency Dental Care When You Need It Most',
      priority: 'Medium',
      estimatedLength: 1500,
    },
  ],
};
