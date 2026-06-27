import React, { createContext, useState, useContext, useEffect } from 'react'
import * as cartService from '../services/cartService'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })  // ✅ cart is an OBJECT
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const data = await cartService.getCart()
          setCart(data)  // ✅ data is { items: [...] }
        } catch (error) {
          console.error('Error loading cart:', error)
        }
      } else {
        setCart({ items: [] })
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
      setCart(data)
      toast.success(`Added ${product.title} to cart 🛒`)
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity)
      setCart(data)
    } catch (error) {
      toast.error('Failed to update cart')
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const data = await cartService.removeFromCart(productId)
      setCart(data)
      toast.success('Removed from cart')
    } catch (error) {
      toast.error('Failed to remove from cart')
    }
  }

  const clearCart = async () => {
    setCart({ items: [] })
    toast.success('Cart cleared')
  }

  const getTotalItems = () => {
    return cart.items?.reduce((total, item) => total + item.quantity, 0) || 0  // ✅ use cart.items
  }

  const getTotalPrice = () => {
    return cart.items?.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0) || 0  // ✅ use cart.items
  }

  return (
    <CartContext.Provider value={{
      cart: cart.items || [],  // ✅ Provide cart.items as the array
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