import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { motion } from 'framer-motion'
import { fetchProductById, fetchRelatedProducts } from '../../services/productService'
import ProductCard from '../shop/ProductCard'
import ProductDetailsSkeleton from './ProductDetailsSkeleton'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

    useEffect(() => {
    if (!loading && product) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [loading, product]) 
  
  
  
  
  
  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const data = await fetchProductById(id)
      setProduct(data)
      
      if (data) {
        const related = await fetchRelatedProducts(data.category, id)
        setRelatedProducts(related)
      }
      setLoading(false)
    }
    loadProduct()
  }, [id])

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  if (loading) return <ProductDetailsSkeleton />

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-12 border border-light-border dark:border-dark-border">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-dark-bg dark:text-white">Product Not Found</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-primary inline-block mt-6">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-8">
        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span>›</span>
        <Link to="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
        <span>›</span>
        <span className="text-primary-600 dark:text-primary-400">{product?.title?.substring(0, 30) || 'Product'}...</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 border border-light-border dark:border-dark-border"
        >
          <div className="bg-light-surface dark:bg-dark-card rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 md:h-96 object-contain p-6 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Right - Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 md:p-8 border border-light-border dark:border-dark-border"
        >
          {/* Brand Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span 
              className="px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg"
              style={{ backgroundColor: product.brand?.color || '#8B5CF6' }}
            >
              {product.brand?.logo || '✨'} {product.brand?.name || 'Premium Brand'}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-dark-bg dark:text-white mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex text-yellow-400 text-lg">
              {'★'.repeat(Math.round(product.rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            </div>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
              ${product.price}
            </span>
            {product.price > 50 && (
              <span className="text-base text-light-text-secondary dark:text-dark-text-secondary line-through">
                ${(product.price * 1.4).toFixed(2)}
              </span>
            )}
            {product.price > 50 && (
              <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                SALE
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary-500 to-transparent mb-6" />

          {/* Description */}
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-secondary-500 to-transparent mb-6" />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-dark-bg dark:text-white">Quantity:</span>
            <div className="flex items-center gap-2 bg-light-card dark:bg-dark-card rounded-full p-1">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center text-xl font-bold text-dark-bg dark:text-white"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-xl text-dark-bg dark:text-white">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center text-xl font-bold text-dark-bg dark:text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              🛒 Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => addToWishlist(product)}
              className="px-6 py-4 bg-white dark:bg-dark-surface border-2 border-light-border dark:border-dark-border rounded-2xl font-semibold hover:border-primary-600 dark:hover:border-primary-400 transition-all flex items-center gap-2"
            >
              {isInWishlist(product.id) ? '❤️' : '🤍'}
              <span className="hidden sm:inline">Wishlist</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary-500 via-secondary-500 to-transparent my-6" />

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-light-surface dark:bg-dark-card rounded-xl p-3">
              <span className="text-light-text-secondary dark:text-dark-text-secondary block text-xs uppercase tracking-wider">Category</span>
              <p className="font-semibold text-dark-bg dark:text-white capitalize">{product.category}</p>
            </div>
            <div className="bg-light-surface dark:bg-dark-card rounded-xl p-3">
              <span className="text-light-text-secondary dark:text-dark-text-secondary block text-xs uppercase tracking-wider">Availability</span>
              <p className="font-semibold text-success">✅ In Stock</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-16 border-t border-light-border dark:border-dark-border">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-bg dark:text-white">
              You May Also Like 🛍️
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
              Customers who bought this also loved these
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails