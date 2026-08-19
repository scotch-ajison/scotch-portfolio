import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import StackTag from "@/components/StackTag"
import HeroContent from "@/components/HeroContent"

/* ─── Data ───────────────────────────────────────────────── */

const clients = [
  "Commercial Bank of Zimbabwe",
  "Dept. of the Surveyor General",
  "Ministry of Agriculture",
  "SADC — 8 Countries",
  "POTRAZ",
  "Telecel Zimbabwe",
  "Senlis Consultancy",
  "GeoHub Pvt Ltd",
  "Allied Systems",
  "University of Zimbabwe",
]

const featuredProjects = [
  {
    number: "01",
    title: "CBZ GIS Mortgage System",
    client: "Commercial Bank of Zimbabwe",
    scope: "National Banking · Live in Production",
    impact: "First GIS-driven fintech system in Zimbabwe banking",
    live: true,
    summary:
      "End-to-end digital mortgage applications with spatial property evaluation, valuation workflows, and payment gateway integrations. Built on GeoDjango + PostGIS.",
    url: "https://cbzmortgages.cbz.co.zw",
    tags: [
      { label: "GeoDjango", variant: "violet" as const },
      { label: "PostGIS", variant: "violet" as const },
      { label: "OpenLayers", variant: "violet" as const },
      { label: "REST APIs", variant: "electric" as const },
    ],
  },
  {
    number: "02",
    title: "Zimbabwe eCadastre",
    client: "Dept. of the Surveyor General",
    scope: "National Land Records System",
    impact: "Replaced a paper-based national cadastral register with a queryable spatial system",
    live: true,
    summary:
      "Real-time spatial querying, geodesy module, and business rules engine for land approvals — replacing a paper-based national system.",
    url: "http://zimcadastre.co.zw",
    tags: [
      { label: "GeoDjango", variant: "violet" as const },
      { label: "PostGIS", variant: "violet" as const },
      { label: "PostgreSQL", variant: "electric" as const },
      { label: "Python", variant: "electric" as const },
    ],
  },
  {
    number: "03",
    title: "Land Information System",
    client: "Ministry of Agriculture",
    scope: "National Government · Lead Developer",
    impact: "Eliminated paper-based ministerial approval chains",
    live: false,
    summary:
      "Digitized the full land allocation workflow — from ministerial approval to field officer verification across the entire ministry.",
    url: null,
    tags: [
      { label: "GeoDjango", variant: "violet" as const },
      { label: "OpenLayers", variant: "violet" as const },
      { label: "React", variant: "amber" as const },
      { label: "PostGIS", variant: "violet" as const },
    ],
  },
]

const services = [
  {
    number: "01",
    title: "GIS System Architecture",
    desc: "Full lifecycle design and development of enterprise GIS platforms — from spatial database architecture to frontend map interfaces.",
  },
  {
    number: "02",
    title: "Drone Data Processing",
    desc: "Raw drone imagery into production GIS layers: orthomosaics, DEMs, point clouds, integrated into spatial databases.",
  },
  {
    number: "03",
    title: "Spatial Data Consulting",
    desc: "Audit existing spatial infrastructure. Recommend improvements. Help organizations leverage their geographic data assets.",
  },
  {
    number: "04",
    title: "AI + GIS Research",
    desc: "Partner on spatial ML projects — land classification, change detection, anomaly detection from satellite or drone imagery.",
  },
]

const experience = [
  {
    role: "Lead GIS Software Developer",
    company: "Technical Systems Pvt Ltd",
    period: "Apr 2022 — Present",
    current: true,
    description:
      "GIS systems architect on the teams that delivered 6+ national-scale systems now live in production — mortgage finance, the Zimbabwe eCadastre, Land Information System, Lesotho Meteorological GIS, and three POTRAZ platforms.",
  },
  {
    role: "GIS Consultant",
    company: "Senlis Consultancy",
    period: "Ad hoc",
    current: false,
    description:
      "Remote sensing engagements — processing and digitizing drone imagery post-flight during peak workload periods.",
  },
  {
    role: "GIS Specialist",
    company: "GeoHub Pvt Ltd",
    period: "Jan 2022 — Apr 2022",
    current: false,
    description:
      "Cross-border artisanal mining mapping across 8 SADC countries for the ECSA Health Community project.",
  },
  {
    role: "GIS Specialist",
    company: "Allied Systems, Harare",
    period: "Jan 2020 — Sep 2021",
    current: false,
    description:
      "ESRI distributor. Deployed GIS databases across 10+ rural district councils, built COVID-19 dashboards for the Ministry of Health, and trained users on ArcGIS workflows.",
  },
]

const researchAreas = [
  { label: "GeoAI & Spatial ML", color: "violet" },
  { label: "Digital Twins", color: "electric" },
  { label: "Drone AI Models", color: "amber" },
]

/* ─── Page ───────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────── */}
      <HeroContent />

      {/* ─── CLIENT MARQUEE ─────────────────────────────── */}
      <div className="border-y border-border bg-surface/60 overflow-hidden py-3.5">
        <div
          className="flex items-center w-max"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-mono text-[10px] text-fg-subtle/50 tracking-[0.18em] uppercase whitespace-nowrap px-6">
                {c}
              </span>
              <span className="text-border-strong text-xs">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CREDENTIALS ── Light section ──────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-0 md:pt-28">

          {/* Pull quote */}
          <ScrollReveal>
            <div className="max-w-3xl mb-16 md:mb-20">
              <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase mb-5">
                About
              </p>
              <blockquote className="font-display font-bold text-2xl md:text-3xl text-fg-on-light tracking-tight leading-[1.2]">
                &ldquo;Almost every problem — land rights, mortgage lending,
                investment solutions — has a spatial intelligence to it. If you
                can see it spatially, you can solve it faster.&rdquo;
              </blockquote>
              <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider mt-4">
                — Scotch Ajison, GIS Systems Developer, Harare
              </p>
            </div>
          </ScrollReveal>

          {/* Stats grid */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border-on-light">
              {[
                { value: "5+", label: "Years Experience", sub: "Building in production" },
                { value: "6", label: "National Systems", sub: "Gov't & financial sector" },
                { value: "SADC", label: "Regional Reach", sub: "8 countries covered" },
                { value: "Live", label: "In Production", sub: "Real infrastructure" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`py-10 md:py-12 ${
                    i < 3 ? "md:border-r border-border-on-light" : ""
                  } ${i % 2 === 0 ? "border-r border-border-on-light md:border-0 md:border-r" : ""} ${
                    i < 2 ? "border-b border-border-on-light md:border-b-0" : ""
                  } px-0 md:px-8 first:pl-0`}
                >
                  <p className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-fg-on-light tracking-tight leading-none">
                    {s.value}
                  </p>
                  <p className="font-mono text-[11px] text-fg-muted-on-light tracking-[0.18em] uppercase mt-3">
                    {s.label}
                  </p>
                  <p className="text-xs text-fg-muted-on-light/60 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Experience */}
        <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
          <div className="border-t border-border-on-light pt-14 md:pt-18">
            <ScrollReveal>
              <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase mb-10">
                Experience
              </p>
            </ScrollReveal>

            <div className="border-t border-border-on-light">
              {experience.map((e, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="border-b border-border-on-light py-7 md:py-9 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-16">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-semibold text-lg md:text-xl text-fg-on-light tracking-tight">
                          {e.role}
                        </h3>
                        {e.current && (
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-fg-muted-on-light mb-3">{e.company}</p>
                      <p className="text-sm text-fg-muted-on-light leading-relaxed max-w-2xl">
                        {e.description}
                      </p>
                    </div>
                    <div className="shrink-0 md:text-right">
                      <span className="font-mono text-sm text-fg-muted-on-light whitespace-nowrap">
                        {e.period}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORK ── Dark section ─────────────── */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6">

          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-3">
                <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase">
                  Selected Work
                </p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-fg tracking-tight leading-[1.05]">
                  National-scale systems.
                  <br />
                  <span className="text-fg-muted">Live in production.</span>
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-fg-muted
                  hover:text-electric transition-colors shrink-0 pb-1 group"
              >
                All 6 projects{" "}
                <span className="text-violet group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Hero project card */}
          <ScrollReveal>
            <div className="group relative bg-surface-elevated rounded-[24px] p-8 md:p-12 mb-5 border border-border overflow-hidden
              hover:border-violet/30 hover:shadow-[0_0_80px_rgba(124,58,255,0.1)] transition-all duration-500">

              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124,58,255,0.05), transparent)" }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-sm font-medium text-violet">
                    {featuredProjects[0].number}
                  </span>
                  <span className="h-px w-4 bg-border-strong" />
                  <span className="font-mono text-[11px] text-fg-subtle tracking-wider uppercase">
                    {featuredProjects[0].client}
                  </span>
                  {featuredProjects[0].live && (
                    <span className="ml-auto flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                      </span>
                      <span className="font-mono text-[11px] text-success/70">Live</span>
                    </span>
                  )}
                </div>

                {/* Impact callout */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric/8 border border-electric/15 mb-6">
                  <span className="w-1 h-1 rounded-full bg-electric shrink-0" />
                  <span className="font-mono text-[11px] text-electric/80 tracking-wide">
                    {featuredProjects[0].impact}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.3fr,1fr] gap-8 md:gap-16">
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-fg tracking-tight leading-[1.05]">
                      {featuredProjects[0].title}
                    </h3>
                    <p className="font-mono text-[11px] text-electric/70">
                      {featuredProjects[0].scope}
                    </p>
                  </div>
                  <div className="space-y-5 md:pt-2">
                    <p className="text-fg-muted leading-relaxed">
                      {featuredProjects[0].summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredProjects[0].tags.map((t) => (
                        <StackTag key={t.label} label={t.label} variant={t.variant} />
                      ))}
                    </div>
                    {featuredProjects[0].url && (
                      <a
                        href={featuredProjects[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted
                          bg-surface border border-border-strong px-4 py-2 rounded-full
                          hover:text-electric hover:border-electric/30 transition-all"
                      >
                        Visit live <span className="text-sm leading-none">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Secondary project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredProjects.slice(1).map((p, i) => (
              <ScrollReveal key={p.number} delay={(i + 1) * 0.1}>
                <div className="group relative bg-surface-elevated rounded-[24px] p-8 md:p-10 h-full flex flex-col border border-border overflow-hidden
                  hover:border-violet/25 hover:shadow-[0_0_48px_rgba(124,58,255,0.08)] transition-all duration-500">

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                    style={{ background: "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(124,58,255,0.04), transparent)" }}
                  />

                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-sm font-medium text-violet">{p.number}</span>
                      <span className="h-px w-4 bg-border-strong" />
                      <span className="font-mono text-[11px] text-fg-subtle tracking-wider uppercase">{p.client}</span>
                      {p.live && (
                        <span className="ml-auto flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                          </span>
                          <span className="font-mono text-[11px] text-success/70">Live</span>
                        </span>
                      )}
                    </div>

                    {/* Impact callout */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet/8 border border-violet/15 mb-5 self-start">
                      <span className="w-1 h-1 rounded-full bg-violet shrink-0" />
                      <span className="font-mono text-[10px] text-violet/80 tracking-wide">{p.impact}</span>
                    </div>

                    <h3 className="font-display font-bold text-2xl md:text-3xl text-fg tracking-tight leading-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[11px] text-electric/70 mb-4">{p.scope}</p>
                    <p className="text-fg-muted text-sm leading-relaxed mb-5 flex-1">{p.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.map((t) => (
                        <StackTag key={t.label} label={t.label} variant={t.variant} />
                      ))}
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted
                          bg-surface border border-border-strong px-4 py-2 rounded-full w-fit
                          hover:text-electric hover:border-electric/30 transition-all"
                      >
                        Visit live <span className="text-sm leading-none">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-8 md:hidden">
            <Link href="/work" className="text-sm font-medium text-fg-muted hover:text-fg transition-colors">
              All 6 projects <span className="text-violet ml-1">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── RESEARCH ── Light section ──────────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-10 md:gap-20 items-start">
              <div className="space-y-6">
                <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase">
                  Research & Emerging Work
                </p>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-fg-on-light tracking-tight leading-[1.05]">
                  The next frontier of
                  <br />
                  spatial intelligence.
                </h2>
                <div className="flex flex-wrap gap-2 pt-2">
                  {researchAreas.map(({ label, color }) => (
                    <span
                      key={label}
                      className={`font-mono text-[11px] px-4 py-2 rounded-full border font-medium
                        ${color === "violet" ? "border-violet/25 text-violet bg-violet/5" : ""}
                        ${color === "electric" ? "border-electric/25 text-electric/80 bg-electric/5" : ""}
                        ${color === "amber" ? "border-amber/25 text-amber bg-amber/5" : ""}
                      `}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet hover:opacity-80 transition-opacity group"
                >
                  Explore the research{" "}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
              <div className="space-y-5 md:pt-3">
                <p className="text-fg-muted-on-light leading-relaxed text-base">
                  Beyond traditional GIS — actively building drone AI pipelines,
                  spatially-aware machine learning models, and digital twin
                  frameworks for cities in the developing world.
                </p>
                <p className="text-fg-muted-on-light leading-relaxed text-base">
                  The research agenda sits at the intersection of geography,
                  computer vision, and real-world spatial data infrastructure —
                  where the gaps are biggest and the impact is highest.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SERVICES ── Dark section ───────────────────── */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-4 space-y-4">
              <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase">
                Capabilities
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="font-display font-bold text-4xl md:text-5xl text-fg tracking-tight leading-[1.05]">
                  Deep GIS expertise,
                  <br />
                  <span className="text-fg-muted">applied to your problem.</span>
                </h2>
                <Link
                  href="/services"
                  className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors shrink-0 pb-1 group"
                >
                  Full overview{" "}
                  <span className="text-violet group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="border-t border-border-strong mt-10">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <div className="group border-b border-border py-8 md:py-10 flex gap-5 md:gap-10 items-start
                  hover:bg-surface/40 -mx-6 px-6 transition-colors duration-200 rounded-lg cursor-default">
                  <span className="font-mono text-sm text-fg-subtle/40 shrink-0 pt-1 w-8">{s.number}</span>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-fg tracking-tight group-hover:text-violet transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-fg-muted leading-relaxed max-w-2xl">{s.desc}</p>
                  </div>
                  <span className="text-fg-subtle/30 group-hover:text-violet/50 transition-colors duration-300 text-lg pt-0.5 shrink-0 hidden md:block">
                    →
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-8 md:hidden">
            <Link href="/services" className="text-sm font-medium text-fg-muted hover:text-fg transition-colors">
              Full services overview <span className="text-violet ml-1">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CLOSING CTA ── Light section ───────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="space-y-5">
                <p className="font-mono text-[11px] text-fg-muted-on-light tracking-[0.2em] uppercase">
                  Work with me
                </p>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-fg-on-light tracking-tight leading-[1.0]">
                  Have a spatial
                  <br />
                  problem worth
                  <br />
                  solving?
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-fg-muted-on-light text-lg leading-relaxed">
                  I take on a limited number of consultancy projects each year —
                  focused on work where deep GIS expertise makes the difference.
                  If you have a spatial challenge, let&apos;s talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="bg-fg-on-light text-bg-light font-display font-bold text-sm px-8 py-4 rounded-full
                      hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 text-center"
                  >
                    Start a Conversation
                  </Link>
                  <Link
                    href="/services"
                    className="text-sm font-medium px-8 py-4 rounded-full border border-border-on-light text-fg-on-light
                      hover:border-violet transition-all duration-200 text-center"
                  >
                    View Services
                  </Link>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  <span className="font-mono text-[11px] text-fg-muted-on-light tracking-wide">
                    Responds within 48 hours · sajison71@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
