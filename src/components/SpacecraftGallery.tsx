import { useState } from "react";
import { ZoomIn } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import curiosityRover from "@/assets/curiosity-rover.png";
import perseveranceRover from "@/assets/perseverance-rover.png";
import voyagerSpacecraft from "@/assets/voyager-spacecraft.png";
import cassiniSpacecraft from "@/assets/cassini-spacecraft.png";
import junoSpacecraft from "@/assets/juno-spacecraft.png";
import newHorizonsSpacecraft from "@/assets/new-horizons-spacecraft.png";
import venusExpress from "@/assets/venus-express.png";
import messengerSpacecraft from "@/assets/messenger-spacecraft.png";

interface SpacecraftGalleryProps {
  planetId: string;
}

const spacecraftImages: Record<string, { src: string; name: string; mission: string }[]> = {
  mercury: [
    { src: messengerSpacecraft, name: "MESSENGER", mission: "Orbiter 2011-2015" },
  ],
  venus: [
    { src: venusExpress, name: "Venus Express", mission: "Orbiter 2006-2014" },
  ],
  mars: [
    { src: curiosityRover, name: "Curiosity Rover", mission: "Active since 2012" },
    { src: perseveranceRover, name: "Perseverance Rover", mission: "Active since 2021" },
  ],
  jupiter: [
    { src: voyagerSpacecraft, name: "Voyager", mission: "Flyby 1979" },
    { src: junoSpacecraft, name: "Juno", mission: "Active since 2016" },
  ],
  saturn: [
    { src: voyagerSpacecraft, name: "Voyager", mission: "Flyby 1980-81" },
    { src: cassiniSpacecraft, name: "Cassini", mission: "Orbiter 2004-2017" },
  ],
  neptune: [
    { src: voyagerSpacecraft, name: "Voyager 2", mission: "Flyby 1989" },
    { src: newHorizonsSpacecraft, name: "New Horizons", mission: "Flyby 2023 (extended mission)" },
  ],
  uranus: [
    { src: voyagerSpacecraft, name: "Voyager 2", mission: "Flyby 1986" },
  ],
};

const SpacecraftGallery = ({ planetId }: SpacecraftGalleryProps) => {
  const spacecraft = spacecraftImages[planetId];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!spacecraft || spacecraft.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spacecraft.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spacecraft.length) % spacecraft.length);
  };

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Spacecraft <span className="text-primary">Gallery</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spacecraft.map((item, index) => (
          <div 
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={item.src} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-primary/20 border border-primary/50">
                  <ZoomIn className="w-6 h-6 text-primary" />
                </div>
              </div>
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

      <ImageLightbox
        images={spacecraft}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default SpacecraftGallery;
