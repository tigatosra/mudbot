import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Activity } from 'lucide-react';
import { soundController } from './AudioController';

interface HotspotDetail {
  id: string;
  layer: 'wood' | 'print' | 'ai';
  title: string;
  badge: string;
  lead: string;
  stats: { label: string; woodPrint: string; carbonAluminum: string }[];
  bulletPoints: string[];
  schematicNote: string;
}

const HOTSPOTS: HotspotDetail[] = [
  {
    id: 'backbone-shock',
    layer: 'wood',
    title: 'THE CNC BIRCH SPINE VS. BRITTLE CARBON FIBER',
    badge: 'LAYER 01 // CELLULAR IMPACT DAMPING',
    lead: 'Carbon fiber has extraordinary tensile strength in clean aerospace labs, but shatters catastrophically upon sudden point-impact against a granite boulder in a muddy backyard trench.',
    stats: [
      { label: 'IMPACT FRACTURE ENERGY', woodPrint: '48.5 kJ/m² (Ductile Flex)', carbonAluminum: '14.2 kJ/m² (Delamination)' },
      { label: 'VIBRATION ABSORPTION', woodPrint: '8.4x Harmonic Damping', carbonAluminum: '1.0x (Ringing Resonance)' },
      { label: 'BACKYARD FIELD REPAIR', woodPrint: 'Hand-saw / Wood Glue (10 min)', carbonAluminum: 'Total Replacement Required ($280)' },
    ],
    bulletPoints: [
      'Natural lignin and cellulose fibers yield microscopically under high G-forces without catastrophic crack propagation.',
      'Dampens motor harmonic buzz, preventing high-frequency noise from corrupting delicate inertial measurement sensors.',
      'Sustainably harvested Baltic Birch plywood with waterproof marine polyurethane sealant.',
    ],
    schematicNote: 'CNC Milling Tolerance: ±0.2mm on 18mm multi-ply stock with chamfered wire conduits.',
  },
  {
    id: 'sacrificial-joints',
    layer: 'print',
    title: 'SACRIFICIAL 3D CRUMPLE JOINTS & TPU COMPLIANCE',
    badge: 'LAYER 02 // RAPID ITERATION & DAMAGE CONTROL',
    lead: 'In heavy robotics, preventing damage is impossible; controlling where damage occurs is mastery. Our 3D printed PETG brackets act as intentional mechanical fuses.',
    stats: [
      { label: 'COMPONENT REPLACEMENT COST', woodPrint: '$0.42 (40g PETG filament)', carbonAluminum: '$85.00 (CNC Billet)' },
      { label: 'REPLACEMENT CYCLE TIME', woodPrint: '22 minutes (Local Bambu Lab)', carbonAluminum: '7–14 days (Machining order)' },
      { label: 'MUD & GRIT TOLERANCE', woodPrint: 'Self-cleaning TPU tooth gap', carbonAluminum: 'Seizes upon fine sand entry' },
    ],
    bulletPoints: [
      'Engineered shear pins sacrifice themselves during track stalls, saving the $120 high-torque brushless planetary motors.',
      'Shore 95A flexible TPU tracks absorb blunt stones and expand to shed wet sticky clay clods automatically.',
      'Custom infill gyroid patterns create internal strain relief channels that distribute torsional loads evenly.',
    ],
    schematicNote: 'Print Profile: 6 walls, 45% gyroid infill, 245°C nozzle for extreme layer adhesion.',
  },
  {
    id: 'edge-neural',
    layer: 'ai',
    title: 'OFFLINE EDGE AI NERVOUS SYSTEM (ESP32-S3)',
    badge: 'LAYER 03 // ZERO CLOUD DEPENDENCY',
    lead: 'Your backyard vegetable garden or distant quarry does not have enterprise Wi-Fi. Our robots think, calculate trajectories, and identify obstacles completely on-device.',
    stats: [
      { label: 'IDLE POWER CONSUMPTION', woodPrint: '0.85 Watts (Sub-Watt AI)', carbonAluminum: '45W (GPU SBC Module)' },
      { label: 'OFFLINE CONTINUITY', woodPrint: '100% Local Neural Inference', carbonAluminum: 'Fails without Cloud Gateway' },
      { label: 'BOOT TIME TO PATROL', woodPrint: '180 milliseconds', carbonAluminum: '45 seconds Linux OS' },
    ],
    bulletPoints: [
      'Dual-Core Xtensa LX7 running at 240MHz with vectorized neural instructions for micro-YOLO plant & obstacle recognition.',
      'Integrated CAN-Bus micro-transceivers communicating with brushless ESCs at 1 Mbit/s with zero OS overhead.',
      'Epoxy-potted waterproof conformal coating resists morning dew, mud splash, and acidic compost environments.',
    ],
    schematicNote: 'Firmware: Bare-metal FreeRTOS with micro-ROS telemetry pub/sub over RF mesh.',
  },
];

export function ExplodedViewSection() {
  const [explosionPercent, setExplosionPercent] = useState(65);
  const [activeLayer, setActiveLayer] = useState<'all' | 'wood' | 'print' | 'ai'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotDetail | null>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplosionPercent(val);
    soundController.playServoSweep();
  };

  const openHotspot = (h: HotspotDetail) => {
    soundController.playMechanicalClick(1020);
    setSelectedHotspot(h);
  };

  return (
    <section id="exploded-view" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-void-light border-y border-steel-border/30 overflow-hidden">
      {/* Background Grid & Atmospheric Noise */}
      <div className="absolute inset-0 bg-circuit-grid bg-[size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-cyan shadow-glow-cyan" />
              // SECTION 02: HARDWARE PHILOSOPHY & DECONSTRUCTION
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-steel-light tracking-tight">
              EXPLODED HYBRID <span className="text-amber">ARCHITECTURE</span>
            </h2>
            <p className="mt-3 text-steel/80 max-w-2xl text-base sm:text-lg leading-relaxed font-sans">
              Why high-tech backyard machines thrive when you discard aerospace carbon fiber in favor of CNC timber, sacrificial PETG crumple links, and sub-watt edge silicon.
            </p>
          </div>

          {/* LAYER FILTER TABS */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-void-card border border-steel-border/70 rounded-lg">
            {(['all', 'wood', 'print', 'ai'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveLayer(tab);
                  soundController.playMechanicalClick();
                }}
                className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-wider transition-all ${
                  activeLayer === tab
                    ? 'bg-amber text-void-deep font-bold shadow-glow-amber'
                    : 'text-steel hover:text-steel-light hover:bg-void/60'
                }`}
              >
                {tab === 'all' ? '// ALL LAYERS' : `LAYER: ${tab.toUpperCase()}`}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE EXPLODED STAGE & SLIDER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3D DECONSTRUCTED VISUALIZER */}
          <div className="lg:col-span-7 relative bg-void-deep/90 border border-steel-border/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Stage HUD Crosshairs */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              SPATIAL_DECONSTRUCTION: {explosionPercent}%
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-steel/50">
              AXIS: [Z-DEVIATION + Y-OFFSET]
            </div>

            {/* Exploded Layers Display (Visual 3D Stack with Perspective & Reactive Separation) */}
            <div className="relative h-[420px] sm:h-[480px] w-full flex items-center justify-center my-6 perspective-[1200px]">
              {/* LAYER 1: BACKBONE (CNC TIMBER) */}
              <motion.div
                animate={{
                  z: -explosionPercent * 1.4,
                  y: -explosionPercent * 0.5,
                  rotateX: 18 - explosionPercent * 0.1,
                  opacity: activeLayer === 'all' || activeLayer === 'wood' ? 1 : 0.25,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                className="absolute w-64 sm:w-80 h-44 rounded-xl border-2 border-timber/80 bg-gradient-to-br from-[#4A2F1B] to-[#25170B] shadow-2xl p-4 flex flex-col justify-between"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-timber font-bold tracking-widest px-2 py-0.5 bg-timber/10 border border-timber/30 rounded">
                    LAYER 01: CNC BIRCH
                  </span>
                  <button
                    onClick={() => openHotspot(HOTSPOTS[0])}
                    className="flex items-center gap-1 text-[11px] font-mono text-timber hover:text-amber bg-void-card/90 px-2.5 py-1 rounded border border-timber/50 hover:border-amber transition"
                  >
                    <span>INSPECT SPEC</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-center font-display font-bold text-timber-light text-base tracking-wide">
                  18mm CNC Milled Structural Spine
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-steel">
                  <span>DAMPING: 8.4x</span>
                  <span>FRACTURE: 48.5 kJ/m²</span>
                  <span>STOCK: BALTIC PLY</span>
                </div>
              </motion.div>

              {/* LAYER 2: 3D PRINTED JOINTS & TPU CRUMPLE LINKS */}
              <motion.div
                animate={{
                  z: 0,
                  y: 0,
                  rotateX: 18,
                  opacity: activeLayer === 'all' || activeLayer === 'print' ? 1 : 0.25,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                className="absolute w-72 sm:w-88 h-48 rounded-xl border-2 border-amber/90 bg-gradient-to-br from-[#3D1A04] to-[#1A0A02] shadow-2xl p-4 flex flex-col justify-between z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber font-bold tracking-widest px-2 py-0.5 bg-amber/15 border border-amber/40 rounded">
                    LAYER 02: HIGH-STRAIN 3D PRINT
                  </span>
                  <button
                    onClick={() => openHotspot(HOTSPOTS[1])}
                    className="flex items-center gap-1 text-[11px] font-mono text-amber hover:text-white bg-void-card/90 px-2.5 py-1 rounded border border-amber/50 hover:border-amber transition"
                  >
                    <span>INSPECT SPEC</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-center font-display font-bold text-amber-bright text-base tracking-wide">
                  PETG Sacrificial Crumple &amp; TPU Tracks
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-steel">
                  <span>COST: $0.42 / FUSE</span>
                  <span>INFILL: 45% GYROID</span>
                  <span>SHORE: 95A FLEX</span>
                </div>
              </motion.div>

              {/* LAYER 3: EDGE AI NERVOUS SYSTEM (ESP32-S3) */}
              <motion.div
                animate={{
                  z: explosionPercent * 1.5,
                  y: explosionPercent * 0.6,
                  rotateX: 18 + explosionPercent * 0.1,
                  opacity: activeLayer === 'all' || activeLayer === 'ai' ? 1 : 0.25,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                className="absolute w-64 sm:w-80 h-44 rounded-xl border-2 border-cyan/90 bg-gradient-to-br from-[#06242B] to-[#031115] shadow-2xl p-4 flex flex-col justify-between z-20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan font-bold tracking-widest px-2 py-0.5 bg-cyan/15 border border-cyan/40 rounded">
                    LAYER 03: EDGE SILICON NERVE
                  </span>
                  <button
                    onClick={() => openHotspot(HOTSPOTS[2])}
                    className="flex items-center gap-1 text-[11px] font-mono text-cyan hover:text-white bg-void-card/90 px-2.5 py-1 rounded border border-cyan/50 hover:border-cyan transition"
                  >
                    <span>INSPECT SPEC</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-center font-display font-bold text-cyan-bright text-base tracking-wide flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse text-cyan" />
                  ESP32-S3 Dual-Core AI Brain
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-steel">
                  <span>WATTS: 0.85W</span>
                  <span>OFFLINE: 100%</span>
                  <span>BOOT: 180ms</span>
                </div>
              </motion.div>
            </div>

            {/* DECONSTRUCTION SLIDER CONTROLS */}
            <div className="pt-4 border-t border-steel-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-2/3 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-steel/70">ASSEMBLED (0%)</span>
                  <span className="text-amber font-bold tracking-wider">SEPARATION: {explosionPercent}%</span>
                  <span className="text-steel/70">EXPLODED (100%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={explosionPercent}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-void rounded-lg appearance-none cursor-pointer accent-amber"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setExplosionPercent(prev => (prev === 0 ? 85 : 0));
                    soundController.playMechanicalClick();
                  }}
                  className="px-3 py-1.5 bg-void-card border border-steel-border hover:border-amber text-xs font-mono text-steel-light rounded transition"
                >
                  {explosionPercent === 0 ? '// FULL EXPLODE' : '// ASSEMBLE'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE HOTSPOT COMPARISON CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-xs font-mono text-amber tracking-wider uppercase mb-1">
              // SELECT AN ARCHITECTURAL HOTSPOT TO EXPAND
            </div>

            {HOTSPOTS.map(h => (
              <div
                key={h.id}
                onClick={() => openHotspot(h)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  selectedHotspot?.id === h.id
                    ? 'bg-void-card border-amber shadow-glow-amber'
                    : 'bg-void-card/60 border-steel-border/70 hover:border-amber/60 hover:bg-void-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-steel/60">
                    {h.badge}
                  </span>
                  <span className="text-xs font-mono text-amber font-semibold flex items-center gap-1">
                    <span>VIEW BRIEF</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="mt-1 text-base font-display font-bold text-steel-light">
                  {h.title}
                </h3>
                <p className="mt-2 text-xs text-steel/80 leading-relaxed font-sans line-clamp-2">
                  {h.lead}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MICRO-DRAWER MODAL */}
      <AnimatePresence>
        {selectedHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-void-card border-2 border-amber/70 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-steel-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber animate-pulse" />
                  <span className="text-xs font-mono text-amber tracking-widest">
                    {selectedHotspot.badge}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1.5 rounded-lg text-steel hover:text-white hover:bg-void border border-steel-border/50 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Lead */}
              <h3 className="mt-4 text-xl sm:text-2xl font-display font-bold text-steel-light">
                {selectedHotspot.title}
              </h3>
              <p className="mt-2 text-sm text-steel/90 leading-relaxed">
                {selectedHotspot.lead}
              </p>

              {/* Head-to-Head Comparison Table */}
              <div className="mt-6 border border-steel-border/80 rounded-xl overflow-hidden bg-void-deep/80">
                <div className="grid grid-cols-12 text-[11px] font-mono text-steel/70 bg-void-card/90 p-2.5 border-b border-steel-border/60 font-semibold">
                  <div className="col-span-5">METRIC / CRITERIA</div>
                  <div className="col-span-4 text-amber">MUD &amp; BOT (HYBRID)</div>
                  <div className="col-span-3 text-steel">AERO COMMERCIAL</div>
                </div>
                {selectedHotspot.stats.map((st, i) => (
                  <div key={i} className="grid grid-cols-12 text-xs font-mono p-2.5 border-b border-steel-border/30 last:border-b-0 items-center">
                    <div className="col-span-5 text-steel-light font-medium">{st.label}</div>
                    <div className="col-span-4 text-amber font-bold">{st.woodPrint}</div>
                    <div className="col-span-3 text-steel/70">{st.carbonAluminum}</div>
                  </div>
                ))}
              </div>

              {/* Architectural Key Takeaways */}
              <div className="mt-5 space-y-2">
                {selectedHotspot.bulletPoints.map((bp, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-steel/90 leading-relaxed font-sans">
                    <span className="text-cyan font-mono mt-0.5">▸</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>

              {/* Schematic Technical Note */}
              <div className="mt-6 p-3 bg-void/90 rounded-lg border border-steel-border/50 text-[11px] font-mono text-cyan/90 flex items-center justify-between">
                <span>CAD NOTE: {selectedHotspot.schematicNote}</span>
                <span className="text-[10px] text-steel">REF: MB-SPEC-404</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
