import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Grain from "@/components/Grain";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SystemDetail from "@/components/systems/SystemDetail";
import { SYSTEM_SLUGS, getSystems, shotSrc } from "@/components/systems/data";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";

export function generateStaticParams() {
  return SYSTEM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const s = getSystems(dict).find((x) => x.key === slug);
  if (!s) return {};
  const title = `${s.name} — ${s.tagline} | Digitiva`;

  return {
    title,
    description: s.desc,
    metadataBase: new URL("https://www.digitivaa.com"),
    alternates: {
      canonical: `/${locale}/systems/${slug}`,
      languages: { en: `/en/systems/${slug}`, ar: `/ar/systems/${slug}` },
    },
    openGraph: {
      title,
      description: s.desc,
      url: `https://digitivaa.com/${locale}/systems/${slug}`,
      siteName: "Digitiva",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [{ url: `https://digitivaa.com${shotSrc(s, 0)}`, width: 1600, height: 1000, alt: s.name }],
      type: "website",
    },
  };
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const systems = getSystems(dict);
  const index = systems.findIndex((x) => x.key === slug);
  if (index === -1) notFound();

  return (
    <main className="relative bg-app-deep min-h-screen">
      <Grain />
      <CustomCursor />
      <Navbar dict={dict} locale={locale} />
      <SystemDetail s={systems[index]} next={systems[(index + 1) % systems.length]} dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </main>
  );
}
