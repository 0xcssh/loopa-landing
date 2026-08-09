import type { Metadata } from "next";
import { config } from "@/lib/config";
import { defaultLocale, getDict, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return { title: getDict(locale).nav.support };
}

const copy = {
  en: {
    title: "Support",
    body: "Questions, bugs, or feedback about Loopa? Reach out and we'll get back to you.",
    label: "Email us",
  },
  fr: {
    title: "Assistance",
    body: "Une question, un bug, ou un retour sur Loopa ? Écris-nous, on te répond.",
    label: "Nous écrire",
  },
} as const;

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = copy[locale];

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight">{c.title}</h1>
      <p className="mt-4 leading-relaxed text-[#4E3A5C]/80">{c.body}</p>
      <a
        href={`mailto:${config.supportEmail}`}
        className="mt-6 inline-block rounded-full bg-[#4E3A5C] px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        {c.label} — {config.supportEmail}
      </a>
    </article>
  );
}
