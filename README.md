# 🚀 Space Missions Explorer

An interactive web app for exploring the solar system, discovering exoplanets, and learning about space missions — built with a dark cosmic aesthetic, rich visualizations, and mobile-first design.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.160-black?logo=three.js)

---

## ⚡ Quick Start

```bash
git clone https://github.com/sinhaayush61426-ai/space_missions
cd space-missions
bun install
bun run dev
# Open http://localhost:5173
```

---

## ✨ Features

### 🌍 Solar System Explorer
- Browse all 8 planets with scientifically accurate data (2025/2026 agency figures)
- Interactive **3D planet models** with procedural textures, day/night cycles, and rotation
- **Internal structure** SVG half-cutaway diagrams with scroll animations and click-to-expand layers
- **Major moons** section with diameter, orbit, discovery info, and notable characteristics
- **Mission timelines** for each planet — past, active, and upcoming missions

### 🌌 Exoplanet Discovery
- Catalog of notable exoplanets: TRAPPIST-1 system, Proxima Centauri b, Kepler-452b, TOI-700d
- Host star data (spectral type, temperature, luminosity, habitable zone)
- **Multi-criteria filtering** — search by name, type, habitability index, and distance
- **Habitability comparison chart** with scoring visualizations
- **Orbital period chart** — exoplanet years vs Earth with:
  - Linear / logarithmic scale toggle
  - Configurable hover tooltips (on/off, units in days/years, adjustable delay)
  - PNG & CSV export with filename customization
  - Full keyboard navigation and screen reader accessibility
  - Settings persisted in localStorage

### 📊 Planet Comparison Tool
- Side-by-side comparison of any two planets
- Normalized bar charts for physical properties
- Export comparison as PNG image

### 🗺️ Interactive Solar System Map
- 2D Canvas map with animated orbital paths
- Asteroid Belt and Oort Cloud visualization
- Pan, zoom, and click-to-select planets

### 🎓 Space Quiz
- Dynamically generated questions from planetary data
- Scoring system with rank titles
- Multiple difficulty levels

### 🛸 Spacecraft & Missions Database
- Tech info cards for historical and active spacecraft
- Outer solar system mission highlights
- Image lightbox gallery

### 📱 Mobile-First UX
- 6-tab fixed bottom navigation
- Swipe gestures between planet pages
- Haptic feedback on supported devices
- Smooth scroll with offsets for fixed navbars
- Animated page transitions via Framer Motion

### ♿ Accessibility
- Keyboard navigation (arrow keys, Enter, Escape) throughout
- ARIA roles, labels, and live regions for screen readers
- Focus management on tooltip dismissal
- Semantic HTML structure

### ⭐ Favorites System
- Bookmark any planet or exoplanet
- Persistent favorites via localStorage
- Quick-access favorites panel

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript 5.8 |
| Build Tool | Vite 5 (SWC) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | Framer Motion |
| Components | Radix UI primitives + shadcn/ui |
| Routing | React Router 6 |
| Charts | Recharts + custom Canvas rendering |
| State | React hooks + localStorage persistence |
| Forms | React Hook Form + Zod validation |

---

## 📁 Project Structure

```
src/
├── assets/              # Planet & exoplanet images
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── Hero.tsx          # Landing hero section
│   ├── PlanetsSection.tsx
│   ├── ExoplanetsSection.tsx
│   ├── ExoplanetOrbitalChart.tsx
│   ├── HabitabilityChart.tsx
│   ├── PlanetInternalStructure.tsx
│   ├── MajorMoonsSection.tsx
│   ├── MissionTimeline.tsx
│   ├── SolarSystemMap.tsx
│   ├── Planet3D.tsx
│   ├── CompareModal.tsx
│   ├── SpacecraftInfoCard.tsx
│   ├── SpacecraftGallery.tsx
│   └── ...
├── data/
│   ├── planetsData.ts    # Solar system planets (source of truth)
│   ├── exoplanetsData.ts # Exoplanet catalog
│   └── spacecraftData.ts # Spacecraft & missions
├── hooks/
│   ├── useCompare.ts
│   ├── useFavorites.ts
│   ├── useHapticFeedback.ts
│   ├── useKeyboardNavigation.ts
│   └── useSwipeNavigation.ts
├── pages/
│   ├── Index.tsx
│   ├── PlanetDetail.tsx
│   ├── ExoplanetDetail.tsx
│   ├── SolarSystemMapPage.tsx
│   └── QuizPage.tsx
└── App.tsx
```

---

## 🗺️ Routes

| Path | Page |
|------|------|
| `/` | Home — Hero, planets grid, exoplanets, spacecraft |
| `/planet/:planetId` | Planet detail — 3D model, structure, moons, missions |
| `/exoplanet/:exoplanetId` | Exoplanet detail page |
| `/map` | Interactive solar system map |
| `/quiz` | Space knowledge quiz |

---

## 📐 Data Architecture

All scientific data lives in `src/data/*.ts` as typed TypeScript constants — the single source of truth. Data reflects 2025/2026 agency figures (e.g., Saturn has 274 confirmed moons). No external APIs are called at runtime.

---

## 🎨 Design System

- **Theme**: Dark cosmic aesthetic with starfield background and golden accents
- **Colors**: HSL-based semantic tokens defined in `index.css` (`--primary`, `--background`, `--foreground`, etc.)
- **Typography**: Display font for headings, system/Inter for body
- **Components**: shadcn/ui with Radix primitives, customized via Tailwind

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with HMR |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |

---

## 🌐 Browser Support

Modern browsers with ES2020+ support: Chrome, Firefox, Safari, Edge (latest 2 versions).

---

## 📄 License

Open source for learning, experimentation, and personal use. Fork, modify, and adapt Space Missions to your needs.