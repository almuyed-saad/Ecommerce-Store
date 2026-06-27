import React, { createContext, useState, useContext, useEffect } from 'react'
import * as cartService from '../services/cartService'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const data = await cartService.getCart()
          setCartData(data)
        } catch (error) {
          console.error('Error loading cart:', error)
          setCartData({ items: [] })
        }
      } else {
        setCartData({ items: [] })
      }
      setLoading(false)
    }
    loadCart()
  }, [user])

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      const productId = product._id || product.id
      const data = await cartService.addToCart(productId, quantity)
      setCartData(data)
      toast.success(`Added ${product.title} to cart 🛒`)
    } catch (error) {
      console.error('Add to cart error:', error)
      toast.error('Failed to add to cart')
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity)
      setCartData(data)
    } catch (error) {
      console.error('Update quantity error:', error)
      toast.error('Failed to update cart')
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const data = await cartService.removeFromCart(productId)
      setCartData(data)
      toast.success('Removed from cart')
    } catch (error) {
      console.error('Remove from cart error:', error)
      toast.error('Failed to remove from cart')
    }
  }

  const clearCart = async () => {
    setCartData({ items: [] })
    toast.success('Cart cleared')
  }

  // ✅ Returns the ITEMS array (what CartPage expects)
  const cart = cartData.items || []

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.price || 0
      return total + (price * (item.quantity || 0))
    }, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,           // ✅ This is the array CartPage expects
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}