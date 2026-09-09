import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const { title, titleEm, intro } = dict.legal.terms;

  return {
    title: `${title} ${titleEm} — Digitiva`,
    description: intro,
    metadataBase: new URL("https://www.digitivaa.com"),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { en: "/en/terms", ar: "/ar/terms" },
    },
  };
}

export default async function Terms({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <LegalPage dict={dict} locale={locale} doc={dict.legal.terms} />;
}
