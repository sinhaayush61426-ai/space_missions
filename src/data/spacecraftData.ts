export interface SpacecraftSpec {
  label: string;
  value: string;
}

export interface SpacecraftData {
  id: string;
  name: string;
  image: string;
  mission: string;
  status: "active" | "completed" | "lost";
  launchDate: string;
  agency: string;
  objectives: string[];
  instruments: string[];
  specs: SpacecraftSpec[];
  achievements: string[];
  description: string;
}

export const spacecraftDatabase: Record<string, SpacecraftData[]> = {
  mercury: [
    {
      id: "messenger",
      name: "MESSENGER",
      image: "messenger-spacecraft",
      mission: "Orbiter 2011-2015",
      status: "completed",
      launchDate: "August 3, 2004",
      agency: "NASA",
      description: "MErcury Surface, Space ENvironment, GEochemistry, and Ranging mission was the first spacecraft to orbit Mercury.",
      objectives: [
        "Map Mercury's surface in color",
        "Image previously unseen areas",
        "Determine the structure of Mercury's core",
        "Investigate Mercury's magnetic field",
        "Measure the composition of the surface"
      ],
      instruments: [
        "Mercury Dual Imaging System (MDIS)",
        "Gamma-Ray and Neutron Spectrometer (GRNS)",
        "X-Ray Spectrometer (XRS)",
        "Magnetometer (MAG)",
        "Mercury Laser Altimeter (MLA)",
        "Mercury Atmospheric and Surface Composition Spectrometer (MASCS)"
      ],
      specs: [
        { label: "Mass", value: "1,107 kg" },
        { label: "Dimensions", value: "1.8 × 1.3 × 1.4 m" },
        { label: "Power", value: "450 W (solar panels)" },
        { label: "Orbits of Mercury", value: "4,105" },
        { label: "Distance Traveled", value: "7.9 billion km" }
      ],
      achievements: [
        "First spacecraft to orbit Mercury",
        "Mapped 100% of Mercury's surface",
        "Discovered water ice in polar craters",
        "Revealed Mercury's volcanic history"
      ]
    }
  ],
  venus: [
    {
      id: "venus-express",
      name: "Venus Express",
      image: "venus-express",
      mission: "Orbiter 2006-2014",
      status: "completed",
      launchDate: "November 9, 2005",
      agency: "ESA",
      description: "ESA's first mission to Venus, designed to study the planet's atmosphere and plasma environment in unprecedented detail.",
      objectives: [
        "Study Venus's atmosphere structure",
        "Investigate the greenhouse effect",
        "Analyze surface-atmosphere interactions",
        "Study the planet's plasma environment",
        "Search for volcanic activity"
      ],
      instruments: [
        "Venus Monitoring Camera (VMC)",
        "Visible and Infrared Thermal Imaging Spectrometer (VIRTIS)",
        "Planetary Fourier Spectrometer (PFS)",
        "Ultraviolet/Infrared Atmospheric Spectrometer (SPICAV)",
        "Venus Express Magnetometer (MAG)",
        "Analyzer of Space Plasma and Energetic Atoms (ASPERA)"
      ],
      specs: [
        { label: "Mass", value: "1,270 kg" },
        { label: "Dimensions", value: "1.5 × 1.8 × 1.4 m" },
        { label: "Power", value: "1,100 W" },
        { label: "Orbital Period", value: "24 hours" },
        { label: "Mission Duration", value: "8 years" }
      ],
      achievements: [
        "First detailed study of Venus's southern hemisphere",
        "Discovered the double-eye atmospheric vortex",
        "Detected lightning in Venus's clouds",
        "Mapped Venus's surface thermal emission"
      ]
    }
  ],
  mars: [
    {
      id: "curiosity",
      name: "Curiosity Rover",
      image: "curiosity-rover",
      mission: "Active since 2012",
      status: "active",
      launchDate: "November 26, 2011",
      agency: "NASA",
      description: "A car-sized Mars rover designed to explore Gale Crater as part of NASA's Mars Science Laboratory mission.",
      objectives: [
        "Investigate Mars's climate and geology",
        "Assess whether Gale Crater ever had conditions favorable for life",
        "Study the role of water on Mars",
        "Prepare for human exploration"
      ],
      instruments: [
        "Mast Camera (Mastcam)",
        "Chemistry and Camera Complex (ChemCam)",
        "Sample Analysis at Mars (SAM)",
        "Alpha Particle X-Ray Spectrometer (APXS)",
        "CheMin mineralogy instrument",
        "Radiation Assessment Detector (RAD)",
        "Dynamic Albedo of Neutrons (DAN)",
        "Mars Hand Lens Imager (MAHLI)"
      ],
      specs: [
        { label: "Mass", value: "899 kg" },
        { label: "Dimensions", value: "2.9 × 2.7 × 2.2 m" },
        { label: "Power Source", value: "RTG (110 W)" },
        { label: "Top Speed", value: "0.14 km/h" },
        { label: "Distance Traveled", value: "30+ km" }
      ],
      achievements: [
        "Found evidence of ancient riverbeds",
        "Detected organic molecules on Mars",
        "Discovered seasonal methane variations",
        "First powered drill on another planet"
      ]
    },
    {
      id: "perseverance",
      name: "Perseverance Rover",
      image: "perseverance-rover",
      mission: "Active since 2021",
      status: "active",
      launchDate: "July 30, 2020",
      agency: "NASA",
      description: "The most sophisticated rover NASA has sent to Mars, carrying the Ingenuity helicopter and collecting samples for future Earth return.",
      objectives: [
        "Seek signs of ancient microbial life",
        "Collect and cache rock samples",
        "Test oxygen production from CO2",
        "Demonstrate helicopter flight on Mars"
      ],
      instruments: [
        "Mastcam-Z (zoomable cameras)",
        "SuperCam (laser spectrometer)",
        "PIXL (X-ray lithochemistry)",
        "SHERLOC (UV Raman spectrometer)",
        "MOXIE (oxygen production)",
        "MEDA (environmental sensors)",
        "RIMFAX (ground-penetrating radar)"
      ],
      specs: [
        { label: "Mass", value: "1,025 kg" },
        { label: "Dimensions", value: "3.0 × 2.7 × 2.2 m" },
        { label: "Power Source", value: "RTG (110 W)" },
        { label: "Sample Tubes", value: "43 titanium tubes" },
        { label: "Microphones", value: "2 (first Mars audio)" }
      ],
      achievements: [
        "First powered flight on another planet (Ingenuity)",
        "Produced oxygen from Martian atmosphere",
        "Recorded first sounds from Mars",
        "Collected samples for future Earth return"
      ]
    }
  ],
  jupiter: [
    {
      id: "voyager-jupiter",
      name: "Voyager 1 & 2",
      image: "voyager-spacecraft",
      mission: "Flyby 1979",
      status: "active",
      launchDate: "1977",
      agency: "NASA",
      description: "Twin spacecraft that provided humanity's first detailed views of Jupiter and its moons before continuing to the outer solar system.",
      objectives: [
        "Study Jupiter's atmosphere",
        "Investigate the Galilean moons",
        "Analyze the magnetosphere",
        "Discover new moons and rings"
      ],
      instruments: [
        "Imaging Science System (ISS)",
        "Ultraviolet Spectrometer (UVS)",
        "Infrared Spectrometer (IRIS)",
        "Planetary Radio Astronomy (PRA)",
        "Plasma Science (PLS)",
        "Cosmic Ray System (CRS)"
      ],
      specs: [
        { label: "Mass", value: "825 kg each" },
        { label: "Power", value: "470 W at launch" },
        { label: "Antenna", value: "3.7 m dish" },
        { label: "Data Rate", value: "160 bps (current)" },
        { label: "Status", value: "In interstellar space" }
      ],
      achievements: [
        "Discovered volcanic activity on Io",
        "First images of Europa's ice shell",
        "Discovered Jupiter's ring system",
        "Now the farthest human-made objects"
      ]
    },
    {
      id: "juno",
      name: "Juno",
      image: "juno-spacecraft",
      mission: "Active since 2016",
      status: "active",
      launchDate: "August 5, 2011",
      agency: "NASA",
      description: "The first solar-powered spacecraft at Jupiter, studying the planet's composition, gravity field, magnetic field, and polar magnetosphere.",
      objectives: [
        "Determine Jupiter's water abundance",
        "Study the deep atmospheric structure",
        "Map the magnetic and gravity fields",
        "Explore the polar magnetosphere"
      ],
      instruments: [
        "JunoCam (visible light camera)",
        "Microwave Radiometer (MWR)",
        "Gravity Science experiment",
        "Magnetometer (MAG)",
        "Jovian Auroral Distributions Experiment (JADE)",
        "Ultraviolet Spectrograph (UVS)"
      ],
      specs: [
        { label: "Mass", value: "3,625 kg" },
        { label: "Solar Panels", value: "60 m² total" },
        { label: "Power at Jupiter", value: "486 W" },
        { label: "Orbital Period", value: "53 days" },
        { label: "Closest Approach", value: "4,200 km" }
      ],
      achievements: [
        "First solar-powered Jupiter orbiter",
        "Revealed Jupiter's core structure",
        "Discovered deep atmospheric storms",
        "Captured closest ever images of Jupiter"
      ]
    }
  ],
  saturn: [
    {
      id: "voyager-saturn",
      name: "Voyager 1 & 2",
      image: "voyager-spacecraft",
      mission: "Flyby 1980-81",
      status: "active",
      launchDate: "1977",
      agency: "NASA",
      description: "After Jupiter, both Voyagers flew by Saturn, with Voyager 1 making a close pass by Titan before heading out of the ecliptic.",
      objectives: [
        "Study Saturn's atmosphere and rings",
        "Investigate Titan's atmosphere",
        "Explore Saturn's other moons",
        "Analyze the magnetosphere"
      ],
      instruments: [
        "Imaging Science System (ISS)",
        "Ultraviolet Spectrometer (UVS)",
        "Infrared Spectrometer (IRIS)",
        "Photopolarimeter System (PPS)",
        "Plasma Science (PLS)"
      ],
      specs: [
        { label: "Mass", value: "825 kg each" },
        { label: "Closest to Saturn", value: "124,000 km" },
        { label: "Titan Flyby", value: "4,000 km (V1)" },
        { label: "Ring Images", value: "Thousands" }
      ],
      achievements: [
        "First detailed images of Saturn's rings",
        "Discovered ring structure complexity",
        "Revealed Titan's thick atmosphere",
        "Discovered several new moons"
      ]
    },
    {
      id: "cassini",
      name: "Cassini-Huygens",
      image: "cassini-spacecraft",
      mission: "Orbiter 2004-2017",
      status: "completed",
      launchDate: "October 15, 1997",
      agency: "NASA/ESA/ASI",
      description: "The most ambitious outer planet mission ever launched, Cassini spent 13 years studying Saturn and deployed the Huygens probe to Titan.",
      objectives: [
        "Study Saturn's atmosphere and rings",
        "Land on Titan (Huygens probe)",
        "Investigate Enceladus's geysers",
        "Study Saturn's magnetosphere"
      ],
      instruments: [
        "Imaging Science Subsystem (ISS)",
        "Visible and Infrared Mapping Spectrometer (VIMS)",
        "Composite Infrared Spectrometer (CIRS)",
        "Cassini Plasma Spectrometer (CAPS)",
        "Cosmic Dust Analyzer (CDA)",
        "Radio and Plasma Wave Science (RPWS)"
      ],
      specs: [
        { label: "Mass", value: "5,712 kg" },
        { label: "Power", value: "885 W (RTG)" },
        { label: "Saturn Orbits", value: "294" },
        { label: "Moon Flybys", value: "162" },
        { label: "Images Returned", value: "453,000+" }
      ],
      achievements: [
        "First Saturn orbiter",
        "Landed Huygens on Titan",
        "Discovered ocean beneath Enceladus",
        "Revealed seasonal changes on Titan"
      ]
    }
  ],
  uranus: [
    {
      id: "voyager-uranus",
      name: "Voyager 2",
      image: "voyager-spacecraft",
      mission: "Flyby 1986",
      status: "active",
      launchDate: "August 20, 1977",
      agency: "NASA",
      description: "The only spacecraft to have visited Uranus, Voyager 2 flew within 81,500 km of the planet's cloud tops on January 24, 1986.",
      objectives: [
        "Image Uranus and its moons",
        "Study the planet's atmosphere",
        "Analyze the ring system",
        "Investigate the magnetic field"
      ],
      instruments: [
        "Imaging Science System (ISS)",
        "Ultraviolet Spectrometer (UVS)",
        "Infrared Spectrometer (IRIS)",
        "Magnetometer (MAG)",
        "Plasma Science (PLS)"
      ],
      specs: [
        { label: "Closest Approach", value: "81,500 km" },
        { label: "Flyby Date", value: "Jan 24, 1986" },
        { label: "New Moons Found", value: "10" },
        { label: "New Rings Found", value: "2" },
        { label: "Data Collected", value: "Limited by distance" }
      ],
      achievements: [
        "Only Uranus visitor to date",
        "Discovered 10 new moons",
        "Found 2 additional rings",
        "Revealed Uranus's tilted magnetic field"
      ]
    }
  ],
  neptune: [
    {
      id: "voyager-neptune",
      name: "Voyager 2",
      image: "voyager-spacecraft",
      mission: "Flyby 1989",
      status: "active",
      launchDate: "August 20, 1977",
      agency: "NASA",
      description: "Voyager 2 remains the only spacecraft to have visited Neptune, passing within 4,951 km of the planet on August 25, 1989.",
      objectives: [
        "Image Neptune and Triton",
        "Study Neptune's atmosphere",
        "Analyze the ring system",
        "Investigate Triton's surface"
      ],
      instruments: [
        "Imaging Science System (ISS)",
        "Ultraviolet Spectrometer (UVS)",
        "Infrared Spectrometer (IRIS)",
        "Magnetometer (MAG)",
        "Photopolarimeter (PPS)"
      ],
      specs: [
        { label: "Closest Approach", value: "4,951 km" },
        { label: "Flyby Date", value: "Aug 25, 1989" },
        { label: "New Moons Found", value: "6" },
        { label: "Triton Flyby", value: "40,000 km" },
        { label: "Travel Time", value: "12 years" }
      ],
      achievements: [
        "Only Neptune visitor to date",
        "Discovered Great Dark Spot",
        "Found geysers on Triton",
        "Discovered 6 new moons"
      ]
    },
    {
      id: "new-horizons-neptune",
      name: "New Horizons",
      image: "new-horizons-spacecraft",
      mission: "Extended mission observation",
      status: "active",
      launchDate: "January 19, 2006",
      agency: "NASA",
      description: "After its Pluto flyby, New Horizons continues to study the outer solar system including distant observations of Neptune.",
      objectives: [
        "Study Kuiper Belt objects",
        "Observe outer planets from unique angles",
        "Map interplanetary dust",
        "Measure cosmic background"
      ],
      instruments: [
        "Ralph (visible/IR imager)",
        "Alice (UV spectrometer)",
        "REX (radio experiment)",
        "LORRI (long-range camera)",
        "SWAP (solar wind analyzer)",
        "PEPSSI (particle spectrometer)"
      ],
      specs: [
        { label: "Mass", value: "478 kg" },
        { label: "Power", value: "228 W (RTG)" },
        { label: "Speed", value: "16.26 km/s" },
        { label: "Pluto Flyby", value: "July 14, 2015" },
        { label: "Current Distance", value: "50+ AU" }
      ],
      achievements: [
        "First Pluto flyby",
        "Flyby of Arrokoth (2019)",
        "Most distant object explored",
        "Continues Kuiper Belt exploration"
      ]
    }
  ]
};

export const getSpacecraftByPlanet = (planetId: string): SpacecraftData[] => {
  return spacecraftDatabase[planetId] || [];
};
