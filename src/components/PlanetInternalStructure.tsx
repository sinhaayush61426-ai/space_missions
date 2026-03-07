import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Thermometer, Gauge, FlaskConical, ChevronDown } from "lucide-react";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  // Precompute radii for each layer (outermost first in the data, innermost last)
  const layerRadii = useMemo(() => {
    const total = layers.length;
    return layers.map((_, i) => {
      const frac = 1 - i * (0.8 / (total - 1 || 1));
      return outerR * frac;
    });
  }, [layers]);

  const handleLayerClick = (index: number) => {
    setExpandedLayer(expandedLayer === index ? null : index);
  };

  if (!layers.length) return null;

  return (
    <section className="py-12 px-6" ref={sectionRef}>
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
          <motion.div
            className="flex items-center justify-center"
            initial={{ clipPath: "inset(0 0 0 50%)" }}
            animate={isInView ? { clipPath: "inset(0 0 0 0%)" } : { clipPath: "inset(0 0 0 50%)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full max-w-[420px] drop-shadow-2xl"
              aria-label={`Internal structure of ${planetName}`}
            >
              <defs>
                <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor={planetColor} stopOpacity="0" />
                  <stop offset="100%" stopColor={planetColor} stopOpacity="0.25" />
                </radialGradient>
                <clipPath id="cut-half">
                  <rect x={cx} y={cy - outerR - 5} width={outerR + 10} height={outerR * 2 + 10} />
                </clipPath>
                <clipPath id="left-half">
                  <rect x={cx - outerR - 5} y={cy - outerR - 5} width={outerR + 5} height={outerR * 2 + 10} />
                </clipPath>
                <radialGradient id="surface-shade" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                  <stop offset="60%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="black" stopOpacity="0.35" />
                </radialGradient>
                <linearGradient id="cut-shadow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="black" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle cx={cx} cy={cy} r={outerR + 18} fill="url(#planet-glow)" />

              <g clipPath="url(#cut-half)">
                <circle cx={cx} cy={cy} r={outerR} fill={layers[0]?.color || planetColor} />
                <circle cx={cx} cy={cy} r={outerR} fill="url(#surface-shade)" />
              </g>

              <g clipPath="url(#left-half)">
                {layers.map((layer, i) => (
                  <circle
                    key={layer.name}
                    cx={cx}
                    cy={cy}
                    r={layerRadii[i]}
                    fill={layer.color}
                    stroke={
                      expandedLayer === i
                        ? "rgba(255,255,255,0.7)"
                        : hoveredLayer === i
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.08)"
                    }
                    strokeWidth={expandedLayer === i ? 3 : hoveredLayer === i ? 2.5 : 1}
                    style={{ cursor: "pointer", transition: "stroke 0.2s, stroke-width 0.2s" }}
                    onMouseEnter={() => setHoveredLayer(i)}
                    onMouseLeave={() => setHoveredLayer(null)}
                    onClick={() => handleLayerClick(i)}
                  />
                ))}
                <rect x={cx - 12} y={cy - outerR} width={12} height={outerR * 2} fill="url(#cut-shadow)" />
              </g>

              <line
                x1={cx} y1={cy - outerR}
                x2={cx} y2={cy + outerR}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1.5}
              />

              {layers.map((layer, i) => {
                const r = layerRadii[i];
                const dotY = cy - r * 0.5;
                const labelX = 30;
                const labelY = 40 + i * (400 / (layers.length + 1));
                return (
                  <g key={`label-${layer.name}`} style={{ cursor: "pointer" }} onClick={() => handleLayerClick(i)}>
                    <circle cx={cx - 2} cy={dotY} r={3.5} fill={layer.color} stroke="white" strokeWidth={1.2} />
                    <path
                      d={`M${cx - 4},${dotY} C${cx - 60},${dotY} ${labelX + 80},${labelY} ${labelX + 6},${labelY}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                    <circle cx={labelX} cy={labelY} r={4} fill={layer.color} />
                    <text x={labelX + 12} y={labelY + 1} fill="white" fontSize="11" fontWeight="600" dominantBaseline="middle" fontFamily="system-ui, sans-serif">
                      {layer.name}
                    </text>
                    <text x={labelX + 12} y={labelY + 14} fill="rgba(255,255,255,0.5)" fontSize="8.5" dominantBaseline="middle" fontFamily="system-ui, sans-serif">
                      {layer.depth}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Layer detail cards */}
          <div className="space-y-3">
            {layers.map((layer, index) => {
              const isExpanded = expandedLayer === index;
              const hasDetails = layer.temperature || layer.pressure || layer.composition;

              return (
                <motion.div
                  key={layer.name}
                  className="rounded-xl cursor-pointer transition-colors duration-200 overflow-hidden"
                  style={{
                    backgroundColor: isExpanded
                      ? `${layer.color}20`
                      : hoveredLayer === index
                      ? `${layer.color}15`
                      : 'hsl(var(--card))',
                    border: isExpanded
                      ? `1px solid ${layer.color}80`
                      : hoveredLayer === index
                      ? `1px solid ${layer.color}50`
                      : '1px solid hsl(var(--border) / 0.5)',
                    boxShadow: isExpanded
                      ? `0 0 30px ${layer.color}30`
                      : hoveredLayer === index
                      ? `0 0 20px ${layer.color}20`
                      : 'none',
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: hoveredLayer === index || isExpanded ? 1.02 : 1 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.12, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredLayer(index)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  onClick={() => handleLayerClick(index)}
                >
                  <div className="flex items-start gap-4 p-4">
                    <div
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 border border-white/20 shadow-lg transition-transform duration-200"
                      style={{
                        backgroundColor: layer.color,
                        boxShadow: `0 0 12px ${layer.color}55`,
                        transform: hoveredLayer === index || isExpanded ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-semibold text-foreground">{layer.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-0.5 rounded-full">
                            {layer.depth}
                          </span>
                          {hasDetails && (
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                    </div>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && hasDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 ml-9 border-t border-white/10">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                            {layer.temperature && (
                              <div className="flex items-start gap-2">
                                <Thermometer className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: layer.color }} />
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Temperature</p>
                                  <p className="text-xs font-medium text-foreground">{layer.temperature}</p>
                                </div>
                              </div>
                            )}
                            {layer.pressure && (
                              <div className="flex items-start gap-2">
                                <Gauge className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: layer.color }} />
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pressure</p>
                                  <p className="text-xs font-medium text-foreground">{layer.pressure}</p>
                                </div>
                              </div>
                            )}
                            {layer.composition && (
                              <div className="flex items-start gap-2">
                                <FlaskConical className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: layer.color }} />
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Composition</p>
                                  <p className="text-xs font-medium text-foreground">{layer.composition}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanetInternalStructure;
