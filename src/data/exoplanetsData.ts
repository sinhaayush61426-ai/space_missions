export interface ExoplanetMission {
  name: string;
  year: string;
  endYear?: string;
  agency: string;
  status: "completed" | "active" | "upcoming";
  type: "space telescope" | "ground observatory" | "transit survey" | "direct imaging";
  description: string;
  achievements: string[];
}

export interface ExoplanetStructureLayer {
  name: string;
  depth: string;
  description: string;
  color: string;
  temperature?: string;
  pressure?: string;
  composition?: string;
}

export interface ExoplanetData {
  id: string;
  name: string;
  color: string;
  distance: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  moons: number | string;
  description: string;
  longDescription: string;
  facts: string[];
  missions: ExoplanetMission[];
  gravity: string;
  temperature: string;
  atmosphere: string;
  type: "rocky" | "super-earth" | "sub-neptune" | "gas giant";
  structure: ExoplanetStructureLayer[];
  hostStar: {
    name: string;
    type: string;
    distance: string;
    constellation: string;
  };
  discoveredYear: string;
  discoveryMethod: string;
  habitabilityIndex: string;
}

export const exoplanetsData: ExoplanetData[] = [
  {
    id: "proxima-centauri-b",
    name: "Proxima Centauri b",
    color: "#e07850",
    distance: "4.24 light-years",
    diameter: "~14,400 km (1.13× Earth)",
    dayLength: "Unknown (likely tidally locked)",
    yearLength: "11.2 Earth days",
    moons: "Unknown",
    gravity: "~11 m/s² (est.)",
    temperature: "-39°C (est. equilibrium)",
    atmosphere: "Unknown — possible thin atmosphere",
    type: "rocky",
    description: "The closest known exoplanet to our solar system, orbiting within the habitable zone of the red dwarf Proxima Centauri.",
    longDescription: "Proxima Centauri b is the nearest known exoplanet to Earth, orbiting the closest star to our Sun at just 4.24 light-years away. Discovered in 2016, this rocky world has a minimum mass of about 1.17 Earth masses and orbits within its star's habitable zone, where liquid water could theoretically exist on the surface. However, Proxima Centauri is an active red dwarf that produces powerful stellar flares, which may strip away any atmosphere. Whether this world is habitable remains one of astronomy's most compelling open questions.",
    facts: [
      "Closest exoplanet to Earth at 4.24 light-years",
      "Orbits in the habitable zone of Proxima Centauri",
      "Likely tidally locked — one side permanently faces its star",
      "Host star produces intense stellar flares that may erode any atmosphere",
      "A prime target for the Breakthrough Starshot initiative"
    ],
    discoveredYear: "2016",
    discoveryMethod: "Radial velocity",
    habitabilityIndex: "Moderate — in habitable zone but stellar flare risk",
    hostStar: {
      name: "Proxima Centauri",
      type: "M5.5Ve Red Dwarf",
      distance: "4.24 ly",
      constellation: "Centaurus"
    },
    structure: [
      { name: "Crust", depth: "~50-100 km (est.)", description: "Likely silicate rock crust, possibly thicker than Earth's due to tidal locking", color: "#e07850", temperature: "~-39°C (substellar), -200°C (dark side)", pressure: "Unknown", composition: "Silicates, iron oxides (est.)" },
      { name: "Mantle", depth: "~3,000 km (est.)", description: "Rocky silicate mantle, convection pattern may differ due to tidal locking", color: "#8b4513", temperature: "~2,000-3,000°C (est.)", pressure: "~100+ GPa", composition: "Iron-magnesium silicates" },
      { name: "Core", depth: "~3,500 km radius (est.)", description: "Iron-nickel core, possibly partially liquid generating a magnetic field", color: "#d4944a", temperature: "~4,000-5,000°C (est.)", pressure: "~300+ GPa", composition: "Iron, nickel" },
    ],
    missions: [
      {
        name: "ESO HARPS Survey",
        year: "2016",
        agency: "ESO",
        status: "completed",
        type: "ground observatory",
        description: "The High Accuracy Radial velocity Planet Searcher detected Proxima Centauri b through precise radial velocity measurements.",
        achievements: ["Discovered Proxima Centauri b", "Measured minimum mass of 1.17 Earth masses", "Determined 11.2-day orbital period", "Confirmed habitable zone orbit"]
      },
      {
        name: "Hubble Space Telescope",
        year: "2017",
        endYear: "2020",
        agency: "NASA/ESA",
        status: "completed",
        type: "space telescope",
        description: "Hubble observed Proxima Centauri's UV flare activity to assess habitability of Proxima b.",
        achievements: ["Detected massive UV flare events", "Assessed atmospheric erosion risk", "Measured stellar wind impact", "Contributed to habitability models"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2023",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "space telescope",
        description: "JWST has attempted thermal emission observations to characterize Proxima b's atmosphere.",
        achievements: ["Attempted atmosphere characterization", "Infrared observations of the system", "Constraining atmospheric models", "Ongoing observation campaigns"]
      }
    ]
  },
  {
    id: "trappist-1e",
    name: "TRAPPIST-1 e",
    color: "#5b9bd5",
    distance: "40.7 light-years",
    diameter: "~11,700 km (0.92× Earth)",
    dayLength: "~6.1 Earth days (tidally locked)",
    yearLength: "6.1 Earth days",
    moons: "Unknown",
    gravity: "~9.1 m/s² (est.)",
    temperature: "-27°C (est. equilibrium)",
    atmosphere: "Unknown — best candidate for atmosphere in system",
    type: "rocky",
    description: "Considered the most habitable planet in the TRAPPIST-1 system, orbiting squarely in the habitable zone of an ultra-cool dwarf star.",
    longDescription: "TRAPPIST-1 e is the fourth planet from its host star and widely regarded as the most promising candidate for habitability in the remarkable seven-planet TRAPPIST-1 system, located 40.7 light-years away in the constellation Aquarius. With a mass of 0.69 Earths and a radius of 0.92 Earths, it has a density suggesting a rocky composition with a significant iron core. Its equilibrium temperature of -27°C is comparable to Earth's, and JWST observations in 2023-2025 have been working to determine whether it retains an atmosphere.",
    facts: [
      "Located in the most promising habitable zone position of the TRAPPIST-1 system",
      "Part of a 7-planet system — the most Earth-sized planets found around one star",
      "All 7 TRAPPIST-1 planets could fit inside Mercury's orbit",
      "Likely tidally locked with a permanent day and night side",
      "JWST is actively studying its atmosphere"
    ],
    discoveredYear: "2017",
    discoveryMethod: "Transit photometry",
    habitabilityIndex: "High — strongest habitable zone candidate in the system",
    hostStar: {
      name: "TRAPPIST-1",
      type: "M8V Ultra-cool Red Dwarf",
      distance: "40.7 ly",
      constellation: "Aquarius"
    },
    structure: [
      { name: "Crust", depth: "~30-80 km (est.)", description: "Silicate crust, possibly water-rich if atmosphere is present", color: "#5b9bd5", temperature: "~-27°C (avg. est.)", pressure: "Unknown", composition: "Silicates, possible water ice" },
      { name: "Mantle", depth: "~2,500 km (est.)", description: "Rocky mantle, likely less convection than Earth due to smaller size", color: "#6b5b4f", temperature: "~1,500-2,500°C (est.)", pressure: "~80+ GPa", composition: "Iron-magnesium silicates" },
      { name: "Core", depth: "~2,800 km radius (est.)", description: "Iron core making up significant fraction of mass", color: "#c0c0c0", temperature: "~3,000-4,000°C (est.)", pressure: "~200+ GPa", composition: "Iron, nickel" },
    ],
    missions: [
      {
        name: "TRAPPIST Telescope",
        year: "2016",
        agency: "University of Liège",
        status: "completed",
        type: "ground observatory",
        description: "The TRAnsiting Planets and PlanetesImals Small Telescope discovered the first 3 planets of the system.",
        achievements: ["Discovered the TRAPPIST-1 system", "First detection of 3 planets", "Named the entire system", "Pioneered ultra-cool dwarf planet hunting"]
      },
      {
        name: "NASA Spitzer Space Telescope",
        year: "2017",
        agency: "NASA",
        status: "completed",
        type: "space telescope",
        description: "Spitzer's continuous 20-day observation confirmed all 7 planets and measured their sizes and orbits with unprecedented precision.",
        achievements: ["Confirmed all 7 TRAPPIST-1 planets", "Measured precise orbital periods", "Determined planet sizes", "Detected resonant chain orbit"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2023",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "space telescope",
        description: "JWST is conducting the most detailed atmospheric characterization of TRAPPIST-1 planets, with TRAPPIST-1 e as a priority target.",
        achievements: ["Found TRAPPIST-1 b likely has no thick atmosphere", "Ongoing observations of TRAPPIST-1 e atmosphere", "Most detailed exoplanet atmospheric survey", "Testing habitability models"]
      }
    ]
  },
  {
    id: "trappist-1f",
    name: "TRAPPIST-1 f",
    color: "#7ec8e3",
    distance: "40.7 light-years",
    diameter: "~13,200 km (1.04× Earth)",
    dayLength: "~9.2 Earth days (tidally locked)",
    yearLength: "9.2 Earth days",
    moons: "Unknown",
    gravity: "~10.1 m/s² (est.)",
    temperature: "-54°C (est. equilibrium)",
    atmosphere: "Unknown — may retain volatiles",
    type: "rocky",
    description: "An Earth-sized world at the outer edge of the TRAPPIST-1 habitable zone, potentially hosting water ice or even liquid water with greenhouse warming.",
    longDescription: "TRAPPIST-1 f is the fifth planet in the system, orbiting at the outer edge of the habitable zone. Slightly larger than Earth with 1.04 Earth radii and 0.93 Earth masses, it receives about the same amount of energy from its star as Mars receives from the Sun. If it has a greenhouse atmosphere, liquid water could exist on its surface. Its density is consistent with a rocky composition possibly enriched with water or ice, making it an intriguing candidate for habitability.",
    facts: [
      "Receives similar radiation to Mars in our solar system",
      "Density suggests possible water-rich composition",
      "Part of a near-resonant orbital chain with its sibling planets",
      "Greenhouse warming could make it habitable",
      "Slightly larger than Earth at 1.04× Earth's radius"
    ],
    discoveredYear: "2017",
    discoveryMethod: "Transit photometry",
    habitabilityIndex: "Moderate — outer habitable zone, needs greenhouse warming",
    hostStar: {
      name: "TRAPPIST-1",
      type: "M8V Ultra-cool Red Dwarf",
      distance: "40.7 ly",
      constellation: "Aquarius"
    },
    structure: [
      { name: "Ice/Water Layer", depth: "~50-200 km (est.)", description: "Possible water ice or liquid water layer on the surface or subsurface", color: "#7ec8e3", temperature: "~-54°C (surface est.)", pressure: "Unknown", composition: "Water ice, possible liquid water" },
      { name: "Silicate Mantle", depth: "~2,800 km (est.)", description: "Rocky silicate mantle similar to Earth's composition", color: "#8b6914", temperature: "~1,500-3,000°C (est.)", pressure: "~100+ GPa", composition: "Iron-magnesium silicates" },
      { name: "Iron Core", depth: "~3,000 km radius (est.)", description: "Dense metallic core, possibly partially molten", color: "#d4944a", temperature: "~3,500-4,500°C (est.)", pressure: "~250+ GPa", composition: "Iron, nickel" },
    ],
    missions: [
      {
        name: "NASA Spitzer Space Telescope",
        year: "2017",
        agency: "NASA",
        status: "completed",
        type: "space telescope",
        description: "Spitzer confirmed TRAPPIST-1 f and measured its size and orbital period precisely.",
        achievements: ["Confirmed planet's existence", "Measured 9.2-day orbit", "Determined 1.04× Earth radius", "Part of 7-planet confirmation"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2024",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "space telescope",
        description: "JWST is observing TRAPPIST-1 f for atmospheric signatures and surface conditions.",
        achievements: ["Scheduled for atmospheric observations", "Constraining surface conditions", "Testing water-world hypothesis", "Multi-epoch transit observations"]
      }
    ]
  },
  {
    id: "trappist-1g",
    name: "TRAPPIST-1 g",
    color: "#a8d8ea",
    distance: "40.7 light-years",
    diameter: "~14,500 km (1.13× Earth)",
    dayLength: "~12.4 Earth days (tidally locked)",
    yearLength: "12.4 Earth days",
    moons: "Unknown",
    gravity: "~10.7 m/s² (est.)",
    temperature: "-68°C (est. equilibrium)",
    atmosphere: "Unknown — may be too cold without thick atmosphere",
    type: "rocky",
    description: "The largest planet in the TRAPPIST-1 system, sitting just beyond the habitable zone but potentially warmed by tidal heating.",
    longDescription: "TRAPPIST-1 g is the sixth planet from its star and the largest in the system at 1.13 Earth radii with 1.15 Earth masses. It orbits just beyond the outer edge of the classical habitable zone, receiving about 26% of the energy Earth gets from the Sun. However, tidal interactions with its neighboring planets may provide additional internal heating. If it possesses a thick greenhouse atmosphere rich in CO₂ or other gases, surface temperatures could be warm enough for liquid water. It's one of the most massive Earth-sized exoplanets known.",
    facts: [
      "Largest planet in the TRAPPIST-1 system at 1.13× Earth radius",
      "Just beyond the outer habitable zone edge",
      "Tidal heating from neighboring planets may warm its interior",
      "Most massive Earth-sized planet in the system (1.15 Earth masses)",
      "A thick atmosphere could bring it into habitable conditions"
    ],
    discoveredYear: "2017",
    discoveryMethod: "Transit photometry",
    habitabilityIndex: "Low-Moderate — beyond habitable zone, needs strong greenhouse effect",
    hostStar: {
      name: "TRAPPIST-1",
      type: "M8V Ultra-cool Red Dwarf",
      distance: "40.7 ly",
      constellation: "Aquarius"
    },
    structure: [
      { name: "Frozen Surface", depth: "~10-100 km (est.)", description: "Likely frozen surface layer of water ice and CO₂ ice", color: "#a8d8ea", temperature: "~-68°C (est.)", pressure: "Unknown", composition: "Water ice, CO₂ ice, silicate regolith" },
      { name: "Silicate Mantle", depth: "~3,200 km (est.)", description: "Large rocky mantle, heated by tidal interactions", color: "#8b5e3c", temperature: "~2,000-3,500°C (est.)", pressure: "~120+ GPa", composition: "Iron-magnesium silicates" },
      { name: "Iron Core", depth: "~3,200 km radius (est.)", description: "Large iron-nickel core, possibly generating magnetic field", color: "#c0c0c0", temperature: "~4,000-5,000°C (est.)", pressure: "~300+ GPa", composition: "Iron, nickel" },
    ],
    missions: [
      {
        name: "NASA Spitzer Space Telescope",
        year: "2017",
        agency: "NASA",
        status: "completed",
        type: "space telescope",
        description: "Spitzer confirmed TRAPPIST-1 g as the sixth planet and measured its properties.",
        achievements: ["Confirmed planet's existence", "Measured 12.4-day orbit", "Determined largest radius in system", "Established mass from transit timing"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2025",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "space telescope",
        description: "JWST observations planned to assess whether TRAPPIST-1 g retains any atmosphere.",
        achievements: ["Queued for atmospheric characterization", "Will test greenhouse warming models", "Tidal heating investigation", "Comparative study with inner planets"]
      }
    ]
  },
  {
    id: "kepler-452b",
    name: "Kepler-452b",
    color: "#6aae6a",
    distance: "1,402 light-years",
    diameter: "~21,300 km (1.63× Earth)",
    dayLength: "Unknown",
    yearLength: "385 Earth days",
    moons: "Unknown",
    gravity: "~18.6 m/s² (est. ~2× Earth)",
    temperature: "~-8°C (est. equilibrium)",
    atmosphere: "Unknown — possibly thick if it exists",
    type: "super-earth",
    description: "Dubbed 'Earth's Cousin,' the first near-Earth-size planet found in the habitable zone of a Sun-like star.",
    longDescription: "Kepler-452b made headlines in 2015 as NASA's 'Earth's Cousin' — the first near-Earth-sized planet discovered in the habitable zone of a G-type star similar to our Sun. At 1.63 Earth radii, it's a super-Earth with an orbital period of 385 days, remarkably close to Earth's year. Its host star Kepler-452 is 6 billion years old (1.5 billion years older than the Sun), giving this planet significantly more time for life to potentially develop. However, at 1,402 light-years away, direct characterization remains extremely challenging with current technology.",
    facts: [
      "First near-Earth-size planet in habitable zone of a Sun-like star",
      "Orbital period of 385 days — remarkably similar to Earth's year",
      "Host star is 1.5 billion years older than our Sun",
      "Nicknamed 'Earth's Cousin' and 'Earth 2.0' by NASA",
      "Located 1,402 light-years away in constellation Cygnus"
    ],
    discoveredYear: "2015",
    discoveryMethod: "Transit photometry (Kepler)",
    habitabilityIndex: "High — habitable zone of Sun-like star, near-Earth size",
    hostStar: {
      name: "Kepler-452",
      type: "G2V Sun-like Star",
      distance: "1,402 ly",
      constellation: "Cygnus"
    },
    structure: [
      { name: "Crust", depth: "~80-200 km (est.)", description: "Likely thicker silicate crust than Earth due to larger size and stronger gravity", color: "#6aae6a", temperature: "~-8°C (est. surface)", pressure: "~2+ atm (est.)", composition: "Silicates, possibly volcanic basalt" },
      { name: "Mantle", depth: "~5,000 km (est.)", description: "Massive rocky mantle under extreme pressure, likely vigorously convecting", color: "#8b4513", temperature: "~3,000-5,000°C (est.)", pressure: "~200+ GPa", composition: "Iron-magnesium silicates, perovskite" },
      { name: "Core", depth: "~5,000 km radius (est.)", description: "Large iron-nickel core — if active, could generate a protective magnetic field", color: "#d4944a", temperature: "~6,000-8,000°C (est.)", pressure: "~600+ GPa", composition: "Iron, nickel, heavy elements" },
    ],
    missions: [
      {
        name: "Kepler Space Telescope",
        year: "2009",
        endYear: "2018",
        agency: "NASA",
        status: "completed",
        type: "space telescope",
        description: "The Kepler mission discovered Kepler-452b through transit photometry during its primary mission observing the Cygnus field.",
        achievements: ["Discovered Kepler-452b in 2015", "Measured planetary radius (1.63× Earth)", "Determined 385-day orbital period", "Confirmed habitable zone orbit"]
      },
      {
        name: "Hubble Space Telescope",
        year: "2015",
        agency: "NASA/ESA",
        status: "completed",
        type: "space telescope",
        description: "Hubble conducted follow-up observations of the Kepler-452 system to refine stellar and planetary parameters.",
        achievements: ["Refined host star properties", "Confirmed G-type stellar classification", "Estimated stellar age at 6 billion years", "Validated transit detection"]
      },
      {
        name: "PLATO Mission",
        year: "2026",
        agency: "ESA",
        status: "upcoming",
        type: "space telescope",
        description: "ESA's PLAnetary Transits and Oscillations of stars mission will characterize planets in habitable zones of Sun-like stars.",
        achievements: ["Will improve mass measurements", "Stellar seismology of host star", "Better habitability assessment", "Next-gen transit photometry"]
      }
    ]
  },
  {
    id: "toi-700d",
    name: "TOI-700 d",
    color: "#c9785d",
    distance: "101.4 light-years",
    diameter: "~13,900 km (1.09× Earth)",
    dayLength: "~37.4 Earth days (tidally locked)",
    yearLength: "37.4 Earth days",
    moons: "Unknown",
    gravity: "~10.6 m/s² (est.)",
    temperature: "~-20°C (est. equilibrium)",
    atmosphere: "Unknown — climate models suggest could retain atmosphere",
    type: "rocky",
    description: "The first Earth-sized habitable-zone planet discovered by NASA's TESS mission, relatively close at 101 light-years.",
    longDescription: "TOI-700 d was the first Earth-sized planet found in the habitable zone by NASA's Transiting Exoplanet Survey Satellite (TESS) in 2020. Located 101.4 light-years away in the constellation Dorado, it orbits a quiet M-dwarf star that is less prone to flares than many red dwarfs, improving its chances of habitability. The planet receives about 86% of the energy Earth gets from the Sun. Climate models by NASA's Goddard Institute show several scenarios where TOI-700 d could maintain surface liquid water, making it a prime target for atmospheric characterization.",
    facts: [
      "First Earth-sized habitable zone planet discovered by TESS",
      "Host star is a relatively quiet M-dwarf with few flares",
      "Receives 86% of the solar energy Earth gets",
      "Multiple climate models show potential for liquid water",
      "A sibling planet, TOI-700 e, was confirmed in the inner habitable zone in 2023"
    ],
    discoveredYear: "2020",
    discoveryMethod: "Transit photometry (TESS)",
    habitabilityIndex: "High — quiet host star, right size, habitable zone",
    hostStar: {
      name: "TOI-700",
      type: "M2V Red Dwarf (quiet)",
      distance: "101.4 ly",
      constellation: "Dorado"
    },
    structure: [
      { name: "Crust", depth: "~40-100 km (est.)", description: "Rocky silicate crust, possibly with surface water depending on atmospheric conditions", color: "#c9785d", temperature: "~-20°C (est. equilibrium)", pressure: "~0.5-2 atm (est.)", composition: "Silicates, iron oxides" },
      { name: "Mantle", depth: "~2,800 km (est.)", description: "Rocky silicate mantle, potentially still convecting", color: "#8b5e3c", temperature: "~2,000-3,000°C (est.)", pressure: "~100+ GPa", composition: "Iron-magnesium silicates" },
      { name: "Core", depth: "~3,200 km radius (est.)", description: "Iron-nickel core, size depends on iron fraction", color: "#c0c0c0", temperature: "~3,500-4,500°C (est.)", pressure: "~250+ GPa", composition: "Iron, nickel" },
    ],
    missions: [
      {
        name: "TESS (Transiting Exoplanet Survey Satellite)",
        year: "2020",
        agency: "NASA",
        status: "active",
        type: "transit survey",
        description: "TESS discovered TOI-700 d during its primary all-sky survey, detecting its transits across the host star.",
        achievements: ["First TESS Earth-sized habitable zone discovery", "Measured 37.4-day orbital period", "Detected three planets in the system", "Later found fourth planet TOI-700 e (2023)"]
      },
      {
        name: "Spitzer Space Telescope",
        year: "2020",
        agency: "NASA",
        status: "completed",
        type: "space telescope",
        description: "Spitzer confirmed TOI-700 d's size and refined its orbital parameters before the telescope was decommissioned.",
        achievements: ["Confirmed planet size (1.09× Earth)", "Refined transit depth measurements", "Validated TESS detection", "Final major discovery before retirement"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2024",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "space telescope",
        description: "JWST is targeting TOI-700 d for atmospheric characterization using transmission spectroscopy during transits.",
        achievements: ["Priority target for atmosphere detection", "Transmission spectroscopy observations", "Searching for water vapor signatures", "Testing habitability models"]
      }
    ]
  }
];

export const getExoplanetById = (id: string): ExoplanetData | undefined => {
  return exoplanetsData.find((p) => p.id === id);
};
