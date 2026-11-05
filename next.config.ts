import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Trimmed from the defaults: every extra width multiplies the number of
    // distinct transformations, and this site has a known set of sizes.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600],
    imageSizes: [96, 160, 256, 320, 384],
    // Next 16 requires every non-default quality to be declared here.
    // 90 is the portrait only; 70–75 is everything else.
    qualities: [70, 75, 90],
    minimumCacheTTL: 31_536_000,
    dangerouslyAllowSVG: false,
  },
  async redirects() {
    return [
      // /writing shipped as five "Coming soon" rows and is in the live
      // sitemap, so it needs to land somewhere real rather than 404.
      { source: "/writing", destination: "/research", permanent: true },
    ]
  },
}

export default nextConfig
