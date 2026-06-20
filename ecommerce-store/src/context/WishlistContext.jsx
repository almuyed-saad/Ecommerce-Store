import React, { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        toast.success('Removed from wishlist ❤️')
        return prev.filter(item => item.id !== product.id)
      }
      toast.success(`${product.title.substring(0, 20)}... added to wishlist ❤️`)
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist(prev => {
      const item = prev.find(item => item.id === id)
      toast.error(`${item?.title.substring(0, 20)}... removed from wishlist`)
      return prev.filter(item => item.id !== id)
    })
  }

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}