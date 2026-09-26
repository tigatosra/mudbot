import React, { useState, useRef } from 'react';
import {
  Users,
  MessageSquare,
  Send,
  ThumbsUp,
  Download,
  Upload,
  AlertTriangle,
  Lightbulb,
  ShoppingCart,
  CheckCircle,
  Activity,
  FileJson,
} from 'lucide-react';
import { useDevSpace } from '../../context/DevSpaceContext';
import type { DevComment, DevTeamMember } from '../../data/devSpaceData';
import { soundController } from '../AudioController';

export const CollaborationFeed: React.FC = () => {
  const {
    team,
    currentUser,
    setCurrentUser,
    comments,
    addComment,
    likeComment,
    activities,
    activeProjectId,
    exportDataJson,
    importDataJson,
    resetToDefaults,
  } = useDevSpace();

  const [commentText, setCommentText] = useState('');
  const [selectedTag, setSelectedTag] = useState<DevComment['tag']>('suggestion');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [importError, setImportError] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(commentText.trim(), activeProjectId, undefined, selectedTag);
    setCommentText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = importDataJson(text);
      if (success) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(true);
        setTimeout(() => setImportError(false), 3000);
      }
    };
    reader.readAsText(file);
  };

  const tagMeta: Record<
    NonNullable<DevComment['tag']>,
    { label: string; icon: React.ReactNode; badge: string }
  > = {
    alert: {
      label: 'ALERTE TECHNIQUE',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-red-400" />,
      badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    },
    suggestion: {
      label: 'SUGGESTION ARCHI',
      icon: <Lightbulb className="w-3.5 h-3.5 text-amber" />,
      badge: 'bg-amber/15 text-amber border-amber/30',
    },
    aliexpress_deal: {
      label: 'BON PLAN ALIEXPRESS',
      icon: <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />,
      badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    },
    tested: {
      label: 'TEST VALIDÉ OK',
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
  };

  const statusIndicators: Record<
    DevTeamMember['status'],
    { label: string; dot: string }
  > = {
    online: { label: 'En ligne', dot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]' },
    busy: { label: 'Banc d\'essai', dot: 'bg-amber shadow-[0_0_8px_#fbbf24]' },
    testing_in_mud: { label: 'Épreuve Boue', dot: 'bg-timber shadow-[0_0_8px_#d4a373]' },
    in_cad: { label: 'Conception CAO', dot: 'bg-cyan shadow-[0_0_8px_#00e5ff]' },
  };

  const filteredComments = comments.filter((c) => {
    if (filterTag === 'all') return true;
    return c.tag === filterTag;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Collaborative Team Presence */}
      <div className="p-6 rounded-2xl bg-void-card/90 border border-steel-border/70 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan/15 border border-cyan/40">
              <Users className="w-5 h-5 text-cyan" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-steel-light uppercase tracking-wider">
                ÉQUIPE DU LAB // PRÉSENCE EN DIRECT
              </h2>
              <p className="text-xs text-steel/60 font-mono">
                {team.length} membres actifs connectés au système de coordination
              </p>
            </div>
          </div>

          {/* Identity switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-void-deep border border-steel-border/60">
            <span className="text-[10px] font-mono uppercase text-steel/60 pl-2">
              Vous êtes :
            </span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = team.find((t) => t.id === e.target.value);
                if (found) {
                  soundController.playMechanicalClick();
                  setCurrentUser(found);
                }
              }}
              className="px-2.5 py-1 bg-void-card border border-steel-border rounded-lg text-xs font-mono font-bold text-amber focus:border-amber focus:outline-none"
            >
              {team.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role.split('&')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Teammates Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {team.map((member) => {
            const isMe = member.id === currentUser.id;
            const statusInfo = statusIndicators[member.status];
            return (
              <div
                key={member.id}
                onClick={() => {
                  soundController.playMechanicalClick();
                  setCurrentUser(member);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                  isMe
                    ? 'bg-void-deep/90 border-amber shadow-glow-amber'
                    : 'bg-void-deep/60 border-steel-border/60 hover:border-steel'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-void-deep text-xs shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.avatar}
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-steel-light truncate">
                        {member.name}
                      </span>
                      {isMe && (
                        <span className="text-[9px] font-mono px-1 bg-amber text-void-deep rounded font-bold">
                          MOI
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-steel/60 truncate">
                      {member.role}
                    </div>
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-steel/70">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-steel-border/40 text-[10px] text-steel/70 italic line-clamp-2">
                  "{member.currentActivity}"
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Discussion Thread & Activity Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Collaborative Discussion Wall */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-void-card/85 border border-steel-border/70 backdrop-blur-md space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel-border/50 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber" />
                <h3 className="text-base font-display font-bold text-steel-light uppercase tracking-wider">
                  FIL DE DISCUSSION DU LAB ({filteredComments.length})
                </h3>
              </div>

              {/* Tag Filters */}
              <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                <button
                  onClick={() => setFilterTag('all')}
                  className={`px-2 py-1 rounded transition ${
                    filterTag === 'all'
                      ? 'bg-steel-plate text-white font-bold'
                      : 'bg-void-deep text-steel/60 hover:text-white'
                  }`}
                >
                  Tous
                </button>
                {Object.entries(tagMeta).map(([k, meta]) => (
                  <button
                    key={k}
                    onClick={() => setFilterTag(k)}
                    className={`px-2 py-1 rounded border transition ${
                      filterTag === k ? meta.badge + ' font-bold' : 'bg-void-deep border-steel-border/40 text-steel/60'
                    }`}
                  >
                    {meta.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handlePostComment} className="p-4 rounded-xl bg-void-deep/90 border border-steel-border/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-steel/70">
                <span>Rédiger en tant que :</span>
                <span className="font-bold text-amber">{currentUser.name}</span>
                <span className="text-steel/40">({currentUser.role})</span>
              </div>

              <textarea
                rows={3}
                required
                placeholder="Partagez un retour d'essai dans la boue, un conseil d'étanchéité, ou un lien vers un composant AliExpress..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 bg-void border border-steel-border rounded-lg text-xs font-mono text-steel-light placeholder-steel/40 focus:border-amber focus:outline-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-steel/60">Tag :</span>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value as DevComment['tag'])}
                    className="px-2 py-1 bg-void border border-steel-border rounded text-[11px] font-mono text-steel-light focus:outline-none"
                  >
                    <option value="suggestion">💡 Suggestion Archi</option>
                    <option value="alert">⚠️ Alerte Technique</option>
                    <option value="aliexpress_deal">🛒 Bon Plan AliExpress</option>
                    <option value="tested">✅ Test Validé OK</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber hover:bg-amber-bright text-void-deep font-mono text-xs font-bold rounded-lg transition shadow-glow-amber active:scale-95 uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publier dans le Lab</span>
                </button>
              </div>
            </form>

            {/* Comments Stream */}
            <div className="space-y-3">
              {filteredComments.map((comm) => {
                const meta = comm.tag ? tagMeta[comm.tag] : tagMeta.suggestion;
                return (
                  <div
                    key={comm.id}
                    className="p-4 rounded-xl bg-void-deep/75 border border-steel-border/60 hover:border-steel transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-steel-plate/60 flex items-center justify-center font-mono font-bold text-[11px] text-amber">
                          {comm.authorName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-steel-light">
                            {comm.authorName}
                          </div>
                          <div className="text-[10px] font-mono text-steel/50">
                            {comm.authorRole} • {comm.timestamp}
                          </div>
                        </div>
                      </div>

                      {comm.tag && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border uppercase font-bold ${meta.badge}`}
                        >
                          {meta.icon}
                          <span>{meta.label}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-sans text-steel-light/95 leading-relaxed pl-9">
                      {comm.text}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-steel-border/30">
                      <button
                        onClick={() => likeComment(comm.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-void hover:bg-amber/10 border border-steel-border/50 text-[11px] font-mono text-steel hover:text-amber transition"
                      >
                        <ThumbsUp className="w-3 h-3 text-amber" />
                        <span>{comm.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Activity Audit Trail & Cloud Sync */}
        <div className="space-y-4">
          {/* Activity Log */}
          <div className="p-5 rounded-2xl bg-void-card/85 border border-steel-border/70 backdrop-blur-md space-y-3 shadow-lg">
            <div className="flex items-center gap-2 pb-2 border-b border-steel-border/50">
              <Activity className="w-4 h-4 text-cyan" />
              <h3 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                JOURNAL D'ACTIVITÉ EN DIRECT
              </h3>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-2.5 rounded-lg bg-void-deep/80 border border-steel-border/40 text-[11px] font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-steel/50 text-[10px]">
                    <span className="text-amber font-semibold">{act.userName}</span>
                    <span>{act.timestamp}</span>
                  </div>
                  <div className="text-steel/80">
                    <span className="text-cyan">{act.action}</span> : {act.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backup, Export & Restore Workspace */}
          <div className="p-5 rounded-2xl bg-void-card/85 border border-steel-border/70 backdrop-blur-md space-y-3 shadow-lg">
            <div className="flex items-center gap-2 pb-2 border-b border-steel-border/50">
              <FileJson className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-display font-bold text-steel-light uppercase tracking-wider">
                EXPORT & PARTAGE DU LAB
              </h3>
            </div>

            <p className="text-xs text-steel/70 font-sans">
              Téléchargez l'ensemble des projets, de la nomenclature AliExpress et des ressources
              pour travailler hors ligne ou synchroniser avec un autre collaborateur.
            </p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              <button
                onClick={exportDataJson}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-steel-plate hover:bg-steel-border text-steel-light rounded-lg transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-cyan" />
                <span>Exporter le Lab (.json)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-void-deep border border-steel-border/70 hover:border-emerald-400 text-steel-light rounded-lg transition active:scale-95"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Importer un fichier JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />

              {importSuccess && (
                <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] text-center">
                  ✓ Lab restauré avec succès !
                </div>
              )}
              {importError && (
                <div className="p-2 rounded bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] text-center">
                  ✕ Erreur : format JSON invalide.
                </div>
              )}

              <button
                onClick={resetToDefaults}
                className="w-full text-center text-[10px] text-steel/50 hover:text-red-400 pt-2 transition underline"
              >
                Réinitialiser toutes les données d'usine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
