import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { NavigationHUD } from './components/NavigationHUD';
import { HeroScene } from './components/HeroScene';
import { HeroHUD } from './components/HeroHUD';
import { ExplodedViewSection } from './components/ExplodedViewSection';
import { ProjectHangar } from './components/ProjectHangar';
import { BlueprintGenerator } from './components/BlueprintGenerator';
import { EngineeringManifesto } from './components/EngineeringManifesto';
import { DirtyFooter } from './components/DirtyFooter';
import { soundController } from './components/AudioController';
import { DevSpaceProvider, useDevSpace } from './context/DevSpaceContext';
import { DevSpaceModal } from './components/DevSpace/DevSpaceModal';
import { DevPasscodeModal } from './components/DevSpace/DevPasscodeModal';
import { Wrench, ChevronDown, Layers, ArrowRight, Lock } from 'lucide-react';

function MudBotApp() {
  const { isUnlocked, setIsUnlocked, setIsOpen } = useDevSpace();
  const [showPasscode, setShowPasscode] = useState(false);

  const handleOpenDevSpace = () => {
    soundController.playMechanicalClick();
    if (isUnlocked) {
      setIsOpen(true);
    } else {
      setShowPasscode(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-void text-steel-light selection:bg-cyan/30 selection:text-cyan font-sans overflow-x-hidden">
      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Sticky Navigation HUD */}
      <NavigationHUD />

      {/* 1. HERO SECTION — ZERO-G WORKSHOP DISRUPTION */}
      <section id="hero" className="relative min-h-screen pt-20 pb-16 flex flex-col justify-between overflow-hidden">
        {/* Subtle Background Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber/10 via-mud/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* 3D WebGL Canvas Scene & Floating Debris */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          <HeroScene />
          <HeroHUD />
        </div>

        {/* HERO TITLE & CALL TO ACTIONS OVERLAY */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 bg-void-card/75 border border-steel-border/60 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            {/* Title & Tagline */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-sm bg-amber shadow-glow-amber animate-pulse" />
                <span className="text-xs font-mono text-amber tracking-widest uppercase font-semibold">
                  AVANT-GARDE BACKYARD ROBOTICS RESEARCH LAB
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-steel-light leading-none">
                MUD <span className="text-amber">&amp;</span> BOT
              </h1>

              <div className="mt-2 text-sm sm:text-base font-mono tracking-widest text-cyan font-bold uppercase">
                // BRAND MOTTO: "BUILT FOR A DIRTY FUTURE"
              </div>

              <p className="mt-4 text-steel/90 text-sm sm:text-base leading-relaxed font-sans">
                Fusing CNC-milled hardwood timber, high-strain sacrificial 3D prints, and autonomous edge neural networks. We engineer rugged survival machines designed to conquer clay trenches, garden loam, and rough terrain without clinical clean rooms.
              </p>
            </div>

            {/* CTAs & Quick Telemetry Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
              {/* DEV PORTAL BUTTON (PRIMARY NEW FEATURE) */}
              <button
                onClick={handleOpenDevSpace}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber/25 via-mud/50 to-cyan/25 hover:from-amber/35 hover:to-cyan/35 border-2 border-amber hover:border-amber-bright text-amber font-mono text-xs font-bold rounded-xl transition shadow-glow-amber active:scale-95 text-center group"
              >
                <Lock className="w-4 h-4 text-amber group-hover:scale-110 transition-transform" />
                <span>ESPACE DÉVELOPPEUR // BOM &amp; IA</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-void-deep/80 rounded border border-amber/40 text-cyan">
                  PRIVÉ
                </span>
              </button>

              <a
                href="#project-hangar"
                onClick={() => soundController.playHydraulic()}
                className="flex items-center justify-center gap-2.5 px-6 py-3 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-xl transition shadow-glow-amber active:scale-95 text-center"
              >
                <span>EXPLORE FLEET HANGAR</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#exploded-view"
                onClick={() => soundController.playMechanicalClick()}
                className="flex items-center justify-center gap-2.5 px-6 py-3 bg-void border border-steel-border/80 hover:border-cyan text-steel-light font-mono text-xs font-semibold rounded-xl transition hover:text-cyan active:scale-95 text-center"
              >
                <Layers className="w-4 h-4 text-cyan" />
                <span>INSPECT 3D ARCHITECTURE</span>
              </a>

              <a
                href="#diy-blueprint"
                onClick={() => soundController.playTerminalChirp()}
                className="flex items-center justify-center gap-2.5 px-6 py-2 bg-void-card/60 border border-steel-border/50 hover:border-timber text-timber font-mono text-xs rounded-xl transition text-center"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>CONFIGURE DIY ROBOT</span>
              </a>
            </div>
          </div>

          {/* KEY TELEMETRY METRIC BADGES STRIP */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono text-xs">
            <div className="p-3 rounded-xl bg-void-card/60 border border-steel-border/50">
              <span className="text-[10px] text-steel/60">CYCLOIDAL REDUCTION</span>
              <div className="text-base font-bold text-cyan mt-0.5">40:1 RATIO</div>
            </div>
            <div className="p-3 rounded-xl bg-void-card/60 border border-steel-border/50">
              <span className="text-[10px] text-steel/60">SUBMERSION RESISTANCE</span>
              <div className="text-base font-bold text-timber mt-0.5">IP67 CLAY-LOAM</div>
            </div>
            <div className="p-3 rounded-xl bg-void-card/60 border border-steel-border/50">
              <span className="text-[10px] text-steel/60">EDGE AI CONSUMPTION</span>
              <div className="text-base font-bold text-amber mt-0.5">0.85W SUB-WATT</div>
            </div>
            <div className="p-3 rounded-xl bg-void-card/60 border border-steel-border/50">
              <span className="text-[10px] text-steel/60">TIMBER SHOCK ABSORPTION</span>
              <div className="text-base font-bold text-emerald-400 mt-0.5">8.4x VS CARBON</div>
            </div>
          </div>
        </div>

        {/* SCROLL DOWN INDICATOR */}
        <div className="mt-8 flex justify-center">
          <a
            href="#exploded-view"
            onClick={() => soundController.playHydraulic()}
            className="flex flex-col items-center gap-1 text-[11px] font-mono text-steel/60 hover:text-amber transition"
          >
            <span>SCROLL TO DECONSTRUCT</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber" />
          </a>
        </div>
      </section>

      {/* 2. EXPLODED VIEW ARCHITECTURE SECTION */}
      <ExplodedViewSection />

      {/* 3. THE PROJECT HANGAR BENTO GRID */}
      <ProjectHangar />

      {/* 4. INTERACTIVE DIY BLUEPRINT GENERATOR */}
      <BlueprintGenerator />

      {/* 5. THE DIRT DOCTRINE & ENGINEERING MANIFESTO */}
      <EngineeringManifesto />

      {/* 6. FOOTER — DIRTY TELEMETRY */}
      <DirtyFooter />

      {/* FLOATING TACTICAL DEV PORTAL ACCESS PILL */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenDevSpace}
          className="flex items-center gap-3 px-4 py-3 bg-void-card/95 hover:bg-void-deep border-2 border-amber hover:border-amber-bright text-steel-light rounded-2xl backdrop-blur-xl shadow-glow-amber transition-all duration-300 hover:scale-105 active:scale-95 group"
          title="Ouvrir l'Espace Développeur Privé (BOM, AliExpress, Modèles IA, Gotchas)"
        >
          <div className="w-8 h-8 rounded-xl bg-amber/20 border border-amber/50 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-amber animate-pulse group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left font-mono">
            <div className="flex items-center gap-1.5 text-[9px] text-cyan font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-glow-cyan" />
              <span>CADENAS // ACCÈS PRIVÉ</span>
            </div>
            <div className="text-xs font-bold text-amber group-hover:text-amber-bright">
              ESPACE DEV &amp; BOM
            </div>
          </div>
        </button>
      </div>

      {/* DEV SPACE MASTER MODAL */}
      <DevSpaceModal />

      {/* PASSCODE AUTHENTICATION DIALOG */}
      <DevPasscodeModal
        isOpen={showPasscode}
        onClose={() => setShowPasscode(false)}
        onSuccess={() => {
          setIsUnlocked(true);
          setShowPasscode(false);
          setIsOpen(true);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <DevSpaceProvider>
      <MudBotApp />
    </DevSpaceProvider>
  );
}

export default App;
