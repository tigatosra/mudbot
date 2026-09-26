import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Cpu,
  Battery,
  Weight,
  Compass,
  AlertCircle,
  Check,
  Sparkles,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import { soundController } from '../AudioController';

export const ProjectPlanner: React.FC = () => {
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    selectedProject,
    addProject,
    deleteProject,
    toggleMilestone,
    addMilestone,
  } = useDevSpace();

  // New Milestone modal state
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestonePhase, setNewMilestonePhase] = useState('Prototypage');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newMilestoneAssignee, setNewMilestoneAssignee] = useState('Alex');

  // New Project modal state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjCode, setNewProjCode] = useState('');
  const [newProjSubtitle, setNewProjSubtitle] = useState('');
  const [newProjDescription, setNewProjDescription] = useState('');
  const [newProjPower, setNewProjPower] = useState('24V Li-ion');
  const [newProjWeight, setNewProjWeight] = useState('5.0 kg');
  const [newProjTerrain, setNewProjTerrain] = useState('Sol argileux');
  const [newProjCompute, setNewProjCompute] = useState('ESP32-S3');
  const [newProjLead, setNewProjLead] = useState('Alex');
  const [newProjDate, setNewProjDate] = useState('');

  if (!selectedProject) return null;

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    addMilestone(selectedProject.id, {
      title: newMilestoneTitle,
      phase: newMilestonePhase,
      dueDate: newMilestoneDate || '2026-12-15',
      assignee: newMilestoneAssignee,
    });
    setNewMilestoneTitle('');
    setShowAddMilestone(false);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;
    addProject({
      name: newProjName,
      code: newProjCode || 'MB-X//DEV',
      subtitle: newProjSubtitle || 'Nouveau robot tout-terrain en développement',
      phase: 'concept',
      progressPercent: 10,
      targetDate: newProjDate || '2027-02-01',
      leadDev: newProjLead,
      description: newProjDescription || 'Projet initié dans l\'espace collaboratif du Lab.',
      tags: ['Nouveau', 'R&D', 'MudBot'],
      specs: {
        power: newProjPower,
        weight: newProjWeight,
        terrain: newProjTerrain,
        compute: newProjCompute,
      },
      milestones: [
        {
          id: 'init-1',
          title: 'Étude préliminaire & dimensionnement CAO',
          phase: 'Conception',
          completed: true,
          dueDate: '2026-11-01',
          assignee: newProjLead,
        },
        {
          id: 'init-2',
          title: 'Sélection des composants et panier AliExpress',
          phase: 'Sourcing',
          completed: false,
          dueDate: '2026-11-15',
          assignee: newProjLead,
        },
      ],
      notes: 'Initialisé dans l\'espace dev. Définir les contraintes d\'étanchéité et de couple.',
    });
    setShowAddProject(false);
    setNewProjName('');
    setNewProjCode('');
    setNewProjSubtitle('');
    setNewProjDescription('');
  };

  const phaseLabels: Record<string, { label: string; color: string }> = {
    concept: { label: '01. CONCEPT & CAO', color: 'text-amber bg-amber/10 border-amber/30' },
    prototyping: { label: '02. PROTOTYPAGE ATELIER', color: 'text-cyan bg-cyan/10 border-cyan/30' },
    sourcing: { label: '03. SOURCING COMPOSANTS', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    bench_testing: { label: '04. BANC D\'ESSAI ÉLEC & TORQUE', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    field_ready: { label: '05. QUALIFIÉ TERRAIN & BOUE', color: 'text-amber-300 bg-amber-400/20 border-amber-400/40' },
  };

  return (
    <div className="space-y-6">
      {/* Top Project Selector Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-steel-border/60">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          <span className="text-[11px] font-mono uppercase tracking-wider text-steel/60 mr-1 shrink-0">
            PROJETS ROBOTS :
          </span>
          {projects.map((proj) => {
            const isSelected = proj.id === activeProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  soundController.playMechanicalClick();
                  setActiveProjectId(proj.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? 'bg-amber text-void-deep font-bold border-amber shadow-glow-amber'
                    : 'bg-void-card/80 text-steel hover:text-steel-light border-steel-border/60 hover:border-steel'
                }`}
              >
                <span>{proj.name}</span>
                <span
                  className={`text-[10px] px-1 rounded ${
                    isSelected ? 'bg-void-deep/20 text-void-deep' : 'bg-void-deep text-amber'
                  }`}
                >
                  {proj.progressPercent}%
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            soundController.playTerminalChirp();
            setShowAddProject(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-cyan text-xs font-mono font-semibold transition active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NOUVEAU ROBOT</span>
        </button>
      </div>

      {/* Main Selected Project Hero Card */}
      <div className="p-6 rounded-2xl bg-void-card/90 border border-steel-border/70 backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient from-amber/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-cyan bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded">
                {selectedProject.code}
              </span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                  phaseLabels[selectedProject.phase]?.color || 'text-steel bg-steel/10 border-steel/30'
                }`}
              >
                {phaseLabels[selectedProject.phase]?.label}
              </span>
              <span className="text-xs font-mono text-steel/60 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-steel/50" />
                Cible : {selectedProject.targetDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-steel-light tracking-wide">
              {selectedProject.name}
            </h2>
            <div className="text-xs font-mono text-amber font-medium">
              {selectedProject.subtitle}
            </div>
            <p className="text-sm text-steel/90 leading-relaxed font-sans pt-1">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-void-deep border border-steel-border/50 text-[10px] font-mono text-steel/80"
                >
                  #{tag}
                </span>
              ))}
              <span className="text-xs font-mono text-steel/50 ml-2 self-center">
                Responsable : <span className="text-steel-light font-semibold">{selectedProject.leadDev}</span>
              </span>
            </div>
          </div>

          {/* Progress Gauge Card */}
          <div className="lg:w-72 shrink-0 p-5 rounded-xl bg-void-deep/80 border border-steel-border/60 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-steel/60">
                AVANCEMENT GLOBAL
              </span>
              <span className="text-lg font-mono font-bold text-amber">
                {selectedProject.progressPercent}%
              </span>
            </div>

            {/* Glowing Custom Progress Bar */}
            <div className="w-full h-3 bg-steel-plate/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber to-cyan rounded-full transition-all duration-500 shadow-glow-amber"
                style={{ width: `${selectedProject.progressPercent}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-steel/60 flex items-center justify-between pt-1">
              <span>
                Jalons :{' '}
                <strong className="text-steel-light">
                  {selectedProject.milestones.filter((m) => m.completed).length} /{' '}
                  {selectedProject.milestones.length}
                </strong>
              </span>
              <span className="text-cyan">
                {selectedProject.progressPercent === 100 ? 'Prêt au terrain !' : 'En développement'}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Specs Strip */}
        <div className="mt-6 pt-6 border-t border-steel-border/50 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-void-deep/60 border border-steel-border/40">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel/60 uppercase">
              <Battery className="w-3.5 h-3.5 text-amber" />
              <span>ALIMENTATION & BATTERIE</span>
            </div>
            <div className="text-xs font-mono font-bold text-steel-light mt-1">
              {selectedProject.specs.power}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-void-deep/60 border border-steel-border/40">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel/60 uppercase">
              <Weight className="w-3.5 h-3.5 text-cyan" />
              <span>MASSE TOTALE</span>
            </div>
            <div className="text-xs font-mono font-bold text-steel-light mt-1">
              {selectedProject.specs.weight}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-void-deep/60 border border-steel-border/40">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel/60 uppercase">
              <Compass className="w-3.5 h-3.5 text-timber" />
              <span>CAPACITÉ TERRAIN</span>
            </div>
            <div className="text-xs font-mono font-bold text-steel-light mt-1">
              {selectedProject.specs.terrain}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-void-deep/60 border border-steel-border/40">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel/60 uppercase">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>UNITÉ DE CALCUL</span>
            </div>
            <div className="text-xs font-mono font-bold text-steel-light mt-1 truncate" title={selectedProject.specs.compute}>
              {selectedProject.specs.compute}
            </div>
          </div>
        </div>
      </div>

      {/* Milestones & Sprint Roadmap Section */}
      <div className="p-6 rounded-2xl bg-void-card/75 border border-steel-border/60 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber" />
            <h3 className="text-base font-display font-bold text-steel-light uppercase tracking-wider">
              ROADMAP & JALONS DU PROJET ({selectedProject.milestones.length})
            </h3>
          </div>

          <button
            onClick={() => {
              soundController.playMechanicalClick();
              setShowAddMilestone(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber/15 hover:bg-amber/25 border border-amber/40 text-amber font-mono text-xs font-bold transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>AJOUTER UN JALON</span>
          </button>
        </div>

        {/* Milestones List */}
        <div className="space-y-2.5">
          {selectedProject.milestones.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMilestone(selectedProject.id, m.id)}
              className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-4 cursor-pointer select-none ${
                m.completed
                  ? 'bg-void-deep/40 border-steel-border/30 opacity-70 hover:opacity-100'
                  : 'bg-void-deep/90 border-steel-border/70 hover:border-cyan hover:shadow-glow-cyan'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    m.completed
                      ? 'bg-amber border-amber text-void-deep'
                      : 'border-steel-border/80 hover:border-amber'
                  }`}
                >
                  {m.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-2.5 h-2.5 text-steel/30" />}
                </button>

                <div>
                  <div
                    className={`text-sm font-sans ${
                      m.completed ? 'line-through text-steel/60' : 'text-steel-light font-medium'
                    }`}
                  >
                    {m.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-steel/50 mt-0.5">
                    <span className="px-1.5 py-0.2 bg-steel-plate/50 rounded text-steel/80">
                      {m.phase}
                    </span>
                    <span>Assigné à : <strong className="text-amber">{m.assignee}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-right shrink-0">
                <span className="text-[11px] font-mono text-steel/60 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-steel/40" />
                  {m.dueDate}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                    m.completed
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber/10 text-amber border-amber/30'
                  }`}
                >
                  {m.completed ? 'COMPLÉTÉ' : 'EN COURS'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Technical Notes Box */}
        <div className="mt-4 p-4 rounded-xl bg-mud-deep/40 border border-mud-light/50 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs font-sans text-steel-light/90">
            <span className="font-mono font-bold text-amber tracking-wider text-[11px] block">
              // NOTE D'INGÉNIERIE & OBSERVATION TERRAIN :
            </span>
            <p>{selectedProject.notes}</p>
          </div>
        </div>

        {/* Delete Project Danger Button (if not only 1) */}
        {projects.length > 1 && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                if (window.confirm(`Supprimer le projet ${selectedProject.name} de l'espace dev ?`)) {
                  deleteProject(selectedProject.id);
                }
              }}
              className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition hover:underline"
            >
              <Trash2 className="w-3 h-3" />
              <span>Supprimer ce projet du lab</span>
            </button>
          </div>
        )}
      </div>

      {/* MODAL: AJOUTER UN JALON */}
      {showAddMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/80 backdrop-blur-md">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                AJOUTER UN JALON POUR {selectedProject.name}
              </h4>
              <button
                onClick={() => setShowAddMilestone(false)}
                className="text-steel/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMilestoneSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-steel/70 mb-1">TITRE DU JALON / OBJECTIF</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Banc de test étanchéité caisson bois 30 min..."
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">PHASE / CATÉGORIE</label>
                  <select
                    value={newMilestonePhase}
                    onChange={(e) => setNewMilestonePhase(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  >
                    <option value="Conception">Conception CAD</option>
                    <option value="Usinage Bois">Usinage Bois CNC</option>
                    <option value="Impression 3D">Impression 3D</option>
                    <option value="Électronique">Électronique & Câblage</option>
                    <option value="Firmware">Firmware & ROS</option>
                    <option value="Essai Terrain">Essai Terrain / Boue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-steel/70 mb-1">DATE LIMITE</label>
                  <input
                    type="date"
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-steel/70 mb-1">RESPONSABLE DU JALON</label>
                <select
                  value={newMilestoneAssignee}
                  onChange={(e) => setNewMilestoneAssignee(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                >
                  <option value="Alexandre Roy (Mécatronique)">Alexandre Roy</option>
                  <option value="Sarah Chen (Edge AI)">Sarah Chen</option>
                  <option value="Marc Tremblay (Firmware)">Marc Tremblay</option>
                  <option value="Thomas Vane (CAD & Cycloïdes)">Thomas Vane</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMilestone(false)}
                  className="px-3 py-2 rounded-lg bg-void border border-steel-border text-steel hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber text-void-deep font-bold hover:bg-amber-bright shadow-glow-amber"
                >
                  Ajouter Jalon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOUVEAU PROJET */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/80 backdrop-blur-md">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan" />
                <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                  INITIALISER UN NOUVEAU PROJET DE ROBOT
                </h4>
              </div>
              <button
                onClick={() => setShowAddProject(false)}
                className="text-steel/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-steel/70 mb-1">NOM DU ROBOT</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: SWAMP-VIPER MK.1"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">CODE LAB</label>
                  <input
                    type="text"
                    placeholder="Ex: SV-02//MUD"
                    value={newProjCode}
                    onChange={(e) => setNewProjCode(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-steel/70 mb-1">SOUS-TITRE / OBJECTIF CLÉ</label>
                <input
                  type="text"
                  placeholder="Ex: Drone amphibie à propulsion vis d'Archimède en bois étanche"
                  value={newProjSubtitle}
                  onChange={(e) => setNewProjSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-steel/70 mb-1">DESCRIPTION DÉTAILLÉE</label>
                <textarea
                  rows={2}
                  placeholder="Architecture mécanique, rôle opérationnel, matériaux..."
                  value={newProjDescription}
                  onChange={(e) => setNewProjDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">ALIMENTATION</label>
                  <input
                    type="text"
                    value={newProjPower}
                    onChange={(e) => setNewProjPower(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">UNITÉ DE CALCUL</label>
                  <input
                    type="text"
                    value={newProjCompute}
                    onChange={(e) => setNewProjCompute(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">MASSE</label>
                  <input
                    type="text"
                    value={newProjWeight}
                    onChange={(e) => setNewProjWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">TERRAIN CIBLE</label>
                  <input
                    type="text"
                    value={newProjTerrain}
                    onChange={(e) => setNewProjTerrain(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">LEAD</label>
                  <select
                    value={newProjLead}
                    onChange={(e) => setNewProjLead(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  >
                    <option value="Alex">Alex</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Marc">Marc</option>
                    <option value="Thomas">Thomas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-steel/70 mb-1">DATE CIBLE DE DÉPLOIEMENT</label>
                <input
                  type="date"
                  value={newProjDate}
                  onChange={(e) => setNewProjDate(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-cyan focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-3 py-2 rounded-lg bg-void border border-steel-border text-steel hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan text-void-deep font-bold hover:bg-cyan-bright shadow-glow-cyan"
                >
                  Créer le Robot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
