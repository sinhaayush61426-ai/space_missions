export interface Mission {
  name: string;
  year: string;
  endYear?: string;
  agency: string;
  status: "completed" | "active" | "upcoming";
  type: "flyby" | "orbiter" | "lander" | "rover" | "probe" | "observatory";
  description: string;
  achievements: string[];
}

export interface StructureLayer {
  name: string;
  depth: string;
  description: string;
  color: string;
  temperature?: string;
  pressure?: string;
  composition?: string;
}

export interface MajorMoon {
  name: string;
  diameter: string;
  description: string;
  discoveredBy?: string;
  discoveredYear?: string;
  notableFeature: string;
}

export interface PlanetData {
  id: string;
  name: string;
  color: string;
  distance: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  moons: number;
  description: string;
  longDescription: string;
  facts: string[];
  missions: Mission[];
  gravity: string;
  temperature: string;
  atmosphere: string;
  type: "terrestrial" | "gas giant" | "ice giant";
  structure: StructureLayer[];
  majorMoons: MajorMoon[];
}

export const planetsData: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#8c8c8c",
    distance: "57.9 million km",
    diameter: "4,879 km",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    moons: 0,
    gravity: "3.7 m/s²",
    temperature: "-180°C to 430°C",
    atmosphere: "Virtually none (thin exosphere)",
    type: "terrestrial",
    description: "The smallest and innermost planet, Mercury has been explored by only two spacecraft due to its extreme proximity to the Sun.",
    longDescription: "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface resembles our Moon, covered with craters from impacts. Despite being closest to the Sun, it's not the hottest planet—that title belongs to Venus. Mercury has virtually no atmosphere to retain heat, causing extreme temperature swings from 430°C during the day to -180°C at night.",
    facts: [
      "Mercury has no moons or rings",
      "A year on Mercury is just 88 Earth days",
      "Mercury has a massive iron core that makes up 85% of its radius",
      "The Caloris Basin is one of the largest impact craters in the solar system"
    ],
    structure: [
      { name: "Crust", depth: "100-300 km", description: "Silicate rock crust, heavily cratered", color: "#8c8c8c", temperature: "~430°C (day) / -180°C (night)", pressure: "~0 atm", composition: "Silicates, oxygen, sodium" },
      { name: "Mantle", depth: "~600 km", description: "Thin silicate mantle layer", color: "#6b5b4f", temperature: "~1,600°C", pressure: "~24 GPa", composition: "Iron-magnesium silicates" },
      { name: "Outer Core", depth: "~1,800 km", description: "Liquid iron-sulfur outer core", color: "#d4944a", temperature: "~2,000°C", pressure: "~40 GPa", composition: "Liquid iron, sulfur" },
      { name: "Inner Core", depth: "~1,200 km radius", description: "Solid iron inner core — unusually large, 85% of planet's radius", color: "#c0c0c0", temperature: "~2,500°C", pressure: "~40+ GPa", composition: "Solid iron, nickel" },
    ],
    majorMoons: [],
    missions: [
      {
        name: "Mariner 10",
        year: "1974",
        endYear: "1975",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "First spacecraft to visit Mercury, completing three flybys and mapping 45% of the planet's surface.",
        achievements: ["First spacecraft to use gravity assist", "Discovered Mercury's magnetic field", "Mapped 45% of surface", "Confirmed extreme temperature variations"]
      },
      {
        name: "MESSENGER",
        year: "2011",
        endYear: "2015",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "First spacecraft to orbit Mercury, providing comprehensive data about the planet's surface, composition, and magnetic field.",
        achievements: ["First complete map of Mercury", "Discovered water ice in polar craters", "Detailed study of Mercury's exosphere", "Over 250,000 images captured"]
      },
      {
        name: "BepiColombo",
        year: "2018",
        endYear: "2026",
        agency: "ESA/JAXA",
        status: "active",
        type: "orbiter",
        description: "Joint European-Japanese mission with two orbiters to study Mercury's magnetosphere, surface, and interior. Orbital insertion revised to late 2026 after 6th flyby in January 2025.",
        achievements: ["Most comprehensive Mercury mission ever", "Two orbiters for simultaneous observations", "Completed 6th Mercury flyby in Jan 2025", "Expected orbital insertion late 2026"]
      }
    ]
  },
  {
    id: "venus",
    name: "Venus",
    color: "#e6c35c",
    distance: "108.2 million km",
    diameter: "12,104 km",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    moons: 0,
    gravity: "8.87 m/s²",
    temperature: "465°C (average)",
    atmosphere: "96.5% CO₂, 3.5% N₂",
    type: "terrestrial",
    description: "Earth's 'sister planet' has been extensively studied, revealing a hellish world beneath its thick clouds.",
    longDescription: "Venus is often called Earth's twin due to similar size and mass, but conditions there are drastically different. A thick atmosphere of carbon dioxide creates a runaway greenhouse effect, making Venus the hottest planet at 465°C. The surface pressure is 90 times that of Earth. Soviet Venera probes provided our only surface images, surviving mere minutes in the extreme conditions.",
    facts: [
      "Venus rotates backwards compared to other planets",
      "A day on Venus is longer than its year",
      "Surface pressure would crush a human instantly",
      "Sulfuric acid clouds blanket the entire planet"
    ],
    structure: [
      { name: "Crust", depth: "~50 km", description: "Basaltic rock crust with volcanic plains", color: "#f4d59e", temperature: "~462°C", pressure: "~92 atm (surface)", composition: "Basalt, granite" },
      { name: "Mantle", depth: "~3,000 km", description: "Rocky silicate mantle, possibly still convecting", color: "#c9874a", temperature: "~3,000°C", pressure: "~140 GPa", composition: "Iron-magnesium silicates" },
      { name: "Core", depth: "~3,000 km radius", description: "Iron-nickel core, likely liquid (no magnetic field detected)", color: "#d4944a", temperature: "~5,000°C", pressure: "~300 GPa", composition: "Iron, nickel" },
    ],
    majorMoons: [],
    missions: [
      {
        name: "Venera Program",
        year: "1961",
        endYear: "1984",
        agency: "USSR",
        status: "completed",
        type: "lander",
        description: "Series of Soviet missions including the first successful landing on another planet.",
        achievements: ["First successful Venus landing (Venera 7)", "First images from Venus surface (Venera 9)", "First color images (Venera 13)", "16 successful missions total"]
      },
      {
        name: "Magellan",
        year: "1990",
        endYear: "1994",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "Used radar to map 98% of Venus's surface through its thick cloud cover.",
        achievements: ["Mapped 98% of Venus surface with radar", "Revealed over 1,600 major volcanoes", "Discovered tectonic features", "Highest resolution Venus map to date"]
      },
      {
        name: "VERITAS",
        year: "2031",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Venus Emissivity, Radio Science, InSAR, Topography, and Spectroscopy mission to map Venus in high resolution.",
        achievements: ["Will create 3D global topography map", "Search for active volcanism", "Study surface composition", "Investigate tectonic activity"]
      },
      {
        name: "DAVINCI",
        year: "2031",
        agency: "NASA",
        status: "upcoming",
        type: "probe",
        description: "Deep Atmosphere Venus Investigation of Noble gases, Chemistry, and Imaging mission. Launch timeline shifted to early 2030s.",
        achievements: ["First US Venus atmospheric probe since 1978", "Will descend through Venus atmosphere", "High-resolution surface imaging", "Launch expected early 2030s"]
      }
    ]
  },
  {
    id: "earth",
    name: "Earth",
    color: "#4a9f5c",
    distance: "Home",
    diameter: "12,742 km",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    moons: 1,
    gravity: "9.81 m/s²",
    temperature: "15°C (average)",
    atmosphere: "78% N₂, 21% O₂, 1% Ar",
    type: "terrestrial",
    description: "Our home planet hosts thousands of satellites and space stations monitoring our world from orbit.",
    longDescription: "Earth is the only known planet with life, featuring liquid water oceans covering 71% of its surface. Our atmosphere protects us from harmful radiation and maintains habitable temperatures. Thousands of satellites orbit Earth, providing communication, navigation, weather monitoring, and scientific observations. The International Space Station serves as humanity's permanent presence in space.",
    facts: [
      "Earth is the densest planet in the solar system",
      "Our magnetic field protects us from solar wind",
      "Earth's rotation is gradually slowing",
      "Over 8,000 satellites currently orbit Earth"
    ],
    structure: [
      { name: "Crust", depth: "5-70 km", description: "Oceanic (thin basalt) and continental (thick granite) crust", color: "#4a6741", temperature: "~15°C (surface avg)", pressure: "1 atm (surface)", composition: "Silicates, aluminium, iron oxides" },
      { name: "Upper Mantle", depth: "~670 km", description: "Partially molten asthenosphere drives tectonic plates", color: "#8b5e3c", temperature: "500–900°C", pressure: "~24 GPa", composition: "Olivine, pyroxene, garnet" },
      { name: "Lower Mantle", depth: "~2,230 km", description: "Dense silicate rock under extreme pressure", color: "#a0522d", temperature: "~1,900–2,600°C", pressure: "~24–136 GPa", composition: "Bridgmanite, ferropericlase" },
      { name: "Outer Core", depth: "~2,180 km", description: "Liquid iron-nickel generating Earth's magnetic field", color: "#d4944a", temperature: "~4,400–5,000°C", pressure: "~136–330 GPa", composition: "Liquid iron, nickel, sulfur" },
      { name: "Inner Core", depth: "~1,220 km radius", description: "Solid iron-nickel ball, temperature ~5,400°C", color: "#ffd700", temperature: "~5,400°C", pressure: "~330–360 GPa", composition: "Solid iron-nickel alloy" },
    ],
    majorMoons: [
      {
        name: "Moon (Luna)",
        diameter: "3,474 km",
        description: "Earth's only natural satellite, the fifth largest moon in the solar system. It stabilizes Earth's axial tilt and causes ocean tides.",
        discoveredBy: "Known since antiquity",
        notableFeature: "Only celestial body visited by humans — 12 astronauts walked on its surface during the Apollo program (1969–1972)."
      }
    ],
    missions: [
      {
        name: "International Space Station",
        year: "1998",
        agency: "International",
        status: "active",
        type: "observatory",
        description: "Continuously crewed orbital laboratory supporting scientific research in microgravity.",
        achievements: ["Continuous human presence since 2000", "Over 3,000 scientific experiments", "Largest human-made object in orbit", "International cooperation milestone"]
      },
      {
        name: "Hubble Space Telescope",
        year: "1990",
        agency: "NASA/ESA",
        status: "active",
        type: "observatory",
        description: "Revolutionary space telescope that transformed our understanding of the universe.",
        achievements: ["Over 1.5 million observations", "Helped determine universe's age", "Discovered dark energy acceleration", "Iconic deep field images"]
      },
      {
        name: "James Webb Space Telescope",
        year: "2021",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "observatory",
        description: "Most powerful space telescope ever built, observing in infrared wavelengths.",
        achievements: ["Deepest infrared images ever taken", "Direct imaging of exoplanets", "Early universe observations", "Atmospheric analysis of exoplanets"]
      }
    ]
  },
  {
    id: "mars",
    name: "Mars",
    color: "#c1440e",
    distance: "227.9 million km",
    diameter: "6,779 km",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: 2,
    gravity: "3.72 m/s²",
    temperature: "-65°C (average)",
    atmosphere: "95.3% CO₂, 2.7% N₂",
    type: "terrestrial",
    description: "The most explored planet beyond Earth, Mars hosts active rovers and orbiters searching for signs of ancient life.",
    longDescription: "Mars, the Red Planet, has captivated humanity for centuries. Evidence suggests Mars once had liquid water and a thicker atmosphere. Today, rovers like Curiosity and Perseverance explore Gale Crater and Jezero Crater, searching for signs of ancient microbial life. Mars is the primary target for future human exploration, with multiple space agencies planning crewed missions.",
    facts: [
      "Mars has the largest volcano in the solar system: Olympus Mons",
      "Valles Marineris canyon would stretch across the United States",
      "Mars has seasons similar to Earth due to its axial tilt",
      "Dust storms can engulf the entire planet"
    ],
    structure: [
      { name: "Crust", depth: "50-125 km", description: "Iron-rich basaltic crust, thicker than Earth's", color: "#c1440e", temperature: "~-60°C (surface avg)", pressure: "~0.006 atm", composition: "Iron oxide, basalt, regolith" },
      { name: "Mantle", depth: "~1,500 km", description: "Silicate rocky mantle, likely no longer convecting", color: "#8b4513", temperature: "~1,500°C", pressure: "~23 GPa", composition: "Iron-magnesium silicates" },
      { name: "Core", depth: "~1,700 km radius", description: "Liquid iron-sulfur core — no global magnetic field today", color: "#d4944a", temperature: "~1,500–2,000°C", pressure: "~40 GPa", composition: "Iron, sulfur, nickel" },
    ],
    majorMoons: [
      {
        name: "Phobos",
        diameter: "22.4 km",
        description: "Mars's larger moon, orbiting only 6,000 km above the surface. It's slowly spiraling inward and will crash into Mars or break apart in ~50 million years.",
        discoveredBy: "Asaph Hall",
        discoveredYear: "1877",
        notableFeature: "Stickney crater spans nearly half the moon's width — one of the largest impact craters relative to body size."
      },
      {
        name: "Deimos",
        diameter: "12.4 km",
        description: "Mars's smaller, outer moon. Its smooth surface suggests it's covered in a thick layer of regolith (loose rock and dust).",
        discoveredBy: "Asaph Hall",
        discoveredYear: "1877",
        notableFeature: "Orbits Mars in just 30 hours and appears star-like from the Martian surface."
      }
    ],
    missions: [
      {
        name: "Viking Program",
        year: "1976",
        endYear: "1982",
        agency: "NASA",
        status: "completed",
        type: "lander",
        description: "First successful Mars landers, conducting experiments to search for life.",
        achievements: ["First successful Mars landing", "First surface images from Mars", "Conducted biology experiments", "Operated for 6 years"]
      },
      {
        name: "Mars Pathfinder",
        year: "1997",
        agency: "NASA",
        status: "completed",
        type: "rover",
        description: "Featured the first Mars rover, Sojourner, demonstrating mobile exploration.",
        achievements: ["First Mars rover (Sojourner)", "Airbag landing system proven", "16,500 images returned", "Chemical analysis of rocks"]
      },
      {
        name: "Spirit & Opportunity",
        year: "2004",
        endYear: "2019",
        agency: "NASA",
        status: "completed",
        type: "rover",
        description: "Twin rovers that far exceeded their 90-day missions, transforming Mars science.",
        achievements: ["Opportunity operated for 15 years", "Found evidence of ancient water", "Traveled over 45 km combined", "Thousands of rock analyses"]
      },
      {
        name: "Curiosity",
        year: "2012",
        agency: "NASA",
        status: "active",
        type: "rover",
        description: "Car-sized rover exploring Gale Crater, searching for habitable environments.",
        achievements: ["Found organic molecules on Mars", "Confirmed ancient habitable conditions", "Measured radiation levels for future missions", "Still operating after 14 years"]
      },
      {
        name: "Perseverance",
        year: "2021",
        agency: "NASA",
        status: "active",
        type: "rover",
        description: "Most advanced Mars rover, collecting samples for future return to Earth.",
        achievements: ["First powered flight on another planet (Ingenuity)", "Collecting samples for Mars Sample Return", "Produced oxygen from Martian atmosphere", "Exploring ancient river delta"]
      },
      {
        name: "Mars Sample Return",
        year: "2033",
        agency: "NASA/ESA",
        status: "upcoming",
        type: "lander",
        description: "Mission to retrieve samples collected by Perseverance and return them to Earth.",
        achievements: ["First samples returned from Mars", "Will enable detailed Earth-based analysis", "Search for biosignatures", "International cooperation mission"]
      }
    ]
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#d4a574",
    distance: "778.5 million km",
    diameter: "139,820 km",
    dayLength: "10 hours",
    yearLength: "12 Earth years",
    moons: 95,
    gravity: "24.79 m/s²",
    temperature: "-110°C (cloud tops)",
    atmosphere: "90% H₂, 10% He",
    type: "gas giant",
    description: "The gas giant and its fascinating moons have been visited by multiple spacecraft, revealing dynamic storm systems.",
    longDescription: "Jupiter is the largest planet, containing more mass than all other planets combined. Its Great Red Spot is a storm larger than Earth that has raged for centuries. Jupiter's moons are worlds in themselves—Europa likely harbors a subsurface ocean, while Io is the most volcanically active body in the solar system. Jupiter's powerful magnetic field creates intense radiation belts.",
    facts: [
      "Jupiter could fit 1,300 Earths inside it",
      "The Great Red Spot has existed for at least 400 years",
      "Jupiter has 95 known moons",
      "Europa may harbor conditions suitable for life"
    ],
    structure: [
      { name: "Cloud Layer", depth: "~50 km", description: "Ammonia ice, ammonium hydrosulfide, and water clouds in colorful bands", color: "#e8c89e", temperature: "-145°C to -110°C", pressure: "0.5–2 atm", composition: "Ammonia ice, ammonium hydrosulfide, water" },
      { name: "Hydrogen Gas", depth: "~1,000 km", description: "Molecular hydrogen atmosphere transitioning to denser layers", color: "#d4a574", temperature: "-110°C to 2,000°C", pressure: "2–200 atm", composition: "H₂, He (~10%)" },
      { name: "Liquid Hydrogen", depth: "~20,000 km", description: "Hydrogen compressed into liquid state under immense pressure", color: "#8b6914", temperature: "~2,000–5,000°C", pressure: "~200 GPa", composition: "Liquid molecular hydrogen" },
      { name: "Metallic Hydrogen", depth: "~40,000 km", description: "Hydrogen compressed into metallic state — conducts electricity, generates magnetic field", color: "#6b5b95", temperature: "~10,000°C", pressure: "~200–4,000 GPa", composition: "Metallic hydrogen (ionized)" },
      { name: "Rocky Core", depth: "~1.5 Earth masses", description: "Dense rocky/icy core, possibly diffuse rather than solid", color: "#8b4513", temperature: "~20,000°C", pressure: "~4,000+ GPa", composition: "Silicates, iron, heavy elements" },
    ],
    majorMoons: [
      {
        name: "Io",
        diameter: "3,643 km",
        description: "The most volcanically active body in the solar system, with over 400 active volcanoes. Tidal heating from Jupiter keeps its interior molten.",
        discoveredBy: "Galileo Galilei",
        discoveredYear: "1610",
        notableFeature: "Eruptions shoot sulfur plumes 500 km into space, constantly resurfacing the moon."
      },
      {
        name: "Europa",
        diameter: "3,122 km",
        description: "An ice-covered moon hiding a global saltwater ocean beneath its surface. One of the most promising places to search for extraterrestrial life.",
        discoveredBy: "Galileo Galilei",
        discoveredYear: "1610",
        notableFeature: "Subsurface ocean contains roughly 2–3× the volume of all Earth's oceans."
      },
      {
        name: "Ganymede",
        diameter: "5,268 km",
        description: "The largest moon in the solar system — bigger than Mercury. It has its own magnetic field, the only moon known to have one.",
        discoveredBy: "Galileo Galilei",
        discoveredYear: "1610",
        notableFeature: "Has a subsurface ocean sandwiched between layers of ice ~200 km below the surface."
      },
      {
        name: "Callisto",
        diameter: "4,821 km",
        description: "The most heavily cratered body in the solar system. Its ancient surface hasn't changed in billions of years.",
        discoveredBy: "Galileo Galilei",
        discoveredYear: "1610",
        notableFeature: "Valhalla crater is a stunning multi-ring impact basin spanning 3,800 km across."
      }
    ],
    missions: [
      {
        name: "Pioneer 10 & 11",
        year: "1973",
        endYear: "1974",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "First spacecraft to visit Jupiter, providing initial close-up images.",
        achievements: ["First Jupiter flyby", "Discovered radiation belts intensity", "First detailed images of Jupiter", "Measured magnetic field"]
      },
      {
        name: "Voyager 1 & 2",
        year: "1979",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Detailed Jupiter system exploration, discovering rings and volcanic activity on Io.",
        achievements: ["Discovered Jupiter's rings", "Found active volcanoes on Io", "Detailed moon observations", "Studied atmosphere dynamics"]
      },
      {
        name: "Galileo",
        year: "1995",
        endYear: "2003",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "First Jupiter orbiter, deploying an atmospheric probe and studying moons extensively.",
        achievements: ["First Jupiter orbiter", "Deployed atmospheric probe", "Evidence of Europa's subsurface ocean", "Observed comet impact"]
      },
      {
        name: "Juno",
        year: "2016",
        agency: "NASA",
        status: "active",
        type: "orbiter",
        description: "Studying Jupiter's composition, gravity field, magnetic field, and polar magnetosphere.",
        achievements: ["Deepest Jupiter atmosphere study", "Stunning polar images", "Detailed magnetic field mapping", "Extended mission to study moons"]
      },
      {
        name: "Europa Clipper",
        year: "2024",
        agency: "NASA",
        status: "active",
        type: "orbiter",
        description: "Dedicated mission to study Europa's ice shell and subsurface ocean.",
        achievements: ["Most detailed Europa study ever", "Will search for conditions for life", "49 planned Europa flybys", "Ice shell composition analysis"]
      }
    ]
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#e6b84a",
    distance: "1.4 billion km",
    diameter: "116,460 km",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    moons: 146,
    gravity: "10.44 m/s²",
    temperature: "-140°C (cloud tops)",
    atmosphere: "96% H₂, 3% He, 0.4% CH₄",
    type: "gas giant",
    description: "Known for its spectacular rings, Saturn and its moon Titan have revealed surprising complexity.",
    longDescription: "Saturn's magnificent ring system makes it the solar system's most recognizable planet. These rings are mostly water ice, ranging from tiny grains to house-sized chunks. Saturn's moon Titan has a thick atmosphere and liquid methane lakes—the only other body with stable surface liquids besides Earth. The Cassini mission revealed geysers on Enceladus, another moon with a potential subsurface ocean.",
    facts: [
      "Saturn's rings span 282,000 km but are only 10 meters thick",
      "Saturn is the least dense planet—it would float on water",
      "Titan is the only moon with a substantial atmosphere",
      "Enceladus shoots water geysers into space"
    ],
    structure: [
      { name: "Cloud Layer", depth: "~100 km", description: "Ammonia and water ice clouds forming banded patterns", color: "#f4d59e", temperature: "-180°C to -130°C", pressure: "0.5–2 atm", composition: "Ammonia ice, water ice" },
      { name: "Hydrogen Gas", depth: "~1,000 km", description: "Molecular hydrogen atmosphere", color: "#e8d4a8", temperature: "-130°C to 2,000°C", pressure: "2–100 atm", composition: "H₂, He (~3%)" },
      { name: "Liquid Hydrogen", depth: "~14,000 km", description: "Liquid molecular hydrogen ocean", color: "#c9a86c", temperature: "~2,000–5,000°C", pressure: "~100 GPa", composition: "Liquid molecular hydrogen" },
      { name: "Metallic Hydrogen", depth: "~28,000 km", description: "Metallic hydrogen layer generating Saturn's magnetic field", color: "#6b5b95", temperature: "~8,000°C", pressure: "~100–1,000 GPa", composition: "Metallic hydrogen (ionized)" },
      { name: "Rocky/Icy Core", depth: "~9-22 Earth masses", description: "Dense core of rock, ice, and metals", color: "#8b4513", temperature: "~12,000°C", pressure: "~1,000+ GPa", composition: "Silicates, iron, water ice" },
    ],
    majorMoons: [
      {
        name: "Titan",
        diameter: "5,150 km",
        description: "The only moon with a thick atmosphere (denser than Earth's). Has liquid methane and ethane lakes, rivers, and rain — a full hydrological cycle.",
        discoveredBy: "Christiaan Huygens",
        discoveredYear: "1655",
        notableFeature: "Huygens probe landed on Titan in 2005 — the most distant landing ever achieved."
      },
      {
        name: "Enceladus",
        diameter: "504 km",
        description: "A small icy moon hiding a global subsurface ocean. Spectacular geysers erupt from its south pole, spraying water ice into space.",
        discoveredBy: "William Herschel",
        discoveredYear: "1789",
        notableFeature: "Geysers contain salt water and organic molecules — key ingredients for life."
      },
      {
        name: "Rhea",
        diameter: "1,527 km",
        description: "Saturn's second-largest moon. Its icy surface is heavily cratered, suggesting a very old, geologically quiet world.",
        discoveredBy: "Giovanni Cassini",
        discoveredYear: "1672",
        notableFeature: "May have a tenuous ring system of its own — the first moon suspected to have rings."
      },
      {
        name: "Iapetus",
        diameter: "1,469 km",
        description: "A two-toned moon with one hemisphere dark as coal and the other bright as snow. A massive equatorial ridge gives it a walnut-like shape.",
        discoveredBy: "Giovanni Cassini",
        discoveredYear: "1671",
        notableFeature: "Its equatorial ridge reaches 20 km high — one of the tallest mountain ranges in the solar system."
      }
    ],
    missions: [
      {
        name: "Pioneer 11",
        year: "1979",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "First Saturn flyby, discovering new rings and moons.",
        achievements: ["First Saturn flyby", "Discovered F ring", "Measured magnetic field", "Temperature measurements"]
      },
      {
        name: "Voyager 1 & 2",
        year: "1980",
        endYear: "1981",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Detailed Saturn system exploration, revealing ring complexity and moon diversity.",
        achievements: ["Detailed ring structure analysis", "Titan atmosphere study", "Discovered new moons", "Storm observations"]
      },
      {
        name: "Cassini-Huygens",
        year: "2004",
        endYear: "2017",
        agency: "NASA/ESA",
        status: "completed",
        type: "orbiter",
        description: "13-year Saturn orbiter with Huygens probe that landed on Titan.",
        achievements: ["First Titan landing (Huygens)", "Discovered Enceladus geysers", "Revealed Titan's methane lakes", "Over 450,000 images captured"]
      },
      {
        name: "Dragonfly",
        year: "2034",
        agency: "NASA",
        status: "upcoming",
        type: "lander",
        description: "Rotorcraft lander to explore Titan's surface, hopping between locations.",
        achievements: ["First multi-rotor vehicle on another world", "Will explore multiple Titan sites", "Search for prebiotic chemistry", "Study Titan's habitability"]
      }
    ]
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#7dd3d3",
    distance: "2.9 billion km",
    diameter: "50,724 km",
    dayLength: "17 hours",
    yearLength: "84 Earth years",
    moons: 28,
    gravity: "8.87 m/s²",
    temperature: "-224°C (cloud tops)",
    atmosphere: "83% H₂, 15% He, 2% CH₄",
    type: "ice giant",
    description: "The tilted ice giant was visited only once, leaving many mysteries about this distant world.",
    longDescription: "Uranus is unique among planets, rotating on its side with an axial tilt of 98 degrees. This ice giant's blue-green color comes from methane in its atmosphere. Only Voyager 2 has visited Uranus, revealing 10 new moons and studying its unusual magnetic field. The planet remains one of the least understood in our solar system, making it a priority for future exploration.",
    facts: [
      "Uranus rotates on its side",
      "Its magnetic field is tilted 59 degrees from its axis",
      "Uranus has 13 known rings",
      "Temperatures drop to -224°C in the atmosphere"
    ],
    structure: [
      { name: "Cloud Layer", depth: "~50 km", description: "Methane ice clouds giving blue-green color", color: "#7de3f4", temperature: "-224°C to -210°C", pressure: "1–2 atm", composition: "Methane ice, hydrogen sulfide" },
      { name: "Hydrogen/Helium Atmosphere", depth: "~4,000 km", description: "Gaseous envelope of hydrogen and helium with methane", color: "#4fd1c5", temperature: "-210°C to 2,000°C", pressure: "~2–100 atm", composition: "H₂ (83%), He (15%), CH₄ (2%)" },
      { name: "Water-Ammonia-Methane Ice", depth: "~8,000 km", description: "Supercritical water, ammonia, and methane 'ices' — possibly with diamond rain", color: "#2c7a7b", temperature: "~2,000–5,000°C", pressure: "~100–800 GPa", composition: "Supercritical water, ammonia, methane" },
      { name: "Rocky/Icy Core", depth: "~1.5 Earth masses", description: "Small rocky core surrounded by compressed ices", color: "#6b5b95", temperature: "~5,000°C", pressure: "~800+ GPa", composition: "Silicates, iron, nickel" },
    ],
    majorMoons: [
      {
        name: "Titania",
        diameter: "1,578 km",
        description: "Uranus's largest moon. Its surface shows a mix of impact craters and enormous canyon systems up to 1,500 km long.",
        discoveredBy: "William Herschel",
        discoveredYear: "1787",
        notableFeature: "Messina Chasma is a massive fault canyon stretching 1,500 km across the surface."
      },
      {
        name: "Oberon",
        diameter: "1,522 km",
        description: "The outermost major moon of Uranus. Its heavily cratered surface includes a mountain that rises 11 km high.",
        discoveredBy: "William Herschel",
        discoveredYear: "1787",
        notableFeature: "Some craters show dark material on their floors, possibly from ancient cryovolcanism."
      },
      {
        name: "Miranda",
        diameter: "472 km",
        description: "The most geologically bizarre moon in the solar system. Features jagged terrain, giant canyons, and coronae that suggest it may have been shattered and reassembled.",
        discoveredBy: "Gerard Kuiper",
        discoveredYear: "1948",
        notableFeature: "Verona Rupes is a 20 km cliff — the tallest known cliff in the solar system."
      },
      {
        name: "Ariel",
        diameter: "1,158 km",
        description: "The brightest and possibly youngest-surfaced of Uranus's moons, with extensive valley systems and relatively few craters.",
        discoveredBy: "William Lassell",
        discoveredYear: "1851",
        notableFeature: "Extensive canyons and flow features suggest past cryovolcanic activity."
      }
    ],
    missions: [
      {
        name: "Voyager 2",
        year: "1986",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Only spacecraft to visit Uranus, discovering new moons and rings.",
        achievements: ["Only Uranus flyby to date", "Discovered 10 new moons", "Found 2 new rings", "Studied unusual magnetic field"]
      },
      {
        name: "Uranus Orbiter and Probe",
        year: "2040s",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Proposed flagship mission to orbit Uranus and deploy atmospheric probe.",
        achievements: ["First Uranus orbiter", "Atmospheric composition study", "Ring and moon exploration", "Interior structure investigation"]
      }
    ]
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#4169e1",
    distance: "4.5 billion km",
    diameter: "49,244 km",
    dayLength: "16 hours",
    yearLength: "165 Earth years",
    moons: 16,
    gravity: "11.15 m/s²",
    temperature: "-214°C (cloud tops)",
    atmosphere: "80% H₂, 19% He, 1.5% CH₄",
    type: "ice giant",
    description: "The outermost major planet, Neptune's stunning blue color and violent storms await further exploration.",
    longDescription: "Neptune is the windiest planet, with storms reaching 2,100 km/h. Its deep blue color comes from methane absorbing red light. Voyager 2's 1989 flyby revealed the Great Dark Spot (now dissipated) and Neptune's moon Triton, which orbits backwards and may be a captured Kuiper Belt object. Neptune's only visit came over 35 years ago, making a return mission long overdue.",
    facts: [
      "Neptune has the strongest winds in the solar system",
      "Triton is the coldest known object in the solar system",
      "Neptune was discovered through mathematics before observation",
      "Its moon Triton orbits in the opposite direction"
    ],
    structure: [
      { name: "Cloud Layer", depth: "~50 km", description: "Methane ice clouds creating deep blue appearance", color: "#6b8cce", temperature: "-218°C to -200°C", pressure: "1–3 atm", composition: "Methane ice, ethane" },
      { name: "Hydrogen/Helium Atmosphere", depth: "~3,000 km", description: "Gaseous hydrogen-helium envelope with methane traces", color: "#3d5fc4", temperature: "-200°C to 2,000°C", pressure: "~3–100 atm", composition: "H₂ (80%), He (19%), CH₄ (1%)" },
      { name: "Water-Ammonia-Methane Ice", depth: "~7,000 km", description: "Superheated 'icy' mantle — possibly raining diamonds from compressed carbon", color: "#1a3a8a", temperature: "~2,000–5,000°C", pressure: "~100–700 GPa", composition: "Supercritical water, ammonia, methane" },
      { name: "Rocky/Icy Core", depth: "~1.2 Earth masses", description: "Dense core of silicates, iron, and compressed ices", color: "#6b5b95", temperature: "~5,100°C", pressure: "~700+ GPa", composition: "Silicates, iron, nickel" },
    ],
    majorMoons: [
      {
        name: "Triton",
        diameter: "2,707 km",
        description: "Neptune's largest moon, orbiting in the opposite direction — strong evidence it's a captured Kuiper Belt object. Has active nitrogen geysers and a thin atmosphere.",
        discoveredBy: "William Lassell",
        discoveredYear: "1846",
        notableFeature: "Surface temperature of -235°C makes it the coldest known object in the solar system."
      },
      {
        name: "Proteus",
        diameter: "420 km",
        description: "An irregularly shaped moon and one of the darkest objects in the solar system, reflecting only 6% of sunlight.",
        discoveredBy: "Voyager 2",
        discoveredYear: "1989",
        notableFeature: "Nearly as large as a body can be without being pulled into a spherical shape by gravity."
      },
      {
        name: "Nereid",
        diameter: "340 km",
        description: "Has the most eccentric orbit of any known moon, ranging from 1.4 to 9.7 million km from Neptune.",
        discoveredBy: "Gerard Kuiper",
        discoveredYear: "1949",
        notableFeature: "Its wildly elliptical orbit suggests it was disturbed by Triton's capture."
      }
    ],
    missions: [
      {
        name: "Voyager 2",
        year: "1989",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Only spacecraft to visit Neptune, revealing its dynamic atmosphere and moon Triton.",
        achievements: ["Only Neptune flyby to date", "Discovered Great Dark Spot", "Found 6 new moons", "Observed Triton's geysers"]
      },
      {
        name: "Neptune Odyssey",
        year: "2040s",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Proposed mission to orbit Neptune and study Triton as a potential ocean world.",
        achievements: ["First Neptune orbiter", "Triton ocean investigation", "Atmospheric dynamics study", "Ring system exploration"]
      }
    ]
  }
];

export const getPlanetById = (id: string): PlanetData | undefined => {
  return planetsData.find(planet => planet.id === id);
};
