'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, handleApiError } from '../utils/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérification de l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // Vérification du token avec le serveur
      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        setUser(response.data as User);
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const getStoredToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('spa_auth_token') || sessionStorage.getItem('spa_auth_token');
  };

  const clearAuth = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spa_auth_token');
      localStorage.removeItem('spa_user_role');
      sessionStorage.removeItem('spa_auth_token');
      sessionStorage.removeItem('spa_user_role');
    }
  };

  const login = async (email: string, password: string, remember: boolean = false) => {
    try {
      setLoading(true);
      
      // Simulation d'un appel API de connexion
      // En production, remplacer par un vrai appel API
      if (email === 'admin@spa-nina.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          firstName: 'Admin',
          lastName: 'SPA',
          email: 'admin@spa-nina.com',
          role: 'admin',
          permissions: ['*'], // Toutes les permissions pour l'admin
          isActive: true,
          lastLogin: new Date().toISOString()
        };

        const mockToken = 'mock_token_' + Date.now();
        
        // Stockage du token
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('spa_auth_token', mockToken);
        storage.setItem('spa_user_role', mockUser.role);
        
        setUser(mockUser);
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Appel API pour invalider le token côté serveur
      try {
        await authAPI.logout();
      } catch (error) {
        // Ignorer les erreurs de logout côté serveur
        console.warn('Erreur lors du logout côté serveur:', error);
      }
      
      clearAuth();
      router.push('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      clearAuth();
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authAPI.refreshToken();
      if (response.success && response.data) {
        const { token, user: updatedUser } = response.data as { token: string; user: User };
        
        // Mettre à jour le token stocké
        const hasLocalToken = localStorage.getItem('spa_auth_token');
        const storage = hasLocalToken ? localStorage : sessionStorage;
        storage.setItem('spa_auth_token', token);
        
        setUser(updatedUser);
      } else {
        throw new Error('Impossible de renouveler le token');
      }
    } catch (error) {
      console.error('Erreur lors du renouvellement du token:', error);
      clearAuth();
      router.push('/admin/login');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      
      const response = await authAPI.updateProfile(data);
      if (response.success && response.data) {
        setUser(response.data as User);
      } else {
        throw new Error('Impossible de mettre à jour le profil');
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // L'admin a toutes les permissions
    if (user.permissions.includes('*')) return true;
    
    // Vérification de la permission spécifique
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshToken,
    updateProfile,
    hasPermission,
    hasRole,
    isAuthenticated
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Hook pour protéger les routes
export const useRequireAuth = (requiredRole?: string | string[], requiredPermission?: string) => {
  const { user, loading, isAuthenticated, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (requiredRole && !hasRole(requiredRole)) {
      router.push('/admin/unauthorized');
      return;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push('/admin/unauthorized');
      return;
    }
  }, [user, loading, isAuthenticated, requiredRole, requiredPermission, hasRole, hasPermission, router]);

  return { user, loading, isAuthenticated };
};

// Composant pour protéger les routes
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | string[];
  requiredPermission?: string;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  requiredPermission, 
  fallback 
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated, hasRole, hasPermission } = useAuth();

  if (loading) {
    return React.createElement('div', { className: "flex items-center justify-center h-64" },
      React.createElement('div', { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" })
    );
  }

  if (!isAuthenticated) {
    return fallback || React.createElement('div', null, 'Accès non autorisé');
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || React.createElement('div', null, 'Rôle insuffisant');
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || React.createElement('div', null, 'Permission insuffisante');
  }

  return React.createElement(React.Fragment, null, children);
};

// Permissions prédéfinies
export const PERMISSIONS = {
  // Clients
  CLIENTS_VIEW: 'clients.view',
  CLIENTS_CREATE: 'clients.create',
  CLIENTS_EDIT: 'clients.edit',
  CLIENTS_DELETE: 'clients.delete',
  CLIENTS_EXPORT: 'clients.export',

  // Services
  SERVICES_VIEW: 'services.view',
  SERVICES_CREATE: 'services.create',
  SERVICES_EDIT: 'services.edit',
  SERVICES_DELETE: 'services.delete',

  // Produits
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_EDIT: 'products.edit',
  PRODUCTS_DELETE: 'products.delete',
  PRODUCTS_STOCK: 'products.stock',

  // Ventes
  SALES_VIEW: 'sales.view',
  SALES_CREATE: 'sales.create',
  SALES_EDIT: 'sales.edit',
  SALES_DELETE: 'sales.delete',
  SALES_INVOICE: 'sales.invoice',

  // Rendez-vous
  APPOINTMENTS_VIEW: 'appointments.view',
  APPOINTMENTS_CREATE: 'appointments.create',
  APPOINTMENTS_EDIT: 'appointments.edit',
  APPOINTMENTS_DELETE: 'appointments.delete',

  // Employés
  EMPLOYEES_VIEW: 'employees.view',
  EMPLOYEES_CREATE: 'employees.create',
  EMPLOYEES_EDIT: 'employees.edit',
  EMPLOYEES_DELETE: 'employees.delete',

  // Rapports
  REPORTS_VIEW: 'reports.view',
  REPORTS_EXPORT: 'reports.export',

  // Administration
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit',
  USERS_MANAGE: 'users.manage',
} as const;

// Rôles prédéfinis
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee'
} as const;
