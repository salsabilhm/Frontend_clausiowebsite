import { api } from "./axios";
import { ActiveContract, DocumentSection } from "../context/EditorContext";

/**
 * ------------------------------------------------------------------
 * EDITOR API SERVICE
 * ------------------------------------------------------------------
 *
 * Rôle :
 * Gère toutes les requêtes réseau vers le Backend pour :
 * - Le contrat/brouillon actif en cours d'édition (Active Contract)
 * - La manipulation des sections du document (Document Sections)
 * - La génération du contenu via l'IA (AI Generation)
 *
 * Ce fichier ne contient QUE des requêtes Axios. Aucun état React.
 * ------------------------------------------------------------------
 */

export const editorApi = {
  // ===================== Contrat Actif / Brouillon =====================

  /**
   * Récupère le contrat actif ou brouillon en cours depuis le serveur.
   */
  async getActiveContract(): Promise<ActiveContract | null> {
    const response = await api.get<ActiveContract | null>("/editor/active");
    return response.data;
  },

  /**
   * Enregistre ou met à jour le contrat actif complet sur le serveur.
   */
  async saveActiveContract(contract: ActiveContract): Promise<ActiveContract> {
    const response = await api.put<ActiveContract>("/editor/active", contract);
    return response.data;
  },

  /**
   * Applique une mise à jour partielle au contrat actif.
   */
  async updateActiveContract(
    updates: Partial<ActiveContract>
  ): Promise<ActiveContract> {
    const response = await api.patch<ActiveContract>("/editor/active", updates);
    return response.data;
  },

  /**
   * Réinitialise / efface le contrat actif côté serveur.
   */
  async clearActiveContract(): Promise<void> {
    await api.delete("/editor/active");
  },

  // ===================== Sections du Document =====================

  /**
   * Met à jour uniquement la liste des sections du contrat actif.
   */
  async updateSections(sections: DocumentSection[]): Promise<DocumentSection[]> {
    const response = await api.put<DocumentSection[]>(
      "/editor/active/sections",
      { sections }
    );
    return response.data;
  },

  /**
   * Ajoute une nouvelle section au document.
   */
  async addSection(section: Omit<DocumentSection, "id">): Promise<DocumentSection> {
    const response = await api.post<DocumentSection>(
      "/editor/active/sections",
      section
    );
    return response.data;
  },

  /**
   * Supprime une section spécifique par son ID.
   */
  async deleteSection(sectionId: string): Promise<void> {
    await api.delete(`/editor/active/sections/${sectionId}`);
  },

  // ===================== Génération IA =====================

  /**
   * Envoie les paramètres de demande au générateur IA et retourne le contrat structuré.
   */
  async generateContractWithAi(promptData: {
    prompt: string;
    language: string;
    clientName?: string;
    projectName?: string;
  }): Promise<ActiveContract> {
    const response = await api.post<ActiveContract>(
      "/editor/generate",
      promptData
    );
    return response.data;
  },
};
