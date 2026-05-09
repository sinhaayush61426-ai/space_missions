import { useEffect, useRef } from "react";

interface CartoonPlanetProps {
  id: string;
  name: string;
  size?: number;
  shadow?: string;
  delay?: number;
}

// Cartoony planet configurations with professional styling
const planetStyles: Record<string, {
  baseColor: string;
  accentColors: string[];
  pattern: 'stripes' | 'spots' | 'waves' | 'rings' | 'solid' | 'gradient';
  hasHighlight: boolean;
  hasAtmosphere: boolean;
  atmosphereColor: string;
}> = {
  mercury: {
    baseColor: "#9a9a9a",
    accentColors: ["#6b6b6b", "#7a7a7a"],
    pattern: 'spots',
    hasHighlight: true,
    hasAtmosphere: false,
    atmosphereColor: '#fff',
  },
  venus: {
    baseColor: "#ffc649",
    accentColors: ["#ffb923", "#f4a460"],
    pattern: 'waves',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#ffe8b3',
  },
  earth: {
    baseColor: "#4a90e2",
    accentColors: ["#2d6a4f", "#1a4731"],
    pattern: 'gradient',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#87ceeb',
  },
  mars: {
    baseColor: "#e85d39",
    accentColors: ["#c1440e", "#8b3a0e"],
    pattern: 'spots',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#ffb380',
  },
  jupiter: {
    baseColor: "#d9a066",
    accentColors: ["#c9915b", "#8b6914", "#a67c52"],
    pattern: 'stripes',
    hasHighlight: true,
    hasAtmosphere: false,
    atmosphereColor: '#fff',
  },
  saturn: {
    baseColor: "#f4d59e",
    accentColors: ["#c9a86c", "#e8d4a8"],
    pattern: 'stripes',
    hasHighlight: true,
    hasAtmosphere: false,
    atmosphereColor: '#fff',
  },
  uranus: {
    baseColor: "#7de3f4",
    accentColors: ["#4fd1c5", "#38b2ac"],
    pattern: 'gradient',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#a8e6cf',
  },
  neptune: {
    baseColor: "#5a7dd9",
    accentColors: ["#3d5fc4", "#1a3a8a"],
    pattern: 'waves',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#6b8cce',
  },
};

// Exoplanet styles
const exoplanetStyles: Record<string, typeof planetStyles['earth']> = {
  'proxima-centauri-b': {
    baseColor: '#d4534f',
    accentColors: ['#a73e37', '#8b2818'],
    pattern: 'spots',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#e89999',
  },
  'trappist-1e': {
    baseColor: '#4a90e2',
    accentColors: ['#2d6a4f', '#1a4731'],
    pattern: 'gradient',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#87ceeb',
  },
  'trappist-1f': {
    baseColor: '#8a5c4d',
    accentColors: ['#6b4423', '#4a2f1f'],
    pattern: 'spots',
    hasHighlight: true,
    hasAtmosphere: false,
    atmosphereColor: '#fff',
  },
  'trappist-1g': {
    baseColor: '#5a6b7d',
    accentColors: ['#3d4a52', '#2a3139'],
    pattern: 'waves',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#8899bb',
  },
  'kepler-452b': {
    baseColor: '#c49a5f',
    accentColors: ['#a67c4a', '#8b6434'],
    pattern: 'stripes',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#d9b896',
  },
  'toi-700d': {
    baseColor: '#4a90e2',
    accentColors: ['#2d6a4f', '#1a4731'],
    pattern: 'gradient',
    hasHighlight: true,
    hasAtmosphere: true,
    atmosphereColor: '#87ceeb',
  },
};

const drawCartoonPlanet = (
  canvas: HTMLCanvasElement,
  planetId: string,
  size: number = 64
) => {
  const ctx = canvas.getContext('2d')!;
  
  // Get planet style (check exoplanets first, then planets)
  const style = exoplanetStyles[planetId] || planetStyles[planetId];
  if (!style) {
    // Default style
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // Set canvas size
  canvas.width = size;
  canvas.height = size;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 2;

  // Draw atmosphere if present
  if (style.hasAtmosphere) {
    ctx.fillStyle = style.atmosphereColor;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Draw planet base
  ctx.fillStyle = style.baseColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw pattern
  if (style.pattern === 'stripes') {
    // Horizontal stripes
    const stripeHeight = radius / 3;
    for (let i = 0; i < style.accentColors.length; i++) {
      ctx.fillStyle = style.accentColors[i];
      ctx.globalAlpha = 0.6;
      const startY = centerY - radius + (i * stripeHeight);
      ctx.beginPath();
      ctx.arc(centerX, startY + stripeHeight / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw stripe segment
      ctx.fillRect(centerX - radius, startY, radius * 2, stripeHeight / 2);
    }
    ctx.globalAlpha = 1;
  } else if (style.pattern === 'spots') {
    // Random spots for texture
    ctx.fillStyle = style.accentColors[0];
    ctx.globalAlpha = 0.5;
    // Create deterministic spots based on planetId
    const seed = planetId.charCodeAt(0);
    for (let i = 0; i < 8; i++) {
      const angle = (seed + i * 123) * 0.1;
      const distance = (radius * 0.4) + ((seed + i * 47) % 20) / 20 * radius * 0.3;
      const spotX = centerX + Math.cos(angle) * distance;
      const spotY = centerY + Math.sin(angle) * distance;
      const spotSize = ((seed + i * 19) % 10) / 10 * radius * 0.2 + 1;
      
      ctx.beginPath();
      ctx.arc(spotX, spotY, spotSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else if (style.pattern === 'waves') {
    // Wave pattern
    ctx.strokeStyle = style.accentColors[0];
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.5;
    
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
        const waveOffset = Math.sin(angle * 2 + wave) * radius * 0.15;
        const distance = radius * 0.5 + waveOffset;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (style.pattern === 'gradient') {
    // Radial gradient for more realistic look
    const gradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      0,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, style.accentColors[0] || style.baseColor);
    gradient.addColorStop(0.5, style.baseColor);
    gradient.addColorStop(1, style.accentColors[style.accentColors.length - 1] || style.baseColor);
    
    // Draw gradient overlay
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Draw highlight (cartoony shine effect)
  if (style.hasHighlight) {
    const highlightGradient = ctx.createRadialGradient(
      centerX - radius * 0.4,
      centerY - radius * 0.4,
      0,
      centerX,
      centerY,
      radius
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    highlightGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add subtle shadow/depth
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
};

const CartoonPlanet = ({ id, name, size = 64, shadow, delay = 0 }: CartoonPlanetProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawCartoonPlanet(canvasRef.current, id, size);
    }
  }, [id, size]);

  const style = exoplanetStyles[id] || planetStyles[id];
  const shadowColor = shadow || (style?.baseColor || '#888');

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      alt={name}
      className="rounded-full object-cover animate-float"
      style={{
        boxShadow: `0 0 30px ${shadowColor}40`,
        animationDelay: `${delay * 0.5}s`,
      }}
    />
  );
};

export default CartoonPlanet;
