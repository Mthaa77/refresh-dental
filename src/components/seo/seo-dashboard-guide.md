# SEO Monitoring Dashboard Setup & Guide

## Overview

This guide shows you how to monitor your SEO performance using free and premium tools. Set up a monthly review process to track progress toward your goals.

---

## Part 1: Tools & Data Sources

### Essential (Free) Tools

#### 1. Google Search Console (GSC)
- **URL:** https://search.google.com/search-console
- **Data:** Organic traffic, rankings, clicks, impressions
- **Update Frequency:** Near real-time (reports run daily)
- **Key Metrics:** Performance, coverage, enhancements

#### 2. Google Analytics 4 (GA4)
- **URL:** https://analytics.google.com
- **Data:** User behavior, conversions, engagement
- **Update Frequency:** Real-time
- **Key Metrics:** Organic traffic, conversions, user flow

#### 3. Google Business Profile (GBP)
- **URL:** https://business.google.com
- **Data:** Local search visibility, reviews, customer actions
- **Update Frequency:** Real-time
- **Key Metrics:** Views, calls, directions, messages

#### 4. Google PageSpeed Insights
- **URL:** https://pagespeed.web.dev
- **Data:** Core Web Vitals, performance metrics
- **Update Frequency:** On-demand (manual checks)
- **Key Metrics:** LCP, FID, CLS, mobile score

### Recommended (Freemium) Tools

#### 5. Google Keyword Planner
- **URL:** https://ads.google.com/aw/keywordplanner
- **Data:** Keyword volume, trends, competition
- **Update Frequency:** Monthly/Quarterly
- **Purpose:** Keyword research & strategy

#### 6. Rank Math (Free Plugin Alternative)
- **URL:** https://rankmath.com
- **Data:** On-page SEO, rankings (limited free version)
- **Update Frequency:** Variable
- **Purpose:** Content optimization

### Premium Tools (Optional for Advanced Tracking)

#### A. SEMrush ($99-399/month)
- Comprehensive rank tracking
- Backlink analysis
- Competitor analysis
- Local SEO insights

#### B. Ahrefs ($99-999/month)
- Backlink tracking
- Keyword research
- Site audit
- Competitor analysis

#### C. Moz Pro ($99-599/month)
- Rank tracking
- Local SEO (Moz Local)
- Site crawl
- Link research

---

## Part 2: Monthly Review Dashboard Setup

### What You'll Track Monthly

Create a simple spreadsheet (Google Sheets recommended) with these sections:

#### Section 1: Traffic Metrics (from GA4)

```
Month: January 2024

Traffic Overview:
- Organic Sessions: [number]
- Organic Users: [number]
- Organic Conversion Rate: [%]
- Average Session Duration: [seconds]
- Bounce Rate: [%]

Top Traffic Sources:
1. [Keyword] - [# sessions]
2. [Keyword] - [# sessions]
3. [Keyword] - [# sessions]
```

#### Section 2: Rankings (from GSC)

```
Search Performance:
- Total Clicks: [number]
- Total Impressions: [number]
- Average CTR: [%]
- Average Position: [#]

Top Performing Queries:
1. [Keyword] - Position [#], CTR [%]
2. [Keyword] - Position [#], CTR [%]
3. [Keyword] - Position [#], CTR [%]

Keywords Entered/Exited Top 10:
- New in Top 10: [keywords]
- Dropped from Top 10: [keywords]
```

#### Section 3: Authority Metrics (from Link Sources)

```
Backlink Profile:
- Total Backlinks: [number]
- New Backlinks (this month): [number]
- Referring Domains: [number]
- New Referring Domains: [number]

Top New Links:
1. [Source domain] - [Link type]
2. [Source domain] - [Link type]
3. [Source domain] - [Link type]
```

#### Section 4: Local Metrics (from GBP)

```
Google Business Profile:
- Profile Views: [number]
- Google Reviews: [number]
- Average Rating: [#/5 stars]
- Customer Actions: [number]
  - Website clicks: [#]
  - Call clicks: [#]
  - Direction requests: [#]
```

#### Section 5: Technical Health (from PageSpeed Insights)

```
Core Web Vitals:
- LCP (Largest Contentful Paint): [seconds]
- FID (First Input Delay): [ms]
- CLS (Cumulative Layout Shift): [#]
- Overall Score: [/100]

Issues Found:
- Mobile Usability Issues: [#]
- Crawl Errors: [#]
- Coverage Issues: [#]
```

#### Section 6: Conversions (from GA4)

```
Conversion Metrics:
- Appointment Bookings: [#]
- Contact Form Submissions: [#]
- Phone Calls: [#]
- Other Goals: [#/type]

Conversion Rate: [%]
```

---

## Part 3: Monthly Review Process

### How to Collect Data (2-3 hours/month)

#### Step 1: Google Analytics 4 Data (45 minutes)
1. Go to **https://analytics.google.com**
2. Select property: **Refresh Dental**
3. Date range: **Last month** (Jan 1-31, etc.)
4. Go to **Acquisition → Organic Search**
5. Record:
   - Users, Sessions, Conversion Rate
   - Bounce Rate, Avg Session Duration
6. Go to **Acquisition → Search Console**
7. Note top keywords, trends
8. Check **Conversions → Goals** for goal completions

**Export tip:** Click ↓ button to export reports to CSV

#### Step 2: Google Search Console Data (30 minutes)
1. Go to **https://search.google.com/search-console**
2. Date range: **Last 28 days** (current available)
3. Go to **Performance**
4. Record:
   - Clicks, Impressions, CTR, Avg Position
5. Sort by **Clicks** → note top 10 queries
6. Sort by **Impressions** → note low-CTR opportunities
7. Filter by **Device** → check Mobile vs Desktop split
8. Go to **Pages** → check top performing pages
9. Go to **Index coverage** → note any errors

**Export tip:** Click ↓ → "Export as CSV" (limited to 1000 rows)

#### Step 3: Google Business Profile Data (20 minutes)
1. Go to **https://business.google.com**
2. Click on **Insights** (left sidebar)
3. Date range: **Last month**
4. Record:
   - Profile Views, Customer Actions breakdown
   - Direction requests, Calls, Website clicks
5. Go to **Customers**
6. Count new reviews received
7. Note average rating

#### Step 4: Backlink Data (15 minutes)

**Option A: Free (GSC Links Report)**
1. Go to **GSC → Links**
2. Note under "Top linking sites"
3. Check if any new domains linking
4. Record total count if available

**Option B: If using SEMrush/Ahrefs**
1. Check your backlink report
2. Filter for "new backlinks" this month
3. Record count and quality assessment

#### Step 5: PageSpeed Insights (10 minutes)
1. Go to **https://pagespeed.web.dev**
2. Test your homepage: **https://www.refreshdental.co.za**
3. Record Core Web Vitals scores
4. Test a key service page (e.g., /implants)
5. Note any issues

---

## Part 4: Create Monthly Report (Google Sheets Template)

### Recommended Layout

```
═══════════════════════════════════════════════════════════════
REFRESH DENTAL — Monthly SEO Report
Month: [Month Name] [Year]
Date Prepared: [Today's Date]
═══════════════════════════════════════════════════════════════

1. EXECUTIVE SUMMARY
   └─ Key Highlights & Changes vs Last Month

2. TRAFFIC PERFORMANCE
   ├─ Organic Traffic: [Sessions] (↑/↓ X% vs last month)
   ├─ Organic Users: [#] (↑/↓ X% vs last month)
   ├─ Conversion Rate: [%] (↑/↓ X% vs last month)
   └─ Key Insight: [What changed and why?]

3. SEARCH RANKINGS
   ├─ Top 10 Keywords: [List with positions]
   ├─ Keywords Improved: [List]
   ├─ Keywords Dropped: [List]
   └─ Average Position: [#] (↑/↓ vs last month)

4. LOCAL BUSINESS
   ├─ GBP Views: [#]
   ├─ Reviews: [# total, average rating]
   ├─ Customer Actions: [# total]
   └─ Key Metric: [Most important local signal]

5. AUTHORITY & LINKS
   ├─ New Backlinks: [#]
   ├─ New Referring Domains: [#]
   ├─ Total Domain Authority: [#/100]
   └─ Status: [On track/Needs attention]

6. CONVERSIONS & GOALS
   ├─ Appointment Bookings: [# from organic]
   ├─ Contact Submissions: [#]
   ├─ Phone Calls: [#]
   └─ Total Conversions: [#]

7. TECHNICAL HEALTH
   ├─ Core Web Vitals: [Good/Needs Improvement]
   ├─ Mobile Score: [/100]
   ├─ Crawl Errors: [#]
   └─ Overall Status: [Healthy/Monitor]

8. ACTIONS & NEXT STEPS
   ├─ What worked well: [List]
   ├─ What needs improvement: [List]
   └─ Recommended actions: [List]

═══════════════════════════════════════════════════════════════
```

---

## Part 5: Set Up Automated Monitoring (Email Reports)

### Enable GSC Email Alerts
1. Go to **Settings** (GSC)
2. Enable **"Email reports"**
3. Set to **Weekly** summary
4. Receive alerts for critical issues

### Enable GA4 Custom Alerts
1. Go to **Admin** → **Custom alerts**
2. Create alert for:
   - "Organic sessions > 10% above 30-day average"
   - "Conversion rate > 25% below 7-day average"
3. Set to notify weekly

### Google Data Studio Dashboard (Advanced)
1. Go to **https://datastudio.google.com**
2. Click **"Create" → "Report"**
3. Add data sources: **GSC**, **GA4**
4. Build dashboard showing:
   - Organic traffic trend
   - Ranking changes
   - Conversion tracking
5. Share report with team (auto-updates daily)

---

## Part 6: Monthly Meeting Agenda (30 minutes)

### Run Monthly SEO Reviews

**Attendees:** Marketing manager, content lead, technical lead

**Agenda:**

1. **Headline Metrics Review** (5 min)
   - Are we on track for growth targets?
   - Any significant changes month-over-month?

2. **Traffic Deep Dive** (5 min)
   - Which keywords drive the most traffic?
   - Any seasonal patterns?
   - Mobile vs desktop split?

3. **Ranking Analysis** (5 min)
   - Which keywords improved positions?
   - Which keywords dropped?
   - Any new keywords entering top 10?

4. **Conversion Focus** (5 min)
   - How many organic conversions this month?
   - Conversion rate trending up/down?
   - Any patterns in converting traffic sources?

5. **Opportunities & Blockers** (5 min)
   - What's working? Continue/expand.
   - What's not? Pivot or investigate.
   - Any technical issues to fix?

6. **Action Items** (5 min)
   - Content to create?
   - Technical improvements needed?
   - Link-building outreach opportunities?

---

## Part 7: Dashboard Quick Links

### Bookmark These for Fast Access

```
🔗 GOOGLE TOOLS
- GSC: https://search.google.com/search-console
- GA4: https://analytics.google.com
- GBP: https://business.google.com
- PageSpeed: https://pagespeed.web.dev
- Keyword Planner: https://ads.google.com/aw/keywordplanner

🔗 SEO MONITORING
- Rank Tracking: [Your tool URL]
- Backlink Monitoring: [Your tool URL]
- Analytics: [Your custom dashboard]

📊 YOUR DASHBOARDS
- Monthly Report: [Google Sheets link]
- Data Studio: [Google Data Studio link]
- Metrics Tracker: [Your tracking sheet]
```

---

## Part 8: 6-Month & 12-Month Reviews

### Quarterly Deep Dive (1 hour)

Review 3-month trends:
- Is traffic growing consistently?
- Are rankings improving?
- Is authority building?
- Are conversions increasing?

### Annual Strategic Review (2 hours)

Review full year results:
- Organic traffic growth vs goals
- Ranking achievements
- Authority (domain/backlinks) growth
- Content performance
- Conversion trends
- Plan next year strategy

---

## Part 9: Common Dashboard Issues

### Q: "GA4 shows 0 conversions"
**A:** 
- Ensure conversion events are set up in GA4
- Check event implementation in code
- Wait 24 hours for data to process
- See: `lib/analytics/ga4-config.ts`

### Q: "GSC shows no data"
**A:**
- Verification needs 24-48 hours
- Check site has actual search traffic
- Verify through correct property

### Q: "Ranking data not matching between tools"
**A:**
- Google updates rankings based on location/device
- Small differences are normal
- GSC is most accurate (directly from Google)

### Q: "Can't export GSC data"
**A:**
- Free export limited to 1000 rows
- Use Google API or premium tools for full data
- Manual tracking in spreadsheet is fine for starting

---

## Part 10: Success Metrics at Milestones

### 3 Months
- ✓ Organic traffic up 20%+
- ✓ 10+ keywords in top 10
- ✓ 5+ new backlinks
- ✓ 25+ Google reviews

### 6 Months
- ✓ Organic traffic up 40%+
- ✓ 20+ keywords in top 10
- ✓ 15+ new backlinks
- ✓ 50+ Google reviews (4.5+ rating)

### 12 Months
- ✓ Organic traffic up 75%+
- ✓ 30+ keywords in top 10
- ✓ 40+ new backlinks
- ✓ 100+ Google reviews (4.5+ rating)
- ✓ 50%+ increase in organic conversions

---

**Dashboard Setup Checklist:**
- [ ] Connect GSC to GA4
- [ ] Enable GSC email alerts
- [ ] Create tracking spreadsheet
- [ ] Book monthly review meeting
- [ ] Set calendar reminders for data collection
- [ ] Create Data Studio dashboard (optional)

**Last Updated:** January 2024
**Owner:** Refresh Dental SEO Team
