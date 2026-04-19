import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Serif_Display, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Refresh Dental — Premium Dental Care in Centurion | Dr. Lebogang Malunga",
  description:
    "Experience premium dental care in Centurion. Dr. Lebogang Malunga offers cosmetic dentistry, dental implants, teeth whitening, and more. Book your consultation today.",
  keywords: [
    "dentist Centurion",
    "dental implants Centurion",
    "teeth whitening Centurion",
    "Dr Lebogang Malunga",
    "cosmetic dentistry Pretoria",
    "Refresh Dental",
    "female dentist Centurion",
    "dental fillers",
    "clear aligners",
  ],
  authors: [{ name: "Refresh Dental" }],
  icons: {
    icon: "https://static.wixstatic.com/media/a78f12_d8df1e87d3a1425a86b2e603d0ede665~mv2.jpg",
  },
  openGraph: {
    title: "Refresh Dental — Premium Dental Care in Centurion",
    description:
      "Your Smile, Refreshed. Revived. Premium dental care by Dr. Lebogang Malunga in Centurion, Pretoria.",
    url: "https://www.refreshdental.co.za",
    siteName: "Refresh Dental",
    type: "website",
    images: [
      {
        url: "https://static.wixstatic.com/media/11062b_8cab6b1dddd5426b8711228584424419~mv2.jpg",
        width: 1200,
        height: 630,
        alt: "Refresh Dental — Premium Dental Care",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Refresh Dental",
              description:
                "Premium dental care in Centurion by Dr. Lebogang Malunga",
              address: {
                "@type": "PostalAddress",
                streetAddress: "153 River Road",
                addressLocality: "Centurion",
                addressRegion: "Pretoria",
                postalCode: "0157",
                addressCountry: "ZA",
              },
              telephone: "+27614164649",
              url: "https://www.refreshdental.co.za",
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "3",
              },
              founder: {
                "@type": "Person",
                name: "Dr. Lebogang Malunga",
                jobTitle: "Principal Dentist",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSerif.variable} ${jost.variable} antialiased bg-ivory text-espresso`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
