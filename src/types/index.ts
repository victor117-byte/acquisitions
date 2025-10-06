// Tipos para usuarios
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'contador';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para suscripciones
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

// Tipos para planes
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  documentsLimit: number | null; // null = unlimited
  usersLimit: number | null; // null = unlimited
  stripePriceId?: string;
}

// Tipos para documentos
export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'pdf' | 'xml';
  fileSize: number;
  processedAt?: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  extractedData?: Record<string, any>;
  createdAt: Date;
}

// Tipos para autenticación
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Tipos para el dashboard
export interface DashboardStats {
  totalDocuments: number;
  documentsThisMonth: number;
  documentsRemaining: number;
  storageUsed: number;
  storageLimit: number;
}

// Tipos para notificaciones
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

// Tipos para la API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para configuraciones
export interface AppConfig {
  maxFileSize: number;
  allowedFileTypes: string[];
  documentsLimits: Record<string, number>;
}