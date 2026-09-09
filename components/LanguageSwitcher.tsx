"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

const SECTION_IDS = [
  "about",
  "work",
  "process",
  "disciplines",
  "services",
  "invitations",
  "faq",
  "contact",
];

function currentVisibleSection(): string | null {
  if (typeof window === "undefined") return null;
  let best: { id: string; dist: number } | null = null;
  const center = window.innerHeight / 2;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= center && rect.bottom >= 0) {
      const dist = Math.abs(rect.top - 0);
      if (!best || dist < best.dist) best = { id, dist };
    }
  }
  return best?.id ?? null;
}

export default function LanguageSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;

  // Read the current scroll section only after mount — computing it during
  // render would read the DOM/window immediately on the client but return
  // null on the server, producing mismatched hrefs and a hydration error.
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    setSection(currentVisibleSection());
  }, [pathname]);

  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = target;
    const rest = "/" + segments.join("/");
    return section ? `${rest}#${section}` : rest;
  };

  const go = (target: Locale) => (e: React.MouseEvent) => {
    if (target === locale) return;
    e.preventDefault();
    window.location.assign(hrefFor(target));
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-app px-1 py-1 text-xs font-semibold ${className}`}
      data-cursor-hover
      aria-label="Language switcher"
    >
      <Globe size={13} className="text-app-dim mx-1.5" aria-hidden />
      <a
        href={hrefFor("en")}
        onClick={go("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === "en"
            ? "bg-app-card text-app"
            : "text-app-muted hover:text-app"
        }`}
      >
        EN
      </a>
      <a
        href={hrefFor("ar")}
        onClick={go("ar")}
        aria-current={locale === "ar" ? "true" : undefined}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === "ar"
            ? "bg-app-card text-app"
            : "text-app-muted hover:text-app"
        }`}
      >
        AR
      </a>
    </div>
  );
}
