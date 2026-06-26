// src/services/productService.js
import apiClient from '../api/client'

// Fetch all products from backend
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products')
    console.log('Products fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch related products (same category, different ID)
export const fetchRelatedProducts = async (category, productId) => {
  try {
    const response = await apiClient.get('/products')
    const allProducts = response.data
    return allProducts
      .filter(p => p.category === category && p._id !== productId)
      .slice(0, 4)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}