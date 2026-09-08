import type { NextConfig } from "next";

/* Served at the apex of the custom domain amansaini.dev (see public/CNAME),
 * so there is no sub-path. Before the domain was attached this was a GitHub
 * Pages *project* page and needed basePath "/amansaini.github.io". */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const origin = process.env.NEXT_PUBLIC_ORIGIN ?? "https://amansaini.dev";

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
