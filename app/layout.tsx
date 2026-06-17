import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollRestoration from "@/components/ScrollRestoration";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://digitivaa.com"),
  title: "Digitiva — Where Fresh Ideas Meet Digital Excellence",
  description:
    "Digitiva Studio blends strategy, emergent AI, and interface craft to launch timeless digital experiences — e-commerce, ERP, UI/UX, and custom invitations.",
  keywords:
    "digitiva, web development, ecommerce, erp systems, ui ux design, digital invitations, saudi arabia",
  icons: {
    icon: "/og-image.jpg",
    shortcut: "/og-image.jpg",
    apple: "/og-image.jpg",
  },
  openGraph: {
    title: "Digitiva — Where Fresh Ideas Meet Digital Excellence",
    description:
      "Digitiva Studio blends strategy, emergent AI, and interface craft to launch timeless digital experiences — e-commerce, ERP, UI/UX, and custom invitations.",
    url: "https://digitivaa.com",
    siteName: "Digitiva",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digitiva Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitiva — Where Fresh Ideas Meet Digital Excellence",
    description:
      "Digitiva Studio blends strategy, emergent AI, and interface craft to launch timeless digital experiences — e-commerce, ERP, UI/UX, and custom invitations.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="night"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-app-deep text-app antialiased overflow-x-hidden">
        <ScrollRestoration />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
