import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/blog";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return {
    title: locale === "fr" ? "Blog" : "Blog",
    description:
      locale === "fr"
        ? "Guides et réponses sur l'anneau contraceptif : timing, oublis, cycle."
        : "Guides and answers about the contraceptive ring: timing, missed dates, cycle.",
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const posts = await listPosts(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-4 text-[#4E3A5C]/60">
          {locale === "fr" ? "Bientôt des articles." : "Articles coming soon."}
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${locale}/blog/${p.slug}`}
                className="block rounded-2xl border border-[#4E3A5C]/10 bg-white p-6 shadow-sm transition hover:border-[#F2849A]/40"
              >
                <p className="text-xs text-[#4E3A5C]/50">{p.date}</p>
                <h2 className="mt-1 text-xl font-bold text-[#4E3A5C]">{p.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4E3A5C]/70">
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
