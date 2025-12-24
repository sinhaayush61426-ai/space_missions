import { useState } from "react";
import ImageLightbox from "./ImageLightbox";
import SpacecraftInfoCard from "./SpacecraftInfoCard";
import { getSpacecraftByPlanet } from "@/data/spacecraftData";
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

const imageMap: Record<string, string> = {
  "curiosity-rover": curiosityRover,
  "perseverance-rover": perseveranceRover,
  "voyager-spacecraft": voyagerSpacecraft,
  "cassini-spacecraft": cassiniSpacecraft,
  "juno-spacecraft": junoSpacecraft,
  "new-horizons-spacecraft": newHorizonsSpacecraft,
  "venus-express": venusExpress,
  "messenger-spacecraft": messengerSpacecraft,
};

const SpacecraftGallery = ({ planetId }: SpacecraftGalleryProps) => {
  const spacecraftData = getSpacecraftByPlanet(planetId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!spacecraftData || spacecraftData.length === 0) {
    return null;
  }

  const lightboxImages = spacecraftData.map(sc => ({
    src: imageMap[sc.image] || "",
    name: sc.name,
    mission: sc.mission
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spacecraftData.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spacecraftData.length) % spacecraftData.length);
  };

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Spacecraft <span className="text-primary">Database</span>
      </h2>
      <p className="text-muted-foreground mb-6">
        Detailed information about spacecraft that have explored this planet
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {spacecraftData.map((spacecraft, index) => (
          <SpacecraftInfoCard
            key={spacecraft.id}
            spacecraft={spacecraft}
            image={imageMap[spacecraft.image] || ""}
            onImageClick={() => openLightbox(index)}
          />
        ))}
      </div>

      <ImageLightbox
        images={lightboxImages}
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
