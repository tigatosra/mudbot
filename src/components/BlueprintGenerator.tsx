import { useState, useMemo } from 'react';
import { Download, Copy, Check, Sliders, Shield, Wrench, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundController } from './AudioController';

interface ConfigOptions {
  base: 'birch-slab' | 'plywood-frame' | 'driftwood';
  locomotion: 'tpu-tracks' | 'knobby-wheels' | 'quad-legs';
  brain: 'esp32-s3' | 'pico-w' | 'arduino';
  mission: 'quarry' | 'garden' | 'workshop' | 'mascot';
}

export function BlueprintGenerator() {
  const [config, setConfig] = useState<ConfigOptions>({
    base: 'birch-slab',
    locomotion: 'tpu-tracks',
    brain: 'esp32-s3',
    mission: 'quarry',
  });

  const [copied, setCopied] = useState(false);

  // Derived calculation metrics
  const metrics = useMemo(() => {
    let weight = 1200; // grams
    let printHours = 14;
    let cost = 65;
    let durability = 92;

    // Base impacts
    if (config.base === 'birch-slab') {
      weight += 650;
      cost += 18;
      durability += 4;
    } else if (config.base === 'plywood-frame') {
      weight += 380;
      cost += 12;
      durability += 2;
    } else if (config.base === 'driftwood') {
      weight += 820;
      cost += 0;
      durability += 6;
    }

    // Locomotion impacts
    if (config.locomotion === 'tpu-tracks') {
      weight += 450;
      printHours += 18;
      cost += 28;
      durability += 5;
    } else if (config.locomotion === 'knobby-wheels') {
      weight += 310;
      printHours += 9;
      cost += 16;
      durability += 1;
    } else if (config.locomotion === 'quad-legs') {
      weight += 580;
      printHours += 24;
      cost += 45;
      durability -= 2;
    }

    // Brain impacts
    if (config.brain === 'esp32-s3') {
      cost += 12;
      durability += 2;
    } else if (config.brain === 'pico-w') {
      cost += 6;
    } else if (config.brain === 'arduino') {
      cost += 18;
      durability += 4;
    }

    return {
      weight: (weight / 1000).toFixed(2),
      printHours,
      cost,
      durability: Math.min(99, durability),
    };
  }, [config]);

  // Generate ASCII wireframe schematic
  const asciiSchematic = useMemo(() => {
    const baseLabel =
      config.base === 'birch-slab'
        ? '[=== 18mm CNC BALTIC BIRCH ===]'
        : config.base === 'plywood-frame'
        ? '[#--# MARINE PLYWOOD FRAME #--#]'
        : '[~~~ RECLAIMED DRIFTWOOD CORE ~~~]';

    const locoLeft =
      config.locomotion === 'tpu-tracks'
        ? '====[TPU-TRACK]===='
        : config.locomotion === 'knobby-wheels'
        ? '  (O) KNOBBY (O)   '
        : '  /\\/\\ QUAD-LEG /\\/\\ ';

    const brainLabel =
      config.brain === 'esp32-s3'
        ? '[[ ESP32-S3 AI 240MHz ]]'
        : config.brain === 'pico-w'
        ? '[[ RASPBERRY PI PICO W ]]'
        : '[[ ARDUINO RUGGED 5V ]]' ;

    return `
+------------------------------------------------------+
|             MUD & BOT COMPILATION MATRIX             |
|                  REF: MUD-DIY-${config.mission.toUpperCase()}                    |
+------------------------------------------------------+
                     /\\
            [CYAN OLED VISOR POD]
                     ||
          +-----------------------+
          | ${brainLabel} |
          +-----------------------+
                     ||
       ${baseLabel}
       |     [INTERNAL SERVO BUS & LI-ION PACK]       |
       +-----------------------------------------------+
       |                                               |
  ${locoLeft}                    ${locoLeft}
+------------------------------------------------------+
| ESTIMATED DRY WEIGHT: ${metrics.weight} kg      PRINT: ${metrics.printHours}h  |
| ESTIMATED HARDWARE BOM: $${metrics.cost} USD   DURABILITY: ${metrics.durability}%  |
+------------------------------------------------------+
`;
  }, [config, metrics]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF7A00', '#00E5FF', '#D4A373', '#382212'],
    });
  };

  const handleDownloadJson = () => {
    soundController.playTerminalChirp();
    triggerConfetti();

    const data = {
      project: 'MUD_AND_BOT_CUSTOM_BUILD',
      generatedAt: new Date().toISOString(),
      config,
      metrics: {
        weightKg: metrics.weight,
        printTimeHours: metrics.printHours,
        estimatedCostUSD: metrics.cost,
        durabilityScore: `${metrics.durability}/100`,
      },
      bomItems: [
        { item: `Base Chassis Stock (${config.base})`, qty: 1, source: 'Local Lumber / CNC' },
        { item: `Locomotion Hardware (${config.locomotion})`, qty: 1, source: '3D Print TPU/PETG' },
        { item: `Micro-controller Brain (${config.brain})`, qty: 1, source: 'DigiKey / Maker Shop' },
        { item: 'High-Torque Metal Gear Servos / Motors', qty: 4, source: 'Standard 25kg-cm' },
        { item: 'Marine Grade Polyurethane Sealant', qty: '1 Can', source: 'Hardware Store' },
        { item: 'M3 Brass Heat-Set Inserts & Hex Bolts', qty: 30, source: 'Workshop Fasteners' },
      ],
      printGuidelines: {
        material: config.locomotion === 'tpu-tracks' ? 'TPU 95A + PETG' : 'PETG Only',
        infill: '40% Gyroid',
        walls: 5,
        nozzleTempC: 245,
        bedTempC: 80,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mudbot-diy-${config.base}-${config.locomotion}.json`;
    a.click();
  };

  const handleDownloadMarkdown = () => {
    soundController.playTerminalChirp();
    triggerConfetti();

    const mdContent = `# MUD & BOT // DIY BACKYARD ROBOT BLUEPRINT
**Motto:** "BUILT FOR A DIRTY FUTURE"
**Generated:** ${new Date().toLocaleDateString()}
**Ref Code:** MB-DIY-${config.mission.toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}

---

## 1. Selected Hardware Specifications
- **Base Chassis:** ${config.base.toUpperCase()}
- **Locomotion System:** ${config.locomotion.toUpperCase()}
- **Compute Unit:** ${config.brain.toUpperCase()}
- **Primary Mission Profile:** ${config.mission.toUpperCase()}

## 2. Engineering Telemetry Projections
- **Dry Chassis Weight:** ${metrics.weight} kg
- **Estimated 3D Print Time:** ${metrics.printHours} Hours
- **Estimated Total Hardware BOM:** $${metrics.cost} USD
- **Backyard Slurry Durability Index:** ${metrics.durability} / 100

## 3. Bill of Materials (BOM)
1. **Chassis Stock:** ${config.base === 'birch-slab' ? '18mm Baltic Birch Plywood Sheet' : config.base === 'plywood-frame' ? '12mm Marine-Grade Okoume Ply' : 'Aged dense hardwood driftwood piece'}
2. **Drive Pods:** ${config.locomotion === 'tpu-tracks' ? '2x Flexible TPU Shore 95A Continuous Treads + 4x PETG Hubs' : config.locomotion === 'knobby-wheels' ? '4x Deep Tread Mud Tires + Dual Bearings' : '4x 4-Bar CNC Linkage Legs with Brass Pivot Bushings'}
3. **Brain & Logic:** ${config.brain === 'esp32-s3' ? 'ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz (Micro-YOLO ready)' : config.brain === 'pico-w' ? 'Raspberry Pi Pico W (MicroPython / C++)' : 'Arduino Rugged ATMega328P (5V High Noise Rejection)'}
4. **Fasteners:** 30x M3 Stainless Steel Socket Cap Screws + 30x M3 Brass Heat-Set Threaded Inserts.
5. **Weatherproofing:** Marine Spar Varnish + Neutral Cure Silicone Gaskets.

## 4. 3D Print Instructions
\`\`\`text
Material: PETG (Chassis Brackets) / TPU 95A (Treads)
Infill: 40% Gyroid
Perimeters: 5 walls
Layer Height: 0.20mm
Print Orientation: Maximize shear strength along layer lines
\`\`\`

## 5. ASCII Schematic
\`\`\`text${asciiSchematic}\`\`\`
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mudbot-diy-blueprint.md`;
    a.click();
  };

  const handleCopy = () => {
    soundController.playTerminalChirp();
    navigator.clipboard.writeText(asciiSchematic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="diy-blueprint" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-void-light border-b border-steel-border/30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-cyan shadow-glow-cyan" />
              // SECTION 04: INTERACTIVE DIY BLUEPRINT GENERATOR
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-steel-light tracking-tight">
              COMPILE YOUR <span className="text-amber">BACKYARD MACHINE</span>
            </h2>
            <p className="mt-3 text-steel/80 max-w-2xl text-base sm:text-lg leading-relaxed font-sans">
              No clean rooms or expensive robotics labs required. Choose your rough wood foundation, printable joints, and offline edge brain to generate instant BOM &amp; print sheets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-steel/70">OPEN-HARDWARE SPEC // V2.4</span>
          </div>
        </div>

        {/* TERMINAL INTERFACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: SELECTION CONTROLS */}
          <div className="lg:col-span-6 space-y-6 bg-void-card/90 border border-steel-border/70 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            {/* STEP 1: CHOOSE BASE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-amber font-bold tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  01. FOUNDATION CHASSIS (WOODWORKING)
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'birch-slab', title: 'Birch Slab', desc: '18mm Solid CNC' },
                  { id: 'plywood-frame', title: 'Ply Skeleton', desc: 'Lightweight Ribs' },
                  { id: 'driftwood', title: 'Driftwood', desc: 'Artisanal Organic' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setConfig({ ...config, base: opt.id as ConfigOptions['base'] });
                      soundController.playMechanicalClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.base === opt.id
                        ? 'border-timber bg-timber/15 shadow-sm text-steel-light'
                        : 'border-steel-border/60 bg-void/60 text-steel hover:border-timber/50'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-steel-light">{opt.title}</div>
                    <div className="text-[10px] text-steel/70 font-mono mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: CHOOSE LOCOMOTION */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-cyan font-bold tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  02. LOCOMOTION SYSTEM (3D PRINT)
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'tpu-tracks', title: 'TPU Tracks', desc: 'Shore 95A Continuous' },
                  { id: 'knobby-wheels', title: 'Mud Wheels', desc: 'Self-Cleaning Rims' },
                  { id: 'quad-legs', title: 'Quad-Legs', desc: '4-Bar Articulated' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setConfig({ ...config, locomotion: opt.id as ConfigOptions['locomotion'] });
                      soundController.playMechanicalClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.locomotion === opt.id
                        ? 'border-cyan bg-cyan/15 shadow-glow-cyan text-steel-light'
                        : 'border-steel-border/60 bg-void/60 text-steel hover:border-cyan/50'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-steel-light">{opt.title}</div>
                    <div className="text-[10px] text-steel/70 font-mono mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: CHOOSE BRAIN */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-amber font-bold tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  03. COMPUTE &amp; NERVOUS CORE (EMBEDDED AI)
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'esp32-s3', title: 'ESP32-S3', desc: 'Dual-Core AI 240MHz' },
                  { id: 'pico-w', title: 'Pi Pico W', desc: 'MicroPython Dual M0' },
                  { id: 'arduino', title: 'Rugged 5V', desc: 'High Noise Tolerance' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setConfig({ ...config, brain: opt.id as ConfigOptions['brain'] });
                      soundController.playMechanicalClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.brain === opt.id
                        ? 'border-amber bg-amber/15 shadow-glow-amber text-steel-light'
                        : 'border-steel-border/60 bg-void/60 text-steel hover:border-amber/50'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-steel-light">{opt.title}</div>
                    <div className="text-[10px] text-steel/70 font-mono mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4: MISSION PROFILE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-steel-light font-bold tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-timber" />
                  04. MISSION PROFILE
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'quarry', title: 'Quarry Recon' },
                  { id: 'garden', title: 'Garden Sentry' },
                  { id: 'workshop', title: 'Shop Arm' },
                  { id: 'mascot', title: 'Desk Mascot' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setConfig({ ...config, mission: opt.id as ConfigOptions['mission'] });
                      soundController.playMechanicalClick();
                    }}
                    className={`py-2 px-3 rounded-lg border text-center font-mono text-xs transition ${
                      config.mission === opt.id
                        ? 'border-steel-light bg-steel-dark/60 text-steel-light font-bold'
                        : 'border-steel-border/50 bg-void/50 text-steel hover:text-white'
                    }`}
                  >
                    {opt.title}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE TELEMETRY PREVIEW METRICS */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-steel-border/60">
              <div className="p-2.5 rounded-lg bg-void/80 border border-steel-border/50 text-center">
                <div className="text-[9px] font-mono text-steel/60">DRY WEIGHT</div>
                <div className="text-sm font-mono font-bold text-steel-light mt-0.5">{metrics.weight} kg</div>
              </div>
              <div className="p-2.5 rounded-lg bg-void/80 border border-steel-border/50 text-center">
                <div className="text-[9px] font-mono text-steel/60">PRINT TIME</div>
                <div className="text-sm font-mono font-bold text-cyan mt-0.5">{metrics.printHours} hrs</div>
              </div>
              <div className="p-2.5 rounded-lg bg-void/80 border border-steel-border/50 text-center">
                <div className="text-[9px] font-mono text-steel/60">EST. BOM</div>
                <div className="text-sm font-mono font-bold text-amber mt-0.5">${metrics.cost}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-void/80 border border-steel-border/50 text-center">
                <div className="text-[9px] font-mono text-steel/60">DURABILITY</div>
                <div className="text-sm font-mono font-bold text-timber mt-0.5">{metrics.durability}%</div>
              </div>
            </div>
          </div>

          {/* RIGHT: SCHEMATIC VISUALIZER & EXPORT CONTROLS */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* TERMINAL CONTAINER */}
            <div className="bg-void-deep border border-steel-border/80 rounded-2xl p-6 shadow-2xl font-mono text-xs overflow-hidden relative">
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between border-b border-steel-border/50 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-steel/60 ml-2">MUD_COMPILER_V2.4.SH</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-steel hover:text-amber transition"
                  title="Copy schematic to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* ASCII Schematic Screen */}
              <pre className="text-cyan font-mono text-[11px] sm:text-xs leading-tight whitespace-pre overflow-x-auto p-2 bg-void/90 rounded-lg border border-cyan/20">
                {asciiSchematic}
              </pre>

              {/* Quick Spec Highlights */}
              <div className="mt-4 space-y-1.5 text-steel/80 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-amber">▸ FASTENERS:</span>
                  <span>M3 brass heat-set inserts (soldering iron installation).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan">▸ WATERPROOFING:</span>
                  <span>Marine spar polyurethane brush coat on timber edges.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-timber">▸ EDGE INFERENCE:</span>
                  <span>Pre-quantized INT8 neural model embedded in Flash.</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 pt-4 border-t border-steel-border/50 flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadJson}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-xl transition shadow-glow-amber active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD BOM (.JSON)</span>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-void-card border border-steel-border hover:border-cyan text-steel-light font-mono text-xs font-semibold rounded-xl transition hover:text-cyan active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT CUTSHEET (.MD)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
