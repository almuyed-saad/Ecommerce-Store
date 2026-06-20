import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Ripple from '../components/ui/Ripple'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart, addToCartSilent, cart } = useCart()

  // Add single item to cart
  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((item) => item.id === product.id)
    
    if (alreadyInCart) {
      toast.error(`"${product.title.substring(0, 30)}..." is already in your cart!`)
      return
    }
    
    addToCart(product)
  }

  // Add all items to cart - ONE TOAST ONLY
  const handleAddAllToCart = () => {
    if (wishlist.length === 0) {
      toast.error('Your wishlist is empty!')
      return
    }

    const alreadyInCart = wishlist.filter((p) => 
      cart.some((item) => item.id === p.id)
    )
    
    const newItems = wishlist.filter((p) => 
      !cart.some((item) => item.id === p.id)
    )

    if (newItems.length === 0) {
      toast.error('All items are already in your cart!')
      return
    }

    // Add all new items SILENTLY
    newItems.forEach((product) => {
      addToCartSilent(product)
    })
    
    // Show ONE single toast
    if (alreadyInCart.length > 0) {
      toast.success(`✅ Added ${newItems.length} new items to cart! (${alreadyInCart.length} items were already in cart)`)
    } else {
      toast.success(`✅ Added all ${wishlist.length} items to cart! 🎉`)
    }
  }

  // Empty state
  if (wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-custom py-20"
      >
        <div className="text-center max-w-md mx-auto">
          <div className="text-7xl mb-6">❤️</div>
          <h2 className="text-3xl font-bold text-dark-bg dark:text-white mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Start shopping and save your favorite items!
          </p>
          <Link to="/shop">
            <Ripple 
              className="btn-primary inline-block"
              rippleColor="rgba(255,255,255,0.3)"
            >
              Start Shopping →
            </Ripple>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-custom py-12"
>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white">
            ❤️ My Wishlist
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <Ripple
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          onClick={handleAddAllToCart}
          rippleColor="rgba(255,255,255,0.3)"
        >
          🛒 Add All to Cart
        </Ripple>
      </div>

      {/* Wishlist Items */}
      <motion.div layout className="space-y-4">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-light-border dark:border-dark-border"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 md:p-6">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-28 h-28 md:w-32 md:h-32 object-contain bg-light-surface dark:bg-dark-card rounded-xl p-3 hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base md:text-lg font-semibold text-dark-bg dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(Math.round(product.rating?.rate || 0))}
                      {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                    </div>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      ({product.rating?.count || 0} reviews)
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      ${product.price}
                    </span>

                    <div className="flex items-center gap-2">
                      <Ripple
                        className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => handleAddToCart(product)}
                        rippleColor="rgba(255,255,255,0.3)"
                      >
                        🛒 Add to Cart
                      </Ripple>
                      <Ripple
                        className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                        onClick={() => removeFromWishlist(product.id)}
                        rippleColor="rgba(239,68,68,0.3)"
                      >
                        ✕ Remove
                      </Ripple>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        layout
        transition={{ duration: 0.3 }}
        className="mt-8 flex flex-wrap justify-between items-center gap-4 p-4 bg-light-surface dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border"
      >
        <div>
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </span>
        </div>
        <div className="flex gap-3">
          <Ripple
            className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            onClick={handleAddAllToCart}
            rippleColor="rgba(255,255,255,0.3)"
          >
            🛒 Add All to Cart
          </Ripple>
          <Ripple
            className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
            onClick={() => {
              if (window.confirm('Remove all items from wishlist?')) {
                wishlist.forEach((p) => removeFromWishlist(p.id))
                toast.success('Wishlist cleared')
              }
            }}
            rippleColor="rgba(239,68,68,0.3)"
          >
            Clear All
          </Ripple>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WishlistPage