import type { NextConfig } from "next";

// Next.js deployment on Vercel: server-rendered pages + Edge Functions (middleware, route handlers).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
