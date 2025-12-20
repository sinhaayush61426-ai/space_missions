import PlanetCard from "./PlanetCard";

const planetsData = [
  {
    name: "Mercury",
    color: "#8c8c8c",
    distance: "57.9 million km",
    description: "The smallest and innermost planet, Mercury has been explored by only two spacecraft due to its extreme proximity to the Sun.",
    missions: [
      { name: "Mariner 10", year: "1974", agency: "NASA", status: "completed" as const },
      { name: "MESSENGER", year: "2011", agency: "NASA", status: "completed" as const },
      { name: "BepiColombo", year: "2025", agency: "ESA/JAXA", status: "active" as const },
    ],
  },
  {
    name: "Venus",
    color: "#e6c35c",
    distance: "108.2 million km",
    description: "Earth's 'sister planet' has been extensively studied, revealing a hellish world beneath its thick clouds.",
    missions: [
      { name: "Venera Program", year: "1961-84", agency: "USSR", status: "completed" as const },
      { name: "Magellan", year: "1990", agency: "NASA", status: "completed" as const },
      { name: "VERITAS", year: "2031", agency: "NASA", status: "upcoming" as const },
    ],
  },
  {
    name: "Earth",
    color: "#4a9f5c",
    distance: "Home",
    description: "Our home planet hosts thousands of satellites and space stations monitoring our world from orbit.",
    missions: [
      { name: "ISS", year: "1998", agency: "International", status: "active" as const },
      { name: "Hubble", year: "1990", agency: "NASA/ESA", status: "active" as const },
      { name: "James Webb", year: "2021", agency: "NASA/ESA", status: "active" as const },
    ],
  },
  {
    name: "Mars",
    color: "#c1440e",
    distance: "227.9 million km",
    description: "The most explored planet beyond Earth, Mars hosts active rovers and orbiters searching for signs of ancient life.",
    missions: [
      { name: "Curiosity", year: "2012", agency: "NASA", status: "active" as const },
      { name: "Perseverance", year: "2021", agency: "NASA", status: "active" as const },
      { name: "Mars Sample Return", year: "2033", agency: "NASA/ESA", status: "upcoming" as const },
    ],
  },
  {
    name: "Jupiter",
    color: "#d4a574",
    distance: "778.5 million km",
    description: "The gas giant and its fascinating moons have been visited by multiple spacecraft, revealing dynamic storm systems.",
    missions: [
      { name: "Galileo", year: "1995", agency: "NASA", status: "completed" as const },
      { name: "Juno", year: "2016", agency: "NASA", status: "active" as const },
      { name: "Europa Clipper", year: "2024", agency: "NASA", status: "active" as const },
    ],
  },
  {
    name: "Saturn",
    color: "#e6b84a",
    distance: "1.4 billion km",
    description: "Known for its spectacular rings, Saturn and its moon Titan have revealed surprising complexity.",
    missions: [
      { name: "Cassini-Huygens", year: "2004", agency: "NASA/ESA", status: "completed" as const },
      { name: "Dragonfly", year: "2034", agency: "NASA", status: "upcoming" as const },
      { name: "Pioneer 11", year: "1979", agency: "NASA", status: "completed" as const },
    ],
  },
  {
    name: "Uranus",
    color: "#7dd3d3",
    distance: "2.9 billion km",
    description: "The tilted ice giant was visited only once, leaving many mysteries about this distant world.",
    missions: [
      { name: "Voyager 2", year: "1986", agency: "NASA", status: "completed" as const },
      { name: "Uranus Orbiter", year: "2040s", agency: "NASA", status: "upcoming" as const },
    ],
  },
  {
    name: "Neptune",
    color: "#4169e1",
    distance: "4.5 billion km",
    description: "The outermost major planet, Neptune's stunning blue color and violent storms await further exploration.",
    missions: [
      { name: "Voyager 2", year: "1989", agency: "NASA", status: "completed" as const },
      { name: "Neptune Odyssey", year: "2040s", agency: "NASA", status: "upcoming" as const },
    ],
  },
];

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
              {...planet}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanetsSection;
