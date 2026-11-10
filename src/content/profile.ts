import type { Milestone } from "./types"

/**
 * Identity, positioning and contact. Every claim here is traceable to the
 * November 2026 CV or the LinkedIn profile — if it is not on one of those,
 * it is not here.
 */
export const profile = {
  name: "Scotch Ajison",
  initials: "SA",

  /** The LinkedIn headline, trimmed to something a page can carry. */
  role: "GIS Systems Architect",
  roleLong: "Software engineer and GIS systems architect",

  location: "Harare, Zimbabwe",
  timezone: "UTC+2",
  /** Harare is UTC+2 year-round, the same as CEST: a full working day with Europe. */
  timezoneNote: "UTC+2, a full working day of overlap with CET/CEST",
  coordinates: { lat: -17.8252, lng: 31.0335, label: "17°49′S 31°03′E" },

  email: "sajison71@gmail.com",
  phone: "+263 775 487 452",

  socials: {
    github: "https://github.com/scotch-ajison",
    linkedin: "https://www.linkedin.com/in/scotch-ajison-b16253229",
  },

  /**
   * The headline claim. The only approved form of the eCadastre and
   * mortgage sentence: architect *on the team*, never sole author.
   */
  pitch:
    "I build the spatial systems that land registries, banks and regulators run on.",

  summary:
    "Six years building production systems, specialising in API integration, systems integration and payment systems. I connect land registers, banks, regulators and payment networks so records and money move between them without re-keying. Everything I have shipped runs in production under daily operational load.",

  bio: [
    "I trained as a surveying engineer at the University of Zimbabwe, which is why I think in error budgets, ground truth and validation samples rather than in demos. Almost every hard problem — land rights, lending, flood response, infrastructure planning — has a geography to it, and most of the difficulty is not the analysis. It is reconciling identifiers and trusting the data underneath.",
    "That became a career architecting the systems Zimbabwe's institutions now run on. I was the GIS systems architect on the team that delivered the national electronic cadastre, and on the team behind the first GIS-driven mortgage platform in Zimbabwean banking. Both are live and in daily use. I did not build either alone, and neither is mine — but the spatial architecture on both was my work.",
    "My own projects are where I get to be exact about what is and is not true. A QGIS plugin that packs a multi-gigabyte orthomosaic into one shareable file. A crop-disease pipeline where the vision model is forbidden from naming a disease and a build-time validator fails the build if an output recommends a banned pesticide. A building-change record for one Harare suburb that reports, in its own README, the one thing it cannot detect.",
  ],

  availability:
    "Open to full-time or contract roles, remote on UTC+2 or with relocation.",

  credentials: [
    "BSc (Hons) Geoinformatics & Surveying Engineering — University of Zimbabwe, Upper Second Class (2.1)",
    "Esri ArcGIS Advanced Certificate",
    "OpenStreetMap contributor — YouthMappers, UZ",
  ],

  /** Aligned to the CV and LinkedIn dates. */
  experience: [
    {
      company: "Technical Systems Pvt Ltd",
      role: "Lead Software Developer",
      period: "Apr 2022 — Present",
      location: "Harare, Zimbabwe",
      summary:
        "Lead developer on geospatial systems for national institutions, banks and regulators.",
      points: [
        "GIS systems architect on the team that delivered Zimbabwe's national electronic cadastre, live in production",
        "On the team behind the first GIS-driven mortgage platform in Zimbabwean banking",
        "Automated survey and parcel workflows that had been manual — bulk ingest, geometric and topological validation, QA/QC at national scale, so examiners work from exceptions",
        "Three geospatial applications in production at POTRAZ, and a GIS management system for the Lesotho Meteorological Services Department",
        "Architecture, code review and team standards; trained the client staff who run the systems",
      ],
    },
    {
      company: "GeoHub Pvt Ltd",
      role: "GIS Specialist",
      period: "Jan 2022 — Apr 2022",
      location: "Harare, Zimbabwe",
      summary:
        "Mapped artisanal and small-scale mining across eight countries in East, Central and Southern Africa for an ECSA Health Community study.",
      points: [
        "Harmonised inconsistent national datasets into one cross-border layer for analysis",
      ],
    },
    {
      company: "Allied Systems",
      role: "GIS Specialist & IT Technician",
      period: "Jan 2020 — Sep 2021",
      location: "Harare, Zimbabwe",
      summary: "Esri distributor. Nearly two years across deployment and support.",
      points: [
        "Deployed GIS-enabled geodatabases across more than ten rural district councils for the Zimbabwe Resilience Building Fund, and trained council staff to run them unaided",
        "Built COVID-19 case-analysis maps and reporting dashboards for the Ministry of Health and Child Care",
        "Installed and configured GIS software on client servers and ran front-line support",
      ],
    },
  ],

  skills: [
    {
      group: "Spatial data",
      items: [
        "PostGIS / PostgreSQL",
        "GeoDjango",
        "GeoServer (WMS/WFS)",
        "GDAL / OGR",
        "QGIS & PyQGIS",
        "GeoPackage, GeoParquet, PMTiles, COG",
      ],
    },
    {
      group: "Engineering",
      items: [
        "Python",
        "Django & DRF",
        "TypeScript",
        "SQL & query tuning",
        "pytest",
        "Linux deployment",
      ],
    },
    {
      group: "Imagery & analysis",
      items: [
        "Sentinel-2 & multi-temporal change detection",
        "Google Earth Engine",
        "NDVI / spectral indices",
        "Zonal statistics",
        "Land-cover classification",
        "Drone orthomosaic processing",
      ],
    },
    {
      group: "Applied AI",
      items: [
        "Vision-language pipelines (Claude API)",
        "RAG corpus design",
        "BM25 & two-stage retrieval",
        "Evaluation harnesses",
        "Output safety validators",
      ],
    },
    {
      group: "Interfaces",
      items: ["OpenLayers", "Leaflet", "MapLibre GL", "CesiumJS", "React & Next.js"],
    },
  ],

  milestones: [
    { year: "2017", label: "BSc Geoinformatics & Surveying — University of Zimbabwe" },
    { year: "2020", label: "Allied Systems — GIS geodatabases across 10+ rural district councils" },
    { year: "2020", label: "COVID-19 case-analysis dashboards — Ministry of Health and Child Care" },
    { year: "2021", label: "BSc completed — Upper Second Class (2.1)" },
    { year: "2022", label: "Artisanal mining mapped across eight countries — GeoHub / ECSA" },
    { year: "2022", label: "Technical Systems — GIS systems architect, national eCadastre" },
    { year: "2023", label: "First GIS-driven mortgage platform in Zimbabwean banking goes live" },
    { year: "2026", label: "Field Pack v0.1 — QGIS plugin published, MIT" },
    { year: "2026", label: "Crop-disease diagnosis pipeline — 281-condition corpus, published" },
  ] satisfies Milestone[],
} as const

export type Profile = typeof profile
