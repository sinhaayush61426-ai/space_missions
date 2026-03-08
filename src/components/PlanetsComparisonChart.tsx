import ComparisonChart, { ChartPlanet } from "@/components/ComparisonChart";
import { planetsData } from "@/data/planetsData";

function parseNum(s: string): number {
  const match = s.match(/([-\d,.]+)/);
  return match ? parseFloat(match[1].replace(",", "")) : 0;
}

const solarPlanets: ChartPlanet[] = planetsData.map((p) => ({
  id: p.id,
  name: p.name,
  color: p.color,
  diameter: parseNum(p.diameter),
  gravity: parseNum(p.gravity),
  temperature: parseNum(p.temperature),
  label: p.type,
}));

const PlanetsComparisonChart = () => (
  <ComparisonChart
    planets={solarPlanets}
    title="Planetary Comparison"
    subtitle="Compare The Worlds"
    gradientColors={["hsl(45, 93%, 58%)", "hsl(30, 80%, 55%)"}
    defaultRefId="earth"
  />
);

export default PlanetsComparisonChart;
