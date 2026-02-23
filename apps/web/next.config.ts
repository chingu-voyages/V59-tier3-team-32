import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: () => [
    {
      source: "/api/auth/:path*",
      destination: `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/auth/:path*`,
    },
  ],
};

export default nextConfig;
