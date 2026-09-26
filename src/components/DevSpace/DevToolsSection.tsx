import React, { useState } from 'react';
import {
  Wrench,
  Bot,
  Radar,
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  X,
  Search,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Brain,
  ShoppingCart,
  Clock,
  ShieldCheck,
  Activity,
  Calendar,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import type { DevTool } from '../../data/devSpaceData';
import { soundController } from '../AudioController';

export const DevToolsSection: React.FC = () => {
  const {
    tools,
    addTool,
    deleteTool,
    discoveries,
    acceptDiscovery,
    dismissDiscovery,
    agentReports,
    isScanning,
    triggerAgentDailyScan,
    lastScanTime,
  } = useDevSpace();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);

  // New Tool Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<DevTool['category']>('cad_cam');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [recommendedFor, setRecommendedFor] = useState('');
  const [badge, setBadge] = useState('Standard Lab');
  const [pricing, setPricing] = useState<DevTool['pricing']>('Gratuit');
  const [versionOrTag, setVersionOrTag] = useState('');

  const categoryMeta: Record<
    DevTool['category'],
    { label: string; icon: React.ReactNode; color: string }
  > = {
    cad_cam: {
      label: 'CAD, CAM & Usinage Bois CNC',
      icon: <Layers className="w-3.5 h-3.5" />,
      color: 'text-amber bg-amber/10 border-amber/30',
    },
    firmware_mcu: {
      label: 'Firmware, MCU & Débogage',
      icon: <Cpu className="w-3.5 h-3.5" />,
      color: 'text-cyan bg-cyan/10 border-cyan/30',
    },
    electronics_sim: {
      label: 'Électronique, Simulation & PCB',
      icon: <Zap className="w-3.5 h-3.5" />,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    ai_vision: {
      label: 'IA Embarquée, Vision & Datasets',
      icon: <Brain className="w-3.5 h-3.5" />,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    sourcing_tracking: {
      label: 'Sourcing, Veille Prix & Composants',
      icon: <ShoppingCart className="w-3.5 h-3.5" />,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    },
  };

  const filteredTools = tools.filter((tool) => {
    if (categoryFilter !== 'all' && tool.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.recommendedFor.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingDiscoveries = discoveries.filter((d) => d.status === 'pending');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    addTool({
      name,
      category,
      url,
      description,
      recommendedFor: recommendedFor || 'Développement MudBot',
      badge: badge || 'Outil Lab',
      pricing,
      versionOrTag: versionOrTag || undefined,
    });

    setShowAddModal(false);
    setName('');
    setUrl('');
    setDescription('');
    setRecommendedFor('');
    setVersionOrTag('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Daily Scout Agent HUD */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-void-card via-cyan-950/20 to-void-card border border-cyan/40 relative overflow-hidden backdrop-blur-md shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-cyan/10 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan/15 border border-cyan/40 text-[10px] font-mono text-cyan font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-cyan animate-pulse" />
              AGENT DE VEILLE QUOTIDIENNE // SCOUT BOT ACTIF
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-steel-light tracking-wide">
              OUTILS DU LAB &amp; RADAR DE VEILLE ROBOTIQUE
            </h2>

            <p className="text-xs sm:text-sm text-steel/80 leading-relaxed font-sans">
              Cet agent effectue chaque jour une vérification automatisée des dépôts open-source, des
              mises à jour de firmwares ESP32/VESC, des générateurs CAD de cycloïdes et des
              nouveaux composants AliExpress pour déceler ce qui est pertinent pour vos robots.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-steel/60">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan" />
                <span>Dernière vérification :</span>
                <strong className="text-steel-light">{lastScanTime}</strong>
              </span>

              <span className="flex items-center gap-1.5 text-amber">
                <Radar className="w-3.5 h-3.5 animate-spin-very-slow" />
                <span>Prochain scan automatique : Demain 06:00 UTC</span>
              </span>

              <button
                onClick={() => {
                  soundController.playMechanicalClick();
                  setShowReportsModal(true);
                }}
                className="text-cyan hover:underline ml-1"
              >
                [ Voir historique des rapports ({agentReports.length}) ]
              </button>
            </div>
          </div>

          {/* Trigger Scan Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => triggerAgentDailyScan()}
              disabled={isScanning}
              className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold transition shadow-glow-cyan active:scale-95 ${
                isScanning
                  ? 'bg-cyan/40 text-void-deep cursor-wait'
                  : 'bg-cyan hover:bg-cyan-bright text-void-deep'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>
                {isScanning ? 'AGENT EN COURS DE VÉRIFICATION...' : 'LANCER LE SCAN DU JOUR'}
              </span>
            </button>

            <button
              onClick={() => {
                soundController.playTerminalChirp();
                setShowAddModal(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-void-card hover:bg-steel-plate/50 border border-steel-border/70 text-steel-light font-mono text-xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-amber" />
              <span>RÉPERTORIER UN OUTIL MANUEL</span>
            </button>
          </div>
        </div>

        {/* Live scanning radar bar indicator */}
        {isScanning && (
          <div className="mt-4 pt-3 border-t border-cyan/30 flex items-center justify-between text-xs font-mono text-cyan animate-pulse">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-bounce" />
              <span>Inspection de 18 flux : GitHub Releases, ArXiv, Printables, Hackaday, AliExpress...</span>
            </div>
            <span className="text-[10px] text-steel/50">Balayage temps-réel</span>
          </div>
        )}
      </div>

      {/* AGENT DISCOVERIES SECTION (Nouveautés Détectées par l'Agent) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-void-card/90 border border-amber/40 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber animate-pulse" />
            <h3 className="text-sm sm:text-base font-display font-bold text-steel-light uppercase tracking-wider">
              NOUVEAUTÉS DÉTECTÉES PAR L'AGENT DE VEILLE ({pendingDiscoveries.length})
            </h3>
          </div>

          <span className="text-[11px] font-mono text-amber/80">
            {pendingDiscoveries.length > 0
              ? 'En attente de votre validation pour intégrer le Lab'
              : 'Tout est à jour ! Aucune nouveauté en attente'}
          </span>
        </div>

        {pendingDiscoveries.length === 0 ? (
          <div className="text-center py-6 text-xs font-mono text-steel/50 flex flex-col items-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400/60" />
            <span>Tous les nouveaux outils découverts ont été traités. Votre lab est 100% à jour.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pendingDiscoveries.map((disc) => (
              <div
                key={disc.id}
                className="p-4 rounded-xl bg-void-deep/90 border border-amber/30 hover:border-amber transition space-y-2.5 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                    <span className="px-1.5 py-0.2 rounded bg-amber/20 text-amber font-bold">
                      PERTINENCE : {disc.relevanceScore}%
                    </span>
                    <span className="text-steel/50 truncate max-w-[130px]">{disc.source}</span>
                  </div>

                  <h4 className="text-xs font-bold font-sans text-steel-light leading-snug">
                    {disc.title}
                  </h4>

                  <p className="text-[11px] text-steel/80 font-sans leading-relaxed">
                    {disc.description}
                  </p>

                  <div className="text-[10px] font-mono text-cyan bg-cyan/5 border border-cyan/20 p-1.5 rounded">
                    <strong>Impact :</strong> {disc.recommendedFor}
                  </div>
                </div>

                <div className="pt-2 border-t border-steel-border/30 flex items-center justify-between gap-2">
                  <a
                    href={disc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-steel/70 hover:text-white flex items-center gap-1"
                  >
                    <span>Lien</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => dismissDiscovery(disc.id)}
                      className="px-2 py-1 rounded bg-void hover:bg-steel-plate/60 border border-steel-border/50 text-steel/60 hover:text-red-400 text-[10px] font-mono transition"
                      title="Ignorer cette découverte"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => acceptDiscovery(disc.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber/20 hover:bg-amber text-amber hover:text-void-deep font-mono text-[10px] font-bold border border-amber/40 transition active:scale-95"
                    >
                      <Check className="w-3 h-3" />
                      <span>Ajouter au Lab</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tool Library Filter Bar */}
      <div className="p-4 rounded-xl bg-void-card/80 border border-steel-border/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundController.playMechanicalClick();
              setCategoryFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              categoryFilter === 'all'
                ? 'bg-steel-plate text-white font-bold'
                : 'text-steel/70 hover:text-white'
            }`}
          >
            TOUS ({tools.length})
          </button>

          {Object.entries(categoryMeta).map(([k, meta]) => (
            <button
              key={k}
              onClick={() => {
                soundController.playMechanicalClick();
                setCategoryFilter(k);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition border ${
                categoryFilter === k
                  ? meta.color + ' font-bold'
                  : 'bg-void-deep border-steel-border/50 text-steel/70 hover:text-white'
              }`}
            >
              {meta.icon}
              <span className="hidden sm:inline">{meta.label.split(',')[0]}</span>
              <span className="sm:hidden">{meta.label.slice(0, 4)}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-steel/50 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Filtrer un outil ou mot-clé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-void-deep border border-steel-border/60 rounded-lg text-xs font-mono text-steel-light focus:border-cyan focus:outline-none"
          />
        </div>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const meta = categoryMeta[tool.category];
          return (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-void-card/85 border border-steel-border/70 hover:border-cyan/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border uppercase font-bold ${meta.color}`}
                  >
                    {meta.icon}
                    <span>{meta.label.split(',')[0]}</span>
                  </span>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-deep border border-steel-border/50 text-steel/70">
                    {tool.pricing}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-display font-bold text-steel-light group-hover:text-cyan transition">
                      {tool.name}
                    </h3>
                    {tool.versionOrTag && (
                      <span className="text-[10px] font-mono text-steel/40">
                        {tool.versionOrTag}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-amber font-semibold mt-0.5">
                    // {tool.badge}
                  </div>
                </div>

                <p className="text-xs text-steel/90 font-sans leading-relaxed">
                  {tool.description}
                </p>

                <div className="p-2.5 rounded-xl bg-void-deep/80 border border-steel-border/50 text-[11px] font-mono text-cyan/90 space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-steel/50 block font-bold">
                    RECOMMANDÉ POUR :
                  </span>
                  <span>{tool.recommendedFor}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-steel-border/40 flex items-center justify-between text-xs font-mono">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-cyan font-bold transition active:scale-95"
                >
                  <span>Ouvrir l'Outil</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`Supprimer ${tool.name} des outils du lab ?`)) {
                      deleteTool(tool.id);
                    }
                  }}
                  className="p-1.5 rounded text-steel/30 hover:text-red-400 transition"
                  title="Supprimer cet outil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: AJOUTER UN OUTIL MANUELLEMENT */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/85 backdrop-blur-md">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan" />
                <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                  RÉPERTORIER UN OUTIL POUR LE LAB
                </h4>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-steel/60 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-steel/70 mb-1">NOM DE L'OUTIL OU DU LOGICIEL</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Blender CAD Sketcher, JLCPCB SMT Viewer..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">CATÉGORIE MATÉRIELLE</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DevTool['category'])}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                  >
                    <option value="cad_cam">CAD, CAM & Usinage Bois CNC</option>
                    <option value="firmware_mcu">Firmware, MCU & Débogage</option>
                    <option value="electronics_sim">Électronique, Simulation & PCB</option>
                    <option value="ai_vision">IA Embarquée, Vision & Datasets</option>
                    <option value="sourcing_tracking">Sourcing, Veille Prix & Composants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-steel/70 mb-1">MODÈLE ÉCONOMIQUE</label>
                  <select
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value as DevTool['pricing'])}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  >
                    <option value="Gratuit">Gratuit</option>
                    <option value="Open-Source">Open-Source</option>
                    <option value="Freemium">Freemium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-steel/70 mb-1">LIEN WEB / ACCÈS DE L'OUTIL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">DESCRIPTION & RÔLE TECHNIQUE</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Fonctionnalités clés de l'outil et pourquoi il est utile pour concevoir le robot..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">RECOMMANDÉ POUR QUELLE TÂCHE ?</label>
                <input
                  type="text"
                  placeholder="Ex: Fraisage CNC des dog-bones, Test FOC moteur..."
                  value={recommendedFor}
                  onChange={(e) => setRecommendedFor(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">BADGE / MOT-CLÉ</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">VERSION OU TAG</label>
                  <input
                    type="text"
                    placeholder="v1.2, Web App..."
                    value={versionOrTag}
                    onChange={(e) => setVersionOrTag(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-steel-border/50">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-lg bg-void border border-steel-border text-steel hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan text-void-deep font-bold hover:bg-cyan-bright shadow-glow-cyan"
                >
                  Enregistrer l'Outil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HISTORIQUE DES RAPPORTS DE L'AGENT */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/85 backdrop-blur-md">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan" />
                <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                  JOURNAL DES SCANS QUOTIDIENS DE L'AGENT ({agentReports.length})
                </h4>
              </div>
              <button
                onClick={() => setShowReportsModal(false)}
                className="text-steel/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {agentReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl bg-void-deep/80 border border-steel-border/60 space-y-2"
                >
                  <div className="flex items-center justify-between text-steel/50 text-[10px]">
                    <span className="text-cyan font-bold">{rep.date}</span>
                    <span>{rep.timestamp}</span>
                  </div>

                  <p className="text-steel-light font-sans text-xs">{rep.summary}</p>

                  <div className="space-y-1 text-[10px] text-steel/60 pt-1 border-t border-steel-border/30">
                    <span className="text-amber font-bold block">SOURCES SCRUTÉES :</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {rep.sourcesChecked.map((src, i) => (
                        <li key={i}>{src}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
