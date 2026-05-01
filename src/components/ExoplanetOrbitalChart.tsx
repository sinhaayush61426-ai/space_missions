import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, RotateCcw } from "lucide-react";
import { exoplanetsData } from "@/data/exoplanetsData";

interface OrbitalData {
  name: string;
  color: string;
  periodDays: number;
  periodLabel: string;
}

type ScaleMode = "linear" | "logarithmic";

const scalePreferenceKey = "exoplanet-orbital-chart-scale";
const tooltipsPreferenceKey = "exoplanet-orbital-chart-tooltips";
const tooltipUnitPreferenceKey = "exoplanet-orbital-chart-tooltip-unit";
const tooltipDelayPreferenceKey = "exoplanet-orbital-chart-tooltip-delay";

const MIN_TOOLTIP_DELAY = 0;
const MAX_TOOLTIP_DELAY = 300;
const DEFAULT_TOOLTIP_DELAY = 120;

const clampTooltipDelay = (value: number): number => {
  if (Number.isNaN(value)) return DEFAULT_TOOLTIP_DELAY;
  return Math.min(MAX_TOOLTIP_DELAY, Math.max(MIN_TOOLTIP_DELAY, Math.round(value)));
};

type TooltipUnit = "years" | "days";

const isScaleMode = (value: string | null): value is ScaleMode =>
  value === "linear" || value === "logarithmic";

const isTooltipUnit = (value: string | null): value is TooltipUnit =>
  value === "years" || value === "days";

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

const formatEarthYears = (periodDays: number): string => {
  const earthYears = periodDays / earthPeriod;

  if (earthYears < 0.01) return `${earthYears.toFixed(4)} Earth years`;
  if (earthYears < 1) return `${earthYears.toFixed(3)} Earth years`;
  return `${earthYears.toFixed(2)} Earth years`;
};

const formatEarthDays = (periodDays: number): string => {
  if (periodDays < 1) return `${periodDays.toFixed(3)} Earth days`;
  if (periodDays < 10) return `${periodDays.toFixed(2)} Earth days`;
  return `${periodDays.toFixed(1)} Earth days`;
};

const formatOrbitalPeriod = (periodDays: number, unit: TooltipUnit): string =>
  unit === "days" ? formatEarthDays(periodDays) : formatEarthYears(periodDays);

const formatPercentDifference = (ratio: number): string => {
  const percentDifference = (ratio - 1) * 100;

  if (Math.abs(percentDifference) < 0.05) return "0.0% difference vs Earth";

  const direction = percentDifference > 0 ? "longer" : "shorter";
  return `${Math.abs(percentDifference).toFixed(1)}% ${direction} than Earth`;
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
  const [tooltipShift, setTooltipShift] = useState(0);
  const tooltipRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const hoverTimeoutRef = useRef<number | null>(null);
  const settingsHydratedRef = useRef(false);
  const [settingsAnnouncement, setSettingsAnnouncement] = useState("");
  const activeIndex = focusedIndex ?? hoveredIndex;
  const [scaleMode, setScaleMode] = useState<ScaleMode>(() => {
    if (typeof window === "undefined") return "logarithmic";

    const savedScale = window.localStorage.getItem(scalePreferenceKey);
    return isScaleMode(savedScale) ? savedScale : "logarithmic";
  });
  const [tooltipsEnabled, setTooltipsEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(tooltipsPreferenceKey) !== "false";
  });
  const [tooltipUnit, setTooltipUnit] = useState<TooltipUnit>(() => {
    if (typeof window === "undefined") return "years";
    const saved = window.localStorage.getItem(tooltipUnitPreferenceKey);
    return isTooltipUnit(saved) ? saved : "years";
  });
  const [tooltipDelay, setTooltipDelay] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_TOOLTIP_DELAY;
    const saved = window.localStorage.getItem(tooltipDelayPreferenceKey);
    if (saved === null) return DEFAULT_TOOLTIP_DELAY;
    return clampTooltipDelay(Number(saved));
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

  useEffect(() => {
    window.localStorage.setItem(tooltipsPreferenceKey, String(tooltipsEnabled));
  }, [tooltipsEnabled]);

  useEffect(() => {
    window.localStorage.setItem(tooltipUnitPreferenceKey, tooltipUnit);
  }, [tooltipUnit]);

  useEffect(() => {
    window.localStorage.setItem(tooltipDelayPreferenceKey, String(tooltipDelay));
  }, [tooltipDelay]);

  useEffect(() => {
    if (!settingsHydratedRef.current) {
      settingsHydratedRef.current = true;
      return;
    }
    const unitLabel = tooltipUnit === "years" ? "Earth years" : "Earth days";
    const message = tooltipsEnabled
      ? `Hover tooltips enabled. Showing orbital periods in ${unitLabel}.`
      : "Hover tooltips disabled.";
    setSettingsAnnouncement(message);
  }, [tooltipsEnabled, tooltipUnit]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleRowMouseEnter = (index: number) => {
    clearHoverTimeout();
    if (tooltipDelay <= 0) {
      setHoveredIndex(index);
      return;
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredIndex(index);
      hoverTimeoutRef.current = null;
    }, tooltipDelay);
  };

  const handleRowMouseLeave = () => {
    clearHoverTimeout();
    setHoveredIndex(null);
  };

  useLayoutEffect(() => {
    if (activeIndex === null) {
      setTooltipShift(0);
      return;
    }
    const tooltip = tooltipRefs.current.get(activeIndex);
    if (!tooltip) return;

    // Temporarily clear transform to measure natural position
    const prevTransform = tooltip.style.transform;
    tooltip.style.transform = "translateX(-50%)";
    const rect = tooltip.getBoundingClientRect();
    tooltip.style.transform = prevTransform;

    const margin = 8;
    let shift = 0;
    if (rect.left < margin) shift = margin - rect.left;
    else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right;
    setTooltipShift(shift);
  }, [activeIndex]);

  const focusRow = (index: number) => {
    const row = document.querySelector<HTMLElement>(`[data-exoplanet-orbit-row="${index}"]`);
    row?.focus();
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusRow((index + 1) % allData.length);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusRow((index - 1 + allData.length) % allData.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFocusedIndex(index);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      clearHoverTimeout();
      setFocusedIndex(null);
      setHoveredIndex(null);
      event.currentTarget.blur();
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

  const resetChartSettings = () => {
    clearHoverTimeout();
    setScaleMode("logarithmic");
    setTooltipsEnabled(true);
    setTooltipUnit("years");
    setTooltipDelay(DEFAULT_TOOLTIP_DELAY);
    setHoveredIndex(null);
    setFocusedIndex(null);
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      const active = document.activeElement;
      if (active.hasAttribute("data-exoplanet-orbit-row")) active.blur();
    }
  };

  const exportChartAsCsv = () => {
    const escapeCsv = (value: string): string => {
      if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
      return value;
    };

    const headers = [
      "Planet",
      "Orbital period (Earth days)",
      "Orbital period (Earth years)",
      "Ratio vs Earth",
      "Percent difference vs Earth",
    ];

    const rows = allData.map((planet) => {
      const earthYears = planet.periodDays / earthPeriod;
      const ratio = earthYears;
      const percentDifference = (ratio - 1) * 100;
      return [
        planet.name,
        planet.periodDays.toFixed(4),
        earthYears.toFixed(6),
        ratio.toFixed(6),
        percentDifference.toFixed(2),
      ].map(escapeCsv).join(",");
    });

    const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exoplanet-years-vs-earth.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        <section
          aria-labelledby="exoplanet-chart-settings-heading"
          className="mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-secondary/20 backdrop-blur-sm p-4 sm:p-5 text-left"
        >
          <header className="flex items-center justify-between mb-4">
            <h4
              id="exoplanet-chart-settings-heading"
              className="font-display text-xs tracking-[0.2em] uppercase text-primary"
            >
              Chart Settings
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={exportChartAsPng}
                aria-label={`Export Exoplanet Years vs Earth chart as a PNG using the ${scaleMode} scale`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Export PNG
              </button>
              <button
                type="button"
                onClick={exportChartAsCsv}
                aria-label="Download orbital period and percent difference data as a CSV file"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={resetChartSettings}
                aria-label="Reset chart settings to defaults and close any open tooltip"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Scale
              </p>
              <div
                className="inline-flex rounded-full border border-border bg-background/40 p-1"
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
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Hover Tooltips
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={tooltipsEnabled}
                  aria-label={`${tooltipsEnabled ? "Disable" : "Enable"} hover tooltips on orbital chart bars`}
                  onClick={() => setTooltipsEnabled((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    aria-hidden="true"
                    className={`relative inline-block h-4 w-7 rounded-full transition-colors ${
                      tooltipsEnabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-transform ${
                        tooltipsEnabled ? "translate-x-3.5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                  {tooltipsEnabled ? "On" : "Off"}
                </button>
                <div
                  className="inline-flex rounded-full border border-border bg-background/40 p-1"
                  role="group"
                  aria-label="Choose tooltip orbital period units"
                >
                  {(["years", "days"] as TooltipUnit[]).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setTooltipUnit(unit)}
                      aria-pressed={tooltipUnit === unit}
                      aria-label={`Show tooltip orbital periods in Earth ${unit}`}
                      disabled={!tooltipsEnabled}
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        tooltipUnit === unit
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {unit === "years" ? "Years" : "Days"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <label
                  htmlFor="exoplanet-tooltip-delay"
                  className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <span>Hover delay</span>
                  <span className="font-mono normal-case tracking-normal text-foreground">
                    {tooltipDelay}ms
                  </span>
                </label>
                <input
                  id="exoplanet-tooltip-delay"
                  type="range"
                  min={MIN_TOOLTIP_DELAY}
                  max={MAX_TOOLTIP_DELAY}
                  step={10}
                  value={tooltipDelay}
                  onChange={(event) => setTooltipDelay(clampTooltipDelay(Number(event.target.value)))}
                  disabled={!tooltipsEnabled}
                  aria-valuemin={MIN_TOOLTIP_DELAY}
                  aria-valuemax={MAX_TOOLTIP_DELAY}
                  aria-valuenow={tooltipDelay}
                  aria-label={`Hover delay before tooltips appear, ${tooltipDelay} milliseconds`}
                  className="mt-2 w-full accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>{MIN_TOOLTIP_DELAY}ms</span>
                  <span>{MAX_TOOLTIP_DELAY}ms</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {settingsAnnouncement}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {focusedIndex !== null && allData[focusedIndex]
          ? `${allData[focusedIndex].name}: orbital period ${formatOrbitalPeriod(
              allData[focusedIndex].periodDays,
              tooltipUnit,
            )}, ${formatPercentDifference(allData[focusedIndex].periodDays / earthPeriod)}`
          : ""}
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
          const earthYearsLabel = formatEarthYears(planet.periodDays);
          const tooltipPeriodLabel = formatOrbitalPeriod(planet.periodDays, tooltipUnit);
          const percentDifferenceLabel = formatPercentDifference(ratio);
          const tooltipId = `exoplanet-orbit-tooltip-${index}`;
          const descriptionId = `exoplanet-orbit-description-${index}`;
          const describedBy = tooltipsEnabled ? `${descriptionId} ${tooltipId}` : descriptionId;

          return (
            <div
              key={planet.name}
              role="listitem"
              tabIndex={0}
              data-exoplanet-orbit-row={index}
              aria-label={`${planet.name}: orbital period ${planet.periodLabel}, ${earthYearsLabel}, ${percentDifferenceLabel}`}
              aria-describedby={describedBy}
              className="group flex items-center gap-3 cursor-default rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={handleRowMouseLeave}
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

              <span id={descriptionId} className="sr-only">
                {`Orbital period ${tooltipPeriodLabel}, ${percentDifferenceLabel}.`}
              </span>

              <div className="flex-1 h-7 relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-full overflow-hidden">
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
                </div>
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
                {tooltipsEnabled && (
                  <div
                    id={tooltipId}
                    role="tooltip"
                    ref={(node) => {
                      if (node) tooltipRefs.current.set(index, node);
                      else tooltipRefs.current.delete(index);
                    }}
                    style={{
                      transform: `translateX(calc(-50% + ${activeIndex === index ? tooltipShift : 0}px))`,
                    }}
                    className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-border bg-popover px-3 py-2 text-left text-xs text-popover-foreground shadow-lg transition-opacity ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{planet.name}</p>
                    <p className="mt-1 text-muted-foreground">Orbital period: {tooltipPeriodLabel}</p>
                    <p className="text-muted-foreground">{percentDifferenceLabel}</p>
                  </div>
                )}
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
