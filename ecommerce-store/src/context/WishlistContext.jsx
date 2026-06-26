import React, { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

const getProductId = (product) => {
  const id = product?._id || product?.id
  return id ? String(id) : null
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    const productId = getProductId(product)
    if (!productId) return

    setWishlist(prev => {
      const exists = prev.some(item => getProductId(item) === productId)
      if (exists) {
        toast.success('💔 Removed from wishlist')
        return prev.filter(item => getProductId(item) !== productId)
      }
      toast.success('❤️ Added to wishlist')
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    const idStr = String(id)
    setWishlist(prev => {
      const item = prev.find(item => getProductId(item) === idStr)
      if (item) toast.success(`💔 ${item.title?.substring(0, 20)} removed`)
      return prev.filter(item => getProductId(item) !== idStr)
    })
  }

  const isInWishlist = (id) => {
    if (!id) return false
    return wishlist.some(item => getProductId(item) === String(id))
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}