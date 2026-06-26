import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()  // ✅ Changed from addToWishlist to toggleWishlist

  if (!product) return null
  const productId = product._id || product.id

  return (
    <div className="group bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image + Wishlist Button */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-dark-card">
        <Link to={`/product/${productId}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}  // ✅ Changed from addToWishlist to toggleWishlist
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform select-none cursor-pointer"
          aria-label="Add to wishlist"
        >
          <span className="text-sm transition-colors duration-200">
            {isInWishlist(productId) ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${productId}`}>
          <h3 className="text-sm font-medium text-dark-bg dark:text-white line-clamp-2 min-h-[40px] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.round(product.rating?.rate || 0))}
            {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
          </div>
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            ({product.rating?.count || 0})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            ${product.price}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 select-none cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard