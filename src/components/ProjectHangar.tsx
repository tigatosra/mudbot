import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HANGAR_PROJECTS, type HangarProject } from '../data/hangarProjects';
import { soundController } from './AudioController';
import { Activity, ChevronRight, X, Download, ShoppingCart } from 'lucide-react';
import { useDevSpace } from '../context/DevSpaceContext';
import { DevPasscodeModal } from './DevSpace/DevPasscodeModal';

interface TiltState {
  x: number;
  y: number;
}

export function ProjectHangar() {
  const [selectedProject, setSelectedProject] = useState<HangarProject | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'alert' | 'muddy' | 'sleep'>('happy');
  const [showPasscode, setShowPasscode] = useState(false);

  const { setIsOpen, isUnlocked, setIsUnlocked, setActiveProjectId, setActiveTab } = useDevSpace();

  // Interactive Bento Card with 3D Mouse Parallax Tilt
  const BentoCard = ({ project, isFeatured = false }: { project: HangarProject; isFeatured?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -14, y: x * 14 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      soundController.playHydraulic();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          soundController.playMechanicalClick(950);
          setSelectedProject(project);
        }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'scale3d(1.015, 1.015, 1.015)' : 'scale3d(1, 1, 1)'}`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-void-card/90 backdrop-blur-md shadow-xl transition-all duration-300 ${
          isFeatured ? 'lg:col-span-8' : 'lg:col-span-4'
        } ${isHovered ? 'border-amber shadow-glow-amber' : 'border-steel-border/70'}`}
      >
        {/* AMBER WIREFRAME TACTICAL OVERLAY (ACTIVATES ON HOVER) */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Wireframe Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,122,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,122,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
          {/* Tactical Crosshair Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber" />
        </div>

        {/* IMAGE HERO CONTAINER */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-void-deep">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-card via-void-card/40 to-transparent" />

          {/* PROJECT STATUS CHIP */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-void/85 border border-steel-border/70 rounded text-[11px] font-mono backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-glow-cyan animate-pulse" />
            <span className="text-cyan font-bold">{project.tag}</span>
          </div>

          <div className="absolute top-4 right-4 z-10 px-2 py-0.5 bg-void/85 border border-amber/40 rounded text-[10px] font-mono text-amber">
            {project.code}
          </div>

          {/* SPECIAL INTERACTIVE MASCOT EMOTION CYCLER (FOR LITTLE MUDDY) */}
          {project.id === 'little-muddy' && (
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundController.playTerminalChirp();
                  const moods: ('happy' | 'alert' | 'muddy' | 'sleep')[] = ['happy', 'alert', 'muddy', 'sleep'];
                  const next = moods[(moods.indexOf(mascotMood) + 1) % moods.length];
                  setMascotMood(next);
                }}
                className="px-2.5 py-1 bg-void/90 border border-cyan/60 rounded text-[11px] font-mono text-cyan hover:bg-cyan/20 transition flex items-center gap-1.5"
              >
                <span>OLED: {mascotMood.toUpperCase()}</span>
                <span className="text-[12px]">
                  {mascotMood === 'happy' && '( ＾◡＾)'}
                  {mascotMood === 'alert' && '( ◉_◉ )'}
                  {mascotMood === 'muddy' && '( ~_~ )'}
                  {mascotMood === 'sleep' && '( -.- )zzZ'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* CARD CONTENT */}
        <div className="p-6 relative z-10">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-steel-light group-hover:text-amber transition-colors">
              {project.name}
            </h3>
            <span className="text-[11px] font-mono text-steel/60">
              FIRMWARE: {project.firmware.split('_')[0]}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-steel/80 leading-relaxed font-sans line-clamp-2">
            {project.description}
          </p>

          {/* REAL-TIME TELEMETRY STATS PILLS */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {project.stats.map((st, i) => (
              <div
                key={i}
                className="p-2 rounded bg-void/70 border border-steel-border/50 text-center flex flex-col justify-center"
              >
                <span className="text-[9px] font-mono text-steel/60 tracking-wider">
                  {st.label}
                </span>
                <div className="text-sm font-mono font-bold text-steel-light mt-0.5">
                  <span
                    className={
                      st.color === 'amber'
                        ? 'text-amber'
                        : st.color === 'cyan'
                        ? 'text-cyan'
                        : st.color === 'timber'
                        ? 'text-timber'
                        : 'text-steel-light'
                    }
                  >
                    {st.value}
                  </span>
                  {st.unit && <span className="text-[10px] text-steel/70 ml-1">{st.unit}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* LIVE MINI TELEMETRY GRAPH */}
          <div className="mt-5 p-3 rounded-xl bg-void-deep/80 border border-steel-border/60">
            <div className="flex items-center justify-between text-[10px] font-mono text-steel/70 mb-2">
              <span className="flex items-center gap-1.5 text-cyan">
                <Activity className="w-3 h-3 animate-pulse" />
                LIVE TORQUE &amp; VELOCITY OSCILLOSCOPE
              </span>
              <span className="text-amber font-semibold">100Hz TELEMETRY</span>
            </div>

            {/* SVG Dynamic Waveform */}
            <div className="h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none">
                <path
                  d="M0 25 Q 30 10, 60 22 T 120 15 T 180 30 T 240 18 T 300 24"
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="2"
                  className="opacity-90"
                />
                <path
                  d="M0 32 Q 40 25, 80 12 T 160 28 T 240 10 T 300 18"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="opacity-80"
                />
              </svg>
            </div>
          </div>

          {/* CARD FOOTER CTA */}
          <div className="mt-4 pt-3 border-t border-steel-border/40 flex items-center justify-between text-xs font-mono">
            <span className="text-steel/70 flex items-center gap-1">
              <span>EXPLORE CAD &amp; BOM</span>
            </span>
            <span className="text-amber font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>OPEN SPEC SHEET</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="project-hangar" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-void border-b border-steel-border/30">
      {/* Background Decorative Accent */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-amber shadow-glow-amber" />
              // SECTION 03: THE BACKYARD FLEET
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-steel-light tracking-tight">
              THE PROJECT <span className="text-cyan">HANGAR</span>
            </h2>
            <p className="mt-3 text-steel/80 max-w-2xl text-base sm:text-lg leading-relaxed font-sans">
              Autonomous muddy rovers, solar bio-sentinels, zero-backlash walnut arms, and the desk mascot that started it all. Built to take a beating in real soil.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-mono text-steel/60">HANGAR CAPACITY: 4 PROTOTYPES</div>
            <div className="text-xs font-mono text-cyan font-bold tracking-wider">ALL UNITS DEPLOYABLE</div>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <BentoCard project={HANGAR_PROJECTS[0]} isFeatured={true} />
          <BentoCard project={HANGAR_PROJECTS[1]} isFeatured={false} />
          <BentoCard project={HANGAR_PROJECTS[2]} isFeatured={false} />
          <BentoCard project={HANGAR_PROJECTS[3]} isFeatured={true} />
        </div>
      </div>

      {/* FULL PROJECT DETAIL & BOM MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-void-card border-2 border-amber/70 rounded-2xl overflow-y-auto p-6 sm:p-8 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-steel-border/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan/20 border border-cyan/50 text-cyan">
                  {selectedProject.code}
                </span>
                <h3 className="text-2xl font-display font-bold text-steel-light">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-steel hover:text-white hover:bg-void border border-steel-border/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Summary */}
            <div className="mt-5 p-4 rounded-xl bg-void-deep/80 border border-steel-border/60">
              <div className="text-[11px] font-mono text-amber font-semibold uppercase">
                // HARDWARE ARCHITECTURE
              </div>
              <p className="mt-1 text-sm font-mono text-steel-light">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="mt-4 text-sm text-steel/90 leading-relaxed font-sans">
              {selectedProject.description}
            </div>

            {/* Bill of Materials (BOM) Breakdown */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan tracking-wider font-semibold">
                  // VERIFIED BILL OF MATERIALS (BOM)
                </span>
                <span className="text-[11px] font-mono text-steel/60">OPEN-HARDWARE SPEC</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs bg-void-deep p-4 rounded-xl border border-steel-border/50">
                {selectedProject.bomSnippet.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-steel-light">
                    <span className="text-amber">[{i + 1}]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-steel-border/50 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-steel/70">
                FIRMWARE: <span className="text-cyan font-bold">{selectedProject.firmware}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    soundController.playMechanicalClick();
                    setActiveProjectId(selectedProject.id);
                    setActiveTab('bom');
                    if (isUnlocked) {
                      setIsOpen(true);
                    } else {
                      setShowPasscode(true);
                    }
                    setSelectedProject(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber/20 via-mud/40 to-cyan/20 hover:from-amber/30 hover:to-cyan/30 border border-amber/70 hover:border-amber text-amber font-mono text-xs font-bold rounded-lg transition active:scale-95 shadow-glow-amber"
                >
                  <ShoppingCart className="w-4 h-4 text-amber" />
                  <span>SOURCING ALIEXPRESS &amp; ESPACE DEV</span>
                </button>

                <button
                  onClick={() => {
                    soundController.playTerminalChirp();
                    const jsonStr = JSON.stringify(selectedProject, null, 2);
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedProject.id}-bom-spec.json`;
                    a.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-lg transition"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT BOM (.JSON)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* PASSCODE MODAL FALLBACK */}
      <DevPasscodeModal
        isOpen={showPasscode}
        onClose={() => setShowPasscode(false)}
        onSuccess={() => {
          setIsUnlocked(true);
          setShowPasscode(false);
          setIsOpen(true);
        }}
      />
    </section>
  );
}
