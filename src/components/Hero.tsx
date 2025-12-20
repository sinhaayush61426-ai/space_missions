import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToContent = () => {
    document.getElementById("planets")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center top, hsl(220 30% 15%) 0%, hsl(220 20% 4%) 70%)"
        }}
      />
      
      {/* Orbital rings decoration */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
        <div className="w-[600px] h-[600px] border border-primary/30 rounded-full animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] border border-accent/30 rounded-full animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
        <div className="absolute w-[200px] h-[200px] border border-cosmic-blue/30 rounded-full animate-spin-slow" style={{ animationDuration: "10s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <p 
          className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Explore the Cosmos
        </p>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 glow-text opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-foreground">Space</span>{" "}
          <span className="gold-gradient">Missions</span>
        </h1>
        
        <p 
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Journey through humanity's greatest expeditions across our solar system. 
          From Mercury's scorching surface to the frozen reaches of the Kuiper Belt.
        </p>

        <button 
          onClick={scrollToContent}
          className="group inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="font-display text-sm tracking-wider uppercase">Begin Exploration</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
