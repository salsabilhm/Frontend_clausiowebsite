/// <reference types="vite/client" />
// src/api/axios.ts
import axios from "axios";

/**
 * ------------------------------------------------------------------
 * AXIOS INSTANCE
 * ------------------------------------------------------------------
 *
 * Purpose:
 * Creates a single HTTP client used across the application.
 *
 * Responsibilities:
 * - Stores the Backend Base URL.
 * - Sets default headers.
 * - Handles request timeout.
 * - Attach Authorization Bearer token automatically if present.
 *
 * Backend developers usually only change:
 *     baseURL (or VITE_API_BASE_URL in .env)
 *
 * Example:
 * api.get("/clients")
 * api.post("/auth/login")
 *
 * ------------------------------------------------------------------
 */

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.clausio.com/api/v1",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
