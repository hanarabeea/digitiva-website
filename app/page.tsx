import Grain from "@/components/Grain";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import FloatingTech from "@/components/FloatingTech";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Founders from "@/components/Founders";
import Invitations from "@/components/Invitations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-app-deep">
      <Preloader />
      <Grain />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <FloatingTech />
      <Work />
      <Process />
      <Services />
      <Founders />
      <Invitations />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
