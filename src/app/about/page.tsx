import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import HeroGlobe from "@/components/three/HeroGlobeWrapper"

export const metadata: Metadata = {
  title: "About",
  description:
    "Scotch Ajison — GIS Software Engineer and Spatial Systems Architect from Zimbabwe with 5+ years building national-scale spatial systems.",
}

const milestones = [
  { year: "2018", label: "BSc Geoinformatics & Surveying — University of Zimbabwe" },
  { year: "2019", label: "President, UZ Mappers (OpenStreetMap community)" },
  { year: "2019", label: "ESRI ArcGIS Desktop Certification" },
  { year: "2021", label: "Lead Developer — Ministry of Agriculture Land IS" },
  { year: "2022", label: "GIS Systems Architect — Zimbabwe eCadastre System" },
  { year: "2022", label: "CBZ GIS Mortgage Finance System — Live in production" },
  { year: "2023", label: "SADC Artisanal Mining Mapping — 8 countries" },
  { year: "2024", label: "Drone data processing — Senlis Consultancy" },
  { year: "Now", label: "Active research: Drone photogrammetry & Spatial AI" },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* ─── HEADER with mini globe ──────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pb-16 overflow-hidden">
        {/* Decorative globe top-right */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{ top: "-60px", right: "-20px", width: "380px", height: "380px", opacity: 0.5 }}
        >
          <HeroGlobe />
        </div>
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(7,8,15,1) 45%, rgba(7,8,15,0.5) 75%, transparent 100%)",
          }}
        />

        <ScrollReveal>
          <p className="relative z-10 font-mono text-xs text-fg-subtle tracking-wider uppercase mb-4">About</p>
          <h1 className="relative z-10 font-display font-bold text-4xl md:text-5xl text-fg tracking-tight leading-[1.1] max-w-3xl">
            I build the spatial systems that
            <br />
            <span className="gradient-text">map reality</span> for institutions.
          </h1>
        </ScrollReveal>
      </section>

      {/* ─── STORY ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <p className="text-fg-muted leading-[1.75] text-base">
                I grew up in Zimbabwe, studied Geoinformatics at the University of Zimbabwe, and got
                obsessed with a simple idea: almost every problem — land rights, flood mapping,
                infrastructure planning, mortgage lending — has a geography to it. If you can see it
                spatially, you can solve it faster.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="text-fg-muted leading-[1.75] text-base">
                That obsession turned into a career architecting the GIS systems that Zimbabwe's
                government and financial institutions now run on. The eCadastre that replaced a paper
                national land register. The mortgage platform that lets a commercial bank evaluate
                properties spatially. The land information system that replaced paper-based ministerial
                approval chains. I was the systems architect on the teams that delivered them — and they
                aren't prototypes, they're live, national-scale production systems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <h2 className="font-display font-semibold text-xl text-fg tracking-tight pt-4">
                Why Drones
              </h2>
              <p className="text-fg-muted leading-[1.75] text-base mt-3">
                Drones close the gap between satellite imagery and ground truth. In places like
                Zimbabwe where addresses are informal and land records are paper-based, a drone can
                capture reality in hours. That fascinates me. I'm actively building drone-to-GIS
                pipelines — from raw imagery to point clouds to queryable PostGIS layers — and
                working toward my CAAZ piloting certification.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <h2 className="font-display font-semibold text-xl text-fg tracking-tight pt-4">
                Why AI
              </h2>
              <p className="text-fg-muted leading-[1.75] text-base mt-3">
                Manual digitization is slow. Pattern recognition in spatial data — identifying
                illegal mining, detecting crop stress, classifying land use — is where machine
                learning changes everything. The next leap in GIS isn't about better maps. It's
                about maps that think — detecting patterns, classifying land use, flagging anomalies
                without a human reviewing every pixel. I'm building toward that.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-surface border border-border rounded-[20px] p-6 space-y-4">
                <p className="font-mono text-xs text-fg-subtle tracking-wider uppercase">Credentials</p>
                <div className="space-y-3">
                  {[
                    "BSc Geoinformatics & Surveying — UZ",
                    "ESRI ArcGIS Desktop Certified",
                    "OSM Community Contributor",
                    "Driver's License (Field deployable)",
                  ].map((c) => (
                    <div key={c} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet mt-2 shrink-0" />
                      <span className="text-sm text-fg-muted">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="bg-surface border border-border rounded-[20px] p-6 space-y-4">
                <p className="font-mono text-xs text-fg-subtle tracking-wider uppercase">Core Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "GeoDjango", "PostGIS", "PostgreSQL", "Python",
                    "OpenLayers", "Leaflet", "React", "QGIS",
                    "GeoServer", "Linux", "Docker",
                  ].map((tech) => (
                    <span key={tech} className="font-mono text-[11px] px-2.5 py-[3px] rounded-[6px] bg-surface-elevated border border-border text-fg-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <div className="bg-surface border border-border rounded-[20px] p-6 space-y-4">
                <p className="font-mono text-xs text-fg-subtle tracking-wider uppercase">Currently Exploring</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "OpenDroneMap", "WebODM", "TensorFlow",
                    "scikit-learn", "Google Earth Engine",
                    "Copernicus", "GeoNode",
                  ].map((tech) => (
                    <span key={tech} className="font-mono text-[11px] px-2.5 py-[3px] rounded-[6px] bg-violet/5 border border-violet/15 text-violet/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <ScrollReveal>
            <p className="font-mono text-xs text-fg-subtle tracking-wider uppercase mb-10">Journey</p>
          </ScrollReveal>

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex gap-6 py-4 border-b border-border last:border-none group">
                  <span className="font-mono text-sm text-fg-subtle w-12 shrink-0 pt-0.5">
                    {m.year}
                  </span>
                  <span className="text-sm text-fg-muted group-hover:text-fg transition-colors duration-150">
                    {m.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
