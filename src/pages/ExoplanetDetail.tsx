import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Globe, Clock, Calendar, Thermometer, Scale, Wind, Star, Telescope, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getExoplanetById, exoplanetsData } from "@/data/exoplanetsData";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import PlanetInternalStructure from "@/components/PlanetInternalStructure";
import MobileBottomNav from "@/components/MobileBottomNav";
import FavoriteButton from "@/components/FavoriteButton";

import proximaCentauriBImage from "@/assets/proxima-centauri-b.png";
import trappist1eImage from "@/assets/trappist-1e.png";
import trappist1fImage from "@/assets/trappist-1f.png";
import trappist1gImage from "@/assets/trappist-1g.png";
import kepler452bImage from "@/assets/kepler-452b.png";
import toi700dImage from "@/assets/toi-700d.png";

const exoplanetImages: Record<string, string> = {
  "proxima-centauri-b": proximaCentauriBImage,
  "trappist-1e": trappist1eImage,
  "trappist-1f": trappist1fImage,
  "trappist-1g": trappist1gImage,
  "kepler-452b": kepler452bImage,
  "toi-700d": toi700dImage,
};

const exoplanetIds = exoplanetsData.map((p) => p.id);

const ExoplanetDetail = () => {
  const { exoplanetId } = useParams<{ exoplanetId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const exoplanet = getExoplanetById(exoplanetId || "");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [exoplanetId]);

  if (!exoplanet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Exoplanet Not Found</h1>
          <Link to="/#exoplanets" className="text-primary hover:underline">Return to Exoplanets</Link>
        </div>
      </div>
    );
  }

  const currentIndex = exoplanetIds.indexOf(exoplanet.id);
  const prevExo = currentIndex > 0 ? exoplanetsData[currentIndex - 1] : null;
  const nextExo = currentIndex < exoplanetIds.length - 1 ? exoplanetsData[currentIndex + 1] : null;

  const stats = [
    { icon: Globe, label: "Diameter", value: exoplanet.diameter },
    { icon: Clock, label: "Day Length", value: exoplanet.dayLength },
    { icon: Calendar, label: "Year Length", value: exoplanet.yearLength },
    { icon: Scale, label: "Gravity", value: exoplanet.gravity },
    { icon: Thermometer, label: "Temperature", value: exoplanet.temperature },
    { icon: MapPin, label: "Distance", value: exoplanet.distance },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Starfield />
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative min-h-screen bg-background overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Starfield />
      <Navbar />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="relative py-12 px-6">
          <div className="container mx-auto">
            <Link
              to="/#exoplanets"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Exoplanets</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Info */}
              <div className="opacity-0 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {exoplanet.type}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {exoplanet.habitabilityIndex.split(" — ")[0]} habitability
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
                  {exoplanet.name}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  {exoplanet.longDescription}
                </p>

                {/* Host Star Info */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span><span className="text-foreground font-medium">Star:</span> {exoplanet.hostStar.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Telescope className="w-4 h-4 text-primary" />
                    <span><span className="text-foreground font-medium">Discovered:</span> {exoplanet.discoveredYear} via {exoplanet.discoveryMethod}</span>
                  </div>
                </div>

                {/* Atmosphere badge */}
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <Wind className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Atmosphere:</span> {exoplanet.atmosphere}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

              {/* Planet Image */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-3xl opacity-30"
                    style={{ backgroundColor: exoplanet.color }}
                  />
                  <img
                    src={exoplanetImages[exoplanet.id]}
                    alt={exoplanet.name}
                    className="relative w-full max-w-lg mx-auto rounded-2xl border border-border/50"
                  />
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
              {exoplanet.facts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-card border border-border/50 rounded-xl p-4 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: exoplanet.color }}
                  />
                  <p className="text-foreground">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Host Star Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Host <span className="text-yellow-400">Star</span>
            </h2>
            <div className="bg-card border border-border/50 rounded-2xl p-6 max-w-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                  <p className="font-display font-bold text-foreground">{exoplanet.hostStar.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Type</p>
                  <p className="font-display font-bold text-foreground">{exoplanet.hostStar.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Distance</p>
                  <p className="font-display font-bold text-foreground">{exoplanet.hostStar.distance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Constellation</p>
                  <p className="font-display font-bold text-foreground">{exoplanet.hostStar.constellation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Structure */}
        <PlanetInternalStructure
          layers={exoplanet.structure}
          planetColor={exoplanet.color}
          planetName={exoplanet.name}
        />

        {/* Observation Timeline */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="mb-8">
              <p
                className="font-display text-sm tracking-[0.3em] uppercase mb-2"
                style={{ color: exoplanet.color }}
              >
                Discovery & Observation
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Observation <span className="gold-gradient">Timeline</span>
              </h2>
            </div>

            <div className="space-y-6">
              {exoplanet.missions.map((mission, index) => {
                const statusColors = {
                  completed: "text-green-400 border-green-400/30 bg-green-400/10",
                  active: "text-primary border-primary/30 bg-primary/10",
                  upcoming: "text-accent border-accent/30 bg-accent/10",
                };
                return (
                  <div
                    key={index}
                    className="bg-card border border-border/50 rounded-xl p-6 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <Telescope className="w-5 h-5 text-primary" />
                        <h3 className="font-display text-lg font-bold text-foreground">{mission.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {mission.year}{mission.endYear ? `–${mission.endYear}` : ""}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[mission.status]}`}>
                          {mission.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {mission.achievements.map((a, i) => (
                        <span key={i} className="text-xs bg-secondary/60 text-muted-foreground px-2 py-1 rounded-md border border-border/30">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-16 px-6 border-t border-border/50 pb-24 md:pb-16">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              {exoplanetIds.map((id, index) => (
                <Link
                  key={id}
                  to={`/exoplanet/${id}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to ${exoplanetsData[index].name}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between max-w-md mx-auto mb-6">
              {prevExo ? (
                <Link
                  to={`/exoplanet/${prevExo.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="text-sm font-medium" style={{ color: prevExo.color }}>{prevExo.name}</p>
                  </div>
                </Link>
              ) : <div />}
              {nextExo ? (
                <Link
                  to={`/exoplanet/${nextExo.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="text-sm font-medium" style={{ color: nextExo.color }}>{nextExo.name}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>

            <div className="text-center">
              <Link
                to="/#exoplanets"
                className="inline-flex items-center gap-2 font-display text-primary hover:text-foreground transition-colors"
              >
                <span>View All Exoplanets</span>
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

export default ExoplanetDetail;
