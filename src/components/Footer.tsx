import { Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">Space Missions</h3>
              <p className="text-xs text-muted-foreground">Exploring the cosmos</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Data sourced from NASA, ESA, JAXA, and space agencies worldwide.
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Space Missions Explorer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
