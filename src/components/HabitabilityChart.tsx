import ComparisonChart, { ChartPlanet } from "@/components/ComparisonChart";
import { exoplanetsData } from "@/data/exoplanetsData";

function parseNum(s: string): number {
  const match = s.match(/([-\d,.]+)/);
  return match ? parseFloat(match[1].replace(",", "")) : 0;
}

const EARTH_REF: ChartPlanet = {
  id: "earth",
  name: "Earth",
  color: "hsl(150, 60%, 45%)",
  diameter: 12742,
  gravity: 9.8,
  temperature: 15,
  label: "Reference",
};

const exoPlanets: ChartPlanet[] = exoplanetsData.map((exo) => ({
  id: exo.id,
  name: exo.name,
  color: exo.color,
  diameter: parseNum(exo.diameter),
  gravity: parseNum(exo.gravity),
  temperature: parseNum(exo.temperature),
  label: exo.habitabilityIndex.split(" — ")[0],
}));

const allPlanets = [EARTH_REF, ...exoPlanets];

const HabitabilityChart = () => (
  <ComparisonChart
    planets={allPlanets}
    title="Habitability Comparison"
    subtitle="How Do They Compare?"
    gradientColors={["#34d399", "#22d3ee"]}
    defaultRefId="earth"
  />
);

export default HabitabilityChart;
