import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Problem from "@/components/Problem";
import DataSection from "@/components/DataSection";
import Blueprint from "@/components/Blueprint";
import TechStack from "@/components/TechStack";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <div className="grid-bg" />
      <div className="corner-mark top-left">KTK-2025</div>
      <div className="corner-mark bottom-right">INTERNAL RESEARCH UNIT</div>

      <ClientEffects />
      <Navbar />
      <Hero />
      <Services />
      <Problem />
      <DataSection />
      <Blueprint />
      <TechStack />
      <FAQ />
      <Footer />
    </>
  );
}
