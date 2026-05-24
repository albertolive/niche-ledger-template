import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash for editorial/hero photography (free for commercial use,
      // licensed via Unsplash License). We hotlink to the optimized CDN URLs
      // and let next/image proxy + cache them.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
