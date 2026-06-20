import React, { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Add to cart with toast
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        const updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
        toast.success(`Added another ${product.title.substring(0, 20)}... to cart`)
        return updated
      }
      toast.success(`${product.title.substring(0, 20)}... added to cart 🎉`)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Silent add - NO toast (for "Add All" in wishlist)
  const addToCartSilent = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(prev => {
      const item = prev.find(item => item.id === id)
      if (item) {
        toast.error(`${item.title.substring(0, 20)}... removed from cart`)
      }
      return prev.filter(item => item.id !== id)
    })
  }

  // Update quantity - FIXED VERSION
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      // Remove item if quantity is 0 or negative
      removeFromCart(id)
      return
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    toast.success('Cart cleared')
  }

  // Get total items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0)
  }

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      addToCartSilent,
      removeFromCart,
      updateQuantity,
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
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}