/**
 * PARTNER-LINKING-REGISTER.TS
 * Track strategic partnership links and co-marketing opportunities
 * Maintain list of partners linking to your site for authority building
 */

export interface PartnerLink {
  id: string;
  partnerName: string;
  partnerType: 'medical_aid' | 'professional_association' | 'local_business' | 'dental_network' | 'media' | 'affiliate' | 'other';
  partnerWebsite: string;
  linkUrl: string;
  linkType: 'homepage' | 'directory' | 'resource' | 'guest_post' | 'partnership' | 'sponsorship' | 'affiliate';
  anchorText?: string;
  dateAdded: string;
  dateVerified?: string;
  isActive: boolean;
  authority?: 'high' | 'medium' | 'low'; // Domain authority estimate
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
  renewalDate?: string; // For links that need renewal
}

/**
 * Strategic partners currently linking to Refresh Dental
 * All medical aid links are critical for local authority
 */
export const partnerLinks: PartnerLink[] = [
  /**
   * ═══════════════════════════════════════════
   * MEDICAL AID PARTNERSHIPS (Critical)
   * These are essential for credibility + authority
   * ═══════════════════════════════════════════
   */

  {
    id: 'discovery-dentist-network',
    partnerName: 'Discovery Health — Dentist Network',
    partnerType: 'medical_aid',
    partnerWebsite: 'https://www.discovery.co.za',
    linkUrl: 'https://www.discovery.co.za/portal/providers/dentist-network',
    linkType: 'directory',
    anchorText: 'Dr. Lebogang Malunga - Refresh Dental',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'high',
    notes: 'Listed in Discovery Health dentist provider network',
    renewalDate: '2025-01-01',
  },

  {
    id: 'bonitas-dentist-providers',
    partnerName: 'Bonitas — Dental Providers',
    partnerType: 'medical_aid',
    partnerWebsite: 'https://www.bonitas.co.za',
    linkUrl: 'https://www.bonitas.co.za/dentist-providers',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'high',
    notes: 'Listed in Bonitas dental network',
  },

  {
    id: 'momentum-dental-network',
    partnerName: 'Momentum Health — Dentist Network',
    partnerType: 'medical_aid',
    partnerWebsite: 'https://www.momentumhealth.co.za',
    linkUrl: 'https://www.momentumhealth.co.za/providers/dentists',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'high',
    notes: 'Listed as Momentum Health dental provider',
  },

  {
    id: 'medihelp-dentist-network',
    partnerName: 'Medihelp — Dental Service Providers',
    partnerType: 'medical_aid',
    partnerWebsite: 'https://www.medihelp.co.za',
    linkUrl: 'https://www.medihelp.co.za/member-benefits/dentist-providers',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'high',
    notes: 'Medihelp medical aid approved dentist',
  },

  {
    id: 'gems-health-network',
    partnerName: 'GEMS — Health Network Dentists',
    partnerType: 'medical_aid',
    partnerWebsite: 'https://www.gems.gov.za',
    linkUrl: 'https://www.gems.gov.za/healthcare-providers/dentists',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'medium',
    notes: 'Listed as GEMS approved dentist',
  },

  /**
   * ═══════════════════════════════════════════
   * PROFESSIONAL ASSOCIATIONS (Authority Building)
   * ═══════════════════════════════════════════
   */

  {
    id: 'hpcsa-directory',
    partnerName: 'HPCSA — Health Professions Council Directory',
    partnerType: 'professional_association',
    partnerWebsite: 'https://www.hpcsa.co.za',
    linkUrl: 'https://www.hpcsa.co.za/practitioner-listing',
    linkType: 'directory',
    anchorText: 'Dr. Lebogang Malunga (Registration #)',
    dateAdded: '2023-06-01',
    isActive: true,
    authority: 'high',
    notes: 'Official HPCSA registration & directory listing — CRITICAL for credibility',
    contactEmail: 'info@hpcsa.co.za',
  },

  {
    id: 'sada-member-directory',
    partnerName: 'SADA — South African Dental Association',
    partnerType: 'professional_association',
    partnerWebsite: 'https://www.sada.co.za',
    linkUrl: 'https://www.sada.co.za/member-directory',
    linkType: 'directory',
    dateAdded: '2024-01-15',
    isActive: true,
    authority: 'high',
    notes: 'SADA membership & member directory listing',
    contactEmail: 'membership@sada.co.za',
  },

  {
    id: 'fdidental-practitioners',
    partnerName: 'International Dental Federation — Practitioner Registry',
    partnerType: 'professional_association',
    partnerWebsite: 'https://www.fdiworlddental.org',
    linkUrl: 'https://www.fdiworlddental.org/dentist-finder',
    linkType: 'directory',
    dateAdded: '2024-02-01',
    isActive: false,
    authority: 'high',
    notes: 'International dental registry (optional, for global SEO)',
  },

  /**
   * ═══════════════════════════════════════════
   * LOCAL BUSINESS PARTNERSHIPS (GEO Authority)
   * ═══════════════════════════════════════════
   */

  {
    id: 'centurion-chamber-commerce',
    partnerName: 'Centurion Chamber of Commerce',
    partnerType: 'local_business',
    partnerWebsite: 'https://centurion.chamberofcommerce.co.za',
    linkUrl: 'https://centurion.chamberofcommerce.co.za/member/refresh-dental',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: false, // To be activated
    authority: 'medium',
    notes: 'Local business chamber membership & listing',
    contactPerson: '[Chamber President Name]',
    contactEmail: 'info@centurion-chamber.co.za',
  },

  {
    id: 'pretoria-business-forum',
    partnerName: 'Pretoria East Business Forum',
    partnerType: 'local_business',
    partnerWebsite: 'https://pretoreaeastbusinessforum.co.za',
    linkUrl: 'https://pretoriaeastbusinessforum.co.za/member-directory',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: false, // To be activated
    authority: 'medium',
    notes: 'Regional business forum membership',
  },

  {
    id: 'midrand-business-association',
    partnerName: 'Midrand Business Association',
    partnerType: 'local_business',
    partnerWebsite: 'https://www.midrandba.co.za',
    linkUrl: 'https://www.midrandba.co.za/members',
    linkType: 'directory',
    dateAdded: '2024-03-01',
    isActive: false, // For future Midrand location
    authority: 'medium',
    notes: 'Regional business association (future expansion)',
  },

  /**
   * ═══════════════════════════════════════════
   * HEALTHCARE NETWORKS & LISTINGS
   * ═══════════════════════════════════════════
   */

  {
    id: 'justdial-sa-dentist',
    partnerName: 'Justdial South Africa',
    partnerType: 'dental_network',
    partnerWebsite: 'https://www.justdial.co.za',
    linkUrl: 'https://www.justdial.co.za/profile/refresh-dental',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: true,
    authority: 'medium',
    notes: 'Major South African business directory listing',
  },

  {
    id: 'medical-briefs-directory',
    partnerName: 'MedicalBriefs Directory',
    partnerType: 'healthcare',
    partnerWebsite: 'https://www.medicalbriefsza.co.za',
    linkUrl: 'https://www.medicalbriefsza.co.za/dentist-practitioners',
    linkType: 'directory',
    dateAdded: '2024-02-01',
    isActive: false, // To be activated
    authority: 'medium',
    notes: 'Healthcare professional directory',
  },

  /**
   * ═══════════════════════════════════════════
   * GUEST POST & MEDIA PARTNERSHIPS
   * High-quality editorial links for authority
   * ═══════════════════════════════════════════
   */

  {
    id: 'guest-post-health24',
    partnerName: 'Health24 — Guest Article',
    partnerType: 'media',
    partnerWebsite: 'https://www.health24.com',
    linkUrl: 'https://www.health24.com/medical-contributor/dr-lebogang-malunga',
    linkType: 'guest_post',
    dateAdded: '2024-02-15',
    isActive: false, // To be arranged
    authority: 'high',
    notes: 'Target guest post on dental health topics',
    contactEmail: 'editors@health24.com',
  },

  {
    id: 'guest-post-medicalBriefs',
    partnerName: 'MedicalBriefs — Dental Column',
    partnerType: 'media',
    partnerWebsite: 'https://www.medicalbriefsza.co.za',
    linkUrl: 'https://www.medicalbriefsza.co.za/authors/dr-lebogang-malunga',
    linkType: 'guest_post',
    dateAdded: '2024-03-01',
    isActive: false, // To be arranged
    authority: 'high',
    notes: 'Regular dental health column opportunity',
    contactPerson: '[Editor Name]',
    contactEmail: 'editor@medicalbriefsza.co.za',
  },

  /**
   * ═══════════════════════════════════════════
   * AFFILIATE & SPONSORSHIP PARTNERSHIPS
   * ═══════════════════════════════════════════
   */

  {
    id: 'wits-alumni-network',
    partnerName: 'University of Witwatersrand — Alumni Network',
    partnerType: 'professional_association',
    partnerWebsite: 'https://www.wits.ac.za',
    linkUrl: 'https://www.wits.ac.za/alumni/dentistry',
    linkType: 'directory',
    dateAdded: '2024-01-01',
    isActive: false, // To be verified
    authority: 'high',
    notes: 'Wits alumni dentist listing (Dr. Malunga\'s alma mater)',
    contactEmail: 'alumni@wits.ac.za',
  },

  {
    id: 'dental-implant-manufacturer',
    partnerName: 'Dental Implant Manufacturer Directory',
    partnerType: 'affiliate',
    partnerWebsite: 'https://www.implantmanufacturer.com',
    linkUrl: 'https://www.implantmanufacturer.com/providers/south-africa',
    linkType: 'directory',
    dateAdded: '2024-03-01',
    isActive: false, // To be confirmed
    authority: 'medium',
    notes: 'Implant manufacturer preferred providers list',
  },
];

/**
 * Get all active partner links
 */
export function getActivePartnerLinks(): PartnerLink[] {
  return partnerLinks.filter((link) => link.isActive);
}

/**
 * Get partner links by type
 */
export function getPartnerLinksByType(
  type: PartnerLink['partnerType']
): PartnerLink[] {
  return partnerLinks.filter((link) => link.partnerType === type);
}

/**
 * Get partner links that need verification
 */
export function getPartnerLinksNeedingVerification(): PartnerLink[] {
  return partnerLinks.filter((link) => link.isActive && !link.dateVerified);
}

/**
 * Get partner links needing renewal
 */
export function getPartnerLinksNeedingRenewal(): PartnerLink[] {
  const today = new Date();
  return partnerLinks.filter((link) => {
    if (!link.renewalDate) return false;
    const renewalDate = new Date(link.renewalDate);
    return renewalDate < today;
  });
}

/**
 * Calculate total authority from partner links
 */
export function calculatePartnerAuthorityScore(): number {
  const activeLinks = getActivePartnerLinks();
  const scoreMap = { high: 3, medium: 2, low: 1 };

  const totalScore = activeLinks.reduce((sum, link) => {
    const linkScore = scoreMap[link.authority || 'medium'];
    return sum + linkScore;
  }, 0);

  return totalScore;
}

/**
 * Partner Link Acquisition Strategy
 */
export const PARTNER_LINK_STRATEGY = {
  phase1_immediate: [
    {
      target: 'HPCSA Directory',
      action: 'Verify Dr. Malunga is listed & complete profile',
      timeline: 'Week 1',
      priority: 'CRITICAL',
    },
    {
      target: 'Medical Aid Directories (5 major)',
      action: 'Ensure listed in all major provider networks',
      timeline: 'Week 2',
      priority: 'CRITICAL',
    },
    {
      target: 'Justdial South Africa',
      action: 'Claim & optimize business profile',
      timeline: 'Week 2',
      priority: 'HIGH',
    },
  ],

  phase2_outreach: [
    {
      target: 'SADA Membership',
      action: 'Join SADA & add to member directory',
      timeline: 'Week 3-4',
      priority: 'HIGH',
    },
    {
      target: 'Centurion Chamber of Commerce',
      action: 'Join local chamber for geo-authority',
      timeline: 'Week 3-4',
      priority: 'MEDIUM',
    },
    {
      target: 'Health24 / MedicalBriefs',
      action: 'Pitch guest post series on dental topics',
      timeline: 'Month 2',
      priority: 'HIGH',
    },
  ],

  phase3_expansion: [
    {
      target: 'Medical Publications',
      action: 'Contribute to industry publications',
      timeline: 'Month 3-6',
      priority: 'MEDIUM',
    },
    {
      target: 'Wits Alumni Directory',
      action: 'Register as dental practitioner alumnus',
      timeline: 'Month 3',
      priority: 'MEDIUM',
    },
    {
      target: 'Additional Local Networks',
      action: 'Join regional business forums for expansion locations',
      timeline: 'Month 4-6',
      priority: 'MEDIUM',
    },
  ],
};

/**
 * Partner Link Verification Checklist
 */
export const VERIFICATION_CHECKLIST = {
  before_activation: [
    '✓ Verify link is live on partner website',
    '✓ Check link points to correct page',
    '✓ Verify NAP consistency (Name, Address, Phone)',
    '✓ Record date link added/verified',
    '✓ Assess domain authority of partner',
    '✓ Note anchor text used',
  ],

  ongoing_maintenance: [
    '✓ Monthly verification that links remain active',
    '✓ Check for any policy violations',
    '✓ Update profile information if it changes',
    '✓ Monitor for duplicate/conflicting listings',
    '✓ Respond to any partnership inquiries',
    '✓ Renew partnerships as needed',
  ],
};

/**
 * Authority Score Thresholds
 */
export const AUTHORITY_BENCHMARKS = {
  critical: [
    'HPCSA Directory',
    'Medical Aid Networks (5x)',
    'SADA',
    'Local Chambers',
  ],
  high_value: [
    'Guest posts on health publications',
    'Alumni directories (Wits)',
    'Industry directories',
  ],
  supporting: [
    'General business directories',
    'Local business listings',
    'Regional networks',
  ],
};

/**
 * Expected impact of partner links
 */
export const EXPECTED_IMPACT = {
  '6_months': {
    authority_increase: '+10-15 DA points',
    ranking_improvement: '+5-10 positions for local keywords',
    traffic_increase: '+30% organic traffic',
    description: 'Establish credibility, improve local pack rankings',
  },

  '12_months': {
    authority_increase: '+20-30 DA points',
    ranking_improvement: '+15-25 positions for main keywords',
    traffic_increase: '+75-100% organic traffic',
    description: 'Dominant local authority, strong ranking positions',
  },
};

/**
 * Export partner links data for analysis
 */
export function exportPartnerLinksData() {
  return {
    total_links: partnerLinks.length,
    active_links: getActivePartnerLinks().length,
    inactive_links: partnerLinks.filter((l) => !l.isActive).length,
    by_type: {
      medical_aid: getPartnerLinksByType('medical_aid').length,
      professional_association: getPartnerLinksByType('professional_association')
        .length,
      local_business: getPartnerLinksByType('local_business').length,
      dental_network: getPartnerLinksByType('dental_network').length,
      media: getPartnerLinksByType('media').length,
    },
    authority_distribution: {
      high: partnerLinks.filter((l) => l.authority === 'high').length,
      medium: partnerLinks.filter((l) => l.authority === 'medium').length,
      low: partnerLinks.filter((l) => l.authority === 'low').length,
    },
    total_authority_score: calculatePartnerAuthorityScore(),
  };
}
