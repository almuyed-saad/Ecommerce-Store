import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'  // ← ADD THIS
import CountdownTimer from '../common/CountdownTimer'

const HeroSection = () => {
  // Set target date: 7 days from now
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-700 to-indigo-800 py-16 md:py-24">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative container-custom">
        <div className="text-center">
          {/* Sale Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <span className="animate-pulse">🔥</span>
            <span className="text-sm font-semibold text-white">Summer Sale 2026</span>
            <span className="bg-secondary-500 text-white text-xs px-3 py-0.5 rounded-full font-bold">
              -70%
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Shopping Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6"
          >
            Discover premium products curated just for you. Up to 70% off on selected items.
          </motion.p>

          {/* ⭐ COUNTDOWN TIMER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-2 mb-8"
          >
            <span className="text-white/80 text-sm font-medium tracking-wider uppercase flex items-center gap-2">
              <span className="w-8 h-0.5 bg-white/30"></span>
              ⏰ Sale Ends In
              <span className="w-8 h-0.5 bg-white/30"></span>
            </span>
            <CountdownTimer targetDate={targetDate} />
          </motion.div>

          {/* CTA Buttons - UPDATED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Button 1: Start Shopping → Shop Page */}
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 md:px-10 md:py-4 bg-white text-primary-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                Start Shopping
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </Link>

            {/* Button 2: ❤️ My Collection → Wishlist Page */}
            <Link to="/wishlist">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 md:px-10 md:py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all"
              >
                ❤️ My Collection
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center gap-6 md:gap-12 mt-10"
          >
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Premium Products' },
              { number: '4.9★', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection