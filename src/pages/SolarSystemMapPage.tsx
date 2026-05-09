import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SolarSystemMap from "@/components/SolarSystemMap";

const SolarSystemMapPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Map";
  }, []);

  return (
    <SolarSystemMap
      isFullscreen={true}
      onClose={() => navigate("/")}
    />
  );
};

export default SolarSystemMapPage;
