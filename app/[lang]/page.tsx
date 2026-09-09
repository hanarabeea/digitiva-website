import { notFound } from "next/navigation";
import Grain from "@/components/Grain";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Disciplines from "@/components/Disciplines";
import Services from "@/components/Services";
import Invitations from "@/components/Invitations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <main className="relative bg-app-deep">
        <Grain />
        <CustomCursor />
        <Navbar dict={dict} locale={locale} />
        <Hero dict={dict} />
        <Marquee dict={dict} />
        <About dict={dict} />
        <Work dict={dict} />
        <Process dict={dict} />
        <Disciplines dict={dict} />
        <Services dict={dict} />
        <Invitations dict={dict} />
        <FAQ dict={dict} />
        <Contact dict={dict} />
        <Footer dict={dict} locale={locale} />
      </main>
    </>
  );
}
