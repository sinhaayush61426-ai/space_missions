import { Rocket, Calendar, Navigation } from "lucide-react";

const outerMissions = [
  {
    name: "Voyager 1",
    launch: "1977",
    status: "Active",
    distance: "24 billion km",
    description: "The farthest human-made object from Earth, now in interstellar space carrying the Golden Record.",
    achievement: "First spacecraft to enter interstellar space",
    color: "hsl(var(--primary))",
  },
  {
    name: "Voyager 2",
    launch: "1977",
    status: "Active",
    distance: "20 billion km",
    description: "The only spacecraft to visit all four outer planets, now exploring interstellar space.",
    achievement: "Grand Tour of the outer solar system",
    color: "hsl(var(--accent))",
  },
  {
    name: "New Horizons",
    launch: "2006",
    status: "Active",
    distance: "8 billion km",
    description: "Provided the first close-up images of Pluto and explored Kuiper Belt object Arrokoth.",
    achievement: "First Pluto flyby & Kuiper Belt exploration",
    color: "hsl(var(--cosmic-purple))",
  },
  {
    name: "Pioneer 10 & 11",
    launch: "1972-73",
    status: "Inactive",
    distance: "18+ billion km",
    description: "First spacecraft to traverse the asteroid belt and make direct observations of Jupiter and Saturn.",
    achievement: "First spacecraft beyond the asteroid belt",
    color: "hsl(var(--jupiter-orange))",
  },
];

const OuterMissions = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-primary font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Beyond the Planets
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground mb-3 sm:mb-4">
            Outer <span className="cosmic-gradient">Expeditions</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
            Humanity's most ambitious spacecraft, journeying beyond the solar system 
            into the vast unknown of interstellar space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {outerMissions.map((mission, index) => (
            <article 
              key={mission.name}
              className="group relative bg-card border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-primary/50 transition-all duration-500 opacity-0 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Glow effect */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: mission.color }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2">
                      {mission.name}
                    </h3>
                    <span 
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 sm:px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${mission.color}20`,
                        color: mission.color
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: mission.color }} />
                      {mission.status}
                    </span>
                  </div>
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>

                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {mission.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Launch:</span>
                    <span className="text-foreground font-medium">{mission.launch}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Navigation className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="text-foreground font-medium">{mission.distance}</span>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-primary font-display uppercase tracking-wider mb-1">
                    Key Achievement
                  </p>
                  <p className="text-foreground font-medium">
                    {mission.achievement}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OuterMissions;
