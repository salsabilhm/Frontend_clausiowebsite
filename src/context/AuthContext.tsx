// src/context/AuthContext.tsx
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AxiosError } from "axios";
import { AuthUser, UserPreferences, SignUpData, MockUser } from "../types";
import { authApi } from "../api/auth.api";
import { mockUsers } from "../mock/users";

// ===================== CONFIGURATION =====================
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true" || true; // changer cette  attribut

const USER_STORAGE_KEY = "app_user";
const REGISTERED_USERS_KEY = "app_registered_users";
const TOKEN_KEY = "auth_token";

const DEFAULT_PREFERENCES: UserPreferences = {
  autoGenerateSpec: false,
  autoSave: true,
  defaultExportFormat: "PDF",
  aiOutputLanguage: "English",
  theme: "light",
  notifications: true,
};

// ===================== Local Storage Helpers for Mock =====================
function loadRegisteredUsers(): MockUser[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Fallback to mock users if parsing fails
  }
  return mockUsers;
}

function saveRegisteredUsers(users: MockUser[]) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function convertToAuthUser(mockUser: MockUser): AuthUser {
  return {
    id: mockUser.id,
    fullName: mockUser.fullName,
    email: mockUser.email,
    avatar: mockUser.avatar || null,
    company: mockUser.company || "Clausio",
    role: mockUser.role || "Team Member",
    preferences: { ...DEFAULT_PREFERENCES },
  };
}

// Helper to extract clean error message without explicit 'any'
function getErrorMessage(err: unknown, fallbackMessage: string): string {
  if (err instanceof AxiosError && err.response?.data?.message) {
    return String(err.response.data.message);
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallbackMessage;
}

// ===================== Interfaces =====================
interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isMockMode: boolean;

  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (data: SignUpData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateProfile: (
    updates: Partial<Pick<AuthUser, "fullName" | "email" | "company" | "role" | "avatar">>
  ) => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}

// ===================== Create Context =====================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===================== AuthProvider Component =====================
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  // ----- Restore Session On Initial Load -----
  useEffect(() => {
    const initAuth = async () => {
      if (USE_MOCK_DATA) {
        // 🧪 MOCK MODE
        const raw = localStorage.getItem(USER_STORAGE_KEY);
        if (raw) {
          try {
            setUser(JSON.parse(raw));
          } catch {
            setUser(null);
          }
        }
      } else {
        // 🌐 API MODE
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          try {
            const userData = await authApi.getCurrentUser();
            setUser(userData);
          } catch {
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    // Fix ESLint: Promise returned from initAuth is ignored
    void initAuth();
  }, []);

  // ----- Actions -----

  const login = async (email: string, password: string): Promise<AuthResult> => {
    if (USE_MOCK_DATA) {
      // 🧪 MOCK LOGIC
      const users = loadRegisteredUsers();
      const match = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (!match) {
        return { success: false, error: "Invalid email or password." };
      }

      const authUser = convertToAuthUser(match);
      setUser(authUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
      return { success: true };
    } else {
      // 🌐 API LOGIC
      try {
        const { token, user: userData } = await authApi.login({ email, password });
        localStorage.setItem(TOKEN_KEY, token);
        setUser(userData);
        return { success: true };
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err, "Invalid credentials.");
        return { success: false, error: errorMessage };
      }
    }
  };

  const signup = async (data: SignUpData): Promise<AuthResult> => {
    if (USE_MOCK_DATA) {
      // 🧪 MOCK LOGIC
      const { fullName, email, password, confirmPassword } = data;
      if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
        return { success: false, error: "All fields are required." };
      }
      if (password !== confirmPassword) {
        return { success: false, error: "Passwords do not match." };
      }

      const users = loadRegisteredUsers();
      if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { success: false, error: "An account with this email already exists." };
      }

      const newUser: MockUser = {
        id: `user-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        company: "Clausio",
        role: "Team Member",
        avatar: null,
      };
      saveRegisteredUsers([...users, newUser]);
      return { success: true };
    } else {
      // 🌐 API LOGIC
      try {
        const { token, user: userData } = await authApi.signup(data);
        localStorage.setItem(TOKEN_KEY, token);
        setUser(userData);
        return { success: true };
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err, "Signup failed.");
        return { success: false, error: errorMessage };
      }
    }
  };

  const logout = async () => {
    if (USE_MOCK_DATA) {
      // 🧪 MOCK LOGIC
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } else {
      // 🌐 API LOGIC
      try {
        await authApi.logout();
      } catch {
        // Ignore API errors during logout
      } finally {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }
    }
  };

  const updateProfile = async (
    updates: Partial<Pick<AuthUser, "fullName" | "email" | "company" | "role" | "avatar">>
  ) => {
    if (USE_MOCK_DATA) {
      // 🧪 MOCK LOGIC
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...updates };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } else {
      // 🌐 API LOGIC
      try {
        const updatedUser = await authApi.updateProfile(updates);
        setUser(updatedUser);
      } catch (err) {
        console.error("Failed to update profile", err);
      }
    }
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (USE_MOCK_DATA) {
      // 🧪 MOCK LOGIC
      setUser((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          preferences: { ...(prev.preferences ?? DEFAULT_PREFERENCES), ...prefs },
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } else {
      // 🌐 API LOGIC
      try {
        const updatedPrefs = await authApi.updatePreferences(prefs);
        setUser((prev) => (prev ? { ...prev, preferences: updatedPrefs } : null));
      } catch (err) {
        console.error("Failed to update preferences", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isMockMode: USE_MOCK_DATA,
        login,
        signup,
        logout,
        updateProfile,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ===================== Custom Hook =====================
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
};
