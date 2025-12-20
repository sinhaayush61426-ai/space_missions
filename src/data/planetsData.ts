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
    description: "The smallest and innermost planet, Mercury has been explored by only two spacecraft due to its extreme proximity to the Sun.",
    longDescription: "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface resembles our Moon, covered with craters from impacts. Despite being closest to the Sun, it's not the hottest planet—that title belongs to Venus. Mercury has virtually no atmosphere to retain heat, causing extreme temperature swings from 430°C during the day to -180°C at night.",
    facts: [
      "Mercury has no moons or rings",
      "A year on Mercury is just 88 Earth days",
      "Mercury has a massive iron core that makes up 85% of its radius",
      "The Caloris Basin is one of the largest impact craters in the solar system"
    ],
    missions: [
      {
        name: "Mariner 10",
        year: "1974",
        endYear: "1975",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "First spacecraft to visit Mercury, completing three flybys and mapping 45% of the planet's surface.",
        achievements: [
          "First spacecraft to use gravity assist",
          "Discovered Mercury's magnetic field",
          "Mapped 45% of surface",
          "Confirmed extreme temperature variations"
        ]
      },
      {
        name: "MESSENGER",
        year: "2011",
        endYear: "2015",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "First spacecraft to orbit Mercury, providing comprehensive data about the planet's surface, composition, and magnetic field.",
        achievements: [
          "First complete map of Mercury",
          "Discovered water ice in polar craters",
          "Detailed study of Mercury's exosphere",
          "Over 250,000 images captured"
        ]
      },
      {
        name: "BepiColombo",
        year: "2018",
        endYear: "2025",
        agency: "ESA/JAXA",
        status: "active",
        type: "orbiter",
        description: "Joint European-Japanese mission with two orbiters to study Mercury's magnetosphere, surface, and interior.",
        achievements: [
          "Most comprehensive Mercury mission ever",
          "Two orbiters for simultaneous observations",
          "Will study Mercury's origin and evolution",
          "Expected orbital insertion in 2025"
        ]
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
    description: "Earth's 'sister planet' has been extensively studied, revealing a hellish world beneath its thick clouds.",
    longDescription: "Venus is often called Earth's twin due to similar size and mass, but conditions there are drastically different. A thick atmosphere of carbon dioxide creates a runaway greenhouse effect, making Venus the hottest planet at 465°C. The surface pressure is 90 times that of Earth. Soviet Venera probes provided our only surface images, surviving mere minutes in the extreme conditions.",
    facts: [
      "Venus rotates backwards compared to other planets",
      "A day on Venus is longer than its year",
      "Surface pressure would crush a human instantly",
      "Sulfuric acid clouds blanket the entire planet"
    ],
    missions: [
      {
        name: "Venera Program",
        year: "1961",
        endYear: "1984",
        agency: "USSR",
        status: "completed",
        type: "lander",
        description: "Series of Soviet missions including the first successful landing on another planet.",
        achievements: [
          "First successful Venus landing (Venera 7)",
          "First images from Venus surface (Venera 9)",
          "First color images (Venera 13)",
          "16 successful missions total"
        ]
      },
      {
        name: "Magellan",
        year: "1990",
        endYear: "1994",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "Used radar to map 98% of Venus's surface through its thick cloud cover.",
        achievements: [
          "Mapped 98% of Venus surface with radar",
          "Revealed over 1,600 major volcanoes",
          "Discovered tectonic features",
          "Highest resolution Venus map to date"
        ]
      },
      {
        name: "VERITAS",
        year: "2031",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Venus Emissivity, Radio Science, InSAR, Topography, and Spectroscopy mission to map Venus in high resolution.",
        achievements: [
          "Will create 3D global topography map",
          "Search for active volcanism",
          "Study surface composition",
          "Investigate tectonic activity"
        ]
      },
      {
        name: "DAVINCI",
        year: "2031",
        agency: "NASA",
        status: "upcoming",
        type: "probe",
        description: "Deep Atmosphere Venus Investigation of Noble gases, Chemistry, and Imaging mission.",
        achievements: [
          "First US Venus atmospheric probe since 1978",
          "Will descend through Venus atmosphere",
          "High-resolution surface imaging",
          "Study atmospheric composition"
        ]
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
    description: "Our home planet hosts thousands of satellites and space stations monitoring our world from orbit.",
    longDescription: "Earth is the only known planet with life, featuring liquid water oceans covering 71% of its surface. Our atmosphere protects us from harmful radiation and maintains habitable temperatures. Thousands of satellites orbit Earth, providing communication, navigation, weather monitoring, and scientific observations. The International Space Station serves as humanity's permanent presence in space.",
    facts: [
      "Earth is the densest planet in the solar system",
      "Our magnetic field protects us from solar wind",
      "Earth's rotation is gradually slowing",
      "Over 8,000 satellites currently orbit Earth"
    ],
    missions: [
      {
        name: "International Space Station",
        year: "1998",
        agency: "International",
        status: "active",
        type: "observatory",
        description: "Continuously crewed orbital laboratory supporting scientific research in microgravity.",
        achievements: [
          "Continuous human presence since 2000",
          "Over 3,000 scientific experiments",
          "Largest human-made object in orbit",
          "International cooperation milestone"
        ]
      },
      {
        name: "Hubble Space Telescope",
        year: "1990",
        agency: "NASA/ESA",
        status: "active",
        type: "observatory",
        description: "Revolutionary space telescope that transformed our understanding of the universe.",
        achievements: [
          "Over 1.5 million observations",
          "Helped determine universe's age",
          "Discovered dark energy acceleration",
          "Iconic deep field images"
        ]
      },
      {
        name: "James Webb Space Telescope",
        year: "2021",
        agency: "NASA/ESA/CSA",
        status: "active",
        type: "observatory",
        description: "Most powerful space telescope ever built, observing in infrared wavelengths.",
        achievements: [
          "Deepest infrared images ever taken",
          "Direct imaging of exoplanets",
          "Early universe observations",
          "Atmospheric analysis of exoplanets"
        ]
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
    description: "The most explored planet beyond Earth, Mars hosts active rovers and orbiters searching for signs of ancient life.",
    longDescription: "Mars, the Red Planet, has captivated humanity for centuries. Evidence suggests Mars once had liquid water and a thicker atmosphere. Today, rovers like Curiosity and Perseverance explore Gale Crater and Jezero Crater, searching for signs of ancient microbial life. Mars is the primary target for future human exploration, with multiple space agencies planning crewed missions.",
    facts: [
      "Mars has the largest volcano in the solar system: Olympus Mons",
      "Valles Marineris canyon would stretch across the United States",
      "Mars has seasons similar to Earth due to its axial tilt",
      "Dust storms can engulf the entire planet"
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
        achievements: [
          "First successful Mars landing",
          "First surface images from Mars",
          "Conducted biology experiments",
          "Operated for 6 years"
        ]
      },
      {
        name: "Mars Pathfinder",
        year: "1997",
        agency: "NASA",
        status: "completed",
        type: "rover",
        description: "Featured the first Mars rover, Sojourner, demonstrating mobile exploration.",
        achievements: [
          "First Mars rover (Sojourner)",
          "Airbag landing system proven",
          "16,500 images returned",
          "Chemical analysis of rocks"
        ]
      },
      {
        name: "Spirit & Opportunity",
        year: "2004",
        endYear: "2019",
        agency: "NASA",
        status: "completed",
        type: "rover",
        description: "Twin rovers that far exceeded their 90-day missions, transforming Mars science.",
        achievements: [
          "Opportunity operated for 15 years",
          "Found evidence of ancient water",
          "Traveled over 45 km combined",
          "Thousands of rock analyses"
        ]
      },
      {
        name: "Curiosity",
        year: "2012",
        agency: "NASA",
        status: "active",
        type: "rover",
        description: "Car-sized rover exploring Gale Crater, searching for habitable environments.",
        achievements: [
          "Found organic molecules on Mars",
          "Confirmed ancient habitable conditions",
          "Measured radiation levels for future missions",
          "Still operating after 12 years"
        ]
      },
      {
        name: "Perseverance",
        year: "2021",
        agency: "NASA",
        status: "active",
        type: "rover",
        description: "Most advanced Mars rover, collecting samples for future return to Earth.",
        achievements: [
          "First powered flight on another planet (Ingenuity)",
          "Collecting samples for Mars Sample Return",
          "Produced oxygen from Martian atmosphere",
          "Exploring ancient river delta"
        ]
      },
      {
        name: "Mars Sample Return",
        year: "2033",
        agency: "NASA/ESA",
        status: "upcoming",
        type: "lander",
        description: "Mission to retrieve samples collected by Perseverance and return them to Earth.",
        achievements: [
          "First samples returned from Mars",
          "Will enable detailed Earth-based analysis",
          "Search for biosignatures",
          "International cooperation mission"
        ]
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
    description: "The gas giant and its fascinating moons have been visited by multiple spacecraft, revealing dynamic storm systems.",
    longDescription: "Jupiter is the largest planet, containing more mass than all other planets combined. Its Great Red Spot is a storm larger than Earth that has raged for centuries. Jupiter's moons are worlds in themselves—Europa likely harbors a subsurface ocean, while Io is the most volcanically active body in the solar system. Jupiter's powerful magnetic field creates intense radiation belts.",
    facts: [
      "Jupiter could fit 1,300 Earths inside it",
      "The Great Red Spot has existed for at least 400 years",
      "Jupiter has 95 known moons",
      "Europa may harbor conditions suitable for life"
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
        achievements: [
          "First Jupiter flyby",
          "Discovered radiation belts intensity",
          "First detailed images of Jupiter",
          "Measured magnetic field"
        ]
      },
      {
        name: "Voyager 1 & 2",
        year: "1979",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Detailed Jupiter system exploration, discovering rings and volcanic activity on Io.",
        achievements: [
          "Discovered Jupiter's rings",
          "Found active volcanoes on Io",
          "Detailed moon observations",
          "Studied atmosphere dynamics"
        ]
      },
      {
        name: "Galileo",
        year: "1995",
        endYear: "2003",
        agency: "NASA",
        status: "completed",
        type: "orbiter",
        description: "First Jupiter orbiter, deploying an atmospheric probe and studying moons extensively.",
        achievements: [
          "First Jupiter orbiter",
          "Deployed atmospheric probe",
          "Evidence of Europa's subsurface ocean",
          "Observed comet impact"
        ]
      },
      {
        name: "Juno",
        year: "2016",
        agency: "NASA",
        status: "active",
        type: "orbiter",
        description: "Studying Jupiter's composition, gravity field, magnetic field, and polar magnetosphere.",
        achievements: [
          "Deepest Jupiter atmosphere study",
          "Stunning polar images",
          "Detailed magnetic field mapping",
          "Extended mission to study moons"
        ]
      },
      {
        name: "Europa Clipper",
        year: "2024",
        agency: "NASA",
        status: "active",
        type: "orbiter",
        description: "Dedicated mission to study Europa's ice shell and subsurface ocean.",
        achievements: [
          "Most detailed Europa study ever",
          "Will search for conditions for life",
          "49 planned Europa flybys",
          "Ice shell composition analysis"
        ]
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
    description: "Known for its spectacular rings, Saturn and its moon Titan have revealed surprising complexity.",
    longDescription: "Saturn's magnificent ring system makes it the solar system's most recognizable planet. These rings are mostly water ice, ranging from tiny grains to house-sized chunks. Saturn's moon Titan has a thick atmosphere and liquid methane lakes—the only other body with stable surface liquids besides Earth. The Cassini mission revealed geysers on Enceladus, another moon with a potential subsurface ocean.",
    facts: [
      "Saturn's rings span 282,000 km but are only 10 meters thick",
      "Saturn is the least dense planet—it would float on water",
      "Titan is the only moon with a substantial atmosphere",
      "Enceladus shoots water geysers into space"
    ],
    missions: [
      {
        name: "Pioneer 11",
        year: "1979",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "First Saturn flyby, discovering new rings and moons.",
        achievements: [
          "First Saturn flyby",
          "Discovered F ring",
          "Measured magnetic field",
          "Temperature measurements"
        ]
      },
      {
        name: "Voyager 1 & 2",
        year: "1980",
        endYear: "1981",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Detailed Saturn system exploration, revealing ring complexity and moon diversity.",
        achievements: [
          "Detailed ring structure analysis",
          "Titan atmosphere study",
          "Discovered new moons",
          "Storm observations"
        ]
      },
      {
        name: "Cassini-Huygens",
        year: "2004",
        endYear: "2017",
        agency: "NASA/ESA",
        status: "completed",
        type: "orbiter",
        description: "13-year Saturn orbiter with Huygens probe that landed on Titan.",
        achievements: [
          "First Titan landing (Huygens)",
          "Discovered Enceladus geysers",
          "Revealed Titan's methane lakes",
          "Over 450,000 images captured"
        ]
      },
      {
        name: "Dragonfly",
        year: "2034",
        agency: "NASA",
        status: "upcoming",
        type: "lander",
        description: "Rotorcraft lander to explore Titan's surface, hopping between locations.",
        achievements: [
          "First multi-rotor vehicle on another world",
          "Will explore multiple Titan sites",
          "Search for prebiotic chemistry",
          "Study Titan's habitability"
        ]
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
    description: "The tilted ice giant was visited only once, leaving many mysteries about this distant world.",
    longDescription: "Uranus is unique among planets, rotating on its side with an axial tilt of 98 degrees. This ice giant's blue-green color comes from methane in its atmosphere. Only Voyager 2 has visited Uranus, revealing 10 new moons and studying its unusual magnetic field. The planet remains one of the least understood in our solar system, making it a priority for future exploration.",
    facts: [
      "Uranus rotates on its side",
      "Its magnetic field is tilted 59 degrees from its axis",
      "Uranus has 13 known rings",
      "Temperatures drop to -224°C in the atmosphere"
    ],
    missions: [
      {
        name: "Voyager 2",
        year: "1986",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Only spacecraft to visit Uranus, discovering new moons and rings.",
        achievements: [
          "Only Uranus flyby to date",
          "Discovered 10 new moons",
          "Found 2 new rings",
          "Studied unusual magnetic field"
        ]
      },
      {
        name: "Uranus Orbiter and Probe",
        year: "2040s",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Proposed flagship mission to orbit Uranus and deploy atmospheric probe.",
        achievements: [
          "First Uranus orbiter",
          "Atmospheric composition study",
          "Ring and moon exploration",
          "Interior structure investigation"
        ]
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
    description: "The outermost major planet, Neptune's stunning blue color and violent storms await further exploration.",
    longDescription: "Neptune is the windiest planet, with storms reaching 2,100 km/h. Its deep blue color comes from methane absorbing red light. Voyager 2's 1989 flyby revealed the Great Dark Spot (now dissipated) and Neptune's moon Triton, which orbits backwards and may be a captured Kuiper Belt object. Neptune's only visit came over 35 years ago, making a return mission long overdue.",
    facts: [
      "Neptune has the strongest winds in the solar system",
      "Triton is the coldest known object in the solar system",
      "Neptune was discovered through mathematics before observation",
      "Its moon Triton orbits in the opposite direction"
    ],
    missions: [
      {
        name: "Voyager 2",
        year: "1989",
        agency: "NASA",
        status: "completed",
        type: "flyby",
        description: "Only spacecraft to visit Neptune, revealing its dynamic atmosphere and moon Triton.",
        achievements: [
          "Only Neptune flyby to date",
          "Discovered Great Dark Spot",
          "Found 6 new moons",
          "Observed Triton's geysers"
        ]
      },
      {
        name: "Neptune Odyssey",
        year: "2040s",
        agency: "NASA",
        status: "upcoming",
        type: "orbiter",
        description: "Proposed mission to orbit Neptune and study Triton as a potential ocean world.",
        achievements: [
          "First Neptune orbiter",
          "Triton ocean investigation",
          "Atmospheric dynamics study",
          "Ring system exploration"
        ]
      }
    ]
  }
];

export const getPlanetById = (id: string): PlanetData | undefined => {
  return planetsData.find(planet => planet.id === id);
};
