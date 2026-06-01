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

// Helper function to generate deterministic pseudo-random values
const seededRandom = (seed: number, index: number): number => {
  const x = Math.sin(seed * 73.156 + index * 19.251) * 10000;
  return x - Math.floor(x);
};

// Draw impact craters with realistic depth
const drawCrater = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  depth: number,
  baseColor: string
) => {
  // Outer crater ring
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = size * 0.15;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.stroke();

  // Crater ejecta (outer debris field)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(x, y, size * 1.3, 0, Math.PI * 2);
  ctx.fill();

  // Central depression with shadow
  const craterGradient = ctx.createRadialGradient(
    x - size * 0.3,
    y - size * 0.3,
    0,
    x,
    y,
    size
  );
  craterGradient.addColorStop(0, 'rgba(100, 100, 100, 0.3)');
  craterGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  
  ctx.fillStyle = craterGradient;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Central peak (for large craters)
  if (size > 3) {
    ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
};

// Draw storm or atmospheric vortex
const drawStorm = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  rotation: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Spiral storm pattern
  for (let layer = 0; layer < 3; layer++) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.5 - layer * 0.15;
    ctx.lineWidth = size * (0.2 - layer * 0.05);
    ctx.beginPath();
    
    for (let angle = 0; angle < Math.PI * 2 * 2; angle += 0.1) {
      const r = (size / 3) * (angle / (Math.PI * 2 * 2)) + layer;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (angle === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
};

// Draw ice cap or polar feature
const drawIceCap = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  capRadius: number,
  color: string
) => {
  // Northern cap with crystalline texture
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(centerX, centerY - radius + capRadius, capRadius, 0, Math.PI * 2);
  ctx.fill();

  // Add crystalline detail
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * capRadius * 0.6;
    const y = centerY - radius + capRadius + Math.sin(angle) * capRadius * 0.3;
    ctx.beginPath();
    ctx.arc(x, y, capRadius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

// Main drawing function
const drawCartoonPlanet = (
  canvas: HTMLCanvasElement,
  planetId: string,
  size: number = 64,
  time: number = 0
) => {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Animation phases
  const rot = time * 0.4; // overall rotation phase (radians-ish)
  const pulse = 0.5 + 0.5 * Math.sin(time * 1.2); // 0..1
  const highlightAngle = time * 0.3;
  
  // Get planet style
  const style = exoplanetStyles[planetId] || planetStyles[planetId];
  if (!style) {
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  canvas.width = size;
  canvas.height = size;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 2;
  const seed = planetId.charCodeAt(0) + planetId.charCodeAt(1);

  // Draw outer atmosphere glow
  if (style.hasAtmosphere) {
    for (let i = 3; i > 0; i--) {
      ctx.fillStyle = style.atmosphereColor;
      ctx.globalAlpha = 0.15 / i;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + i * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Draw planet base with radial gradient
  const baseGradient = ctx.createRadialGradient(
    centerX - radius * 0.3,
    centerY - radius * 0.3,
    0,
    centerX,
    centerY,
    radius
  );
  baseGradient.addColorStop(0, style.baseColor);
  baseGradient.addColorStop(0.7, style.baseColor);
  baseGradient.addColorStop(1, style.accentColors[0] || style.baseColor);
  
  ctx.fillStyle = baseGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // DETAILED PATTERN RENDERING
  if (style.pattern === 'stripes') {
    // Jupiter/Saturn band patterns
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < style.accentColors.length; i++) {
      const startY = centerY - radius + (i * radius * 0.66);
      
      ctx.fillStyle = style.accentColors[i];
      ctx.beginPath();
      ctx.moveTo(centerX - radius, startY);
      ctx.lineTo(centerX + radius, startY);
      ctx.lineTo(centerX + radius, startY + radius * 0.25);
      ctx.lineTo(centerX - radius, startY + radius * 0.25);
      ctx.fill();
      
      // Add turbulence in bands
      ctx.globalAlpha = 0.25;
      for (let j = 0; j < 4; j++) {
        const randomOffset = seededRandom(seed + i, j) * radius * 0.1;
        const waveX = centerX - radius + (j * radius * 0.5);
        const waveY = startY + radius * 0.125 + randomOffset;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(waveX, waveY, radius * 0.3, radius * 0.05);
      }
    }
    ctx.globalAlpha = 1;
  } else if (style.pattern === 'spots') {
    // Cratered surface (Mercury, Mars)
    ctx.globalAlpha = 0.6;
    
    // Large impact basins
    for (let i = 0; i < 5; i++) {
      const angle = seededRandom(seed, i * 100) * Math.PI * 2;
      const distance = radius * (0.4 + seededRandom(seed + 50, i) * 0.4);
      const craterX = centerX + Math.cos(angle) * distance;
      const craterY = centerY + Math.sin(angle) * distance;
      const craterSize = radius * (0.08 + seededRandom(seed + 100, i) * 0.1);
      
      drawCrater(ctx, craterX, craterY, craterSize, 0.6, style.baseColor);
    }

    // Medium and small craters for detail
    for (let i = 0; i < 15; i++) {
      const angle = seededRandom(seed + 200, i) * Math.PI * 2;
      const distance = radius * (0.2 + seededRandom(seed + 250, i) * 0.7);
      const craterX = centerX + Math.cos(angle) * distance;
      const craterY = centerY + Math.sin(angle) * distance;
      const craterSize = radius * (0.02 + seededRandom(seed + 300, i) * 0.05);
      
      drawCrater(ctx, craterX, craterY, craterSize, 0.4, style.baseColor);
    }
    ctx.globalAlpha = 1;
  } else if (style.pattern === 'waves') {
    // Ocean/atmospheric patterns (Earth, Venus, Neptune)
    ctx.globalAlpha = 0.5;
    
    // Add storm systems
    if (['neptune', 'earth', 'venus', 'toi-700d'].includes(planetId)) {
      for (let i = 0; i < 2; i++) {
        const angle = seededRandom(seed, i) * Math.PI * 2;
        const distance = radius * (0.3 + seededRandom(seed + 50, i) * 0.4);
        const stormX = centerX + Math.cos(angle) * distance;
        const stormY = centerY + Math.sin(angle) * distance;
        const stormSize = radius * 0.15;
        const stormRotation = seededRandom(seed + 100, i) * Math.PI * 2;
        
        drawStorm(ctx, stormX, stormY, stormSize, style.accentColors[i % style.accentColors.length], stormRotation);
      }
    }

    // Ocean wave patterns
    for (let wave = 0; wave < 4; wave++) {
      ctx.strokeStyle = style.accentColors[wave % style.accentColors.length];
      ctx.lineWidth = radius * 0.04;
      ctx.globalAlpha = 0.4 - wave * 0.08;
      
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.15) {
        const waveOffset = Math.sin(angle * 3 + wave * 0.8) * radius * 0.18;
        const noise = seededRandom(seed + wave, Math.floor(angle * 10)) * radius * 0.05;
        const distance = radius * 0.4 + waveOffset + noise;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Add ice caps for compatible planets
    if (['earth', 'toi-700d'].includes(planetId)) {
      drawIceCap(ctx, centerX, centerY, radius, radius * 0.18, 'rgba(220, 240, 255, 0.8)');
      drawIceCap(ctx, centerX, centerY + radius * 2 - 2, radius, radius * 0.18, 'rgba(220, 240, 255, 0.8)');
    }
  } else if (style.pattern === 'gradient') {
    // Ice giants (Uranus, ice giants)
    ctx.globalAlpha = 0.5;
    for (let layer = 1; layer > 0; layer -= 0.2) {
      const layerGradient = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        0,
        centerX,
        centerY,
        radius * layer
      );
      layerGradient.addColorStop(0, style.accentColors[0] || style.baseColor);
      layerGradient.addColorStop(0.5, style.baseColor);
      layerGradient.addColorStop(1, style.accentColors[Math.floor((1 - layer) * 3) % style.accentColors.length] || style.baseColor);
      
      ctx.fillStyle = layerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * layer, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add cloud bands for ice giants
    for (let band = 0; band < 3; band++) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = radius * 0.08;
      ctx.globalAlpha = 0.3;
      const bandY = centerY - radius + (band * radius * 0.5);
      ctx.beginPath();
      ctx.moveTo(centerX - radius, bandY);
      ctx.lineTo(centerX + radius, bandY);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // SATURN'S RINGS
  if (planetId === 'saturn') {
    // Main ring bands
    for (let ringLayer = 0; ringLayer < 3; ringLayer++) {
      ctx.strokeStyle = `rgba(${200 - ringLayer * 20}, ${180 - ringLayer * 20}, ${120 - ringLayer * 20}, ${0.7 - ringLayer * 0.2})`;
      ctx.lineWidth = radius * (0.25 - ringLayer * 0.08);
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * (1.4 - ringLayer * 0.15), radius * (0.5 - ringLayer * 0.05), Math.PI * 0.1, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Ring gaps (Cassini division)
    ctx.strokeStyle = 'rgba(50, 40, 30, 0.5)';
    ctx.lineWidth = radius * 0.1;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * 1.2, radius * 0.4, Math.PI * 0.1, 0, Math.PI * 2);
    ctx.stroke();

    // Ring shadows
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = radius * 0.12;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * 1.35, radius * 0.45, Math.PI * 0.1, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ADVANCED HIGHLIGHTING
  if (style.hasHighlight) {
    // Primary specular highlight
    const highlightGradient = ctx.createRadialGradient(
      centerX - radius * 0.35,
      centerY - radius * 0.35,
      0,
      centerX,
      centerY,
      radius * 0.8
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    highlightGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
    highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Secondary rim light
    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = radius * 0.08;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.95, 0, Math.PI * 2);
    ctx.stroke();

    // Tertiary subtle highlight
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.25, centerY - radius * 0.4, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // DEPTH AND SHADOW
  const shadowGradient = ctx.createLinearGradient(centerY - radius, centerY + radius, 0, 0);
  shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  
  ctx.fillStyle = shadowGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Terminator line (day/night line)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = radius * 0.06;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
  ctx.stroke();

  // Final detailed outline
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = radius * 0.05;
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
