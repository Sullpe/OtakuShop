import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('manga-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('manga-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('manga-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {

    if (email && password) {
      setUser({
        id: '1',
        name: 'Макима',
        email
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (name && email && password) {
      setUser({
        id: '1',
        name,
        email
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (currentPassword && newPassword) {
        resolve();
      } else {
        reject(new Error('Неверный текущий пароль'));
      }
    }, 1000);
  });
};

  const resetPassword = async (email: string) => {
  console.log(`Password reset requested for: ${email}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
};

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updatePassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );

};