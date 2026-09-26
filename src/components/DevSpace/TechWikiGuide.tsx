import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import { soundController } from '../AudioController';

export const TechWikiGuide: React.FC = () => {
  const { gotchas, checklist, toggleChecklistItem } = useDevSpace();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [gotchas[0]?.id || '']: true,
  });

  const toggleExpand = (id: string) => {
    soundController.playMechanicalClick();
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Checklist completion stats
  const completedCount = checklist.filter((c) => c.completed).length;
  const checklistProgress = Math.round((completedCount / (checklist.length || 1)) * 100);

  const categoryIcons: Record<string, React.ReactNode> = {
    waterproofing_mud: <ShieldCheck className="w-4 h-4 text-timber" />,
    power_safety: <Zap className="w-4 h-4 text-amber" />,
    pinouts_wiring: <Cpu className="w-4 h-4 text-cyan" />,
    cnc_timber: <Layers className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-void-card/90 border border-steel-border/70 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-timber/15 border border-timber/30 text-[10px] font-mono text-timber font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            WIKI & MANUEL D'INGÉNIERIE // BON À SAVOIR
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-steel-light tracking-wide">
            GUIDE DU CONSTRUCTEUR & BONNES PRATIQUES TERRAIN
          </h2>
          <p className="text-xs sm:text-sm text-steel/80 leading-relaxed font-sans">
            Toutes les connaissances critiques acquises lors des épreuves de bourbier : étanchéité
            IP67 face à l'argile liquide, isolation électrique 24V, matrice des broches ESP32-S3 et
            tolérances d'assemblage bois/PETG.
          </p>
        </div>
      </div>

      {/* Interactive Mud & Field Pre-Flight Checklist */}
      <div className="p-6 rounded-2xl bg-void-card/80 border border-amber/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-steel-border/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-glow-amber animate-pulse" />
              <h3 className="text-base font-display font-bold text-steel-light uppercase tracking-wider">
                CHECKLIST D'HOMOLOGATION TERRAIN & BOUE (IP67)
              </h3>
            </div>
            <p className="text-xs text-steel/60 font-mono mt-0.5">
              À vérifier impérativement avant toute immersion en sol meuble ou tranchée.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <span className="text-xs text-steel/60 block">PRÉPARATION RUN</span>
              <span
                className={`text-base font-bold ${
                  checklistProgress === 100 ? 'text-emerald-400' : 'text-amber'
                }`}
              >
                {checklistProgress}% PRÊT
              </span>
            </div>
            <div className="w-24 h-3 bg-steel-plate/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-4">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3 rounded-xl border transition flex items-start gap-3 cursor-pointer select-none ${
                item.completed
                  ? 'bg-void-deep/40 border-steel-border/40 opacity-80'
                  : 'bg-void-deep/90 border-steel-border/70 hover:border-amber hover:shadow-glow-amber'
              }`}
            >
              <button
                type="button"
                className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 shrink-0 transition ${
                  item.completed
                    ? 'bg-amber border-amber text-void-deep'
                    : 'border-steel-border/80 hover:border-amber'
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <Circle className="w-2.5 h-2.5 text-steel/30" />
                )}
              </button>

              <div className="space-y-0.5">
                <div
                  className={`text-xs font-sans ${
                    item.completed ? 'line-through text-steel/50' : 'text-steel-light font-medium'
                  }`}
                >
                  {item.label}
                </div>
                {item.checkedBy && (
                  <div className="text-[10px] font-mono text-emerald-400">
                    ✓ Validé par {item.checkedBy}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Knowledge Articles */}
      <div className="space-y-4">
        <h3 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan" />
          <span>FICHES TECHNIQUES & DOSSIERS DE CONCEPTION ({gotchas.length})</span>
        </h3>

        <div className="space-y-4">
          {gotchas.map((guide) => {
            const isExpanded = expandedSections[guide.id];
            return (
              <div
                key={guide.id}
                className="p-5 sm:p-6 rounded-2xl bg-void-card/85 border border-steel-border/70 hover:border-steel transition-all space-y-4 shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-void-deep border border-steel-border/60">
                      {categoryIcons[guide.category] || <BookOpen className="w-4 h-4 text-amber" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber/15 text-amber border border-amber/30 font-bold uppercase tracking-wider">
                          {guide.badge}
                        </span>
                        <span className="text-[11px] font-mono text-steel/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime} de lecture
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-display font-bold text-steel-light mt-0.5">
                        {guide.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(guide.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-deep hover:bg-steel-plate/40 border border-steel-border/60 text-steel-light text-xs font-mono transition self-start sm:self-auto"
                  >
                    <span>{isExpanded ? 'Réduire' : 'Consulter en Détail'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-steel/90 font-sans leading-relaxed">
                  {guide.summary}
                </p>

                {/* Key Points Checklist */}
                <div className="p-4 rounded-xl bg-void-deep/80 border border-steel-border/50 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber font-bold block">
                    // LES RÈGLES MATÉRIELLES À RETENIR :
                  </span>
                  <ul className="space-y-1.5">
                    {guide.keyPoints.map((pt, idx) => (
                      <li
                        key={idx}
                        className="text-xs font-sans text-steel-light flex items-start gap-2"
                      >
                        <span className="text-amber shrink-0 font-mono font-bold">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deep Dive Markdown Section when expanded */}
                {isExpanded && (
                  <div className="pt-4 border-t border-steel-border/50 animate-in fade-in duration-200">
                    <div className="prose prose-invert max-w-none text-xs text-steel/90 font-sans space-y-3 leading-relaxed">
                      {guide.deepDiveMarkdown.split('\n\n').map((block, idx) => {
                        if (block.startsWith('###')) {
                          return (
                            <h5
                              key={idx}
                              className="text-sm font-display font-bold text-cyan uppercase tracking-wider pt-2"
                            >
                              {block.replace('###', '').trim()}
                            </h5>
                          );
                        }
                        if (block.startsWith('```')) {
                          const codeLines = block
                            .replace(/```[a-z]*/, '')
                            .replace(/```/, '')
                            .trim();
                          return (
                            <pre
                              key={idx}
                              className="p-3 bg-void-deep border border-steel-border/60 rounded-xl font-mono text-[11px] text-amber-300 overflow-x-auto"
                            >
                              <code>{codeLines}</code>
                            </pre>
                          );
                        }
                        if (block.includes('|')) {
                          // Table parsing
                          const lines = block.split('\n').filter(Boolean);
                          return (
                            <div key={idx} className="overflow-x-auto my-2">
                              <table className="w-full text-left font-mono text-[11px] border border-steel-border/60 rounded-lg">
                                <tbody>
                                  {lines.map((line, lidx) => {
                                    if (line.includes('---')) return null;
                                    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
                                    if (lidx === 0) {
                                      return (
                                        <tr key={lidx} className="bg-steel-plate/40 text-steel-light">
                                          {cells.map((c, cidx) => (
                                            <th key={cidx} className="p-2 border-b border-steel-border/60">
                                              {c}
                                            </th>
                                          ))}
                                        </tr>
                                      );
                                    }
                                    return (
                                      <tr key={lidx} className="border-b border-steel-border/30 hover:bg-void-deep">
                                        {cells.map((c, cidx) => (
                                          <td key={cidx} className="p-2 text-steel/80">
                                            {c}
                                          </td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          );
                        }
                        return <p key={idx}>{block}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
