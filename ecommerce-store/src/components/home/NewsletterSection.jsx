import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
      
      if (subscribers.includes(email)) {
        toast.error('You are already subscribed! 🎉')
        setLoading(false)
        return
      }

      subscribers.push(email)
      localStorage.setItem('subscribers', JSON.stringify(subscribers))

      toast.success('Thanks for subscribing! 🎉 Check your email for 10% off.')
      setEmail('')
      setLoading(false)

      console.log('📧 Newsletter Subscribers:', subscribers)
    }, 1500)
  }

  return (
    <section className="py-12 bg-light-surface dark:bg-dark-surface overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-2xl shadow-2xl p-6 md:p-10"
        >
          {/* Glow Effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 blur-2xl opacity-30 animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300 blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '3s' }} />

          {/* Animated Background Shapes - Smaller */}
          <div className="absolute inset-0 opacity-15">
            <motion.div
              animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -top-16 -right-16 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -bottom-16 -left-16 w-56 h-56 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl"
            />
          </div>

          {/* Floating Icons - Smaller */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-4 right-6 text-3xl opacity-20"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-4 left-6 text-2xl opacity-20"
          >
            🎯
          </motion.div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-4 py-1.5 rounded-full mb-3 shadow-lg shadow-white/20"
            >
              🔥 LIMITED TIME OFFER
            </motion.span>

            {/* Heading - SMALLER */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-extrabold text-white mb-2 [text-shadow:0_4px_30px_rgba(0,0,0,0.2)]"
            >
              Get <span className="text-yellow-300 [text-shadow:0_0_40px_rgba(251,191,36,0.3)]">10% Off</span> Your First Order!
            </motion.h2>

            {/* Description - SMALLER */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/85 text-sm md:text-base max-w-xl mx-auto mb-4"
            >
              Subscribe for exclusive deals, fashion tips, and 10% off your first purchase.
            </motion.p>

            {/* Form - SMALLER */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
            >
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  📧
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-white/50 transition-all shadow-lg"
                  disabled={loading}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(251, 191, 36, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px] text-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Subscribe
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Benefits - SMALLER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-5"
            >
              {[
                { icon: '🛍️', label: '10% Off' },
                { icon: '🚀', label: 'Exclusive Deals' },
                { icon: '✨', label: 'Weekly Updates' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center text-white transition-all cursor-default border border-white/10 shadow-lg"
                >
                  <div className="text-xl mb-0.5">{item.icon}</div>
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection