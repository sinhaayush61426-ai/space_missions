import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { exoplanetsData } from "@/data/exoplanetsData";

interface OrbitalData {
  name: string;
  color: string;
  periodDays: number;
  periodLabel: string;
}

type ScaleMode = "linear" | "logarithmic";

const scalePreferenceKey = "exoplanet-orbital-chart-scale";

const isScaleMode = (value: string | null): value is ScaleMode =>
  value === "linear" || value === "logarithmic";

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

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
};

const ExoplanetOrbitalChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [scaleMode, setScaleMode] = useState<ScaleMode>(() => {
    if (typeof window === "undefined") return "logarithmic";

    const savedScale = window.localStorage.getItem(scalePreferenceKey);
    return isScaleMode(savedScale) ? savedScale : "logarithmic";
  });

  const allData: OrbitalData[] = [
    ...orbitalData,
    { name: "Earth", color: "#3b82f6", periodDays: earthPeriod, periodLabel: "365.25 Earth days" },
  ].sort((a, b) => a.periodDays - b.periodDays);

  const maxRatio = Math.max(...allData.map((d) => d.periodDays / earthPeriod));
  const logMax = Math.log10(maxRatio + 1);

  useEffect(() => {
    window.localStorage.setItem(scalePreferenceKey, scaleMode);
  }, [scaleMode]);

  const focusRow = (index: number) => {
    const row = document.querySelector<HTMLElement>(`[data-exoplanet-orbit-row="${index}"]`);
    row?.focus();
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusRow((index + 1) % allData.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusRow((index - 1 + allData.length) % allData.length);
    }
  };

  const exportChartAsPng = () => {
    const canvas = document.createElement("canvas");
    const width = 1200;
    const height = 860;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(scale, scale);

    const background = context.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#030712");
    background.addColorStop(0.5, "#111827");
    background.addColorStop(1, "#1e1b4b");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(250, 204, 21, 0.08)";
    for (let i = 0; i < 80; i += 1) {
      const x = (i * 137) % width;
      const y = (i * 89) % height;
      context.beginPath();
      context.arc(x, y, i % 3 === 0 ? 1.6 : 0.9, 0, Math.PI * 2);
      context.fill();
    }

    context.textAlign = "center";
    context.fillStyle = "#facc15";
    context.font = "700 18px Inter, sans-serif";
    context.fillText("ORBITAL DYNAMICS", width / 2, 76);

    context.fillStyle = "#f8fafc";
    context.font = "800 44px Inter, sans-serif";
    context.fillText("Exoplanet Years vs Earth", width / 2, 132);

    context.fillStyle = "#94a3b8";
    context.font = "500 18px Inter, sans-serif";
    context.fillText(`Orbital periods compared on a ${scaleMode === "logarithmic" ? "logarithmic" : "linear"} scale`, width / 2, 170);

    const chartX = 150;
    const chartY = 230;
    const chartWidth = 860;
    const rowHeight = 62;
    const barX = 330;
    const barWidth = 620;

    allData.forEach((planet, index) => {
      const ratio = planet.periodDays / earthPeriod;
      const logRatio = Math.log10(ratio + 1);
      const scaledPercent =
        scaleMode === "logarithmic" ? (logRatio / logMax) * 100 : (ratio / maxRatio) * 100;
      const barPercent = Math.max(2, scaledPercent);
      const ratioLabel = ratio < 0.01 ? ratio.toFixed(3) : ratio < 1 ? ratio.toFixed(2) : ratio.toFixed(1);
      const y = chartY + index * rowHeight;
      const isEarth = planet.name === "Earth";

      context.textAlign = "right";
      context.fillStyle = isEarth ? "#60a5fa" : "#cbd5e1";
      context.font = "700 18px Inter, sans-serif";
      context.fillText(planet.name, chartX + 150, y + 28);

      context.fillStyle = "rgba(148, 163, 184, 0.16)";
      drawRoundedRect(context, barX, y + 5, barWidth, 32, 16);

      context.fillStyle = isEarth ? "#3b82f6" : planet.color;
      drawRoundedRect(context, barX, y + 5, (barWidth * barPercent) / 100, 32, 16);

      context.textAlign = "left";
      context.fillStyle = "#f8fafc";
      context.font = "700 16px Inter, sans-serif";
      context.fillText(`${ratioLabel}×`, Math.min(barX + (barWidth * barPercent) / 100 + 12, barX + barWidth - 120), y + 27);

      context.fillStyle = "#94a3b8";
      context.font = "500 14px Inter, sans-serif";
      context.fillText(planet.periodLabel, barX + barWidth + 20, y + 27);
    });

    context.textAlign = "center";
    context.fillStyle = "#94a3b8";
    context.font = "500 15px Inter, sans-serif";
    context.fillText("1× = Earth's orbital period (365.25 days) · Earth shown as reference", width / 2, height - 64);

    const link = document.createElement("a");
    link.download = `exoplanet-years-vs-earth-${scaleMode}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mt-16 mb-8" aria-labelledby="exoplanet-orbital-chart-title">
      <div className="text-center mb-8">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-2">
          Orbital Dynamics
        </p>
        <h3 id="exoplanet-orbital-chart-title" className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Exoplanet Years vs{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Earth
          </span>
        </h3>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Most known exoplanets orbit far closer to their stars, completing a "year" in just days
        </p>
        <div
          className="inline-flex mt-5 rounded-full border border-border bg-secondary/40 p-1"
          role="group"
          aria-label="Choose orbital period chart scale"
        >
          {(["linear", "logarithmic"] as ScaleMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setScaleMode(mode)}
              aria-pressed={scaleMode === mode}
              aria-label={`Show orbital periods on a ${mode} scale`}
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
        <button
          type="button"
          onClick={exportChartAsPng}
          aria-label={`Export Exoplanet Years vs Earth chart as a PNG using the ${scaleMode} scale`}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Export PNG
        </button>
      </div>

      <div
        className="max-w-3xl mx-auto space-y-3"
        role="list"
        aria-label={`Exoplanet orbital periods compared with Earth's year on a ${scaleMode} scale`}
      >
        {allData.map((planet, index) => {
          const ratio = planet.periodDays / earthPeriod;
          const logRatio = Math.log10(ratio + 1);
          const scaledPercent =
            scaleMode === "logarithmic" ? (logRatio / logMax) * 100 : (ratio / maxRatio) * 100;
          const barPercent = Math.max(2, scaledPercent);
          const isEarth = planet.name === "Earth";
          const isHovered = hoveredIndex === index || focusedIndex === index;
          const ratioLabel =
            ratio < 0.01 ? ratio.toFixed(3) : ratio < 1 ? ratio.toFixed(2) : ratio.toFixed(1);

          return (
            <div
              key={planet.name}
              role="listitem"
              tabIndex={0}
              data-exoplanet-orbit-row={index}
              aria-label={`${planet.name}: orbital period ${planet.periodLabel}, ${ratioLabel} times Earth's orbital period`}
              className="group flex items-center gap-3 cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(event) => handleRowKeyDown(event, index)}
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
                    {ratioLabel}×
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
