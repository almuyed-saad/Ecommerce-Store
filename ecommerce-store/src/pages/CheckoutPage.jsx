import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    orderNotes: ''
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart')
      toast.error('Your cart is empty!')
    }
  }, [cart, navigate])

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      toast.success('🎉 Order placed successfully!')
      navigate('/order-success', { 
        state: { 
          orderNumber: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          total: total 
        } 
      })
    }, 2000)
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 md:py-20 px-4 md:px-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium tracking-widest uppercase mb-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-400" />
            Secure Checkout
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-400">Order</span>
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Fill in your details to finalize your purchase
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-[#1A1A1A] rounded-3xl border border-gold-500/20 p-6 md:p-8 shadow-2xl shadow-gold-500/5"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-gold-400">✉️</span> Shipping Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1612 075236"
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                    Address <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      City <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Dhaka"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="1212"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Special instructions or delivery notes..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400 transition-all duration-300 resize-none"
                  />
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="sticky top-24 bg-[#1A1A1A] rounded-3xl border border-gold-500/20 p-6 md:p-8 shadow-2xl shadow-gold-500/5"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-gold-400">📋</span> Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold-500/20">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-800/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-[#0A0A0A] rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">× {item.quantity}</p>
                    </div>
                    <p className="text-sm text-gold-400 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className={shipping === 0 ? 'text-gold-400' : 'text-white'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (8%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-800">
                  <span className="text-white">Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting || cart.length === 0}
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-gold-400 to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  '🛒 Place Order'
                )}
              </motion.button>

              {/* Security Badges */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">🔒 Secure Payment</span>
                <span className="w-px h-4 bg-gray-700" />
                <span className="flex items-center gap-1">🛡️ SSL Encrypted</span>
                <span className="w-px h-4 bg-gray-700" />
                <span className="flex items-center gap-1">💳 100% Safe</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage