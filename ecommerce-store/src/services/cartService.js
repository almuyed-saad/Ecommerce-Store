// src/services/cartService.js
import apiClient from '../api/client'

export const getCart = async () => {
  try {
    const response = await apiClient.get('/cart')
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    return { items: [] }
  }
}

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await apiClient.post('/cart', { productId, quantity })
    return response.data
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await apiClient.put(`/cart/${productId}`, { quantity })
    return response.data
  } catch (error) {
    console.error('Error updating cart:', error)
    throw error
  }
}

export const removeFromCart = async (productId) => {
  try {
    const response = await apiClient.delete(`/cart/${productId}`)
    return response.data
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}