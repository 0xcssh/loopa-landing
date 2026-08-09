import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx";
import { config } from "@/lib/config";
import { getAllSlugs, getPost } from "@/lib/blog";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { articleSchema, faqPageSchema } from "@/lib/schema";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.flatMap(({ slug }) => locales.map((locale) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const post = await getPost(locale, slug).catch(() => null);
  if (!post) return {};
  const url = `${config.siteUrl}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: { en: `${config.siteUrl}/en/blog/${slug}`, fr: `${config.siteUrl}/fr/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: config.brand,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const post = await getPost(locale, slug).catch(() => null);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [articleSchema({ ...post, locale }), faqPageSchema(post.faq)],
        }}
      />

      <p className="text-xs text-[#4E3A5C]/50">{post.date}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{post.title}</h1>

      <div className="mt-8">
        <AnswerBlock question={post.title}>{post.answer}</AnswerBlock>
      </div>

      <div className="prose-loopa">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mt-12">
        <Faq items={post.faq} />
      </div>
    </article>
  );
}
