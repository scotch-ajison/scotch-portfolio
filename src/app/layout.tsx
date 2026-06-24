import type { Metadata } from "next"
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import NavigationLoader from "@/components/NavigationLoader"
import AiChatBubble from "@/components/AiChatBubble"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
})

const siteUrl = "https://scotchajison.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Scotch Ajison — Spatial Intelligence Consultant",
    template: "%s | Scotch Ajison",
  },
  description:
    "GIS Systems Architect and Spatial Intelligence Consultant. I build the spatial systems governments and financial institutions rely on — and I'm designing the next generation using drones and AI.",
  keywords: [
    "GIS consultant Zimbabwe",
    "GIS software developer Africa",
    "drone GIS consultant SADC",
    "PostGIS developer Zimbabwe",
    "spatial data consultant Africa",
    "GeoDjango developer",
    "spatial systems architect",
  ],
  authors: [{ name: "Scotch Ajison", url: siteUrl }],
  creator: "Scotch Ajison",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scotch Ajison — Spatial Intelligence Consultant",
    description:
      "GIS Systems Architect building the spatial systems governments rely on — and designing the next generation with drones and AI.",
    type: "website",
    url: siteUrl,
    siteName: "Scotch Ajison",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scotch Ajison — Spatial Intelligence Consultant",
    description:
      "GIS Systems Architect building the spatial systems governments rely on — and designing the next generation with drones and AI.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Scotch Ajison",
        url: siteUrl,
        jobTitle: "GIS Systems Architect & Spatial Intelligence Consultant",
        description:
          "GIS Systems Architect building the spatial systems governments and financial institutions rely on — and designing the next generation with drones and AI.",
        knowsAbout: [
          "Geographic Information Systems",
          "Spatial Data Infrastructure",
          "PostGIS",
          "GeoDjango",
          "Drone Mapping",
          "Digital Twins",
          "Spatial AI",
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
        name: "Scotch Ajison",
        description:
          "Portfolio of Scotch Ajison — GIS Systems Architect and Spatial Intelligence Consultant.",
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en",
      },
    ],
  }

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NavigationLoader />
        <Nav />
        <main>{children}</main>
        <Footer />
        <AiChatBubble />
      </body>
    </html>
  )
}
