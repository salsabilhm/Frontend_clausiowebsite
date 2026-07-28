import { api } from "./axios";
import { UserPreferences, WorkspaceSettings } from "../types";
import {
  Plan,
  UserSubscription,
  BillingRecord,
  SystemSettings,
} from "../mock/settings";

/**
 * ------------------------------------------------------------------
 * SETTINGS API SERVICE
 * ------------------------------------------------------------------
 *
 * Rôle :
 * Gère toutes les requêtes réseau vers le Backend pour :
 * - Les Préférences de l'utilisateur (User Preferences)
 * - Les Paramètres de l'espace de travail (Workspace Settings)
 * - La Gestion des abonnements et abonnés (Subscriptions & Plans)
 * - L'Historique de facturation (Billing History)
 * - Les Paramètres système (System Settings)
 *
 * Ce fichier ne contient QUE des requêtes Axios. Aucun état React.
 * ------------------------------------------------------------------
 */

export const settingsApi = {
  // ===================== Préférences Utilisateur =====================
  async getPreferences(): Promise<UserPreferences> {
    const response = await api.get<UserPreferences>("/settings/preferences");
    return response.data;
  },

  async updatePreferences(
    prefs: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const response = await api.patch<UserPreferences>(
      "/settings/preferences",
      prefs
    );
    return response.data;
  },

  // ===================== Paramètres Workspace =====================
  async getWorkspaceSettings(): Promise<WorkspaceSettings> {
    const response = await api.get<WorkspaceSettings>("/settings/workspace");
    return response.data;
  },

  async updateWorkspaceSettings(
    settings: Partial<WorkspaceSettings>
  ): Promise<WorkspaceSettings> {
    const response = await api.patch<WorkspaceSettings>(
      "/settings/workspace",
      settings
    );
    return response.data;
  },

  // ===================== Abonnements & Plans =====================
  async getSubscription(): Promise<UserSubscription> {
    const response = await api.get<UserSubscription>("/settings/subscription");
    return response.data;
  },

  async getPlans(): Promise<Plan[]> {
    const response = await api.get<Plan[]>("/settings/plans");
    return response.data;
  },

  async upgradePlan(
    planId: string,
    billingCycle: "monthly" | "yearly"
  ): Promise<UserSubscription> {
    const response = await api.post<UserSubscription>(
      "/settings/subscription/upgrade",
      { planId, billingCycle }
    );
    return response.data;
  },

  async cancelSubscription(): Promise<UserSubscription> {
    const response = await api.post<UserSubscription>(
      "/settings/subscription/cancel"
    );
    return response.data;
  },

  async renewSubscription(): Promise<UserSubscription> {
    const response = await api.post<UserSubscription>(
      "/settings/subscription/renew"
    );
    return response.data;
  },

  // ===================== Facturation & Historique =====================
  async getBillingHistory(): Promise<BillingRecord[]> {
    const response = await api.get<BillingRecord[]>("/settings/billing-history");
    return response.data;
  },

  // ===================== Paramètres Système =====================
  async getSystemSettings(): Promise<SystemSettings> {
    const response = await api.get<SystemSettings>("/settings/system");
    return response.data;
  },

  // ===================== Import / Export =====================
  async importSettings(
    settingsJson: string
  ): Promise<{ preferences: UserPreferences; workspaceSettings: WorkspaceSettings }> {
    const response = await api.post<{
      preferences: UserPreferences;
      workspaceSettings: WorkspaceSettings;
    }>("/settings/import", { data: settingsJson });
    return response.data;
  },
};
