import { useState } from "react";
import { 
  Rocket, 
  Calendar, 
  Building2, 
  Target, 
  Cpu, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { SpacecraftData } from "@/data/spacecraftData";
import { cn } from "@/lib/utils";

interface SpacecraftInfoCardProps {
  spacecraft: SpacecraftData;
  image: string;
  onImageClick: () => void;
}

const SpacecraftInfoCard = ({ spacecraft, image, onImageClick }: SpacecraftInfoCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getStatusColor = (status: SpacecraftData["status"]) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "completed":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "lost":
        return "text-red-400 bg-red-400/10 border-red-400/30";
    }
  };

  const getStatusIcon = (status: SpacecraftData["status"]) => {
    switch (status) {
      case "active":
        return <Activity className="w-3 h-3" />;
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />;
      case "lost":
        return <XCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      {/* Image Header */}
      <div 
        className="relative aspect-video cursor-pointer group overflow-hidden"
        onClick={onImageClick}
      >
        <img 
          src={image} 
          alt={spacecraft.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-3 right-3 px-2 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5",
          getStatusColor(spacecraft.status)
        )}>
          {getStatusIcon(spacecraft.status)}
          <span className="capitalize">{spacecraft.status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display text-xl font-bold text-foreground mb-1">
            {spacecraft.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {spacecraft.description}
          </p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{spacecraft.launchDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{spacecraft.agency}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-muted/30">
          {spacecraft.specs.slice(0, 4).map((spec, index) => (
            <div key={index} className="text-center p-2">
              <div className="text-xs text-muted-foreground">{spec.label}</div>
              <div className="text-sm font-semibold text-foreground">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-2">
          {/* Objectives */}
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('objectives')}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Mission Objectives</span>
              </div>
              {expandedSection === 'objectives' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 'objectives' && (
              <div className="px-3 pb-3">
                <ul className="space-y-1.5">
                  {spacecraft.objectives.map((obj, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Instruments */}
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('instruments')}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Scientific Instruments</span>
              </div>
              {expandedSection === 'instruments' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 'instruments' && (
              <div className="px-3 pb-3">
                <div className="flex flex-wrap gap-1.5">
                  {spacecraft.instruments.map((inst, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md border border-border/30"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('achievements')}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Key Achievements</span>
              </div>
              {expandedSection === 'achievements' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 'achievements' && (
              <div className="px-3 pb-3">
                <ul className="space-y-1.5">
                  {spacecraft.achievements.map((ach, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Award className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacecraftInfoCard;
