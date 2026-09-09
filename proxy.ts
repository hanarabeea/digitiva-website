import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"] as const;
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Parse "en-US,en;q=0.9,ar;q=0.8" into an ordered list of language tags.
  const languages = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of languages) {
    const base = tag.split("-")[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip internal paths, api routes, and static/image files.
    "/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|mp4|txt|xml|json|js|css|woff|woff2|ttf|webmanifest)$).*)",
  ],
};
