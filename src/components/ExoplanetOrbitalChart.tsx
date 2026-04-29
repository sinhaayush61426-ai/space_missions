import { useState } from "react";
import { motion } from "framer-motion";
import { exoplanetsData } from "@/data/exoplanetsData";

interface OrbitalData {
  name: string;
  color: string;
  periodDays: number;
  periodLabel: string;
}

type ScaleMode = "linear" | "logarithmic";

const parseYearLength = (s: string): number => {
  const lower = s.toLowerCase();
  if (lower.includes("earth days") || lower.includes("earth day")) {
    const num = parseFloat(lower.replace(/[^\d.]/g, ""));
    return num;
  }
  if (lower.includes("earth years") || lower.includes("earth year")) {
    const num = parseFloat(lower.replace(/[^\d.]/g, ""));
    return num * 365.25;
  }
  return 365.25;
};

const orbitalData: OrbitalData[] = exoplanetsData.map((p) => ({
  name: p.name,
  color: p.color,
  periodDays: parseYearLength(p.yearLength),
  periodLabel: p.yearLength,
}));

const earthPeriod = 365.25;

const ExoplanetOrbitalChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scaleMode, setScaleMode] = useState<ScaleMode>("logarithmic");

  const allData: OrbitalData[] = [
    ...orbitalData,
    { name: "Earth", color: "#3b82f6", periodDays: earthPeriod, periodLabel: "365.25 Earth days" },
  ].sort((a, b) => a.periodDays - b.periodDays);

  const maxRatio = Math.max(...allData.map((d) => d.periodDays / earthPeriod));
  const logMax = Math.log10(maxRatio + 1);

  return (
    <div className="mt-16 mb-8">
      <div className="text-center mb-8">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-2">
          Orbital Dynamics
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Exoplanet Years vs{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Earth
          </span>
        </h3>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Most known exoplanets orbit far closer to their stars, completing a "year" in just days
        </p>
        <div className="inline-flex mt-5 rounded-full border border-border bg-secondary/40 p-1">
          {(["linear", "logarithmic"] as ScaleMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setScaleMode(mode)}
              aria-pressed={scaleMode === mode}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                scaleMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "logarithmic" ? "Log" : "Linear"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {allData.map((planet, index) => {
          const ratio = planet.periodDays / earthPeriod;
          const logRatio = Math.log10(ratio + 1);
          const scaledPercent =
            scaleMode === "logarithmic" ? (logRatio / logMax) * 100 : (ratio / maxRatio) * 100;
          const barPercent = Math.max(2, scaledPercent);
          const isEarth = planet.name === "Earth";
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={planet.name}
              className="group flex items-center gap-3 cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className={`w-28 text-right text-xs font-medium shrink-0 transition-colors ${
                  isEarth
                    ? "text-blue-400"
                    : isHovered
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {planet.name}
              </span>

              <div className="flex-1 h-7 relative bg-secondary/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    backgroundColor: isEarth ? "#3b82f6" : planet.color,
                    opacity: isEarth ? 0.9 : 0.7,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${barPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                />
                <motion.span
                  className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-semibold whitespace-nowrap transition-opacity ${
                    isHovered || isEarth ? "opacity-100" : "opacity-60"
                  }`}
                  style={{ left: `calc(${Math.min(barPercent, 85)}% + 8px)` }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 + 0.5 }}
                >
                  <span className="text-foreground">
                    {ratio < 0.01
                      ? ratio.toFixed(3)
                      : ratio < 1
                      ? ratio.toFixed(2)
                      : ratio.toFixed(1)}
                    ×
                  </span>
                  <span className="text-muted-foreground ml-1.5 hidden sm:inline">
                    ({planet.periodLabel})
                  </span>
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] text-muted-foreground mt-4">
        1× = Earth's orbital period (365.25 days) · {scaleMode === "logarithmic" ? "Logarithmic" : "Linear"} scale · Earth shown as reference
      </p>
    </div>
  );
};

export default ExoplanetOrbitalChart;
