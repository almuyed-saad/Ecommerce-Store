import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import apiClient from '../api/client'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  // Set axios default header if token exists
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('token')
      if (!savedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(savedToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
        const response = await apiClient.get('/auth/profile')
        setUser(response.data)
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('token')
        setToken(null)
        delete axios.defaults.headers.common['Authorization']
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setToken(token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)

      toast.success('Account created successfully! 🎉')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const { token, user } = response.data

      // 🔥 CRITICAL: Save token to localStorage
      localStorage.setItem('token', token)
      setToken(token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)

      toast.success(`Welcome back, ${user.name}! 🎉`)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
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
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}