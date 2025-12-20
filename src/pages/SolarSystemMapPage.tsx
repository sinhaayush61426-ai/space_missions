import { useNavigate } from "react-router-dom";
import SolarSystemMap from "@/components/SolarSystemMap";

const SolarSystemMapPage = () => {
  const navigate = useNavigate();

  return (
    <SolarSystemMap
      isFullscreen={true}
      onClose={() => navigate("/")}
    />
  );
};

export default SolarSystemMapPage;
