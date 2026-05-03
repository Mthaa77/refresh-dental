# SEO & GEO Optimization Library — Master Index

## 📚 Complete Reference Guide

This is your centralized reference for all SEO infrastructure files. Each file serves a specific purpose in your SEO strategy.

---

## 🗂️ File Organization

### Location Management (`../locations.ts`)

**Purpose:** Manage business locations for multi-location support

**Key Exports:**
- `locations` — All location data (current: Centurion, template for expansion)
- `getPrimaryLocation()` — Get headquarters location
- `getActiveLocations()` — Get all active locations
- `getLocationById(id)` — Get specific location
- `getAllServiceAreas()` — Get all service areas served

**When to Use:**
- Adding new location (Midrand, Johannesburg expansion)
- Building location-specific pages
- Managing multi-location schema

**Size:** 148 lines | **Type:** TypeScript

---

### Google Business Profile Config (`./gbp-config.ts`)

**Purpose:** Centralize GBP configuration and optimization strategy

**Key Exports:**
- `generateGBPProfile(location)` — Create GBP profile from location data
- `getAllGBPProfiles()` — Get profiles for all active locations
- `getGBPMetaTags(profile)` — Get GBP-optimized meta tags
- `GBP_OPTIMIZATION_CHECKLIST` — 50+ point optimization checklist
- `GBP_VERIFICATION_STEPS` — 6-step verification process

**When to Use:**
- Optimizing Google Business Profile
- Verifying business ownership
- Setting up multiple locations
- Managing business information

**Key Checklist:**
1. Complete profile information
2. Upload 15+ high-quality photos
3. Add all business hours/holidays
4. List all services with descriptions
5. Gather 50+ reviews
6. Respond to all customer reviews

**Size:** 252 lines | **Type:** TypeScript

---

### Location Schema Generator (`./location-schema-generator.ts`)

**Purpose:** Generate JSON-LD structured data for locations and pages

**Key Exports:**
- `generateLocationLocalBusinessSchema(location)` — LocalBusiness schema per location
- `generateLocationFAQSchema(locationId)` — FAQ schema for location
- `generateLocationBreadcrumbSchema(locationId)` — Breadcrumb navigation schema
- `generateLocationSitemapEntries()` — Sitemap entries for all locations
- `generateMultiLocationOrganizationSchema()` — Organization schema for multi-location
- `validateLocationSchema(schema)` — Validate schema structure

**When to Use:**
- Creating location-specific pages
- Building multi-location sites
- Enhancing rich snippets
- SEO data validation

**Rich Snippets Enabled:**
- LocalBusiness with ratings
- FAQPage for common questions
- BreadcrumbList for navigation
- Organization hierarchy

**Size:** 320 lines | **Type:** TypeScript

---

## 🔗 Link Building & Authority

### Link Building Strategy (`./link-building-strategy.md`)

**Purpose:** Complete 6-12 month backlink acquisition strategy

**Structure:**
- Phase 1: Foundation (Months 1-2) — Local citations, NAP consistency
- Phase 2: Authority Building (Months 2-6) — Expert partnerships, guest posts
- Phase 3: Link Opportunities (Months 3-12) — Broken links, skyscraper technique
- Phase 4: Authority Signals (Months 1-12, ongoing) — Credentials, thought leadership

**Key Sections:**
- [ ] Local Citation Building (100+ directories)
- [ ] Medical/Professional Partnerships (HPCSA, SADA, medical aids)
- [ ] Guest Posting Opportunities (health publications)
- [ ] Local Event & Sponsorship Ideas
- [ ] Review Generation Campaign
- [ ] Outreach Email Template

**Expected Results:**
- 6 months: 25-35 quality backlinks
- 12 months: 40-50 quality backlinks
- DA improvement: +10-15 points (6 months)

**Implementation Timeline:** 4-6 weeks to full execution

**Size:** 375 lines | **Type:** Markdown (Strategies & Guides)

---

### Content Pillars (`./content-pillars.ts`)

**Purpose:** Content strategy and topic clustering for SEO

**Structure:**
- 6 Content Pillars (Implants, Cosmetic, Orthodontics, Restorative, Local, Advanced)
- 3-5 content clusters per pillar
- 25,000+ words of planned content
- Internal linking strategy
- Content calendar template

**Content Pillars:**
1. **Dental Implants** (High priority) — 6 content pieces, 10,000+ words
2. **Cosmetic Dentistry** (High priority) — 4 content pieces, 7,000+ words
3. **Clear Aligners** (Medium priority) — 3 content pieces, 5,000+ words
4. **Restorative Dentistry** (Medium priority) — 3 content pieces, 5,500+ words
5. **Local/Practical** (High priority) — 3 content pieces, 4,500+ words
6. **Advanced Topics** (Low priority) — 1 content piece, 1,500+ words

**Key Functions:**
- `getContentPillar(id)` — Get pillar details
- `getHighPriorityPillars()` — Filter priority pillars
- `calculatePillarWordCount(id)` — Content scope calculator
- `getInternalLinkTargets(url)` — Internal linking recommendations

**Uses:**
- Content planning & creation
- Internal linking optimization
- Blog strategy
- Authority building

**Size:** 490 lines | **Type:** TypeScript

---

### Local Citations (`./local-citations.md`)

**Purpose:** Complete directory of 100+ citation platforms (South Africa focus)

**Tier System:**
- **Tier 1: Critical (10)** — Must-have: Google Business, Facebook, Apple Maps
- **Tier 2: High Priority (10)** — SA focused: Justdial, 2to4hours, HelloWorld
- **Tier 3: Healthcare (9)** — Medical specific: HPCSA, SADA, MedicalBriefs
- **Tier 4: Review Platforms (7)** — Google Reviews, TrustPilot, Yelp
- **Tier 5: Industry & Authority (5)** — Professional associations
- **Tier 6: Business Intelligence (5)** — B2B directories
- **Tier 7: Social Media (6)** — Instagram, TikTok, YouTube, LinkedIn
- **Tier 8: Local & Regional (3)** — Hyper-local portals
- **Tier 9: Healthcare Platforms (5)** — Doctor finders
- **Tier 10: International (5)** — Global reach

**Implementation:**
- Phase 1: Critical (Week 1-2)
- Phase 2: High Priority (Week 3-4)
- Phase 3: Secondary (Week 5-6)
- Phase 4: Supporting (Week 7-8)

**NAP Consistency:**
- Name: Refresh Dental / Refresh Dental Centurion / Dr. Lebogang Malunga
- Address: 153 River Road, Centurion, Gauteng, 0157, ZA
- Phone: +27 61 416 4649

**Expected Results:**
- 15-20 referral backlinks
- Improved local pack rankings
- High citation coverage

**Size:** 534 lines | **Type:** Markdown (Directory & Implementation)

---

### Partner Linking Register (`./partner-linking-register.ts`)

**Purpose:** Track strategic partnership links and co-marketing opportunities

**Partner Categories:**
- Medical Aid Networks (5): Discovery, Bonitas, Momentum, Medihelp, GEMS
- Professional Associations (3): HPCSA, SADA, International Dental Federation
- Local Business (3): Chambers of Commerce, Business Forums
- Healthcare Networks (2): Justdial, MedicalBriefs
- Guest Posts (2): Health24, MedicalBriefs
- Affiliate & Sponsorships (2): Wits Alumni, Implant Manufacturers

**Key Data Points:**
- Partner name & website
- Link type (directory, guest post, partnership)
- Authority level (high/medium/low)
- Active status
- Renewal dates
- Contact information

**Key Functions:**
- `getActivePartnerLinks()` — Get all live links
- `getPartnerLinksByType(type)` — Filter by category
- `calculatePartnerAuthorityScore()` — Total authority metric
- `getPartnerLinksNeedingRenewal()` — Maintenance alerts

**Strategy:**
- Phase 1: Immediate (Critical directories, medical aids)
- Phase 2: Outreach (Guest posts, associations)
- Phase 3: Expansion (Additional networks, local)

**Size:** 507 lines | **Type:** TypeScript

---

## 📊 Analytics & Monitoring

### Google Analytics 4 Config (`../analytics/ga4-config.ts`)

**Purpose:** Configure GA4 event tracking and measurement

**Setup Required:**
```
Environment Variable:
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Event Categories (30+):**
- Appointment & Booking (4 events)
- Contact & Inquiry (5 events)
- Service Inquiry (2 events)
- Content Engagement (3 events)
- Video Engagement (2 events)
- Reviews (2 events)
- Conversions (2 events) ⭐ PRIORITY
- Medical Aid (2 events)
- Page & Navigation (3 events)
- Social & Sharing (3 events)

**Conversion Goals (7):**
1. Appointment Booking ⭐
2. Contact Form Submission
3. Phone Call Click
4. Emergency Contact
5. Service Inquiry
6. Medical Aid Inquiry
7. Review Submission

**Key Functions:**
- `trackEvent(eventName, params)` — Send custom events
- `setUserProperties(properties)` — Set user attributes
- `trackPageView(path, title)` — Track page views
- `identifyUser(userId, email)` — Identify users

**Configuration Checklist:**
1. Get GA4 Measurement ID
2. Add to environment variables
3. Configure conversion goals in GA4 console
4. Create custom reports in Data Studio
5. Set up email alerts

**Size:** 553 lines | **Type:** TypeScript

---

### Analytics Events (`../seo/analytics-events.ts`)

**Purpose:** Reusable event tracking functions for components

**Event Functions (50+):**

**Booking Events:**
- `trackAppointmentClick(service)` — User clicked book appointment
- `trackAppointmentFormStart(service)` — Form opened
- `trackAppointmentFormSubmit(service, success)` — Form submitted
- `trackAppointmentBooked(service, method)` — **CONVERSION**

**Contact Events:**
- `trackContactFormSubmit(success)` — Contact form submission
- `trackPhoneClick(source)` — Phone number clicked
- `trackEmergencyClick()` — Emergency button clicked
- `trackWhatsAppClick(service)` — WhatsApp contact

**Service Events:**
- `trackServiceInquiry(service, method)` — Service inquiry
- `trackServicePageView(service)` — Viewed service page
- `trackGalleryView(category, count)` — Viewed gallery

**Content Events:**
- `trackGuideStart(id, title)` — User opened guide
- `trackGuideComplete(id, timeSpent)` — User finished guide
- `trackBlogPostView(id, title)` — Blog post view
- `trackContentDownload(type, name)` — Download resource

**Conversion Events:**
- `trackBookingConversion(service)` — **PRIMARY CONVERSION**
- `trackInquiryConversion(source)` — Inquiry submitted
- `trackConsultationBooked(service, type)` — Consultation booked

**Usage Example:**
```typescript
import { analyticsEvents } from '@/components/seo/analytics-events'

// In appointment button component:
<button onClick={() => analyticsEvents.appointmentClick('dental_implants')}>
  Book Now
</button>

// In form submission handler:
analyticsEvents.contactFormSubmit(success)
analyticsEvents.bookingConversion('implants')
```

**Size:** 425 lines | **Type:** TypeScript

---

### SEO Metrics (`./seo-metrics.ts`)

**Purpose:** Define all KPIs and measurement framework

**30+ KPIs Across 8 Categories:**

1. **Search Visibility (5 KPIs)**
   - Organic Traffic (Sessions) → Target: 2000/month (+20% MoM)
   - Organic Users → Target: 1500/month
   - Search Visibility Score → Target: 65 (+20 points at 6mo)
   - Indexed Pages → Target: 50
   - Keywords Ranking Top 10 → Target: 25 (+5/month)

2. **Rankings (3 KPIs)**
   - Keywords Top 3 → Target: 10
   - Local Pack Rankings → Target: 15
   - Local Pack Avg Position → Target: 2.5 position

3. **Authority (5 KPIs)**
   - Total Backlinks → Target: 50 (+5-10/month)
   - Referring Domains → Target: 30
   - Domain Authority → Target: 45 (+5-10 at 6mo)
   - Citations → Target: 100 (100+ directories)
   - NAP Consistency → Target: 95%

4. **Engagement (4 KPIs)**
   - Avg Session Duration → Target: 180 seconds
   - Pages Per Session → Target: 2.5
   - Bounce Rate → Target: 40% (lower is better)
   - Scroll Depth → Target: 70%

5. **Conversions (4 KPIs)**
   - Appointment Bookings → Target: 20/month
   - Contact Form Submissions → Target: 30/month
   - Phone Calls → Target: 40/month
   - Organic Conversion Rate → Target: 3.5%

6. **Local Business (5 KPIs)**
   - GBP Views → Target: 500/month
   - Google Reviews → Target: 50 (+1-2/week)
   - Average Rating → Target: 4.5 stars
   - Actions from GBP → Target: 100/month
   - Citation Consistency → Target: 95%

7. **Technical (5 KPIs)**
   - Page Load Speed (LCP) → Target: 2.5 seconds
   - Core Web Vitals Score → Target: 90
   - Mobile Usability Issues → Target: 0
   - Crawl Errors → Target: 0
   - Schema Validity → Target: 100%

**Key Functions:**
- `getKPI(id)` — Get specific KPI details
- `getKPIsByCategory(category)` — Filter by category
- `calculateKPIPerformance(id, value)` — Performance scoring
- `REPORTING_SECTIONS` — Organize data for reports

**Reporting Framework:**
- Executive Overview (4 KPIs)
- Rankings & Visibility (4 KPIs)
- Authority & Backlinks (4 KPIs)
- User Engagement (4 KPIs)
- Conversions & Goals (4 KPIs)
- Local Business (5 KPIs)
- Technical Health (5 KPIs)

**Size:** 697 lines | **Type:** TypeScript

---

## 📖 Setup & Monitoring Guides

### Google Search Console Setup (`./gsc-setup-guide.md`)

**Purpose:** Step-by-step GSC configuration and usage guide

**Sections:**
1. Initial Setup & Verification (3 methods)
2. Configuration & Setup (4 steps)
3. Important Settings (5 areas)
4. Monitoring Core Metrics (Performance, pages, devices)
5. Submit for Crawling (Request indexing)
6. Monitor for Issues (Coverage, rich results, web vitals)
7. Set Up Monitoring & Alerts
8. Monthly Monitoring Checklist
9. Optimization Opportunities (CTR, rankings, positions)
10. Integration with GA4

**Verification Methods:**
1. HTML File Upload (Recommended)
2. HTML Meta Tag (Alternative)
3. Google Analytics Connection (If GA4 ready)

**Performance Metrics Explained:**
- **Clicks** — Organic searches that led to your site
- **Impressions** — Times your site appeared in results
- **CTR** — Click-through rate (clicks ÷ impressions)
- **Position** — Average ranking position

**Key Actions:**
- Submit sitemap (automatic in Next.js)
- Request indexing for new pages
- Monitor Core Web Vitals
- Fix coverage issues
- Request verification within 24-48 hours

**Troubleshooting:**
- Verification failed → Check file location or use meta tag
- No data showing → Wait 24-48 hours, ensure search traffic exists
- Coverage errors → Usually robots.txt or technical issues

**Size:** 420 lines | **Type:** Markdown

---

### SEO Dashboard & Monitoring (`../seo/seo-dashboard-guide.md`)

**Purpose:** Build monthly monitoring dashboard and reporting system

**Tools Needed (Free):**
- Google Search Console
- Google Analytics 4
- Google Business Profile
- Google PageSpeed Insights

**Tools Recommended (Freemium):**
- Google Keyword Planner
- Rank Math (free plugin alternative)
- Google Data Studio (free dashboarding)

**Monthly Review Process (2-3 hours):**

1. **GA4 Data Collection (45 min)**
   - Organic traffic & users
   - Conversion rate & engagement
   - Top keywords driving traffic
   - Goal completions

2. **GSC Data Collection (30 min)**
   - Clicks, impressions, CTR, position
   - Top performing queries
   - New/dropped keywords
   - Technical issues

3. **GBP Insights (20 min)**
   - Profile views & actions
   - Review count & rating
   - Customer action breakdown

4. **Backlink Data (15 min)**
   - New backlinks & domains
   - Top linking sources

5. **PageSpeed Check (10 min)**
   - Core Web Vitals scores
   - Performance issues

**Monthly Report Template:**
- Executive Summary
- Traffic Performance
- Search Rankings
- Local Business
- Authority & Links
- Conversions & Goals
- Technical Health
- Actions & Next Steps

**Monthly Review Meeting Agenda (30 min):**
1. Headline Metrics (5 min) — On track?
2. Traffic Deep Dive (5 min) — Which keywords drive traffic?
3. Ranking Analysis (5 min) — Which rankings improved?
4. Conversion Focus (5 min) — How many conversions?
5. Opportunities (5 min) — What to do next month?

**Success Metrics:**
- **3 months:** +20% traffic, 10+ top-10 keywords, 25+ reviews
- **6 months:** +40% traffic, 20+ top-10 keywords, 50+ reviews
- **12 months:** +75% traffic, 30+ top-10 keywords, 100+ reviews

**Size:** 473 lines | **Type:** Markdown

---

## 🎯 Quick Reference

### Most Important Files (Start Here)

1. **`gsc-setup-guide.md`** — Google Search Console setup (CRITICAL)
2. **`seo-dashboard-guide.md`** — Monthly monitoring system (ESSENTIAL)
3. **`link-building-strategy.md`** — Authority building strategy (HIGH PRIORITY)
4. **`ga4-config.ts`** + `analytics-events.ts`** — Event tracking (REQUIRED)

### For Implementation

1. **`locations.ts`** — Location management (future-proof)
2. **`gbp-config.ts`** — GBP optimization checklist
3. **`local-citations.md`** — Directory submission plan
4. **`content-pillars.ts`** — Content strategy

### For Monitoring

1. **`seo-metrics.ts`** — KPI definitions
2. **Google Analytics 4 + Analytics Events** — Conversion tracking
3. **Google Search Console** — Organic search monitoring
4. **Monthly dashboard in Google Sheets** — Reporting

---

## 📞 How to Use This Library

### Scenario 1: I want to add a new location
1. Edit `locations.ts` — Add location data
2. Use `location-schema-generator.ts` — Generate schema
3. Follow `gbp-config.ts` — Optimize GBP

### Scenario 2: I want to track conversions
1. Review `ga4-config.ts` — Understand GA4 setup
2. Use `analytics-events.ts` — Add event tracking to components
3. Configure goals in GA4 console
4. Monitor in Google Analytics

### Scenario 3: I want to improve rankings
1. Review `content-pillars.ts` — Plan content
2. Follow `link-building-strategy.md` — Acquire backlinks
3. Use `local-citations.md` — Build citations
4. Monitor in `seo-metrics.ts` — Track KPIs

### Scenario 4: I want to set up monthly reporting
1. Follow `gsc-setup-guide.md` — Configure GSC
2. Follow `seo-dashboard-guide.md` — Create dashboard
3. Use `seo-metrics.ts` — Define KPIs
4. Set up calendar for monthly reviews

---

## ✅ Implementation Checklist

- [ ] Read `SEO_IMPLEMENTATION_SUMMARY.md` for overview
- [ ] Complete GA4 setup (get Measurement ID)
- [ ] Complete GSC verification
- [ ] Optimize Google Business Profile
- [ ] Set up citations (first 20 critical directories)
- [ ] Add event tracking to key components
- [ ] Create monthly reporting dashboard
- [ ] Schedule monthly review meetings
- [ ] Review `link-building-strategy.md` for content plan
- [ ] Begin content & backlink outreach

---

**Last Updated:** January 2024
**Version:** 1.0
**Owner:** Refresh Dental SEO Team

**Start Here:** Read `SEO_IMPLEMENTATION_SUMMARY.md` then follow the "First Steps" section.
