import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

// Redirects "/" (and any path with no locale prefix) to a locale-prefixed
// path, so app/[locale]/layout.tsx (the html-owning root layout) is always
// reached. Runs before rendering — no bare app/page.tsx/app/layout.tsx needed.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const accepted = request.headers.get("accept-language") ?? "";
  const preferred = accepted.toLowerCase().startsWith("fr") ? "fr" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
