import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { motion, AnimatePresence } from 'framer-motion'
import SearchModal from './SearchModal'
import { useAuth } from '../../context/AuthContext'
import UserDropdown from './UserDropdown'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { getTotalItems } = useCart()
  const { wishlist } = useWishlist()
  const location = useLocation()
  const { user, logout } = useAuth()

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-lg'
            : 'bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.span
                whileHover={{ rotate: 15 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
              >
                ✨ Shop
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 relative ${
                    location.pathname === link.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                aria-label="Toggle theme"
              >
                <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors relative"
                aria-label="Wishlist"
              >
                <span className="text-xl">❤️</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse-slow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors relative"
                aria-label="Cart"
              >
                <svg className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                
                {/* Animated Badge */}
                <AnimatePresence>
                  {getTotalItems() > 0 && (
                    <motion.span
                      key={getTotalItems()}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

{/* Auth Buttons */}
{user ? (
  <UserDropdown />
) : (
  <div className="flex items-center gap-3 ml-2">
    <Link
      to="/login"
      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
    >
      Sign Up
    </Link>
  </div>
)}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-xl md:hidden"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-light-card dark:hover:bg-dark-card text-light-text-secondary dark:text-dark-text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Navbar