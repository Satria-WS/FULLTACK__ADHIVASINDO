import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login?: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:9000/api/auth/login',
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     setIsAuthenticated(false);
  //   }
  // };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};