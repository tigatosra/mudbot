import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Wrench } from 'lucide-react';
import { soundController } from './AudioController';

export function NavigationHUD() {
  const [isMuted, setIsMuted] = useState(soundController.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newMuted = soundController.toggleMute();
    setIsMuted(newMuted);
  };

  const navLinks = [
    { label: '// 01. ZERO-G', href: '#hero' },
    { label: '// 02. EXPLODED TECH', href: '#exploded-view' },
    { label: '// 03. HANGAR FLEET', href: '#project-hangar' },
    { label: '// 04. DIY BLUEPRINT', href: '#diy-blueprint' },
    { label: '// 05. MANIFESTO', href: '#manifesto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-void-deep/90 backdrop-blur-md border-b border-steel-border/70 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* LOGO & BRAND */}
        <a
          href="#hero"
          onClick={() => soundController.playMechanicalClick()}
          className="flex items-center gap-3 group"
        >
          {/* Emblem Icon */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber/70 shadow-glow-amber group-hover:scale-105 transition-transform bg-void-card flex-shrink-0">
            <img
              src="/images/mudbot-emblem.jpg"
              alt="Mud & Bot Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg tracking-wider text-steel-light">
                MUD <span className="text-amber">&amp;</span> BOT
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber/20 border border-amber/40 text-amber rounded">
                LAB
              </span>
            </div>
            <div className="text-[10px] font-mono text-steel/60 tracking-widest hidden sm:block">
              BUILT FOR A DIRTY FUTURE
            </div>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => soundController.playMechanicalClick()}
              className="text-xs font-mono text-steel/80 hover:text-amber tracking-wider transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CONTROLS & CTA */}
        <div className="flex items-center gap-3">
          {/* AUDIO SYNTHESIZER TOGGLE */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-300 ${
              !isMuted
                ? 'bg-amber/20 border-amber text-amber shadow-glow-amber'
                : 'bg-void-card border-steel-border/70 text-steel hover:text-steel-light'
            }`}
            title={isMuted ? 'Unmute tactical hydraulic audio' : 'Mute tactile audio'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber animate-pulse" />
                <span className="hidden sm:inline font-bold">AUDIO: ON</span>
                {/* Micro Animated Soundwave */}
                <span className="flex items-center gap-0.5 h-2">
                  <span className="w-0.5 h-2 bg-amber animate-bounce" />
                  <span className="w-0.5 h-3 bg-amber animate-bounce delay-75" />
                  <span className="w-0.5 h-1.5 bg-amber animate-bounce delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-steel/60" />
                <span className="hidden sm:inline">AUDIO: MUTED</span>
              </>
            )}
          </button>

          {/* CTA: CONFIGURE BOT */}
          <a
            href="#diy-blueprint"
            onClick={() => soundController.playTerminalChirp()}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-lg transition-all shadow-glow-amber active:scale-95"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>CONFIGURE BOT</span>
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundController.playMechanicalClick();
            }}
            className="lg:hidden p-2 rounded-lg bg-void-card border border-steel-border/70 text-steel hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-void-deep/95 border-b border-steel-border/80 px-6 py-6 space-y-4 backdrop-blur-xl">
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundController.playMechanicalClick();
                }}
                className="text-steel-light hover:text-amber py-2 border-b border-steel-border/30 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#diy-blueprint"
            onClick={() => {
              setMobileMenuOpen(false);
              soundController.playTerminalChirp();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber text-void-deep font-mono text-xs font-bold rounded-xl shadow-glow-amber"
          >
            <Wrench className="w-4 h-4" />
            <span>CONFIGURE DIY ROBOT</span>
          </a>
        </div>
      )}
    </nav>
  );
}
