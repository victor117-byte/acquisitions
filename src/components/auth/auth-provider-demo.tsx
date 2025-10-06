'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Tipo de usuario simplificado para modo desarrollo
interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage (para persistencia en modo demo)
    const savedUser = localStorage.getItem('demo-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('demo-user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simular un pequeño delay para que parezca real
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validaciones básicas
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const demoUser: User = {
      id: `demo-${Date.now()}`,
      email: email,
      user_metadata: {
        name: email.split('@')[0]
      }
    };
    
    setUser(demoUser);
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    console.log('🔧 Modo demo: Login exitoso para', email);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    // Simular un pequeño delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validaciones básicas
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }

    const demoUser: User = {
      id: `demo-${Date.now()}`,
      email: email,
      user_metadata: {
        name: name || email.split('@')[0]
      }
    };
    
    setUser(demoUser);
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    console.log('🔧 Modo demo: Registro exitoso para', email);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('demo-user');
    console.log('🔧 Modo demo: Logout exitoso');
  };

  const resetPassword = async (email: string) => {
    // Simular envío de email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email) {
      throw new Error('Email es requerido');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }
    
    console.log('🔧 Modo demo: Email de recuperación enviado a', email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}