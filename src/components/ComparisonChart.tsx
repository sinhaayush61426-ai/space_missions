import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Weight, Ruler, ChevronDown } from "lucide-react";

export interface ChartPlanet {
  id: string;
  name: string;
  color: string;
  diameter: number;   // km
  gravity: number;    // m/s²
  temperature: number; // °C (average or representative)
  label?: string;      // optional badge like "Terrestrial", "High"
}

type MetricKey = "size" | "gravity" | "temperature";

const metricConfig: { key: MetricKey; label: string; icon: typeof Ruler; format: (val: number, ref: number) => string; desc: (refName: string) => string }[] = [
  {
    key: "size",
    label: "Size",
    icon: Ruler,
    format: (val, ref) => ref === 0 ? "—" : `${(val / ref).toFixed(2)}×`,
    desc: (refName) => `Diameter relative to ${refName}`,
  },
  {
    key: "gravity",
    label: "Gravity",
    icon: Weight,
    format: (val, ref) => ref === 0 ? "—" : `${(val / ref).toFixed(2)}×`,
    desc: (refName) => `Surface gravity relative to ${refName}`,
  },
  {
    key: "temperature",
    label: "Temperature",
    icon: Thermometer,
    format: (val) => `${val}°C`,
    desc: () => `Average or equilibrium temperature`,
  },
];

function getRawValue(p: ChartPlanet, key: MetricKey): number {
  switch (key) {
    case "size": return p.diameter;
    case "gravity": return p.gravity;
    case "temperature": return p.temperature;
  }
}

interface ComparisonChartProps {
  planets: ChartPlanet[];
  title: string;
  subtitle: string;
  gradientColors: [string, string]; // from, to for the title gradient
  defaultRefId?: string;            // default reference planet id
}

const ComparisonChart = ({ planets, title, subtitle, gradientColors, defaultRefId }: ComparisonChartProps) => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("size");
  const [referenceId, setReferenceId] = useState(defaultRefId || planets[0]?.id || "");
  const [refDropdownOpen, setRefDropdownOpen] = useState(false);

  const referencePlanet = useMemo(() => planets.find((p) => p.id === referenceId) || planets[0], [planets, referenceId]);

  // For temperature, use absolute values; for others, normalize to reference
  const chartData = useMemo(() => {
    const refVal = getRawValue(referencePlanet, activeMetric);
    return planets.map((p) => {
      const raw = getRawValue(p, activeMetric);
      let normalized: number;
      if (activeMetric === "temperature") {
        // Use absolute scale shifted so all values are positive for bar display
        const allTemps = planets.map((pp) => getRawValue(pp, "temperature"));
        const minT = Math.min(...allTemps);
        const maxT = Math.max(...allTemps);
        const range = maxT - minT || 1;
        normalized = (raw - minT + range * 0.05) / (range * 1.1);
      } else {
        normalized = refVal === 0 ? 0 : raw / refVal;
      }
      return { planet: p, raw, normalized };
    });
  }, [planets, referencePlanet, activeMetric]);

  const maxNorm = Math.max(...chartData.map((d) => d.normalized), 0.01);
  const currentMetric = metricConfig.find((m) => m.key === activeMetric)!;

  return (
    <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-2">
          {subtitle}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          {title.split(" ")[0]}{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
            }}
          >
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h3>
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        {/* Metric Selector */}
        <div className="flex gap-2">
          {metricConfig.map((m) => {
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

        {/* Reference Selector */}
        {activeMetric !== "temperature" && (
          <div className="relative">
            <button
              onClick={() => setRefDropdownOpen(!refDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: referencePlanet.color }} />
              <span>vs {referencePlanet.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${refDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {refDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setRefDropdownOpen(false)} />
                <div className="absolute top-full mt-1 right-0 z-20 bg-card border border-border rounded-xl shadow-xl py-1 min-w-[180px] max-h-60 overflow-y-auto">
                  {planets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setReferenceId(p.id);
                        setRefDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                        p.id === referenceId
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {chartData.map(({ planet, raw, normalized }, i) => {
              const pct = Math.min((normalized / maxNorm) * 100, 100);
              const isRef = planet.id === referenceId && activeMetric !== "temperature";

              const displayVal = currentMetric.format(raw, getRawValue(referencePlanet, activeMetric));

              return (
                <motion.div
                  key={`${activeMetric}-${referenceId}-${planet.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={`flex items-center gap-3 md:gap-4 ${
                    isRef
                      ? "py-3 border border-dashed border-primary/30 rounded-xl px-4 bg-primary/5"
                      : "py-2"
                  }`}
                >
                  {/* Planet name */}
                  <div className="w-32 md:w-40 flex-shrink-0 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: planet.color }}
                    />
                    <span className={`text-sm font-medium truncate ${isRef ? "text-primary" : "text-foreground"}`}>
                      {planet.name}
                    </span>
                    {isRef && (
                      <span className="text-[9px] uppercase tracking-wider text-primary/70 font-bold flex-shrink-0">REF</span>
                    )}
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-7 bg-secondary/30 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, 2)}%` }}
                      transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                      style={{
                        background: isRef
                          ? `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))`
                          : `linear-gradient(90deg, ${planet.color}, ${planet.color}88)`,
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/90 drop-shadow-sm">
                      {displayVal}
                    </span>
                  </div>

                  {/* Optional label */}
                  {planet.label && (
                    <span className="text-[10px] font-bold uppercase tracking-wider w-20 text-right flex-shrink-0 text-muted-foreground hidden sm:block">
                      {planet.label}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span>{currentMetric.desc(referencePlanet.name)}</span>
          {activeMetric !== "temperature" && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {referencePlanet.name} = 1.00× (reference)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
