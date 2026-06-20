// import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { motion } from 'framer-motion'

const MobileNav = () => {
  const location = useLocation()
  const { getTotalItems } = useCart()
  const { wishlist } = useWishlist()

  const navItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🛍️', label: 'Shop', path: '/shop' },
    { icon: '🛒', label: 'Cart', path: '/cart', badge: getTotalItems() },
    { icon: '❤️', label: 'Wishlist', path: '/wishlist', badge: wishlist.length },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-t border-light-border dark:border-dark-border md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 text-xs transition-all duration-300 relative ${
              location.pathname === item.path
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-3 w-4 h-4 bg-secondary-500 text-white text-[10px] rounded-full flex items-center justify-center"
              >
                {item.badge > 9 ? '9+' : item.badge}
              </motion.span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav