import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
});

export const metadata: Metadata = {
  title: "Digitiva — Where Fresh Ideas Meet Digital Excellence",
  description:
    "Digitiva Studio blends strategy, emergent AI, and interface craft to launch timeless digital experiences — e-commerce, ERP, UI/UX, and custom invitations.",
  keywords:
    "digitiva, web development, ecommerce, erp systems, ui ux design, digital invitations, saudi arabia",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="night"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-app-deep text-app antialiased overflow-x-hidden">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
