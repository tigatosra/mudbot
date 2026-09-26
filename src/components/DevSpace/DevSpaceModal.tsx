import React from 'react';
import {
  Cpu,
  ShoppingCart,
  Brain,
  BookOpen,
  Users,
  Compass,
  ArrowLeft,
  Bot,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import { ProjectPlanner } from './ProjectPlanner';
import { ComponentBOM } from './ComponentBOM';
import { ResourcesAIHub } from './ResourcesAIHub';
import { TechWikiGuide } from './TechWikiGuide';
import { CollaborationFeed } from './CollaborationFeed';
import { DevToolsSection } from './DevToolsSection';
import { soundController } from '../AudioController';

export const DevSpaceModal: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    projects,
    activeProjectId,
    setActiveProjectId,
    selectedProject,
    components,
    resources,
    checklist,
    comments,
    currentUser,
    tools,
    discoveries,
  } = useDevSpace();

  if (!isOpen) return null;

  const pendingDiscoveriesCount = discoveries.filter((d) => d.status === 'pending').length;

  const tabs = [
    {
      id: 'planner' as const,
      label: 'PLANIFICATION ROBOTS',
      icon: <Compass className="w-4 h-4" />,
      badge: `${projects.length}`,
      color: 'hover:text-amber',
    },
    {
      id: 'bom' as const,
      label: 'COMPOSANTS & ALIEXPRESS',
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: `${components.length}`,
      color: 'hover:text-cyan',
    },
    {
      id: 'tools' as const,
      label: 'OUTILS & VEILLE AGENT',
      icon: <Bot className="w-4 h-4" />,
      badge: `${tools.length}${pendingDiscoveriesCount > 0 ? ` (+${pendingDiscoveriesCount})` : ''}`,
      color: 'hover:text-cyan',
    },
    {
      id: 'resources' as const,
      label: 'RESSOURCES WEB & IA',
      icon: <Brain className="w-4 h-4" />,
      badge: `${resources.length}`,
      color: 'hover:text-purple-400',
    },
    {
      id: 'wiki' as const,
      label: 'BON À SAVOIR & IP67',
      icon: <BookOpen className="w-4 h-4" />,
      badge: `${checklist.filter((c) => c.completed).length}/${checklist.length}`,
      color: 'hover:text-timber',
    },
    {
      id: 'collab' as const,
      label: 'COLLABORATION & FEED',
      icon: <Users className="w-4 h-4" />,
      badge: `${comments.length}`,
      color: 'hover:text-emerald-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-void-deep/95 backdrop-blur-2xl text-steel-light selection:bg-cyan/30 selection:text-cyan font-sans">
      {/* Top Background Atmospheric Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-amber/10 via-cyan/5 to-transparent blur-3xl pointer-events-none" />

      {/* STICKY DEV HUD HEADER */}
      <header className="sticky top-0 z-30 bg-void-deep/90 border-b border-steel-border/80 backdrop-blur-xl px-4 sm:px-6 lg:px-10 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Section Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-void-card border border-amber/60 flex items-center justify-center shrink-0 shadow-glow-amber">
              <Cpu className="w-5 h-5 text-amber animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-base tracking-wider text-steel-light">
                  MUD <span className="text-amber">&amp;</span> BOT
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber/20 border border-amber/40 text-amber rounded font-bold uppercase tracking-wider">
                  ESPACE DÉVELOPPEUR // PRIVÉ
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-cyan/15 border border-cyan/30 text-cyan rounded hidden sm:inline">
                  COLLABORATIF
                </span>
              </div>
              <div className="text-[10px] font-mono text-steel/60 tracking-wider">
                Projet actif : <strong className="text-steel-light">{selectedProject?.name}</strong> ({selectedProject?.code})
              </div>
            </div>
          </div>

          {/* Quick Active Robot Switcher & Actions */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {/* Quick Project Select Dropdown */}
            <div className="flex items-center bg-void-card border border-steel-border/70 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-mono text-steel/60 mr-1.5 hidden sm:inline">ROBOT :</span>
              <select
                value={activeProjectId}
                onChange={(e) => {
                  soundController.playMechanicalClick();
                  setActiveProjectId(e.target.value);
                }}
                className="bg-transparent font-mono text-xs font-bold text-amber focus:outline-none cursor-pointer"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-void-card text-steel-light">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User Presence indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-void-card border border-steel-border/70 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-steel/70">{currentUser.name.split(' ')[0]}</span>
            </div>

            {/* Exit Dev Space Button */}
            <button
              onClick={() => {
                soundController.playHydraulic();
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-void-card hover:bg-steel-plate/60 border border-steel-border/80 text-steel-light hover:text-amber font-mono text-xs transition active:scale-95 shadow-md"
              title="Fermer et revenir au site public"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETOUR AU SITE</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS STRIP */}
        <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-steel-border/40 flex items-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundController.playMechanicalClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition-all whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-amber text-void-deep font-bold border-amber shadow-glow-amber'
                    : `bg-void-card/60 text-steel hover:text-steel-light border-steel-border/50 hover:border-steel-border ${tab.color}`
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isActive
                      ? 'bg-void-deep/20 text-void-deep'
                      : 'bg-void-deep border border-steel-border/50 text-steel/80'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN TAB CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {activeTab === 'planner' && <ProjectPlanner />}
        {activeTab === 'bom' && <ComponentBOM />}
        {activeTab === 'tools' && <DevToolsSection />}
        {activeTab === 'resources' && <ResourcesAIHub />}
        {activeTab === 'wiki' && <TechWikiGuide />}
        {activeTab === 'collab' && <CollaborationFeed />}
      </main>
    </div>
  );
};
