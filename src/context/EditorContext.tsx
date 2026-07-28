/* eslint-disable react-refresh/only-export-components */

/**
 * ------------------------------------------------------------------
 * EDITOR CONTEXT & PROVIDER
 * ------------------------------------------------------------------
 *
 * Ce Context orchestre l'état global du contrat/brouillon en cours
 * d'édition dans l'éditeur de documents (`DocumentEditor`).
 *
 * Il assure le lien entre le générateurs IA (`AIContractGenerator`)
 * et l'Éditeur (`DocumentEditor`) :
 * 1. L'IA génère le document et appelle `setActiveContract(...)`.
 * 2. L'Éditeur lit le document actif depuis ce contexte et sauvegarde
 *    les modifications en temps réel via `updateActiveContract(...)`.
 *
 * Fonctionnalité clef (Mock Switcher) :
 * Grâce à VITE_USE_MOCK_DATA, il bascule automatiquement entre :
 * - Mode Mock (Local Storage / Brouillon local)
 * - Mode API (Serveur Backend réel via editorApi)
 * ------------------------------------------------------------------
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { editorApi } from "../api/editor.api";

// ===================== TYPES =====================

export type SectionAlign = "left" | "center" | "right" | "justify";

export type SectionType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "paragraph"
  | "list"
  | "checklist";

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  type: SectionType;
  align: SectionAlign;
}

export type AiOutputLanguage = "English" | "Français" | "Arabic";

export interface ActiveContract {
  contractId?: string;
  title: string;
  clientName?: string;
  projectName?: string;
  language: AiOutputLanguage;
  sections: DocumentSection[];
  source: "ai-generated" | "manual";
  createdAt: string; // Dynamic ISO string format
}

// ===================== CONFIGURATION & MOCK SWITCHER =====================
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true" || true;

// Clé d'accès au stockage local (LocalStorage)
const ACTIVE_CONTRACT_STORAGE_KEY = "app_active_contract";

// ===================== INTERFACE CONTEXT =====================
interface EditorContextType {
  // États
  activeContract: ActiveContract | null;
  isLoading: boolean;
  isMockMode: boolean; // Indique à l'application quel mode est actif

  // Actions Contrat Actif
  setActiveContract: (contract: ActiveContract) => Promise<void>;
  updateActiveContract: (
    updates: Partial<Omit<ActiveContract, "sections">> & {
      sections?: DocumentSection[];
    }
  ) => Promise<void>;
  updateActiveSections: (sections: DocumentSection[]) => Promise<void>;
  clearActiveContract: () => Promise<void>;

  // Action Génération IA
  generateContractWithAi: (promptData: {
    prompt: string;
    language: string;
    clientName?: string;
    projectName?: string;
  }) => Promise<ActiveContract>;
}

// ===================== CRÉATION DU CONTEXT =====================
const EditorContext = createContext<EditorContextType | undefined>(undefined);

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

function saveToStorage<T>(key: string, value: T | null): void {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  } catch {
    // Le stockage local peut être saturé ou restreint par le navigateur
  }
}

// ===================== EDITORPROVIDER COMPONENT =====================
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeContract, setActiveContractState] = useState<ActiveContract | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ----- Chargement initial du contrat actif -----
  useEffect(() => {
    const initEditor = async () => {
      setIsLoading(true);
      if (USE_MOCK_DATA) {
        // 🧪 MODE MOCK : Charger depuis le LocalStorage
        const stored = loadFromStorage<ActiveContract | null>(
          ACTIVE_CONTRACT_STORAGE_KEY,
          null
        );
        setActiveContractState(stored);
      } else {
        // 🌐 MODE API : Récupérer le contrat actif depuis le serveur
        try {
          const fetched = await editorApi.getActiveContract();
          setActiveContractState(fetched);
        } catch (error) {
          console.error("Erreur lors du chargement du contrat actif depuis l'API :", error);
        }
      }
      setIsLoading(false);
    };

    void initEditor();
  }, []);

  // ----- Persistence dans LocalStorage (Seulement en Mode Mock) -----
  useEffect(() => {
    if (USE_MOCK_DATA && !isLoading) {
      saveToStorage(ACTIVE_CONTRACT_STORAGE_KEY, activeContract);
    }
  }, [activeContract, isLoading]);

  // ===================== ACTIONS CONTRAT ACTIF =====================

  /**
   * Définit un nouveau contrat actif (ex: après génération IA ou ouverture d'un modèle)
   */
  const setActiveContract: EditorContextType["setActiveContract"] = async (contract) => {
    setActiveContractState(contract);

    if (!USE_MOCK_DATA) {
      await editorApi.saveActiveContract(contract);
    }
  };

  /**
   * Met à jour partiellement le contrat actif en cours d'édition
   */
  const updateActiveContract: EditorContextType["updateActiveContract"] = async (
    updates
  ) => {
    if (!activeContract) return;

    const updatedContract: ActiveContract = {
      ...activeContract,
      ...updates,
    };

    setActiveContractState(updatedContract);

    if (!USE_MOCK_DATA) {
      await editorApi.updateActiveContract(updates);
    }
  };

  /**
   * Remplacement direct de la liste des sections du contrat
   */
  const updateActiveSections: EditorContextType["updateActiveSections"] = async (
    sections
  ) => {
    await updateActiveContract({ sections });
  };

  /**
   * Réinitialise / Supprime le brouillon ou le contrat actif
   */
  const clearActiveContract: EditorContextType["clearActiveContract"] = async () => {
    setActiveContractState(null);

    if (USE_MOCK_DATA) {
      saveToStorage(ACTIVE_CONTRACT_STORAGE_KEY, null);
    } else {
      await editorApi.clearActiveContract();
    }
  };

  // ===================== GENERATION IA =====================

  /**
   * Génère un contrat via l'IA et le définit immédiatement comme contrat actif
   */
  const generateContractWithAi: EditorContextType["generateContractWithAi"] = async (
    promptData
  ) => {
    setIsLoading(true);
    let generated: ActiveContract;

    if (USE_MOCK_DATA) {
      // Simulation locale en mode Mock
      generated = {
        title: promptData.projectName || "Nouveau Contrat Généré",
        clientName: promptData.clientName || "Client",
        projectName: promptData.projectName || "Projet IA",
        language: (promptData.language as AiOutputLanguage) || "Français",
        source: "ai-generated",
        createdAt: new Date().toISOString(),
        sections: [
          {
            id: `sec-${Date.now()}-1`,
            title: "1. Objet du Contrat",
            content: `Document généré automatiquement à partir de la demande : "${promptData.prompt}".`,
            type: "heading1",
            align: "left",
          },
          {
            id: `sec-${Date.now()}-2`,
            title: "2. Obligations des parties",
            content: "Les parties s'engagent à respecter les termes définis ci-après...",
            type: "paragraph",
            align: "left",
          },
        ],
      };
    } else {
      // Appel API réel
      generated = await editorApi.generateContractWithAi(promptData);
    }

    await setActiveContract(generated);
    setIsLoading(false);
    return generated;
  };

  return (
    <EditorContext.Provider
      value={{
        activeContract,
        isLoading,
        isMockMode: USE_MOCK_DATA,
        setActiveContract,
        updateActiveContract,
        updateActiveSections,
        clearActiveContract,
        generateContractWithAi,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// ===================== HOOK PERSONNALISÉ =====================
export const useEditor = (): EditorContextType => {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor doit être utilisé au sein d'un <EditorProvider>");
  }
  return ctx;
};
