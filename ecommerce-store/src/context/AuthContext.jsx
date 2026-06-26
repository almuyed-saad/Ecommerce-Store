import React, { createContext, useState, useContext, useEffect } from 'react'
import apiClient from '../api/client'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token')
      
      // ✅ NO TOKEN → Don't even try
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // ✅ Use apiClient (interceptor will attach token)
        const response = await apiClient.get('/auth/profile')
        setUser(response.data)
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('token')
        setUser(null)
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setUser(user)
      toast.success(`Welcome back, ${user.name}! 🎉`)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setUser(user)
      toast.success('Account created successfully! 🎉')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}