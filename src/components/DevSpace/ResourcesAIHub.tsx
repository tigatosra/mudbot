import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Plus,
  ThumbsUp,
  Terminal,
  Copy,
  Check,
  Code2,
  FileCode,
  Layers,
  Search,
  BookOpen,
  Trash2,
  Brain,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import type { DevResource } from '../../data/devSpaceData';
import { soundController } from '../AudioController';

export const ResourcesAIHub: React.FC = () => {
  const { resources, addResource, upvoteResource, deleteResource, selectedProject, currentUser } =
    useDevSpace();

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Add Resource Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DevResource['type']>('ai_model');
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('HuggingFace / GitHub');
  const [summary, setSummary] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [tagsInput, setTagsInput] = useState('IA, ESP32, Vision');

  // Filtered resources
  const filteredResources = resources.filter((res) => {
    if (typeFilter !== 'all' && res.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.summary.toLowerCase().includes(q) ||
        res.source.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    soundController.playTerminalChirp();
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    addResource({
      projectId: selectedProject ? selectedProject.id : 'all',
      title,
      type,
      url,
      source,
      summary,
      aiPrompt: aiPrompt.trim() || undefined,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      addedBy: currentUser.name,
    });

    setShowAddModal(false);
    setTitle('');
    setUrl('');
    setSummary('');
    setAiPrompt('');
  };

  const typeMeta: Record<
    DevResource['type'],
    { label: string; icon: React.ReactNode; color: string }
  > = {
    ai_model: {
      label: 'MODÈLE IA & VISION',
      icon: <Brain className="w-3.5 h-3.5" />,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    github_repo: {
      label: 'DÉPÔT GITHUB & CODE',
      icon: <Code2 className="w-3.5 h-3.5" />,
      color: 'text-cyan bg-cyan/10 border-cyan/30',
    },
    cad_print: {
      label: 'FICHIER 3D & CAO',
      icon: <Layers className="w-3.5 h-3.5" />,
      color: 'text-amber bg-amber/10 border-amber/30',
    },
    datasheet: {
      label: 'DATASHEET ÉLEC',
      icon: <FileCode className="w-3.5 h-3.5" />,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    tutorial_video: {
      label: 'TUTO / VIDÉO WEB',
      icon: <BookOpen className="w-3.5 h-3.5" />,
      color: 'text-timber bg-timber/10 border-timber/30',
    },
    article: {
      label: 'ARTICLE TECHNIQUE',
      icon: <Terminal className="w-3.5 h-3.5" />,
      color: 'text-steel bg-steel/10 border-steel/30',
    },
  };

  // Robot AI Prompt generator quick triggers
  const promptRecipes = [
    {
      label: 'Dimensionnement Couple / Pente Boueuse',
      prompt:
        'Agis comme un ingénieur mécatronique spécialisé en véhicules tout-terrain. Calcule le couple statique minimal pour franchir une pente de 35° dans de l\'argile meuble avec un rover de 8kg et des chenilles de 70mm de large.',
    },
    {
      label: 'Recherche Équivalent Composant AliExpress',
      prompt:
        'Je recherche une alternative robuste et disponible sur AliExpress pour un pilote de moteur brushless FOC 24V 40A. Quels critères précis de MOSFET et de filtrage vérifier dans la fiche technique du vendeur ?',
    },
    {
      label: 'Publisher Micro-ROS ESP32-S3',
      prompt:
        'Écris le code C++ PlatformIO pour un nœud Micro-ROS sur ESP32-S3 qui publie l\'état de la batterie (tension, courant, pourcentage) sur le topic /mudbot/battery via Wi-Fi UDP.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: AI Generator & Assistant */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-void-card via-purple-950/20 to-void-card border border-purple-500/30 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-very-slow" />
              INTELLIGENCE ARTIFICIELLE & BASE DE CONNAISSANCES WEB
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-steel-light tracking-wide">
              RESSOURCES WEB & RECETTES D'IA ROBOTIQUE
            </h2>
            <p className="text-xs sm:text-sm text-steel/80 leading-relaxed font-sans">
              Centralisez tous les modèles de vision embarquée (YOLO, TinyML), les dépôts GitHub de
              firmware ROS, les calculateurs CAD et les prompts IA éprouvés pour concevoir vos
              robots.
            </p>
          </div>

          <button
            onClick={() => {
              soundController.playTerminalChirp();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition shadow-[0_0_20px_rgba(168,85,247,0.35)] active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>AJOUTER UNE RESSOURCE</span>
          </button>
        </div>

        {/* Quick AI Prompts Bar */}
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 block mb-2 font-semibold">
            ⚡ PROMPTS IA RECOMMANDÉS POUR ROBOTIQUE (1-CLIC POUR COPIER) :
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {promptRecipes.map((recipe, idx) => (
              <button
                key={idx}
                onClick={() => copyToClipboard(recipe.prompt, `quick-${idx}`)}
                className="text-left p-2.5 rounded-xl bg-void-deep/80 hover:bg-void-deep border border-purple-500/30 hover:border-purple-400 transition group flex flex-col justify-between"
              >
                <div className="text-[11px] font-mono font-bold text-purple-300 group-hover:text-purple-200">
                  {recipe.label}
                </div>
                <div className="text-[10px] text-steel/60 truncate mt-1">{recipe.prompt}</div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-cyan mt-1.5 self-end">
                  {copiedPromptId === `quick-${idx}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copier pour ChatGPT/Claude</span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="p-4 rounded-xl bg-void-card/80 border border-steel-border/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              soundController.playMechanicalClick();
              setTypeFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              typeFilter === 'all'
                ? 'bg-steel-plate text-white font-bold'
                : 'text-steel/70 hover:text-white'
            }`}
          >
            TOUTES ({resources.length})
          </button>

          {Object.entries(typeMeta).map(([k, meta]) => (
            <button
              key={k}
              onClick={() => {
                soundController.playMechanicalClick();
                setTypeFilter(k);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition border ${
                typeFilter === k ? meta.color + ' font-bold' : 'bg-void-deep border-steel-border/50 text-steel/70 hover:text-white'
              }`}
            >
              {meta.icon}
              <span>{meta.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-steel/50 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Chercher ressource ou mot-clé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-void-deep border border-steel-border/60 rounded-lg text-xs font-mono text-steel-light focus:border-purple-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const meta = typeMeta[res.type];
          return (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-void-card/85 border border-steel-border/70 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4 relative group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border uppercase font-semibold ${meta.color}`}
                  >
                    {meta.icon}
                    <span>{meta.label}</span>
                  </span>

                  <span className="text-[10px] font-mono text-steel/50">
                    Source: <strong className="text-steel/80">{res.source}</strong>
                  </span>
                </div>

                {/* Title & Clickable URL */}
                <h3 className="text-base font-display font-bold text-steel-light tracking-wide group-hover:text-purple-300 transition">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <span>{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                  </a>
                </h3>

                {/* Summary */}
                <p className="text-xs text-steel/90 leading-relaxed font-sans">{res.summary}</p>

                {/* AI Prompt Box if available */}
                {res.aiPrompt && (
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-purple-400" />
                        PROMPT IA ASSOCIÉ :
                      </span>
                      <button
                        onClick={() => copyToClipboard(res.aiPrompt!, res.id)}
                        className="flex items-center gap-1 text-cyan hover:underline"
                      >
                        {copiedPromptId === res.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-steel-light/90 italic bg-void-deep/60 p-2 rounded border border-steel-border/40 select-all">
                      "{res.aiPrompt}"
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {res.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-void-deep border border-steel-border/50 text-[10px] font-mono text-steel/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom metadata & Upvote */}
              <div className="pt-3 border-t border-steel-border/40 flex items-center justify-between text-[11px] font-mono text-steel/60">
                <span>
                  Partagé par <strong className="text-steel-light">{res.addedBy}</strong> ({res.addedDate})
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => upvoteResource(res.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-void-deep hover:bg-purple-500/20 border border-steel-border/60 hover:border-purple-400 text-steel-light transition active:scale-95"
                    title="Voter utile pour cette ressource"
                  >
                    <ThumbsUp className="w-3 h-3 text-purple-400" />
                    <span className="font-bold text-purple-300">{res.upvotes}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Supprimer cette ressource ?')) {
                        deleteResource(res.id);
                      }
                    }}
                    className="p-1 rounded text-steel/40 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: AJOUTER UNE RESSOURCE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/85 backdrop-blur-md">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                  AJOUTER UNE RESSOURCE WEB OU IA
                </h4>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-steel/60 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-steel/70 mb-1">TITRE DE LA RESSOURCE</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: TinyML ESP-DL Détection d'Obstacles..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">TYPE DE CONTENU</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as DevResource['type'])}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-purple-400 focus:outline-none"
                  >
                    <option value="ai_model">Modèle IA & Vision</option>
                    <option value="github_repo">Dépôt GitHub & Code</option>
                    <option value="cad_print">Fichier 3D & CAO</option>
                    <option value="datasheet">Datasheet Électronique</option>
                    <option value="tutorial_video">Tutoriel / Vidéo</option>
                    <option value="article">Article Technique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-steel/70 mb-1">SOURCE / PLATEFORME</label>
                  <input
                    type="text"
                    placeholder="Ex: GitHub, Printables, Hackaday..."
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-steel/70 mb-1">LIEN URL COMPLET</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/... ou https://huggingface.co/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">RÉSUMÉ & INTÉRÊT POUR LE LAB</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Expliquez brièvement pourquoi cette ressource est cruciale pour le robot..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">
                  PROMPT IA OPTIMISÉ (OPTIONNEL)
                </label>
                <textarea
                  rows={2}
                  placeholder="Prompt à injecter dans un LLM pour exploiter cette ressource..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">TAGS (SÉPARÉS PAR DES VIRGULES)</label>
                <input
                  type="text"
                  placeholder="YOLO, ROS2, ESP32, 3D Print..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                />
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
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg"
                >
                  Enregistrer Ressource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
