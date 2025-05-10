import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp > currentTime) {
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to dashboard if token is valid
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('balance');
        navigate('/login');
      }
    }
  }, [navigate]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/dashboard'); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); 
    localStorage.removeItem('balance');
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};