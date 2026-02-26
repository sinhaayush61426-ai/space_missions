import { useMemo } from "react";
import type { StructureLayer } from "@/data/planetsData";

interface PlanetInternalStructureProps {
  layers: StructureLayer[];
  planetColor: string;
  planetName: string;
}

/**
 * Renders a half-cutaway cross-section SVG of the planet's internal layers,
 * with curved label lines pointing to each layer on the cut face.
 */
const PlanetInternalStructure = ({ layers, planetColor, planetName }: PlanetInternalStructureProps) => {
  const cx = 250;
  const cy = 250;
  const outerR = 200;

  // Precompute radii for each layer (outermost first in the data, innermost last)
  const layerRadii = useMemo(() => {
    const total = layers.length;
    return layers.map((_, i) => {
      // Outermost layer gets full radius, innermost ~20% of radius
      const frac = 1 - i * (0.8 / (total - 1 || 1));
      return outerR * frac;
    });
  }, [layers]);

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
          {/* SVG Cutaway Diagram */}
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full max-w-[420px] drop-shadow-2xl"
              aria-label={`Internal structure of ${planetName}`}
            >
              <defs>
                {/* Outer glow */}
                <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor={planetColor} stopOpacity="0" />
                  <stop offset="100%" stopColor={planetColor} stopOpacity="0.25" />
                </radialGradient>

                {/* Clip: right half = full circle, left half = cut (flat edge) */}
                <clipPath id="cut-half">
                  {/* Full right semicircle + a slightly inset left side to show flat cut */}
                  <rect x={cx} y={cy - outerR - 5} width={outerR + 10} height={outerR * 2 + 10} />
                </clipPath>
                <clipPath id="left-half">
                  <rect x={cx - outerR - 5} y={cy - outerR - 5} width={outerR + 5} height={outerR * 2 + 10} />
                </clipPath>
              </defs>

              {/* Atmosphere glow ring */}
              <circle cx={cx} cy={cy} r={outerR + 18} fill="url(#planet-glow)" />

              {/* ---- RIGHT HALF: full sphere surface (outermost color) ---- */}
              <g clipPath="url(#cut-half)">
                <circle cx={cx} cy={cy} r={outerR} fill={layers[0]?.color || planetColor} />
                {/* surface shading overlay */}
                <circle cx={cx} cy={cy} r={outerR} fill="url(#surface-shade)" />
                {/* Specular highlight */}
                <defs>
                  <radialGradient id="surface-shade" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                    <stop offset="60%" stopColor="white" stopOpacity="0" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.35" />
                  </radialGradient>
                </defs>
              </g>

              {/* ---- LEFT HALF: cutaway showing all layers ---- */}
              <g clipPath="url(#left-half)">
                {layers.map((layer, i) => {
                  const r = layerRadii[i];
                  return (
                    <circle
                      key={layer.name}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={layer.color}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={1}
                    />
                  );
                })}

                {/* Inner shadow on the cut face */}
                <defs>
                  <linearGradient id="cut-shadow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="black" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="black" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x={cx - 12} y={cy - outerR} width={12} height={outerR * 2} fill="url(#cut-shadow)" />
              </g>

              {/* Flat cut-face edge line */}
              <line
                x1={cx}
                y1={cy - outerR}
                x2={cx}
                y2={cy + outerR}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1.5}
              />

              {/* ---- LABEL LINES from left side ---- */}
              {layers.map((layer, i) => {
                const r = layerRadii[i];
                // Place the dot on the cut face (x = cx) at varying y positions
                const dotY = cy - r * 0.5;
                // Label anchors going outward to the left
                const labelX = 30;
                const labelY = 40 + i * (400 / (layers.length + 1));

                return (
                  <g key={`label-${layer.name}`}>
                    {/* Dot on the layer */}
                    <circle cx={cx - 2} cy={dotY} r={3.5} fill={layer.color} stroke="white" strokeWidth={1.2} />
                    {/* Connecting line */}
                    <path
                      d={`M${cx - 4},${dotY} C${cx - 60},${dotY} ${labelX + 80},${labelY} ${labelX + 6},${labelY}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                    {/* Label dot */}
                    <circle cx={labelX} cy={labelY} r={4} fill={layer.color} />
                    {/* Label text */}
                    <text
                      x={labelX + 12}
                      y={labelY + 1}
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      dominantBaseline="middle"
                      fontFamily="system-ui, sans-serif"
                    >
                      {layer.name}
                    </text>
                    <text
                      x={labelX + 12}
                      y={labelY + 14}
                      fill="rgba(255,255,255,0.5)"
                      fontSize="8.5"
                      dominantBaseline="middle"
                      fontFamily="system-ui, sans-serif"
                    >
                      {layer.depth}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Layer detail cards */}
          <div className="space-y-3">
            {layers.map((layer, index) => (
              <div
                key={layer.name}
                className="flex items-start gap-4 bg-card border border-border/50 rounded-xl p-4 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-5 h-5 rounded-full shrink-0 mt-0.5 border border-white/20 shadow-lg"
                  style={{ backgroundColor: layer.color, boxShadow: `0 0 12px ${layer.color}55` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-display font-semibold text-foreground">{layer.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-0.5 rounded-full">
                      {layer.depth}
                    </span>
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
