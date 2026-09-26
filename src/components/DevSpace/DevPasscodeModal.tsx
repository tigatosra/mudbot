import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, KeyRound, ArrowRight, X, Cpu } from 'lucide-react';
import { soundController } from '../AudioController';

interface DevPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DevPasscodeModal: React.FC<DevPasscodeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const validCodes = ['MUDBOT', 'DIRT', '2026', 'MUD', 'ROBOT'];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcode.trim().toUpperCase();
    if (validCodes.includes(clean)) {
      soundController.playTerminalChirp();
      soundController.playHydraulic();
      onSuccess();
    } else {
      setError(true);
      soundController.playSubThud();
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleBypass = () => {
    soundController.playTerminalChirp();
    soundController.playHydraulic();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-void-card border border-steel-border/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundController.playMechanicalClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-steel/60 hover:text-steel-light hover:bg-steel-plate/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber/15 border border-amber/40 flex items-center justify-center mb-4 shadow-glow-amber">
            <Lock className="w-7 h-7 text-amber animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber/10 border border-amber/30 text-[10px] font-mono text-amber uppercase tracking-widest font-semibold mb-2">
            <Cpu className="w-3 h-3" />
            CLEARANCE NIVEAU 3 // DÉVELOPPEUR
          </div>

          <h2 className="text-2xl font-display font-bold text-steel-light tracking-wide">
            ESPACE DÉVELOPPEURS
          </h2>
          <p className="mt-1 text-xs text-steel/80 font-sans max-w-xs">
            Section privée réservée à la planification des robots, sourcing AliExpress, modèles IA et specs d'ingénierie.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-steel/80 mb-1.5 flex items-center justify-between">
              <span>Code d'accès du Lab</span>
              <span className="text-[10px] text-amber/80 font-normal">Indice: MUDBOT</span>
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Entrez le code d'accès..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full px-4 py-3 bg-void-deep/80 border rounded-xl font-mono text-sm tracking-wider text-steel-light placeholder-steel/40 focus:outline-none transition ${
                  error
                    ? 'border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'border-steel-border focus:border-cyan focus:shadow-glow-cyan'
                }`}
              />
              <KeyRound className="w-4 h-4 text-steel/50 absolute right-3.5 top-3.5" />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-red-400 text-xs font-mono">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Code incorrect. Utilisez 'MUDBOT' ou le bypass rapide.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-xl transition shadow-glow-amber active:scale-95 uppercase tracking-wider"
          >
            <Unlock className="w-4 h-4" />
            <span>Déverrouiller le Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Dev Bypass */}
        <div className="mt-6 pt-4 border-t border-steel-border/50 text-center">
          <button
            onClick={handleBypass}
            className="text-[11px] font-mono text-cyan hover:text-cyan-bright transition flex items-center justify-center gap-1.5 mx-auto hover:underline"
          >
            <span>[ Accès Express Équipe : Déverrouillage 1-Clic ]</span>
          </button>
          <div className="text-[10px] font-mono text-steel/40 mt-1">
            Session persistée localement dans votre navigateur
          </div>
        </div>
      </div>
    </div>
  );
};
