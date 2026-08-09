import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { locales } from "@/lib/i18n";
import { getAllSlugs } from "@/lib/blog";

const STATIC_PATHS = ["", "/blog", "/privacy", "/terms", "/support"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PATHS.flatMap((path) =>
    locales.map((l) => ({
      url: `${config.siteUrl}/${l}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((ll) => [ll, `${config.siteUrl}/${ll}${path}`])
        ),
      },
    }))
  );

  const posts = (await getAllSlugs()).flatMap(({ slug, date }) =>
    locales.map((l) => ({
      url: `${config.siteUrl}/${l}/blog/${slug}`,
      lastModified: new Date(date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((ll) => [ll, `${config.siteUrl}/${ll}/blog/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...posts];
}
