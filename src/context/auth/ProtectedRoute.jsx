import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children; // Si está autenticado, renderizamos el contenido protegido
};

export default ProtectedRoute;