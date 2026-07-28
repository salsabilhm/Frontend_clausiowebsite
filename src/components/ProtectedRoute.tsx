// src/components/ProtectedRoute.tsx
// ------------------------------------------------------------------
// Blocks access to a route if the mock user isn't "authenticated".
// Wrap any <Route element={...}> that should require a session.
// ------------------------------------------------------------------
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Remember where the user was headed, so SignIn could redirect
    // them back afterwards if you want that later.
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
