import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org"], // autorise cette source externe pour next/image
  },
};

export default nextConfig;

