import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3001/api/:path*" },
    ];
  },
  // allow your LAN origin(s) in dev
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.51:3000" // ← replace with your actual LAN IP
  ],
};

export default nextConfig;
