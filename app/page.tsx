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
export default function Home() {
  return (
    <>
      <main className="relative bg-app-deep">
        <Grain />
        <CustomCursor />
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Process />
        <Disciplines />
        <Services />
        <Invitations />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
