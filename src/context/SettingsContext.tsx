/* eslint-disable react-refresh/only-export-components */

/**
 * ------------------------------------------------------------------
 * SETTINGS CONTEXT & PROVIDER
 * ------------------------------------------------------------------
 *
 * Ce Context orchestre l'ensemble des paramètres utilisateur, les
 * configurations d'espace de travail, l'état des abonnements et
 * l'historique de facturation.
 *
 * Fonctionnalité clef (Mock Switcher) :
 * Grâce à VITE_USE_MOCK_DATA, il bascule automatiquement entre :
 * - Mode Mock (Local Storage + Données de test)
 * - Mode API (Serveur Backend réel via settingsApi)
 * ------------------------------------------------------------------
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserPreferences, WorkspaceSettings } from "../types";
import {
  defaultPreferences,
  defaultWorkspaceSettings,
  plans as seedPlans,
  Plan,
  UserSubscription,
  defaultSubscription,
  billingHistory as seedBillingHistory,
  BillingRecord,
  SystemSettings,
  systemSettings as seedSystemSettings,
} from "../mock/settings";
import { settingsApi } from "../api/settings.api";

// ===================== CONFIGURATION & MOCK SWITCHER =====================
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true" || true;

// Clés d'accès au stockage local (LocalStorage)
const PREFERENCES_STORAGE_KEY = "app_preferences";
const WORKSPACE_SETTINGS_KEY = "app_workspace_settings";
const SUBSCRIPTION_KEY = "app_subscription";
const SYSTEM_SETTINGS_KEY = "app_system_settings";

export type BillingCycle = "monthly" | "yearly";

// ===================== INTERFACE CONTEXT =====================
interface SettingsContextType {
  // États
  preferences: UserPreferences;
  workspaceSettings: WorkspaceSettings;
  subscription: UserSubscription;
  systemSettings: SystemSettings;
  plans: Plan[];
  billingHistory: BillingRecord[];
  isLoading: boolean;
  isMockMode: boolean; // Indique à l'application quel mode est actif

  // Actions Préférences
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  resetPreferences: () => Promise<void>;

  // Actions Workspace
  updateWorkspaceSettings: (settings: Partial<WorkspaceSettings>) => Promise<void>;
  resetWorkspaceSettings: () => Promise<void>;

  // Actions Abonnements
  upgradePlan: (planId: string, billingCycle: BillingCycle) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  renewSubscription: () => Promise<void>;
  getCurrentPlan: () => Plan | undefined;
  getPlanById: (id: string) => Plan | undefined;

  // Actions Utilitaires
  resetAllSettings: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (json: string) => Promise<boolean>;
}

// ===================== CRÉATION DU CONTEXT =====================
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// ===================== HELPER STORAGE (MOCK) =====================
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // Si le contenu stocké est corrompu, retour au fallback
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

// ===================== SETTINGSPROVIDER COMPONENT =====================
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [workspaceSettings, setWorkspaceSettings] = useState<WorkspaceSettings>(defaultWorkspaceSettings);
  const [subscription, setSubscription] = useState<UserSubscription>(defaultSubscription);
  const [system, setSystem] = useState<SystemSettings>(seedSystemSettings);
  const [plans, setPlans] = useState<Plan[]>(seedPlans);
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>(seedBillingHistory);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ----- Chargement initial des paramètres -----
  useEffect(() => {
    const initSettings = async () => {
      setIsLoading(true);
      if (USE_MOCK_DATA) {
        // 🧪 MODE MOCK : Charger depuis le LocalStorage
        setPreferences(loadFromStorage(PREFERENCES_STORAGE_KEY, defaultPreferences));
        setWorkspaceSettings(loadFromStorage(WORKSPACE_SETTINGS_KEY, defaultWorkspaceSettings));
        setSubscription(loadFromStorage(SUBSCRIPTION_KEY, defaultSubscription));
        setSystem(loadFromStorage(SYSTEM_SETTINGS_KEY, seedSystemSettings));
      } else {
        // 🌐 MODE API : Récupérer les paramètres réels depuis le serveur
        try {
          const [
            fetchedPrefs,
            fetchedWorkspace,
            fetchedSub,
            fetchedSystem,
            fetchedPlans,
            fetchedBilling,
          ] = await Promise.all([
            settingsApi.getPreferences(),
            settingsApi.getWorkspaceSettings(),
            settingsApi.getSubscription(),
            settingsApi.getSystemSettings(),
            settingsApi.getPlans(),
            settingsApi.getBillingHistory(),
          ]);

          setPreferences(fetchedPrefs);
          setWorkspaceSettings(fetchedWorkspace);
          setSubscription(fetchedSub);
          setSystem(fetchedSystem);
          setPlans(fetchedPlans);
          setBillingHistory(fetchedBilling);
        } catch (error) {
          console.error("Erreur lors du chargement des paramètres API :", error);
        }
      }
      setIsLoading(false);
    };

    void initSettings();
  }, []);

  // ----- Persistence dans LocalStorage (Seulement en Mode Mock) -----
  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(PREFERENCES_STORAGE_KEY, preferences);
    }
  }, [preferences, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(WORKSPACE_SETTINGS_KEY, workspaceSettings);
    }
  }, [workspaceSettings, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(SUBSCRIPTION_KEY, subscription);
    }
  }, [subscription, isLoading]);

  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(SYSTEM_SETTINGS_KEY, system);
    }
  }, [system, isLoading]);

  // ===================== ACTIONS PRÉFÉRENCES =====================

  const updatePreferences: SettingsContextType["updatePreferences"] = async (prefs) => {
    if (USE_MOCK_DATA) {
      setPreferences((prev) => ({ ...prev, ...prefs }));
    } else {
      const updated = await settingsApi.updatePreferences(prefs);
      setPreferences(updated);
    }
  };

  const resetPreferences: SettingsContextType["resetPreferences"] = async () => {
    if (USE_MOCK_DATA) {
      setPreferences(defaultPreferences);
    } else {
      const updated = await settingsApi.updatePreferences(defaultPreferences);
      setPreferences(updated);
    }
  };

  // ===================== ACTIONS WORKSPACE =====================

  const updateWorkspaceSettings: SettingsContextType["updateWorkspaceSettings"] = async (
    settings
  ) => {
    if (USE_MOCK_DATA) {
      setWorkspaceSettings((prev) => ({ ...prev, ...settings }));
    } else {
      const updated = await settingsApi.updateWorkspaceSettings(settings);
      setWorkspaceSettings(updated);
    }
  };

  const resetWorkspaceSettings: SettingsContextType["resetWorkspaceSettings"] = async () => {
    if (USE_MOCK_DATA) {
      setWorkspaceSettings(defaultWorkspaceSettings);
    } else {
      const updated = await settingsApi.updateWorkspaceSettings(defaultWorkspaceSettings);
      setWorkspaceSettings(updated);
    }
  };

  // ===================== ACTIONS ABONNEMENTS =====================

  const getPlanById = (id: string): Plan | undefined => {
    return plans.find((p) => p.id === id);
  };

  const getCurrentPlan = (): Plan | undefined => {
    return getPlanById(subscription.planId);
  };

  const upgradePlan: SettingsContextType["upgradePlan"] = async (planId, billingCycle) => {
    if (USE_MOCK_DATA) {
      const plan = getPlanById(planId);
      if (!plan) return;

      const now = new Date();
      const duration = billingCycle === "monthly" ? 30 : 365;

      setSubscription({
        planId: plan.id,
        status: "active",
        startDate: now,
        endDate: new Date(now.getTime() + duration * 24 * 60 * 60 * 1000),
        billingCycle,
        autoRenew: true,
        paymentMethod: "Credit Card",
      });
    } else {
      const updated = await settingsApi.upgradePlan(planId, billingCycle);
      setSubscription(updated);
    }
  };

  const cancelSubscription: SettingsContextType["cancelSubscription"] = async () => {
    if (USE_MOCK_DATA) {
      setSubscription((prev) => ({
        ...prev,
        status: "cancelled",
        autoRenew: false,
      }));
    } else {
      const updated = await settingsApi.cancelSubscription();
      setSubscription(updated);
    }
  };

  const renewSubscription: SettingsContextType["renewSubscription"] = async () => {
    if (USE_MOCK_DATA) {
      setSubscription((prev) => {
        const now = new Date();
        const duration = prev.billingCycle === "monthly" ? 30 : 365;
        return {
          ...prev,
          status: "active",
          startDate: now,
          endDate: new Date(now.getTime() + duration * 24 * 60 * 60 * 1000),
          autoRenew: true,
        };
      });
    } else {
      const updated = await settingsApi.renewSubscription();
      setSubscription(updated);
    }
  };

  // ===================== ACTIONS UTILITAIRES =====================

  const resetAllSettings: SettingsContextType["resetAllSettings"] = async () => {
    setPreferences(defaultPreferences);
    setWorkspaceSettings(defaultWorkspaceSettings);
    setSubscription(defaultSubscription);
    setSystem(seedSystemSettings);

    if (USE_MOCK_DATA) {
      localStorage.removeItem(PREFERENCES_STORAGE_KEY);
      localStorage.removeItem(WORKSPACE_SETTINGS_KEY);
      localStorage.removeItem(SUBSCRIPTION_KEY);
      localStorage.removeItem(SYSTEM_SETTINGS_KEY);
    } else {
      await settingsApi.updatePreferences(defaultPreferences);
      await settingsApi.updateWorkspaceSettings(defaultWorkspaceSettings);
    }
  };

  const exportSettings = (): string => {
    const data = {
      preferences,
      workspaceSettings,
      subscription,
      system,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };
    return JSON.stringify(data, null, 2);
  };

  const importSettings: SettingsContextType["importSettings"] = async (json) => {
    try {
      if (USE_MOCK_DATA) {
        const data = JSON.parse(json);
        if (data.preferences) setPreferences(data.preferences);
        if (data.workspaceSettings) setWorkspaceSettings(data.workspaceSettings);
        if (data.subscription) setSubscription(data.subscription);
        if (data.system) setSystem(data.system);
        return true;
      } else {
        const imported = await settingsApi.importSettings(json);
        setPreferences(imported.preferences);
        setWorkspaceSettings(imported.workspaceSettings);
        return true;
      }
    } catch {
      return false;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        preferences,
        workspaceSettings,
        subscription,
        systemSettings: system,
        plans,
        billingHistory,
        isLoading,
        isMockMode: USE_MOCK_DATA,
        updatePreferences,
        resetPreferences,
        updateWorkspaceSettings,
        resetWorkspaceSettings,
        upgradePlan,
        cancelSubscription,
        renewSubscription,
        getCurrentPlan,
        getPlanById,
        resetAllSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// ===================== HOOK PERSONNALISÉ =====================
export const useSettings = (): SettingsContextType => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings doit être utilisé au sein d'un <SettingsProvider>");
  }
  return ctx;
};
