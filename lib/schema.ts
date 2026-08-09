import { config } from "@/lib/config";

type QA = { q: string; a: string };

export function faqPageSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.brand,
    url: config.siteUrl,
    sameAs: [config.x.url],
  };
}

export function softwareApplicationSchema(a: { description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.brand,
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    description: a.description,
    url: config.siteUrl,
    downloadUrl: config.appStoreUrl,
    offers: {
      "@type": "Offer",
      price: "19.99",
      priceCurrency: "EUR",
      priceValidUntil: "2027-12-31",
    },
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  date: string;
  updated?: string;
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: a.locale,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    image: [`${config.siteUrl}${a.cover}`],
    mainEntityOfPage: `${config.siteUrl}/${a.locale}/blog/${a.slug}`,
    author: { "@type": "Organization", name: config.brand, url: config.siteUrl },
    publisher: { "@type": "Organization", name: config.brand, url: config.siteUrl },
  };
}
