// Authentication utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface User {
  id: number
  username: string
  email: string
  userType: 'admin' | 'academic' | 'faculty' | 'student'
  roles: Array<{
    role: 'faculty' | 'hod'
    departmentId?: number
    departmentName?: string
  }>
  facultyInfo?: any
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    token: string
    user: User
  }
}

// Login function
export async function login(username: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (data.success && data.data) {
      // Store token and user info
      localStorage.setItem('authToken', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      localStorage.setItem('isLoggedIn', 'true')
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    }
  }
}

// Logout function
export async function logout(): Promise<void> {
  try {
    const token = getAuthToken()
    
    // Try to call backend logout endpoint if token exists
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        // If logout API call fails (e.g., token expired), try no-auth endpoint
        try {
          await fetch(`${API_BASE_URL}/auth/logout-no-auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (e) {
          // Ignore errors - we'll still clear local storage
          console.warn('Logout API call failed, clearing local storage anyway')
        }
      }
    }
  } catch (error) {
    // Ignore errors - we'll still clear local storage
    console.warn('Logout error:', error)
  } finally {
    // Always clear local storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
  }
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Get auth token
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getCurrentUser()
}

// Verify token
export async function verifyToken(): Promise<boolean> {
  const token = getAuthToken()
  if (!token) return false

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()
    
    if (data.success && data.data) {
      localStorage.setItem('user', JSON.stringify(data.data.user))
      return true
    }

    return false
  } catch (error) {
    console.error('Token verification error:', error)
    return false
  }
}

// Check if user has specific role
export function hasRole(role: 'faculty' | 'hod'): boolean {
  const user = getCurrentUser()
  if (!user) return false

  // Check user type
  if (user.userType === role) return true

  // Check roles array
  return user.roles.some(r => r.role === role)
}

// Check if user is HOD
export function isHOD(): boolean {
  return hasRole('hod')
}

// Get available roles for user
export function getAvailableRoles(): Array<'faculty' | 'hod'> {
  const user = getCurrentUser()
  if (!user) return []

  const roles: Array<'faculty' | 'hod'> = []

  // If user is faculty or explicitly has a faculty role, include faculty
  if (user.userType === 'faculty' || (Array.isArray(user.roles) && user.roles.some(r => r.role === 'faculty'))) {
    roles.push('faculty')
  }

  // HOD role if user has it
  if (hasRole('hod')) {
    roles.push('hod')
  }

  return roles
}

