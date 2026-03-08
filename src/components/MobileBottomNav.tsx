import { Globe, Map, Rocket, Home, Sparkles, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  
  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-1">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
            isHome ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <button
          onClick={() => scrollToSection("planets")}
          className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] font-medium">Planets</span>
        </button>

        <Link
          to="/map"
          className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
            isActive("/map") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-medium">Map</span>
        </Link>

        <button
          onClick={() => scrollToSection("exoplanets")}
          className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium">Exoplanets</span>
        </button>

        <Link
          to="/quiz"
          className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
            isActive("/quiz") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">Quiz</span>
        </Link>

        <button
          onClick={() => scrollToSection("outer")}
          className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] font-medium">Missions</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
