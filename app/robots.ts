import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Accueille explicitement les crawlers IA (GPTBot, PerplexityBot,
    // Google-Extended…) : c'est le canal GEO.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${config.siteUrl}/sitemap.xml`,
    host: config.siteUrl,
  };
}
