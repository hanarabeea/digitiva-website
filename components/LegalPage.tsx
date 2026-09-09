import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Grain from "./Grain";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type LegalDoc = Dictionary["legal"]["privacy"];

export default function LegalPage({
  dict,
  locale,
  doc,
}: {
  dict: Dictionary;
  locale: Locale;
  doc: LegalDoc;
}) {
  return (
    <main className="relative bg-app-deep min-h-screen">
      <Grain />
      <CustomCursor />
      <Navbar dict={dict} locale={locale} />

      {/* Ambient glow, matching the section backgrounds elsewhere on the site */}
      <div className="absolute inset-x-0 top-0 h-[520px] pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 start-1/2 -translate-x-1/2 w-[820px] h-[520px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.16) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <article className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-20 md:pb-28">
        <Link
          href={`/${locale}`}
          data-cursor-hover
          className="inline-flex items-center gap-2 text-sm text-app-muted hover:text-app transition-colors mb-10"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {dict.legal.backToHome}
        </Link>

        <header className="mb-12 md:mb-16 pb-10 border-b border-app">
          <h1
            className="font-space font-bold text-app mb-4"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            {doc.title} <span className="gradient-text">{doc.titleEm}</span>
          </h1>
          <p className="text-app-dim text-xs uppercase tracking-widest mb-6">
            {dict.legal.lastUpdated} · {dict.legal.updatedDate}
          </p>
          <p className="text-app-muted text-base md:text-lg leading-relaxed">{doc.intro}</p>
        </header>

        <div className="space-y-10 md:space-y-12">
          {doc.sections.map((section, i) => (
            <section key={section.heading}>
              <h2 className="flex items-baseline gap-3 mb-3">
                <span className="font-space text-xs font-bold text-[#3B82F6] tracking-[0.15em] flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-space font-bold text-app text-lg md:text-xl">
                  {section.heading}
                </span>
              </h2>
              <p className="text-app-muted text-sm md:text-base leading-relaxed ps-9">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
