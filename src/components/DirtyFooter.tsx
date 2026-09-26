import React, { useState } from 'react';
import { Terminal, Send, ArrowUp, Radio, Lock } from 'lucide-react';
import { soundController } from './AudioController';
import { useDevSpace } from '../context/DevSpaceContext';
import { DevPasscodeModal } from './DevSpace/DevPasscodeModal';

export function DirtyFooter() {
  const [emailInput, setEmailInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const { isUnlocked, setIsUnlocked, setIsOpen } = useDevSpace();
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'MB-TELEMETRY KERNEL V2.4_DIRTY READY.',
    'LISTENING ON RF_MESH_PORT 8088...',
  ]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    soundController.playTerminalChirp();
    const newLogs = [
      ...terminalLogs,
      `> mudbot dispatch --add "${emailInput}"`,
      `[AUTH_OK] PGP KEY VERIFIED FOR FIELD RECON DISPATCH.`,
      `[DISPATCH] TRANSMITTING BACKYARD CAD PACK & FIRMWARE OTA TO: ${emailInput}`,
    ];
    setTerminalLogs(newLogs);
    setEmailInput('');
  };

  const scrollToTop = () => {
    soundController.playHydraulic();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void-deep text-steel border-t border-steel-border/50 py-16 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      {/* Background Decorative Mesh Pattern */}
      <div className="absolute inset-0 bg-circuit-grid bg-[size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* LEFT: BRAND EMBLEM & MOTTO */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-5">
              {/* ROTATING STAMPED SEAL (Sprout inside Cog + User Emblem) */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                {/* Rotating Outer Gear Teeth */}
                <div className="absolute inset-0 animate-spin-very-slow pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#FF7A00" strokeWidth="2" strokeDasharray="6 4" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#A2ACB6" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Center Official Emblem Avatar */}
                <div className="absolute inset-1.5 rounded-full overflow-hidden border-2 border-timber shadow-glow-amber bg-void">
                  <img
                    src="/images/mudbot-emblem.jpg"
                    alt="Mud and Bot Official Insignia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-steel-light tracking-tight">
                  MUD &amp; <span className="text-amber">BOT</span>
                </h3>
                <div className="text-xs font-mono text-cyan tracking-widest uppercase mt-0.5">
                  BUILT FOR A DIRTY FUTURE
                </div>
                <div className="text-[11px] font-mono text-steel/60 mt-1">
                  BACKYARD ROBOTICS RESEARCH LAB // SECTOR 04
                </div>
              </div>
            </div>

            <p className="text-sm text-steel/80 max-w-lg leading-relaxed font-sans">
              "Built with sawdust, molten PETG, and AI weights in the backyard lab." We reject sterile commercial toys in favor of open, field-repairable survival machines.
            </p>

            {/* LIVE SENSOR COORDINATES TELEMETRY */}
            <div className="p-3.5 rounded-xl bg-void-card border border-steel-border/60 font-mono text-xs max-w-lg">
              <div className="flex items-center justify-between text-steel/60 mb-1.5 text-[10px]">
                <span className="flex items-center gap-1.5 text-cyan">
                  <Radio className="w-3 h-3 animate-pulse" />
                  FIELD DISPATCH BEACON ACTIVE
                </span>
                <span>PING: 14ms</span>
              </div>
              <div className="text-steel-light text-[11px] flex flex-wrap gap-x-4 gap-y-1">
                <span>LAT: 45.4215° N</span>
                <span>LON: 75.6972° W</span>
                <span>ELEV: 114m MSL</span>
                <span className="text-amber">SOIL: 78.4% LOAM</span>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE FIELD DISPATCH NEWSLETTER TERMINAL */}
          <div className="lg:col-span-6 bg-void border border-steel-border/80 rounded-2xl p-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3 mb-3">
              <div className="flex items-center gap-2 text-cyan font-bold">
                <Terminal className="w-4 h-4" />
                <span>JOIN THE FIELD DISPATCH (NEWSLETTER)</span>
              </div>
              <span className="text-[10px] text-amber font-mono">ENCRYPTED OTA FEED</span>
            </div>

            <p className="text-steel/70 text-[11px] mb-4">
              Receive unreleased 3D print STLs, CNC cutsheets, and edge micro-ROS firmware patches before anyone else.
            </p>

            {/* Simulated Terminal Log Display */}
            <div className="bg-void-deep/90 border border-steel-border/50 rounded-lg p-3 max-h-32 overflow-y-auto mb-4 space-y-1 text-[11px]">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith('>')
                      ? 'text-amber font-bold'
                      : log.startsWith('[AUTH_OK]') || log.startsWith('[DISPATCH]')
                      ? 'text-cyan'
                      : 'text-steel/60'
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="agent@backyard-lab.io"
                  className="w-full bg-void-card border border-steel-border/80 focus:border-amber rounded-lg px-3 py-2 text-xs font-mono text-steel-light placeholder-steel/40 focus:outline-none transition shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-lg transition active:scale-95 shadow-glow-amber"
              >
                <span>TRANSMIT</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM LEGAL & SCROLL TO TOP */}
        <div className="pt-8 border-t border-steel-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-steel/60">
          <div>
            &copy; {new Date().getFullYear()} MUD &amp; BOT COOPERATIVE. ALL DESIGNS OPEN-HARDWARE (CERN-OHL-S).
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#hero" className="hover:text-amber transition">HERO</a>
            <a href="#exploded-view" className="hover:text-amber transition">DECONSTRUCTION</a>
            <a href="#project-hangar" className="hover:text-amber transition">HANGAR</a>
            <a href="#diy-blueprint" className="hover:text-amber transition">BLUEPRINTS</a>
            <a href="#manifesto" className="hover:text-amber transition">MANIFESTO</a>

            {/* Espace Dev Button */}
            <button
              onClick={() => {
                soundController.playMechanicalClick();
                if (isUnlocked) {
                  setIsOpen(true);
                } else {
                  setShowPasscode(true);
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber/15 border border-amber/40 text-amber hover:text-amber-bright text-xs font-mono font-bold transition hover:shadow-glow-amber active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ESPACE DÉVELOPPEUR</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 p-2 rounded-lg bg-void-card border border-steel-border/50 text-steel hover:text-amber hover:border-amber transition"
              title="Return to top of hangar"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Passcode Modal Fallback */}
      <DevPasscodeModal
        isOpen={showPasscode}
        onClose={() => setShowPasscode(false)}
        onSuccess={() => {
          setIsUnlocked(true);
          setShowPasscode(false);
          setIsOpen(true);
        }}
      />
    </footer>
  );
}
