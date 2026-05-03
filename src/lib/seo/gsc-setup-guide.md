# Google Search Console Setup & Configuration Guide

## Overview

Google Search Console (GSC) is your direct communication channel with Google about how your website appears in search results. It's essential for SEO monitoring and troubleshooting.

---

## Part 1: Initial Setup & Verification

### Step 1: Create Google Search Console Account

1. Go to **https://search.google.com/search-console**
2. Click **"Start now"** or **"Sign in"**
3. Sign in with your Google account (use business account if available)

### Step 2: Add Property

1. Click **"Add property"** (+ icon in top-left)
2. Choose **"URL prefix"** option (not "Domain" unless you have advanced setup)
3. Enter domain: **https://www.refreshdental.co.za**
4. Click **"Continue"**

### Step 3: Verify Ownership

Google will ask you to verify that you own the website. Choose one method:

#### Method A: HTML File Upload (Recommended for Next.js)
1. Download verification file from GSC
2. Place in `/public` directory of your Next.js project:
   ```
   /public/google[verification-code].html
   ```
3. File will be accessible at: `https://www.refreshdental.co.za/google[code].html`
4. Click "Verify" in GSC

#### Method B: HTML Meta Tag
1. GSC provides meta tag: `<meta name="google-site-verification" content="[code]">`
2. Add to your `layout.tsx` metadata:
   ```tsx
   export const metadata: Metadata = {
     // ... existing metadata
     verification: {
       google: '[verification-code]',
     },
   }
   ```
3. Click "Verify" in GSC

#### Method C: Google Analytics Connection (Alternative)
1. If GA4 is already set up, GSC may auto-verify
2. Check if account is linked in GSC settings

**⚠️ ACTION REQUIRED:** Get verification code from GSC and add to your site. Verification typically takes 24-48 hours.

---

## Part 2: Configuration & Setup

### 1. Connect Google Analytics 4

1. In GSC, go to **Settings** (gear icon → left sidebar)
2. Click **"Search Console settings"**
3. Scroll to **"Google Analytics property"**
4. Select your GA4 property: **"Refresh Dental"**
5. Save changes

✓ This connects GSC data with GA4 for comprehensive tracking

### 2. Configure Preferred Domain

1. Go to **Settings**
2. Under **"Domain name settings"**
3. Choose: **"https://www.refreshdental.co.za"** (with www)
4. This prevents duplicate content issues

### 3. Set Crawl Budget (Optional)

1. Go to **Settings**
2. Under **"Crawl budget"**
3. Google will suggest based on your site size
4. Default is usually fine for medical sites

### 4. Security & Access

1. Go to **Settings**
2. Click **"Users and permissions"**
3. Add team members who need access:
   - Click **"Add user"**
   - Enter email address
   - Select permission level:
     - **Full** — All permissions
     - **Restricted** — View only (recommended for reporting)

---

## Part 3: Important Settings to Configure

### Sitemaps Submission

1. Go to **Sitemaps** (left sidebar)
2. Enter URL: **https://www.refreshdental.co.za/sitemap.xml**
3. Click **"Submit new sitemap"**
4. Status should show "Success" within hours

✓ Sitemap is already configured in your `sitemap.ts`

### Mobile Usability

1. Go to **Mobile usability** (left sidebar)
2. Monitor for any issues
3. Current status should be **"No issues found"**

### Security & Manual Actions

1. Go to **Security & manual actions**
2. This shows if Google detected any issues
3. Should be clear (no warnings/actions needed)

### Links Report

1. Go to **Links** (left sidebar)
2. View:
   - **Top linking sites** — Which domains link to you
   - **Top linked pages** — Which of your pages are linked most
   - **Top linking text** — Which anchor texts are used

⚠️ This is where you'll see your backlink acquisition progress!

---

## Part 4: Monitor Core Metrics

### Performance Report (Most Important)

1. Go to **Performance** (left sidebar)
2. This shows:
   - **Total clicks** from search results
   - **Total impressions** (times shown in SERPs)
   - **Average CTR** (click-through rate)
   - **Average position** (ranking position)

#### Key Metrics to Track Monthly:

| Metric | What It Means | Target |
|--------|---------------|--------|
| **Clicks** | How many people clicked on your site from Google | +20% MoM |
| **Impressions** | How many times you appeared in search results | +30% MoM |
| **CTR** | Click-through rate (clicks ÷ impressions) | 2-5% increase |
| **Position** | Average ranking position | Improve by 3 positions |

#### Filter Performance Data:

- **Query** — Which search terms drive traffic
  - Look for: High-intent keywords (implants, dentist, emergency)
  - Action: Create content targeting these terms

- **Pages** — Which of your pages rank best
  - Look for: Homepage, service pages getting most impressions
  - Action: Improve CTR with better title/description

- **Devices** — Desktop vs Mobile performance
  - Look for: Mobile should be 60%+ of traffic
  - Action: Ensure mobile optimization

- **Countries** — Geographic performance (should be ZA)
  - Look for: South Africa dominant
  - Action: Geo-targeting working correctly

### Pages Report

1. Go to **Pages** → **Index coverage**
2. View page indexing status:
   - **Valid** (green) — Indexed and ready
   - **Valid with warnings** — Indexed but has issues
   - **Excluded** — Not indexed (usually intentional)
   - **Error** — Technical issues preventing indexing

**Action if errors found:**
- Review error details
- Fix (usually robots.txt, meta robots, or technical issues)
- Resubmit for crawling

---

## Part 5: Submit for Crawling

### Request Indexation

When you publish new content or make changes:

1. In GSC, paste URL in **"Inspect URL"** box (top)
2. Enter: **https://www.refreshdental.co.za/guides/dental-implants**
3. Click on result → **"Request indexing"** button
4. Google will crawl within hours to days

✓ This speeds up indexing of new pages

### Bulk Indexation

For multiple pages:
1. Go to **Sitemaps**
2. Resubmit your sitemap
3. Google will recrawl all pages

---

## Part 6: Monitor for Issues

### Coverage Issues

**Red X = Errors (Fix immediately)**
- Usually means: robots.txt blocking, server errors, or technical issues
- Go to **Coverage → Error** to see details
- Fix the underlying issue, then request reindexing

**Yellow ! = Warnings (Monitor)**
- Pages excluded (usually on purpose)
- May indicate cleanup-needed pages

### Rich Results (Structured Data)

1. Go to **Enhancements** (left sidebar)
2. Check for:
   - **Rich results** status
   - **Structured data** errors/warnings
   - **AMP** issues (not applicable for you)

✓ Your LocalBusiness schema should show as valid

### Core Web Vitals

1. Go to **Core Web Vitals** (under Enhancements)
2. Monitor:
   - **LCP** (Largest Contentful Paint) — Should be < 2.5s
   - **FID** (First Input Delay) — Should be < 100ms
   - **CLS** (Cumulative Layout Shift) — Should be < 0.1

**If issues found:**
- Check "Poor URLs" list
- Go to PageSpeed Insights for each URL
- Implement recommendations (image optimization, lazy-loading, etc.)

---

## Part 7: Set Up Monitoring & Alerts

### Email Notifications

1. Go to **Settings**
2. Under **"Email reports"**
3. Enable:
   - ✓ Critical issues
   - ✓ New sitemaps
   - ✓ Security issues
4. Set frequency: **Weekly**

You'll receive email alerts for any problems.

### Create Custom Reports (Google Data Studio)

1. Go to **Linked reports** section in GSC settings
2. Click **"Create new report"**
3. Connect to Data Studio for automated reporting

---

## Part 8: Monthly Monitoring Checklist

**Do this every month:**

- [ ] Review Performance report
  - Check top queries
  - Monitor CTR trends
  - Track ranking positions
  
- [ ] Check Coverage
  - Any new errors?
  - Indexation status good?

- [ ] Review Top Pages
  - Which content is performing?
  - Which needs improvement?

- [ ] Check Core Web Vitals
  - Any poor URL notifications?
  
- [ ] Review Backlinks
  - Under "Links" → "Top linking sites"
  - Monitor new domains linking to you

- [ ] Submit New Content
  - Any new guides? Service pages?
  - Use "Inspect URL" to request indexing

---

## Part 9: Optimization Opportunities

### 1. Improve Click-Through Rate (CTR)

**Current:** Look at queries with low CTR
```
Example: "dental implants Centurion" - 15 impressions, 1 click = 6.7% CTR (good)
         "teeth whitening" - 50 impressions, 2 clicks = 4% CTR (can improve)
```

**Action:** Improve title and description for low-CTR queries
- Make title more compelling
- Add power words: "Premium", "Expert", "Best"
- Include location for local keywords

### 2. Rank Higher for More Keywords

**Current:** Look at keywords where you rank positions 11-30
```
Example: "dentist Pretoria" - Position 18
         "dental care South Africa" - Position 25
```

**Action:** Create optimized content targeting these keywords
- Write blog posts optimized for keyword
- Link from homepage to new content
- Include in internal linking

### 3. Reduce Position Drop-Off

**Current:** Track your average position monthly
```
Target: Improve from Position 8 → Position 5 (3 position improvement)
```

**Action:**
- Improve content quality
- Add more backlinks
- Optimize for Core Web Vitals
- Increase content depth

---

## Part 10: Integration with Analytics

### GSC Data in Google Analytics 4

Once GSC is connected to GA4:

1. Go to **GA4 → Acquisition → Search Console**
2. See:
   - Which keywords drive the most traffic
   - Which pages get the most impressions
   - Average CTR and position by channel

**Action:** Use this to identify content improvement opportunities

---

## Troubleshooting

### Q: "Verification failed"
**A:** 
- Check file is in correct location: `/public/google[code].html`
- Wait 24 hours before retrying
- Try HTML meta tag method instead

### Q: "Sitemaps not indexed"
**A:**
- Verify XML is valid: Go to `https://www.refreshdental.co.za/sitemap.xml`
- Should return XML content, not 404
- Check robots.txt allows sitemap: `Sitemap: https://www.refreshdental.co.za/sitemap.xml`

### Q: "No data showing in Performance"
**A:**
- GSC takes 24-48 hours to show data
- Ensure site has actual search traffic
- Check Search Analytics is enabled

### Q: "Coverage shows errors"
**A:**
- Click error type to see list of affected URLs
- Check error message for specific issue
- Most common: Robots.txt blocking (unlikely for you)
- Request reindexing after fixing

---

## Resources & Links

- **Google Search Console Help:** https://support.google.com/webmasters
- **Performance Report Guide:** https://support.google.com/webmasters/answer/7042828
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile Friendly Test:** https://search.google.com/mobile-friendly
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

## Next Steps

1. ✓ **Verify website** (if not done)
2. ✓ **Submit sitemap**
3. ✓ **Connect GA4**
4. ✓ **Wait 48 hours** for initial data
5. ✓ **Set up email alerts**
6. ✓ **Create monthly review process**
7. ✓ **Monitor and optimize** based on GSC data

---

**Status:** Ready to implement
**Last Updated:** January 2024
**Owner:** Refresh Dental SEO Team

---

## Quick Links

- **Google Search Console:** https://search.google.com/search-console
- **Your Property:** https://search.google.com/search-console/about?hl=en
- **Inspect Tool:** Built-in to GSC dashboard
- **Sitemaps:** Already configured at `/sitemap.xml`
