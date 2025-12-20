import curiosityRover from "@/assets/curiosity-rover.png";
import voyagerSpacecraft from "@/assets/voyager-spacecraft.png";

interface SpacecraftGalleryProps {
  planetId: string;
}

const spacecraftImages: Record<string, { src: string; name: string; mission: string }[]> = {
  mars: [
    { src: curiosityRover, name: "Curiosity Rover", mission: "Active since 2012" },
  ],
  jupiter: [
    { src: voyagerSpacecraft, name: "Voyager", mission: "Flyby 1979" },
  ],
  saturn: [
    { src: voyagerSpacecraft, name: "Voyager", mission: "Flyby 1980-81" },
  ],
  neptune: [
    { src: voyagerSpacecraft, name: "Voyager 2", mission: "Flyby 1989" },
  ],
  uranus: [
    { src: voyagerSpacecraft, name: "Voyager 2", mission: "Flyby 1986" },
  ],
};

const SpacecraftGallery = ({ planetId }: SpacecraftGalleryProps) => {
  const spacecraft = spacecraftImages[planetId];

  if (!spacecraft || spacecraft.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Spacecraft <span className="text-primary">Gallery</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spacecraft.map((item, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={item.src} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
              <h3 className="font-display text-lg font-bold text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.mission}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpacecraftGallery;
