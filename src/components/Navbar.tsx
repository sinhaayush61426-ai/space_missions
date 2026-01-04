import { useState } from "react";
import { Rocket, Map, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import FavoritesPanel from "@/components/FavoritesPanel";
import { useFavorites } from "@/hooks/useFavorites";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const { favorites } = useFavorites();

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-base sm:text-lg text-foreground">
                Space<span className="text-primary">Missions</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
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
              <button
                onClick={() => setFavoritesOpen(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium relative"
              >
                <Heart className="w-4 h-4" />
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-3 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setFavoritesOpen(true)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors relative"
              >
                <Heart className="w-5 h-5 text-muted-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Menu className="w-5 h-5 text-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-background border-border">
                  <div className="flex flex-col gap-6 mt-8">
                    <SheetClose asChild>
                      <Link
                        to="/map"
                        className="flex items-center gap-3 text-base text-primary hover:text-primary/80 transition-colors font-medium p-3 rounded-lg hover:bg-muted/30"
                      >
                        <Map className="w-5 h-5" />
                        Solar Map
                      </Link>
                    </SheetClose>
                    <button 
                      onClick={() => scrollToSection("planets")}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors font-medium p-3 rounded-lg hover:bg-muted/30 text-left"
                    >
                      Planets
                    </button>
                    <button 
                      onClick={() => scrollToSection("outer")}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors font-medium p-3 rounded-lg hover:bg-muted/30 text-left"
                    >
                      Outer Missions
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      
      <FavoritesPanel isOpen={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  );
};

export default Navbar;
