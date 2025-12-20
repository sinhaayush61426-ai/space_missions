import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Clock, Calendar, Moon } from "lucide-react";
import { getPlanetById } from "@/data/planetsData";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Planet3D from "@/components/Planet3D";
import MissionTimeline from "@/components/MissionTimeline";
import SpacecraftGallery from "@/components/SpacecraftGallery";
import marsImage from "@/assets/mars.png";

const planetImages: Record<string, string> = {
  mars: marsImage,
};

const PlanetDetail = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const planet = getPlanetById(planetId || "");

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

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Planet Info */}
              <div className="opacity-0 animate-fade-in">
                <p 
                  className="font-display text-sm tracking-[0.3em] uppercase mb-4"
                  style={{ color: planet.color }}
                >
                  {planet.distance}
                </p>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
                  {planet.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
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
        <section className="py-16 px-6 border-t border-border/50">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground mb-4">Continue exploring</p>
            <Link 
              to="/#planets"
              className="inline-flex items-center gap-2 font-display text-primary hover:text-foreground transition-colors"
            >
              <span>View All Planets</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlanetDetail;
