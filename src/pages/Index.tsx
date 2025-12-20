import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlanetsSection from "@/components/PlanetsSection";
import OuterMissions from "@/components/OuterMissions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Starfield />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <PlanetsSection />
        <section id="outer">
          <OuterMissions />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
