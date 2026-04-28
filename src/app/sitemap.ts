import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.refreshdental.co.za'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  return [
    /* ═══ Homepage — Highest priority ═══ */
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    /* ═══ Service-specific anchor URLs (GEO: helps AI link to sections) ═══ */
    {
      url: `${SITE_URL}/#services`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#testimonials`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#team`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#technology`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#gallery`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#financing`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#emergency`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#smile-assessment`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
