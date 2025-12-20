import { Rocket, Map } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Space<span className="text-primary">Missions</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/map"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Map className="w-4 h-4" />
              Solar Map
            </Link>
            <button 
              onClick={() => scrollToSection("planets")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Planets
            </button>
            <button 
              onClick={() => scrollToSection("outer")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Outer Missions
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
