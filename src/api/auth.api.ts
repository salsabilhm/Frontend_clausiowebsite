// src/api/auth.api.ts
import { api } from "./axios";
import { AuthUser, SignUpData, UserPreferences } from "../types";

/**
 * ------------------------------------------------------------------
 * AUTH API
 * ------------------------------------------------------------------
 *
 * Purpose:
 * Handles every authentication request to the Backend.
 *
 * Responsibilities:
 * - Login request
 * - Register/Signup request
 * - Logout request
 * - Get current user profile
 * - Update profile details
 * - Update user preferences
 *
 * This file contains ONLY HTTP requests via Axios.
 * No React.
 * No Context.
 * No UI logic.
 *
 * ------------------------------------------------------------------
 */

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  /**
   * Send login credentials to backend
   */
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Register a new user account
   */
  async signup(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  /**
   * Fetch currently authenticated user profile using token
   */
  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get<AuthUser>("/auth/me");
    return response.data;
  },

  /**
   * Logout session on the server
   */
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  /**
   * Update profile information
   */
  async updateProfile(
    updates: Partial<Pick<AuthUser, "fullName" | "email" | "company" | "role" | "avatar">>
  ): Promise<AuthUser> {
    const response = await api.patch<AuthUser>("/auth/profile", updates);
    return response.data;
  },

  /**
   * Update user preferences
   */
  async updatePreferences(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await api.patch<UserPreferences>("/auth/preferences", prefs);
    return response.data;
  },
};
