// src/api/data.api.ts
import { api } from "./axios";
import {
  Project,
  Client,
  Contract,
  RecentActivity,
} from "../types";

/**
 * ------------------------------------------------------------------
 * DATA API SERVICE
 * ------------------------------------------------------------------
 *
 * Rôle :
 * Gère toutes les requêtes réseau vers le Backend pour :
 * - Les Projets (Projects)
 * - Les Clients
 * - Les Contrats / Spécifications (Contracts)
 * - Les Activités récentes (Recent Activities)
 *
 * Ce fichier ne contient QUE des requêtes Axios. Aucun état React.
 * ------------------------------------------------------------------
 */

export const dataApi = {
  // ===================== Projets =====================
  async getProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>("/projects");
    return response.data;
  },

  async createProject(
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ): Promise<Project> {
    const response = await api.post<Project>("/projects", project);
    return response.data;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const response = await api.patch<Project>(`/projects/${id}`, updates);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  // ===================== Clients =====================
  async getClients(): Promise<Client[]> {
    const response = await api.get<Client[]>("/clients");
    return response.data;
  },

  async createClient(client: Omit<Client, "id">): Promise<Client> {
    const response = await api.post<Client>("/clients", client);
    return response.data;
  },

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const response = await api.patch<Client>(`/clients/${id}`, updates);
    return response.data;
  },

  async deleteClient(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },

  // ===================== Contrats / Spécifications =====================
  async getContracts(): Promise<Contract[]> {
    const response = await api.get<Contract[]>("/contracts");
    return response.data;
  },

  async createContract(
    contract: Omit<Contract, "id" | "createdAt" | "lastModified">
  ): Promise<Contract> {
    const response = await api.post<Contract>("/contracts", contract);
    return response.data;
  },

  async updateContract(id: string, updates: Partial<Contract>): Promise<Contract> {
    const response = await api.patch<Contract>(`/contracts/${id}`, updates);
    return response.data;
  },

  async deleteContract(id: string): Promise<void> {
    await api.delete(`/contracts/${id}`);
  },

  async toggleContractFavorite(id: string): Promise<Contract> {
    const response = await api.patch<Contract>(`/contracts/${id}/favorite`);
    return response.data;
  },

  async duplicateContract(id: string): Promise<Contract> {
    const response = await api.post<Contract>(`/contracts/${id}/duplicate`);
    return response.data;
  },

  // ===================== Activités Récentes =====================
  async getActivities(): Promise<RecentActivity[]> {
    const response = await api.get<RecentActivity[]>("/activities");
    return response.data;
  },

  async createActivity(
    activity: Omit<RecentActivity, "id">
  ): Promise<RecentActivity> {
    const response = await api.post<RecentActivity>("/activities", activity);
    return response.data;
  },
};
