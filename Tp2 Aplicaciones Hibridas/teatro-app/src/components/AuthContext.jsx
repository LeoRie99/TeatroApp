import React, { createContext, useContext, useState } from 'react';

// Contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    setUserId(userId);
    // Aquí podrías guardar el ID del usuario en localStorage o sessionStorage si es necesario
  };

  const logout = () => {
    setUserId(null);
    // Aquí podrías limpiar el ID del usuario de localStorage o sessionStorage si es necesario
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
