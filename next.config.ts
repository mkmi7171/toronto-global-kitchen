import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity's CDN hostname
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
