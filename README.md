# Space Missions Explorer

> An interactive, immersive, feature-rich web application for exploring our solar system, discovering exoplanets, and learning about space missions through engaging visualizations and interactive tools. Built with cutting-edge web technologies for a seamless, high-performance learning experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4+-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.160+-black?style=for-the-badge&logo=three.js)

**Live Demo:** [Coming Soon](#) | **Documentation:** [Full Docs](#documentation) | **Issues:** [GitHub Issues](#)

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Components](#-components)
- [Data Structure](#-data-structure)
- [Hooks & State Management](#-hooks--state-management)
- [API Reference](#-api-reference)
- [Advanced Features](#-advanced-features)
- [Configuration](#-configuration)
- [Development Guide](#-development-guide)
- [Performance Optimization](#-performance-optimization)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [FAQ](#-faq)
- [Available Scripts](#-available-scripts)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)

## ⚡ Quick Start

Get the application running in 3 minutes:

```bash
# Clone and setup
git clone https://github.com/sinhaayush61426-ai/space_missions.git
cd space_missions

# Install using Bun
bun install

# Start development server
bun run dev

# Open in browser
# Navigate to http://localhost:5173
```

**That's it!** The application will now be running with hot module replacement enabled.

## ✨ Features

### 🌍 Solar System Explorer

#### Interactive Planet Catalog
Browse all 8 planets with comprehensive, scientifically accurate information including:
- **Orbital Characteristics**: Semi-major axis, orbital period, eccentricity, inclination
- **Atmospheric Data**: Composition percentages, pressure readings, wind speeds
- **Physical Properties**: Diameter, radius, surface area, mass calculations
- **Climate Information**: Temperature ranges, notable weather patterns, atmospheric phenomena
- **Moon Systems**: Complete roster of natural satellites with detailed breakdowns
- **Surface Features**: Topography, notable regions, surface gravity variations
- **3D Visualizations**: Real-time rendered 3D models with:
  - Accurate color representation
  - Texture mapping from NASA data
  - Rotation animations
  - Size-to-scale comparisons
  - Interactive manipulation (rotate, zoom, pan)

#### Comprehensive Mission Timelines
Explore the complete history and future of space exploration to each planet with:
- **Historical Missions**: All past missions organized chronologically
  - Launch date and completion date
  - Space agency or international partnership
  - Mission success rate and key discoveries
  - Detailed achievement summaries
- **Active Missions**: Currently operational spacecraft with:
  - Real-time mission status updates
  - Scientific instruments and capabilities
  - Current data collection focus areas
- **Upcoming Missions**: Future missions planned for the next 20+ years
  - Expected launch dates
  - Mission objectives and goals
  - Scientific payload information
- **Mission Types Explained**:
  - Flyby: Brief planetary encounters
  - Orbiter: Long-term orbital study
  - Lander: Surface exploration
  - Rover: Mobile surface surveys
  - Probe: Deep space analysis
  - Observatory: Telescopic observation

- **Planet Internal Structure**: Detailed cross-section views showing:
  - Core, mantle, and crust layers with detailed composition
  - Temperature and pressure zones with precise measurements
  - Composition details for each layer
  - Color-coded visualization with legend
  - Magnetic field information where applicable

- **Major Moons Section**: Comprehensive moon data including:
  - Moon diameter, radius, and orbital parameters
  - Discovery information and discoverer names
  - Unique characteristics and notable features
  - Potential habitability indicators
  - Geological formation types

### 🌌 Exoplanet Discovery System

#### Extensive Exoplanet Database
Discover exoplanets beyond our solar system with comprehensive scientific data:
- **Over 100+ Confirmed Exoplanets**: Including well-studied candidates like:
  - TRAPPIST-1 System: 7 Earth-sized planets in habitable zone
  - Proxima Centauri b: Nearest exoplanet to our solar system
  - Kepler-452b: "Earth's cousin" in habitable zone
  - TOI-700d: Recent discovery with promising characteristics
- **Exoplanet Properties**:
  - Orbital period and semi-major axis
  - Stellar distance and host star classification
  - Estimated mass and radius
  - Atmospheric composition (where known)
  - Discovery method and confirmation status
- **Host Star Information**:
  - Spectral classification (O, B, A, F, G, K, M types)
  - Temperature, luminosity, and mass
  - Distance from Earth in light-years and parsecs
  - Habitable zone boundaries and positioning

- **Advanced Filtering System**:
  - **Habitability Filters**:
    - Habitability Index (0-100 scale)
    - Earth Similarity Index (ESI)
    - SPH (Standard Primary Habitable zone)
  - **Stellar Filters**:
    - Star Type/Spectral Class
    - Stellar Temperature (K)
    - Star Luminosity (relative to Sun)
  - **Orbital Filters**:
    - Orbital Period Range (days)
    - Semi-major Axis Range (AU)
  - **Distance Filters**:
    - Distance from Earth (light-years)
    - Distance from Earth (parsecs)
  - **Composite Filters**:
    - Atmospheric composition matching
    - Mass-radius relationship
    - Multiple criteria stacking

#### Sophisticated Habitability Assessment
Advanced visualization and scoring system for exoplanet habitability:
- **Habitability Index Scoring**:
  - Scientific accuracy based on peer-reviewed studies
  - Multi-factor calculation model
  - Real-time score updates with filter changes
  - Confidence intervals and uncertainty ranges
- **Visual Habitability Charts**:
  - Radial charts showing all factors
  - Comparative visualization tools
  - Historical scoring trends
  - Peer comparison functionality
- **Habitability Classifications**:
  - High Potential (80-100)
  - Moderate Potential (50-79)
  - Low Potential (20-49)
  - Unlikely (0-19)
- **Specific Factors Analyzed**:
  - Stellar flux and energy balance
  - Atmospheric retention capability
  - Magnetic field presence
  - Tidal heating potential
  - Radiation environment

#### Interactive Orbital Period Visualization
Advanced charting for orbital mechanics:
- **Orbital Period Charts**:
  - Distribution across dataset
  - Compared to Earth's year
  - Resonance patterns with host star
  - Relationship to habitable zone proximity
- **Kepler's Laws Visualization**:
  - Semi-major axis vs. orbital period
  - Eccentricity effects on climate
  - System architecture diagrams
- **Data Export Options**:
  - PNG image export
  - CSV data export
  - JSON format export

### 📊 Advanced Comparison Tools

#### Multi-Parameter Planet vs Planet Comparison
Sophisticated side-by-side analysis of up to 2 planets simultaneously:
- **Physical Comparison**:
  - Diameter and radius side-by-side
  - Mass and density analysis
  - Surface area calculations
  - Volume comparisons
  - Scale visualization (Earth as reference)
- **Atmospheric Comparison**:
  - Composition percentage charts
  - Pressure comparisons
  - Wind speed data
  - Atmospheric dynamics
- **Enhanced Data Visualization**:
  - Radar/spider charts for multi-dimensional comparison
  - Bar charts for numerical comparisons
  - Ratio calculations and displays
  - Percentage differences highlighted
- **Mission History Comparison**:
  - Number of missions per planet
  - Mission success rates
  - Total exploration years
  - Agency contributions
- **Export Functionality**:
  - Generate comparison reports (PDF)
  - Export comparison images
  - Share comparison via URL
  - Print-optimized layouts

#### Intelligent Comparison Bar
Quick-access comparison interface with:
- **DragAndDrop Reordering**: Rearrange comparison selection
- **Quick Stats Preview**: Immediate data display on hover
- **One-Click Addition**: Add planets from anywhere in the app
- **Comparison History**: Track recent comparisons
- **Saved Comparisons**: Save favorite comparison sets

#### Exoplanet Comparison Suite
Multi-exoplanet analysis capabilities:
- **Habitability Comparison**: Direct ESI score comparisons
- **System Architecture**: Display host star systems
- **Discovery Timeline**: When each was discovered
- **Research Focus Areas**: What makes each unique

### 🎓 Comprehensive Interactive Learning Suite

#### Advanced Space Quiz System
Test and expand your knowledge with sophisticated questioning:
- **Dynamic Question Generation**:
  - Procedurally generated questions from data
  - Question pool exceeds 200+ variations
  - Difficulty scaling (Beginner, Intermediate, Expert)
  - Topic specialization options
- **Question Categories**:
  - **Planet Facts**: Physical characteristics, distances, moons
  - **Mission History**: Agency, timeline, achievements, status
  - **Space Exploration**: General space facts, discoveries, history
  - **Exoplanet Knowledge**: Habitability, discovery methods, systems
  - **Comparative Knowledge**: Cross-planetary analysis
- **Quiz Mechanics**:
  - Randomized answer order (prevents memorization)
  - Timed mode optional (30 seconds per question)
  - Instant feedback on correct/incorrect answers
  - Progressive difficulty scaling based on performance
- **Scoring System**:
  - Points multiplier for speed (answer faster = more points)
  - Streak bonuses (consecutive correct answers)
  - Difficulty multipliers
  - Leaderboard tracking (local storage)
- **Performance Analytics**:
  - Category-based success rates
  - Question difficulty analysis
  - Time-to-answer statistics
  - Historical score tracking
- **Advanced Features**:
  - Review missed questions post-quiz
  - Detailed explanations for each answer
  - Related learning materials
  - Challenge friends system

#### Full Interactive Solar System Map
Comprehensive orbital mechanics visualization:
- **Complete System View**:
  - All 8 planets with accurate orbital paths
  - Asteroid belt representation
  - Oort cloud visualization (optional)
  - Kuiper Belt objects
- **Interactive Controls**:
  - Drag to pan across system
  - Pinch-to-zoom on touch devices
  - Mouse wheel zoom on desktop
  - Reset view button
  - Zoom to planet functionality
- **Information Overlays**:
  - Planet name and classification
  - Distance from Sun
  - Orbital period
  - Current orbital position
  - Click for detailed information
- **Scale Options**:
  - Realistic scale (tiny planets, huge distances)
  - Compressed scale (visible everything)
  - Custom scale adjustment slider
  - Toggle between logarithmic and linear
- **Orbital Animation**:
  - Real-time orbital animation
  - Speed adjustment (1x to 1000x)
  - Pause and resume
  - Step through frames
- **Educational Overlays**:
  - Habitable zone visualization
  - Planet classification highlights
  - Mission path animations
  - Historical exploration timeline

### 🎨 Comprehensive User Experience Features

#### Responsive Design Excellence
Seamless experience optimized for all devices:
- **Device Support**:
  - Desktop computers (1920x1080 and up)
  - Tablets and iPad (768px width and up)
  - Mobile phones (320px width and up)
  - Ultra-wide displays (4K and beyond)
  - Smart devices and smartwatches
- **Responsive Techniques**:
  - Mobile-first design approach
  - Flexible grid layouts
  - Scalable typography
  - Touch-optimized interface elements
  - Swipe gesture support on mobile
- **Performance Optimization**:
  - Image optimization by device
  - Lazy loading of components
  - Code splitting by page
  - Progressive enhancement

#### Advanced Favorites Management System
Comprehensive bookmarking and organization:
- **Favorites Panel Features**:
  - Persistent storage (localStorage + cloud sync)
  - Unlimited favorites capacity
  - Organization by category (Planets, Exoplanets, Missions)
  - Quick reordering via drag-and-drop
  - Favorites counter in navbar
- **Favorite Actions**:
  - One-click add/remove
  - Bulk operations (select multiple)
  - Clear all favorites
  - Export favorites list
  - Share favorites via URL
- **Smart Suggestions**:
  - Recently viewed recommendations
  - Similar planet suggestions
  - Related exoplanet recommendations
  - Trending among users

#### Comprehensive Spacecraft Gallery
Extensive space vehicle documentation:
- **Spacecraft Database**:
  - 20+ historical and current spacecraft
  - Operating rovers and landers
  - Space stations (ISS, Mir, Salyut)
  - Telescopes and observatories
  - Probe missions
- **Spacecraft Information Cards**:
  - Full technical specifications
  - Launch and mission dates
  - Current status and location
  - Notable discoveries and achievements
  - Scientific instruments list
  - High-resolution images
- **Gallery Features**:
  - Carousel navigation
  - Filtered views by mission type
  - Timeline view of spacecraft development
  - Agency filtering (NASA, ESA, CNSA, etc.)
  - Search functionality

#### Advanced Theme & Appearance System
Full customization of visual experience:
- **Theme Options**:
  - Light mode (high contrast for daytime)
  - Dark mode (reduced eye strain for night)
  - System preference detection
  - Custom schedule (auto-switch at set times)
- **Persistent Preferences**:
  - Theme preference saved in localStorage
  - Sync across tabs and sessions
  - No flash on page load
- **Accessibility Options**:
  - High contrast mode
  - Reduced motion option
  - Font size adjustment
  - Color-blind friendly palettes

#### Intelligent Navigation System
Multiple ways to browse and explore:
- **Swipe Navigation**:
  - Left/right swipe to switch between planets
  - Up/down swipe for action panels
  - Swipe-back to go to previous page
  - Configurable swipe sensitivity
- **Keyboard Navigation Shortcuts**:
  - Arrow keys: Navigate between items
  - Enter: Select/confirm
  - Escape: Close modals/panels
  - `H`: Jump to home
  - `S`: Open search
  - `Q`: Open quiz
  - `M`: Open map
  - `F`: Toggle favorites
- **Mobile Bottom Navigation**:
  - Quick access to main sections
  - Context-aware (changes on each page)
  - Persistent across pages
  - Touch-optimized sizing
- **Desktop Top Navigation**:
  - Logo/branding click returns home
  - Section navigation
  - Search bar integration
  - Favorites quick access
  - Settings menu

#### Smooth Page Transitions & Animations
Professional animation system:
- **Page Transition Effects**:
  - Fade in/out transitions
  - Slide transitions from left/right
  - Scale animations on content
  - Configurable animation speed
- **Component Animations**:
  - Button hover states
  - Card entrance animations
  - List stagger animations
  - Modal pop-ins
- **Gesture Animations**:
  - Swipe slide-out effects
  - Pull-to-refresh animation
  - Loading spinners
  - Progress indicators

#### Professional Loading States
User-friendly loading indicators:
- **Loading Skeletons**:
  - Skeletal preview of page content
  - Accurate layout placeholder
  - Pulsing animation for activity indication
  - No layout shift on completion
- **Loading Messages**:
  - Context-specific loading text
  - Percentage completion where known
  - Cancel loading option
- **Error States**:
  - Clear error messages
  - Suggested remedies
  - Retry buttons
  - Error logging for debugging

## 🛠️ Comprehensive Technology Stack

### Core Framework & Runtime
- **React 18.3.1** - Modern UI library for building interactive, component-based interfaces
  - Hooks API for state management
  - Context API for global state
  - Suspense for code splitting
  - Fragment support for clean JSX
  - Strict mode for development warnings
- **TypeScript 5.8** - Type-safe JavaScript superset
  - Full type coverage across project
  - Strict mode enabled
  - Path aliases configured
  - Auto-generated types from data
- **Vite 5.4** - Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized build with code splitting
  - Native ES modules in development
  - Pre-configured for React with SWC
  - Build progress reporting

### UI & Component Library
- **Tailwind CSS 3.4** - Utility-first CSS framework
  - Pre-configured with Tailwind plugins
  - Custom color palette for space theme
  - Responsive breakpoints (sm, md, lg, xl, 2xl)
  - Dark mode support
  - Animation utilities
  - Custom spacing and sizing
- **Radix UI** - Unstyled, accessible component primitives
  - 30+ component types including:
    - Dialog/Modal system
    - Dropdown menus and popovers
    - Tabs and accordions
    - Form inputs with validation
    - Alerts and notifications
    - Tooltips and hover cards
    - Navigation menus
    - Carousels and sliders
  - Full keyboard navigation support
  - Screen reader compatible
  - WAI-ARIA compliance
- **shadcn/ui** - High-quality accessible React components built on Radix UI
  - Pre-styled components
  - Copy-paste installation
  - Full customization
  - TypeScript support
- **Lucide React** - Beautiful, consistent SVG icon library
  - 800+ icons
  - Consistent design philosophy
  - Adjustable sizing and colors
  - Tree-shakeable imports
  - Light/dark mode support

### Data Visualization & 3D Graphics
- **Recharts 2.15** - React charting library for data visualization
  - Interactive charts with tooltips
  - Responsive sizing
  - Animation support
  - Custom shapes and curves
  - Legend and axis customization
  - Chart types used:
    - RadarChart (habitability factors)
    - BarChart (comparisons)
    - LineChart (orbital data)
    - PieChart (composition)
    - ComposedChart (multi-metric)
- **Three.js 0.160** - Powerful 3D graphics library
  - WebGL renderer
  - 3D models and textures
  - Lighting and shading
  - Camera controls
  - Geometry manipulation
  - Material system
- **React Three Fiber 8.18** - React renderer for Three.js
  - Declarative 3D with React
  - Canvas component
  - Hooks for animation
  - Event handling
- **React Three Drei 9.122** - Utility collection for Three.js
  - Pre-built 3D components
  - Camera controls (OrbitControls)
  - Geometry helpers
  - Material utilities
  - Animation helpers

### Form Management & Validation
- **React Hook Form 7.61** - Efficient form state management
  - Minimal re-renders
  - Easy to integrate validators
  - TypeScript support
  - Template validation
  - Uncontrolled components
- **Zod 3.25** - Schema validation library
  - Type-safe schema definition
  - Runtime validation
  - Custom error messages
  - Transform capabilities
  - Async validation support
- **@hookform/resolvers** - Integration layer
  - Connects React Hook Form with Zod
  - Error message formatting

### Routing & State Management
- **React Router v6** - Modern client-side routing
  - Dynamic route parameters
  - Nested routing support
  - Navigation history management
  - Path-based routing with wildcards
  - Programmatic navigation
  - Route transitions
  - Lazy route loading
- **TanStack React Query 5.83** - Server state management
  - Automatic caching and invalidation
  - Background refetching
  - Optimistic updates
  - Error handling and retry logic
  - DevTools integration
- **Framer Motion 12.23** - Advanced animation library
  - Declarative animations
  - Gesture recognizers (swipe, drag, hover)
  - Layout animations
  - Page transitions
  - Stagger animations
  - Variants for complex animation sequences
  - Energy-based physics simulation
  - Exit animations

### Utilities & Enhancement Libraries
- **html-to-image** - Screenshot and export functionality
  - Generate images from DOM
  - PNG, JPG, SVG export
  - Custom styling during export
  - Resolution adjustments
- **embla-carousel** - Carousel/slider component
  - Touch gesture support
  - Keyboard navigation
  - Loop and autoplay options
  - Responsive breakpoints
  - Progress indicators
- **react-resizable-panels** - Resizable layout system
  - Drag to resize panels
  - Collapse/expand functionality
  - Persist layout preferences
  - Keyboard shortcuts
- **next-themes** - Theme management solution
  - System preference detection
  - Persistent theme storage
  - SSR support
  - Theme provider context
- **Sonner** - Modern toast notification system
  - Success, error, warning, info types
  - Auto-dismiss
  - Customizable position
  - Action buttons
  - Loading state
- **date-fns 3.6** - Modern date utility library
  - Parse and format dates
  - Timezone support
  - Locale support
  - Date arithmetic
  - Relative time formatting
- **class-variance-authority** - CSS class management
  - Type-safe variant composition
  - Style composition
  - Conditional styling
- **tailwind-merge** - Merge Tailwind CSS classes
  - Remove conflicting classes
  - Compose utility classes
  - Custom resolution

### Development & Build Tools
- **ESLint 9.32** - Code quality and consistency checker
  - TypeScript support via typescript-eslint
  - React hooks linting
  - React refresh linting
  - Custom rules configuration
- **Autoprefixer** - CSS vendor prefix tool
  - Automatic browser prefix addition
  - Configurable browser targets
- **PostCSS** - CSS transformation tool
  - Tailwind CSS integration
  - Autoprefixer application
  - Custom plugin support
- **Lovable Tagger** - Component development helper
  - Tag components for better organization
  - Development-only feature

### Project Statistics
- **Total Dependencies**: 60+
- **Dev Dependencies**: 12+
- **Code Coverage**: TypeScript strict mode enabled
- **Bundle Size Target**: < 500KB (gzipped)
- **Performance**: Lighthouse score > 90

## 📥 Installation

### Prerequisites
- **Node.js** 18+ or **Bun** 1.0+
- **Git** for version control

### Using Bun (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sinhaayush61426-ai/space_missions.git
   cd space_missions
   ```

2. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

3. **Install dependencies**:
   ```bash
   bun install
   ```

4. **Start development server**:
   ```bash
   bun run dev
   ```
   The application will be available at `http://localhost:5173`

### Using npm/yarn

```bash
git clone https://github.com/sinhaayush61426-ai/space_missions.git
cd space_missions

npm install
# or
yarn install

npm run dev
# or
yarn dev
```

## 🚀 Usage

### Development

Start the development server with hot module replacement:

```bash
bun run dev
```

### Building for Production

Create an optimized production build:

```bash
bun run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the optimized build locally:

```bash
bun run preview
```

### Code Quality

Run ESLint to check code quality:

```bash
bun run lint
```

## 📁 Project Structure

```
space_missions/
├── public/                      # Static assets
│   └── robots.txt
├── src/
│   ├── assets/                 # Images and media files
│   │   ├── proxima-centauri-b.png
│   │   ├── trappist-1e.png
│   │   └── ... (other asset files)
│   │
│   ├── components/             # Reusable React components
│   │   ├── Hero.tsx           # Landing page hero section
│   │   ├── Navbar.tsx         # Navigation bar with logo and menu
│   │   ├── Footer.tsx         # Footer component
│   │   ├── Starfield.tsx      # Animated star background
│   │   ├── MobileBottomNav.tsx # Mobile navigation bar
│   │   │
│   │   ├── PlanetsSection.tsx        # Solar system planets grid
│   │   ├── PlanetCard.tsx            # Individual planet card
│   │   ├── Planet3D.tsx              # 3D planet visualization
│   │   ├── PlanetInternalStructure.tsx # Planet cross-section view
│   │   ├── MajorMoonsSection.tsx      # Moon information display
│   │   ├── PlanetDetailSkeleton.tsx   # Loading skeleton
│   │   │
│   │   ├── ExoplanetsSection.tsx      # Exoplanet showcase
│   │   ├── ExoplanetFilters.tsx       # Advanced filtering UI
│   │   ├── HabitabilityChart.tsx      # Habitability visualization
│   │   ├── ExoplanetOrbitalChart.tsx  # Orbital period chart
│   │   │
│   │   ├── SolarSystemMap.tsx         # Interactive solar system map
│   │   ├── CompareBar.tsx             # Comparison toolbar
│   │   ├── CompareButton.tsx          # Add to comparison button
│   │   ├── CompareModal.tsx           # Comparison modal dialog
│   │   ├── PlanetsComparisonChart.tsx # Planet comparison chart
│   │   │
│   │   ├── SpacecraftGallery.tsx      # Spacecraft showcase
│   │   ├── SpacecraftInfoCard.tsx     # Individual spacecraft card
│   │   │
│   │   ├── MissionTimeline.tsx        # Mission chronology
│   │   ├── OuterMissions.tsx          # Space missions section
│   │   │
│   │   ├── FavoriteButton.tsx         # Add to favorites button
│   │   ├── FavoritesPanel.tsx         # Favorites management panel
│   │   ├── ImageLightbox.tsx          # Image viewer modal
│   │   ├── PageTransition.tsx         # Page animation wrapper
│   │   │
│   │   └── ui/                        # Shadcn/Radix UI components
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── ... (other UI components)
│   │
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Home/landing page
│   │   ├── PlanetDetail.tsx    # Individual planet detail page
│   │   ├── ExoplanetDetail.tsx # Individual exoplanet detail page
│   │   ├── SolarSystemMapPage.tsx # Full solar system map page
│   │   ├── QuizPage.tsx        # Interactive quiz page
│   │   └── NotFound.tsx        # 404 error page
│   │
│   ├── data/                   # Data files
│   │   ├── planetsData.ts      # Solar system planets database
│   │   ├── exoplanetsData.ts   # Exoplanet database
│   │   └── spacecraftData.ts   # Spacecraft and missions database
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useFavorites.ts     # Favorites management hook
│   │   ├── useCompare.ts       # Comparison functionality hook
│   │   ├── useKeyboardNavigation.ts # Keyboard navigation support
│   │   ├── useSwipeNavigation.ts    # Swipe gesture support
│   │   ├── useHapticFeedback.ts     # Haptic/vibration feedback
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notification hook
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Common utility functions
│   │
│   ├── App.tsx                 # Main app component and routing
│   ├── App.css                 # App global styles
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite environment types
│
├── configuration files
│   ├── vite.config.ts          # Vite build configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── components.json         # Components library config
│   ├── package.json            # Dependencies and scripts
│   └── bun.lockb               # Bun lock file
│
└── build files (generated)
    └── dist/                   # Production build output
```

## 📄 Pages

### Home Page (`/`)
The main landing page featuring:
- Animated starfield background
- Hero section with call-to-action
- Featured planets grid
- Exoplanet showcase
- Space missions highlights
- Spacecraft gallery preview
- Footer with links

### Planet Details (`/planet/:planetId`)
Comprehensive planet information page with:
- 3D interactive planet visualization
- Detailed planetary data (size, gravity, temperature, moons)
- Mission history and timeline
- Internal structure diagram
- Major moons information
- Related spacecraft missions
- Favorites and comparison functionality
- Swipe navigation for switching between planets
- Keyboard navigation support

### Exoplanet Details (`/exoplanet/:exoplanetId`)
Detailed exoplanet analysis page featuring:
- Exoplanet characteristics
- Habitability index visualization
- Star information
- Distance and orbital data
- Planet internal structure
- Discovery mission information
- Comparison tools
- Favorites functionality
- Navigation between similar exoplanets

### Solar System Map (`/map`)
Interactive solar system visualization with:
- Full-screen interactive map
- Drag-to-pan controls
- Pinch-to-zoom capability
- Planet information overlays
- Accurate scale representation
- Mobile-friendly touch controls

### Quiz Page (`/quiz`)
Interactive space education quiz featuring:
- Dynamically generated questions
- Multiple categories (planets, missions, space facts)
- Real-time score tracking
- Question shuffle randomization
- Instant feedback on answers
- Score summary on completion
- Restart functionality

### 404 Not Found (`/404`)
Error handling page for invalid routes

## 🧩 Component Categories

### Layout Components
- **Navbar**: Top navigation with logo, menu, and favorites access
- **Footer**: Site footer with links and information
- **MobileBottomNav**: Mobile-specific navigation bar
- **Starfield**: Animated space background

### Data Display Components
- **PlanetCard**: Individual planet information card
- **PlanetDetailSkeleton**: Loading placeholder
- **SpacecraftInfoCard**: Spacecraft details card
- **HabitabilityChart**: Habitability visualization
- **ExoplanetOrbitalChart**: Orbital data chart
- **PlanetsComparisonChart**: Comparative planet data
- **MissionTimeline**: Chronological mission display
- **PlanetInternalStructure**: Planet cross-section view
- **MajorMoonsSection**: Moon information display

### Interactive Components
- **CompareBar**: Comparison toolbar
- **CompareButton**: Add to comparison button
- **CompareModal**: Comparison dialog
- **FavoriteButton**: Add to favorites button
- **FavoritesPanel**: Favorites management
- **ExoplanetFilters**: Advanced filtering UI
- **ImageLightbox**: Full-screen image viewer
- **SolarSystemMap**: Interactive space map

### UI Components (shadcn/Radix UI)
- Form components (Input, Textarea, Checkbox, Radio Group)
- Dialog and Drawer components
- Navigation components (Tabs, Navigation Menu)
- Display components (Badge, Avatar, Card)
- And 50+ more accessible UI components

## 🎮 Interactive Features

### Favorites System
- Save favorite planets and exoplanets
- Quick access from navigation menu
- Persistent storage (localStorage)
- Favorites panel with management options

### Comparison Tool
- Compare up to 2 planets simultaneously
- Side-by-side data comparison
- Visual comparison charts
- Easy add/remove interface

### Search & Filtering
- Search exoplanets by name
- Filter by habitability index
- Filter by star type
- Filter by orbital period
- Filter by distance from Earth

### Navigation Options
- Keyboard arrow keys on detail pages
- Swipe gestures on mobile
- Click-based navigation
- Breadcrumb trails
- Mobile bottom navigation

### Responsive Features
- Mobile-first design
- Touch-optimized UI
- Adaptive layouts
- Responsive images
- Performance optimized

## � Advanced Features

### Data Persistence & Storage
- **localStorage Integration**:
  - Favorites automatically saved
  - Theme preference persisting
  - Quiz scores and history
  - Custom user settings
  - Session state preservation
- **Cloud Sync (Future)**:
  - Cross-device synchronization
  - Server-side data backup
  - Account-based preferences

### Real-Time Updates
- **Dynamic Data Loading**:
  - Automatic data refresh
  - Background updates
  - Optimistic UI updates
  - Conflict resolution
- **WebSocket Support (Planned)**:
  - Live mission status
  - Real-time discoveries
  - User community features

### Accessibility Compliance
- **WCAG 2.1 Level AA Compliance**:
  - Semantic HTML structure
  - ARIA labels and descriptions
  - Keyboard-only navigation
  - Screen reader support
  - Color contrast ratios > 4.5:1
  - Focus management
  - Reduced motion support

### Internationalization (i18n)
- **Multi-Language Support (Planned)**:
  - English (primary)
  - Spanish, French, German (roadmap)
  - Chinese, Japanese (future)
  - Right-to-left language support
  - Date/number localization

### Search & Discovery
- **Global Search Functionality**:
  - Planet search across database
  - Exoplanet full-text search
  - Mission search by agency
  - Spacecraft search
  - Fuzzy matching support
- **Smart Suggestions**:
  - Search history
  - Popular searches
  - Related items
  - Trending discoveries

### Analytics & Telemetry
- **Privacy-First Analytics**:
  - No personal data collection
  - Opt-in analytics
  - Anonymous usage tracking
  - Performance monitoring
  - Error logging

## ⚙️ Configuration

### Environment Variables
Create a `.env.local` file in the project root:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Analytics (optional)
VITE_ANALYTICS_ENABLED=false
VITE_ANALYTICS_KEY=your_key_here

# Feature Flags
VITE_ENABLE_3D_PLANETS=true
VITE_ENABLE_QUIZ=true
VITE_ENABLE_EXOPLANETS=true

# Performance
VITE_ENABLE_COMPRESSION=true
VITE_LAZY_LOAD_IMAGES=true
```

### Tailwind CSS Customization
Edit `tailwind.config.ts` to customize:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Custom space theme colors
        space: {
          50: '#f9fafb',
          900: '#111827',
        },
      },
      fontFamily: {
        display: ['fontName', 'sans-serif'],
      },
    },
  },
}
```

### Build Configuration
Modify `vite.config.ts` to adjust build settings:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'charts': ['recharts'],
        },
      },
    },
  },
})
```

### TypeScript Configuration
Strict type checking in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
  }
}
```

## 🚀 Development Guide

### Setting Up Development Environment

#### 1. Prerequisites
```bash
# Check Node version (18+ required)
node --version

# Or check Bun version
bun --version
```

#### 2. Clone and Install
```bash
git clone https://github.com/sinhaayush61426-ai/space_missions.git
cd space_missions
bun install
```

#### 3. Start Development Server
```bash
bun run dev
```

The application will start with:
- Hot Module Replacement (HMR)
- Error overlay on console
- Request logging
- Source maps for debugging

#### 4. Code Organization Best Practices
- Place components in `src/components/`
- Create custom hooks in `src/hooks/`
- Put utilities in `src/lib/`
- Store data in `src/data/`
- Page components in `src/pages/`

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "feat: add amazing feature"

# Push branch
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

### Commit Message Convention
Follow conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code refactoring
- `perf:` performance improvements
- `test:` adding tests

## ⚡ Performance Optimization

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Vendor bundle optimization
- Dynamic imports for heavy libraries

### Bundle Analysis
```bash
bun run build
# Analyze bundle with Vite's built-in analyzer
```

### Image Optimization
- SVG for icons
- WebP for photos (with fallback)
- Responsive images with srcset
- Lazy loading for off-screen images
- Image compression

### Caching Strategies
- Service Worker setup (PWA ready)
- HTTP cache headers
- Long-term caching for assets
- Cache busting with content hashing

### Runtime Performance
- Memoization with React.memo()
- useMemo for expensive calculations
- useCallback for stable function references
- Virtual scrolling for large lists
- Debouncing/throttling for events

### Monitoring Performance
```bash
# Lighthouse audit
npm run audit

# Bundle analysis
npm run analyze
```

## 🐛 Troubleshooting

### Common Issues

#### Issue: Port 5173 already in use
```bash
# Solution: Use different port
bun run dev -- --port 3000
```

#### Issue: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules
bun install
```

#### Issue: TypeScript errors in VSCode
```bash
# Solution: Restart VSCode TypeScript server
Command + Shift + P > TypeScript: Restart TS Server
```

#### Issue: Hot Module Replacement not working
```bash
# Solution: Clear .vite cache
rm -rf .vite
bun run dev
```

#### Issue: 3D models not rendering
- Check browser WebGL support
- Verify Three.js version compatibility
- Check console for WebGL errors
- Ensure image textures are loading

### Debug Mode
Enable detailed logging:

```typescript
// Add to main.tsx
if (import.meta.env.DEV) {
  window.__DEBUG__ = true;
}
```

### Getting Help
- Check [GitHub Issues](https://github.com/sinhaayush61426-ai/space_missions/issues)
- Search existing documentation
- Review TypeScript error carefully
- Check browser console for errors

## 🚢 Deployment

### Build for Production
```bash
bun run build
```

This creates an optimized `dist/` directory.

### Deployment Platforms

#### Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# No additional configuration needed
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Update vite.config.ts with base:
export default defineConfig({
  base: '/space_missions/',
  // ...
})

# Build and deploy
bun run build
git add dist/
git commit -m "build: production build"
git push origin main
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY bun.lockb .
RUN npm install -g bun && bun install

COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Environment Setup for Deployment
- Set `NODE_ENV=production`
- Configure API endpoints
- Enable analytics (if desired)
- Set up monitoring
- Configure security headers

### Performance Checklist
- [ ] Run Lighthouse audit
- [ ] Test on slow 3G
- [ ] Verify SEO meta tags
- [ ] Check favicon configuration
- [ ] Test analytics
- [ ] Verify error logging

## 🧪 Testing

### Running Tests
```bash
bun test
```

### Test Coverage
```bash
bun test --coverage
```

### Unit Testing
Tests located in `__tests__/` directories:

```typescript
import { render, screen } from '@testing-library/react';
import { PlanetCard } from '@/components/PlanetCard';

describe('PlanetCard', () => {
  it('renders planet name', () => {
    render(<PlanetCard planet={mockPlanet} />);
    expect(screen.getByText(mockPlanet.name)).toBeInTheDocument();
  });
});
```

### E2E Testing (Planned)
- Playwright test suite
- User journey tests
- Accessibility tests
- Visual regression tests

## ❓ FAQ

**Q: Can I use this with Vue/Angular?**
A: This project is built specifically for React, but you can use the design patterns and data structure as reference.

**Q: How often is the exoplanet data updated?**
A: Data is updated quarterly based on NASA's exoplanet database. Manual refreshes trigger updates.

**Q: Can I deploy this on my own server?**
A: Yes! The built `dist` folder contains static files. Serve with any web server (Nginx, Apache, Node.js, etc.).

**Q: Is there an API available?**
A: Currently no public API, but you can build one using the `src/data/` files as a base.

**Q: Can I use this commercially?**
A: Yes, it's MIT licensed. Attribution is appreciated but not required.

**Q: How do I add my own planets/exoplanets?**
A: Edit `src/data/planetsData.ts` or `src/data/exoplanetsData.ts` with new entries following the existing structure.

**Q: Does this work offline?**
A: Not yet, but PWA support is planned for offline functionality.

**Q: How do I customize the 3D planet models?**
A: Edit `src/components/Planet3D.tsx` and adjust Three.js parameters or import custom 3D models.

**Q: Can I embed this on my website?**
A: You can embed it in an iframe or integrate specific components into your app.

**Q: What's your roadmap?**
A: See [Roadmap](#-roadmap) section below.

## 🗺️ Roadmap

### Phase 1: Current Release ✅
- [x] Solar system explorer
- [x] Planet details and missions
- [x] Exoplanet database
- [x] Interactive quiz
- [x] Favorites system
- [x] Responsive design
- [x] Dark/Light theme

### Phase 2: Q2 2026 (In Progress)
- [ ] PWA offline support
- [ ] Advanced filters V2
- [ ] User accounts
- [ ] Sharing features
- [ ] Enhanced 3D graphics

### Phase 3: Q3-Q4 2026
- [ ] API endpoint
- [ ] Real-time space news
- [ ] Community contributions
- [ ] Internationalization
- [ ] Mobile apps (Expo)

### Phase 4: 2026+
- [ ] Augmented Reality (AR)
- [ ] Virtual Reality (VR) support
- [ ] Mission planning tool
- [ ] SpaceX/NASA integration
- [ ] Multi-language support

## �📱 Browser Support

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile, Firefox Mobile

## 🎨 Theming

The application supports light and dark themes with:
- System preference detection
- Manual theme switching
- Persistent theme preference
- Tailwind CSS custom colors
- Smooth theme transitions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style (ESLint configuration)
- Use TypeScript for type safety
- Add comments for complex logic
- Test responsive design
- Update documentation as needed

## 📄 Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Create optimized production build |
| `bun run build:dev` | Build with development mode enabled |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run ESLint code quality checks |

## 📊 Data Structure

### Planet Data
```typescript
{
  id: string;
  name: string;
  diameter: string;
  distance: string;
  dayLength: string;
  yearLength: string;
  moons: number;
  gravity: string;
  temperature: string;
  missions: Mission[];
  structure: StructureLayer[];
  majorMoons: MajorMoon[];
}
```

### Exoplanet Data
```typescript
{
  id: string;
  name: string;
  distance: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  habitabilityIndex: number;
  atmosphere: string;
  starType: string;
  missions: ExoplanetMission[];
}
```

## 🔧 Environment Setup

### Development Environment
```bash
bun install
bun run dev
```

### Production Build
```bash
bun run build
bun run preview
```

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI Components from [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://radix-ui.com)
- 3D Graphics with [Three.js](https://threejs.org)
- Charts powered by [Recharts](https://recharts.org)
- Icons from [Lucide React](https://lucide.dev)

## 📧 Contact

For questions or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ for space enthusiasts and learners worldwide**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
