export interface HangarProject {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
  architecture: string;
  stats: {
    label: string;
    value: string;
    unit?: string;
    color?: 'amber' | 'cyan' | 'timber' | 'steel';
  }[];
  telemetryStream: {
    time: string;
    torque: number;
    speed: number;
    temp: number;
  }[];
  firmware: string;
  bomSnippet: string[];
}

export const HANGAR_PROJECTS: HangarProject[] = [
  {
    id: 'mud-crawler',
    name: 'MUD-CRAWLER MK.1',
    code: 'MC-01//DIRT',
    subtitle: 'HEAVY ALL-TERRAIN RECON & TRENCH EXCAVATOR',
    tag: 'FIELD TESTED // CLASS: ROVER',
    image: '/images/mud-crawler.jpg',
    description: 'Engineered to conquer slurry-filled clay pits, forest floor loam, and backyard trenches. The CNC-milled birch chassis flexes under high rock impact where carbon fiber shatters, while custom 3D printed TPU knobby tracks maintain 94% traction in wet silt.',
    architecture: 'CNC Baltic Birch Monocoque + Dual Brushless Planetary + TPU Shore 95A Tracks',
    stats: [
      { label: 'PEAK TORQUE', value: '58.4', unit: 'Nm', color: 'amber' },
      { label: 'TOP SPEED', value: '3.4', unit: 'm/s', color: 'cyan' },
      { label: 'SLURRY RATING', value: 'IP67 Wet-Loam', color: 'timber' },
      { label: 'RUNTIME', value: '8.5', unit: 'Hours', color: 'steel' },
    ],
    telemetryStream: [
      { time: '00:00', torque: 42, speed: 2.1, temp: 34 },
      { time: '00:05', torque: 58, speed: 1.4, temp: 39 },
      { time: '00:10', torque: 49, speed: 2.8, temp: 41 },
      { time: '00:15', torque: 52, speed: 2.4, temp: 42 },
      { time: '00:20', torque: 46, speed: 3.1, temp: 40 },
      { time: '00:25', torque: 55, speed: 2.9, temp: 44 },
    ],
    firmware: 'V2.8_TRENCH_LOCK_STABLE',
    bomSnippet: [
      '1x CNC Milled Birch Chassis (18mm Baltic)',
      '2x 24V 350W High-Torque Brushless Motors',
      '4x 3D-Printed PETG Track Bogie Hubs',
      '2x TPU Knobby Drive Belts (Shore 95A)',
      '1x ESP32-S3 Dual-Core Compute Board',
      '1x Stereoscopic Depth Turret with Cyan Halo',
    ],
  },
  {
    id: 'sprout-guard',
    name: 'SPROUT-GUARD',
    code: 'SG-04//SENTINEL',
    subtitle: 'SOLAR-POWERED AUTONOMOUS GARDEN SENTINEL',
    tag: 'BIO-SYMBIOTIC // CLASS: SENTINEL',
    image: '/images/sprout-guard.jpg',
    description: 'An untethered, weatherproof quadruped sentinel that lives continuously in the garden patch. Houses galvanic soil probes, solar energy harvesting deck, and an embedded micro-YOLO neural network that guards emerging seedlings and weeds micro-shoots.',
    architecture: 'Laser-Cut Box-Joint White Oak + Marine Varnish + Sealed PETG Servos',
    stats: [
      { label: 'SOIL MOISTURE', value: '78.2', unit: '%', color: 'cyan' },
      { label: 'SOLAR HARVEST', value: '14.8', unit: 'Watts', color: 'amber' },
      { label: 'FIELD UPTIME', value: '148', unit: 'Days', color: 'timber' },
      { label: 'VISION LATENCY', value: '18', unit: 'ms', color: 'steel' },
    ],
    telemetryStream: [
      { time: '06:00', torque: 12, speed: 0.3, temp: 18 },
      { time: '09:00', torque: 18, speed: 0.5, temp: 24 },
      { time: '12:00', torque: 22, speed: 0.6, temp: 31 },
      { time: '15:00', torque: 19, speed: 0.5, temp: 28 },
      { time: '18:00', torque: 14, speed: 0.4, temp: 23 },
      { time: '21:00', torque: 10, speed: 0.1, temp: 19 },
    ],
    firmware: 'V3.1_BIO_HARVEST_EDGE',
    bomSnippet: [
      '1x Laser-Cut Sealed Oak Enclosure',
      '4x 3D-Printed High-Torque Waterproof Leg Pods',
      '1x 15W High-Efficiency Monocrystalline Deck',
      '4x Galvanic Stainless Steel Soil Stems',
      '1x ESP32-S3 Sense Camera Module',
      '1x Micro-Solenoid Nutrient Dispenser',
    ],
  },
  {
    id: 'timber-arm',
    name: 'THE TIMBER-ARM',
    code: 'TA-05//AXIS',
    subtitle: '5-AXIS CYCLOIDAL WALNUT ARTICULATED MANIPULATOR',
    tag: 'PRECISION CRAFT // CLASS: FABRICATOR',
    image: '/images/timber-arm.jpg',
    description: 'Fuses the organic acoustic vibration damping of sculpted American walnut laminate with zero-backlash 3D printed cycloidal gearboxes. Designed for backyard precision assembly, soldering assistance, and pick-and-place without metallic ring resonance.',
    architecture: 'Layered Dark Walnut Laminate + Custom 3D Cycloidal Drives (40:1 Ratio)',
    stats: [
      { label: 'GEAR RATIO', value: '40:1', unit: 'Cycloid', color: 'cyan' },
      { label: 'BACKLASH', value: '< 0.05', unit: 'mm', color: 'steel' },
      { label: 'PAYLOAD', value: '2.85', unit: 'kg', color: 'amber' },
      { label: 'DAMPING FACTOR', value: '8.4x vs AL', color: 'timber' },
    ],
    telemetryStream: [
      { time: 'J1', torque: 34, speed: 45, temp: 28 },
      { time: 'J2', torque: 62, speed: 38, temp: 36 },
      { time: 'J3', torque: 48, speed: 52, temp: 33 },
      { time: 'J4', torque: 26, speed: 70, temp: 29 },
      { time: 'J5', torque: 15, speed: 95, temp: 27 },
      { time: 'J6', torque: 12, speed: 110, temp: 25 },
    ],
    firmware: 'V4.0_KINEMATICS_ZERO_PLAY',
    bomSnippet: [
      '5x Hand-Shaped American Walnut Arm Sections',
      '5x 3D-Printed Cycloidal PETG Disc Reducers',
      '5x NEMA 17 Closed-Loop Stepper Motors',
      '10x Precision Steel Ball Bearings (6002-2RS)',
      '1x Teensy 4.1 Inverse Kinematics Controller',
      '1x Adaptive Soft-Silicone 3D Gripper',
    ],
  },
  {
    id: 'little-muddy',
    name: 'LITTLE MUDDY',
    code: 'LM-MASCOT//00',
    subtitle: 'THE BACKYARD LAB DESK COMPANION & MASCOT',
    tag: 'EMOTIVE CYBERNETIC // CLASS: MASCOT',
    image: '/images/little-muddy.jpg',
    description: 'The physical soul and mascot of the Mud & Bot lab. Crafted from a single block of scrap pine with wood grain finish, featuring animated cyan pixel OLED eyes, brass antenna, and micro TPU caterpillar tracks. Keeps watch over CAD drawings and chirps when prints finish.',
    architecture: 'Solid Reclaimed Pine Block + OLED Cyber Visor + Dual Micro-Geared DC Pods',
    stats: [
      { label: 'PERSONALITY', value: 'DIRTY_CURIOUS', color: 'amber' },
      { label: 'DESK BATTERY', value: '48', unit: 'Hours', color: 'cyan' },
      { label: 'SAWDUST RESISTANCE', value: 'MAX 100%', color: 'timber' },
      { label: 'WEIGHT', value: '380', unit: 'grams', color: 'steel' },
    ],
    telemetryStream: [
      { time: '01', torque: 2, speed: 0.8, temp: 22 },
      { time: '02', torque: 3, speed: 1.2, temp: 23 },
      { time: '03', torque: 2, speed: 0.9, temp: 22 },
      { time: '04', torque: 4, speed: 0.4, temp: 24 },
      { time: '05', torque: 1, speed: 0.0, temp: 21 },
      { time: '06', torque: 3, speed: 1.1, temp: 23 },
    ],
    firmware: 'V1.0_LITTLE_FRIEND_OS',
    bomSnippet: [
      '1x Carved Solid Pine Cube Body (80x80x80mm)',
      '1x 1.5-inch 128x64 Cyan OLED Visor Panel',
      '2x Micro N20 All-Metal Geared Motors',
      '2x 3D-Printed Mini Orange TPU Tread Belts',
      '2x Turned Brass Miniature Antenna Pins',
      '1x Raspberry Pi Pico W Controller',
    ],
  },
];
