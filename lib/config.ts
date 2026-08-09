// lib/config.ts — the only file whose values are Loopa-specific.
export const config = {
  brand: "Loopa",
  siteUrl: "https://loopa-landing.vercel.app",
  x: { handle: "@loopa", url: "https://x.com/loopa" },
  appStoreUrl: "https://apps.apple.com/app/loopa-contraceptive-ring/id6790433104",
  supportEmail: "support@loopa.app",
} as const;

export type SiteConfig = typeof config;

if (
  !/^https:\/\//.test(config.siteUrl) ||
  /REMPLACE-MOI|example\.com|localhost/i.test(config.siteUrl)
) {
  throw new Error(
    "[config] siteUrl doit être l'URL HTTPS RÉELLE du site (domaine custom ou URL Vercel de prod). " +
      "Édite lib/config.ts. C'est bloquant : canonical/sitemap/OG en dépendent."
  );
}
