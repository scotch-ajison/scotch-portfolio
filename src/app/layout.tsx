import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import MotionProvider from "@/components/MotionProvider"
import { siteUrl, siteName } from "@/lib/site"
import { profile } from "@/content/profile"

/**
 * Fonts are self-hosted, not fetched from Google at build time.
 *
 * `next/font/google` + Turbopack fails this build with "next/font/google
 * queries have exactly one entry" — the generated CSS carries several
 * src entries per face and Turbopack's font import map cannot resolve
 * them. It broke a Vercel deploy and reproduced locally.
 *
 * Self-hosting removes the failure mode entirely, drops a third-party
 * connection from the critical path, and keeps the build hermetic. These
 * are the latin-subset variable files, so one file covers every weight.
 */
const inter = localFont({
  src: "../fonts/inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
})

const interTight = localFont({
  src: "../fonts/inter-tight.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
})

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
})

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
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
        {/* Reveal elements start at opacity 0 and are animated in by JS.
            Without it, everything below the hero would never appear. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
