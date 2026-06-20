import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryShowcase = () => {
  const categories = [
    { 
      name: "Electronics", 
      icon: "📱", 
      color: "from-purple-500 to-indigo-600",
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    { 
      name: "Men's Fashion", 
      icon: "👔", 
      color: "from-blue-500 to-blue-600",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    { 
      name: "Women's Fashion", 
      icon: "👗", 
      color: "from-pink-500 to-rose-600",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    { 
      name: "Kids & Baby", 
      icon: "👶", 
      color: "from-green-400 to-green-600",
      gradient: "bg-gradient-to-br from-green-400 to-green-600"
    },
    { 
      name: "Home & Living", 
      icon: "🏠", 
      color: "from-orange-400 to-orange-600",
      gradient: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    { 
      name: "Beauty", 
      icon: "💄", 
      color: "from-pink-400 to-pink-600",
      gradient: "bg-gradient-to-br from-pink-400 to-pink-600"
    },
    { 
      name: "Sports & Outdoors", 
      icon: "⚽", 
      color: "from-emerald-500 to-emerald-700",
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700"
    },
    { 
      name: "Books & Media", 
      icon: "📚", 
      color: "from-yellow-500 to-yellow-700",
      gradient: "bg-gradient-to-br from-yellow-500 to-yellow-700"
    },
    { 
      name: "Jewelry", 
      icon: "💍", 
      color: "from-amber-400 to-amber-600",
      gradient: "bg-gradient-to-br from-amber-400 to-amber-600"
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-dark-bg">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-secondary-500"></span>
            Categories
            <span className="w-8 h-0.5 bg-secondary-500"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
            Shop by Category 🛍️
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Browse our premium collections
          </p>
        </motion.div>

        {/* Category Grid - 3 columns on mobile, 3 on tablet, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative group"
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className={`block ${cat.gradient} rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden`}
              >
                {/* Animated Background Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {cat.name}
                  </h3>
                  <span className="inline-block mt-2 text-xs text-white/70 group-hover:text-white/90 transition-colors">
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase