// API Configuration et utilitaires pour l'administration

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor({ message, status, errors }: { message: string; status: number; errors?: Record<string, string[]> }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('spa_auth_token') || sessionStorage.getItem('spa_auth_token');
  }

  private getHeaders(): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    const token = this.getAuthToken();
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new ApiError({
        message: 'Réponse invalide du serveur',
        status: response.status
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError({
        message: data.message || 'Une erreur est survenue',
        status: response.status,
        errors: data.errors
      });
    }

    return data;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers = { ...this.getHeaders() };
    delete headers['Content-Type']; // Let browser set it for FormData

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse<T>(response);
  }
}

// Instance globale de l'API client
export const api = new ApiClient();

// Utilitaires pour les appels API spécifiques

export const clientsAPI = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string; status?: string }) =>
    api.get('/clients', params),
  
  getById: (id: string) =>
    api.get(`/clients/${id}`),
  
  create: (data: any) =>
    api.post('/clients', data),
  
  update: (id: string, data: any) =>
    api.put(`/clients/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/clients/${id}`),
  
  export: (format: 'csv' | 'pdf', filters?: any) =>
    api.get(`/clients/export/${format}`, filters),
};

export const servicesAPI = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string; category?: string }) =>
    api.get('/services', params),
  
  getById: (id: string) =>
    api.get(`/services/${id}`),
  
  create: (data: any) =>
    api.post('/services', data),
  
  update: (id: string, data: any) =>
    api.put(`/services/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/services/${id}`),
  
  getCategories: () =>
    api.get('/services/categories'),
};

export const productsAPI = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string; category?: string; inStock?: boolean }) =>
    api.get('/products', params),
  
  getById: (id: string) =>
    api.get(`/products/${id}`),
  
  create: (data: any) =>
    api.post('/products', data),
  
  update: (id: string, data: any) =>
    api.put(`/products/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/products/${id}`),
  
  updateStock: (id: string, quantity: number, type: 'add' | 'remove' | 'set') =>
    api.patch(`/products/${id}/stock`, { quantity, type }),
  
  uploadImage: (id: string, file: File) =>
    api.upload(`/products/${id}/image`, file),
};

export const appointmentsAPI = {
  getAll: (params?: { page?: number; pageSize?: number; date?: string; status?: string; clientId?: string }) =>
    api.get('/appointments', params),
  
  getById: (id: string) =>
    api.get(`/appointments/${id}`),
  
  create: (data: any) =>
    api.post('/appointments', data),
  
  update: (id: string, data: any) =>
    api.put(`/appointments/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/appointments/${id}`),
  
  updateStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  
  getAvailableSlots: (date: string, serviceId?: string) =>
    api.get('/appointments/available-slots', { date, serviceId }),
};

export const salesAPI = {
  getAll: (params?: { page?: number; pageSize?: number; dateFrom?: string; dateTo?: string; clientId?: string }) =>
    api.get('/sales', params),
  
  getById: (id: string) =>
    api.get(`/sales/${id}`),
  
  create: (data: any) =>
    api.post('/sales', data),
  
  update: (id: string, data: any) =>
    api.put(`/sales/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/sales/${id}`),
  
  generateInvoice: (id: string) =>
    api.post(`/sales/${id}/invoice`),
  
  sendInvoice: (id: string, email?: string) =>
    api.post(`/sales/${id}/send-invoice`, { email }),
};

export const reportsAPI = {
  getDashboardStats: (period?: string) =>
    api.get('/reports/dashboard', { period }),
  
  getSalesReport: (params: { dateFrom: string; dateTo: string; groupBy?: string }) =>
    api.get('/reports/sales', params),
  
  getClientReport: (params: { dateFrom: string; dateTo: string }) =>
    api.get('/reports/clients', params),
  
  getProductReport: (params: { dateFrom: string; dateTo: string }) =>
    api.get('/reports/products', params),
  
  getAppointmentReport: (params: { dateFrom: string; dateTo: string }) =>
    api.get('/reports/appointments', params),
  
  exportReport: (type: string, params: any, format: 'csv' | 'pdf') =>
    api.get(`/reports/${type}/export/${format}`, params),
};

export const authAPI = {
  login: (email: string, password: string, remember?: boolean) =>
    api.post('/auth/login', { email, password, remember }),
  
  logout: () =>
    api.post('/auth/logout'),
  
  refreshToken: () =>
    api.post('/auth/refresh'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updateProfile: (data: any) =>
    api.put('/auth/profile', data),
};

// Utilitaires pour la gestion des erreurs
export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Une erreur inattendue est survenue';
};

// Utilitaires pour la pagination
export const getPaginationInfo = (response: ApiResponse) => {
  return response.pagination || {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  };
};

// Utilitaires pour les formats de données
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
};

export const formatDateTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const formatPhone = (phone: string): string => {
  // Format français : 06 12 34 56 78
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
};

// Utilitaires pour la validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

export const validatePostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  return postalCodeRegex.test(postalCode);
};
