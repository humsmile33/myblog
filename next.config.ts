import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/myblog',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
