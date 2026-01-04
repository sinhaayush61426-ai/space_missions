import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Globe, Clock, Calendar, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getPlanetById, planetsData } from "@/data/planetsData";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Planet3D from "@/components/Planet3D";
import MissionTimeline from "@/components/MissionTimeline";
import SpacecraftGallery from "@/components/SpacecraftGallery";
import MobileBottomNav from "@/components/MobileBottomNav";
import { usePlanetSwipeNavigation } from "@/hooks/useSwipeNavigation";
import marsImage from "@/assets/mars.png";

const planetImages: Record<string, string> = {
  mars: marsImage,
};

const planetIds = planetsData.map((p) => p.id);

const PlanetDetail = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const location = useLocation();
  const planet = getPlanetById(planetId || "");
  
  // Get navigation direction from location state
  const direction = (location.state as { direction?: "left" | "right" })?.direction || "none";

  if (!planet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Planet Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Globe, label: "Diameter", value: planet.diameter },
    { icon: Clock, label: "Day Length", value: planet.dayLength },
    { icon: Calendar, label: "Year Length", value: planet.yearLength },
    { icon: Moon, label: "Moons", value: planet.moons.toString() },
  ];

  // Swipe navigation for mobile
  const { handlers, prevPlanet, nextPlanet, currentIndex, totalPlanets } = usePlanetSwipeNavigation(
    planetId || "",
    planetIds
  );

  const prevPlanetData = prevPlanet ? getPlanetById(prevPlanet) : null;
  const nextPlanetData = nextPlanet ? getPlanetById(nextPlanet) : null;

  // Animation variants
  const pageVariants = {
    initial: (dir: string) => ({
      x: dir === "none" ? 0 : dir === "left" ? "100%" : "-100%",
      opacity: dir === "none" ? 1 : 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: string) => ({
      x: dir === "none" ? 0 : dir === "left" ? "-100%" : "100%",
      opacity: dir === "none" ? 1 : 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <motion.div 
      className="relative min-h-screen bg-background overflow-x-hidden"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      {...handlers}
    >
      <Starfield />
      <Navbar />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="relative py-12 px-6">
          <div className="container mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Solar System</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Planet Info */}
              <div className="opacity-0 animate-fade-in">
                <p 
                  className="font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4"
                  style={{ color: planet.color }}
                >
                  {planet.distance}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 sm:mb-6">
                  {planet.name}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                  {planet.longDescription}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className="bg-card border border-border/50 rounded-xl p-4 opacity-0 animate-fade-in"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="font-display text-lg font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Planet */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  {/* Glow effect behind planet */}
                  <div 
                    className="absolute inset-0 blur-3xl opacity-30"
                    style={{ backgroundColor: planet.color }}
                  />
                  <Planet3D color={planet.color} planetId={planet.id} />
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Drag to rotate • Scroll to zoom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facts Section */}
        <section className="py-12 px-6 bg-gradient-to-b from-background via-secondary/10 to-background">
          <div className="container mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Quick <span className="text-primary">Facts</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planet.facts.map((fact, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 bg-card border border-border/50 rounded-xl p-4 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span 
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: planet.color }}
                  />
                  <p className="text-foreground">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planet Image (if available) */}
        {planetImages[planet.id] && (
          <section className="py-12 px-6">
            <div className="container mx-auto">
              <div className="relative max-w-2xl mx-auto">
                <div 
                  className="absolute inset-0 blur-3xl opacity-20"
                  style={{ backgroundColor: planet.color }}
                />
                <img 
                  src={planetImages[planet.id]} 
                  alt={planet.name}
                  className="relative w-full rounded-2xl border border-border/50"
                />
              </div>
            </div>
          </section>
        )}

        {/* Mission Timeline */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="mb-8">
              <p 
                className="font-display text-sm tracking-[0.3em] uppercase mb-2"
                style={{ color: planet.color }}
              >
                Exploration History
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Mission <span className="gold-gradient">Timeline</span>
              </h2>
            </div>

            <MissionTimeline missions={planet.missions} planetColor={planet.color} />
          </div>
        </section>

        {/* Spacecraft Gallery */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <SpacecraftGallery planetId={planet.id} />
          </div>
        </section>

        {/* Navigation to other planets */}
        <section className="py-16 px-6 border-t border-border/50 pb-24 md:pb-16">
          <div className="container mx-auto">
            {/* Planet navigation dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {planetIds.map((id, index) => (
                <Link
                  key={id}
                  to={`/planet/${id}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary scale-125" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to ${planetsData[index].name}`}
                />
              ))}
            </div>
            
            {/* Previous/Next navigation */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-6">
              {prevPlanetData ? (
                <Link
                  to={`/planet/${prevPlanet}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="text-sm font-medium" style={{ color: prevPlanetData.color }}>
                      {prevPlanetData.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {nextPlanetData ? (
                <Link
                  to={`/planet/${nextPlanet}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="text-sm font-medium" style={{ color: nextPlanetData.color }}>
                      {nextPlanetData.name}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Swipe hint for mobile */}
            <p className="text-xs text-muted-foreground text-center md:hidden mb-4">
              Swipe left or right to navigate planets
            </p>
            
            <div className="text-center">
              <Link 
                to="/#planets"
                className="inline-flex items-center gap-2 font-display text-primary hover:text-foreground transition-colors"
              >
                <span>View All Planets</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <MobileBottomNav />
    </motion.div>
  );
};

export default PlanetDetail;
