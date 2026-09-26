import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  DevProject,
  DevComponent,
  DevResource,
  DevGotchaGuide,
  DevTeamMember,
  DevComment,
  DevActivity,
  DevChecklistItem,
  DevTool,
  DevAgentDiscovery,
  DevAgentScanReport,
} from '../data/devSpaceData';
import {
  INITIAL_DEV_PROJECTS,
  INITIAL_DEV_COMPONENTS,
  INITIAL_DEV_RESOURCES,
  INITIAL_DEV_GOTCHAS,
  INITIAL_DEV_TEAM,
  INITIAL_DEV_COMMENTS,
  INITIAL_DEV_ACTIVITIES,
  INITIAL_DEV_CHECKLIST,
  INITIAL_DEV_TOOLS,
  INITIAL_DEV_DISCOVERIES,
  INITIAL_DEV_SCAN_REPORTS,
} from '../data/devSpaceData';
import { soundController } from '../components/AudioController';

interface DevSpaceContextType {
  // Navigation / Modal
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isUnlocked: boolean;
  setIsUnlocked: (unlocked: boolean) => void;
  activeTab: 'planner' | 'bom' | 'resources' | 'wiki' | 'collab' | 'tools';
  setActiveTab: (tab: 'planner' | 'bom' | 'resources' | 'wiki' | 'collab' | 'tools') => void;

  // Projects
  projects: DevProject[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  selectedProject: DevProject | undefined;
  addProject: (project: Omit<DevProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<DevProject>) => void;
  deleteProject: (id: string) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  addMilestone: (projectId: string, milestone: { title: string; phase: string; dueDate: string; assignee: string }) => void;

  // Components (BOM)
  components: DevComponent[];
  projectComponents: DevComponent[];
  addComponent: (comp: Omit<DevComponent, 'id'>) => void;
  updateComponent: (id: string, updates: Partial<DevComponent>) => void;
  deleteComponent: (id: string) => void;
  cycleComponentStatus: (id: string) => void;

  // Resources & AI Hub
  resources: DevResource[];
  addResource: (res: Omit<DevResource, 'id' | 'addedDate' | 'upvotes'>) => void;
  upvoteResource: (id: string) => void;
  deleteResource: (id: string) => void;

  // Gotchas & Wiki
  gotchas: DevGotchaGuide[];
  checklist: DevChecklistItem[];
  toggleChecklistItem: (id: string) => void;

  // Team & Collaboration
  team: DevTeamMember[];
  currentUser: DevTeamMember;
  setCurrentUser: (member: DevTeamMember) => void;
  comments: DevComment[];
  addComment: (text: string, projectId?: string, componentId?: string, tag?: DevComment['tag']) => void;
  likeComment: (id: string) => void;
  activities: DevActivity[];

  // Tools & Daily Scout Agent
  tools: DevTool[];
  addTool: (tool: Omit<DevTool, 'id' | 'lastChecked'>) => void;
  deleteTool: (id: string) => void;
  discoveries: DevAgentDiscovery[];
  acceptDiscovery: (id: string) => void;
  dismissDiscovery: (id: string) => void;
  agentReports: DevAgentScanReport[];
  isScanning: boolean;
  triggerAgentDailyScan: () => Promise<void>;
  lastScanTime: string;

  // Utilities
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const DevSpaceContext = createContext<DevSpaceContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'mudbot_devspace_v1_';

export const DevSpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Modal & Tab state
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'unlocked') === 'true';
  });
  const [activeTab, setActiveTab] = useState<'planner' | 'bom' | 'resources' | 'wiki' | 'collab' | 'tools'>('planner');
  const [activeProjectId, setActiveProjectId] = useState<string>('mud-crawler');

  // Persistence loaders
  const [projects, setProjects] = useState<DevProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'projects');
      return saved ? JSON.parse(saved) : INITIAL_DEV_PROJECTS;
    } catch {
      return INITIAL_DEV_PROJECTS;
    }
  });

  const [components, setComponents] = useState<DevComponent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'components');
      return saved ? JSON.parse(saved) : INITIAL_DEV_COMPONENTS;
    } catch {
      return INITIAL_DEV_COMPONENTS;
    }
  });

  const [resources, setResources] = useState<DevResource[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'resources');
      return saved ? JSON.parse(saved) : INITIAL_DEV_RESOURCES;
    } catch {
      return INITIAL_DEV_RESOURCES;
    }
  });

  const [gotchas] = useState<DevGotchaGuide[]>(INITIAL_DEV_GOTCHAS);

  const [checklist, setChecklist] = useState<DevChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'checklist');
      return saved ? JSON.parse(saved) : INITIAL_DEV_CHECKLIST;
    } catch {
      return INITIAL_DEV_CHECKLIST;
    }
  });

  const [team] = useState<DevTeamMember[]>(INITIAL_DEV_TEAM);
  const [currentUser, setCurrentUser] = useState<DevTeamMember>(INITIAL_DEV_TEAM[0]);

  const [comments, setComments] = useState<DevComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'comments');
      return saved ? JSON.parse(saved) : INITIAL_DEV_COMMENTS;
    } catch {
      return INITIAL_DEV_COMMENTS;
    }
  });

  const [activities, setActivities] = useState<DevActivity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'activities');
      return saved ? JSON.parse(saved) : INITIAL_DEV_ACTIVITIES;
    } catch {
      return INITIAL_DEV_ACTIVITIES;
    }
  });

  // Tools & Agent Watchdog state
  const [tools, setTools] = useState<DevTool[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'tools');
      return saved ? JSON.parse(saved) : INITIAL_DEV_TOOLS;
    } catch {
      return INITIAL_DEV_TOOLS;
    }
  });

  const [discoveries, setDiscoveries] = useState<DevAgentDiscovery[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'discoveries');
      return saved ? JSON.parse(saved) : INITIAL_DEV_DISCOVERIES;
    } catch {
      return INITIAL_DEV_DISCOVERIES;
    }
  });

  const [agentReports, setAgentReports] = useState<DevAgentScanReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'agent_reports');
      return saved ? JSON.parse(saved) : INITIAL_DEV_SCAN_REPORTS;
    } catch {
      return INITIAL_DEV_SCAN_REPORTS;
    }
  });

  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'last_scan') || 'Aujourd\'hui 06:15';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'unlocked', isUnlocked ? 'true' : 'false');
  }, [isUnlocked]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'components', JSON.stringify(components));
  }, [components]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'discoveries', JSON.stringify(discoveries));
  }, [discoveries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'agent_reports', JSON.stringify(agentReports));
  }, [agentReports]);

  // Derived selected project
  const selectedProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Derived components for active project
  const projectComponents = components.filter(
    (c) => c.projectId === activeProjectId || c.projectId === 'global'
  );

  // Activity logger helper
  const logActivity = (action: string, detail: string, type: DevActivity['type']) => {
    const newAct: DevActivity = {
      id: 'act-' + Date.now(),
      userName: currentUser.name,
      action,
      detail,
      timestamp: 'À l\'instant',
      type,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 40)]);
  };

  // --- Project Actions ---
  const addProject = (projData: Omit<DevProject, 'id'>) => {
    const newId = 'proj-' + Date.now();
    const newProj: DevProject = { ...projData, id: newId };
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newId);
    logActivity('a créé le projet', newProj.name, 'milestone');
    soundController.playTerminalChirp();
  };

  const updateProject = (id: string, updates: Partial<DevProject>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    soundController.playMechanicalClick();
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProjectId === id && projects.length > 1) {
      setActiveProjectId(projects.find((p) => p.id !== id)?.id || '');
    }
    soundController.playHydraulic();
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newMilestones = proj.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = newMilestones.filter((m) => m.completed).length;
        const newProgress = Math.round((completedCount / (newMilestones.length || 1)) * 100);
        return {
          ...proj,
          milestones: newMilestones,
          progressPercent: newProgress,
        };
      })
    );
    soundController.playMechanicalClick(950);
  };

  const addMilestone = (
    projectId: string,
    milestone: { title: string; phase: string; dueDate: string; assignee: string }
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newM = {
          id: 'm-' + Date.now(),
          title: milestone.title,
          phase: milestone.phase,
          completed: false,
          dueDate: milestone.dueDate,
          assignee: milestone.assignee,
        };
        const updatedMilestones = [...proj.milestones, newM];
        return {
          ...proj,
          milestones: updatedMilestones,
        };
      })
    );
    logActivity('a planifié un nouveau jalon', `${milestone.title} (${selectedProject?.name})`, 'milestone');
    soundController.playTerminalChirp();
  };

  // --- Components Actions ---
  const addComponent = (compData: Omit<DevComponent, 'id'>) => {
    const newComp: DevComponent = {
      ...compData,
      id: 'comp-' + Date.now(),
    };
    setComponents((prev) => [newComp, ...prev]);
    logActivity('a ajouté le composant', `${newComp.name} (${newComp.isRequired ? 'Nécessaire' : 'Optionnel'})`, 'component');
    soundController.playTerminalChirp();
  };

  const updateComponent = (id: string, updates: Partial<DevComponent>) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    soundController.playMechanicalClick();
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    soundController.playHydraulic();
  };

  const cycleComponentStatus = (id: string) => {
    const order: DevComponent['status'][] = ['to_order', 'ordered', 'received', 'tested'];
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const currentIdx = order.indexOf(c.status);
        const nextStatus = order[(currentIdx + 1) % order.length];
        logActivity('a mis à jour le composant', `${c.name} -> ${nextStatus}`, 'component');
        return { ...c, status: nextStatus };
      })
    );
    soundController.playMechanicalClick(1100);
  };

  // --- Resources Actions ---
  const addResource = (resData: Omit<DevResource, 'id' | 'addedDate' | 'upvotes'>) => {
    const newRes: DevResource = {
      ...resData,
      id: 'res-' + Date.now(),
      addedDate: new Date().toISOString().split('T')[0],
      upvotes: 1,
    };
    setResources((prev) => [newRes, ...prev]);
    logActivity('a partagé une ressource', newRes.title, 'resource');
    soundController.playTerminalChirp();
  };

  const upvoteResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
    soundController.playMechanicalClick(1300);
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    soundController.playHydraulic();
  };

  // --- Checklist Actions ---
  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              checkedBy: !item.completed ? currentUser.name.split(' ')[0] : undefined,
            }
          : item
      )
    );
    soundController.playMechanicalClick();
  };

  // --- Comments Actions ---
  const addComment = (
    text: string,
    projectId?: string,
    componentId?: string,
    tag?: DevComment['tag']
  ) => {
    if (!text.trim()) return;
    const newC: DevComment = {
      id: 'comm-' + Date.now(),
      authorName: currentUser.name,
      authorRole: currentUser.role,
      timestamp: 'À l\'instant',
      text,
      likes: 0,
      projectId: projectId || activeProjectId,
      componentId,
      tag: tag || 'suggestion',
    };
    setComments((prev) => [newC, ...prev]);
    logActivity('a commenté dans le lab', text.substring(0, 50) + '...', 'comment');
    soundController.playTerminalChirp();
  };

  const likeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
    soundController.playMechanicalClick(1200);
  };

  // --- Tools & Daily Scout Agent Actions ---
  const addTool = (toolData: Omit<DevTool, 'id' | 'lastChecked'>) => {
    const newTool: DevTool = {
      ...toolData,
      id: 'tool-' + Date.now(),
      lastChecked: 'Aujourd\'hui',
    };
    setTools((prev) => [newTool, ...prev]);
    logActivity('a répertorié un nouvel outil', newTool.name, 'resource');
    soundController.playTerminalChirp();
  };

  const deleteTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
    soundController.playHydraulic();
  };

  const acceptDiscovery = (id: string) => {
    const disc = discoveries.find((d) => d.id === id);
    if (!disc) return;

    // Add to tools collection
    const newTool: DevTool = {
      id: 'tool-auto-' + Date.now(),
      name: disc.title,
      category: disc.category,
      url: disc.url,
      description: disc.description,
      badge: 'Agent Validé',
      recommendedFor: disc.recommendedFor,
      pricing: 'Gratuit',
      lastChecked: 'Aujourd\'hui',
    };

    setTools((prev) => [newTool, ...prev]);
    setDiscoveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'accepted' } : d))
    );
    logActivity('a validé la découverte de l\'agent', disc.title, 'resource');
    soundController.playTerminalChirp();
  };

  const dismissDiscovery = (id: string) => {
    setDiscoveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'dismissed' } : d))
    );
    soundController.playMechanicalClick(750);
  };

  const triggerAgentDailyScan = async (): Promise<void> => {
    setIsScanning(true);
    soundController.playTerminalChirp();

    // Simulated scan sweep delay (1.8s)
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullTimeStr = `Aujourd'hui ${nowStr}`;
    setLastScanTime(fullTimeStr);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'last_scan', fullTimeStr);

    // Create fresh discovered item
    const possibleDiscoveries: DevAgentDiscovery[] = [
      {
        id: 'disc-dyn-' + Date.now(),
        title: 'Micro-ROS Wi-Fi Power Throttler Daemon',
        category: 'firmware_mcu',
        url: 'https://github.com/micro-ROS',
        source: 'GitHub Robotics Digest',
        description: 'Module C++ de régulation adaptative du débit Wi-Fi sur ESP32-S3 lorsque le rover s\'enfonce dans une tranchée argileuse.',
        recommendedFor: 'Évite la coupure brutale du flux de télémétrie en zone humide.',
        relevanceScore: 97,
        discoveredDate: `Scan de ${nowStr}`,
        status: 'pending',
      },
      {
        id: 'disc-dyn-2-' + Date.now(),
        title: 'KiCad Gerber MudShield Copper Layer Template (2oz)',
        category: 'electronics_sim',
        url: 'https://github.com',
        source: 'Hackaday Open Hardware',
        description: 'Gabarit de PCB 2 couches avec blindage de masse thermique et pistes 40A pré-dimensionnées pour ESC brushless.',
        recommendedFor: 'Dissipation thermique passive sous châssis bois fermé.',
        relevanceScore: 94,
        discoveredDate: `Scan de ${nowStr}`,
        status: 'pending',
      },
    ];

    const chosen = possibleDiscoveries[Math.floor(Math.random() * possibleDiscoveries.length)];

    setDiscoveries((prev) => [chosen, ...prev.slice(0, 10)]);

    const newReport: DevAgentScanReport = {
      id: 'rep-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      date: `Aujourd'hui (${nowStr})`,
      status: 'completed',
      sourcesChecked: [
        'GitHub Releases (ESP-IDF, micro-ROS, VESC)',
        'ArXiv Robotics & Edge AI Preprints',
        'Printables & Thingiverse 3D Models',
        'AliExpress Moteurs & Batteries LiFePO4',
        'LCSC & Mouser Stock Watcher',
      ],
      findingsCount: 1,
      summary: `Scan de l'agent terminé en 1.8s avec 1 nouvelle découverte pertinente (${chosen.title}) détectée sur les dépôts de robotique.`,
      durationMs: 1820,
    };

    setAgentReports((prev) => [newReport, ...prev.slice(0, 8)]);
    logActivity('L\'Agent de Veille a terminé sa vérification', `${chosen.title} identifié`, 'resource');

    setIsScanning(false);
    soundController.playHydraulic();
  };

  // --- Import / Export / Reset ---
  const exportDataJson = () => {
    const data = {
      version: '1.2',
      exportedAt: new Date().toISOString(),
      projects,
      components,
      resources,
      tools,
      discoveries,
      agentReports,
      checklist,
      comments,
      activities,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mudbot_devspace_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    soundController.playTerminalChirp();
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.components && Array.isArray(parsed.components)) setComponents(parsed.components);
      if (parsed.resources && Array.isArray(parsed.resources)) setResources(parsed.resources);
      if (parsed.tools && Array.isArray(parsed.tools)) setTools(parsed.tools);
      if (parsed.discoveries && Array.isArray(parsed.discoveries)) setDiscoveries(parsed.discoveries);
      if (parsed.checklist && Array.isArray(parsed.checklist)) setChecklist(parsed.checklist);
      if (parsed.comments && Array.isArray(parsed.comments)) setComments(parsed.comments);
      soundController.playTerminalChirp();
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les données de l\'Espace Développeurs aux valeurs par défaut du lab ?')) {
      setProjects(INITIAL_DEV_PROJECTS);
      setComponents(INITIAL_DEV_COMPONENTS);
      setResources(INITIAL_DEV_RESOURCES);
      setTools(INITIAL_DEV_TOOLS);
      setDiscoveries(INITIAL_DEV_DISCOVERIES);
      setAgentReports(INITIAL_DEV_SCAN_REPORTS);
      setChecklist(INITIAL_DEV_CHECKLIST);
      setComments(INITIAL_DEV_COMMENTS);
      setActivities(INITIAL_DEV_ACTIVITIES);
      soundController.playSubThud();
    }
  };

  return (
    <DevSpaceContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isUnlocked,
        setIsUnlocked,
        activeTab,
        setActiveTab,
        projects,
        activeProjectId,
        setActiveProjectId,
        selectedProject,
        addProject,
        updateProject,
        deleteProject,
        toggleMilestone,
        addMilestone,
        components,
        projectComponents,
        addComponent,
        updateComponent,
        deleteComponent,
        cycleComponentStatus,
        resources,
        addResource,
        upvoteResource,
        deleteResource,
        gotchas,
        checklist,
        toggleChecklistItem,
        team,
        currentUser,
        setCurrentUser,
        comments,
        addComment,
        likeComment,
        activities,
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
        exportDataJson,
        importDataJson,
        resetToDefaults,
      }}
    >
      {children}
    </DevSpaceContext.Provider>
  );
};

export const useDevSpace = () => {
  const context = useContext(DevSpaceContext);
  if (!context) {
    throw new Error('useDevSpace must be used within a DevSpaceProvider');
  }
  return context;
};
