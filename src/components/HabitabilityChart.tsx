import { useState } from "react";
import { exoplanetsData } from "@/data/exoplanetsData";
import { motion, AnimatePresence } from "framer-motion";
import { Earth, Thermometer, Weight, Ruler } from "lucide-react";

// Normalized data for comparison (Earth = 1.0)
interface PlanetMetrics {
  name: string;
  color: string;
  size: number;       // relative to Earth diameter (12,742 km)
  gravity: number;    // relative to Earth gravity (9.8 m/s²)
  temperature: number; // actual °C for display, normalized for bar
  tempNorm: number;   // 0-1 scale where Earth=sweet spot
  habitability: "Low" | "Moderate" | "High";
}

const EARTH_DIAMETER = 12742;
const EARTH_GRAVITY = 9.8;
const EARTH_TEMP = 15; // °C average

function parseGravity(g: string): number {
  const match = g.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 9.8;
}

function parseDiameter(d: string): number {
  const match = d.match(/([\d,]+)/);
  return match ? parseFloat(match[1].replace(",", "")) : EARTH_DIAMETER;
}

function parseTemp(t: string): number {
  const match = t.match(/([-\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

// Temperature habitability: closer to Earth's 15°C = better score
function tempScore(tempC: number): number {
  const diff = Math.abs(tempC - EARTH_TEMP);
  return Math.max(0, 1 - diff / 150);
}

const earthMetrics: PlanetMetrics = {
  name: "Earth",
  color: "hsl(var(--earth-green))",
  size: 1,
  gravity: 1,
  temperature: EARTH_TEMP,
  tempNorm: 1,
  habitability: "High",
};

const exoMetrics: PlanetMetrics[] = exoplanetsData.map((exo) => {
  const diameter = parseDiameter(exo.diameter);
  const gravity = parseGravity(exo.gravity);
  const temp = parseTemp(exo.temperature);
  const hab = exo.habitabilityIndex.split(" — ")[0] as "Low" | "Moderate" | "High";
  return {
    name: exo.name,
    color: exo.color,
    size: diameter / EARTH_DIAMETER,
    gravity: gravity / EARTH_GRAVITY,
    temperature: temp,
    tempNorm: tempScore(temp),
    habitability: hab,
  };
});

const allPlanets = [earthMetrics, ...exoMetrics];

type MetricKey = "size" | "gravity" | "tempNorm";
const metrics: { key: MetricKey; label: string; icon: typeof Earth; unit: string; earthVal: string }[] = [
  { key: "size", label: "Size", icon: Ruler, unit: "× Earth", earthVal: "1.00×" },
  { key: "gravity", label: "Gravity", icon: Weight, unit: "× Earth", earthVal: "1.00×" },
  { key: "tempNorm", label: "Temperature", icon: Thermometer, unit: "habitability", earthVal: "15°C" },
];

const habColors: Record<string, string> = {
  Low: "text-red-400",
  Moderate: "text-primary",
  High: "text-emerald-400",
};

const HabitabilityChart = () => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("size");

  const maxVal = Math.max(...allPlanets.map((p) => p[activeMetric]), 1);

  return (
    <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-2">
          How Do They Compare?
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Habitability <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Comparison</span>
        </h3>
      </div>

      {/* Metric Selector */}
      <div className="flex justify-center gap-2 mb-8">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeMetric === m.key
                  ? "bg-primary/20 text-primary border-primary/50"
                  : "bg-secondary/30 text-muted-foreground border-border/30 hover:text-foreground hover:border-border/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {allPlanets.map((planet, i) => {
              const val = planet[activeMetric];
              const pct = Math.min((val / maxVal) * 100, 100);
              const isEarth = planet.name === "Earth";

              // Display value
              let displayVal: string;
              if (activeMetric === "tempNorm") {
                displayVal = isEarth ? "15°C" : `${planet.temperature}°C`;
              } else {
                displayVal = `${val.toFixed(2)}×`;
              }

              return (
                <motion.div
                  key={`${activeMetric}-${planet.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`flex items-center gap-4 ${isEarth ? "py-3 border border-dashed border-emerald-500/30 rounded-xl px-4 bg-emerald-500/5" : "py-2"}`}
                >
                  {/* Planet name */}
                  <div className="w-36 md:w-44 flex-shrink-0 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: planet.color }}
                    />
                    <span className={`text-sm font-medium truncate ${isEarth ? "text-emerald-400" : "text-foreground"}`}>
                      {planet.name}
                    </span>
                    {isEarth && (
                      <Earth className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-7 bg-secondary/30 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                      style={{
                        background: isEarth
                          ? "linear-gradient(90deg, hsl(var(--earth-green)), hsl(var(--earth-green) / 0.6))"
                          : `linear-gradient(90deg, ${planet.color}, ${planet.color}88)`,
                      }}
                    />
                    {/* Value label */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/90 drop-shadow-sm">
                      {displayVal}
                    </span>
                  </div>

                  {/* Habitability badge */}
                  <span className={`text-[10px] font-bold uppercase tracking-wider w-20 text-right flex-shrink-0 ${habColors[planet.habitability]}`}>
                    {planet.habitability}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Earth (reference)
          </span>
          <span>
            {activeMetric === "tempNorm"
              ? "Closer to Earth's 15°C = higher habitability score"
              : `Values shown relative to Earth (1.00×)`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitabilityChart;
