import { Rocket, CheckCircle, Clock, Calendar } from "lucide-react";
import type { Mission } from "@/data/planetsData";

interface MissionTimelineProps {
  missions: Mission[];
  planetColor: string;
}

const MissionTimeline = ({ missions, planetColor }: MissionTimelineProps) => {
  const statusConfig = {
    completed: { icon: CheckCircle, label: "Completed", color: "text-planet-earth" },
    active: { icon: Rocket, label: "Active", color: "text-primary" },
    upcoming: { icon: Clock, label: "Upcoming", color: "text-accent" },
  };

  const typeLabels = {
    flyby: "Flyby",
    orbiter: "Orbiter",
    lander: "Lander",
    rover: "Rover",
    probe: "Probe",
    observatory: "Observatory",
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div 
        className="absolute left-8 top-0 bottom-0 w-0.5 opacity-30"
        style={{ backgroundColor: planetColor }}
      />

      <div className="space-y-8">
        {missions.map((mission, index) => {
          const StatusIcon = statusConfig[mission.status].icon;
          
          return (
            <div 
              key={mission.name}
              className="relative pl-20 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div 
                className="absolute left-6 w-5 h-5 rounded-full border-4 border-background"
                style={{ backgroundColor: planetColor }}
              />

              <article className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {mission.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${planetColor}20`,
                          color: planetColor
                        }}
                      >
                        {typeLabels[mission.type]}
                      </span>
                      <span className="text-muted-foreground">{mission.agency}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {mission.year}
                        {mission.endYear && ` - ${mission.endYear}`}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${statusConfig[mission.status].color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{statusConfig[mission.status].label}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {mission.description}
                </p>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-display text-xs uppercase tracking-wider text-primary mb-3">
                    Key Achievements
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mission.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: planetColor }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionTimeline;
