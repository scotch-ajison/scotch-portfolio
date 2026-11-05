import type { Metadata } from "next"
import { Inter, Inter_Tight, JetBrains_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import MotionProvider from "@/components/MotionProvider"
import { siteUrl, siteName } from "@/lib/site"
import { profile } from "@/content/profile"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
})

const description =
  "GIS systems architect in Harare. I build the spatial systems that land registries, banks and regulators run on — PostGIS, GeoDjango, GeoServer — and the applied AI on top of them."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "GIS systems architect",
    "GeoDjango developer",
    "PostGIS developer",
    "GeoServer",
    "spatial data engineer",
    "remote sensing engineer",
    "GIS consultant Zimbabwe",
    "geospatial software engineer Africa",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        jobTitle: profile.role,
        email: `mailto:${profile.email}`,
        description,
        sameAs: [profile.socials.github, profile.socials.linkedin],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Zimbabwe",
        },
        knowsAbout: [
          "Geographic Information Systems",
          "Spatial Data Infrastructure",
          "PostGIS",
          "GeoDjango",
          "GeoServer",
          "Remote Sensing",
          "Retrieval-Augmented Generation",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Harare",
          addressCountry: "ZW",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en",
      },
    ],
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
