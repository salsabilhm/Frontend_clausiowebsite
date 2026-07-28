// src/context/DataContext.tsx
/* eslint-disable react-refresh/only-export-components */

/**
 * ------------------------------------------------------------------
 * DATA CONTEXT & PROVIDER
 * ------------------------------------------------------------------
 *
 * Ce Context est le cœur de la gestion des données de l'application.
 * Il orchestre :
 * - Les Projets (Projects)
 * - Les Clients
 * - Les Contrats / Spécifications (Contracts)
 * - Le flux d'activités récentes (Recent Activity Feed)
 * - Les statistiques calculées pour le Tableau de bord (Dashboard Stats)
 *
 * Fonctionnalité clef (Mock Switcher) :
 * Grâce à VITE_USE_MOCK_DATA, il bascule automatiquement entre :
 * - Mode Mock (Local Storage + Données de test)
 * - Mode API (Serveur Backend réel via dataApi)
 * ------------------------------------------------------------------
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  Project,
  Client,
  Contract,
  DashboardStat,
  RecentProject,
  RecentActivity,
  QuickAction,
} from "../types";
import { projects as seedProjects } from "../mock/projects";
import { clients as seedClients } from "../mock/clients";
import { initialContracts as seedContracts } from "../mock/history";
import { initialRecentActivity, quickActionsList } from "../mock/dashboard";
import { dataApi } from "../api/data.api";

// ===================== CONFIGURATION & MOCK SWITCHER =====================
// Détermine si l'application fonctionne avec le serveur réel ou des données locales.
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true" || true;

// Clés d'accès au stockage local (LocalStorage)
const PROJECTS_STORAGE_KEY = "app_projects";
const CLIENTS_STORAGE_KEY = "app_clients";
const CONTRACTS_STORAGE_KEY = "app_contracts";
const ACTIVITY_STORAGE_KEY = "app_activity";

// ===================== INTERFACE CONTEXT =====================
interface DataContextType {
  // États
  projects: Project[];
  clients: Client[];
  contracts: Contract[];
  recentActivity: RecentActivity[];
  isLoading: boolean;
  isMockMode: boolean; // Indique à l'application quel mode est actif

  // Dashboard — Valeurs dérivées/calculées
  dashboardStats: DashboardStat[];
  recentProjects: RecentProject[];
  quickActions: QuickAction[];

  // Actions Dashboard
  addActivity: (activity: Omit<RecentActivity, "id">) => Promise<RecentActivity>;

  // Actions Projets
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  getProjectsByClient: (clientId: string) => Project[];

  // Actions Clients
  addClient: (client: Omit<Client, "id">) => Promise<Client>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClientById: (id: string) => Client | undefined;

  // Actions Contrats
  addContract: (
    contract: Omit<Contract, "id" | "createdAt" | "lastModified">
  ) => Promise<Contract>;
  updateContract: (id: string, updates: Partial<Contract>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
  toggleContractFavorite: (id: string) => Promise<void>;
  duplicateContract: (id: string) => Promise<Contract | undefined>;
  getContractById: (id: string) => Contract | undefined;
  getContractsByProject: (projectId: string) => Contract[];

  // Utilitaire
  resetToDefaultData: () => void;
}

// ===================== CRÉATION DU CONTEXT =====================
const DataContext = createContext<DataContextType | undefined>(undefined);

// ===================== HELPER STORAGE (MOCK) =====================
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // Si le contenu stocké est corrompu, retour aux données de test
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Le stockage local peut être saturé ou restreint par le navigateur
  }
}

function nowIso(): string {
  return new Date().toISOString();
}

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

// ===================== DATAPROVIDER COMPONENT =====================
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ----- Chargement initial des données -----
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      if (USE_MOCK_DATA) {
        // 🧪 MODE MOCK : Charger depuis le LocalStorage
        setProjects(loadFromStorage<Project[]>(PROJECTS_STORAGE_KEY, seedProjects));
        setClients(loadFromStorage<Client[]>(CLIENTS_STORAGE_KEY, seedClients));

        const storedContracts = loadFromStorage<Contract[]>(
          CONTRACTS_STORAGE_KEY,
          seedContracts
        );
        const revivedContracts = storedContracts.map((c) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          lastModified: new Date(c.lastModified),
        }));
        setContracts(revivedContracts);

        setRecentActivity(
          loadFromStorage<RecentActivity[]>(
            ACTIVITY_STORAGE_KEY,
            initialRecentActivity
          )
        );
      } else {
        // 🌐 MODE API : Récupérer les données réelles du serveur
        try {
          const [fetchedProjects, fetchedClients, fetchedContracts, fetchedActivities] =
            await Promise.all([
              dataApi.getProjects(),
              dataApi.getClients(),
              dataApi.getContracts(),
              dataApi.getActivities(),
            ]);

          setProjects(fetchedProjects);
          setClients(fetchedClients);
          setContracts(
            fetchedContracts.map((c) => ({
              ...c,
              createdAt: new Date(c.createdAt),
              lastModified: new Date(c.lastModified),
            }))
          );
          setRecentActivity(fetchedActivities);
        } catch (error) {
          console.error("Erreur lors du chargement des données API :", error);
        }
      }
      setIsLoading(false);
    };

    // Fix ESLint: Traitement explicite de la promesse
    void initData();
  }, []);

  // ----- Persistence dans LocalStorage (Seulement en Mode Mock) -----
  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(PROJECTS_STORAGE_KEY, projects);
    }
  }, [projects, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(CLIENTS_STORAGE_KEY, clients);
    }
  }, [clients, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(CONTRACTS_STORAGE_KEY, contracts);
    }
  }, [contracts, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(ACTIVITY_STORAGE_KEY, recentActivity);
    }
  }, [recentActivity, isLoading]);

  // ===================== DASHBOARD — ACTIONS =====================

  /**
   * Enregistre une nouvelle activité dans le journal récapitulatif
   */
  const addActivity: DataContextType["addActivity"] = async (activity) => {
    if (USE_MOCK_DATA) {
      const newActivity: RecentActivity = {
        ...activity,
        id: `activity-${Date.now()}`,
      };
      setRecentActivity((prev) => [newActivity, ...prev].slice(0, 20));
      return newActivity;
    } else {
      const created = await dataApi.createActivity(activity);
      setRecentActivity((prev) => [created, ...prev].slice(0, 20));
      return created;
    }
  };

  // ===================== DASHBOARD — VALEURS CALCULÉES =====================

  // Statistiques globales recalculées à chaque changement de projets/clients/contrats
  const dashboardStats: DashboardStat[] = useMemo(() => {
    const totalProjects = projects.length;
    const activeCount = projects.filter((p) => p.status === "Processing").length;
    const completedCount = projects.filter((p) => p.status === "Completed").length;
    const draftCount = projects.filter((p) => p.status === "Draft").length;
    const totalClients = clients.length;
    const totalContracts = contracts.length;

    const projectsThisWeek = projects.filter(
      (p) => new Date(p.createdAt) >= daysAgo(7)
    ).length;
    const clientsThisWeek = clients.filter(
      (c) => c.createdAt && new Date(c.createdAt) >= daysAgo(7)
    ).length;
    const contractsThisWeek = contracts.filter(
      (c) => new Date(c.createdAt) >= daysAgo(7)
    ).length;
    const completionRate =
      totalProjects > 0 ? Math.round((completedCount / totalProjects) * 100) : 0;

    return [
      {
        id: "stat-total-projects",
        label: "Total Projects",
        value: totalProjects,
        trend: `+${projectsThisWeek} cette semaine`,
      },
      {
        id: "stat-active-projects",
        label: "Active Projects",
        value: activeCount,
        trend: "En cours",
      },
      {
        id: "stat-completed-projects",
        label: "Completed Projects",
        value: completedCount,
        trend: `${completionRate}% taux de réussite`,
      },
      {
        id: "stat-draft-projects",
        label: "Draft Projects",
        value: draftCount,
        trend: "Brouillon",
        isLive: true,
      },
      {
        id: "stat-ai-generations",
        label: "AI Generations",
        value: totalContracts,
        trend: `+${contractsThisWeek} cette semaine`,
      },
      {
        id: "stat-total-clients",
        label: "Total Clients",
        value: totalClients,
        trend: `+${clientsThisWeek} cette semaine`,
      },
    ];
  }, [projects, clients, contracts]);

  // Les 4 projets les plus récents
  const recentProjects: RecentProject[] = useMemo(() => {
    return [...projects]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        name: p.name,
        clientName: p.clientName,
        status: p.status,
        progress: p.progress,
        source: p.source,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
  }, [projects]);

  const quickActions: QuickAction[] = quickActionsList;

  // ===================== ACTIONS PROJETS =====================

  const addProject: DataContextType["addProject"] = async (project) => {
    if (USE_MOCK_DATA) {
      const newProject: Project = {
        ...project,
        id: `project-${Date.now()}`,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      setProjects((prev) => [newProject, ...prev]);

      setClients((prev) =>
        prev.map((c) =>
          c.id === newProject.clientId
            ? { ...c, projectsCount: c.projectsCount + 1 }
            : c
        )
      );

      void addActivity({
        title: "Projet créé",
        description: `${newProject.name} · ${newProject.clientName}`,
        date: nowIso().slice(0, 10),
        time: "À l'instant",
        user: "Vous",
        source: "Manual",
        projectId: newProject.id,
        clientId: newProject.clientId,
      });

      return newProject;
    } else {
      const created = await dataApi.createProject(project);
      setProjects((prev) => [created, ...prev]);
      return created;
    }
  };

  const updateProject: DataContextType["updateProject"] = async (id, updates) => {
    if (USE_MOCK_DATA) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: nowIso() } : p))
      );
    } else {
      const updated = await dataApi.updateProject(id, updates);
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  };

  const deleteProject: DataContextType["deleteProject"] = async (id) => {
    if (USE_MOCK_DATA) {
      const target = projects.find((p) => p.id === id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (target) {
        setClients((prev) =>
          prev.map((c) =>
            c.id === target.clientId
              ? { ...c, projectsCount: Math.max(0, c.projectsCount - 1) }
              : c
          )
        );
      }
    } else {
      await dataApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getProjectById: DataContextType["getProjectById"] = (id) =>
    projects.find((p) => p.id === id);

  const getProjectsByClient: DataContextType["getProjectsByClient"] = (clientId) =>
    projects.filter((p) => p.clientId === clientId || p.clientName === clientId);

  // ===================== ACTIONS CLIENTS =====================

  const addClient: DataContextType["addClient"] = async (client) => {
    if (USE_MOCK_DATA) {
      const newClient: Client = {
        ...client,
        id: `client-${Date.now()}`,
        createdAt: nowIso(),
      };
      setClients((prev) => [newClient, ...prev]);

      void addActivity({
        title: "Client ajouté",
        description: `${newClient.name} · ${newClient.company}`,
        date: nowIso().slice(0, 10),
        time: "À l'instant",
        user: "Vous",
        source: "Manual",
        clientId: newClient.id,
      });

      return newClient;
    } else {
      const created = await dataApi.createClient(client);
      setClients((prev) => [created, ...prev]);
      return created;
    }
  };

  const updateClient: DataContextType["updateClient"] = async (id, updates) => {
    if (USE_MOCK_DATA) {
      setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    } else {
      const updated = await dataApi.updateClient(id, updates);
      setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
  };

  const deleteClient: DataContextType["deleteClient"] = async (id) => {
    if (USE_MOCK_DATA) {
      setClients((prev) => prev.filter((c) => c.id !== id));
      // Suppression en cascade des projets associés
      setProjects((prev) => prev.filter((p) => p.clientId !== id));
    } else {
      await dataApi.deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const getClientById: DataContextType["getClientById"] = (id) =>
    clients.find((c) => c.id === id);

  // ===================== ACTIONS CONTRATS =====================

  const addContract: DataContextType["addContract"] = async (contract) => {
    if (USE_MOCK_DATA) {
      const now = new Date();
      const newContract: Contract = {
        ...contract,
        id: `contract-${Date.now()}`,
        createdAt: now,
        lastModified: now,
      };
      setContracts((prev) => [newContract, ...prev]);

      void addActivity({
        title: "Spécification générée",
        description: `${newContract.projectName} · ${newContract.type}`,
        date: now.toISOString().slice(0, 10),
        time: "À l'instant",
        user: "Vous",
        source: "AI",
        projectId: newContract.projectId,
        clientId: newContract.clientId,
        contractId: newContract.id,
      });

      return newContract;
    } else {
      const created = await dataApi.createContract(contract);
      setContracts((prev) => [created, ...prev]);
      return created;
    }
  };

  const updateContract: DataContextType["updateContract"] = async (id, updates) => {
    if (USE_MOCK_DATA) {
      setContracts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates, lastModified: new Date() } : c))
      );
    } else {
      const updated = await dataApi.updateContract(id, updates);
      setContracts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
  };

  const deleteContract: DataContextType["deleteContract"] = async (id) => {
    if (USE_MOCK_DATA) {
      setContracts((prev) => prev.filter((c) => c.id !== id));
    } else {
      await dataApi.deleteContract(id);
      setContracts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleContractFavorite: DataContextType["toggleContractFavorite"] = async (
    id
  ) => {
    if (USE_MOCK_DATA) {
      setContracts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
      );
    } else {
      const updated = await dataApi.toggleContractFavorite(id);
      setContracts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
  };

  const duplicateContract: DataContextType["duplicateContract"] = async (id) => {
    if (USE_MOCK_DATA) {
      const target = contracts.find((c) => c.id === id);
      if (!target) return undefined;

      const now = new Date();
      const duplicated: Contract = {
        ...target,
        id: `contract-${Date.now()}`,
        projectName: `${target.projectName} (Copie)`,
        createdAt: now,
        lastModified: now,
        isFavorite: false,
      };

      setContracts((prev) => [duplicated, ...prev]);
      return duplicated;
    } else {
      const duplicated = await dataApi.duplicateContract(id);
      setContracts((prev) => [duplicated, ...prev]);
      return duplicated;
    }
  };

  const getContractById: DataContextType["getContractById"] = (id) =>
    contracts.find((c) => c.id === id);

  const getContractsByProject: DataContextType["getContractsByProject"] = (
    projectId
  ) => contracts.filter((c) => c.projectId === projectId);

  // ===================== REINITIALISATION =====================

  const resetToDefaultData = () => {
    localStorage.removeItem(PROJECTS_STORAGE_KEY);
    localStorage.removeItem(CLIENTS_STORAGE_KEY);
    localStorage.removeItem(CONTRACTS_STORAGE_KEY);
    localStorage.removeItem(ACTIVITY_STORAGE_KEY);

    setProjects(seedProjects);
    setClients(seedClients);
    setContracts(
      seedContracts.map((c) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        lastModified: new Date(c.lastModified),
      }))
    );
    setRecentActivity(initialRecentActivity);
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        clients,
        contracts,
        recentActivity,
        isLoading,
        isMockMode: USE_MOCK_DATA,
        dashboardStats,
        recentProjects,
        quickActions,
        addActivity,
        addProject,
        updateProject,
        deleteProject,
        getProjectById,
        getProjectsByClient,
        addClient,
        updateClient,
        deleteClient,
        getClientById,
        addContract,
        updateContract,
        deleteContract,
        toggleContractFavorite,
        duplicateContract,
        getContractById,
        getContractsByProject,
        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ===================== HOOK PERSONNALISÉ =====================
export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData doit être utilisé au sein d'un <DataProvider>");
  }
  return ctx;
};
