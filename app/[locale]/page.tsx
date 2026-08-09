import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { config } from "@/lib/config";
import { defaultLocale, getDict, isLocale, type Locale } from "@/lib/i18n";
import { faqPageSchema, organizationSchema, softwareApplicationSchema } from "@/lib/schema";

const ICONS: Record<string, string> = {
  bell: "M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.5-6.84V3a1.5 1.5 0 0 0-3 0v1.16A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z",
  widget:
    "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z",
  history:
    "M12 3a9 9 0 1 0 8.94 10H19a7 7 0 1 1-2.05-5.95L14 10h7V3l-2.35 2.35A8.96 8.96 0 0 0 12 3Zm-1 4v5.41l4 2.34-.75 1.3L10 13V7h1Z",
  compass:
    "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.6 6.4-1.9 5.7a1 1 0 0 1-.63.63l-5.7 1.9a.5.5 0 0 1-.63-.63l1.9-5.7a1 1 0 0 1 .63-.63l5.7-1.9a.5.5 0 0 1 .63.63Z",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const d = getDict(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            organizationSchema(),
            softwareApplicationSchema({ description: d.meta.description }),
            faqPageSchema(d.faq.items),
          ],
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pt-16 pb-8 text-center sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#F2849A]">
          {d.hero.kicker}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{d.hero.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#4E3A5C]/75">
          {d.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center gap-2">
          <a
            href={config.appStoreUrl}
            className="rounded-full bg-gradient-to-br from-[#FFB994] to-[#F2849A] px-8 py-3 text-base font-bold text-white shadow-sm transition hover:opacity-90"
          >
            {d.hero.cta}
          </a>
          <span className="text-sm text-[#4E3A5C]/60">{d.hero.ctaSub}</span>
        </div>
      </section>

      {/* Problem / AnswerBlock */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <AnswerBlock question={d.problem.title}>{d.problem.body}</AnswerBlock>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {d.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-[#4E3A5C]/10 bg-white p-6 shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 text-[#F2849A]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={ICONS[f.icon]} />
              </svg>
              <h3 className="mt-4 text-lg font-bold text-[#4E3A5C]">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4E3A5C]/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="rounded-2xl bg-[#4E3A5C] p-8 text-center text-white sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{d.privacy.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
            {d.privacy.body}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-10 pb-20">
        <Faq title={d.faq.title} items={d.faq.items} />
      </section>
    </>
  );
}
