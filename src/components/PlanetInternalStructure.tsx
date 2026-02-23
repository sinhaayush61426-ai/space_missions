import { Layers } from "lucide-react";
import type { StructureLayer } from "@/data/planetsData";

interface PlanetInternalStructureProps {
  layers: StructureLayer[];
  planetColor: string;
  planetName: string;
}

const PlanetInternalStructure = ({ layers, planetColor, planetName }: PlanetInternalStructureProps) => {
  if (!layers.length) return null;

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <p
            className="font-display text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: planetColor }}
          >
            Cross Section
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Internal <span className="gold-gradient">Structure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Visual cross-section */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {layers.slice().reverse().map((layer, index) => {
                const totalLayers = layers.length;
                const reversedIndex = totalLayers - 1 - index;
                const maxSize = 280;
                const minSize = 60;
                const size = maxSize - (reversedIndex * ((maxSize - minSize) / (totalLayers - 1 || 1)));

                return (
                  <div
                    key={layer.name}
                    className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 border border-white/10"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: layer.color,
                      opacity: 0.9 - reversedIndex * 0.05,
                      zIndex: totalLayers - reversedIndex,
                    }}
                    title={layer.name}
                  />
                );
              })}
              {/* Placeholder to hold space */}
              <div style={{ width: 280, height: 280 }} />
            </div>
          </div>

          {/* Layer details */}
          <div className="space-y-3">
            {layers.map((layer, index) => (
              <div
                key={layer.name}
                className="flex items-start gap-4 bg-card border border-border/50 rounded-xl p-4 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0 mt-1 border border-white/20"
                  style={{ backgroundColor: layer.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-display font-semibold text-foreground">{layer.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{layer.depth}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanetInternalStructure;
