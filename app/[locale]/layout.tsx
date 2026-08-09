import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nunito } from "next/font/google";
import "../globals.css";
import { config } from "@/lib/config";
import { defaultLocale, getDict, isLocale, locales, type Locale } from "@/lib/i18n";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const d = getDict(locale);
  const url = `${config.siteUrl}/${locale}`;

  return {
    metadataBase: new URL(config.siteUrl),
    title: { default: d.meta.title, template: `%s · ${config.brand}` },
    description: d.meta.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${config.siteUrl}/en`,
        fr: `${config.siteUrl}/fr`,
        "x-default": `${config.siteUrl}/en`,
      },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url,
      siteName: config.brand,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      creator: config.x.handle,
    },
    robots: { index: true, follow: true },
    verification: { google: "qx19ZOdHqMvOo08k9goP9PLAhgxrpx2cYijdcifkMKg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  return (
    <html lang={locale} className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#FBF7F5] text-[#4E3A5C]">
        <header className="border-b border-[#4E3A5C]/10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href={`/${locale}`} className="text-lg font-extrabold tracking-tight">
              {config.brand}
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium">
              <Link href={`/${locale}/blog`} className="hover:text-[#F2849A]">
                {d.nav.blog}
              </Link>
              <a
                href={config.appStoreUrl}
                className="rounded-full bg-[#4E3A5C] px-4 py-2 text-white transition hover:opacity-90"
              >
                {d.hero.cta}
              </a>
              <LocaleSwitch current={locale} />
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#4E3A5C]/10">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-[#4E3A5C]/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {config.brand} — {d.footer.tagline}
            </p>
            <div className="flex gap-5">
              <Link href={`/${locale}/privacy`} className="hover:text-[#F2849A]">
                {d.nav.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-[#F2849A]">
                {d.nav.terms}
              </Link>
              <Link href={`/${locale}/support`} className="hover:text-[#F2849A]">
                {d.nav.support}
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function LocaleSwitch({ current }: { current: Locale }) {
  const other: Locale = current === "en" ? "fr" : "en";
  return (
    <Link href={`/${other}`} className="text-[#4E3A5C]/60 hover:text-[#F2849A]" aria-label="Switch language">
      {other.toUpperCase()}
    </Link>
  );
}
