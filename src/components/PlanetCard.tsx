import { Rocket } from "lucide-react";

interface Mission {
  name: string;
  year: string;
  agency: string;
  status: "completed" | "active" | "upcoming";
}

interface PlanetCardProps {
  name: string;
  description: string;
  color: string;
  missions: Mission[];
  distance: string;
  delay: number;
}

const PlanetCard = ({ name, description, color, missions, distance, delay }: PlanetCardProps) => {
  const statusColors = {
    completed: "bg-planet-earth",
    active: "bg-primary",
    upcoming: "bg-accent",
  };

  return (
    <article 
      className="planet-card group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Planet glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      
      {/* Planet indicator */}
      <div 
        className="w-12 h-12 rounded-full mb-4 shadow-lg animate-float"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 30px ${color}40`,
          animationDelay: `${delay * 0.5}s`
        }}
      />

      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        {name}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-1">
        Distance: {distance}
      </p>
      
      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        <h4 className="font-display text-xs uppercase tracking-wider text-primary flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          Key Missions
        </h4>
        
        <ul className="space-y-2">
          {missions.slice(0, 3).map((mission, index) => (
            <li 
              key={index}
              className="flex items-center justify-between text-sm bg-secondary/50 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${statusColors[mission.status]}`} />
                <span className="text-foreground font-medium">{mission.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span>{mission.agency}</span>
                <span className="text-primary">{mission.year}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PlanetCard;
