import type { NextConfig } from "next";

// Next.js deployment on Vercel: server-rendered pages + Edge Functions (middleware, route handlers).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // The static host serves examples/<name>/index.html for the folder URL; `next dev` doesn't, so map it here.
  ...(process.env.NODE_ENV === "development" && {
    rewrites: async () => [{ source: "/examples/:name/", destination: "/examples/:name/index.html" }],
  }),
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
