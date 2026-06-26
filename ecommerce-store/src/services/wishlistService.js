// src/services/wishlistService.js
import apiClient from '../api/client'

export const getWishlist = async () => {
  try {
    const response = await apiClient.get('/wishlist')
    return response.data
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return { products: [] }
  }
}

export const toggleWishlist = async (productId) => {
  try {
    const response = await apiClient.post('/wishlist', { productId })
    return response.data
  } catch (error) {
    console.error('Error toggling wishlist:', error)
    throw error
  }
}

export const removeFromWishlist = async (productId) => {
  try {
    const response = await apiClient.delete(`/wishlist/${productId}`)
    return response.data
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    throw error
  }
}