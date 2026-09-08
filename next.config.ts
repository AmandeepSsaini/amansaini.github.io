import type { NextConfig } from "next";

/* Served as a GitHub Pages *project* page (repo name != username), so the
 * app lives under a sub-path. Override both values to deploy at a root URL. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/amansaini.github.io";
const origin = process.env.NEXT_PUBLIC_ORIGIN ?? "https://amandeepssaini.github.io";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ORIGIN: origin,
  },
};

export default nextConfig;
