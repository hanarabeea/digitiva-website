import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Cairo } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollRestoration from "@/components/ScrollRestoration";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import { notFound } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    icons: {
      icon: "/logo-light.png",
      shortcut: "/logo-light.png",
      apple: "/logo-light.png",
    },
    metadataBase: new URL("https://www.digitivaa.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://digitivaa.com/${locale}`,
      siteName: "Digitiva",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: "https://digitivaa.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["https://digitivaa.com/og-image.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      data-theme="night"
      className={`${spaceGrotesk.variable}${lang === "ar" ? ` ${cairo.variable}` : ""}`}
      suppressHydrationWarning
    >
      <body
        className={`bg-app-deep text-app antialiased overflow-x-hidden ${
          lang === "ar" ? "font-cairo" : ""
        }`}
      >
        <ScrollRestoration />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
