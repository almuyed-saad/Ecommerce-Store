// src/api/client.js
import axios from 'axios'

// ✅ PERMANENT FIX: Use Render URL directly
const API_BASE_URL = 'https://ecommerce-store-6dlf.onrender.com/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('🔍 API Client initialized with URL:', API_BASE_URL)

export default apiClient