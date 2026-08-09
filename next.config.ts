import type { NextConfig } from "next";

// Blog content lives under content/blog/**/*.mdx and is read via fs +
// gray-matter (lib/blog.ts), then compiled at render time with
// next-mdx-remote/rsc — so no @next/mdx page-extension wiring is needed here.
const nextConfig: NextConfig = {};

export default nextConfig;
