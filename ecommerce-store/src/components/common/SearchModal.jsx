import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../../data/products'

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search products
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([])
      return
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setResults(filtered)
  }, [searchTerm])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-start justify-center pt-20 md:pt-28 px-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl"
          >
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
                🔍
              </span>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, brands, categories..."
                className="w-full pl-14 pr-12 py-5 bg-white dark:bg-dark-surface text-dark-bg dark:text-white text-xl rounded-2xl shadow-2xl border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results */}
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {searchTerm.trim() === '' ? (
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-lg">Search for products, brands, or categories</p>
                  <p className="text-sm mt-1">Type to start searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4">😕</div>
                  <p className="text-lg">No products found for "{searchTerm}"</p>
                  <p className="text-sm mt-1">Try searching with different keywords</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 px-2">
                    Found {results.length} {results.length === 1 ? 'product' : 'products'}
                  </p>
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-dark-surface rounded-xl hover:bg-light-surface dark:hover:bg-dark-card transition-all group border border-light-border dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-contain bg-light-surface dark:bg-dark-card rounded-lg p-2"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-dark-bg dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex text-yellow-400 text-xs">
                              {'★'.repeat(Math.round(product.rating?.rate || 0))}
                              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
                            </div>
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              ({product.rating?.count || 0})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            ${product.price}
                          </span>
                          <span className="block text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            {product.category}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">ESC</kbd> to close</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchModal