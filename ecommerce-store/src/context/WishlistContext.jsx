import React, { createContext, useState, useContext, useEffect } from 'react'
import * as wishlistService from '../services/wishlistService'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ products: [] })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const data = await wishlistService.getWishlist()
          setWishlist(data)
        } catch (error) {
          console.error('Error loading wishlist:', error)
        }
      } else {
        setWishlist({ products: [] })
      }
      setLoading(false)
    }
    loadWishlist()
  }, [user])

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to manage wishlist')
      return
    }

    try {
      const productId = product._id || product.id
      const data = await wishlistService.toggleWishlist(productId)
      setWishlist(data)
      
      const isInWishlist = data.products?.some(p => (p._id || p.id) === productId)
      toast.success(isInWishlist ? 'Added to wishlist ❤️' : 'Removed from wishlist 💔')
    } catch (error) {
      toast.error('Failed to update wishlist')
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const data = await wishlistService.removeFromWishlist(productId)
      setWishlist(data)
      toast.success('Removed from wishlist')
    } catch (error) {
      toast.error('Failed to remove from wishlist')
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.products?.some(p => (p._id || p.id) === productId) || false
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      loading,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}