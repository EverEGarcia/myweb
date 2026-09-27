import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set to "/myweb" only for GitHub Pages repository-site builds.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // Permit local-network browser access to dev assets and HMR.
  allowedDevOrigins: ["172.21.80.1"],

  // Static export for S3 + CloudFront deployment (future Phase 2)
  output: "export",

  // Trailing slash ensures correct S3 routing
  trailingSlash: true,

  // Disable Next.js image optimization for static export.
  // In Phase 2 the loader can be upgraded to a CDN-backed custom loader.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
