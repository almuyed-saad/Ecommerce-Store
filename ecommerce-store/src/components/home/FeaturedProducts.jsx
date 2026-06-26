import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../shop/ProductCard'
import ProductSkeleton from '../shop/ProductSkeleton'

const FeaturedProducts = ({ products, loading }) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', "Men's Fashion", "Women's Fashion", 'Jewelry']

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const displayProducts = filteredProducts.slice(0, 8)

  if (loading) {
    return (
      <section className="py-16 bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-bg dark:text-white">Loading products...</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-light-surface dark:bg-dark-surface">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-secondary-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-secondary-500" />
            Featured Collection
            <span className="w-8 h-0.5 bg-secondary-500" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
            Best Sellers 🔥
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Curated from Fashion & Jewelry
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-light-card dark:bg-dark-card text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-50 dark:hover:bg-dark-surface'
              }`}
            >
              {cat === 'all' ? 'All' : cat.replace("'s", "").trim()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {displayProducts.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <Link to="/shop">
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-full font-semibold hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-dark-bg transition-all">
              View All Products →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts