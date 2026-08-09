import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getLegal } from "@/lib/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return { title: getLegal(locale).terms.title };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const { terms } = getLegal(locale);

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight">{terms.title}</h1>
      <p className="mt-2 text-sm text-[#4E3A5C]/60">{terms.effective}</p>
      <div className="mt-8 space-y-6">
        {terms.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold text-[#4E3A5C]">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-[#4E3A5C]/80">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
