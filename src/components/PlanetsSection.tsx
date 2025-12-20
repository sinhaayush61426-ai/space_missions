import PlanetCard from "./PlanetCard";
import { planetsData } from "@/data/planetsData";

const PlanetsSection = () => {
  return (
    <section id="planets" className="relative py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
            Inner & Outer Worlds
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Planetary <span className="gold-gradient">Expeditions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the missions that have unveiled the secrets of every planet in our solar system, 
            from scorching Mercury to frigid Neptune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planetsData.map((planet, index) => (
            <PlanetCard
              key={planet.name}
              id={planet.id}
              name={planet.name}
              description={planet.description}
              color={planet.color}
              distance={planet.distance}
              missions={planet.missions.map(m => ({
                name: m.name,
                year: m.year,
                agency: m.agency,
                status: m.status,
              }))}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanetsSection;
