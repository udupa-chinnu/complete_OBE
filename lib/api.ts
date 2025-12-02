// API utility functions for backend communication

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

// Generic fetch wrapper with authentication
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: headers as HeadersInit,
    })

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/'
      return {
        success: false,
        message: 'Session expired. Please login again.',
      }
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

// Generic fetch wrapper for file uploads with authentication
async function apiRequestWithFiles<T>(
  endpoint: string,
  formData: FormData,
  method: string = 'POST'
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken()
    const headers: Record<string, string> = {}

    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: headers as HeadersInit,
      body: formData,
    })

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/'
      return {
        success: false,
        message: 'Session expired. Please login again.',
      }
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

// Faculties API
export const facultiesApi = {
  getAll: (includeInactive = false) =>
    apiRequest(`/faculties${includeInactive ? '?includeInactive=true' : ''}`),

  getById: (id: number) => apiRequest(`/faculties/${id}`),

  getForDropdown: () => apiRequest('/faculties/dropdown/active'),

  create: (formData: FormData) => apiRequestWithFiles('/faculties', formData, 'POST'),

  update: (id: number, formData: FormData) => apiRequestWithFiles(`/faculties/${id}`, formData, 'PUT'),

  deactivate: (id: number) =>
    apiRequest(`/faculties/${id}`, { method: 'DELETE' }),

  reactivate: (id: number) =>
    apiRequest(`/faculties/${id}/reactivate`, { method: 'POST' }),
}

// Departments API
export const departmentsApi = {
  getAll: (includeInactive = false) =>
    apiRequest(`/departments${includeInactive ? '?includeInactive=true' : ''}`),

  getById: (id: number) => apiRequest(`/departments/${id}`),

  create: (data: any) =>
    apiRequest('/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiRequest(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deactivate: (id: number) =>
    apiRequest(`/departments/${id}`, { method: 'DELETE' }),

  reactivate: (id: number) =>
    apiRequest(`/departments/${id}/reactivate`, { method: 'POST' }),
}

// Programs API
export const programsApi = {
  getAll: (includeInactive = false, departmentId?: number) => {
    const params = new URLSearchParams()
    if (includeInactive) params.append('includeInactive', 'true')
    if (departmentId) params.append('departmentId', departmentId.toString())
    return apiRequest(`/programs?${params.toString()}`)
  },

  getById: (id: number) => apiRequest(`/programs/${id}`),

  create: (formData: FormData) => apiRequestWithFiles('/programs', formData, 'POST'),

  update: (id: number, formData: FormData) => apiRequestWithFiles(`/programs/${id}`, formData, 'PUT'),

  deactivate: (id: number) =>
    apiRequest(`/programs/${id}`, { method: 'DELETE' }),

  reactivate: (id: number) =>
    apiRequest(`/programs/${id}/reactivate`, { method: 'POST' }),
}

// Institution API
export const institutionApi = {
  get: () => apiRequest('/institution'),

  updateBasic: (formData: FormData) => apiRequestWithFiles('/institution/basic', formData, 'POST'),

  updateContact: (data: any) =>
    apiRequest('/institution/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateGovernance: (data: any) =>
    apiRequest('/institution/governance', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAcademic: (data: any) =>
    apiRequest('/institution/academic', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateInfrastructure: (data: any) =>
    apiRequest('/institution/infrastructure', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateRecognitions: (data: any) =>
    apiRequest('/institution/recognitions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateMiscellaneous: (data: any) =>
    apiRequest('/institution/miscellaneous', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// Achievements API
export const achievementsApi = {
  getAll: (filters?: { category?: string; departmentId?: number; level?: string; includeInactive?: boolean }) => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.departmentId) params.append('departmentId', filters.departmentId.toString())
    if (filters?.level) params.append('level', filters.level)
    if (filters?.includeInactive) params.append('includeInactive', 'true')
    return apiRequest(`/achievements?${params.toString()}`)
  },

  getById: (id: number) => apiRequest(`/achievements/${id}`),

  create: (formData: FormData) => apiRequestWithFiles('/achievements', formData, 'POST'),

  update: (id: number, formData: FormData) => apiRequestWithFiles(`/achievements/${id}`, formData, 'PUT'),

  deactivate: (id: number) =>
    apiRequest(`/achievements/${id}`, { method: 'DELETE' }),

  reactivate: (id: number) =>
    apiRequest(`/achievements/${id}/reactivate`, { method: 'POST' }),
}

// Uploads API
export const uploadsApi = {
  getAll: (filters?: { type?: string; departmentId?: number; includeInactive?: boolean }) => {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.departmentId) params.append('departmentId', filters.departmentId.toString())
    if (filters?.includeInactive) params.append('includeInactive', 'true')
    return apiRequest(`/uploads?${params.toString()}`)
  },

  getById: (id: number) => apiRequest(`/uploads/${id}`),

  create: (formData: FormData) => apiRequestWithFiles('/uploads', formData, 'POST'),

  update: (id: number, formData: FormData) => apiRequestWithFiles(`/uploads/${id}`, formData, 'PUT'),

  deactivate: (id: number) =>
    apiRequest(`/uploads/${id}`, { method: 'DELETE' }),

  reactivate: (id: number) =>
    apiRequest(`/uploads/${id}/reactivate`, { method: 'POST' }),
}

