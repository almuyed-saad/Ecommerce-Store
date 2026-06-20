import axios from 'axios'

// Base URL for the API
const API_BASE_URL = 'https://fakestoreapi.com'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (runs before every request)
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (runs after every response)
apiClient.interceptors.response.use(
  (response) => {
    return response.data // Return only the data
  },
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export default apiClient