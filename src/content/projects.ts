import type { Project } from "./types"

import cbzMortgages from "@/assets/images/cbz-mortgages.webp"
import ecadastreMap from "@/assets/images/ecadastre-map.webp"
import ecadastrePortal from "@/assets/images/ecadastre-portal.webp"
import ihcPortal from "@/assets/images/ihc-portal.webp"
import potrazOdc from "@/assets/images/potraz-odc.webp"
import fieldPackPanel from "@/assets/images/field-pack-panel.webp"
import fieldPackBasemap from "@/assets/images/field-pack-basemap.webp"
import fieldPackSite from "@/assets/images/field-pack-site.webp"
import wardDensity from "@/assets/images/ward-density.webp"
import opsHeatmap from "@/assets/images/ops-heatmap.webp"
import opsRecords from "@/assets/images/ops-records.webp"
import opsLanding from "@/assets/images/ops-landing.webp"
import opsDeployment from "@/assets/images/ops-deployment.webp"
import opsReporting from "@/assets/images/ops-reporting.webp"

/**
 * Every project on the site. Counts, the sitemap and the project map all
 * derive from this array, and there is no second list anywhere.
 *
 * Rules this file holds itself to:
 *  · `role` says what he actually did. Never "I built" for team work.
 *  · `links.live` is only ever a URL that was checked and answered 200.
 *  · A claim a reader can check is either evidenced or absent.
 *  · No technology names in any project field, and no em or en dashes in
 *    the copy. `check:content` fails the build on a dash or a `stack` field.
 */
export const projects: Project[] = [
  {
    slug: "zimbabwe-ecadastre",
    order: 1,
    title: "Zimbabwe National eCadastre",
    role: "GIS systems architect and integrations lead, on the delivering team",
    period: "2022 to present",
    scale: "National land register",
    status: "live",
    disclosure: { kind: "named", client: "Department of the Surveyor General" },
    plate: { mark: "SG", caption: "Department of the Surveyor General" },
    links: { live: "http://zimcadastre.co.zw" },
    problem:
      "Zimbabwe's cadastral record was on paper and spread across offices. A surveyor lodging a diagram, an examiner checking it and a citizen searching for a title each worked from a different copy, and none of them could search it by location. The registers that needed to agree with it, including the Deeds Registry, the Mining Cadastre and the investment One Stop Shop, had no way of exchanging data.",
    approach:
      "We built a national digital cadastre. I designed the spatial database end to end, modelled the statutory workflow from lodgement to examination, and set up the geodetic control layers and the authoritative parcel map services the portal reads from. Legacy records were loaded in bulk and checked for geometric and topological errors, so examiners now review the exceptions instead of every submission. I designed and built every API, including the integrations that connect the eCadastre to the Deeds Registry, the One Stop Shop and the Mining Cadastre.",
    outcome:
      "Live in production and used every day by surveyors, examiners and the public for property search, online maps, cadastral services and geodetic services. I owned the spatial architecture, covering the schema, the validation rules and the service layer, along with the integration layer across four national registers, working in a team of more than five developers.",
    metrics: [
      { label: "Status", value: "Live", note: "In daily production use" },
      { label: "Integrations", value: "4 registers", note: "Deeds, One Stop Shop, Mining Cadastre" },
      { label: "APIs", value: "Designed and built", note: "The whole integration layer" },
    ],
    images: [
      {
        src: ecadastreMap,
        alt: "The Zimbabwe eCadastre web map with cadastral parcels outlined in red across northern and central Zimbabwe, densest around Harare, Chitungwiza, Chinhoyi, Bindura and Kadoma, with property search and map tools along the edges.",
        caption: "The live national map, with cadastral parcels drawn in red.",
        crisp: true,
      },
      {
        src: ecadastrePortal,
        alt: "The Zimbabwe eCadastre portal home page, showing the Government of Zimbabwe and Department of the Surveyor General branding and links to property search, e-maps, cadastral services and geodetic services.",
        caption: "The public portal, with property search, online maps, cadastral and geodetic services.",
      },
    ],
    location: { lat: -17.8252, lng: 31.0335, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "cbz-gis-mortgage",
    order: 2,
    title: "CBZ GIS Mortgage Platform",
    role: "GIS systems architect and integrations, on the delivering team",
    period: "2022 to 2023",
    scale: "National banking",
    status: "live",
    disclosure: { kind: "named", client: "Commercial Bank of Zimbabwe (CBZ)" },
    plate: { mark: "CBZ", caption: "Commercial Bank of Zimbabwe" },
    links: {},
    accessNote: "An internal banking platform, so there is no public URL to link.",
    problem:
      "Mortgage applications at CBZ ran on paper. A loan officer assessing a property could not see it on a map, and moving an application from valuation into the bank's core systems meant keying the same details in again.",
    approach:
      "A platform where customers find properties on a map, assess them and apply directly. We connected it to the bank's core banking system and SMS gateway, and integrated live payments through CBZ in both ZWG and USD. Local cards are processed through ZimSwitch, and international cards, including Visa and Mastercard, are accepted.",
    outcome:
      "The first GIS-driven mortgage platform in Zimbabwean banking, live in production. Customers apply and pay online in ZWG or USD, and loan officers assess each property with its location in front of them.",
    metrics: [
      { label: "Status", value: "Live", note: "In production" },
      { label: "Currencies", value: "ZWG and USD", note: "Live payments through CBZ" },
      { label: "Cards", value: "Local and international", note: "ZimSwitch, Visa, Mastercard" },
      { label: "First", value: "In ZW banking", note: "GIS-driven mortgage platform" },
    ],
    images: [
      {
        src: cbzMortgages,
        alt: "CBZ Bank campaign artwork for CBZ Diaspora Mortgages, headlined 'Introducing flexible and affordable CBZ Diaspora Mortgages', with the CBZ Bank logo.",
        caption: "CBZ's own campaign for the mortgage product the platform serves.",
        credit: "Artwork © CBZ Bank",
      },
    ],
    location: { lat: -17.8292, lng: 31.0522, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "investor-hosting",
    order: 4,
    title: "Investor Hosting Centre",
    role: "Developer",
    period: "2026",
    scale: "Multi-sector investment",
    status: "live",
    disclosure: { kind: "named", client: "Radar Holdings" },
    links: { live: "https://investorhosting.com" },
    problem:
      "Investors looking at African opportunities had nowhere to compare them. Prospects sat in brochures and inboxes, with no way to filter by industry, sector, commodity or country and no way to see where an asset actually was.",
    approach:
      "A public gateway where each opportunity is a structured, searchable record. Investors filter by industry, sector, commodity and country, view the assets on GIS dashboards, and register through an onboarding flow.",
    outcome:
      "Live and publicly reachable, with investment opportunities from across the continent in one place and each one shown on the map.",
    metrics: [
      { label: "Status", value: "Live", note: "Publicly reachable" },
      { label: "Search", value: "4 dimensions", note: "Industry, sector, commodity, country" },
    ],
    images: [
      {
        src: ihcPortal,
        alt: "The Investor Hosting Centre home page, headlined 'Invest with Confidence, Achieve More', with a search panel filtering investment opportunities by industry, sector, commodity and country.",
        caption: "Opportunities filtered by industry, sector, commodity and country.",
      },
    ],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "operational-policing-platform",
    order: 5,
    title: "ZRP Operational Policing Platform",
    role: "Developer",
    period: "2026",
    scale: "National law enforcement",
    status: "delivered",
    disclosure: { kind: "named", client: "Zimbabwe Republic Police (ZRP)" },
    links: {},
    accessNote:
      "An internal ZRP system. Every screenshot here is from the demo environment, filled with synthetic records.",
    problem:
      "The Zimbabwe Republic Police kept case records, station deployment and incident reports in separate systems with no map view, so nobody at ZRP could see where incidents were concentrating until after the fact.",
    approach:
      "The platform gives ZRP one operational picture. A layered map with incident heat mapping over police stations, settlements, rivers and roads sits alongside records search, deployment planning and structured incident reporting.",
    outcome:
      "Delivered to ZRP and in use. The screenshots come from the demo environment, so every identifier reads DEMO-NID-001 and every record is synthetic test data.",
    metrics: [
      { label: "Client", value: "ZRP", note: "Zimbabwe Republic Police" },
      { label: "Layers", value: "5 operational", note: "Heat, stations, settlement, hydrology, transport" },
      { label: "Data shown", value: "Synthetic", note: "Demo environment only" },
    ],
    images: [
      {
        src: opsHeatmap,
        alt: "The ZRP operational policing platform map of Harare and surrounds with a density heat map overlaid, and a layer panel listing heat, police station, settlement, hydrology and transport layers.",
        caption: "The operational map over Harare, with every layer switched from one panel.",
        credit: "Basemap © OpenStreetMap contributors",
      },
      {
        src: opsRecords,
        alt: "Records search in the ZRP operational policing platform, listing demo entries where every identifier starts DEMO-NID and every sentence field reads 'synthetic sentence for testing only'.",
        caption: "Records search in the demo environment, with synthetic data throughout.",
      },
      {
        src: opsLanding,
        alt: "The landing screen of the ZRP operational policing platform, showing its main navigation.",
      },
      {
        src: opsDeployment,
        alt: "The deployment planning screen of the ZRP operational policing platform.",
        caption: "Deployment planning.",
      },
      {
        src: opsReporting,
        alt: "The structured incident reporting form of the ZRP operational policing platform.",
        caption: "Structured incident reporting.",
      },
    ],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "potraz-monitoring",
    order: 6,
    title: "Results-based monitoring systems",
    role: "Sole developer, architecture to deployment",
    period: "2023 to 2025",
    scale: "3 systems in production",
    status: "live",
    disclosure: {
      kind: "named",
      client: "Postal and Telecommunications Regulatory Authority of Zimbabwe",
    },
    plate: { mark: "PTZ", caption: "POTRAZ, telecoms regulator" },
    links: {},
    problem:
      "The regulator had two problems. Department heads had no shared way to track KPIs, so performance reviews were manual and backward-looking. Separately, every licensed telecoms operator filed its statutory returns by hand, which made the regulator's own reporting only as timely as its slowest submission.",
    approach:
      "I built and deployed three connected systems on my own. They include a central KPI and performance monitoring platform for the authority's departments, and the Online Data Collection system, where every operator logs in and submits its monthly, quarterly, bi-annual and annual returns.",
    outcome:
      "All three systems are in active production at POTRAZ. Operator returns now arrive through one portal on a known schedule instead of as email attachments that staff had to chase.",
    metrics: [
      { label: "Systems", value: "3 live", note: "At one regulator" },
      { label: "Returns", value: "4 cycles", note: "Monthly to annual, every operator" },
      { label: "Role", value: "Sole developer", note: "Architecture to deployment" },
    ],
    images: [
      {
        src: potrazOdc,
        alt: "The POTRAZ Online Data Collection System landing page, carrying the Postal and Telecommunications Regulatory Authority of Zimbabwe crest and a prompt for operators to log in and submit their monthly, quarterly, bi-annual and annual updates.",
        caption: "The operator portal, where statutory returns are submitted directly.",
      },
    ],
    location: { lat: -17.8099, lng: 31.0533, label: "Harare" },
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "field-pack",
    order: 7,
    title: "Field Pack: a QGIS plugin for sharing orthomosaics",
    role: "Author. Open source, MIT",
    period: "2026",
    scale: "QGIS plugin and command-line tool",
    status: "live",
    disclosure: { kind: "self", client: "Own project" },
    links: { repo: "https://github.com/scotch-ajison/qgis-fieldpack" },
    problem:
      "A 19 GB orthomosaic is hard to hand over because of the software it needs more than because of its size. The recipient needs GIS software, a server or both, so in practice the survey often never reaches the person who needed to see it.",
    approach:
      "Field Pack is a QGIS plugin that packs a project or an orthophoto, including the compressed formats drone survey firms deliver, into a single file with a built-in viewer. The recipient opens it straight from the filesystem, with no GIS software, no server and no internet connection. It runs as a panel inside QGIS or from the command line, and installs cleanly on Windows from one zip.",
    outcome:
      "Version 0.1 shipped as an installable zip. The style translator does not need QGIS loaded to run, so its tests finish in about a tenth of a second.",
    metrics: [
      { label: "Tests", value: "200 pass", note: "14 skipped, 13 modules" },
      { label: "Licence", value: "MIT", note: "Public repository" },
      { label: "Release", value: "v0.1", note: "Installable plugin zip" },
    ],
    images: [
      {
        src: fieldPackPanel,
        alt: "The Field Pack panel inside QGIS, showing the options for packing a project or orthophoto into a single shareable file.",
        caption: "The QGIS panel. The same packing also runs from the command line.",
      },
      {
        src: fieldPackBasemap,
        alt: "The Field Pack offline viewer with a basemap layer active beneath packed survey data.",
        caption: "Basemaps stay switchable inside the packed viewer.",
      },
      {
        src: fieldPackSite,
        alt: "High-resolution drone orthomosaic of a site rendered in the Field Pack viewer with vector overlays.",
        caption: "A packed orthomosaic at full zoom in the viewer.",
      },
    ],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "crop-disease-diagnosis",
    order: 8,
    title: "Crop disease diagnosis from a photograph",
    role: "Author. Open source",
    period: "2026",
    scale: "281-condition knowledge base",
    status: "live",
    disclosure: { kind: "self", client: "Own project" },
    plate: { mark: "KB", caption: "281-condition knowledge base" },
    links: { repo: "https://github.com/scotch-ajison/zimkb" },
    problem:
      "A model that names a disease from a photograph is easy to prototype and hard to make safe. Look-alike conditions are common, about a third of what farmers photograph is not caused by a pathogen at all, and a model prescribing from general knowledge will recommend pesticides that are banned in Zimbabwe.",
    approach:
      "The image step is not allowed to name a disease. It can only describe what it sees. The pipeline then pulls differential, management and safety evidence for every candidate and for every condition it could be confused with, and a second reasoning step either commits to a diagnosis or asks for a specific field test. A check at build time fails the build if any output recommends a restricted active ingredient.",
    outcome:
      "The check caught eight chemical recommendations naming actives banned by DR&SS, carried over from foreign extension sources. A search across the whole knowledge base takes about two milliseconds.",
    metrics: [
      { label: "Accuracy", value: "13/15 top-1", note: "15/15 in the top three" },
      { label: "Corpus", value: "281 records", note: "1,850 searchable passages" },
      { label: "Caught", value: "8 banned actives", note: "The build now fails on a match" },
    ],
    images: [],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },

  {
    slug: "ward-population-gis",
    order: 10,
    title: "Repairing a national ward population layer",
    role: "Author",
    period: "2026",
    scale: "1,981 wards · 90 districts",
    status: "delivered",
    disclosure: { kind: "self", client: "Own project" },
    links: {},
    problem:
      "An inherited ward layer carried population figures that looked plausible but had been produced by a bad join. Each value depended on the ward number alone.",
    approach:
      "I used the document's own subtotals as a test suite. I rebuilt the join on a crosswalk derived from the geometry, recalculated area in an equal-area projection instead of in degrees, and reconciled every ward against the published census tables before projecting forward.",
    outcome:
      "The layer had 46 distinct population values copied across 1,981 rows. After the repair, 1,979 of 1,981 wards matched the census, including one ward filed under a province 150 km from where its boundary actually sits.",
    metrics: [
      { label: "Fabricated", value: "46 values", note: "Spread across 1,981 rows" },
      { label: "Reconciled", value: "1,979 / 1,981", note: "Against the 2022 census" },
      { label: "Finding", value: "19.3% on 0.72%", note: "Of people, on that share of land" },
    ],
    images: [
      {
        src: wardDensity,
        alt: "A choropleth map of Zimbabwe shaded by population density with urban insets and proportional symbol rings for population counts.",
        caption: "Density shaded and counts shown as symbols, with urban districts inset.",
      },
    ],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "ministry-land-information-system",
    order: 11,
    title: "Land Information System",
    role: "Lead developer",
    period: "2022 to 2023",
    scale: "National government",
    status: "delivered",
    disclosure: {
      kind: "named",
      client: "Ministry of Agriculture, Land, Water and Fisheries",
    },
    links: {},
    problem:
      "State land applications moved through manual, paper-heavy approval chains with no spatial check at any step.",
    approach:
      "A GIS-based land allocation and registration system covering the whole workflow, from ministerial approval to field officer verification, with data collected on site and approvals routed automatically.",
    outcome:
      "The paper chain was replaced end to end, and every allocation can now be seen on a map before it is approved.",
    metrics: [{ label: "Scope", value: "Full lifecycle", note: "Approval to field verification" }],
    images: [],
    location: { lat: -17.8216, lng: 31.0492, label: "Harare" },
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "sadc-artisanal-mining",
    order: 12,
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
      "Artisanal and small-scale mining across the region had never been mapped consistently, so a cross-border health or environmental assessment had nothing solid to work from.",
    approach:
      "I collected and harmonised spatial data across borders, reconciling national datasets with different schemas, different dates and different definitions of what counts as a site into one layer that could be analysed.",
    outcome:
      "A single cross-border layer covering eight countries, ready for the study's analysis.",
    metrics: [{ label: "Countries", value: "8", note: "Harmonised into one layer" }],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "zrbf-spatial-data-warehouses",
    order: 13,
    title: "Spatial data warehouses, ten district councils",
    role: "GIS specialist and deployment",
    period: "2020 to 2021",
    scale: "10+ rural district councils",
    status: "delivered",
    disclosure: { kind: "named", client: "Zimbabwe Resilience Building Fund" },
    links: {},
    problem:
      "Rural district councils held climate, agriculture, hydrology and infrastructure data in separate formats, which blocked coordinated drought and flood preparedness at district level.",
    approach:
      "I deployed central spatial data repositories with published map layers across more than ten councils, then trained council staff to run them without outside support.",
    outcome:
      "The councils still run these repositories without outside help, which was the point of the training.",
    metrics: [
      { label: "Councils", value: "10+", note: "Deployed and handed over" },
      { label: "Handover", value: "Staff trained", note: "Running without outside support" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "covid-response-dashboard",
    order: 14,
    title: "COVID-19 spatial response dashboard",
    role: "Developer",
    period: "2020 to 2021",
    scale: "National public health",
    status: "delivered",
    disclosure: {
      kind: "named",
      client: "Ministry of Health and Child Care, Zimbabwe",
    },
    links: {},
    problem:
      "At the peak of the response, national health teams needed one map of cases, testing centres, isolation facilities and hospital capacity. The data sat in disconnected spreadsheets.",
    approach:
      "A spatial dashboard that combined epidemiological data with facility capacity and district case statistics.",
    outcome:
      "Case mapping, hotspot detection and facility capacity in one place, at a time when that view informed deployment decisions.",
    metrics: [{ label: "Scope", value: "National", note: "Case, facility and capacity data" }],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "earth-engine-index-explorer",
    order: 15,
    title: "Vegetation index explorer",
    role: "Author",
    period: "2026",
    scale: "Satellite index analysis",
    status: "research",
    disclosure: { kind: "self", client: "Own project" },
    links: {},
    problem:
      "Getting NDVI, NDWI, EVI or SAVI for a specific area meant stitching tiles, reprojecting and computing the indices by hand, which was too slow to inform a decision.",
    approach:
      "Draw a polygon on a map and get the imagery back with the index computed and clipped to that boundary. Processing runs in the cloud, with five-year trend series and rainfall and temperature data alongside.",
    outcome:
      "The full path from satellite imagery to a web interface, working at whatever scale the area of interest needs.",
    metrics: [
      { label: "Indices", value: "NDVI, EVI, SAVI", note: "Plus NDWI and soil moisture" },
      { label: "Trend", value: "5 years", note: "Per area of interest" },
    ],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "openstreetmap",
    order: 16,
    title: "OpenStreetMap contribution",
    role: "Contributor with YouthMappers, University of Zimbabwe",
    period: "2019 to present",
    scale: "Zimbabwe",
    status: "ongoing",
    disclosure: { kind: "self", client: "OpenStreetMap community" },
    links: { live: "https://www.openstreetmap.org" },
    problem:
      "Large parts of rural Zimbabwe are thinly mapped in open data, which limits navigation, planning and humanitarian response in the places that need them most.",
    approach:
      "Ongoing digitising of rural infrastructure such as roads, schools and clinics, checking existing data, and taking part in humanitarian mapping campaigns.",
    outcome: "Open map data that other people's systems can build on.",
    metrics: [{ label: "Since", value: "2019", note: "YouthMappers, UZ" }],
    images: [],
    visibility: { listed: true, featured: false },
    updatedAt: "2026-11-10",
  },

  {
    slug: "drone-outreach-agent",
    order: 17,
    title: "Autonomous lead and outreach agent",
    role: "Author",
    period: "2026",
    scale: "Commercial drone operator",
    status: "live",
    disclosure: {
      kind: "anonymised",
      clientDescriptor: "A commercial drone-services company",
    },
    cover: "agent-flow",
    links: {},
    accessNote: "An internal system for a client, with no public URL.",
    problem:
      "Leads came in through a website form and a shared inbox and were handled by hand. Follow-up depended on who happened to read the message, nobody could say who had been contacted or what had been promised, and a lead that went cold left no record of why.",
    approach:
      "An agent watches the inbox and the website's lead forms, identifies and researches each prospect, drafts the outreach and logs every contact to the customer record. Drafts are written from the company's own past email threads, so the tone matches what the team actually sends and improves as more correspondence comes in. A separate prospecting pass looks for potential clients the inbox never produced.",
    outcome:
      "No message goes out until a person approves it. The agent researches, drafts and queues, and a member of the team makes the final call, which is what makes it safe to use with real customers.",
    metrics: [
      { label: "Outbound", value: "Human-approved", note: "No message sends itself" },
      { label: "Tone", value: "Learned", note: "From the company's own emails" },
      { label: "Record", value: "Every contact", note: "Logged against the customer" },
    ],
    images: [],
    visibility: { listed: true, featured: true },
    updatedAt: "2026-11-10",
  },
]
