import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  // Determine which badge to show
  const getBadge = () => {
    // Sale badge (if price > 100, fake discount for demo)
    if (product.price > 100) {
      return { 
        text: `SALE -${Math.round((product.price - 50) / product.price * 100)}%`, 
        color: 'bg-secondary-500' 
      }
    }
    // New badge (products with id > 18)
    if (product.id > 30) {
      return { text: 'NEW', color: 'bg-success' }
    }
    // Best seller (products with rating > 4.5)
    if (product.rating?.rate > 4.5) {
      return { text: '⭐ BEST SELLER', color: 'bg-primary-600' }
    }
    return null
  }

  const badge = getBadge()

  return (
    <div className="group bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image with Badge */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-dark-card">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badge - Top Left */}
        {badge && (
          <div className={`absolute top-3 left-3 ${badge.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse-slow`}>
            {badge.text}
          </div>
        )}

        {/* Quick Action Buttons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => addToWishlist(product)}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Add to wishlist"
          >
            <span className="text-sm">{isInWishlist(product.id) ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-dark-bg dark:text-white line-clamp-2 min-h-[40px] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.round(product.rating?.rate || 0))}
            {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
          </div>
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            ({product.rating?.count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            ${product.price}
          </span>
          {product.price > 100 && (
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-through">
              ${(product.price * 1.4).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard