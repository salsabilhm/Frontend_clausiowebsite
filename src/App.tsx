// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { SettingsProvider } from "./context/SettingsContext";
import { EditorProvider } from "./context/EditorContext"; // ✅ 1. إضافة استيراد EditorProvider
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NewProject from "./pages/Newproject";
import Clients from "./pages/Clients";
import NewClient from "./pages/NewClient";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Upgrade from "./pages/Upgrade";
import AIContractGenerator from "./pages/AIContractGenerator";
import DocumentEditor from "./pages/DocumentEditor";
import History from "./pages/history";

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DataProvider>
          {/* ✅ 2. تغليف الـ Routes بـ EditorProvider لحل مشكلة AIContractGenerator */}
          <EditorProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/new"
                element={
                  <ProtectedRoute>
                    <NewProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients/new"
                element={
                  <ProtectedRoute>
                    <NewClient />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-contract-generator"
                element={
                  <ProtectedRoute>
                    <AIContractGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/document-editor"
                element={
                  <ProtectedRoute>
                    <DocumentEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upgrade"
                element={
                  <ProtectedRoute>
                    <Upgrade />
                  </ProtectedRoute>
                }
              />

              {/* 404 - Not Found */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </EditorProvider>
        </DataProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
