import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.refreshdental.co.za'

  // Main sections as anchor URLs
  const sections = [
    '', '#about', '#services', '#team', '#testimonials',
    '#contact', '#financing', '#faq', '#technology', '#gallery'
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...sections.map(section => ({
      url: `${baseUrl}${section}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
