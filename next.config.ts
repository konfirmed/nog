import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages compatibility
  images: {
    unoptimized: true, // Cloudflare doesn't support Next.js image optimization
  },
};

export default nextConfig;
