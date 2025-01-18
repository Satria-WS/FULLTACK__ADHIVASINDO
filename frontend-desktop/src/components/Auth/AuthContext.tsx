import React, { createContext, useContext, useState, ReactNode , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    // Check authentication status when the app loads
    useEffect(() => {
      checkAuth();
    }, []);
  
    const checkAuth = async () => {
      try {
        // Make a request to your backend to validate the token
        const response = await axios.get('http://localhost:9000/api/auth/verify', {
          withCredentials: true // Important for sending cookies
        });
        
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
       console.log('isAuth?', isAuthenticated);
      console.log('heelo')
    };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Make a request to your backend to clear the cookie
      await axios.post('http://localhost:9000/api/auth/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

    // Show loading spinner or placeholder while checking authentication
    if (loading) {
      return <div>Loading...</div>; // You can replace this with a proper loading component
    }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );
};