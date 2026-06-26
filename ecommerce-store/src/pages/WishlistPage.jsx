import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Ripple from '../components/ui/Ripple'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart, addToCartSilent, cart } = useCart()

  // ✅ wishlist is now: { products: [...] }
  const wishlistItems = wishlist?.products || []

  const getProductId = (product) => {
    const id = product?._id || product?.id
    return id ? String(id) : null
  }

  // ✅ ONLY ONE handleAddToCart function
  const handleAddToCart = (product) => {
    const id = getProductId(product)
    if (!id) return toast.error('Invalid product')

    // ✅ Allow adding even if already in cart (quantity increases)
    addToCart(product)
    toast.success(`${product.title.substring(0, 30)}... added to cart 🛒`)
  }

  const handleAddAllToCart = () => {
    if (!wishlistItems.length) return toast.error('Your wishlist is empty')

    const alreadyInCart = wishlistItems.filter((p) => {
      const pid = getProductId(p)
      return cart.some(item => String(item._id || item.id) === pid)
    })

    const newItems = wishlistItems.filter((p) => {
      const pid = getProductId(p)
      return !cart.some(item => String(item._id || item.id) === pid)
    })

    if (!newItems.length) return toast.error('All items are already in your cart!')

    newItems.forEach(p => addToCartSilent(p))

    const msg = alreadyInCart.length
      ? `✅ Added ${newItems.length} new items (${alreadyInCart.length} were already in cart)`
      : `✅ Added all ${wishlistItems.length} items to cart! 🎉`
    toast.success(msg)
  }

  // ✅ Empty state
  if (!wishlistItems.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container-custom py-20"
      >
        <div className="text-center max-w-md mx-auto">
          <div className="text-7xl mb-6">❤️</div>
          <h2 className="text-3xl font-bold text-dark-bg dark:text-white">Your Wishlist is Empty</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Start shopping and save your favorite items!
          </p>
          <Link to="/shop">
            <Ripple className="btn-primary inline-block select-none cursor-pointer">
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
      className="container-custom py-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white">
            ❤️ My Wishlist
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <Ripple
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 select-none cursor-pointer"
          onClick={handleAddAllToCart}
          rippleColor="rgba(255,255,255,0.3)"
        >
          🛒 Add All to Cart
        </Ripple>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((product, index) => {
            const id = getProductId(product) || `item-${index}`
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05, layout: { duration: 0.3 } }}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-light-border dark:border-dark-border"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 md:p-6">
                  <Link to={`/product/${id}`} className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-28 h-28 md:w-32 md:h-32 object-contain bg-light-surface dark:bg-dark-card rounded-xl p-3 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 w-full">
                    <Link to={`/product/${id}`}>
                      <h3 className="text-base md:text-lg font-semibold text-dark-bg dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(Math.round(product.rating?.rate || 0))}
                        {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                      </div>
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        ({product.rating?.count || 0} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        ${product.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <Ripple
                          className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-105 select-none cursor-pointer"
                          onClick={() => handleAddToCart(product)}
                          rippleColor="rgba(255,255,255,0.3)"
                        >
                          🛒 Add to Cart
                        </Ripple>
                        <Ripple
                          className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-all select-none cursor-pointer"
                          onClick={() => removeFromWishlist(id)}
                          rippleColor="rgba(239,68,68,0.3)"
                        >
                          ✕ Remove
                        </Ripple>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="mt-8 flex flex-wrap justify-between items-center gap-4 p-4 bg-light-surface dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border"
      >
        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
        </span>
        <div className="flex gap-3">
          <Ripple
            className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 select-none cursor-pointer"
            onClick={handleAddAllToCart}
            rippleColor="rgba(255,255,255,0.3)"
          >
            🛒 Add All to Cart
          </Ripple>
          <Ripple
            className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all select-none cursor-pointer"
            onClick={() => {
              if (window.confirm('Remove all items from wishlist?')) {
                wishlistItems.forEach(p => removeFromWishlist(getProductId(p)))
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