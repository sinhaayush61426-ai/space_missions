import { Moon, Calendar, User } from "lucide-react";
import type { MajorMoon } from "@/data/planetsData";

interface MajorMoonsSectionProps {
  moons: MajorMoon[];
  planetColor: string;
  planetName: string;
}

const MajorMoonsSection = ({ moons, planetColor, planetName }: MajorMoonsSectionProps) => {
  if (!moons.length) return null;

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-background via-secondary/5 to-background">
      <div className="container mx-auto">
        <div className="mb-8">
          <p
            className="font-display text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: planetColor }}
          >
            Natural Satellites
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Major <span className="gold-gradient">Moons</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moons.map((moon, index) => (
            <div
              key={moon.name}
              className="bg-card border border-border/50 rounded-2xl p-6 opacity-0 animate-fade-in hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${planetColor}20` }}
                  >
                    <Moon className="w-5 h-5" style={{ color: planetColor }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{moon.name}</h3>
                    <p className="text-xs text-muted-foreground">⌀ {moon.diameter}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {moon.description}
              </p>

              {/* Notable feature */}
              <div
                className="rounded-lg p-3 mb-3 border"
                style={{ backgroundColor: `${planetColor}08`, borderColor: `${planetColor}20` }}
              >
                <p className="text-xs font-medium text-primary mb-1">Notable Feature</p>
                <p className="text-sm text-foreground leading-relaxed">{moon.notableFeature}</p>
              </div>

              {/* Discovery info */}
              {(moon.discoveredBy || moon.discoveredYear) && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {moon.discoveredBy && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {moon.discoveredBy}
                    </span>
                  )}
                  {moon.discoveredYear && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {moon.discoveredYear}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorMoonsSection;
