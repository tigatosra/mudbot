import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Plus,
  Trash2,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Clock,
  Package,
  Layers,
  Search,
  ArrowUpRight,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import type { DevComponent } from '../../data/devSpaceData';
import { soundController } from '../AudioController';

export const ComponentBOM: React.FC = () => {
  const {
    components,
    projectComponents,
    selectedProject,
    addComponent,
    deleteComponent,
    cycleComponentStatus,
  } = useDevSpace();

  // Filters
  const [filterType, setFilterType] = useState<'all' | 'necessary' | 'optional'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Add Component Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<DevComponent['category']>('motors');
  const [isRequired, setIsRequired] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(15.0);
  const [supplier, setSupplier] = useState('AliExpress');
  const [primaryUrl, setPrimaryUrl] = useState('');
  const [alternativeSupplier, setAlternativeSupplier] = useState('');
  const [alternativeUrl, setAlternativeUrl] = useState('');
  const [alternativeReason, setAlternativeReason] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('Alex');

  // Filtered components
  const baseList = showAllProjects ? components : projectComponents;

  const filteredComponents = useMemo(() => {
    return baseList.filter((comp) => {
      // Type filter
      if (filterType === 'necessary' && !comp.isRequired) return false;
      if (filterType === 'optional' && comp.isRequired) return false;

      // Category filter
      if (categoryFilter !== 'all' && comp.category !== categoryFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && comp.status !== statusFilter) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          comp.name.toLowerCase().includes(q) ||
          comp.supplier.toLowerCase().includes(q) ||
          (comp.alternativeSupplier && comp.alternativeSupplier.toLowerCase().includes(q)) ||
          comp.notes.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [baseList, filterType, categoryFilter, statusFilter, searchQuery]);

  // Financial calculations
  const stats = useMemo(() => {
    let necessaryTotal = 0;
    let optionalTotal = 0;
    let totalItems = 0;
    let receivedOrTested = 0;

    baseList.forEach((c) => {
      const lineCost = c.unitPrice * c.quantity;
      if (c.isRequired) {
        necessaryTotal += lineCost;
      } else {
        optionalTotal += lineCost;
      }
      totalItems += 1;
      if (c.status === 'received' || c.status === 'tested') {
        receivedOrTested += 1;
      }
    });

    const grandTotal = necessaryTotal + optionalTotal;
    const progress = totalItems > 0 ? Math.round((receivedOrTested / totalItems) * 100) : 0;

    return {
      necessaryTotal: necessaryTotal.toFixed(2),
      optionalTotal: optionalTotal.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      totalItems,
      receivedOrTested,
      progress,
    };
  }, [baseList]);

  // Category labels & colors
  const categoryMeta: Record<string, { label: string; color: string }> = {
    motors: { label: 'Moteurs & Transmission', color: 'text-amber bg-amber/10 border-amber/30' },
    electronics: { label: 'Électronique & MCU', color: 'text-cyan bg-cyan/10 border-cyan/30' },
    power: { label: 'Alimentation & Batterie', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    sensors: { label: 'Capteurs & Vision', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    structural: { label: 'Structure & Matériaux', color: 'text-timber bg-timber/10 border-timber/30' },
    hardware: { label: 'Visserie & Roulements', color: 'text-steel bg-steel/10 border-steel/30' },
  };

  // Status configuration
  const statusMeta: Record<DevComponent['status'], { label: string; badge: string; icon: React.ReactNode }> = {
    to_order: {
      label: 'À COMMANDER',
      badge: 'bg-red-500/10 text-red-400 border-red-500/30',
      icon: <ShoppingCart className="w-3.5 h-3.5" />,
    },
    ordered: {
      label: 'COMMANDÉ (EN TRANSIT)',
      badge: 'bg-amber/15 text-amber border-amber/40 animate-pulse',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    received: {
      label: 'REÇU EN LABO',
      badge: 'bg-cyan/15 text-cyan border-cyan/40',
      icon: <Package className="w-3.5 h-3.5" />,
    },
    tested: {
      label: 'TESTÉ & VALIDÉ OK',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
  };

  // Preset component templates
  const presets = [
    {
      title: 'Moteur Brushless 24V Planétaire',
      name: 'Moteur Brushless 24V 350W 1500RPM Réducteur Planétaire',
      category: 'motors' as const,
      price: 29.5,
      qty: 2,
      supplier: 'AliExpress',
      url: 'https://fr.aliexpress.com/w/wholesale-brushless-motor-24v-high-torque-planetary.html',
      altSupplier: 'Mouser Electronics (Qualité Industrielle)',
      altUrl: 'https://www.mouser.fr/c/electromechanical/motors-actuators/',
      altReason: 'Garantie thermique continue, bobinage haute pureté sans surchauffe.',
      notes: 'Arbre méplat 8mm. Nécessite contrôleur VESC.',
    },
    {
      title: 'ESP32-S3 Dual-Core N16R8',
      name: 'ESP32-S3-DevKitC-1 N16R8 (16MB Flash, 8MB PSRAM)',
      category: 'electronics' as const,
      price: 5.9,
      qty: 2,
      supplier: 'AliExpress',
      url: 'https://fr.aliexpress.com/w/wholesale-esp32-s3-devkitc-1-n16r8.html',
      altSupplier: 'LCSC Electronics',
      altUrl: 'https://www.lcsc.com',
      altReason: 'Composant certifié Espressif officiel sans puces recyclées.',
      notes: 'Indispensable pour charger le modèle YOLO ou Micro-ROS.',
    },
    {
      title: 'LiDAR DTOF 360° 12m',
      name: 'Capteur LiDAR DTOF 360° D200 Portée 12m Anti-Poussière',
      category: 'sensors' as const,
      price: 58.0,
      qty: 1,
      supplier: 'AliExpress',
      url: 'https://fr.aliexpress.com/w/wholesale-dtof-lidar-sensor-360-12m.html',
      altSupplier: 'RobotShop (RPLIDAR S2 IP65)',
      altUrl: 'https://www.robotshop.com',
      altReason: 'Indice IP65 certifié résistant aux projections d\'eau et boue liquide.',
      notes: 'Optionnel : ajoute la cartographie SLAM d\'obstacles.',
    },
    {
      title: 'Batterie LiFePO4 24V 12Ah',
      name: 'Pack Batterie LiFePO4 8S 24V 12Ah avec BMS étanche 40A',
      category: 'power' as const,
      price: 89.0,
      qty: 1,
      supplier: 'AliExpress',
      url: 'https://fr.aliexpress.com/w/wholesale-lifepo4-battery-pack-24v-bms.html',
      altSupplier: 'Amazon Prime (Expédition 24h)',
      altUrl: 'https://www.amazon.fr/s?k=batterie+lifepo4+24v',
      altReason: 'Livraison le lendemain et garantie échange immédiat.',
      notes: '3000 cycles et sécurité incendie maximale.',
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setUnitPrice(preset.price);
    setQuantity(preset.qty);
    setSupplier(preset.supplier);
    setPrimaryUrl(preset.url);
    setAlternativeSupplier(preset.altSupplier);
    setAlternativeUrl(preset.altUrl);
    setAlternativeReason(preset.altReason);
    setNotes(preset.notes);
    soundController.playTerminalChirp();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generate primary URL if left empty
    const finalPrimaryUrl =
      primaryUrl.trim() ||
      `https://fr.aliexpress.com/w/wholesale-${encodeURIComponent(name)}.html`;

    addComponent({
      projectId: selectedProject ? selectedProject.id : 'mud-crawler',
      name,
      category,
      isRequired,
      quantity: Number(quantity) || 1,
      unitPrice: Number(unitPrice) || 0,
      supplier: supplier || 'AliExpress',
      primaryUrl: finalPrimaryUrl,
      alternativeSupplier: alternativeSupplier.trim() || undefined,
      alternativeUrl: alternativeUrl.trim() || undefined,
      alternativeReason: alternativeReason.trim() || undefined,
      status: 'to_order',
      notes: notes.trim(),
      assignedTo,
    });

    setShowAddModal(false);
    setName('');
    setPrimaryUrl('');
    setAlternativeSupplier('');
    setAlternativeUrl('');
    setAlternativeReason('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry & Budget Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Necessary Budget */}
        <div className="p-4 rounded-xl bg-void-card/90 border border-amber/30 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-steel/60 uppercase">
            <span>BUDGET NÉCESSAIRE</span>
            <span className="w-2 h-2 rounded-full bg-amber shadow-glow-amber animate-pulse" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-amber mt-1">
            ${stats.necessaryTotal}
          </div>
          <div className="text-[10px] font-mono text-steel/50 mt-0.5">
            Composants obligatoires au fonctionnement
          </div>
        </div>

        {/* Optional Upgrades Budget */}
        <div className="p-4 rounded-xl bg-void-card/90 border border-cyan/30">
          <div className="flex items-center justify-between text-[11px] font-mono text-steel/60 uppercase">
            <span>UPGRADES OPTIONNELLES</span>
            <span className="w-2 h-2 rounded-full bg-cyan shadow-glow-cyan" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-cyan mt-1">
            +${stats.optionalTotal}
          </div>
          <div className="text-[10px] font-mono text-steel/50 mt-0.5">
            Lidars, caméras, pinces douces, etc.
          </div>
        </div>

        {/* Total Project Estimate */}
        <div className="p-4 rounded-xl bg-void-card/90 border border-steel-border/70">
          <div className="flex items-center justify-between text-[11px] font-mono text-steel/60 uppercase">
            <span>TOTAL ESTIMÉ LAB</span>
            <DollarSign className="w-3.5 h-3.5 text-steel/50" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-steel-light mt-1">
            ${stats.grandTotal}
          </div>
          <div className="text-[10px] font-mono text-steel/50 mt-0.5">
            {stats.totalItems} composants au total
          </div>
        </div>

        {/* Procurement Progress Gauge */}
        <div className="p-4 rounded-xl bg-void-card/90 border border-emerald-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-steel/60 uppercase">
            <span>APPROVISIONNEMENT</span>
            <span className="text-emerald-400 font-bold">{stats.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-steel-plate/50 rounded-full overflow-hidden my-1">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-steel/50 flex justify-between">
            <span>Reçus / Testés :</span>
            <span className="text-steel-light font-bold">
              {stats.receivedOrTested} / {stats.totalItems}
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Add Button */}
      <div className="p-4 rounded-xl bg-void-card/80 border border-steel-border/60 flex flex-wrap items-center justify-between gap-3">
        {/* Left Filter Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Necessary vs Optional Tabs */}
          <div className="flex items-center bg-void-deep p-1 rounded-lg border border-steel-border/50 text-xs font-mono">
            <button
              onClick={() => {
                soundController.playMechanicalClick();
                setFilterType('all');
              }}
              className={`px-2.5 py-1 rounded transition ${
                filterType === 'all'
                  ? 'bg-steel-plate text-steel-light font-bold'
                  : 'text-steel/70 hover:text-white'
              }`}
            >
              TOUS ({baseList.length})
            </button>
            <button
              onClick={() => {
                soundController.playMechanicalClick();
                setFilterType('necessary');
              }}
              className={`px-2.5 py-1 rounded transition flex items-center gap-1 ${
                filterType === 'necessary'
                  ? 'bg-amber text-void-deep font-bold shadow-glow-amber'
                  : 'text-amber/80 hover:text-amber'
              }`}
            >
              <span>NÉCESSAIRES</span>
              <span className="text-[10px] px-1 bg-void-deep/30 rounded">
                {baseList.filter((c) => c.isRequired).length}
              </span>
            </button>
            <button
              onClick={() => {
                soundController.playMechanicalClick();
                setFilterType('optional');
              }}
              className={`px-2.5 py-1 rounded transition flex items-center gap-1 ${
                filterType === 'optional'
                  ? 'bg-cyan text-void-deep font-bold shadow-glow-cyan'
                  : 'text-cyan/80 hover:text-cyan'
              }`}
            >
              <span>OPTIONNELS</span>
              <span className="text-[10px] px-1 bg-void-deep/30 rounded">
                {baseList.filter((c) => !c.isRequired).length}
              </span>
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-void-deep border border-steel-border/60 rounded-lg text-xs font-mono text-steel-light focus:border-cyan focus:outline-none"
          >
            <option value="all">Toutes Catégories</option>
            <option value="motors">Moteurs & Transmission</option>
            <option value="electronics">Électronique & MCU</option>
            <option value="power">Alimentation & Batterie</option>
            <option value="sensors">Capteurs & Vision</option>
            <option value="structural">Structure & Matériaux</option>
            <option value="hardware">Visserie & Roulements</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-void-deep border border-steel-border/60 rounded-lg text-xs font-mono text-steel-light focus:border-cyan focus:outline-none"
          >
            <option value="all">Tous Statuts</option>
            <option value="to_order">À commander</option>
            <option value="ordered">Commandé</option>
            <option value="received">Reçu</option>
            <option value="tested">Testé OK</option>
          </select>

          {/* Project Toggle */}
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition ${
              showAllProjects
                ? 'bg-timber/20 border-timber text-timber font-bold'
                : 'bg-void-deep border-steel-border/60 text-steel/70 hover:text-white'
            }`}
          >
            {showAllProjects ? 'Vue : TOUS LES ROBOTS' : `Robot : ${selectedProject?.name}`}
          </button>
        </div>

        {/* Right Search & Add */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-steel/50 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher composant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-void-deep border border-steel-border/60 rounded-lg text-xs font-mono text-steel-light focus:border-cyan focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              soundController.playTerminalChirp();
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold transition shadow-glow-amber active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>AJOUTER COMPOSANT</span>
          </button>
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-3">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-12 bg-void-card/40 border border-steel-border/40 rounded-2xl p-6">
            <Layers className="w-10 h-10 text-steel/30 mx-auto mb-2" />
            <p className="font-mono text-sm text-steel/60">
              Aucun composant ne correspond aux filtres sélectionnés.
            </p>
          </div>
        ) : (
          filteredComponents.map((comp) => {
            const currentStatus = statusMeta[comp.status];
            const lineTotal = (comp.unitPrice * comp.quantity).toFixed(2);

            return (
              <div
                key={comp.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  comp.isRequired
                    ? 'bg-void-card/90 border-steel-border/70 hover:border-amber/60'
                    : 'bg-void-card/70 border-cyan/20 hover:border-cyan/60'
                } relative overflow-hidden group shadow-lg`}
              >
                {/* Visual side accent bar */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    comp.isRequired ? 'bg-amber' : 'bg-cyan'
                  }`}
                />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-2">
                  {/* Left Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Required / Optional Tag */}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          comp.isRequired
                            ? 'bg-amber text-void-deep shadow-glow-amber'
                            : 'bg-cyan/15 text-cyan border border-cyan/40'
                        }`}
                      >
                        {comp.isRequired ? '★ NÉCESSAIRE' : '◈ OPTIONNEL'}
                      </span>

                      {/* Category Badge */}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                          categoryMeta[comp.category]?.color || 'text-steel bg-steel/10'
                        }`}
                      >
                        {categoryMeta[comp.category]?.label || comp.category}
                      </span>

                      <span className="text-[11px] font-mono text-steel/50">
                        Qté : <strong className="text-steel-light">{comp.quantity}x</strong>
                      </span>

                      <span className="text-[11px] font-mono text-steel/50">
                        PU : <strong className="text-amber">${comp.unitPrice.toFixed(2)}</strong>
                      </span>

                      <span className="text-[11px] font-mono text-cyan font-bold">
                        Total : ${lineTotal}
                      </span>
                    </div>

                    {/* Component Name */}
                    <h3 className="text-base sm:text-lg font-display font-bold text-steel-light tracking-wide group-hover:text-amber-bright transition">
                      {comp.name}
                    </h3>

                    {/* Links to AliExpress & Alternative */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {/* Primary AliExpress Link */}
                      <a
                        href={comp.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 text-orange-300 font-mono text-xs font-semibold transition active:scale-95 shadow-sm"
                        title="Ouvrir le produit sur AliExpress"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />
                        <span>Acheter sur {comp.supplier}</span>
                        <ExternalLink className="w-3 h-3 text-orange-400" />
                      </a>

                      {/* Alternative Link ("Si Mieux") */}
                      {comp.alternativeUrl && (
                        <a
                          href={comp.alternativeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/40 text-cyan font-mono text-xs transition active:scale-95"
                          title="Alternative de meilleure qualité ou livraison plus rapide"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
                          <span>Mieux : {comp.alternativeSupplier || 'Alternative Pro'}</span>
                          <ArrowUpRight className="w-3 h-3 text-cyan" />
                        </a>
                      )}
                    </div>

                    {/* Why alternative is better note */}
                    {comp.alternativeReason && (
                      <div className="flex items-start gap-1.5 text-[11px] font-mono text-cyan/90 bg-cyan/5 border border-cyan/20 rounded-lg p-2 max-w-2xl">
                        <Info className="w-3.5 h-3.5 shrink-0 text-cyan mt-0.5" />
                        <span>
                          <strong className="text-cyan font-semibold">Pourquoi cette alternative ?</strong>{' '}
                          {comp.alternativeReason}
                        </span>
                      </div>
                    )}

                    {/* Technical Notes / Gotchas */}
                    {comp.notes && (
                      <div className="text-xs font-sans text-steel/80 flex items-start gap-1.5 pt-1">
                        <span className="font-mono text-amber font-semibold text-[11px]">Note Lab :</span>
                        <span>{comp.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Status Controls */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-steel-border/40">
                    {/* Interactive Status Pill */}
                    <button
                      onClick={() => cycleComponentStatus(comp.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition active:scale-95 ${currentStatus.badge}`}
                      title="Cliquer pour faire avancer le statut"
                    >
                      {currentStatus.icon}
                      <span>{currentStatus.label}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-steel/50">
                        Resp: <strong className="text-steel-light">{comp.assignedTo}</strong>
                      </span>

                      {/* Delete action */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Supprimer ${comp.name} de la liste ?`)) {
                            deleteComponent(comp.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-steel/40 hover:text-red-400 hover:bg-steel-plate/40 transition"
                        title="Supprimer ce composant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: AJOUTER UN COMPOSANT */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-deep/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-void-card border border-steel-border/80 rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-amber" />
                <h4 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                  AJOUTER UN COMPOSANT // SOURCING ALIEXPRESS OU AUTRE
                </h4>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-steel/60 hover:text-white">
                ✕
              </button>
            </div>

            {/* Quick Presets Picker */}
            <div>
              <span className="text-[10px] font-mono text-steel/60 uppercase block mb-1.5">
                MODÈLES RAPIDES PRÉ-CONFIGURÉS :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-2 py-1 rounded bg-void-deep border border-steel-border/50 text-[10px] font-mono text-steel/80 hover:text-amber hover:border-amber transition"
                  >
                    + {p.title}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-steel/70 mb-1">NOM COMPLET DU COMPOSANT</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Moteur Brushless 24V 350W Réducteur Planétaire..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">CATÉGORIE MATÉRIELLE</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DevComponent['category'])}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  >
                    <option value="motors">Moteurs & Transmission</option>
                    <option value="electronics">Électronique & MCU</option>
                    <option value="power">Alimentation & Batterie</option>
                    <option value="sensors">Capteurs & Vision</option>
                    <option value="structural">Structure & Matériaux</option>
                    <option value="hardware">Visserie & Roulements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-steel/70 mb-1">PRIORITÉ DU COMPOSANT</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsRequired(true)}
                      className={`flex-1 py-2 rounded-lg border font-bold transition ${
                        isRequired
                          ? 'bg-amber text-void-deep border-amber shadow-glow-amber'
                          : 'bg-void-deep border-steel-border text-steel'
                      }`}
                    >
                      ★ Nécessaire
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRequired(false)}
                      className={`flex-1 py-2 rounded-lg border font-bold transition ${
                        !isRequired
                          ? 'bg-cyan text-void-deep border-cyan shadow-glow-cyan'
                          : 'bg-void-deep border-steel-border text-steel'
                      }`}
                    >
                      ◈ Optionnel
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-steel/70 mb-1">QUANTITÉ</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">PRIX UNITAIRE ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">FOURNISSEUR PRINCIPAL</label>
                  <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                  />
                </div>
              </div>

              {/* Primary URL */}
              <div>
                <label className="block text-steel/70 mb-1">
                  LIEN VERS L'ARTICLE (ALIEXPRESS OU AUTRE)
                </label>
                <input
                  type="url"
                  placeholder="https://fr.aliexpress.com/item/..."
                  value={primaryUrl}
                  onChange={(e) => setPrimaryUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light focus:border-amber focus:outline-none"
                />
                <span className="text-[10px] text-steel/50 block mt-0.5">
                  Si laissé vide, une recherche AliExpress automatique sera générée avec le nom.
                </span>
              </div>

              {/* Alternative Section */}
              <div className="p-3 rounded-xl bg-cyan/5 border border-cyan/20 space-y-2">
                <div className="flex items-center gap-1.5 text-cyan font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ALTERNATIVE RECOMMANDÉE / MEILLEURE QUALITÉ (SI MIEUX)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nom du fournisseur (ex: Mouser, Amazon...)"
                    value={alternativeSupplier}
                    onChange={(e) => setAlternativeSupplier(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-void-deep border border-steel-border rounded-lg text-steel-light text-[11px]"
                  />
                  <input
                    type="url"
                    placeholder="Lien alternative (https://...)"
                    value={alternativeUrl}
                    onChange={(e) => setAlternativeUrl(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-void-deep border border-steel-border rounded-lg text-steel-light text-[11px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pourquoi est-ce mieux ? (ex: Reçu en 24h, garantie tolérance thermique -40°C)"
                  value={alternativeReason}
                  onChange={(e) => setAlternativeReason(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-void-deep border border-steel-border rounded-lg text-steel-light text-[11px]"
                />
              </div>

              {/* Notes & Assignee */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-steel/70 mb-1">NOTES TECHNIQUES / PIÈGES</label>
                  <input
                    type="text"
                    placeholder="Ex: Arbre 8mm, prendre connecteur étanche..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  />
                </div>
                <div>
                  <label className="block text-steel/70 mb-1">ASSIGNÉ À</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 bg-void-deep border border-steel-border rounded-lg text-steel-light"
                  >
                    <option value="Alex">Alex</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Marc">Marc</option>
                    <option value="Thomas">Thomas</option>
                  </select>
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
                  className="px-5 py-2 rounded-lg bg-amber text-void-deep font-bold hover:bg-amber-bright shadow-glow-amber"
                >
                  Enregistrer Composant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
