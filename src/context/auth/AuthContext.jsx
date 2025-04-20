import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado para controlar la carga

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("StoneMarket");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
      setIsAuthenticated(true);  // Solo si el usuario tiene datos en localStorage
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);  // Al terminar la verificación, actualizamos el estado
  }, []); // Solo se ejecuta una vez al cargar la app

  const login = (userData) => {
    window.localStorage.setItem("StoneMarket", JSON.stringify(userData)); // Guardamos los datos en localStorage
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem("StoneMarket");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);