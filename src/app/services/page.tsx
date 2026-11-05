import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Services",
  description:
    "GIS system architecture, drone data processing, spatial data consulting, and AI + GIS research collaboration.",
}

const services = [
  {
    number: "01",
    title: "GIS System Architecture & Development",
    description:
      "Full lifecycle design and development of enterprise GIS platforms. From database architecture and spatial data modelling to frontend map interfaces and system integrations.",
    audience: "Government agencies, banks, NGOs needing custom GIS systems",
    deliverables: [
      "Spatial database design (PostGIS/PostgreSQL)",
      "Backend development (GeoDjango/Python)",
      "Frontend map interfaces (OpenLayers/Leaflet)",
      "API integrations (REST, SOAP, payment gateways)",
      "CI/CD deployment and maintenance pipelines",
    ],
  },
  {
    number: "02",
    title: "Drone Data Processing & GIS Integration",
    description:
      "Processing drone imagery into actionable GIS layers — orthomosaics, DEMs, point clouds, spatial databases. Bridging the gap between drone operators and GIS systems.",
    audience: "Survey firms, environmental agencies, agricultural businesses",
    deliverables: [
      "Drone imagery → orthomosaics and DEMs",
      "Point cloud generation and processing",
      "Integration into existing GIS databases",
      "Custom processing pipelines (OpenDroneMap)",
      "Field data collection workflow design",
    ],
  },
  {
    number: "03",
    title: "Spatial Data Consulting",
    description:
      "Audit existing spatial data infrastructure. Recommend improvements. Help organizations understand and leverage their geographic data assets.",
    audience: "Organizations with GIS data but no clear strategy",
    deliverables: [
      "Spatial data infrastructure audit",
      "Data quality assessment and cleanup",
      "SDI strategy and roadmap development",
      "OGC standards implementation",
      "Team training and capacity building",
    ],
  },
  {
    number: "04",
    title: "AI + GIS Research Collaboration",
    description:
      "Partner with research institutions, NGOs, or tech companies on spatial ML projects — land classification, change detection, anomaly detection from imagery.",
    audience: "Research institutions, international development organizations",
    deliverables: [
      "Spatial ML model development (land use classification)",
      "Satellite/drone image analysis pipelines",
      "Research collaboration and co-authorship",
      "Proof-of-concept development",
      "Technical advisory and mentorship",
    ],
  },
]

const engagementModels = [
  {
    type: "Project-Based",
    desc: "Scoped deliverables, fixed timeline. Best for defined systems and platforms.",
  },
  {
    type: "Retainer",
    desc: "Ongoing technical advisory. Best for organizations needing regular GIS support.",
  },
  {
    type: "Research Collaboration",
    desc: "Co-authorship, grant-funded work. Best for institutions and academic partnerships.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ─── HEADER ── Dark section with 3D grid ─────────── */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase mb-6">
              Services
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-fg tracking-tight leading-[1.05] max-w-4xl">
              Spatial systems built with{" "}
              <span className="gradient-text">precision and purpose</span>.
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed mt-6 max-w-2xl">
              I take on a limited number of consultancy projects — focused on
              work where deep GIS expertise makes the difference between a good
              system and one that actually works at scale.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SERVICES ── Light section ───────────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.number} delay={i * 0.06}>
              <div
                className={`py-14 md:py-20 ${
                  i < services.length - 1
                    ? "border-b border-border-on-light"
                    : ""
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-violet font-medium">
                        {s.number}
                      </span>
                      <span className="h-px w-4 bg-border-on-light" />
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-fg-on-light tracking-tight leading-tight">
                      {s.title}
                    </h2>
                    <p className="text-fg-muted-on-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="space-y-8 md:pt-8">
                    <div className="space-y-3">
                      <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                        Deliverables
                      </p>
                      <ul className="space-y-2.5">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex gap-3 text-sm text-fg-muted-on-light"
                          >
                            <span className="w-1 h-1 rounded-full bg-violet mt-2 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                        Best For
                      </p>
                      <p className="text-sm text-fg-on-light/70 italic">
                        {s.audience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── ENGAGEMENT + CTA ── Dark section ────────────── */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase mb-10">
              Engagement Model
            </p>
          </ScrollReveal>

          <div className="border-t border-border-strong">
            {engagementModels.map((m, i) => (
              <ScrollReveal key={m.type} delay={i * 0.06}>
                <div className="border-b border-border py-7 md:py-9 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-12">
                  <h3 className="font-display font-semibold text-lg md:text-xl text-fg tracking-tight shrink-0">
                    {m.type}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed max-w-lg flex-1">
                    {m.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-24 md:mt-32 text-center space-y-5">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-fg tracking-tight leading-tight">
                Ready to discuss your project?
              </h2>
              <p className="text-fg-muted text-lg max-w-md mx-auto leading-relaxed">
                I respond to all serious inquiries within 48 hours.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block bg-amber text-black font-display font-bold text-sm px-8 py-4 rounded-full
                    hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200
                    shadow-[0_0_24px_rgba(255,159,10,0.25)]"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
