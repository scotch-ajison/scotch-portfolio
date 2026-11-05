import type { Project } from "./types"

import ecadastrePortal from "@/assets/images/ecadastre-portal.webp"
import fieldPackStandalone from "@/assets/images/field-pack-standalone.webp"
import fieldPackPanel from "@/assets/images/field-pack-panel.webp"
import fieldPackBasemap from "@/assets/images/field-pack-basemap.webp"
import fieldPackSite from "@/assets/images/field-pack-site.webp"
import fieldPackRoad from "@/assets/images/field-pack-road.webp"
import fieldPackDemo from "@/assets/images/field-pack-demo.webp"
import wardDensity from "@/assets/images/ward-density.webp"
import opsHeatmap from "@/assets/images/ops-heatmap.webp"
import opsRecords from "@/assets/images/ops-records.webp"
import opsLanding from "@/assets/images/ops-landing.webp"
import opsDeployment from "@/assets/images/ops-deployment.webp"
import opsReporting from "@/assets/images/ops-reporting.webp"

/**
 * Every project on the site. Counts, the sitemap and the project map all
 * derive from this array — there is no second list anywhere.
 *
 * Rules this file holds itself to:
 *  · `role` says what he actually did. Never "I built" for team work.
 *  · `links.live` is only ever a URL that was checked and answered 200.
 *  · A claim a reader can check is either evidenced or absent.
 */
export const projects: Project[] = [
  {
    slug: "zimbabwe-ecadastre",
    order: 1,
    title: "Zimbabwe National eCadastre",
    role: "GIS systems architect and integrations lead, on the delivering team",
    period: "2022 — present",
    scale: "National land register",
    status: "live",
    disclosure: { kind: "named", client: "Department of the Surveyor General" },
    plate: { mark: "SG", caption: "Department of the Surveyor General" },
    links: { live: "http://zimcadastre.co.zw" },
    problem:
      "Zimbabwe's cadastral record was paper-based and fragmented. A surveyor lodging a diagram, an examiner checking it and a citizen searching a title were all working from different copies of the truth, and none of them could query it spatially. Worse, the registers that had to agree with each other — deeds, mining, the investment one-stop shop — had no way to talk at all.",
    approach:
      "A national digital cadastre: PostGIS geodatabases designed end to end, the statutory lodgement-to-examination workflow modelled in GeoDjango, geodesy control layers, and authoritative parcel layers published as OGC services through GeoServer and consumed in OpenLayers. Bulk ingest of legacy records with geometric and topological validation, so examiners work from exceptions rather than reading every submission. I designed and built every API, and the integrations that put the eCadastre in conversation with the Deeds system, the One Stop Shop and the Mining Cadastre.",
    outcome:
      "Live in production and in daily use by surveyors, examiners and the public, serving property search, e-maps, cadastral and geodetic services. I owned the spatial architecture — schema, validation rules and service layer — and the integration layer across four national registers, as part of a team of five-plus developers.",
    metrics: [
      { label: "Status", value: "Live", note: "In daily production use" },
      { label: "Integrations", value: "4 registers", note: "Deeds, One Stop Shop, Mining Cadastre" },
      { label: "APIs", value: "Designed & built", note: "The whole integration layer" },
    ],
    stack: [
      { label: "GeoDjango", variant: "violet" },
      { label: "PostGIS", variant: "violet" },
      { label: "GeoServer", variant: "violet" },
      { label: "REST APIs", variant: "electric" },
      { label: "System integration", variant: "violet" },
      { label: "OpenLayers", variant: "electric" },
    ],
    images: [
      {
        src: ecadastrePortal,
        alt: "The Zimbabwe eCadastre portal home page, showing the Government of Zimbabwe and Department of the Surveyor General branding and links to property search, e-maps, cadastral services and geodetic services.",
        caption: "The live portal — property search, e-maps, cadastral and geodetic services.",
      },
    ],
    location: { lat: -17.8252, lng: 31.0335, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-10-02",
  },

  {
    slug: "cbz-gis-mortgage",
    order: 2,
    title: "CBZ GIS Mortgage Platform",
    role: "GIS systems architect, on the delivering team",
    period: "2022 — 2023",
    scale: "National banking",
    status: "live",
    disclosure: { kind: "named", client: "Commercial Bank of Zimbabwe (CBZ)" },
    plate: { mark: "CBZ", caption: "Commercial Bank of Zimbabwe" },
    links: {},
    accessNote:
      "An internal banking platform — there is no public URL to link, and there should not be one.",
    problem:
      "Mortgage applications were paper-driven. A loan officer assessing a property had no way to see it spatially, and no path between a valuation and the bank's core systems that did not involve re-keying.",
    approach:
      "A GeoDjango and OpenLayers platform where a customer browses and evaluates properties on a map and applies against them directly, integrated with the bank's core banking, payment and SMS gateways over REST and SOAP.",
    outcome:
      "The first GIS-driven mortgage platform in Zimbabwean banking, live in production. End-to-end digital application, with spatial evaluation in the officer's workflow rather than beside it.",
    metrics: [
      { label: "Status", value: "Live", note: "In production" },
      { label: "First", value: "In ZW banking", note: "GIS-driven mortgage platform" },
    ],
    stack: [
      { label: "GeoDjango", variant: "violet" },
      { label: "PostGIS", variant: "violet" },
      { label: "OpenLayers", variant: "electric" },
      { label: "REST + SOAP", variant: "electric" },
    ],
    images: [],
    location: { lat: -17.8292, lng: 31.0522, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-08-19",
  },

  {
    slug: "drone-outreach-agent",
    order: 3,
    title: "Autonomous lead and outreach agent",
    role: "Author",
    period: "2026",
    scale: "Commercial drone operator",
    status: "live",
    disclosure: {
      kind: "anonymised",
      clientDescriptor: "A commercial drone-services company",
    },
    plate: { mark: "AI", caption: "Lead and outreach agent" },
    links: {},
    accessNote: "An internal system for a client — no public URL.",
    problem:
      "Leads arrived from a website form and a shared inbox, and were worked by hand. Follow-up depended on who happened to read the message, nobody could say who had been contacted or what had been promised, and a lead that went cold left no trace of why.",
    approach:
      "An agent that watches the inbox and the website's lead forms, identifies and enriches the prospect, drafts outreach, and writes every contact back to a record. The draft is built from retrieval over the company's own past email threads, so the tone is learned from what they actually send rather than described in a prompt — and it keeps improving as more correspondence lands. A separate prospecting pass goes looking for candidate clients the inbox never produced.",
    outcome:
      "Nothing leaves the building without a human approving it. The approval gate is the architecture, not a setting: the agent researches, drafts and queues, and a person decides. That is what makes it safe to point at real customers.",
    metrics: [
      { label: "Outbound", value: "Human-approved", note: "No message sends itself" },
      { label: "Tone", value: "Learned", note: "RAG over the company's own threads" },
      { label: "Record", value: "Every contact", note: "Logged against the customer" },
    ],
    stack: [
      { label: "Python", variant: "electric" },
      { label: "LLM agents", variant: "violet" },
      { label: "RAG", variant: "violet" },
      { label: "Email integration", variant: "electric" },
      { label: "Web scraping", variant: "amber" },
      { label: "Approval workflow", variant: "violet" },
    ],
    images: [],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-05",
  },

  {
    slug: "field-pack",
    order: 4,
    title: "Field Pack — orthomosaics without GIS",
    role: "Author. Open source, MIT",
    period: "2026",
    scale: "QGIS plugin + Python CLI",
    status: "live",
    disclosure: { kind: "self", client: "Own project" },
    links: { repo: "https://github.com/scotch-ajison/qgis-fieldpack" },
    problem:
      "Handing someone a 19 GB orthomosaic is not a file transfer problem, it is a software problem. The recipient needs QGIS, a server, or both — so in practice the survey never reaches the person who needed to look at it.",
    approach:
      "A headless Python library plus a thin QGIS dock that packs a project or an orthophoto — ECW and JP2 included — into one PMTiles archive with a MapLibre GL viewer that opens from the filesystem. GDAL is driven by subprocess rather than shipping a C++ tiler, and pmtiles is vendored into the plugin zip, so Windows installs cleanly.",
    outcome:
      "v0.1 shipped with an installable zip. The style translator never imports PyQGIS, so it tests in about a tenth of a second — which is why the suite is worth running.",
    metrics: [
      { label: "Tests", value: "200 pass", note: "14 skipped, 13 modules" },
      { label: "Licence", value: "MIT", note: "Public repository" },
      { label: "Qt6", value: "Ready", note: "QGIS 3.28 — 4.99" },
    ],
    stack: [
      { label: "PyQGIS", variant: "violet" },
      { label: "GDAL", variant: "violet" },
      { label: "PMTiles", variant: "electric" },
      { label: "MapLibre GL", variant: "electric" },
      { label: "pytest", variant: "amber" },
    ],
    images: [
      {
        src: fieldPackStandalone,
        alt: "The Field Pack standalone viewer showing an aerial orthomosaic of a site, opened directly from the filesystem with no server running.",
        caption: "The offline viewer — one HTML file, one PMTiles archive, no server.",
      },
      {
        src: fieldPackPanel,
        alt: "The Field Pack dock inside QGIS, showing the packing options for converting a project into a PMTiles archive.",
        caption: "The QGIS dock. The library underneath runs headless.",
      },
      {
        src: fieldPackSite,
        alt: "High-resolution drone orthomosaic of a site rendered in the Field Pack viewer with vector overlays.",
        caption: "A packed orthomosaic at full zoom in the viewer.",
      },
      {
        src: fieldPackBasemap,
        alt: "The Field Pack viewer with a basemap layer active beneath the packed survey data.",
        caption: "Basemaps stay switchable inside the packed viewer.",
      },
      {
        src: fieldPackRoad,
        alt: "Linear road survey data displayed in the Field Pack offline viewer.",
      },
      {
        src: fieldPackDemo,
        alt: "The Field Pack packing workflow running end to end from QGIS project to shareable archive.",
      },
    ],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-09-29",
  },

  {
    slug: "crop-disease-diagnosis",
    order: 5,
    title: "Crop-disease diagnosis from a photograph",
    role: "Author. Open source",
    period: "2026",
    scale: "281-condition knowledge base",
    status: "live",
    disclosure: { kind: "self", client: "Own project" },
    plate: { mark: "KB", caption: "281-condition knowledge base" },
    links: { repo: "https://github.com/scotch-ajison/zimkb" },
    problem:
      "A model that names a disease from a photograph is easy to prototype and very hard to make safe. Look-alikes are everywhere, a third of what a farmer photographs is not a pathogen at all, and a model prescribing from general training data will happily recommend a pesticide that is banned in Zimbabwe.",
    approach:
      "The vision step is forbidden from naming a disease — it may only describe what it can see. Two-stage retrieval then pulls differential, management and safety evidence for every candidate and every confusable condition, and a second reasoning pass either commits or asks for a specific field test. A build-time validator fails the build if any output recommends a restricted active.",
    outcome:
      "The validator caught eight chemical recommendations naming DR&SS-banned actives, inherited from foreign extension sources. Retrieval works on plain BM25 with no embeddings and no vector database — a query takes about two milliseconds.",
    metrics: [
      { label: "Retrieval", value: "13/15 top-1", note: "15/15 top-3, BM25, no embeddings" },
      { label: "Corpus", value: "281 records", note: "1,850 retrievable passages" },
      { label: "Caught", value: "8 banned actives", note: "Build now fails on a match" },
    ],
    stack: [
      { label: "Python", variant: "electric" },
      { label: "Claude API", variant: "violet" },
      { label: "RAG", variant: "violet" },
      { label: "BM25", variant: "electric" },
      { label: "Zero-dependency core", variant: "amber" },
    ],
    images: [],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-08-19",
  },

  {
    slug: "building-change-observatory",
    order: 8,
    title: "Building Change Observatory",
    role: "Author. Open data, CC BY 4.0",
    period: "2026",
    scale: "8 km² of Harare, 2016 — present",
    status: "research",
    disclosure: { kind: "self", client: "Own project" },
    plate: { mark: "BCO", caption: "Building Change Observatory" },
    links: {},
    accessNote:
      "Not yet published — the repository is local while the validation sample is scored.",
    problem:
      "Banks, valuers and planners need dated, verifiable building change. The original brief — every constructed parcel in Zimbabwe, traced off a commercial basemap — fails on licence and on physics: the terms forbid derived datasets, and a basemap is one undated mosaic, so it cannot tell you when anything happened.",
    approach:
      "Scope cut knowingly to one suburb. Fixed building footprints act as immutable containers; annual presence and height rasters are harvested into them by zonal statistics, so every period is measured the same way as the last. Hysteresis and a two-period persistence rule stop threshold noise being reported as change. Remote rasters are read by HTTP range request — about 38 MB of traffic for a window of a 1 GB tile instead of downloading all of it.",
    outcome:
      "The most useful result is a negative one, and it is in the README rather than buried: vertical extension is not detectable at this resolution. Building-level height deltas have symmetric tails at every threshold, which is what noise looks like. Reporting it as a finding was the honest option.",
    metrics: [
      { label: "Buildings", value: "30,336", note: "Median footprint 47 m²" },
      { label: "Presence", value: "35.5% → 46.4%", note: "2016 → 2023" },
      { label: "Unresolved", value: "49%", note: "Stated, not silently dropped" },
    ],
    stack: [
      { label: "Python", variant: "electric" },
      { label: "rasterio", variant: "violet" },
      { label: "DuckDB", variant: "electric" },
      { label: "GeoParquet", variant: "violet" },
      { label: "Leaflet", variant: "amber" },
    ],
    images: [],
    location: { lat: -17.7836, lng: 31.0522, label: "Mount Pleasant, Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-08-17",
  },

  {
    slug: "operational-policing-platform",
    order: 7,
    title: "Operational policing platform",
    role: "Developer",
    period: "2026",
    scale: "National law enforcement",
    status: "delivered",
    disclosure: {
      kind: "anonymised",
      clientDescriptor: "A national law-enforcement agency",
    },
    links: {},
    accessNote:
      "An internal operational system. Every screenshot below is of the demo environment, populated with synthetic records.",
    problem:
      "Case records, station deployment and incident reporting lived in separate systems with no spatial view, so nobody could see where anything was happening until after it had.",
    approach:
      "One operational picture: a layer-managed map with heat mapping over station, settlement, hydrology and transport layers, alongside records search, deployment planning and structured incident reporting.",
    outcome:
      "Delivered and in use. The screenshots show the demo environment — identifiers read DEMO-NID-001 and sentences read 'synthetic value for testing only' because that is exactly what the demo data is.",
    metrics: [
      { label: "Layers", value: "5 operational", note: "Heat, stations, settlement, hydrology, transport" },
      { label: "Data shown", value: "Synthetic", note: "Demo environment only" },
    ],
    stack: [
      { label: "Django", variant: "electric" },
      { label: "PostGIS", variant: "violet" },
      { label: "Leaflet", variant: "amber" },
      { label: "Heat mapping", variant: "violet" },
    ],
    images: [
      {
        src: opsHeatmap,
        alt: "An operational map of Harare and surrounds with a density heat map overlaid, and a layer-management panel listing heat, police station, settlement, hydrology and transport layers.",
        caption: "Layer-managed operational picture over Harare.",
        credit: "Basemap © OpenStreetMap contributors",
      },
      {
        src: opsRecords,
        alt: "A records search table listing demo entries, every identifier prefixed DEMO-NID and every sentence field reading 'synthetic sentence for testing only'.",
        caption: "Records search — the demo environment, synthetic data throughout.",
      },
      {
        src: opsLanding,
        alt: "The landing screen of the operational policing platform showing its main navigation.",
      },
      {
        src: opsDeployment,
        alt: "The deployment planning screen of the operational policing platform.",
        caption: "Deployment planning.",
      },
      {
        src: opsReporting,
        alt: "The structured incident reporting form of the operational policing platform.",
        caption: "Structured incident reporting.",
      },
    ],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-09-07",
  },

  {
    slug: "ward-population-gis",
    order: 9,
    title: "Repairing a national ward population layer",
    role: "Author",
    period: "2026",
    scale: "1,981 wards · 90 districts",
    status: "delivered",
    disclosure: { kind: "self", client: "Own project" },
    links: {},
    problem:
      "An inherited ward layer carried population attributes that looked plausible and were entirely fabricated by a bad join — the value was a function of ward number alone.",
    approach:
      "Treated the document's own subtotals as a test suite. Rebuilt the join on a geometry-derived crosswalk, recomputed area in an equal-area projection rather than in degrees, and reconciled every ward against the published census tables before projecting forward.",
    outcome:
      "46 distinct population values had been broadcast across 1,981 rows. After the repair, 1,979 of 1,981 wards matched the census — including one ward filed under a province 150 km from where its geometry sits.",
    metrics: [
      { label: "Fabricated", value: "46 values", note: "Spread across 1,981 rows" },
      { label: "Reconciled", value: "1,979 / 1,981", note: "Against the 2022 census" },
      { label: "Finding", value: "19.3% on 0.72%", note: "Of people, on that share of land" },
    ],
    stack: [
      { label: "PostGIS", variant: "violet" },
      { label: "GeoPandas", variant: "electric" },
      { label: "QGIS", variant: "amber" },
      { label: "Cartography", variant: "violet" },
    ],
    images: [
      {
        src: wardDensity,
        alt: "A choropleth map of Zimbabwe shaded by population density with urban insets and proportional symbol rings for population counts.",
        caption: "Density shaded, counts symbolised — urban districts inset.",
      },
    ],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-01",
  },

  {
    slug: "ministry-land-information-system",
    order: 10,
    title: "Land Information System",
    role: "Lead developer",
    period: "2022 — 2023",
    scale: "National government",
    status: "delivered",
    disclosure: {
      kind: "named",
      client: "Ministry of Agriculture, Land, Water and Fisheries",
    },
    links: {},
    problem:
      "State land applications moved through manual, paper-heavy approval chains with no spatial verification at any step.",
    approach:
      "A GIS-based land allocation and registration system covering the full workflow — ministerial approval through to field-officer verification — with GIS field data collection and automated approval routing.",
    outcome:
      "The paper chain was replaced end to end, and an allocation became something you could see on a map before approving it.",
    metrics: [{ label: "Scope", value: "Full lifecycle", note: "Approval to field verification" }],
    stack: [
      { label: "GeoDjango", variant: "violet" },
      { label: "PostGIS", variant: "violet" },
      { label: "React", variant: "amber" },
      { label: "OpenLayers", variant: "electric" },
    ],
    images: [],
    location: { lat: -17.8216, lng: 31.0492, label: "Harare" },
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-19",
  },

  {
    slug: "potraz-monitoring",
    order: 6,
    title: "Results-based monitoring systems",
    role: "Sole developer, architecture to deployment",
    period: "2023 — 2025",
    scale: "3 systems in production",
    status: "live",
    disclosure: {
      kind: "named",
      client: "Postal and Telecommunications Regulatory Authority of Zimbabwe",
    },
    plate: { mark: "PTZ", caption: "POTRAZ — telecoms regulator" },
    links: {},
    problem:
      "Department heads across the regulator had no shared way to track KPIs or monitor team performance, so evaluation was manual and retrospective.",
    approach:
      "A centralised KPI and performance monitoring platform, built and deployed solo, alongside two further systems for the same authority.",
    outcome: "Three interconnected systems in active production at the authority.",
    metrics: [
      { label: "Systems", value: "3 live", note: "At one regulator" },
      { label: "Role", value: "Sole developer", note: "Architecture to deployment" },
    ],
    stack: [
      { label: "Django", variant: "electric" },
      { label: "PostgreSQL", variant: "electric" },
      { label: "Python", variant: "electric" },
    ],
    images: [],
    location: { lat: -17.8099, lng: 31.0533, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-08-21",
  },

  {
    slug: "sadc-artisanal-mining",
    order: 11,
    title: "Artisanal mining across eight countries",
    role: "GIS specialist",
    period: "2022",
    scale: "8 countries · East, Central & Southern Africa",
    status: "delivered",
    disclosure: {
      kind: "named",
      client: "GeoHub Pvt Ltd for the ECSA Health Community",
    },
    links: {},
    problem:
      "Artisanal and small-scale mining across the region was unmapped, which made any cross-border health or environmental assessment impossible to ground.",
    approach:
      "Cross-border spatial data collection and harmonisation, reconciling inconsistent national datasets — different schemas, different vintages, different ideas of what counts as a site — into one analysable layer.",
    outcome:
      "A single cross-border layer the study could actually analyse, covering eight countries.",
    metrics: [{ label: "Countries", value: "8", note: "Harmonised into one layer" }],
    stack: [
      { label: "QGIS", variant: "amber" },
      { label: "Data harmonisation", variant: "violet" },
      { label: "Field data", variant: "electric" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-19",
  },

  {
    slug: "zrbf-spatial-data-warehouses",
    order: 12,
    title: "Spatial data warehouses, ten district councils",
    role: "GIS specialist & deployment",
    period: "2020 — 2021",
    scale: "10+ rural district councils",
    status: "delivered",
    disclosure: { kind: "named", client: "Zimbabwe Resilience Building Fund" },
    links: {},
    problem:
      "Rural district councils held climate, agriculture, hydrology and infrastructure data in siloed formats, which blocked any coordinated drought or flood preparedness at district level.",
    approach:
      "Centralised geospatial repositories on PostgreSQL/PostGIS with layers published through GeoServer, deployed across more than ten councils — then trained council staff to run them without outside support.",
    outcome:
      "The training is the part that mattered. The councils still operate these without external support, which is the only definition of a successful deployment in that setting.",
    metrics: [
      { label: "Councils", value: "10+", note: "Deployed and handed over" },
      { label: "Handover", value: "Staff trained", note: "Operated without external support" },
    ],
    stack: [
      { label: "PostGIS", variant: "violet" },
      { label: "GeoServer", variant: "violet" },
      { label: "WMS / WFS", variant: "electric" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-19",
  },

  {
    slug: "covid-response-dashboard",
    order: 13,
    title: "COVID-19 spatial response dashboard",
    role: "Developer",
    period: "2020 — 2021",
    scale: "National public health",
    status: "delivered",
    disclosure: {
      kind: "named",
      client: "Ministry of Health and Child Care, Zimbabwe",
    },
    links: {},
    problem:
      "At peak response, national health teams needed one spatial view of cases, testing centres, isolation facilities and hospital capacity. It lived in disconnected spreadsheets.",
    approach:
      "A spatially enabled dashboard over Django, GeoServer and OpenLayers, integrating epidemiological data with facility capacity and district-level case statistics.",
    outcome:
      "Case mapping, hotspot detection and facility capacity in one place, during the period when that was the input to deployment decisions.",
    metrics: [{ label: "Scope", value: "National", note: "Case, facility and capacity data" }],
    stack: [
      { label: "Django", variant: "electric" },
      { label: "GeoServer", variant: "violet" },
      { label: "OpenLayers", variant: "electric" },
      { label: "PostGIS", variant: "violet" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-19",
  },

  {
    slug: "earth-engine-index-explorer",
    order: 14,
    title: "Vegetation index explorer",
    role: "Author",
    period: "2026",
    scale: "Cloud-scale raster analysis",
    status: "research",
    disclosure: { kind: "self", client: "Own project" },
    links: {},
    problem:
      "Getting NDVI, NDWI, EVI or SAVI for a specific area of interest meant stitching tiles, reprojecting and computing indices by hand — far too slow to be part of a decision.",
    approach:
      "Draw a polygon on a map, get the imagery back with the index computed and clipped to exactly that boundary. Processing runs on Google Earth Engine from Python, with five-year trend series and Open-Meteo rainfall and temperature alongside.",
    outcome:
      "The full path from satellite source to a web interface, in one piece, at any scale the AOI demands.",
    metrics: [
      { label: "Indices", value: "NDVI, EVI, SAVI", note: "Plus NDWI and soil moisture" },
      { label: "Trend", value: "5 years", note: "Per area of interest" },
    ],
    stack: [
      { label: "Google Earth Engine", variant: "violet" },
      { label: "Python", variant: "electric" },
      { label: "Leaflet", variant: "amber" },
      { label: "Raster analysis", variant: "violet" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-04-15",
  },

  {
    slug: "investor-hosting",
    order: 15,
    title: "Investor intelligence platform",
    role: "Developer",
    period: "2026",
    scale: "Multi-sector investment",
    status: "live",
    disclosure: { kind: "named", client: "Radar Holdings" },
    links: { live: "https://investorhosting.com" },
    problem:
      "Investors evaluating Zimbabwean real estate, mining and agricultural opportunities had no spatial way to discover or compare them.",
    approach:
      "A spatially enabled investment platform with GIS dashboards and a React front end, surfacing assets across sectors on one map.",
    outcome: "Investor onboarding and asset discovery, both spatial, both live.",
    metrics: [{ label: "Status", value: "Live", note: "Publicly reachable" }],
    stack: [
      { label: "React", variant: "amber" },
      { label: "GIS dashboards", variant: "violet" },
      { label: "PostGIS", variant: "electric" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-05-26",
  },

  {
    slug: "openstreetmap",
    order: 16,
    title: "OpenStreetMap contribution",
    role: "Contributor — YouthMappers, University of Zimbabwe",
    period: "2019 — present",
    scale: "Zimbabwe",
    status: "ongoing",
    disclosure: { kind: "self", client: "OpenStreetMap community" },
    links: { live: "https://www.openstreetmap.org" },
    problem:
      "Large parts of rural Zimbabwe are thinly represented in open spatial data, which limits navigation, planning and humanitarian response exactly where those matter most.",
    approach:
      "Ongoing digitisation of rural infrastructure — roads, schools, clinics — validation of existing data, and participation in humanitarian mapping campaigns.",
    outcome: "Open data that other people's systems can be built on.",
    metrics: [{ label: "Since", value: "2019", note: "YouthMappers, UZ" }],
    stack: [
      { label: "OpenStreetMap", variant: "violet" },
      { label: "JOSM", variant: "electric" },
      { label: "iD Editor", variant: "electric" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-08-19",
  },
]
