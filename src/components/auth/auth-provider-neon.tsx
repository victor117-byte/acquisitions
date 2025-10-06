'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/ui/loading-screen';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Verificando autenticación...');
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        console.log('Usuario autenticado:', data.user);
        setUser(data.user);
      } else {
        console.log('No hay usuario autenticado');
        setUser(null);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Intentando login con:', email);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Respuesta del login:', response.status, data);

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      console.log('Login exitoso, estableciendo usuario:', data.user);
      setUser(data.user);
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      console.log('Intentando registro con:', email, name);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      console.log('Respuesta del registro:', response.status, data);

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrarse');
      }

      console.log('Registro exitoso, estableciendo usuario:', data.user);
      setUser(data.user);
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}