import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-dark-bg dark:text-white hidden sm:block">
          {user.name}
        </span>
        <svg className={`w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-light-border dark:border-dark-border overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="px-4 py-4 border-b border-light-border dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-dark-bg dark:text-white">{user.name}</p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-light-card dark:hover:bg-dark-card transition-colors"
              >
                <span className="text-xl">👤</span>
                <span className="text-sm text-dark-bg dark:text-white">My Profile</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-light-card dark:hover:bg-dark-card transition-colors"
              >
                <span className="text-xl">📦</span>
                <span className="text-sm text-dark-bg dark:text-white">My Orders</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-light-card dark:hover:bg-dark-card transition-colors"
              >
                <span className="text-xl">❤️</span>
                <span className="text-sm text-dark-bg dark:text-white">My Wishlist</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-light-border dark:border-dark-border" />

            {/* Logout */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  logout()
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <span className="text-xl">🚪</span>
                <span className="text-sm text-red-500">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDropdown