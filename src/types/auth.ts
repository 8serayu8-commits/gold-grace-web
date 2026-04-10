export type UserRole = 'super_admin' | 'admin' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'clients', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'system', actions: ['create', 'read', 'update', 'delete'] },
  ],
  admin: [
    { resource: 'clients', actions: ['create', 'read', 'update'] },
    { resource: 'projects', actions: ['create', 'read', 'update'] },
    { resource: 'documents', actions: ['create', 'read', 'update'] },
    { resource: 'reports', actions: ['read'] },
  ],
  staff: [
    { resource: 'clients', actions: ['read'] },
    { resource: 'projects', actions: ['read'] },
    { resource: 'documents', actions: ['read', 'create'] },
  ],
};

// Role hierarchy
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 3,
  admin: 2,
  staff: 1,
};

export interface MenuItem {
  key: string;
  label: string;
  icon: any;
  requiredRole?: UserRole;
  permissions?: string[];
}
