'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const API_BASE_URL = 'https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net';

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      // Guardar token y usuario
      const userToken = data.token || data.accessToken;
      const userData = data.user || data;
      console.log("asd");
      console.log(userToken);


      setToken(userToken);
      setCurrentUser(userData);
      
      // Persistir en localStorage
      localStorage.setItem('authToken', userToken);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return { success: true, data };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Después del registro exitoso, hacer login automático si se proporciona token
      if (data.token || data.accessToken) {
        const userToken = data.token || data.accessToken;
        const user = data.user || data;

        setToken(userToken);
        setCurrentUser(user);
        
        // Persistir en localStorage
        localStorage.setItem('authToken', userToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    token,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
