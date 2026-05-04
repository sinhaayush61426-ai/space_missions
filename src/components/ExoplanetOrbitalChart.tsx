import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, RotateCcw, Upload, Settings2 } from "lucide-react";
import { toast } from "sonner";
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
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFilename, setExportFilename] = useState("");
  const [exportResolution, setExportResolution] = useState<number>(() => {
    const saved = window.localStorage.getItem("exoplanet-orbital-chart-export-resolution");
    const parsed = saved ? Number(saved) : NaN;
    return [1200, 1800, 2400].includes(parsed) ? parsed : 1200;
  });
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [lastResetSnapshot, setLastResetSnapshot] = useState<{
    scale: string; tooltips: boolean; tooltipUnit: string; tooltipDelay: number;
  } | null>(null);
  const resetCancelRef = useRef<HTMLButtonElement>(null);
  const resetTriggerRef = useRef<HTMLButtonElement>(null);
  const exportFilenameInputRef = useRef<HTMLInputElement>(null);
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

  const pendingIndexRef = useRef<number | null>(null);

  const handleRowMouseEnter = (index: number) => {
    clearHoverTimeout();
    pendingIndexRef.current = index;
    if (tooltipDelay <= 0) {
      setHoveredIndex(index);
      return;
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      // Only show if this is still the latest hovered row
      if (pendingIndexRef.current === index) {
        setHoveredIndex(index);
      }
      hoverTimeoutRef.current = null;
    }, tooltipDelay);
  };

  const handleRowMouseLeave = () => {
    clearHoverTimeout();
    pendingIndexRef.current = null;
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
      // Dismiss the tooltip but keep focus on the current row
      setFocusedIndex(null);
      setHoveredIndex(null);
    }
  };

  const exportChartAsPng = (filename: string, baseWidth: number = 1200) => {
    const canvas = document.createElement("canvas");
    const s = baseWidth / 1200;
    const width = baseWidth;
    const height = Math.round(860 * s);
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
    const starCount = Math.round(80 * s);
    for (let i = 0; i < starCount; i += 1) {
      const x = (i * 137) % width;
      const y = (i * 89) % height;
      context.beginPath();
      context.arc(x, y, (i % 3 === 0 ? 1.6 : 0.9) * s, 0, Math.PI * 2);
      context.fill();
    }

    context.textAlign = "center";
    context.fillStyle = "#facc15";
    context.font = `700 ${18 * s}px Inter, sans-serif`;
    context.fillText("ORBITAL DYNAMICS", width / 2, 76 * s);

    context.fillStyle = "#f8fafc";
    context.font = `800 ${44 * s}px Inter, sans-serif`;
    context.fillText("Exoplanet Years vs Earth", width / 2, 132 * s);

    context.fillStyle = "#94a3b8";
    context.font = `500 ${18 * s}px Inter, sans-serif`;
    context.fillText(`Orbital periods compared on a ${scaleMode === "logarithmic" ? "logarithmic" : "linear"} scale`, width / 2, 170 * s);

    const chartX = 150 * s;
    const chartY = 230 * s;
    const rowHeight = 62 * s;
    const barX = 330 * s;
    const barWidth = 620 * s;

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
      context.font = `700 ${18 * s}px Inter, sans-serif`;
      context.fillText(planet.name, chartX + 150 * s, y + 28 * s);

      context.fillStyle = "rgba(148, 163, 184, 0.16)";
      drawRoundedRect(context, barX, y + 5 * s, barWidth, 32 * s, 16 * s);

      context.fillStyle = isEarth ? "#3b82f6" : planet.color;
      drawRoundedRect(context, barX, y + 5 * s, (barWidth * barPercent) / 100, 32 * s, 16 * s);

      context.textAlign = "left";
      context.fillStyle = "#f8fafc";
      context.font = `700 ${16 * s}px Inter, sans-serif`;
      context.fillText(`${ratioLabel}×`, Math.min(barX + (barWidth * barPercent) / 100 + 12 * s, barX + barWidth - 120 * s), y + 27 * s);

      context.fillStyle = "#94a3b8";
      context.font = `500 ${14 * s}px Inter, sans-serif`;
      context.fillText(planet.periodLabel, barX + barWidth + 20 * s, y + 27 * s);
    });

    context.textAlign = "center";
    context.fillStyle = "#94a3b8";
    context.font = `500 ${15 * s}px Inter, sans-serif`;
    context.fillText("1× = Earth's orbital period (365.25 days) · Earth shown as reference", width / 2, height - 64 * s);

    const safeName = filename.trim().replace(/\.png$/i, "") || "exoplanet-years-vs-earth";
    const link = document.createElement("a");
    link.download = `${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const buildDefaultExportFilename = () => {
    const tooltipPart = tooltipsEnabled ? `tooltips-on-${tooltipUnit}` : "tooltips-off";
    return `exoplanet-years-vs-earth-${scaleMode}-${tooltipPart}`;
  };

  const openExportDialog = () => {
    const saved = window.localStorage.getItem("exoplanet-orbital-chart-export-filename");
    setExportFilename(saved || buildDefaultExportFilename());
    setExportDialogOpen(true);
  };

  const confirmExport = () => {
    const finalName = exportFilename.trim() || "exoplanet-chart";
    const fullFilename = finalName.endsWith(".png") ? finalName : `${finalName}.png`;
    window.localStorage.setItem("exoplanet-orbital-chart-export-filename", finalName);
    window.localStorage.setItem("exoplanet-orbital-chart-export-resolution", String(exportResolution));
    exportChartAsPng(exportFilename, exportResolution);
    setExportDialogOpen(false);
    toast.success(`PNG saved: ${fullFilename}`, {
      description: `${exportResolution}px · Scale: ${scaleMode} · Tooltips: ${tooltipsEnabled ? "on" : "off"} (${tooltipUnit})`,
    });
  };

  useEffect(() => {
    if (!exportDialogOpen) return;
    const id = window.requestAnimationFrame(() => {
      exportFilenameInputRef.current?.focus();
      exportFilenameInputRef.current?.select();
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setExportDialogOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [exportDialogOpen]);

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

  const undoReset = (prev: typeof lastResetSnapshot) => {
    if (!prev) return;
    if (isScaleMode(prev.scale)) setScaleMode(prev.scale);
    setTooltipsEnabled(prev.tooltips);
    if (isTooltipUnit(prev.tooltipUnit)) setTooltipUnit(prev.tooltipUnit);
    setTooltipDelay(clampTooltipDelay(prev.tooltipDelay));
    setLastResetSnapshot(null);
  };

  const confirmReset = () => {
    const prev = { scale: scaleMode, tooltips: tooltipsEnabled, tooltipUnit, tooltipDelay };
    setLastResetSnapshot(prev);
    resetChartSettings();
    setResetDialogOpen(false);
    requestAnimationFrame(() => resetTriggerRef.current?.focus());
     toast("Settings reset to defaults", {
       duration: 5000,
       action: {
         label: "Undo",
         onClick: () => {
           undoReset(prev);
           toast("Settings restored", {
             duration: 5000,
             action: {
               label: "Redo",
               onClick: () => {
                 resetChartSettings();
                 setLastResetSnapshot(prev);
                 toast.success("Settings reset again");
               },
             },
           });
         },
       },
     });
  };

  const cancelReset = () => {
    setResetDialogOpen(false);
    requestAnimationFrame(() => resetTriggerRef.current?.focus());
  };

  const exportSettings = () => {
    const settings = {
      version: 1,
      scale: scaleMode,
      tooltips: tooltipsEnabled,
      tooltipUnit,
      tooltipDelay,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exoplanet-chart-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFileRef = useRef<HTMLInputElement>(null);

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.version !== 1) throw new Error("Unknown settings version");
        if (isScaleMode(data.scale)) setScaleMode(data.scale);
        if (typeof data.tooltips === "boolean") setTooltipsEnabled(data.tooltips);
        if (isTooltipUnit(data.tooltipUnit)) setTooltipUnit(data.tooltipUnit);
        if (typeof data.tooltipDelay === "number") setTooltipDelay(clampTooltipDelay(data.tooltipDelay));
        setSettingsAnnouncement("Chart settings imported successfully.");
      } catch {
        setSettingsAnnouncement("Failed to import settings. Invalid file format.");
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be re-imported
    event.target.value = "";
  };

  useEffect(() => {
    if (!resetDialogOpen) return;
    requestAnimationFrame(() => resetCancelRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelReset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resetDialogOpen]);

  const exportChartAsCsv = () => {
    const escapeCsv = (value: string): string => {
      if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
      return value;
    };

    const unitLabel = tooltipUnit === "days" ? "Earth days" : "Earth years";
    const headers = [
      "Planet",
      `Orbital Period (${unitLabel})`,
      "Ratio vs Earth",
      "Percent Difference vs Earth",
      `Scale Mode`,
    ];

    const rows = allData.map((planet) => {
      const earthYears = planet.periodDays / earthPeriod;
      const periodValue = tooltipUnit === "days" ? planet.periodDays : earthYears;
      const ratio = earthYears;
      const percentDifference = (ratio - 1) * 100;
      return [
        planet.name,
        tooltipUnit === "days" ? periodValue.toFixed(4) : periodValue.toFixed(6),
        ratio.toFixed(6),
        percentDifference.toFixed(2),
        scaleMode,
      ].map(escapeCsv).join(",");
    });

    const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `exoplanet-orbital-periods-${tooltipUnit}-${scaleMode}.csv`;
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
                onClick={openExportDialog}
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
                ref={resetTriggerRef}
                type="button"
                onClick={() => setResetDialogOpen(true)}
                aria-label="Reset chart settings to defaults and close any open tooltip"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
              <button
                type="button"
                onClick={exportSettings}
                aria-label="Export chart settings as a JSON file"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                Export Settings
              </button>
              <button
                type="button"
                onClick={() => importFileRef.current?.click()}
                aria-label="Import chart settings from a JSON file"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                Import Settings
              </button>
              <input
                ref={importFileRef}
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
                aria-hidden="true"
              />
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
          const planetNameId = `exoplanet-orbit-name-${index}`;
          const describedBy = tooltipsEnabled ? `${descriptionId} ${tooltipId}` : descriptionId;
          const tooltipVisible = tooltipsEnabled && isHovered;

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
                id={planetNameId}
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
                    aria-labelledby={planetNameId}
                    aria-hidden={!tooltipVisible}
                    ref={(node) => {
                      if (node) tooltipRefs.current.set(index, node);
                      else tooltipRefs.current.delete(index);
                    }}
                    style={{
                      transform: `translateX(calc(-50% + ${activeIndex === index ? tooltipShift : 0}px))`,
                    }}
                    className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-border bg-popover px-3 py-2 text-left text-xs text-popover-foreground shadow-lg transition-opacity ${
                      tooltipVisible ? "opacity-100" : "opacity-0"
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

      {exportDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exoplanet-export-dialog-title"
          aria-describedby="exoplanet-export-dialog-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setExportDialogOpen(false);
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              confirmExport();
            }}
            className="w-full max-w-md rounded-2xl border border-border bg-popover p-5 shadow-2xl"
          >
            <h4
              id="exoplanet-export-dialog-title"
              className="font-display text-base font-semibold text-foreground"
            >
              Export chart as PNG
            </h4>
            <p
              id="exoplanet-export-dialog-desc"
              className="mt-1 text-xs text-muted-foreground"
            >
              Using <span className="text-foreground font-medium">{scaleMode === "logarithmic" ? "logarithmic" : "linear"}</span> scale,
              tooltips <span className="text-foreground font-medium">{tooltipsEnabled ? `on (${tooltipUnit === "years" ? "Earth years" : "Earth days"})` : "off"}</span>.
            </p>

            <label
              htmlFor="exoplanet-export-filename"
              className="mt-4 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Filename
            </label>
            <div className="mt-1 flex items-center rounded-md border border-border bg-background/40 focus-within:ring-2 focus-within:ring-ring">
              <input
                id="exoplanet-export-filename"
                ref={exportFilenameInputRef}
                type="text"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value.replace(/[\\/:*?"<>|]/g, ""))}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none"
                aria-label="Exported PNG filename, without extension"
              />
              <span className="pr-3 text-xs text-muted-foreground">.png</span>
            </div>

            <label className="mt-4 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Resolution
            </label>
            <div className="mt-1 inline-flex rounded-full border border-border bg-background/40 p-1" role="group" aria-label="Choose PNG export resolution">
              {([1200, 1800, 2400] as const).map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setExportResolution(res)}
                  aria-pressed={exportResolution === res}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    exportResolution === res
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {res}px
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setExportDialogOpen(false)}
                className="rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!exportFilename.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download PNG
              </button>
            </div>
          </form>
        </div>
      )}

      {resetDialogOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="exoplanet-reset-dialog-title"
          aria-describedby="exoplanet-reset-dialog-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelReset();
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-border bg-popover p-5 shadow-2xl">
            <h4
              id="exoplanet-reset-dialog-title"
              className="font-display text-base font-semibold text-foreground"
            >
              Reset chart settings?
            </h4>
             <div
               id="exoplanet-reset-dialog-desc"
               className="mt-3 text-xs text-muted-foreground leading-relaxed space-y-2"
             >
               <p>Your current settings:</p>
               <ul className="space-y-1 pl-3">
                 <li>Scale: <span className="text-foreground font-medium capitalize">{scaleMode}</span></li>
                 <li>Tooltips: <span className="text-foreground font-medium">{tooltipsEnabled ? "On" : "Off"}</span></li>
                 <li>Units: <span className="text-foreground font-medium capitalize">{tooltipUnit.replace("-", " ")}</span></li>
                 <li>Hover delay: <span className="text-foreground font-medium">{tooltipDelay}ms</span></li>
               </ul>
               <p className="pt-1">
                 This will restore scale to <span className="text-foreground font-medium">logarithmic</span>,
                 tooltips to <span className="text-foreground font-medium">on (Earth years)</span>,
                 and hover delay to <span className="text-foreground font-medium">{DEFAULT_TOOLTIP_DELAY}ms</span>.
               </p>
             </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                ref={resetCancelRef}
                type="button"
                onClick={cancelReset}
                className="rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExoplanetOrbitalChart;
