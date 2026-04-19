# 🦷 REFRESH DENTAL — PREMIUM WEBSITE BUILD PROMPT
> Master prompt for Carter Digitals
> Use this prompt in full when commissioning the website build

---

## BRIEF OVERVIEW

Build a **multi-page, cinematic, ultra-premium dental website** for **Refresh Dental** — a female-led, holistic dental practice in Centurion, Pretoria, South Africa, founded and led by **Dr. Lebogang Malunga**. The website must feel like a luxury wellness brand — think less "clinical dentist office," more *Glossier meets Joburg high-end aesthetics spa.* It must be breathtakingly beautiful, professionally persuasive, and built to convert.

This is not a Wix rebuild. This is a full Next.js 15+ production website with cinematic motion design, premium typography, and interactive components that make visitors feel something before they even read a word.

---

## TECH STACK

| Layer | Technology |
|---|---|
| Framework | **Next.js 15+** (App Router, React Server Components) |
| Styling | **Tailwind CSS** with custom design tokens |
| Animation | **Framer Motion** (page transitions, scroll reveals, parallax) |
| Forms | **React Hook Form** + **Zod** validation |
| Fonts | Google Fonts or Adobe Fonts (see Typography section) |
| Icons | **Lucide React** |
| Deployment | **Vercel** (free tier) |
| CMS (optional) | Contentlayer or MDX for blog/FAQ |

---

## DESIGN PHILOSOPHY

### Aesthetic Direction: **"Warm Luxury Wellness"**
This is not a cold, clinical, white-on-white dentist site. The visual identity should feel:
- **Warm** — earthy ivory tones, soft blush, champagne gold accents
- **Premium** — generous white space, editorial-quality type hierarchy
- **Alive** — cinematic motion on scroll, subtle parallax, breath-like transitions
- **Trustworthy** — confident layouts that communicate expertise without arrogance
- **South African** — subtle nods to warmth, ubuntu, community

Think: **Augustinus Bader meets The Private Clinic London** — but rooted in Centurion.

---

## COLOUR PALETTE

```css
:root {
  /* Backgrounds */
  --color-bg-primary: #FDFAF6;        /* Warm ivory — main background */
  --color-bg-secondary: #F5EFE6;      /* Pale sand — section alternates */
  --color-bg-dark: #1A1510;           /* Deep espresso — dark sections */
  --color-bg-card: #FFFFFF;           /* Pure white — card surfaces */

  /* Brand Colours */
  --color-brand-gold: #C9A96E;        /* Champagne gold — primary accent */
  --color-brand-gold-light: #E8D5B0;  /* Pale gold — highlights */
  --color-brand-teal: #3D7D6E;        /* Deep sage teal — secondary accent */
  --color-brand-teal-light: #8FBFB5;  /* Soft mint — gentle highlights */
  --color-brand-blush: #E8C4B8;       /* Warm blush — female/warmth accent */

  /* Text */
  --color-text-primary: #1A1510;      /* Espresso — headings */
  --color-text-secondary: #5C4E3D;    /* Warm brown — body */
  --color-text-muted: #9B8B7A;        /* Sand — captions, labels */
  --color-text-inverse: #FDFAF6;      /* Ivory — text on dark backgrounds */

  /* UI */
  --color-border: #E8E0D5;            /* Soft border */
  --color-shadow: rgba(26,21,16,0.08);
}
```

---

## TYPOGRAPHY

### Font Pairing: Editorial Luxury

```css
/* Display / Hero Headlines */
font-family: 'Cormorant Garamond', serif;
/* — Elegant, high-fashion serif. Use for all H1, H2, cinematic quotes */
/* Weights: 300 (Light), 400, 500 (Medium), 600, 700 */

/* Sub-headings / Section Titles */
font-family: 'DM Serif Display', serif;
/* — More structured serif for mid-tier headings */

/* Body / UI Text */
font-family: 'Jost', sans-serif;
/* — Clean, geometric, humanist sans. Not Inter. Not Roboto. */
/* Weights: 300, 400, 500 */

/* Labels / Caps / Navigation */
font-family: 'Jost', sans-serif;
/* letter-spacing: 0.15em; text-transform: uppercase; font-weight: 300 */

/* Doctor / Quote Pull-text */
font-family: 'Cormorant Garamond', serif;
/* font-style: italic; font-size: clamp(1.5rem, 3vw, 2.5rem); */
```

### Type Scale
```
Hero H1:          clamp(3.5rem, 8vw, 7rem)    — Cormorant Garamond Light
Section H2:       clamp(2rem, 4vw, 3.5rem)     — Cormorant Garamond Medium
Sub-heading H3:   clamp(1.25rem, 2vw, 1.75rem) — DM Serif Display
Body Large:       1.125rem / 1.8 line-height   — Jost 300
Body Regular:     1rem / 1.7 line-height       — Jost 400
Label/Caption:    0.75rem / 0.12em tracking    — Jost 500 Uppercase
```

---

## SITE STRUCTURE — 6 PAGES

```
/                 → Homepage (cinematic, full experience)
/about            → About Dr. Lebo & the Practice
/services         → All Services (interactive grid)
/services/[slug]  → Individual Service Detail Pages
/contact          → Contact + Embedded Map + Booking CTA
/financing        → Athena Payment Plans explainer
```

> Optional Phase 2: `/blog` (dental education), `/corporate` (wellness outreach)

---

## PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE 1: HOMEPAGE (`/`)

This is the hero of the entire site. Full cinematic treatment. Every scroll triggers something beautiful.

#### SECTION 1 — FULL-SCREEN HERO (Above the fold)

**Layout:** Full viewport height. Split composition — left editorial, right visual.

**Left side (60% width):**
- Small uppercase label in gold: `REFRESH DENTAL · CENTURION`
- Massive H1 in Cormorant Garamond Light, spanning 3 lines:
  ```
  Your Smile,
  Refreshed.
  Revived.
  ```
- Subheading in Jost 300 (max 20 words):
  `Premium dental care in the heart of Centurion — where confidence begins.`
- Two CTAs side by side:
  - Primary button (gold fill): `Book an Appointment →`
  - Secondary ghost button (teal border): `Explore Services`
- Floating badge (bottom-left of hero): small pill badge showing `⭐ 5.0 · Google Reviews`

**Right side (40% width):**
- Full-height cinematic image of Dr. Lebo (use Wix CDN image as placeholder, or a warm editorial dental stock photo)
- Subtle dark gradient overlay at edges blending into the ivory background
- Floating card element overlapping the image edge (bottom-right):
  ```
  [Icon: Clock]  30-Min Consultations
  [Icon: Shield] All Medical Aids Accepted
  [Icon: Sparkle] Interest-Free Payment Plans
  ```

**Entrance Animation (Framer Motion):**
- H1 words stagger in from below with 100ms delay between each word
- Image slides in from right with 0.6s ease-out
- Floating card fades in after 800ms delay
- Background has a very subtle grain texture overlay (CSS noise filter)

---

#### SECTION 2 — FLOATING STATS BAR

**Full-width, dark espresso background strip:**
Four animated number counters, center-aligned, triggered on scroll into view:

```
[500+]          [12]              [3]              [5★]
Smiles          Services          Locations        Google
Refreshed       Available         History          Rating
```

Use **CountUp.js** or Framer Motion animate for the number counting effect.

---

#### SECTION 3 — ABOUT DR. LEBO (Asymmetric Layout)

**Left:** Large editorial portrait of Dr. Lebo (full-height, slightly overflowing section bounds — grid-breaking)

**Right:**
- Gold uppercase label: `MEET YOUR DENTIST`
- H2: `Dr. Lebogang Malunga`
- Italic Cormorant pull-quote:
  *"A revitalised smile doesn't just change your appearance — it changes your life."*
- 3-line bio paragraph (Jost 300)
- Dr. Lebo's contact: `drlebo@refreshdental.co.za · 061 416 4649`
- Button: `Read Full Story →` (links to /about)
- Small trust row at bottom: LinkedIn icon + "HPCSA Registered"

**Animation:** Left image parallax scrolls slightly slower than the page. Right text block slides in from right on scroll.

---

#### SECTION 4 — SERVICES (Bento Grid)

**Header:**
- Gold label: `WHAT WE OFFER`
- H2: `Everything Your Smile Needs`
- Body: `From routine check-ups to advanced cosmetic procedures — all under one roof.`

**Grid Layout (Bento-style, asymmetric):**
12 services arranged in a CSS grid where:
- **Dental Implants** — large card (spans 2 columns, 2 rows), image background with overlay
- **Teeth Whitening** — medium card (spans 2 columns, 1 row), teal accent
- **Fillers & Neurotoxins** — medium card (gold accent), positioned prominently
- **Aligner/Slimming Wires** — medium card with "before/after" visual hook
- Remaining 8 services — standard cards

Each card contains:
- Service name (Cormorant Garamond H3)
- Duration badge (e.g., `30 min`)
- 1-line description
- `Book →` micro CTA

**Hover state:** Each card lifts with shadow + reveals a "Book Now" overlay strip from the bottom (sliding up with Framer Motion)

Button below grid: `View All Services →`

---

#### SECTION 5 — CINEMATIC PARALLAX STATEMENT

**Full-width dark section** with a full-bleed background image (Dr. Lebo treating a patient, warm tones).

**Overlay text, centered, massive Cormorant Garamond italic:**
```
"One refreshed smile
at a time."
— Dr. Lebogang Malunga
```

**Below quote:** 
- Small separator line in gold
- `Serving Centurion · Lyttelton Manor · Family Wellness Centre`

**Effect:** Parallax scrolling — the background image moves at 60% the scroll speed. Text stays fixed relative to the section. Dark vignette overlay at 60% opacity.

---

#### SECTION 6 — PATIENT TESTIMONIALS (Horizontal Scroll Carousel)

**Header:**
- Gold label: `PATIENT STORIES`
- H2: `What Our Patients Say`

**Carousel:** Auto-scrolling horizontal card carousel with manual drag support (use **Embla Carousel** or **Framer Motion drag**)

Each card contains:
- 5-star rating (gold stars)
- Patient name (bold, Jost)
- Review text (Jost 300, italic)
- Source badge: `Google Review`

Cards are warm white with subtle shadow. Teal left border accent on active card.

**Testimonials to include (from scrape doc):**
1. Phillimon Utla
2. Shaun Kleynhans
3. Adaani Frost (emergency patient — great for urgency proof)

---

#### SECTION 7 — PAYMENT & MEDICAL AID

**Two-column layout:**

**Left — Medical Aid:**
- Icon: Shield with checkmark
- H3: `All Medical Aids Accepted`
- Body: `We accept all major South African medical aid schemes. Bring your card and leave the admin to us.`
- Pill tags in teal: `Discovery` `Momentum` `Bonitas` `All Schemes`

**Right — Athena Finance:**
- Icon: Calendar with coin
- H3: `Pay Over 3–6 Months, Interest-Free`
- Body: `We've partnered with Athena to offer flexible payment plans. A once-off 6% processing fee is all you pay — no interest, ever.`
- Inline mini calculator (interactive):
  - Input: "Procedure Cost: R____"
  - Dropdown: "3 months / 6 months"
  - Output: "Your monthly payment: R____/month"
- Button: `Learn More About Financing →`

---

#### SECTION 8 — LOCATION & EMERGENCY AVAILABILITY

**Split section:**

**Left:** Embedded Google Maps iframe (153 River Road, Centurion, 0157)

**Right:**
- Gold label: `FIND US`
- H3: `Inside Family Wellness Centre`
- Address block:
  ```
  153 River Road
  Lyttelton Manor, Centurion
  Pretoria 0157
  ```
- Phone: `012 883 3636` & `061 416 4649`
- WhatsApp button (green): `WhatsApp Us →`
- Emergency callout box (blush background):
  ```
  🚨 Dental Emergency?
  Dr. Malunga is available for urgent cases.
  Call immediately: 061 416 4649
  ```

---

#### SECTION 9 — NEWSLETTER + FINAL CTA

**Full-width dark espresso section:**

**Headline (Cormorant, large, ivory):**
```
Ready for your
Refreshed Smile?
```

**Subtext:** `Book your consultation today. No commitment, no pressure.`

**Two CTAs:**
- `Book Online →` (gold button)
- `Call 061 416 4649` (ghost button)

**Below CTAs:** Email newsletter signup (Jost 300 input, minimal styling)
`Stay connected — subscribe for oral health tips and exclusive offers.`

---

#### FOOTER

**Dark espresso background. Four columns:**

**Col 1:**
- Refresh Dental logo (white version)
- Tagline: *"Refreshed smiles, refreshed lives."*
- Social icons: Instagram, Facebook, LinkedIn, TikTok

**Col 2:** Quick Links
- Home / About / Services / Financing / Contact / Book Online

**Col 3:** Services (top 6)
- Dental Implants / Teeth Whitening / Aligners / Fillers / Root Canal / Scaling

**Col 4:** Contact
- 📍 153 River Road, Centurion
- 📞 061 416 4649 / 012 883 3636
- ✉️ admin@refreshdental.co.za
- ✉️ drlebo@refreshdental.co.za

**Bottom bar:**
`© 2025 Refresh Dental. Built by Carter Digitals.` | `Privacy Policy`

---

### PAGE 2: ABOUT (`/about`)

#### Hero:
- Asymmetric two-column — large H1 left ("Our Story"), full editorial image right
- Warm ivory background, no parallax (cleaner read)

#### Sections:
1. **Practice Origin Story** — Centurion, holistic care mission, community wellness
2. **Dr. Lebo Full Bio** — large portrait, full narrative biography, credentials, HPCSA registered badge
3. **Our Values** — 4-column icon grid: Patient Comfort / Holistic Care / Community Wellness / Excellence
4. **The Practice** — "Inside Family Wellness Centre" — describe the warm, modern environment with photos
5. **Community Outreach** — Corporate dental wellness, outreach programmes — describe the mission
6. **CTA strip** — `Meet Dr. Lebo in person. Book a consultation today.`

---

### PAGE 3: SERVICES (`/services`)

#### Hero:
- H1: `Everything Your Smile Deserves`
- Subtitle + category filter tabs: `All | General | Cosmetic | Specialised | Aesthetics`

#### Service Cards Grid:
Interactive grid. Each card:
- Service image (full-bleed top)
- Service name (H3, Cormorant)
- Category badge (teal pill)
- Duration (clock icon)
- 2-line description
- `Book Appointment →` button (gold)

On hover: card border glows with gold, image zooms gently (scale 1.05), CTA slides up.

#### Sticky sidebar on desktop:
"Not sure what you need? Book a 30-min consultation — R0 commitment."
With floating booking button.

---

### PAGE 4: SERVICE DETAIL (`/services/[slug]`)

Template page for each of the 12 services. Sections:
1. **Hero** — Service name, 1-line tagline, duration badge, Book Now CTA
2. **What Is It?** — Plain-language description of the procedure
3. **What to Expect** — Step-by-step numbered process (what happens during the appointment)
4. **Benefits** — Icon grid (3–4 benefits)
5. **Who Is It For?** — Short qualifying copy
6. **FAQs** — Accordion (3–5 Q&As per service)
7. **Related Services** — 3 cards
8. **Booking CTA** — Full-width dark section

---

### PAGE 5: CONTACT (`/contact`)

Layout: Two-column with large Google Maps left, contact form right.

**Contact form fields:**
- First Name / Last Name
- Email / Phone
- Service of Interest (dropdown — all 12 services)
- Preferred Date
- Message
- Submit button: `Send Message` (gold, full-width)

**Below form:**
- WhatsApp CTA: large green button `Chat on WhatsApp`
- Emergency note: `For urgent dental emergencies, call 061 416 4649 immediately.`

**Address block with icons (under map):**
- 📍 153 River Road, Lyttelton Manor, Centurion
- 📞 012 883 3636 / 061 416 4649
- ✉️ admin@refreshdental.co.za
- 🕐 Hours: [TO BE PROVIDED BY DR. LEBO]

---

### PAGE 6: FINANCING (`/financing`)

**Purpose:** Explain Athena payment plans in clear, reassuring language. Convert price-anxious visitors.

#### Sections:
1. **Hero:** "World-Class Dental Care Shouldn't Break the Bank"
2. **Medical Aid section** — "We Accept All Medical Aids" with scheme logos
3. **Athena Explainer** — Step-by-step: Apply → Get approved → Get treated → Pay monthly
4. **Interactive Calculator** — Input cost + select term → see monthly instalment
   - Formula: `((cost * 1.06) / instalments)` — display dynamically
   - Note: 3 months = 4 instalments, 6 months = 7 instalments
5. **FAQ Accordion** — "Is this really interest-free?" / "What credit score do I need?" / "Can I use this for implants?"
6. **CTA:** `Apply for Athena Financing →` + `Or call us to discuss: 061 416 4649`

---

## GLOBAL INTERACTIVE COMPONENTS

### Floating WhatsApp Button
- Fixed bottom-right corner, all pages
- Green circle with WhatsApp icon
- On hover: expands to show "Chat with Us"
- Links to: `https://wa.me/27614164649`

### Sticky Navigation Bar
- Transparent on hero, transitions to warm ivory with soft shadow on scroll
- Logo left, nav links center, `Book Online` gold CTA button right
- Mobile: hamburger → full-screen overlay menu with staggered link reveals

### Page Transitions
- Framer Motion `AnimatePresence` with `opacity` + `y` slide
- 0.3s ease-out enter, 0.2s ease-in exit

### Scroll Reveal System
- All sections use `useInView` hook + Framer Motion
- Default animation: `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }` over 0.6s
- Staggered children where appropriate (0.1s delay per child)

### Custom Cursor (Desktop only)
- Replace default cursor with small gold dot + larger transparent circle ring
- Ring scales up on hoverable elements
- On CTAs: cursor changes to text `"Book"`

### Loading Screen
- Initial site load: Refresh Dental logo fades in on dark background, then fades out
- Duration: 1.2s
- Only on first visit (use sessionStorage flag)

---

## PERFORMANCE & SEO

- Use `next/image` for all images with `priority` on hero
- Google Fonts loaded via `next/font` — zero layout shift
- Each page has unique `<title>` and `<meta description>`
- Structured data (JSON-LD) on homepage:
  ```json
  {
    "@type": "Dentist",
    "name": "Refresh Dental",
    "address": "153 River Road, Centurion, 0157",
    "telephone": "+27614164649",
    "url": "https://www.refreshdental.co.za"
  }
  ```
- `sitemap.xml` and `robots.txt` auto-generated
- Core Web Vitals target: LCP < 2.5s, CLS = 0

---

## CONTENT — ALL COPY (USE VERBATIM OR ADAPT)

### Practice Details
- **Name:** Refresh Dental
- **Tagline:** Refreshed smiles, refreshed lives.
- **Address:** 153 River Road, Lyttelton Manor, Centurion, Pretoria 0157 (inside Family Wellness Centre)
- **Phone 1:** 061 416 4649 (also WhatsApp)
- **Phone 2 (Landline):** 012 883 3636
- **Email:** admin@refreshdental.co.za
- **Dr. Lebo Email:** drlebo@refreshdental.co.za
- **Website:** www.refreshdental.co.za

### Social Links
- Instagram: https://www.instagram.com/refresh_dental_
- Facebook: https://www.facebook.com/share/17deYWeBn9
- LinkedIn: https://www.linkedin.com/in/drlebogangmalunga
- TikTok: https://www.tiktok.com/@refresh_dental
- WhatsApp: https://wa.me/27614164649

### Dr. Lebo Bio (Full)
Dr. Lebogang Malunga is the dedicated founder and principal dentist at Refresh Dental. Driven by a passion for aesthetics and holistic well-being, Dr. Malunga is committed to transforming smiles while prioritising overall health. With a family-focused approach to general dentistry, Dr. Malunga believes that a revitalised smile not only enhances appearance, but also supports a happier, healthier life. At Refresh Dental, Dr. Malunga leads a team devoted to community wellness, helping patients of all ages achieve lasting oral health and renewed confidence — one refreshed smile at a time.

### Mission Statement
*"At Refresh Dental, our mission is to enhance smiles and improve oral health through our comprehensive dental services. We are committed to providing superior care, focusing on patient comfort and satisfaction. Your smile is our priority."*

### Services (All 12)
1. Dental Implants — 1 hr 30 min
2. Dental Consultation — 30 min
3. Scaling and Polishing — 30 min
4. Restorations — 30 min
5. Teeth Whitening — 1 hr
6. Aligner Consultation (Slimming Wires) — 30 min
7. Root Canal Therapy — 1 hr 30 min
8. Wisdom Teeth Removal — 1 hr
9. Dental Prosthesis (False Teeth) — 30 min
10. Crowns and Veneers — 1 hr
11. Fixed Dental Prosthesis — 1 hr 30 min
12. Fillers and Neurotoxins — 1 hr

### Patient Reviews (Use Verbatim)
- **Phillimon Utla:** "Had a great experience with Dr. Lebo! The team was super friendly and made me feel really comfortable. Dr. Lebo explained everything clearly and didn't rush through anything. The clinic was clean and modern, which I appreciated. Overall, a really positive visit — I'd definitely recommend them to anyone looking for a good dentist!"
- **Shaun Kleynhans:** "Had my appointment with Dr Lebogang and she and her staff were truly amazing, was very thoughtful and explained everything in detail pertaining to my procedure. Her kindness and gentle way of carrying out her procedure was excellent. Definitely my go-to dentist from this day forward. From making my appointment to the procedure and walking out 10/10 definitely 5 star ⭐⭐⭐⭐⭐ service."
- **Adaani Frost:** "Dr. Malunga made herself available for a dental emergency within minutes of our call. She was fast, efficient, courteous, her facility and staff were immaculate and professional. Refresh Dental is close to the airport... the site of our dental emergency. We recommend her and her facility highly."

---

## IMAGE PLACEHOLDERS

Use these as `src` values during build. Replace with final assets from Dr. Lebo.

| Use | Wix CDN URL |
|---|---|
| Logo | `https://static.wixstatic.com/media/a78f12_d8df1e87d3a1425a86b2e603d0ede665~mv2.jpg` |
| Dr. Lebo (Hero) | `https://static.wixstatic.com/media/a78f12_53141acea4c54f4da9028c40f2b7323d~mv2.jpeg` |
| Dr. Lebo (Portrait) | `https://static.wixstatic.com/media/a78f12_7fc7c9e18d7f40a2800bafc5b7912798~mv2.jpeg` |
| Smile Hero | `https://static.wixstatic.com/media/11062b_8cab6b1dddd5426b8711228584424419~mv2.jpg` |

For all other images, use high-quality free dental/wellness stock from:
- `https://unsplash.com/s/photos/dental-clinic`
- `https://www.pexels.com/search/dentist/`

Preferred photo style: Warm-toned, natural light, African subjects where possible, non-clinical feel.

---

## WHAT "PREMIUM" MEANS ON THIS SITE

Do NOT do any of the following — these make it look cheap:
- ❌ Flat blue/white dentist color scheme
- ❌ Clipart tooth icons
- ❌ Stock photos of American/European patients
- ❌ Inter or Roboto font
- ❌ Generic Bootstrap-style cards with equal padding
- ❌ Purple gradient on white (overused AI site cliché)
- ❌ Form with no visual hierarchy
- ❌ CTA buttons that say "Submit" or "Click Here"
- ❌ No animation, no scroll behavior, no depth

DO build with:
- ✅ Cormorant Garamond for all display headings — it reads luxury instantly
- ✅ Generous white space with intentional asymmetric layout
- ✅ Gold (#C9A96E) as the primary accent — warm, premium, intentional
- ✅ Every CTA has a purpose and a verb: "Book My Consultation →"
- ✅ Each scroll triggers a visual reward — something reveals, lifts, fades in
- ✅ The homepage should feel like opening a high-end magazine, not clicking into a clinic

---

## DEPLOYMENT

- Deploy on **Vercel** free tier
- Domain: connect to `refreshdental.co.za` or use `refreshdental.vercel.app` as prototype
- Share prototype link with Dr. Lebo before final handover

---

*Prompt prepared by Carter Digitals (Pty) Ltd — carterdigitals.co.za*
*CIPC Reg: 2025/907839/07 | Kabelo Kadiaka | kadiakakabelo4@gmail.com*
