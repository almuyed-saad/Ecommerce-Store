import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Ripple from '../components/ui/Ripple'

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
      toast.success('Cart cleared')
    }
  }

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-custom py-20"
      >
        <div className="text-center max-w-md mx-auto">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-dark-bg dark:text-white mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Looks like you haven't added any items yet. Start shopping!
          </p>
          <Link to="/shop">
            <Ripple 
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-block"
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
            🛒 Shopping Cart
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/shop">
            <Ripple 
              className="px-6 py-2 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
              rippleColor="rgba(124,58,237,0.3)"
            >
              ← Continue Shopping
            </Ripple>
          </Link>
          <Ripple
            className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/40 hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={handleClearCart}
            rippleColor="rgba(239,68,68,0.3)"
          >
            Clear All
          </Ripple>
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => {
              // ✅ Use item._id for React key (cart subdocument ID)
              // ✅ Use item.product._id for API calls
              const product = item.product
              const productId = product?._id
              
              return (
                <motion.div
                  key={item._id}
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
                    {/* ✅ Product Image (using product data) */}
                    <Link to={`/product/${productId}`} className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain bg-light-surface dark:bg-dark-card rounded-xl p-2 hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 w-full">
                      <Link to={`/product/${productId}`}>
                        <h3 className="text-sm md:text-base font-semibold text-dark-bg dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>

                      {/* ✅ Rating (using product data) */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-yellow-400 text-xs">
                          {'★'.repeat(Math.round(product.rating?.rate || 0))}
                          {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                        </div>
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          ({product.rating?.count || 0})
                        </span>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                        <div>
                          {/* ✅ Price (using product data) */}
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            ${product.price}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary ml-2">
                              × {item.quantity}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-light-surface dark:bg-dark-card rounded-full p-1">
                            <Ripple 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-dark-bg dark:text-white hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:text-red-500 hover:scale-110 select-none cursor-pointer"
                              onClick={() => {
                                // ✅ Use productId for API calls
                                if (item.quantity <= 1) {
                                  removeFromCart(productId)
                                } else {
                                  updateQuantity(productId, item.quantity - 1)
                                }
                              }}
                              rippleColor="rgba(239,68,68,0.3)"
                            >
                              −
                            </Ripple>
                            
                            <span className="w-8 text-center font-semibold text-dark-bg dark:text-white select-none">
                              {item.quantity}
                            </span>
                            
                            <Ripple 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-dark-bg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 hover:text-primary-600 hover:scale-110 select-none cursor-pointer"
                              onClick={() => {
                                // ✅ Use productId for API calls
                                updateQuantity(productId, item.quantity + 1)
                              }}
                              rippleColor="rgba(124,58,237,0.3)"
                            >
                              +
                            </Ripple>
                          </div>

                          {/* ✅ Subtotal (using product data) */}
                          <span className="text-sm font-semibold text-dark-bg dark:text-white min-w-[60px] text-right select-none">
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Remove with Ripple */}
                          <Ripple 
                            className="text-red-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 p-2 rounded-full hover:scale-110 select-none cursor-pointer"
                            onClick={() => {
                              // ✅ Use productId for API calls
                              removeFromCart(productId)
                            }}
                            rippleColor="rgba(239,68,68,0.3)"
                          >
                            ✕
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

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 md:p-8 sticky top-24 border border-light-border dark:border-dark-border relative overflow-hidden"
          >
            {/* Premium Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 opacity-80" />

            <h2 className="text-xl font-bold text-dark-bg dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span> Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 px-3 bg-light-surface dark:bg-dark-card rounded-xl">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Subtotal ({cart.length} items)
                </span>
                <span className="font-semibold text-dark-bg dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 px-3 bg-light-surface dark:bg-dark-card rounded-xl">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Shipping
                </span>
                <span className={`font-semibold ${shipping === 0 ? 'text-success' : 'text-dark-bg dark:text-white'}`}>
                  {shipping === 0 ? '🆓 Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 50 && (
                <div className="bg-light-surface dark:bg-dark-card rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      🚚 Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </span>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {Math.round((subtotal / 50) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-light-card dark:bg-dark-card rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-yellow-400 rounded-full"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center py-2 px-3 bg-light-surface dark:bg-dark-card rounded-xl">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Tax (8%)
                </span>
                <span className="font-semibold text-dark-bg dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="relative">
                <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-primary-500 rounded-full" />
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
                <span className="text-base font-bold text-dark-bg dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-gold-400 to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:shadow-gold-500/30 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </Link>

            {/* Secure Checkout Badge */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                <span className="flex items-center gap-1">🔒 Secure Checkout</span>
                <span className="w-px h-4 bg-light-border dark:bg-dark-border" />
                <span className="flex items-center gap-1">🛡️ SSL Encrypted</span>
                <span className="w-px h-4 bg-light-border dark:bg-dark-border" />
                <span className="flex items-center gap-1">💳 100% Safe</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartPage