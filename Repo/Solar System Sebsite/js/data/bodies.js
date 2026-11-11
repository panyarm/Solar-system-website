/**
 * Complete Solar System Tour Dataset (31 Stops: Sun, 8 Planets, 2 Dwarf Planets, 20 Major Moons)
 * Physical parameters sourced from NASA Planetary Fact Sheet & JPL Horizons Ephemeris.
 */

export const BODIES = [
  {
    id: 'sun',
    name: 'The Sun',
    type: 'star',
    badge: 'G2V STAR',
    parent: null,
    parentLabel: 'SOLAR SYSTEM BARYCENTER',
    tagline: 'Yellow Dwarf Main-Sequence Star at the Heart of the Solar System',
    description:
      'Containing 99.86% of all mass in the Solar System, the Sun is a seething sphere of magnetized hydrogen and helium plasma powered by core thermonuclear fusion.',
    radiusKm: 696340,
    massText: '1.989 × 10³⁰ kg',
    gravityMs2: 274.0,
    tempText: '5,505 °C (Photosphere)',
    rotationText: '25.05 Earth days',
    orbitalPeriodText: '230 Million yrs (Galactic)',
    moonsCountText: '8 Planets · 5+ Dwarf Planets',
    semiMajorAxisText: '0.000 AU (Center)',
    axialTiltDeg: 7.25,
    rotationSpeed: 0.0018,
    sceneRadius: 9.2,
    sceneDistance: 0,
    earthDistRangeKm: [147095000, 152100000],
    palette: {
      base: '#ffae19',
      secondary: '#ff4500',
      highlight: '#fff6c2',
      atmosphere: '#ff8c00',
      pattern: 'star'
    },
    facts: [
      'Every second, the Sun fuses ~600 million metric tons of hydrogen into helium in its 15-million-°C core.',
      'Photons forged in the solar core take up to 170,000 years to radiative-diffuse to the surface, then just 8 minutes 20 seconds to reach Earth.',
      'Its magnetic field reverses polarity roughly every 11 years, driving the solar sunspot and flare cycle.'
    ]
  },

  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    badge: 'TERRESTRIAL PLANET',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Sun-Scorched Iron World of Extreme Thermal Contrasts',
    description:
      'The smallest and innermost planet in the Solar System, Mercury races around the Sun every 88 days and possesses a massive metallic core that makes up 85% of its radius.',
    radiusKm: 2439.7,
    massText: '3.301 × 10²³ kg',
    gravityMs2: 3.7,
    tempText: '-180 °C to +430 °C',
    rotationText: '58.65 Earth days',
    orbitalPeriodText: '87.97 Earth days',
    moonsCountText: '0 Moons',
    semiMajorAxisText: '0.387 AU (57.9M km)',
    axialTiltDeg: 0.03,
    rotationSpeed: 0.0012,
    sceneRadius: 1.35,
    sceneDistance: 28,
    orbitElements: {
      a: 0.38709927, e: 0.20563593, i: 7.00497902,
      L: 252.2503235, varpi: 77.45779628, node: 48.33076593,
      dA: 0.00000037, dE: 0.00001906, dI: -0.00594749,
      dL: 149472.67411175, dVarpi: 0.16047689, dNode: -0.12534081
    },
    earthDistRangeKm: [77300000, 221900000],
    palette: {
      base: '#8d8882',
      secondary: '#595550',
      highlight: '#b8b2aa',
      pattern: 'cratered'
    },
    facts: [
      'Locked in a 3:2 spin-orbit resonance: Mercury rotates exactly three times on its axis for every two orbits around the Sun.',
      'Despite intense daylight heat, permanently shadowed craters at Mercury’s poles harbor confirmed water-ice deposits.',
      'Caloris Basin, one of the largest impact craters in the Solar System, spans 1,550 km across.'
    ]
  },

  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    badge: 'TERRESTRIAL PLANET',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Super-Greenhouse World Shrouded in Sulfuric Acid Clouds',
    description:
      'Often called Earth’s twin in size and bulk composition, Venus is trapped in a runaway carbon dioxide greenhouse effect with surface pressures 92 times greater than Earth’s.',
    radiusKm: 6051.8,
    massText: '4.867 × 10²⁴ kg',
    gravityMs2: 8.87,
    tempText: '+464 °C (Mean Surface)',
    rotationText: '243.02 days (Retrograde)',
    orbitalPeriodText: '224.70 Earth days',
    moonsCountText: '0 Moons',
    semiMajorAxisText: '0.723 AU (108.2M km)',
    axialTiltDeg: 177.36,
    rotationSpeed: -0.0008,
    sceneRadius: 2.05,
    sceneDistance: 46,
    orbitElements: {
      a: 0.72333566, e: 0.00677672, i: 3.39467605,
      L: 181.9790995, varpi: 131.60246718, node: 76.67984255,
      dA: 0.0000039, dE: -0.00004107, dI: -0.0007889,
      dL: 58517.81538729, dVarpi: 0.00268329, dNode: -0.27769418
    },
    earthDistRangeKm: [38200000, 261000000],
    palette: {
      base: '#e3b878',
      secondary: '#b87d3b',
      highlight: '#fae2b8',
      atmosphere: '#f5cb86',
      pattern: 'clouds'
    },
    facts: [
      'Venus rotates backwards (retrograde) so slowly that its sidereal day (243 Earth days) is longer than its year (225 Earth days).',
      'Its dense CO₂ atmosphere makes Venus hotter than Mercury, easily hot enough to melt lead on the surface.',
      'Upper-deck clouds race around the planet in just 4 Earth days driven by 360 km/h super-rotating winds.'
    ]
  },

  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    badge: 'HOME PLANET',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Oceanic Biosphere Shielded by a Dynamic Magnetosphere',
    description:
      'Our home world is the only known astronomical body harboring life, sustained by liquid water oceans, plate tectonics, an oxygen-rich atmosphere, and a protective magnetic field.',
    radiusKm: 6371.0,
    massText: '5.972 × 10²⁴ kg',
    gravityMs2: 9.807,
    tempText: '+15 °C (Global Mean)',
    rotationText: '23h 56m 4s',
    orbitalPeriodText: '365.256 Earth days',
    moonsCountText: '1 Moon (Luna)',
    semiMajorAxisText: '1.000 AU (149.6M km)',
    axialTiltDeg: 23.44,
    rotationSpeed: 0.004,
    sceneRadius: 2.2,
    sceneDistance: 66,
    orbitElements: {
      a: 1.00000261, e: 0.01671123, i: -0.00001531,
      L: 100.46457166, varpi: 102.93768193, node: 0.0,
      dA: 0.00000562, dE: -0.00004392, dI: -0.01294668,
      dL: 35999.37244981, dVarpi: 0.32327364, dNode: 0.0
    },
    earthDistRangeKm: [0, 0],
    palette: {
      base: '#1d5fa7',
      secondary: '#2d8a4e',
      highlight: '#dff4ff',
      atmosphere: '#38bdf8',
      pattern: 'earth'
    },
    facts: [
      '71% of Earth’s surface is covered in liquid water oceans with an average depth of 3.7 kilometers.',
      'Earth’s outer liquid iron core generates a magnetosphere that deflects sterilizing solar wind particles.',
      'Orbital velocity around the Sun averages 29.78 km/s (107,200 km/h)—our reference point for all distances in this tour.'
    ]
  },

  {
    id: 'moon',
    name: 'The Moon (Luna)',
    type: 'moon',
    badge: 'EARTH SATELLITE',
    parent: 'earth',
    parentLabel: 'ORBITS EARTH',
    tagline: 'Tidally Locked Worlds-Collision Remnant Stabilizing Earth’s Climate',
    description:
      'Formed 4.5 billion years ago from debris after a Mars-sized protoplanet (Theia) struck proto-Earth, the Moon stabilizes Earth’s axial tilt and drives planetary ocean tides.',
    radiusKm: 1737.4,
    massText: '7.342 × 10²² kg',
    gravityMs2: 1.62,
    tempText: '-173 °C to +127 °C',
    rotationText: '27.32 days (Synchronous)',
    orbitalPeriodText: '27.32 Earth days',
    moonsCountText: 'Satellite of Earth',
    semiMajorAxisText: '384,400 km from Earth',
    axialTiltDeg: 6.68,
    rotationSpeed: 0.0015,
    sceneRadius: 0.62,
    localOrbitRadius: 4.6,
    localOrbitAngle: 0.8,
    localOrbitTilt: 5.14,
    localOrbitSpeed: 0.35,
    meanDistFromParentKm: 384400,
    earthDistRangeKm: [356500, 406700],
    palette: {
      base: '#a9adb4',
      secondary: '#696d75',
      highlight: '#e2e6ed',
      pattern: 'cratered'
    },
    facts: [
      'Fifth-largest natural satellite in the Solar System and the largest relative to its host planet’s size.',
      'Laser retroreflectors left by Apollo astronauts reveal the Moon is spiraling away from Earth at 3.8 cm per year.',
      'Dark lunar maria ("seas") are vast plains of ancient basaltic lava that erupted 3 to 3.5 billion years ago.'
    ]
  },

  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    badge: 'TERRESTRIAL PLANET',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'The Red Planet of Giant Shield Volcanoes and Ancient River Valleys',
    description:
      'Colored rusty red by iron-oxide dust, Mars hosts the tallest volcano and longest canyon in the Solar System, along with dry river deltas indicating a wetter ancient past.',
    radiusKm: 3389.5,
    massText: '6.417 × 10²³ kg',
    gravityMs2: 3.721,
    tempText: '-65 °C (-140 to +20 °C)',
    rotationText: '24h 37m 22s (1 Sol)',
    orbitalPeriodText: '686.98 Earth days',
    moonsCountText: '2 Moons (Phobos, Deimos)',
    semiMajorAxisText: '1.524 AU (227.9M km)',
    axialTiltDeg: 25.19,
    rotationSpeed: 0.0038,
    sceneRadius: 1.65,
    sceneDistance: 88,
    orbitElements: {
      a: 1.52371034, e: 0.0933941, i: 1.84969142,
      L: -4.55343205, varpi: -23.94362959, node: 49.55953891,
      dA: 0.00001847, dE: 0.00007882, dI: -0.00813131,
      dL: 19140.30268499, dVarpi: 0.44441088, dNode: -0.29257343
    },
    earthDistRangeKm: [54600000, 401300000],
    palette: {
      base: '#c95428',
      secondary: '#7d2b12',
      highlight: '#f09a67',
      atmosphere: '#e07b4f',
      pattern: 'mars'
    },
    facts: [
      'Olympus Mons rises 21.9 km above the Martian datum—nearly three times the height of Mount Everest.',
      'Valles Marineris stretches over 4,000 km long and up to 7 km deep, spanning a quarter of Mars’s circumference.',
      'Polar ice caps consist of permanent water ice topped by seasonal dry-ice (solid CO₂) frost.'
    ]
  },

  {
    id: 'phobos',
    name: 'Phobos',
    type: 'moon',
    badge: 'MARTIAN MOON',
    parent: 'mars',
    parentLabel: 'ORBITS MARS',
    tagline: 'Doomed Inner Moon Racing Faster Than Mars Rotates',
    description:
      'Phobos is a heavily cratered, rubble-pile body orbiting just 6,000 km above the Martian surface—closer to its primary than any other known planetary moon.',
    radiusKm: 11.27,
    massText: '1.066 × 10¹⁶ kg',
    gravityMs2: 0.0057,
    tempText: '-40 °C to -4 °C',
    rotationText: '7h 39m (Synchronous)',
    orbitalPeriodText: '7h 39m 12s',
    moonsCountText: 'Inner Satellite of Mars',
    semiMajorAxisText: '9,376 km from Mars center',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.005,
    sceneRadius: 0.34,
    localOrbitRadius: 3.1,
    localOrbitAngle: 0.4,
    localOrbitTilt: 1.09,
    localOrbitSpeed: 0.85,
    meanDistFromParentKm: 9376,
    earthDistRangeKm: [54600000, 401300000],
    palette: {
      base: '#7a6c61',
      secondary: '#473d36',
      highlight: '#a8988c',
      pattern: 'cratered'
    },
    facts: [
      'Because it orbits Mars in just 7 hours 39 minutes, Phobos rises in the Martian west and sets in the east twice each sol.',
      'Tidal deceleration is pulling Phobos inward by 1.8 meters per century; in ~50 million years it will shatter into a Martian ring.',
      'Dominated by the 9-km Stickney Crater, an impact that nearly shattered the entire moon.'
    ]
  },

  {
    id: 'deimos',
    name: 'Deimos',
    type: 'moon',
    badge: 'MARTIAN MOON',
    parent: 'mars',
    parentLabel: 'ORBITS MARS',
    tagline: 'Smooth Regolith-Blanketed Outer Moon of Mars',
    description:
      'Smaller and more distant than Phobos, Deimos is an irregular, carbonaceous C-type asteroid-like moon whose craters are partially filled with fine regolith dust.',
    radiusKm: 6.2,
    massText: '1.476 × 10¹⁵ kg',
    gravityMs2: 0.003,
    tempText: '-40 °C Mean',
    rotationText: '30h 18m (Synchronous)',
    orbitalPeriodText: '30.31 Hours',
    moonsCountText: 'Outer Satellite of Mars',
    semiMajorAxisText: '23,463 km from Mars center',
    axialTiltDeg: 0.9,
    rotationSpeed: 0.003,
    sceneRadius: 0.28,
    localOrbitRadius: 4.5,
    localOrbitAngle: 2.35,
    localOrbitTilt: 1.79,
    localOrbitSpeed: 0.5,
    meanDistFromParentKm: 23463,
    earthDistRangeKm: [54600000, 401300000],
    palette: {
      base: '#8c7e70',
      secondary: '#594e45',
      highlight: '#bfb0a0',
      pattern: 'cratered'
    },
    facts: [
      'Escape velocity on Deimos is only 5.6 m/s (20 km/h)—an astronaut could jump off into Martian orbit with a brisk sprint.',
      'Unlike Phobos, Deimos orbits outside synchronous altitude and is slowly drifting away from Mars.',
      'Named after the Greek mythological twin personification of dread.'
    ]
  },

  {
    id: 'ceres',
    name: 'Ceres',
    type: 'dwarf',
    badge: 'DWARF PLANET',
    parent: 'sun',
    parentLabel: 'MAIN ASTEROID BELT',
    tagline: 'Cryovolcanic Brine-Rich Monarch of the Main Asteroid Belt',
    description:
      'Orbits between Mars and Jupiter as the only dwarf planet in the inner Solar System, containing nearly one-third of the entire Asteroid Belt’s mass.',
    radiusKm: 469.7,
    massText: '9.384 × 10²⁰ kg',
    gravityMs2: 0.28,
    tempText: '-105 °C Mean',
    rotationText: '9h 4m',
    orbitalPeriodText: '4.60 Earth years',
    moonsCountText: '0 Moons',
    semiMajorAxisText: '2.769 AU (414.2M km)',
    axialTiltDeg: 4.0,
    rotationSpeed: 0.0052,
    sceneRadius: 1.05,
    sceneDistance: 112,
    orbitElements: {
      a: 2.7675, e: 0.0758, i: 10.593,
      L: 95.989, varpi: 154.1, node: 80.305,
      dA: 0.0, dE: 0.0, dI: 0.0,
      dL: 7820.4, dVarpi: 0.0, dNode: 0.0
    },
    earthDistRangeKm: [263000000, 565000000],
    palette: {
      base: '#7c7b78',
      secondary: '#4f4e4c',
      highlight: '#e6f2ff',
      pattern: 'cratered'
    },
    facts: [
      'NASA’s Dawn spacecraft discovered bright carbonate salt deposits (faculae) inside Occator Crater fed by subsurface brine reservoirs.',
      'Ahuna Mons is a 4-km-tall cryovolcano formed by erupting slushy salt-water magma rather than silicate lava.',
      'First discovered on January 1, 1801 by Giuseppe Piazzi at Palermo Astronomical Observatory.'
    ]
  },

  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    badge: 'GAS GIANT',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Colossal King of Planets with 2.5× the Mass of All Others Combined',
    description:
      'A colossal hydrogen-helium gas giant banded by ammonia jet streams, roaring auroras, a vast liquid metallic hydrogen dynamo, and a miniature planetary system of 95 moons.',
    radiusKm: 69911,
    massText: '1.898 × 10²⁷ kg',
    gravityMs2: 24.79,
    tempText: '-110 °C (Cloud Tops)',
    rotationText: '9h 55m 30s',
    orbitalPeriodText: '11.86 Earth years',
    moonsCountText: '95 Confirmed Moons',
    semiMajorAxisText: '5.204 AU (778.5M km)',
    axialTiltDeg: 3.13,
    rotationSpeed: 0.0075,
    sceneRadius: 4.8,
    sceneDistance: 145,
    orbitElements: {
      a: 5.202887, e: 0.04838624, i: 1.30439695,
      L: 34.39644051, varpi: 14.72847983, node: 100.47390909,
      dA: -0.00011607, dE: -0.00013253, dI: -0.00183714,
      dL: 3034.74612775, dVarpi: 0.21252668, dNode: 0.20469106
    },
    earthDistRangeKm: [588500000, 968100000],
    palette: {
      base: '#d8a574',
      secondary: '#9e5834',
      highlight: '#f5e2c8',
      atmosphere: '#e3b486',
      pattern: 'jupiter'
    },
    facts: [
      'Rotating in under 10 hours, Jupiter has the shortest day of any planet, causing a 6.5% equatorial bulge.',
      'The Great Red Spot is a high-pressure anticyclonic storm larger than Earth that has raged for over 300 years.',
      'Deep inside, immense pressures compress hydrogen into an electrically conducting liquid metal, generating the strongest planetary magnetosphere.'
    ]
  },

  {
    id: 'io',
    name: 'Io',
    type: 'moon',
    badge: 'GALILEAN MOON',
    parent: 'jupiter',
    parentLabel: 'ORBITS JUPITER',
    tagline: 'Most Volcanically Active World in the Solar System',
    description:
      'Kneaded relentlessly by tidal Laplace resonance between Jupiter, Europa, and Ganymede, Io erupts with over 400 active sulfur and silicate volcanoes.',
    radiusKm: 1821.6,
    massText: '8.932 × 10²² kg',
    gravityMs2: 1.796,
    tempText: '-143 °C (Lavas > 1,300 °C)',
    rotationText: '1.77 days (Synchronous)',
    orbitalPeriodText: '1.769 Earth days',
    moonsCountText: 'Innermost Galilean Moon',
    semiMajorAxisText: '421,700 km from Jupiter',
    axialTiltDeg: 0.04,
    rotationSpeed: 0.004,
    sceneRadius: 0.68,
    localOrbitRadius: 7.2,
    localOrbitAngle: 0.3,
    localOrbitTilt: 0.05,
    localOrbitSpeed: 0.7,
    meanDistFromParentKm: 421700,
    earthDistRangeKm: [588500000, 968100000],
    palette: {
      base: '#e8c539',
      secondary: '#b84214',
      highlight: '#fff380',
      pattern: 'volcanic'
    },
    facts: [
      'Volcanic plumes such as Pele and Tvashtar blast sulfur dioxide umbrella clouds up to 500 km into space.',
      'Tidal flexing raises and lowers Io’s solid rock crust by up to 100 meters every 42-hour orbit.',
      'Io’s volcanic gases feed a giant plasma torus of ionized sulfur and oxygen around Jupiter.'
    ]
  },

  {
    id: 'europa',
    name: 'Europa',
    type: 'moon',
    badge: 'GALILEAN MOON',
    parent: 'jupiter',
    parentLabel: 'ORBITS JUPITER',
    tagline: 'Fractured Ice Shell Concealing a Global Subsurface Saltwater Ocean',
    description:
      'Cross-hatched by reddish-brown linea fractures, Europa’s smooth water-ice crust floats atop a global liquid ocean holding twice the water volume of all Earth’s oceans.',
    radiusKm: 1560.8,
    massText: '4.800 × 10²² kg',
    gravityMs2: 1.315,
    tempText: '-160 °C to -220 °C',
    rotationText: '3.55 days (Synchronous)',
    orbitalPeriodText: '3.551 Earth days',
    moonsCountText: '2nd Galilean Moon',
    semiMajorAxisText: '671,100 km from Jupiter',
    axialTiltDeg: 0.1,
    rotationSpeed: 0.0035,
    sceneRadius: 0.62,
    localOrbitRadius: 9.2,
    localOrbitAngle: 1.7,
    localOrbitTilt: 0.47,
    localOrbitSpeed: 0.52,
    meanDistFromParentKm: 671100,
    earthDistRangeKm: [588500000, 968100000],
    palette: {
      base: '#d9d2c5',
      secondary: '#945e44',
      highlight: '#f5f8fc',
      pattern: 'icy_cracks'
    },
    facts: [
      'One of the highest-priority astrobiology targets in the Solar System, currently targeted by NASA’s Europa Clipper and ESA’s JUICE.',
      'Its icy shell is 15–25 km thick, shielding a 60–150 km deep saltwater ocean in direct contact with a rocky seafloor.',
      'Very few impact craters exist, proving its surface is geologically young (20 to 180 million years old).'
    ]
  },

  {
    id: 'ganymede',
    name: 'Ganymede',
    type: 'moon',
    badge: 'GALILEAN MOON',
    parent: 'jupiter',
    parentLabel: 'ORBITS JUPITER',
    tagline: 'Largest Moon in the Solar System & Only Satellite with an Intrinsic Magnetosphere',
    description:
      'Larger in diameter than the planet Mercury, Ganymede is a fully differentiated world with a molten iron core, silicate mantle, and layered ice-ocean interior.',
    radiusKm: 2634.1,
    massText: '1.482 × 10²³ kg',
    gravityMs2: 1.428,
    tempText: '-163 °C Mean',
    rotationText: '7.15 days (Synchronous)',
    orbitalPeriodText: '7.155 Earth days',
    moonsCountText: '3rd Galilean Moon',
    semiMajorAxisText: '1,070,400 km from Jupiter',
    axialTiltDeg: 0.2,
    rotationSpeed: 0.0028,
    sceneRadius: 0.82,
    localOrbitRadius: 11.4,
    localOrbitAngle: 3.3,
    localOrbitTilt: 0.2,
    localOrbitSpeed: 0.38,
    meanDistFromParentKm: 1070400,
    earthDistRangeKm: [588500000, 968100000],
    palette: {
      base: '#8d8277',
      secondary: '#524940',
      highlight: '#cfc7be',
      pattern: 'cratered'
    },
    facts: [
      'At 5,268 km across, Ganymede is 8% wider than the planet Mercury, though less than half as massive.',
      'Hubble observations of Ganymede’s auroral ovals confirm a vast subsurface saltwater ocean 150 km below the crust.',
      'It is the only moon in the Solar System known to generate its own internal dipole magnetic field.'
    ]
  },

  {
    id: 'callisto',
    name: 'Callisto',
    type: 'moon',
    badge: 'GALILEAN MOON',
    parent: 'jupiter',
    parentLabel: 'ORBITS JUPITER',
    tagline: 'Ancient Multi-Ring Impact Basin World at the Edge of the Galilean System',
    description:
      'Orbiting beyond Jupiter’s main radiation belt, Callisto boasts the oldest, most heavily cratered surface in the Solar System, virtually unchanged for 4 billion years.',
    radiusKm: 2410.3,
    massText: '1.076 × 10²³ kg',
    gravityMs2: 1.235,
    tempText: '-139 °C Mean',
    rotationText: '16.69 days (Synchronous)',
    orbitalPeriodText: '16.689 Earth days',
    moonsCountText: 'Outermost Galilean Moon',
    semiMajorAxisText: '1,882,700 km from Jupiter',
    axialTiltDeg: 0.4,
    rotationSpeed: 0.002,
    sceneRadius: 0.76,
    localOrbitRadius: 13.8,
    localOrbitAngle: 4.9,
    localOrbitTilt: 0.19,
    localOrbitSpeed: 0.25,
    meanDistFromParentKm: 1882700,
    earthDistRangeKm: [588500000, 968100000],
    palette: {
      base: '#645c53',
      secondary: '#3b352f',
      highlight: '#b5ada2',
      pattern: 'cratered'
    },
    facts: [
      'Valhalla is a colossal multi-ring impact basin with concentric ripples extending 3,800 km across.',
      'Because Callisto lies outside Jupiter’s harsh radiation belts, it is considered a prime candidate for future human outer-planet bases.',
      'Magnetic induction measurements suggest a salty liquid layer may still exist 100–200 km beneath its ancient crust.'
    ]
  },

  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    badge: 'RINGED GAS GIANT',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Jewel of the Solar System Adorned with a 282,000-km Ice Ring System',
    description:
      'Famous for its dazzling ring system of 99.9% pure water ice, Saturn is an oblate hydrogen-helium giant with a mean density lower than liquid water and 146 confirmed moons.',
    radiusKm: 58232,
    massText: '5.683 × 10²⁶ kg',
    gravityMs2: 10.44,
    tempText: '-140 °C (Cloud Tops)',
    rotationText: '10h 33m 38s',
    orbitalPeriodText: '29.45 Earth years',
    moonsCountText: '146 Confirmed Moons',
    semiMajorAxisText: '9.582 AU (1.43B km)',
    axialTiltDeg: 26.73,
    rotationSpeed: 0.0068,
    sceneRadius: 4.1,
    sceneDistance: 205,
    rings: {
      innerRadius: 5.2,
      outerRadius: 9.8,
      color: '#e5d0ab'
    },
    orbitElements: {
      a: 9.53667594, e: 0.05386179, i: 2.48599187,
      L: 49.95424423, varpi: 92.59887831, node: 113.66242448,
      dA: -0.0012506, dE: -0.00050991, dI: 0.00193609,
      dL: 1222.49362201, dVarpi: -0.41897216, dNode: -0.28867794
    },
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#e5c993',
      secondary: '#b8965c',
      highlight: '#fbf0d9',
      atmosphere: '#ebd3a4',
      pattern: 'saturn'
    },
    facts: [
      'Saturn’s main rings span 282,000 km across (73% of the Earth-Moon distance) yet average only 10 to 30 meters thick.',
      'A persistent 30,000-km-wide hexagonal jet stream swirls around Saturn’s north pole.',
      'With a mean density of 0.687 g/cm³, Saturn is the only planet less dense than water.'
    ]
  },

  {
    id: 'mimas',
    name: 'Mimas',
    type: 'moon',
    badge: 'SATURNIAN MOON',
    parent: 'saturn',
    parentLabel: 'ORBITS SATURN',
    tagline: 'Smallest Astronomically Round Body Scarred by Giant Herschel Crater',
    description:
      'Orbiting between Saturn’s rings and Enceladus, Mimas bears the 130-km Herschel impact basin—one-third of its entire diameter—giving it an unmistakable Death Star silhouette.',
    radiusKm: 198.2,
    massText: '3.749 × 10¹⁹ kg',
    gravityMs2: 0.064,
    tempText: '-209 °C Mean',
    rotationText: '22h 36m (Synchronous)',
    orbitalPeriodText: '0.942 Earth days',
    moonsCountText: 'Inner Major Moon of Saturn',
    semiMajorAxisText: '185,539 km from Saturn',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.004,
    sceneRadius: 0.38,
    localOrbitRadius: 11.2,
    localOrbitAngle: 0.5,
    localOrbitTilt: 1.57,
    localOrbitSpeed: 0.65,
    meanDistFromParentKm: 185539,
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#bfc4cc',
      secondary: '#7b808a',
      highlight: '#ebeff5',
      pattern: 'cratered'
    },
    facts: [
      'Mimas clears the 4,800-km-wide Cassini Division in Saturn’s rings via a 2:1 orbital resonance.',
      'Recent 2024 Cassini librational analyses suggest Mimas harbors a young subsurface ocean formed within the last 25 million years.',
      'Central peak of Herschel Crater rises 6 km above the crater floor.'
    ]
  },

  {
    id: 'enceladus',
    name: 'Enceladus',
    type: 'moon',
    badge: 'SATURNIAN MOON',
    parent: 'saturn',
    parentLabel: 'ORBITS SATURN',
    tagline: 'Hyper-Reflective Ice World Venting Hydrothermal Plumes into Space',
    description:
      'Coated in fresh snow white ice, Enceladus sprays supersonic geysers of water vapor, molecular hydrogen, and organic compounds from warm "Tiger Stripe" fractures at its south pole.',
    radiusKm: 252.1,
    massText: '1.080 × 10²⁰ kg',
    gravityMs2: 0.113,
    tempText: '-198 °C (-75 °C at Tiger Stripes)',
    rotationText: '1.37 days (Synchronous)',
    orbitalPeriodText: '1.370 Earth days',
    moonsCountText: 'Cryovolcanic Moon of Saturn',
    semiMajorAxisText: '238,020 km from Saturn',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0036,
    sceneRadius: 0.44,
    localOrbitRadius: 12.6,
    localOrbitAngle: 1.85,
    localOrbitTilt: 0.02,
    localOrbitSpeed: 0.52,
    meanDistFromParentKm: 238020,
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#eef6ff',
      secondary: '#82b6e8',
      highlight: '#ffffff',
      pattern: 'icy_cracks'
    },
    facts: [
      'Reflects over 80% of incident sunlight (Bond albedo 0.81), making it the most reflective body in the Solar System.',
      'Cassini flew directly through its plumes and detected water, salts, silica nanograins, methane, and phosphates—all key ingredients for life.',
      'Its south polar geysers continuously replenish Saturn’s diffuse E Ring.'
    ]
  },

  {
    id: 'rhea',
    name: 'Rhea',
    type: 'moon',
    badge: 'SATURNIAN MOON',
    parent: 'saturn',
    parentLabel: 'ORBITS SATURN',
    tagline: 'Saturn’s Second-Largest Moon Carved by Bright Ice Chasms',
    description:
      'An ancient, low-density icy body composed of 75% water ice and 25% silicate rock, featuring bright wispy tectonic fracture cliffs across its trailing hemisphere.',
    radiusKm: 763.8,
    massText: '2.307 × 10²¹ kg',
    gravityMs2: 0.264,
    tempText: '-174 °C to -220 °C',
    rotationText: '4.52 days (Synchronous)',
    orbitalPeriodText: '4.518 Earth days',
    moonsCountText: '2nd Largest Moon of Saturn',
    semiMajorAxisText: '527,108 km from Saturn',
    axialTiltDeg: 0.35,
    rotationSpeed: 0.0028,
    sceneRadius: 0.52,
    localOrbitRadius: 14.2,
    localOrbitAngle: 3.1,
    localOrbitTilt: 0.35,
    localOrbitSpeed: 0.4,
    meanDistFromParentKm: 527108,
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#b6b9bf',
      secondary: '#72767d',
      highlight: '#e8ecf2',
      pattern: 'cratered'
    },
    facts: [
      'Possesses an ultra-tenuous exosphere of oxygen and carbon dioxide liberated by magnetospheric radiolysis of surface water ice.',
      'Bright "wispy terrain" streaks are steep ice cliffs hundreds of kilometers long formed by ancient tectonic extension.',
      'Discovered by Giovanni Domenico Cassini in 1672.'
    ]
  },

  {
    id: 'titan',
    name: 'Titan',
    type: 'moon',
    badge: 'SATURNIAN MOON',
    parent: 'saturn',
    parentLabel: 'ORBITS SATURN',
    tagline: 'Orange Smog-Shrouded World of Liquid Methane Lakes, Rivers & Rain',
    description:
      'Larger than Mercury, Titan is the only moon in the Solar System with a dense nitrogen atmosphere and the only world besides Earth with stable liquid seas on its surface.',
    radiusKm: 2574.7,
    massText: '1.345 × 10²³ kg',
    gravityMs2: 1.352,
    tempText: '-179.5 °C (93.7 K)',
    rotationText: '15.95 days (Synchronous)',
    orbitalPeriodText: '15.945 Earth days',
    moonsCountText: 'Largest Moon of Saturn',
    semiMajorAxisText: '1,221,870 km from Saturn',
    axialTiltDeg: 0.3,
    rotationSpeed: 0.0022,
    sceneRadius: 0.8,
    localOrbitRadius: 16.0,
    localOrbitAngle: 4.4,
    localOrbitTilt: 0.33,
    localOrbitSpeed: 0.3,
    meanDistFromParentKm: 1221870,
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#d9913b',
      secondary: '#965815',
      highlight: '#f7c986',
      atmosphere: '#e89d41',
      pattern: 'clouds'
    },
    facts: [
      'Surface atmospheric pressure is 1.45 bar (45% denser than Earth’s), composed of 97% nitrogen and ~2.7% methane.',
      'Kraken Mare and Ligeia Mare are vast polar seas of liquid methane and ethane fed by hydrocarbon rainstorms.',
      'ESA’s Huygens probe landed on Titan in 2005, and NASA’s rotorcraft Dragonfly is scheduled to fly across its organic dunes in the 2030s.'
    ]
  },

  {
    id: 'iapetus',
    name: 'Iapetus',
    type: 'moon',
    badge: 'SATURNIAN MOON',
    parent: 'saturn',
    parentLabel: 'ORBITS SATURN',
    tagline: 'Two-Toned Yin-Yang Moon Belted by a 20-km Equatorial Mountain Ridge',
    description:
      'Famous for its dramatic hemispheric color dichotomy—one side pitch-black as coal, the other bright as fresh snow—and a colossal mountain ridge tracing its equator.',
    radiusKm: 734.5,
    massText: '1.806 × 10²¹ kg',
    gravityMs2: 0.223,
    tempText: '-143 °C (Dark) / -183 °C (Bright)',
    rotationText: '79.32 days (Synchronous)',
    orbitalPeriodText: '79.322 Earth days',
    moonsCountText: '3rd Largest Moon of Saturn',
    semiMajorAxisText: '3,560,820 km from Saturn',
    axialTiltDeg: 15.47,
    rotationSpeed: 0.0015,
    sceneRadius: 0.5,
    localOrbitRadius: 17.8,
    localOrbitAngle: 5.6,
    localOrbitTilt: 15.47,
    localOrbitSpeed: 0.2,
    meanDistFromParentKm: 3560820,
    earthDistRangeKm: [1195500000, 1658500000],
    palette: {
      base: '#d4d0c8',
      secondary: '#2b241f',
      highlight: '#ffffff',
      pattern: 'cratered'
    },
    facts: [
      'Its leading hemisphere (Cassini Regio) sweeps up dark dust from outer moon Phoebe, triggering thermal sublimation of ice to the bright poles.',
      'An equatorial mountain ridge 20 km high and 1,300 km long gives Iapetus the shape of a cosmic walnut.',
      'Orbits on an inclined plane (15.5°) enabling clear views of Saturn’s rings from above and below.'
    ]
  },

  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    badge: 'ICE GIANT',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Cyan Ice Giant Rolling Sideways at a 97.8° Axial Tilt',
    description:
      'An icy giant whose mantle of water, ammonia, and methane ices surrounds a rocky core. Knocked onto its side by a primordial collision, Uranus rolls around the Sun with extreme 42-year polar seasons.',
    radiusKm: 25362,
    massText: '8.681 × 10²⁵ kg',
    gravityMs2: 8.87,
    tempText: '-195 °C (Min -224 °C)',
    rotationText: '17h 14m 24s (Retrograde)',
    orbitalPeriodText: '84.01 Earth years',
    moonsCountText: '28 Confirmed Moons',
    semiMajorAxisText: '19.191 AU (2.87B km)',
    axialTiltDeg: 97.77,
    rotationSpeed: -0.005,
    sceneRadius: 3.1,
    sceneDistance: 265,
    rings: {
      innerRadius: 3.8,
      outerRadius: 5.0,
      color: '#7dd3fc'
    },
    orbitElements: {
      a: 19.18916464, e: 0.04725744, i: 0.77263783,
      L: 313.23810451, varpi: 170.9542763, node: 74.01692503,
      dA: -0.00196176, dE: -0.00004397, dI: -0.00242939,
      dL: 428.48202785, dVarpi: 0.40805281, dNode: 0.04240589
    },
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#7de2f5',
      secondary: '#4bb5cf',
      highlight: '#c8f6ff',
      atmosphere: '#67e8f9',
      pattern: 'ice_giant'
    },
    facts: [
      'Holds the record for the coldest planetary atmosphere in the Solar System at 49 K (-224 °C).',
      'Encircled by 13 narrow, dark rings and 28 moons named after characters from William Shakespeare and Alexander Pope.',
      'First planet discovered with a telescope, identified by William Herschel on March 13, 1781.'
    ]
  },

  {
    id: 'miranda',
    name: 'Miranda',
    type: 'moon',
    badge: 'URANIAN MOON',
    parent: 'uranus',
    parentLabel: 'ORBITS URANUS',
    tagline: 'Frankenstein Patchwork World Home to 20-km Verona Rupes Cliff',
    description:
      'Smallest and innermost of Uranus’s five major moons, Miranda displays giant chevron-shaped "coronae" canyons and the tallest known cliff in the Solar System.',
    radiusKm: 235.8,
    massText: '6.400 × 10¹⁹ kg',
    gravityMs2: 0.077,
    tempText: '-213 °C Mean',
    rotationText: '1.41 days (Synchronous)',
    orbitalPeriodText: '1.413 Earth days',
    moonsCountText: 'Inner Major Moon of Uranus',
    semiMajorAxisText: '129,390 km from Uranus',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.004,
    sceneRadius: 0.36,
    localOrbitRadius: 6.4,
    localOrbitAngle: 0.4,
    localOrbitTilt: 4.34,
    localOrbitSpeed: 0.68,
    meanDistFromParentKm: 129390,
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#a3adb8',
      secondary: '#5d6670',
      highlight: '#dbe4ed',
      pattern: 'icy_cracks'
    },
    facts: [
      'Verona Rupes is an icy fault scarp up to 20 km high—ten times deeper than the Grand Canyon.',
      'In Miranda’s low gravity, a rock dropped from the top of Verona Rupes would take ~12 minutes to hit the bottom.',
      'Its bizarre coronae terrains were likely sculpted by ancient tidal heating and convective ice diapirs.'
    ]
  },

  {
    id: 'ariel',
    name: 'Ariel',
    type: 'moon',
    badge: 'URANIAN MOON',
    parent: 'uranus',
    parentLabel: 'ORBITS URANUS',
    tagline: 'Brightest Uranian Moon Scored by Intersecting Graben Rift Valleys',
    description:
      'The brightest and geologically youngest of Uranus’s major moons, Ariel is crisscrossed by smooth-floored canyons resurfaced by cryovolcanic flows.',
    radiusKm: 578.9,
    massText: '1.251 × 10²¹ kg',
    gravityMs2: 0.249,
    tempText: '-213 °C Mean',
    rotationText: '2.52 days (Synchronous)',
    orbitalPeriodText: '2.520 Earth days',
    moonsCountText: '4th Largest Moon of Uranus',
    semiMajorAxisText: '191,020 km from Uranus',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0034,
    sceneRadius: 0.44,
    localOrbitRadius: 7.8,
    localOrbitAngle: 1.65,
    localOrbitTilt: 0.04,
    localOrbitSpeed: 0.54,
    meanDistFromParentKm: 191020,
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#c5ced6',
      secondary: '#7b848c',
      highlight: '#eff5fa',
      pattern: 'icy_cracks'
    },
    facts: [
      'James Webb Space Telescope detected carbon dioxide and carbon monoxide ices concentrated on Ariel’s trailing hemisphere.',
      'Kachina Chasmata is a canyon system over 620 km long and 5 km deep.',
      'Discovered in 1851 by William Lassell along with Umbriel.'
    ]
  },

  {
    id: 'umbriel',
    name: 'Umbriel',
    type: 'moon',
    badge: 'URANIAN MOON',
    parent: 'uranus',
    parentLabel: 'ORBITS URANUS',
    tagline: 'Darkest Major Moon of Uranus Crowned by the Glowing Wunda Ring',
    description:
      'Reflecting less than half as much light as neighboring Ariel, Umbriel is an ancient, heavily cratered world with a mysterious 131-km bright ring at its equator.',
    radiusKm: 584.7,
    massText: '1.275 × 10²¹ kg',
    gravityMs2: 0.25,
    tempText: '-198 °C Mean',
    rotationText: '4.14 days (Synchronous)',
    orbitalPeriodText: '4.144 Earth days',
    moonsCountText: '3rd Largest Moon of Uranus',
    semiMajorAxisText: '266,000 km from Uranus',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0028,
    sceneRadius: 0.44,
    localOrbitRadius: 9.2,
    localOrbitAngle: 2.9,
    localOrbitTilt: 0.13,
    localOrbitSpeed: 0.42,
    meanDistFromParentKm: 266000,
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#686d75',
      secondary: '#3d4147',
      highlight: '#b8c4d4',
      pattern: 'cratered'
    },
    facts: [
      'Wunda Crater hosts a brilliant 131-km annulus of fresh carbon dioxide or water ice contrasting starkly with Umbriel’s dark regolith.',
      'Shows almost no tectonic resurfacing since the Late Heavy Bombardment.',
      'Named after the "dusky melancholy sprite" in Alexander Pope’s 1712 poem The Rape of the Lock.'
    ]
  },

  {
    id: 'titania',
    name: 'Titania',
    type: 'moon',
    badge: 'URANIAN MOON',
    parent: 'uranus',
    parentLabel: 'ORBITS URANUS',
    tagline: 'Largest Moon of Uranus Split by the 1,500-km Messina Chasmata',
    description:
      'Eighth-largest moon in the Solar System, Titania consists of equal parts rock and water ice, split by enormous fault valleys formed when its interior froze and expanded.',
    radiusKm: 788.4,
    massText: '3.400 × 10²¹ kg',
    gravityMs2: 0.365,
    tempText: '-203 °C Mean',
    rotationText: '8.71 days (Synchronous)',
    orbitalPeriodText: '8.706 Earth days',
    moonsCountText: 'Largest Moon of Uranus',
    semiMajorAxisText: '435,910 km from Uranus',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0022,
    sceneRadius: 0.54,
    localOrbitRadius: 10.7,
    localOrbitAngle: 4.15,
    localOrbitTilt: 0.08,
    localOrbitSpeed: 0.32,
    meanDistFromParentKm: 435910,
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#b4aca3',
      secondary: '#6e675f',
      highlight: '#e3dcd3',
      pattern: 'cratered'
    },
    facts: [
      'Messina Chasmata is a 1,492-km fault canyon system running from the equator nearly to the south pole.',
      'Thermal models indicate an ammonia-rich liquid water ocean ~50 km thick may persist between its rocky core and ice mantle.',
      'Discovered by William Herschel in 1787 and named after the Queen of the Fairies in A Midsummer Night’s Dream.'
    ]
  },

  {
    id: 'oberon',
    name: 'Oberon',
    type: 'moon',
    badge: 'URANIAN MOON',
    parent: 'uranus',
    parentLabel: 'ORBITS URANUS',
    tagline: 'Outermost Major Uranian Moon with an 11-km Limb Mountain',
    description:
      'Heavily cratered and reddish-gray, Oberon is the outermost and second-largest of Uranus’s major satellites, featuring dark cryovolcanic floor deposits inside its largest craters.',
    radiusKm: 761.4,
    massText: '3.076 × 10²¹ kg',
    gravityMs2: 0.354,
    tempText: '-198 °C Mean',
    rotationText: '13.46 days (Synchronous)',
    orbitalPeriodText: '13.463 Earth days',
    moonsCountText: 'Outermost Major Uranian Moon',
    semiMajorAxisText: '583,520 km from Uranus',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0018,
    sceneRadius: 0.52,
    localOrbitRadius: 12.2,
    localOrbitAngle: 5.4,
    localOrbitTilt: 0.07,
    localOrbitSpeed: 0.24,
    meanDistFromParentKm: 583520,
    earthDistRangeKm: [2581900000, 3157300000],
    palette: {
      base: '#968981',
      secondary: '#594f49',
      highlight: '#ccbfb6',
      pattern: 'cratered'
    },
    facts: [
      'Voyager 2 imaged a colossal mountain peak rising 11 km above Oberon’s limb—likely the central peak of a vast impact basin.',
      'Hamlet Crater (206 km wide) has a dark floor coated in carbon-rich material welled up from the interior.',
      'Spends part of its orbit outside Uranus’s magnetosphere, directly exposed to the solar wind.'
    ]
  },

  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    badge: 'ICE GIANT',
    parent: 'sun',
    parentLabel: 'ORBITS THE SUN',
    tagline: 'Deep-Azure Wind-Whipped Outpost of the Planetary Solar System',
    description:
      'Orbiting 30 times farther from the Sun than Earth, Neptune radiates 2.6 times more internal heat than it receives from sunlight, powering the fastest supersonic winds in the Solar System.',
    radiusKm: 24622,
    massText: '1.024 × 10²⁶ kg',
    gravityMs2: 11.15,
    tempText: '-201 °C (Cloud Tops)',
    rotationText: '16h 6m 36s',
    orbitalPeriodText: '164.79 Earth years',
    moonsCountText: '16 Confirmed Moons',
    semiMajorAxisText: '30.070 AU (4.50B km)',
    axialTiltDeg: 28.32,
    rotationSpeed: 0.0054,
    sceneRadius: 3.0,
    sceneDistance: 325,
    orbitElements: {
      a: 30.06992276, e: 0.00859048, i: 1.77004347,
      L: -55.12002969, varpi: 44.96476227, node: 131.78422574,
      dA: 0.00026291, dE: 0.00005105, dI: 0.00035372,
      dL: 218.45945325, dVarpi: -0.32241464, dNode: -0.00508664
    },
    earthDistRangeKm: [4305900000, 4687300000],
    palette: {
      base: '#2b58de',
      secondary: '#173291',
      highlight: '#7fb2ff',
      atmosphere: '#3b82f6',
      pattern: 'neptune'
    },
    facts: [
      'Equatorial jet streams reach 2,100 km/h (1,300 mph)—supersonic speeds driven by internal thermal convection.',
      'First planet predicted by mathematical perturbation calculations (Urbain Le Verrier & John Couch Adams) before being observed by telescope in 1846.',
      'Completed its first full 165-year orbit since discovery on July 12, 2011.'
    ]
  },

  {
    id: 'proteus',
    name: 'Proteus',
    type: 'moon',
    badge: 'NEPTUNIAN MOON',
    parent: 'neptune',
    parentLabel: 'ORBITS NEPTUNE',
    tagline: 'Boxy Polyhedral Giant at the Threshold of Hydrostatic Equilibrium',
    description:
      'Neptune’s second-largest moon and largest inner prograde satellite, Proteus is one of the largest irregular (non-spherical) bodies in the Solar System.',
    radiusKm: 210.0,
    massText: '4.400 × 10¹⁹ kg',
    gravityMs2: 0.07,
    tempText: '-222 °C Mean',
    rotationText: '26h 54m (Synchronous)',
    orbitalPeriodText: '1.122 Earth days',
    moonsCountText: '2nd Largest Moon of Neptune',
    semiMajorAxisText: '117,647 km from Neptune',
    axialTiltDeg: 0.0,
    rotationSpeed: 0.0036,
    sceneRadius: 0.36,
    localOrbitRadius: 6.2,
    localOrbitAngle: 1.1,
    localOrbitTilt: 0.52,
    localOrbitSpeed: 0.56,
    meanDistFromParentKm: 117647,
    earthDistRangeKm: [4305900000, 4687300000],
    palette: {
      base: '#63666e',
      secondary: '#383a40',
      highlight: '#989ca6',
      pattern: 'cratered'
    },
    facts: [
      'Reflects only 10% of sunlight—as dark as soot—which prevented Earth telescopes from spotting it before Voyager 2’s 1989 flyby.',
      'Pharos Crater spans 230 km across, more than half the diameter of Proteus itself.',
      'Represents the maximum size a cold icy-rocky body can reach before gravity forces it into a sphere.'
    ]
  },

  {
    id: 'triton',
    name: 'Triton',
    type: 'moon',
    badge: 'CAPTURED KBO MOON',
    parent: 'neptune',
    parentLabel: 'ORBITS NEPTUNE (RETROGRADE)',
    tagline: 'Captured Kuiper Belt Dwarf Planet Spewing Nitrogen Ice Geysers',
    description:
      'Orbiting Neptune backwards (retrograde), Triton is a captured Kuiper Belt object with a frozen nitrogen crust, "cantaloupe terrain" ridges, and active solar-driven nitrogen geysers.',
    radiusKm: 1353.4,
    massText: '2.139 × 10²² kg',
    gravityMs2: 0.779,
    tempText: '-235 °C (38 K)',
    rotationText: '5.88 days (Retrograde Sync)',
    orbitalPeriodText: '5.877 Earth days (Retrograde)',
    moonsCountText: 'Largest Moon of Neptune',
    semiMajorAxisText: '354,759 km from Neptune',
    axialTiltDeg: 156.88,
    rotationSpeed: -0.003,
    sceneRadius: 0.64,
    localOrbitRadius: 8.6,
    localOrbitAngle: 3.8,
    localOrbitTilt: 23.0,
    localOrbitSpeed: -0.38,
    meanDistFromParentKm: 354759,
    earthDistRangeKm: [4305900000, 4687300000],
    palette: {
      base: '#e3cfc8',
      secondary: '#997d76',
      highlight: '#fff2f0',
      pattern: 'icy_cracks'
    },
    facts: [
      'Only large moon in the Solar System with a retrograde orbit, proving it was gravitationally captured from the Kuiper Belt.',
      'Voyager 2 observed dark nitrogen-gas geyser plumes rising 8 km high before trailing 150 km downwind in Triton’s thin atmosphere.',
      'Tidal decay will pull Triton inside Neptune’s Roche limit in ~3.6 billion years, creating a ring system rivaling Saturn’s.'
    ]
  },

  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf',
    badge: 'KUIPER BELT DWARF PLANET',
    parent: 'sun',
    parentLabel: 'KUIPER BELT (BINARY SYSTEM)',
    tagline: 'Heart-Marked Nitrogen-Glacier World of the Kuiper Belt Frontier',
    description:
      'Revealed by New Horizons in 2015 as a geologically vibrant world, Pluto features convective nitrogen-ice glaciers in Sputnik Planitia, 4-km water-ice mountains, and blue atmospheric haze layers.',
    radiusKm: 1188.3,
    massText: '1.303 × 10²² kg',
    gravityMs2: 0.62,
    tempText: '-229 °C (44 K)',
    rotationText: '6.39 days (Retrograde)',
    orbitalPeriodText: '247.94 Earth years',
    moonsCountText: '5 Moons (Charon, Nix, Hydra, Kerberos, Styx)',
    semiMajorAxisText: '39.482 AU (5.91B km)',
    axialTiltDeg: 122.53,
    rotationSpeed: -0.0022,
    sceneRadius: 1.25,
    sceneDistance: 375,
    orbitElements: {
      a: 39.48211675, e: 0.2488273, i: 17.14001206,
      L: 238.92903833, varpi: 224.06891629, node: 110.30393684,
      dA: -0.00031596, dE: 0.0000517, dI: 0.00004818,
      dL: 145.20780515, dVarpi: -0.04062942, dNode: -0.01183482
    },
    earthDistRangeKm: [4280000000, 7528000000],
    palette: {
      base: '#cfa888',
      secondary: '#7a4930',
      highlight: '#fff5e8',
      atmosphere: '#93c5fd',
      pattern: 'pluto'
    },
    facts: [
      'Tombaugh Regio—Pluto’s iconic 1,590-km bright heart—contains Sputnik Planitia, a glacier basin of slowly convecting solid nitrogen ice.',
      'Locked in a 2:3 orbital resonance with Neptune, preventing the two worlds from ever colliding despite crossing radial distances.',
      'Sunlight at Pluto takes ~5.5 hours to arrive and is still 1,000 times brighter than a full Moon night on Earth.'
    ]
  },

  {
    id: 'charon',
    name: 'Charon',
    type: 'moon',
    badge: 'BINARY COMPANION MOON',
    parent: 'pluto',
    parentLabel: 'CO-ORBITS PLUTO BARYCENTER',
    tagline: 'Half-Sized Binary Partner Locked in Mutual Tidal Embrace with Pluto',
    description:
      'Half the diameter and one-eighth the mass of Pluto, Charon is so large relative to its primary that the two worlds orbit a shared center of mass in empty space above Pluto’s surface.',
    radiusKm: 606.0,
    massText: '1.586 × 10²¹ kg',
    gravityMs2: 0.288,
    tempText: '-220 °C (53 K)',
    rotationText: '6.39 days (Mutually Locked)',
    orbitalPeriodText: '6.387 Earth days',
    moonsCountText: 'Primary Companion of Pluto',
    semiMajorAxisText: '19,591 km from Pluto',
    axialTiltDeg: 0.0,
    rotationSpeed: -0.0022,
    sceneRadius: 0.58,
    localOrbitRadius: 4.2,
    localOrbitAngle: 2.1,
    localOrbitTilt: 0.08,
    localOrbitSpeed: 0.35,
    meanDistFromParentKm: 19591,
    earthDistRangeKm: [4280000000, 7528000000],
    palette: {
      base: '#9c9590',
      secondary: '#693d2d',
      highlight: '#d6d1cc',
      pattern: 'cratered'
    },
    facts: [
      'Pluto and Charon are mutually tidally locked: each always presents the exact same hemisphere to the other in the sky.',
      'Mordor Macula is a dark reddish north polar cap formed by methane escaping Pluto’s atmosphere and freezing onto Charon’s cold pole.',
      'Serenity Chasma is part of a 1,800-km equatorial canyon belt four times longer than the Grand Canyon.'
    ]
  }
];

export const BODY_MAP = new Map(BODIES.map((b, idx) => [b.id, { ...b, index: idx }]));
