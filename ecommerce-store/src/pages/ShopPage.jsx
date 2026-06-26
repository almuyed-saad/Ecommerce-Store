// src/pages/ShopPage.jsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductCard from '../components/shop/ProductCard'
import ProductSkeleton from '../components/shop/ProductSkeleton'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get('category') || 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [loading, setLoading] = useState(true)
  
  const productsPerPage = 12

  // Fetch products from backend
useEffect(() => {
  const loadProducts = async () => {
    setLoading(true)
    const data = await fetchProducts()
    setAllProducts(data)
    // Delay to show skeletons
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }
  loadProducts()
}, [])
  // Get unique categories
  const categories = ['all', ...new Set(allProducts.map(p => p.category))]

  // Sync category with URL
  useEffect(() => {
    const categoryFromURL = searchParams.get('category')
    if (categoryFromURL && categoryFromURL !== selectedCategory) {
      setSelectedCategory(categoryFromURL)
    }
  }, [searchParams])

  // Filter and sort products
  useEffect(() => {
    let result = [...allProducts]

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchTerm.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

     if (selectedCategory !== 'all') {
    result = result.filter(p => p.category === selectedCategory)
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating?.rate - a.rating?.rate)
        break
      default:
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [allProducts, selectedCategory, searchTerm, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
    setSortBy('popularity')
    setSearchParams({})
  }

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white">
          Shop All Products 🛍️
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Active Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCategory !== 'all' && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
            📂 {selectedCategory}
            <button
              onClick={() => handleCategorySelect('all')}
              className="ml-1 hover:text-red-500 transition-colors"
              aria-label="Remove category filter"
            >
              ✕
            </button>
          </span>
        )}

        {searchTerm && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
            🔍 {searchTerm}
            <button
              onClick={() => setSearchTerm('')}
              className="ml-1 hover:text-red-500 transition-colors"
              aria-label="Remove search filter"
            >
              ✕
            </button>
          </span>
        )}

        {(selectedCategory !== 'all' || searchTerm) && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search products..."
            className="w-full px-4 py-3 rounded-full border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 pr-10 rounded-full border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-3 rounded-full bg-secondary-500 text-white font-medium hover:bg-secondary-600 transition-all"
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card dark:hover:bg-dark-card'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-light-border dark:border-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-card dark:hover:bg-dark-card transition-all"
                >
                  ‹
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card dark:hover:bg-dark-card'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-light-border dark:border-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-card dark:hover:bg-dark-card transition-all"
                >
                  ›
                </button>
              </div>

              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Showing {startIndex + 1} - {Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-dark-bg dark:text-white">No products found</h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
            Try adjusting your search or filters
          </p>
          <button onClick={clearFilters} className="btn-primary inline-block mt-4">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopPage