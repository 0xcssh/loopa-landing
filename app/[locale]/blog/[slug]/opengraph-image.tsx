import { ImageResponse } from "next/og";
import { config } from "@/lib/config";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const post = await getPost(locale, params.slug).catch(() => null);
  const title = post?.title ?? config.brand;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(135deg, #4E3A5C 0%, #3a2c46 100%)",
          color: "#FBF7F5",
        }}
      >
        <div style={{ fontSize: 26, opacity: 0.7, marginBottom: 16 }}>
          {config.brand} · Blog
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
      </div>
    ),
    { ...size }
  );
}
