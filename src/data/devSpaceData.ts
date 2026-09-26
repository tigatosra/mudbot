export interface DevProject {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  phase: 'concept' | 'prototyping' | 'sourcing' | 'bench_testing' | 'field_ready';
  progressPercent: number;
  targetDate: string;
  leadDev: string;
  description: string;
  tags: string[];
  specs: {
    power: string;
    weight: string;
    terrain: string;
    compute: string;
  };
  milestones: {
    id: string;
    title: string;
    phase: string;
    completed: boolean;
    dueDate: string;
    assignee: string;
  }[];
  notes: string;
}

export interface DevComponent {
  id: string;
  projectId: string; // or 'global'
  name: string;
  category: 'motors' | 'electronics' | 'power' | 'sensors' | 'structural' | 'hardware';
  isRequired: boolean; // true = Nécessaire, false = Optionnel
  quantity: number;
  unitPrice: number; // in USD / EUR
  supplier: string;
  primaryUrl: string;
  alternativeSupplier?: string;
  alternativeUrl?: string;
  alternativeReason?: string;
  status: 'to_order' | 'ordered' | 'received' | 'tested';
  notes: string;
  assignedTo: string;
}

export interface DevResource {
  id: string;
  projectId: string; // or 'all'
  title: string;
  type: 'ai_model' | 'github_repo' | 'cad_print' | 'datasheet' | 'tutorial_video' | 'article';
  url: string;
  source: string;
  summary: string;
  aiPrompt?: string;
  tags: string[];
  addedBy: string;
  addedDate: string;
  upvotes: number;
}

export interface DevGotchaGuide {
  id: string;
  title: string;
  category: 'waterproofing_mud' | 'cnc_timber' | 'power_safety' | 'pinouts_wiring' | 'firmware_ros';
  badge: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
  deepDiveMarkdown: string;
}

export interface DevTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  status: 'online' | 'busy' | 'testing_in_mud' | 'in_cad';
  currentActivity: string;
}

export interface DevComment {
  id: string;
  projectId?: string;
  componentId?: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  text: string;
  likes: number;
  tag?: 'alert' | 'suggestion' | 'aliexpress_deal' | 'tested';
}

export interface DevActivity {
  id: string;
  userName: string;
  action: string;
  detail: string;
  timestamp: string;
  type: 'component' | 'milestone' | 'resource' | 'comment' | 'status';
}

export interface DevChecklistItem {
  id: string;
  label: string;
  category: 'sealing' | 'electronics' | 'power' | 'failsafe';
  completed: boolean;
  checkedBy?: string;
}

// ---------------- INITIAL DATASETS ----------------

export const INITIAL_DEV_PROJECTS: DevProject[] = [
  {
    id: 'mud-crawler',
    name: 'MUD-CRAWLER MK.1',
    code: 'MC-01//DIRT',
    subtitle: 'Rover d\'excavation et franchissement en sol meuble / boueux',
    phase: 'bench_testing',
    progressPercent: 78,
    targetDate: '2026-11-15',
    leadDev: 'Alex (Mécatronique)',
    description: 'Châssis monocoque en contreplaqué de bouleau baltique 18mm découpé CNC avec réducteurs planétaires brushless et chenilles TPU Shore 95A crantées pour bourbiers.',
    tags: ['Chenilles TPU', 'IP67 Boue', 'Double Brushless', 'ESP32-S3'],
    specs: {
      power: '24V LiFePO4 12Ah (288Wh)',
      weight: '7.8 kg',
      terrain: 'Argile humide, terre meuble, franchissement 35°',
      compute: 'ESP32-S3 Dual 240MHz + Caméra Stéréoscopique',
    },
    milestones: [
      { id: 'mc-m1', title: 'Fraisage CNC châssis bouleau 18mm', phase: 'Structure', completed: true, dueDate: '2026-08-10', assignee: 'Alex' },
      { id: 'mc-m2', title: 'Impression 3D chenilles crantées TPU 95A', phase: 'Transmission', completed: true, dueDate: '2026-08-25', assignee: 'Thomas' },
      { id: 'mc-m3', title: 'Banc de puissance ESC 24V & moteurs brushless', phase: 'Électronique', completed: true, dueDate: '2026-09-12', assignee: 'Marc' },
      { id: 'mc-m4', title: 'Intégration joints silicone & étanchéité IP67', phase: 'Étanchéité', completed: false, dueDate: '2026-10-05', assignee: 'Alex' },
      { id: 'mc-m5', title: 'Premier run en carrière de glaise', phase: 'Essai Terrain', completed: false, dueDate: '2026-10-20', assignee: 'Équipe' },
    ],
    notes: 'Attention au couple de démarrage dans la glaise collante: limiter le pic de courant à 35A par moteur sous peine de saturer les ESC.',
  },
  {
    id: 'sprout-guard',
    name: 'SPROUT-GUARD MK.2',
    code: 'SG-04//SENTINEL',
    subtitle: 'Sentinelle bio-symbiotique solaire à 4 pattes pour potager',
    phase: 'sourcing',
    progressPercent: 54,
    targetDate: '2026-12-01',
    leadDev: 'Sarah (Edge AI & Vision)',
    description: 'Robot quadrupède autonome alimenté par panneau solaire monocristallin. Embarque des sondes galvaniques d\'humidité de sol et un micro-modèle YOLO pour identifier les mauvaises herbes.',
    tags: ['Solaire', 'Micro-YOLO', 'Quadrupède', 'Chêne étanche'],
    specs: {
      power: 'Panneau 15W + Li-Ion 18650 3S2P (45Wh)',
      weight: '3.4 kg',
      terrain: 'Terreau de potager, paillage humide, bordures',
      compute: 'ESP32-S3 Sense + Accélérateur NPU Edge',
    },
    milestones: [
      { id: 'sg-m1', title: 'Conception boîte en chêne usiné à queues droites', phase: 'Design', completed: true, dueDate: '2026-07-20', assignee: 'Thomas' },
      { id: 'sg-m2', title: 'Entraînement modèle YOLO-nano sur 1200 adventices', phase: 'IA Edge', completed: true, dueDate: '2026-09-02', assignee: 'Sarah' },
      { id: 'sg-m3', title: 'Approvisionnement servomoteurs étanches 35kg.cm', phase: 'Sourcing', completed: false, dueDate: '2026-10-10', assignee: 'Marc' },
      { id: 'sg-m4', title: 'Régulateur MPPT solaire & gestion veille ultra-low power', phase: 'Énergie', completed: false, dueDate: '2026-10-28', assignee: 'Marc' },
    ],
    notes: 'Le panneau solaire doit être incliné à 35° et scellé au silicone nautique. Test d\'autonomie continue de 30 jours prévu.',
  },
  {
    id: 'timber-arm',
    name: 'THE TIMBER-ARM',
    code: 'TA-05//AXIS',
    subtitle: 'Bras robotisé 5 axes en noyer américain à réducteurs cycloïdaux',
    phase: 'prototyping',
    progressPercent: 42,
    targetDate: '2027-01-20',
    leadDev: 'Thomas (CAD & Cycloïdes)',
    description: 'Bras manipulateur combinant l\'amortissement vibratoire du bois dur et la précision sans jeu de réducteurs cycloïdes imprimés en 3D. Idéal pour soudure et atelier.',
    tags: ['5 Axes', 'Cycloïde 40:1', 'Noyer Massif', 'NEMA 17'],
    specs: {
      power: '24V 10A alimentation fixe atelier',
      weight: '4.2 kg',
      terrain: 'Atelier / Établi de précision',
      compute: 'Teensy 4.1 600MHz + 5x TMC2209 UART',
    },
    milestones: [
      { id: 'ta-m1', title: 'Calcul des courbes épicycloïdales (ratio 40:1)', phase: 'Mathématiques', completed: true, dueDate: '2026-08-15', assignee: 'Thomas' },
      { id: 'ta-m2', title: 'Test d\'impression 3D en PETG-CF des disques', phase: 'Prototypage', completed: true, dueDate: '2026-09-10', assignee: 'Thomas' },
      { id: 'ta-m3', title: 'Usinage des flasques en noyer 20mm', phase: 'Bois CNC', completed: false, dueDate: '2026-10-18', assignee: 'Alex' },
      { id: 'ta-m4', title: 'Implémentation cinématique inverse 5DOF sur Teensy', phase: 'Firmware', completed: false, dueDate: '2026-11-12', assignee: 'Marc' },
    ],
    notes: 'Préférer les roulements 6806-2RS pour le joint d\'épaule: le jeu axial doit être inférieur à 0.05mm pour préserver le réducteur cycloïde.',
  },
  {
    id: 'little-muddy',
    name: 'LITTLE MUDDY',
    code: 'LM-MASCOT//00',
    subtitle: 'Compagnon cybernétique d\'établi en pin brut avec écran OLED',
    phase: 'field_ready',
    progressPercent: 95,
    targetDate: '2026-10-01',
    leadDev: 'Alex & Marc',
    description: 'Mascotte physique officielle du laboratoire Mud & Bot. Bloc de pin sculpté, micro-chenilles orange, yeux OLED animés et télémétrie locale en direct.',
    tags: ['Mascotte', 'OLED 128x64', 'Pico W', 'Micro N20'],
    specs: {
      power: 'LiPo 1S 3.7V 1200mAh (USB-C)',
      weight: '380 g',
      terrain: 'Bureau, plans d\'architecte, sciure d\'atelier',
      compute: 'Raspberry Pi Pico W + MicroPython',
    },
    milestones: [
      { id: 'lm-m1', title: 'Fraisage du cube en pin brut', phase: 'Structure', completed: true, dueDate: '2026-07-01', assignee: 'Alex' },
      { id: 'lm-m2', title: 'Animations yeux OLED & chirp audio', phase: 'UI/UX', completed: true, dueDate: '2026-07-15', assignee: 'Marc' },
      { id: 'lm-m3', title: 'Micro-chenilles TPU souple orange', phase: 'Traction', completed: true, dueDate: '2026-07-28', assignee: 'Thomas' },
      { id: 'lm-m4', title: 'Mise en ligne des blueprints open-source', phase: 'Release', completed: true, dueDate: '2026-09-01', assignee: 'Équipe' },
    ],
    notes: '100% opérationnel ! Sert actuellement d\'afficheur de statut pour les impressions 3D de l\'atelier.',
  },
];

export const INITIAL_DEV_COMPONENTS: DevComponent[] = [
  // --- MUD-CRAWLER MK.1 COMPONENTS ---
  {
    id: 'comp-mc-01',
    projectId: 'mud-crawler',
    name: 'Moteurs Brushless 24V 350W 1500RPM à Fort Couple (Paire)',
    category: 'motors',
    isRequired: true,
    quantity: 2,
    unitPrice: 28.50,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-brushless-motor-24v-high-torque-planetary.html',
    alternativeSupplier: 'Mouser Electronics (Maxon / Faulhaber grade)',
    alternativeUrl: 'https://www.mouser.fr/c/electromechanical/motors-actuators/',
    alternativeReason: 'Grade industriel avec garantie thermique, mais 4x plus cher. Recommandé pour production finale.',
    status: 'received',
    notes: 'Arbre claveté de 8mm. Bien vérifier le sens de rotation des capteurs Hall.',
    assignedTo: 'Alex',
  },
  {
    id: 'comp-mc-02',
    projectId: 'mud-crawler',
    name: 'Contrôleur Brushless Dual ESC VESC 4.20 50A étanche',
    category: 'electronics',
    isRequired: true,
    quantity: 1,
    unitPrice: 65.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-mini-dual-vesc-4.20-50a.html',
    alternativeSupplier: 'Trampa Boards (VESC Original)',
    alternativeUrl: 'https://trampaboards.com/vesc-c-134.html',
    alternativeReason: 'Firmware certifié Benjamin Vedder officiel avec protection contre les retours de force régénératifs.',
    status: 'ordered',
    notes: 'Indispensable pour le contrôle FOC silencieux à bas régime dans les bourbiers.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-mc-03',
    projectId: 'mud-crawler',
    name: 'ESP32-S3-DevKitC-1 N16R8 Dual-Core 240MHz + Wi-Fi/BLE',
    category: 'electronics',
    isRequired: true,
    quantity: 2,
    unitPrice: 5.80,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-esp32-s3-devkitc-1-n16r8.html',
    alternativeSupplier: 'LCSC Electronics (Composants officiels Espressif)',
    alternativeUrl: 'https://www.lcsc.com/products/WiFi-Modules_11013.html',
    alternativeReason: 'Origine Espressif garantie sans puces recyclées, délai rapide 5 jours.',
    status: 'received',
    notes: 'Choisir impérativement la variante 16MB Flash / 8MB PSRAM pour exécuter Micro-ROS.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-mc-04',
    projectId: 'mud-crawler',
    name: 'Batterie LiFePO4 8S 24V 12Ah avec BMS étanche 40A',
    category: 'power',
    isRequired: true,
    quantity: 1,
    unitPrice: 89.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-lifepo4-battery-pack-24v-bms.html',
    alternativeSupplier: 'Amazon Prime (Eco-Worthy / Royer)',
    alternativeUrl: 'https://www.amazon.fr/s?k=batterie+lifepo4+24v',
    alternativeReason: 'Livraison 24h et garantie retour si cellule défectueuse.',
    status: 'ordered',
    notes: 'Chimie LiFePO4 choisie pour sa tolérance aux chocs thermiques et 3000+ cycles.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-mc-05',
    projectId: 'mud-crawler',
    name: 'Filament TPU 95A Ténacité Renforcée Noir / Orange (Bobine 1kg)',
    category: 'structural',
    isRequired: true,
    quantity: 2,
    unitPrice: 22.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-tpu-filament-95a-1.75mm.html',
    alternativeSupplier: 'Bambu Lab (TPU 95A HF Haute Vitesse)',
    alternativeUrl: 'https://eu.store.bambulab.com/fr-fr/collections/bambu-tpu-filament',
    alternativeReason: 'Adhésion inter-couche exceptionnelle, idéal pour chenilles anti-arrachement.',
    status: 'tested',
    notes: 'Imprimer à 225°C avec 6 parois pleines et 35% de remplissage gyroïde.',
    assignedTo: 'Thomas',
  },
  {
    id: 'comp-mc-06',
    projectId: 'mud-crawler',
    name: 'Lidar à Balayage 360° DTOF D200 Portée 12m étanche poussière',
    category: 'sensors',
    isRequired: false, // OPTIONNEL !
    quantity: 1,
    unitPrice: 58.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-dtof-lidar-sensor-360-12m.html',
    alternativeSupplier: 'RobotShop (RPLIDAR S2 IP65)',
    alternativeUrl: 'https://www.robotshop.com/fr/collections/lidar',
    alternativeReason: 'Véritable protection IP65 contre les projections d\'eau et boue liquide.',
    status: 'to_order',
    notes: 'Upgrade optionnelle pour cartographie SLAM automatique en forêt dense.',
    assignedTo: 'Sarah',
  },
  {
    id: 'comp-mc-07',
    projectId: 'mud-crawler',
    name: 'Caméra Nocturne Infrarouge OV5640 Stéréoscopique double objectif',
    category: 'sensors',
    isRequired: false, // OPTIONNEL !
    quantity: 1,
    unitPrice: 24.50,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-ov5640-binocular-camera-module.html',
    alternativeSupplier: 'Arducam Boutique Officielle',
    alternativeUrl: 'https://www.arducam.com/product/stereo-camera-board/',
    alternativeReason: 'Pilotes optimisés ESP32-S3 et calibration d\'usine des lentilles grand angle.',
    status: 'to_order',
    notes: 'Permet la vision stéréoscopique pour évaluer la profondeur des trous de boue.',
    assignedTo: 'Sarah',
  },
  {
    id: 'comp-mc-08',
    projectId: 'mud-crawler',
    name: 'Panneau Contreplaqué Bouleau Baltique Qualité B/BB 18mm (120x60cm)',
    category: 'structural',
    isRequired: true,
    quantity: 1,
    unitPrice: 38.00,
    supplier: 'Négociant Bois Local / Magasin Bricolage',
    primaryUrl: 'https://www.google.com/search?q=contreplaqu%C3%A9+bouleau+baltique+18mm',
    alternativeSupplier: 'Labo Mud & Bot (Chutes d\'atelier)',
    alternativeUrl: '#',
    alternativeReason: 'Gratuit si on assemble les longerons en finger-joints.',
    status: 'tested',
    notes: 'Fraise 2 dents hélicoïdale 3.175mm, vitesse d\'avance 1200mm/min.',
    assignedTo: 'Alex',
  },

  // --- SPROUT-GUARD MK.2 COMPONENTS ---
  {
    id: 'comp-sg-01',
    projectId: 'sprout-guard',
    name: 'Servomoteurs Numériques Étanche 35kg.cm IP67 Arbre Acier (Pack de 8)',
    category: 'motors',
    isRequired: true,
    quantity: 8,
    unitPrice: 13.90,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-waterproof-servo-35kg-ip67.html',
    alternativeSupplier: 'Amazon Prime (DSSERVO DS3235 35KG)',
    alternativeUrl: 'https://www.amazon.fr/s?k=servo+35kg+ip67',
    alternativeReason: 'Reçus en 24h, comprend les palonniers aluminium 25T renforcés.',
    status: 'to_order',
    notes: 'Joint torique en silicone inclus sous le capot. Idéal pour résister à la pluie constante.',
    assignedTo: 'Thomas',
  },
  {
    id: 'comp-sg-02',
    projectId: 'sprout-guard',
    name: 'Panneau Solaire Monocristallin 15W ETFE Flexible Étanche',
    category: 'power',
    isRequired: true,
    quantity: 1,
    unitPrice: 18.50,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-solar-panel-15w-etfe-waterproof.html',
    alternativeSupplier: 'Adafruit Solar Charger Kit',
    alternativeUrl: 'https://www.adafruit.com/product/4755',
    alternativeReason: 'Revêtement ETFE auto-nettoyant : la boue sèche glisse avec la rosée du matin.',
    status: 'ordered',
    notes: 'Revêtement texturé anti-reflet qui maximise la captation sous le couvert végétal.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-sg-03',
    projectId: 'sprout-guard',
    name: 'Module Régulateur Solaire MPPT CN3791 12V Li-ion',
    category: 'power',
    isRequired: true,
    quantity: 1,
    unitPrice: 4.20,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-cn3791-mppt-solar-charger.html',
    alternativeSupplier: 'Mouser (Circuit intégré Texas Instruments BQ25792)',
    alternativeUrl: 'https://www.mouser.fr/c/semiconductors/power-management-ics/battery-management-ics/',
    alternativeReason: 'Rendement supérieur de 96% avec télémétrie I2C précise.',
    status: 'received',
    notes: 'Permet de maintenir le point de puissance maximale même par temps voilé.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-sg-04',
    projectId: 'sprout-guard',
    name: 'Sonde d\'Humidité et Température Sol Capacitive V2.0 Anti-Corrosion (Lot de 4)',
    category: 'sensors',
    isRequired: true,
    quantity: 4,
    unitPrice: 2.10,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-capacitive-soil-moisture-sensor-v2.html',
    alternativeSupplier: 'Adafruit STEMMA Soil Sensor',
    alternativeUrl: 'https://www.adafruit.com/product/4026',
    alternativeReason: 'Interface I2C calibrée en usine avec vernis de protection sur l\'électronique.',
    status: 'tested',
    notes: 'Ne jamais utiliser de sondes résistives qui s\'oxydent en 3 semaines dans la terre.',
    assignedTo: 'Sarah',
  },
  {
    id: 'comp-sg-05',
    projectId: 'sprout-guard',
    name: 'Module Caméra ESP32-S3 Sense avec Micro et Slot Carte SD',
    category: 'electronics',
    isRequired: true,
    quantity: 1,
    unitPrice: 11.80,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-esp32-s3-sense-camera.html',
    alternativeSupplier: 'Seeed Studio (XIAO ESP32S3 Sense)',
    alternativeUrl: 'https://www.seeedstudio.com/XIAO-ESP32S3-Sense-p-5639.html',
    alternativeReason: 'Format miniature 21x17.5mm avec antenne externe intégrée.',
    status: 'received',
    notes: 'Exécute le micro-modèle YOLO pour identifier les plantules à 15 FPS.',
    assignedTo: 'Sarah',
  },

  // --- THE TIMBER-ARM COMPONENTS ---
  {
    id: 'comp-ta-01',
    projectId: 'timber-arm',
    name: 'Moteurs Pas-à-Pas NEMA 17 Closed-Loop (Boucle Fermée) 59Ncm (Lot de 5)',
    category: 'motors',
    isRequired: true,
    quantity: 5,
    unitPrice: 21.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-nema-17-closed-loop-stepper-motor.html',
    alternativeSupplier: 'StepperOnline Boutique Directe',
    alternativeUrl: 'https://www.omc-stepperonline.com/fr/moteur-pas-a-pas-en-boucle-fermee',
    alternativeReason: 'Encodeur magnétique 14-bit ultra précis, zéro perte de pas sous charge.',
    status: 'ordered',
    notes: 'Boucle fermée indispensable pour éliminer les résonances du bois lors des accélérations.',
    assignedTo: 'Thomas',
  },
  {
    id: 'comp-ta-02',
    projectId: 'timber-arm',
    name: 'Roulements à Billes Précision 6806-2RS (30x42x7mm) pour Disque Cycloïde (Pack 10)',
    category: 'hardware',
    isRequired: true,
    quantity: 10,
    unitPrice: 2.30,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-6806-2rs-bearing.html',
    alternativeSupplier: 'SKF / 123Roulement (Qualité ABEC-5)',
    alternativeUrl: 'https://www.123roulement.com/',
    alternativeReason: 'Jeu radial C3 réduit garanti, friction minimale.',
    status: 'received',
    notes: 'Indispensable au centre du disque cycloïde pour encaisser la force excentrique.',
    assignedTo: 'Thomas',
  },
  {
    id: 'comp-ta-03',
    projectId: 'timber-arm',
    name: 'Teensy 4.1 ARM Cortex-M7 600MHz avec Port Ethernet',
    category: 'electronics',
    isRequired: true,
    quantity: 1,
    unitPrice: 32.50,
    supplier: 'AliExpress / SparkFun',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-teensy-4.1.html',
    alternativeSupplier: 'PJRC Boutique Officielle',
    alternativeUrl: 'https://www.pjrc.com/store/teensy41.html',
    alternativeReason: 'Produit officiel garanti sans contrefaçon de puce NXP.',
    status: 'tested',
    notes: 'Puissance de calcul mathématique brute requise pour la trigonométrie inverse 5 axes à 1kHz.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-ta-04',
    projectId: 'timber-arm',
    name: 'Pince Préhensible Souple Pneumatique en Silicone 3D Souple',
    category: 'hardware',
    isRequired: false, // OPTIONNEL
    quantity: 1,
    unitPrice: 39.00,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-soft-pneumatic-gripper-robot.html',
    alternativeSupplier: 'Festo Didactic Soft Robotics',
    alternativeUrl: 'https://www.festo.com',
    alternativeReason: 'Silicone qualité chirurgicale capable de saisir des objets fragiles sans rayure.',
    status: 'to_order',
    notes: 'Alternative moderne à la pince métallique : ne raye pas le bois et attrape des fraises ou œufs sans les écraser.',
    assignedTo: 'Sarah',
  },

  // --- LITTLE MUDDY COMPONENTS ---
  {
    id: 'comp-lm-01',
    projectId: 'little-muddy',
    name: 'Micro-Moteurs Métalliques N20 6V 150RPM avec Réducteur Tout-Acier',
    category: 'motors',
    isRequired: true,
    quantity: 2,
    unitPrice: 3.40,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-n20-gear-motor-6v.html',
    alternativeSupplier: 'Pololu Robotics & Electronics',
    alternativeUrl: 'https://www.pololu.com/category/60/micro-metal-gearmotors',
    alternativeReason: 'Balais en métal précieux longue durée de vie, usinage suisse.',
    status: 'tested',
    notes: 'Très robuste, supporte le blocage sans cramer le bobinage.',
    assignedTo: 'Marc',
  },
  {
    id: 'comp-lm-02',
    projectId: 'little-muddy',
    name: 'Écran OLED 1.54 pouce Blanc/Cyan 128x64 I2C / SPI SSD1309',
    category: 'electronics',
    isRequired: true,
    quantity: 1,
    unitPrice: 6.20,
    supplier: 'AliExpress',
    primaryUrl: 'https://fr.aliexpress.com/w/wholesale-1.54-inch-oled-ssd1309.html',
    alternativeSupplier: 'Waveshare Boutique',
    alternativeUrl: 'https://www.waveshare.com/1.54inch-oled-module.htm',
    alternativeReason: 'Angle de vision 170° et contraste parfait même au soleil d\'atelier.',
    status: 'tested',
    notes: 'Affiche les yeux expressifs et la télémétrie en temps réel.',
    assignedTo: 'Alex',
  },
  {
    id: 'comp-lm-03',
    projectId: 'little-muddy',
    name: 'Microcontrôleur Raspberry Pi Pico W avec Wi-Fi',
    category: 'electronics',
    isRequired: true,
    quantity: 1,
    unitPrice: 6.90,
    supplier: 'Kubii / Magasin Pi Officiel',
    primaryUrl: 'https://www.kubii.com/fr/cartes-nano-ordinateurs/3673-raspberry-pi-pico-w-3272496316270.html',
    alternativeSupplier: 'AliExpress',
    alternativeUrl: 'https://fr.aliexpress.com/w/wholesale-raspberry-pi-pico-w.html',
    alternativeReason: 'Distributeur agréé Raspberry Pi, expédié le jour même.',
    status: 'tested',
    notes: 'Serveur Web MicroPython intégré pour télécommande depuis smartphone.',
    assignedTo: 'Marc',
  },
];

export const INITIAL_DEV_RESOURCES: DevResource[] = [
  {
    id: 'res-01',
    projectId: 'mud-crawler',
    title: 'Micro-ROS sur ESP32-S3 : Architecture Temps-Réel & Câblage',
    type: 'github_repo',
    url: 'https://github.com/micro-ROS/micro_ros_espidf_component',
    source: 'GitHub Official micro-ROS',
    summary: 'Composant officiel ESP-IDF permettant de publier des topics ROS 2 (odométrie, caméra, état batterie) directement par Wi-Fi UDP sans serveur intermédiaire.',
    aiPrompt: 'Générer un publisher ROS 2 en C++ pour ESP32-S3 qui publie un message sensor_msgs/BatteryState avec filtre médian sur 10 lectures ADC.',
    tags: ['ROS 2', 'ESP32', 'Firmware', 'C++'],
    addedBy: 'Marc (Firmware)',
    addedDate: '2026-09-18',
    upvotes: 14,
  },
  {
    id: 'res-02',
    projectId: 'mud-crawler',
    title: 'VESC Firmware Tool & FOC Tuning Guide pour Robots Tout-Terrain',
    type: 'article',
    url: 'https://vesc-project.com/documentation',
    source: 'VESC Project Portal',
    summary: 'Guide complet pour paramétrer le contrôle orienté champ (FOC) à très bas régime dans la boue liquide pour éviter le calage des moteurs brushless.',
    tags: ['VESC', 'FOC', 'Moteurs Brushless', 'Tuning'],
    addedBy: 'Alex (Mécatronique)',
    addedDate: '2026-09-20',
    upvotes: 9,
  },
  {
    id: 'res-03',
    projectId: 'sprout-guard',
    title: 'YOLOv8-Nano Quantifié INT8 pour Microcontrôleur ESP32-S3 (ESP-DL)',
    type: 'ai_model',
    url: 'https://github.com/espressif/esp-dl',
    source: 'Espressif Systems AI',
    summary: 'Bibliothèque d\'accélération de réseaux de neurones pour ESP32-S3. Permet de faire tourner un détecteur d\'adventices à 12 FPS avec une consommation inférieure à 0.9W.',
    aiPrompt: 'Convertir un modèle PyTorch YOLOv8n personnalisé en tableau C constant compatible ESP-DL avec quantification post-entraînement INT8.',
    tags: ['IA Edge', 'YOLOv8', 'ESP-DL', 'Vision'],
    addedBy: 'Sarah (Edge AI)',
    addedDate: '2026-09-22',
    upvotes: 21,
  },
  {
    id: 'res-04',
    projectId: 'timber-arm',
    title: 'Calculateur Paramétrique de Réducteur Cycloïde 3D (Onshape / Python)',
    type: 'cad_print',
    url: 'https://github.com/jpieper/cycloid',
    source: 'GitHub / Onshape CAD',
    summary: 'Algorithme géométrique qui génère le profil exact des disques cycloïdes sans jeu d\'engrenage. Inclut l\'offset des billes porteuses et l\'excentrique double équilibré.',
    tags: ['Cycloïde', 'CAD', 'Zero-Backlash', 'Maths'],
    addedBy: 'Thomas (CAD & Cycloïdes)',
    addedDate: '2026-09-14',
    upvotes: 18,
  },
  {
    id: 'res-05',
    projectId: 'all',
    title: 'Techniques d\'Étanchéité Boîtiers Bois & Impression 3D (IP67)',
    type: 'tutorial_video',
    url: 'https://hackaday.com/2023/04/18/waterproofing-3d-prints-the-right-way/',
    source: 'Hackaday Research Lab',
    summary: 'Méthodologie éprouvée : imprimer en PETG 100% extrusion, recuire au four à 90°C pour fusionner les strates, et imprégner le bois d\'époxy fluide sous vide partiel.',
    tags: ['Étanchéité', 'PETG', 'Résine Époxy', 'IP67'],
    addedBy: 'Alex (Mécatronique)',
    addedDate: '2026-09-24',
    upvotes: 12,
  },
  {
    id: 'res-06',
    projectId: 'all',
    title: 'Guide des Prompts IA pour Conception Mécatronique & Debug Électronique',
    type: 'ai_model',
    url: 'https://chatgpt.com',
    source: 'Mud & Bot AI Research Hub',
    summary: 'Collection de prompts optimisés pour assister le dimensionnement thermique des moteurs, le calcul des pertes de charge batterie et le routage PCB anti-parasite.',
    aiPrompt: 'Agis comme un ingénieur mécatronique spécialisé en véhicules tout-terrain. Calcule le couple statique minimal pour franchir une pente de 35° dans de l\'argile meuble avec un rover de 8kg et des chenilles de 70mm de large.',
    tags: ['Prompts IA', 'Dimensionnement', 'Calcul Couple'],
    addedBy: 'Sarah (Edge AI)',
    addedDate: '2026-09-25',
    upvotes: 16,
  },
];

export const INITIAL_DEV_GOTCHAS: DevGotchaGuide[] = [
  {
    id: 'gotcha-01',
    title: 'Étanchéité Boue & Humidité (Standard MudBot IP67)',
    category: 'waterproofing_mud',
    badge: 'CRITIQUE TERRAIN',
    readTime: '4 min',
    summary: 'Comment empêcher la boue argileuse et l\'eau sous pression d\'infiltrer les réducteurs et les compartiments électroniques.',
    keyPoints: [
      'Toujours concevoir une rainure pour joint torique (O-ring) en TPU 85A imprimé à plat.',
      'Ne jamais faire confiance à la simple peinture : utiliser 3 couches de vernis marin polyuréthane sur tout châssis bois.',
      'Créer un évent respirant avec membrane en ePTFE (Gore-Tex) : sans évent, la chaleur des moteurs crée une dépression qui aspire la boue liquide par les axes !',
      'Mettre un déflecteur anti-boue rotatif (labyrinthe) devant chaque roulement à billes.',
    ],
    deepDiveMarkdown: `
### 1. La règle d'or : L'effet de dépression thermique
Lorsque les moteurs brushless tournent dans un caisson hermétique en bois, l'air intérieur chauffe à ~50°C. Si le robot plonge brutalement dans une flaque de boue froide à 10°C, l'air se rétracte instantanément. Sans évent d'équilibrage, le caisson crée un vide partiel de -0.2 bar qui **aspire la boue liquide directement à travers les lèvres des roulements**.

**Solution MudBot :** Installer une membrane étanche respirante M12 en PTFE (disponible sur AliExpress à 0.80$).

### 2. Traitement du Contreplaqué de Bouleau
1. Ponçage grain 120 puis dépoussiérage à l'alcool isopropylique.
2. Première couche : Résine époxy fluide diluée à 10% d'acétone pour pénétrer les fibres en profondeur.
3. Deuxième et troisième couche : Vernis marin polyuréthane résistant aux UV et aux chocs de gravier.
    `,
  },
  {
    id: 'gotcha-02',
    title: 'Architecture Électrique & Anti-Parasites 24V -> 5V / 3.3V',
    category: 'power_safety',
    badge: 'SÉCURITÉ MATÉRIELLE',
    readTime: '5 min',
    summary: 'Éviter les redémarrages intempestifs du microcontrôleur causés par les pics de courant des moteurs.',
    keyPoints: [
      'Séparer physiquement la masse de puissance (moteurs) et la masse logique (ESP32/capteurs).',
      'Placer un condensateur électrolytique Low-ESR de 1000µF / 35V au plus près de chaque driver.',
      'Utiliser impérativement des régulateurs à découpage Step-Down synchrones (rendement >92%) avec selfs blindées.',
      'Ajouter une diode TVS 28V (Transient Voltage Suppressor) sur l\'entrée batterie pour absorber la force contre-électromotrice.',
    ],
    deepDiveMarkdown: `
### Schéma de câblage recommandé
\`\`\`text
[Batterie LiFePO4 24V] 
       │
       ├──[ Fusible 40A ]──[ Diode TVS 28V ]──[ Condensateur 2200µF ]
       │                                              │
       ├──[ Ligne Puissance ]──────────────────────> [ Dual VESC 50A ] ──> Moteurs Brushless
       │
       └──[ Convertisseur Buck 24V -> 5V 5A ] 
                  │
                  ├──[ Filtrage LC ]──> [ ESP32-S3 Logic 3.3V ]
                  │
                  └──[ Ligne 5V Servos / Lidar isolée ]
\`\`\`
*Note : Le châssis en bois n'étant pas conducteur, tous les plans de masse doivent être tirés en fil de cuivre souple de forte section (AWG 14 minimum pour la puissance).*
    `,
  },
  {
    id: 'gotcha-03',
    title: 'Brochage Critique ESP32-S3 (Pinout Matrix & Pièges à Éviter)',
    category: 'pinouts_wiring',
    badge: 'FIRMWARE & HARDWARE',
    readTime: '3 min',
    summary: 'Les pins réservées à la mémoire Flash/PSRAM et les broches de boot à ne jamais câbler sur des relais ou moteurs.',
    keyPoints: [
      'GPIO 0, 45, 46 : Strapping pins ! Si tirées à la masse au démarrage, le chip entre en mode bootloader.',
      'GPIO 26 à 32 : Strictement interdites ! Réservées au bus Octal SPI de la mémoire PSRAM 8MB.',
      'GPIO 19 & 20 : Réservées au port USB natif / JTAG matériel pour le téléversement et debug.',
      'GPIO recommandées pour PWM Moteurs : GPIO 4, 5, 6, 7 (timers haute résolution indépendants).',
      'Bus I2C capteurs : SDA sur GPIO 8, SCL sur GPIO 9 avec résistances de pull-up 4.7kΩ vers 3.3V.',
    ],
    deepDiveMarkdown: `
### Tableau des affectations matérielles MudBot ESP32-S3
| Fonction | Pin GPIO | Niveau Logique | Protection |
| :--- | :--- | :--- | :--- |
| **UART VESC TX** | GPIO 17 | 3.3V TTL | Résistance série 220Ω |
| **UART VESC RX** | GPIO 18 | 3.3V TTL | Résistance série 220Ω |
| **I2C IMU SDA** | GPIO 8 | 3.3V Open-Drain | Pull-up 4.7kΩ |
| **I2C IMU SCL** | GPIO 9 | 3.3V Open-Drain | Pull-up 4.7kΩ |
| **SPI CS Caméra** | GPIO 10 | 3.3V Push-Pull | Court chemin blindé |
| **Alimentation ADC Batterie** | GPIO 1 | Analog 0-3.1V | Diviseur 100kΩ / 10kΩ |
| **Arrêt d'Urgence (E-Stop)** | GPIO 21 | Entrée Interruption | Pull-up interne + Condo 100nF |
    `,
  },
  {
    id: 'gotcha-04',
    title: 'Tolérances d\'Assemblage Hybride : Bois CNC & Pièces 3D',
    category: 'cnc_timber',
    badge: 'FABRICATION LAB',
    readTime: '4 min',
    summary: 'Comment anticiper la dilatation du bois et la rétractation du plastique PETG pour un emboîtement sans jeu.',
    keyPoints: [
      'Prévoir un jeu d\'emboîtement (clearance) de 0.25mm entre les tenons en bois et les alésages 3D en PETG.',
      'Insérer des inserts filetés laiton M3/M4 à chaud dans le plastique plutôt que de visser directement dans le bois.',
      'Orientation d\'impression des pièces soumises à flexion : toujours imprimer les couches parallèlement aux efforts de traction.',
      'Les angles intérieurs usinés à la fraiseuse CNC ont un rayon égal au rayon de la fraise : prévoir des dog-bones (dégagements) dans le dessin CAD !',
    ],
    deepDiveMarkdown: `
### Usinage des Dog-Bones pour assemblages par tenon-mortaise
Puisqu'une fraise cylindrique de 3.175mm ne peut pas usiner un coin à angle droit intérieur parfait (rayon résiduel de 1.58mm), les pièces imprimées à coins vifs ne rentreront pas !
Dans votre logiciel de FAO (Fusion 360 ou CamBam), activez l'option **"Corner Overcut / Dogbone"** avec un dépassement de 0.5mm dans chaque coin intérieur.
    `,
  },
];

export const INITIAL_DEV_TEAM: DevTeamMember[] = [
  {
    id: 'team-01',
    name: 'Alexandre Roy',
    role: 'Lead Mécatronique & Châssis Bois',
    avatar: 'AR',
    color: '#FF7A00',
    status: 'online',
    currentActivity: 'En train de finaliser le support de batterie étanche pour le Mud-Crawler MK.1',
  },
  {
    id: 'team-02',
    name: 'Sarah Chen',
    role: 'Ingénieure Edge AI & Vision',
    avatar: 'SC',
    color: '#00E5FF',
    status: 'online',
    currentActivity: 'Quantification du modèle YOLO-nano pour l\'ESP32-S3 du Sprout-Guard',
  },
  {
    id: 'team-03',
    name: 'Marc Tremblay',
    role: 'Architecte Firmware & Électronique',
    avatar: 'MT',
    color: '#10B981',
    status: 'busy',
    currentActivity: 'Test du bus CAN et protocole VESC sur banc de puissance 24V',
  },
  {
    id: 'team-04',
    name: 'Thomas Vane',
    role: 'Spécialiste CAD & Réducteurs Cycloïdes',
    avatar: 'TV',
    color: '#D4A373',
    status: 'in_cad',
    currentActivity: 'Simulation par éléments finis des disques cycloïdes du Timber-Arm',
  },
];

export const INITIAL_DEV_COMMENTS: DevComment[] = [
  {
    id: 'comm-01',
    projectId: 'mud-crawler',
    componentId: 'comp-mc-01',
    authorName: 'Alexandre Roy',
    authorRole: 'Lead Mécatronique',
    timestamp: 'Il y a 2h',
    text: 'J\'ai reçu les deux moteurs brushless d\'AliExpress. L\'arbre est bien de 8mm avec méplat, mais prévoyez du frein-filet Loctite 243 bleu sur les vis de fixation de la plaque de bois car les vibrations en terre meuble sont intenses !',
    likes: 4,
    tag: 'tested',
  },
  {
    id: 'comm-02',
    projectId: 'mud-crawler',
    componentId: 'comp-mc-06',
    authorName: 'Sarah Chen',
    authorRole: 'Edge AI & Vision',
    timestamp: 'Il y a 5h',
    text: 'Pour le LiDAR optionnel, le modèle D200 sur AliExpress fonctionne bien avec le pilote micro-ROS, mais attention : la lentille optique prend la poussière fine. J\'ai dessiné un chapeau déflecteur 3D imprimé en TPU.',
    likes: 6,
    tag: 'aliexpress_deal',
  },
  {
    id: 'comm-03',
    projectId: 'sprout-guard',
    componentId: 'comp-sg-01',
    authorName: 'Marc Tremblay',
    authorRole: 'Firmware & Électronique',
    timestamp: 'Hier à 18:30',
    text: 'Attention aux servomoteurs 35kg.cm : même étanches, lors des pics de couple pour se relever de la boue, ils tirent jusqu\'à 2.8A unitaire. Il nous faut impérativement un convertisseur Buck dédié de 5V 15A séparé pour les 8 servos.',
    likes: 8,
    tag: 'alert',
  },
  {
    id: 'comm-04',
    projectId: 'timber-arm',
    componentId: 'comp-ta-01',
    authorName: 'Thomas Vane',
    authorRole: 'CAD & Cycloïdes',
    timestamp: 'Hier à 14:10',
    text: 'Les moteurs boucle fermée NEMA 17 sont arrivés. Le pilote intégré compense le jeu immédiatement. On a 0.02° de répétabilité sur le banc d\'essai ! On peut lancer la découpe du noyer.',
    likes: 5,
    tag: 'suggestion',
  },
];

export const INITIAL_DEV_ACTIVITIES: DevActivity[] = [
  {
    id: 'act-01',
    userName: 'Alexandre Roy',
    action: 'a validé le composant',
    detail: 'Moteurs Brushless 24V 350W marqués comme "Reçu en labo"',
    timestamp: 'Il y a 35 min',
    type: 'component',
  },
  {
    id: 'act-02',
    userName: 'Sarah Chen',
    action: 'a ajouté une ressource IA',
    detail: 'YOLOv8-Nano Quantifié INT8 pour ESP32-S3 (ESP-DL)',
    timestamp: 'Il y a 2h',
    type: 'resource',
  },
  {
    id: 'act-03',
    userName: 'Marc Tremblay',
    action: 'a complété le jalon',
    detail: 'Banc de puissance ESC 24V & moteurs brushless (Mud-Crawler)',
    timestamp: 'Il y a 4h',
    type: 'milestone',
  },
  {
    id: 'act-04',
    userName: 'Thomas Vane',
    action: 'a posté une note technique',
    detail: 'Recommandation frein-filet et tolérance cycloïde noyer',
    timestamp: 'Il y a 6h',
    type: 'comment',
  },
];

export const INITIAL_DEV_CHECKLIST: DevChecklistItem[] = [
  { id: 'chk-01', label: 'Joints toriques TPU 85A inspectés et graissés à la graisse silicone neutre', category: 'sealing', completed: true, checkedBy: 'Alex' },
  { id: 'chk-02', label: 'Membrane respirante en ePTFE (Gore-Tex) installée sur le caisson moteur', category: 'sealing', completed: true, checkedBy: 'Alex' },
  { id: 'chk-03', label: 'Tension de batterie LiFePO4 mesurée > 26.4V (cellules équilibrées à ±10mV)', category: 'power', completed: true, checkedBy: 'Marc' },
  { id: 'chk-04', label: 'Bouton d\'arrêt d\'urgence physique (E-Stop coupure matériel) testé sous charge', category: 'failsafe', completed: true, checkedBy: 'Marc' },
  { id: 'chk-05', label: 'Failsafe radio/Wi-Fi : coupure automatique des gaz si perte de signal > 500ms', category: 'failsafe', completed: false },
  { id: 'chk-06', label: 'Vis de serrage des pignons et arbres moteurs freinées au Loctite 243', category: 'electronics', completed: true, checkedBy: 'Thomas' },
  { id: 'chk-07', label: 'Caméra et lentilles nettoyées et traitées avec spray hydrophobe anti-glaise', category: 'sealing', completed: false },
  { id: 'chk-08', label: 'Courant de veille mesuré < 15mA lors de la mise en sommeil', category: 'power', completed: false },
];

// ---------------- OUTILS & AGENT DE VEILLE QUOTIDIENNE ----------------

export interface DevTool {
  id: string;
  name: string;
  category: 'cad_cam' | 'firmware_mcu' | 'electronics_sim' | 'ai_vision' | 'sourcing_tracking';
  url: string;
  description: string;
  badge: string;
  recommendedFor: string;
  pricing: 'Gratuit' | 'Freemium' | 'Open-Source';
  lastChecked: string;
  versionOrTag?: string;
}

export interface DevAgentDiscovery {
  id: string;
  title: string;
  category: DevTool['category'];
  url: string;
  source: string;
  description: string;
  recommendedFor: string;
  relevanceScore: number; // e.g. 96 (%)
  discoveredDate: string;
  status: 'pending' | 'accepted' | 'dismissed';
}

export interface DevAgentScanReport {
  id: string;
  timestamp: string;
  date: string;
  status: 'completed' | 'in_progress';
  sourcesChecked: string[];
  findingsCount: number;
  summary: string;
  durationMs: number;
}

export const INITIAL_DEV_TOOLS: DevTool[] = [
  // --- CAD, CAM & Usinage Bois CNC ---
  {
    id: 'tool-01',
    name: 'Onshape Free CAD',
    category: 'cad_cam',
    url: 'https://www.onshape.com/en/products/free',
    description: 'CAO paramétrique 100% dans le navigateur avec contrôle de version de type Git et modélisation collaborative en direct pour équipes de robotique.',
    badge: 'Standard Lab',
    recommendedFor: 'Conception boîtiers étanches et flasques en noyer',
    pricing: 'Gratuit',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Web Cloud v2026',
  },
  {
    id: 'tool-02',
    name: 'OpenBuilds CONTROL & CAM',
    category: 'cad_cam',
    url: 'https://software.openbuilds.com/',
    description: 'Générateur de G-code rapide et contrôleur CNC temps-réel avec prévisualisation des trajectoires de fraisage et compensation de rayon d\'outil.',
    badge: 'Usinage CNC',
    recommendedFor: 'Découpe CNC des plaques de bouleau 18mm et dog-bones',
    pricing: 'Open-Source',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'v1.0.370',
  },
  {
    id: 'tool-03',
    name: 'FreeCAD + Cycloid Gearbox Workbench',
    category: 'cad_cam',
    url: 'https://www.freecad.org/',
    description: 'Modeleur 3D paramétrique libre disposant d\'un atelier mathématique pour tracer les courbes épicycloïdales exactes sans jeu d\'engrenage.',
    badge: 'Zéro-Jeu',
    recommendedFor: 'Tracé des réducteurs cycloïdaux 40:1 pour The Timber-Arm',
    pricing: 'Open-Source',
    lastChecked: 'Hier',
    versionOrTag: 'v1.0 Release Candidate',
  },

  // --- Firmware, MCU & Débogage ---
  {
    id: 'tool-04',
    name: 'PlatformIO IDE',
    category: 'firmware_mcu',
    url: 'https://platformio.org/',
    description: 'Écosystème de développement multi-cibles de nouvelle génération pour ESP32-S3, Teensy 4.1 et STM32 avec gestion unifiée des dépendances et du débogage JTAG.',
    badge: 'Essentiel Code',
    recommendedFor: 'Compilation rapide C++ et flashage multi-cartes',
    pricing: 'Open-Source',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Core v6.1.15',
  },
  {
    id: 'tool-05',
    name: 'ESP Web Flasher (Espressif)',
    category: 'firmware_mcu',
    url: 'https://espressif.github.io/esptool-js/',
    description: 'Téléversement officiel de binaire firmware sur ESP32 directement depuis le navigateur Web via l\'API Web Serial, sans installer de drivers Python.',
    badge: 'Zero-Install',
    recommendedFor: 'Mise à jour rapide du firmware en extérieur avec un laptop',
    pricing: 'Gratuit',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Web Serial API',
  },
  {
    id: 'tool-06',
    name: 'VESC Tool Official',
    category: 'firmware_mcu',
    url: 'https://vesc-project.com/',
    description: 'Logiciel de calibration et d\'auto-apprentissage du contrôle FOC moteur brushless. Détecte la résistance statorique et la constante de flux en 15 secondes.',
    badge: 'Moteurs Boue',
    recommendedFor: 'Tuning de couple bas régime pour le Mud-Crawler dans la glaise',
    pricing: 'Open-Source',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'v6.02 Stable',
  },

  // --- Électronique, Simulation & PCB ---
  {
    id: 'tool-07',
    name: 'Wokwi ESP32 Virtual Simulator',
    category: 'electronics_sim',
    url: 'https://wokwi.com/',
    description: 'Simulateur matériel dans le navigateur permettant d\'exécuter le code de l\'ESP32-S3 avec OLED SSD1306, servomoteurs, capteurs ultrason et logique Wi-Fi.',
    badge: 'Simulation Pure',
    recommendedFor: 'Test du code des animations OLED de Little Muddy sans carte physique',
    pricing: 'Freemium',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Web Sim',
  },
  {
    id: 'tool-08',
    name: 'KiCad EDA Suite',
    category: 'electronics_sim',
    url: 'https://www.kicad.org/',
    description: 'Conception de schémas de principe et routage de cartes de puissance 24V jusqu\'à 40A avec calcul automatique des largeurs de pistes en cuivre.',
    badge: 'Grade Pro',
    recommendedFor: 'Routage de la carte de distribution batterie et fusibles',
    pricing: 'Open-Source',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'v8.0.5',
  },
  {
    id: 'tool-09',
    name: 'CircuitJS / Falstad Simulator',
    category: 'electronics_sim',
    url: 'https://www.falstad.com/circuit/',
    description: 'Simulateur interactif visuel des flux d\'électrons pour tester les ponts en H, les convertisseurs Buck 24V vers 5V et les diodes de roue libre.',
    badge: 'Interactif',
    recommendedFor: 'Vérification du filtrage anti-parasite avant fabrication',
    pricing: 'Open-Source',
    lastChecked: 'Hier',
    versionOrTag: 'Web JS',
  },

  // --- IA Embarquée, Vision & Datasets ---
  {
    id: 'tool-10',
    name: 'Roboflow Universe & Dataset Annotator',
    category: 'ai_vision',
    url: 'https://roboflow.com/',
    description: 'Plateforme d\'annotation assistée par IA et d\'augmentation d\'images (rotation, boue, reflets de soleil) pour entraîner des réseaux YOLO.',
    badge: 'Dataset IA',
    recommendedFor: 'Création du dataset de détection de mauvaises herbes Sprout-Guard',
    pricing: 'Freemium',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Cloud Platform',
  },
  {
    id: 'tool-11',
    name: 'Edge Impulse Studio',
    category: 'ai_vision',
    url: 'https://www.edgeimpulse.com/',
    description: 'Pipeline complet de TinyML pour quantifier les réseaux neuronaux en INT8 et générer une bibliothèque C++ ultra-optimisée pour le core NPU ESP32-S3.',
    badge: 'Sub-Watt AI',
    recommendedFor: 'Inférer le modèle YOLO-nano en moins de 0.85W d\'énergie',
    pricing: 'Freemium',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'v2026',
  },

  // --- Sourcing, Veille Prix & Composants ---
  {
    id: 'tool-12',
    name: 'Octopart Electronic Component Search',
    category: 'sourcing_tracking',
    url: 'https://octopart.com/',
    description: 'Moteur de recherche mondial interrogeant les stocks et prix de Mouser, DigiKey, LCSC et Farnell en temps réel avec accès aux datasheets certifiées.',
    badge: 'Veille Prix',
    recommendedFor: 'Vérifier la disponibilité des puces ESP32-S3 officielles',
    pricing: 'Gratuit',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'API Global Search',
  },
  {
    id: 'tool-13',
    name: 'AliPrice / AliExpress Price Tracker',
    category: 'sourcing_tracking',
    url: 'https://www.aliprice.com/',
    description: 'Historique des prix et évaluation de la fiabilité des vendeurs sur AliExpress pour détecter les faux rabais et les contrefaçons de moteurs brushless.',
    badge: 'Anti-Arnaque',
    recommendedFor: 'Comparer les prix réels des moteurs 24V et batteries LiFePO4',
    pricing: 'Gratuit',
    lastChecked: 'Aujourd\'hui',
    versionOrTag: 'Extension & Web',
  },
];

export const INITIAL_DEV_DISCOVERIES: DevAgentDiscovery[] = [
  {
    id: 'disc-01',
    title: 'FastCycloid 2D/3D (Web App DXF & STEP Export)',
    category: 'cad_cam',
    url: 'https://github.com',
    source: 'GitHub Releases / Trending Robotics',
    description: 'Nouveau générateur web autonome calculant le profil de disque cycloïde équilibré à double excentrique avec export direct en DXF pour découpeuse laser ou CNC.',
    recommendedFor: 'Idéal pour accélérer la conception du réducteur du Timber-Arm sans lancer de script Python lourd.',
    relevanceScore: 98,
    discoveredDate: 'Aujourd\'hui (Rapport 06:15)',
    status: 'pending',
  },
  {
    id: 'disc-02',
    title: 'ESP-IDF v5.3.1 : Hotfix Pilote SPI Octal & Mode Deep-Sleep 8µA',
    category: 'firmware_mcu',
    url: 'https://github.com/espressif/esp-idf/releases',
    source: 'Espressif Systems Release Feed',
    description: 'Correction majeure d\'une corruption mémoire sur le bus PSRAM Octal et gain de 35% d\'autonomie en veille prolongée pour les capteurs autonomes.',
    recommendedFor: 'Crucial pour Sprout-Guard pour prolonger l\'autonomie sur batterie LiFePO4 pendant les journées nuageuses.',
    relevanceScore: 95,
    discoveredDate: 'Aujourd\'hui (Rapport 06:15)',
    status: 'pending',
  },
  {
    id: 'disc-03',
    title: 'MudTread 95A : Profil de Crampons Paramétrique Auto-Décrottant',
    category: 'cad_cam',
    url: 'https://printables.com',
    source: 'Printables Outdoor Robotics Lab',
    description: 'Modèle paramétrique de crampons en TPU avec profil à angles dégressifs éjectant naturellement l\'argile humide par force centrifuge dès 1.2 m/s.',
    recommendedFor: 'Évite le patinage du Mud-Crawler MK.1 dans la terre grasse.',
    relevanceScore: 92,
    discoveredDate: 'Aujourd\'hui (Rapport 06:15)',
    status: 'pending',
  },
];

export const INITIAL_DEV_SCAN_REPORTS: DevAgentScanReport[] = [
  {
    id: 'rep-01',
    timestamp: '2026-09-26 06:15:00 UTC',
    date: 'Aujourd\'hui',
    status: 'completed',
    sourcesChecked: [
      'GitHub (ESP-IDF, micro-ROS, VESC, PlatformIO)',
      'ArXiv (Edge AI, Robotics SLAM, Soil Traction)',
      'Printables & Thingiverse (Rugged Robotics CAD)',
      'AliExpress & LCSC Component Price Watch',
      'Hackaday Research Network',
    ],
    findingsCount: 3,
    summary: 'Veille quotidienne complétée avec succès en 3.4s. 18 sources scannées. 3 nouvelles découvertes à fort impact technique identifiées (Générateur Cycloïde DXF, Patch ESP-IDF 8µA, Crampons TPU anti-bourrage).',
    durationMs: 3420,
  },
];

