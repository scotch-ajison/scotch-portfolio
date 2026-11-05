import { ImageResponse } from "next/og"
import { siteUrl } from "@/lib/site"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"
export const ogAlt = "Scotch Ajison — GIS Systems Architect"

const host = siteUrl.replace(/^https?:\/\//, "")

/** Shared by opengraph-image and twitter-image. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0C",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 3, backgroundColor: "#E8542B" }} />
          <div
            style={{
              fontSize: 21,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#8A8782",
              fontWeight: 500,
            }}
          >
            GIS Systems Architect · Harare · UTC+2
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -2.6,
            color: "#F0EDE7",
            maxWidth: 1000,
          }}
        >
          <span>I build the spatial systems that land registries, banks and regulators&nbsp;</span>
          <span style={{ color: "#E8542B" }}>run on.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid #232326",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 600, color: "#F0EDE7" }}>
              Scotch Ajison
            </div>
            <div style={{ fontSize: 22, color: "#8A8782", marginTop: 6 }}>
              PostGIS · GeoDjango · GeoServer · Applied AI
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 21, color: "#8A8782" }}>{host}</div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
