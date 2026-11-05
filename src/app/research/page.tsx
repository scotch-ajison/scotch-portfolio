import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Active research in drone photogrammetry, AI-powered spatial analysis, and spatial data infrastructure for developing economies.",
}

const researchAreas = [
  {
    number: "01",
    title: "Drone AI Models & Computer Vision",
    status: "Active Research",
    quote:
      "A drone is a data capture machine. The intelligence has to come after the flight — in the models that can look at raw imagery and extract buildings, boundaries, land cover, and change without a human reviewing every frame.",
    exploring: [
      "Training object detection models on drone orthomosaics for automated feature extraction",
      "Semantic segmentation of informal settlements: building footprints, roads, vegetation",
      "Change detection between multi-temporal drone surveys using CNN architectures",
      "Drone-to-GIS pipeline design: raw imagery → point clouds → classified PostGIS layers",
      "Low-cost drone photogrammetry for post-flood damage assessment in Zimbabwe",
    ],
    tools: [
      "YOLOv8 / Ultralytics",
      "TensorFlow / Keras",
      "OpenDroneMap (ODM)",
      "WebODM",
      "QGIS Photogrammetry Plugins",
      "CAAZ Certification (in progress)",
    ],
    output:
      "Automated Building Footprint Extraction from Drone Orthomosaics Using Semantic Segmentation — Harare Informal Settlements",
  },
  {
    number: "02",
    title: "GeoAI & Spatial Machine Learning",
    status: "Active Research",
    quote:
      "Geography is the hidden variable in almost every machine learning problem. GeoAI is what happens when you stop treating location as just a feature column and start baking spatial relationships directly into the model architecture.",
    exploring: [
      "Spatially-aware ML: integrating spatial autocorrelation and topology into model training",
      "Land use / land cover classification from Sentinel-2 multispectral imagery",
      "Illegal artisanal mining detection from multi-temporal satellite imagery in southern Africa",
      "Crop stress and yield prediction for smallholder farmers using NDVI time-series",
      "Spatial prediction models for property valuation in markets with sparse ground-truth data",
    ],
    tools: [
      "Python (scikit-learn, TensorFlow, PyTorch)",
      "Google Earth Engine",
      "ESA Copernicus / Sentinel Hub",
      "NASA ARSET",
      "QGIS ML Plugins",
      "PostGIS spatial joins",
    ],
    output:
      "Land Use Classification Model for Peri-Urban Zimbabwe Using Sentinel-2 Imagery and Spatial CV",
  },
  {
    number: "03",
    title: "Digital Twins & Spatial Simulation",
    status: "Active Research",
    quote:
      "A digital twin isn't a 3D model of a city — it's a living, queryable replica that ingests real-world sensor data, simulates scenarios, and surfaces decisions. For developing economies where physical infrastructure is under-instrumented, building that twin from drone data and community surveys is the challenge.",
    exploring: [
      "Urban digital twin architectures for African cities: data sources, update cadence, and governance",
      "Integrating drone surveys, OSM data, and IoT sensors into a unified spatial twin",
      "Flood simulation and infrastructure risk modelling using digital elevation models from drone data",
      "Land administration digital twins: linking cadastral, valuation, and infrastructure layers",
      "Real-time spatial data pipelines: drone imagery → cloud processing → live GIS layers",
    ],
    tools: [
      "CesiumJS / 3D Tiles",
      "PostGIS + TimescaleDB",
      "OpenDroneMap",
      "QGIS 3D",
      "GeoNode",
      "OGC SensorThings API",
    ],
    output:
      "Digital Twin Framework for Urban Land Administration in Sub-Saharan Africa: A Harare Case Study",
  },
]

export default function ResearchPage() {
  return (
    <>
      {/* ─── HEADER ── Dark section with 3D network ───────── */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase mb-6">
              Research
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-fg tracking-tight leading-[1.05] max-w-4xl">
              Areas I&apos;m actively{" "}
              <span className="gradient-text">exploring</span>.
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed mt-6 max-w-2xl">
              This isn&apos;t a list of services I&apos;m selling. It&apos;s an
              honest account of where I&apos;m investing my time and
              intellectual energy — the frontier where drone data, machine
              learning, and spatial systems converge.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── RESEARCH AREAS ── Light section ─────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          {researchAreas.map((area, i) => (
            <ScrollReveal key={area.number} delay={i * 0.08}>
              <article
                className={`py-16 md:py-20 ${
                  i < researchAreas.length - 1
                    ? "border-b border-border-on-light"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-violet font-medium">
                      {area.number}
                    </span>
                    <span className="h-px w-4 bg-border-on-light" />
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet">
                      {area.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-display font-bold text-3xl md:text-4xl text-fg-on-light tracking-tight leading-tight mb-6">
                  {area.title}
                </h2>

                <blockquote className="border-l-2 border-violet/40 pl-5 mb-10">
                  <p className="text-fg-muted-on-light text-sm italic leading-relaxed max-w-3xl">
                    {area.quote}
                  </p>
                </blockquote>

                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
                  <div className="space-y-3">
                    <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                      What I&apos;m Exploring
                    </p>
                    <ul className="space-y-3">
                      {area.exploring.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm text-fg-muted-on-light leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-violet mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                        Tools & Reading
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[11px] px-2.5 py-[3px] rounded-[6px] bg-white/60 border border-border-on-light text-fg-muted-on-light"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {area.output && (
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                          Planned Output
                        </p>
                        <p className="text-sm text-fg-on-light/70 italic leading-relaxed">
                          &ldquo;{area.output}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ── Dark section ─────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-5">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-fg tracking-tight leading-tight">
                Interested in research collaboration?
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed">
                I&apos;m open to co-research, grant-funded projects, and
                partnerships with institutions working at the intersection of
                GIS, drones, and AI.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block bg-amber text-black font-display font-bold text-sm px-8 py-4 rounded-full
                    hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200
                    shadow-[0_0_24px_rgba(255,159,10,0.25)]"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
