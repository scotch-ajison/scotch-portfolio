import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"
export const ogAlt =
  "Scotch Ajison — GIS Systems Architect & Spatial Intelligence Consultant"

// Shared renderer for both opengraph-image and twitter-image.
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
          backgroundColor: "#07080F",
          backgroundImage:
            "radial-gradient(900px circle at 78% 18%, rgba(6,214,240,0.20), transparent 55%), radial-gradient(800px circle at 10% 95%, rgba(124,58,255,0.22), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: availability-free brand label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              backgroundColor: "#06D6F0",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#06D6F0",
              fontWeight: 600,
            }}
          >
            GIS Systems Developer · Zimbabwe &amp; Beyond
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#F5F6FA",
            }}
          >
            <span>Building&nbsp;</span>
            <span style={{ color: "#7C3AFF" }}>spatial systems&nbsp;</span>
            <span>that run nations</span>
            <span style={{ color: "#7C3AFF" }}>.</span>
          </div>
        </div>

        {/* Footer: name + role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF" }}>
              Scotch Ajison
            </div>
            <div style={{ fontSize: 26, color: "#9CA3B4", marginTop: 4 }}>
              Spatial Intelligence Consultant
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              color: "#6B7280",
            }}
          >
            <div
              style={{
                width: 56,
                height: 2,
                backgroundColor: "#FF9F0A",
              }}
            />
            scotchajison.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
