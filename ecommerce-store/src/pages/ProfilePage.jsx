import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user } = useAuth()

  const handleEditProfile = () => {
    toast.info('✏️ Edit Profile feature coming soon!')
  }

  const handleChangePassword = () => {
    toast.info('🔐 Change Password feature coming soon!')
  }

  return (
    <div className="container-custom py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white dark:bg-dark-surface rounded-3xl shadow-xl border border-light-border dark:border-dark-border overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-8 md:py-10 text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white flex items-center justify-center text-white font-bold text-4xl mx-auto shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">{user?.name}</h1>
          <p className="text-white/80 text-sm">{user?.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-light-border dark:border-dark-border">
          <Link
            to="/orders"
            className="bg-light-surface dark:bg-dark-card rounded-xl p-4 text-center hover:shadow-md transition-shadow border border-light-border dark:border-dark-border"
          >
            <div className="text-2xl mb-1">📦</div>
            <div className="font-bold text-dark-bg dark:text-white">0</div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Orders</div>
          </Link>
          <Link
            to="/wishlist"
            className="bg-light-surface dark:bg-dark-card rounded-xl p-4 text-center hover:shadow-md transition-shadow border border-light-border dark:border-dark-border"
          >
            <div className="text-2xl mb-1">❤️</div>
            <div className="font-bold text-dark-bg dark:text-white">0</div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Wishlist</div>
          </Link>
        </div>

        {/* Actions Section */}
        <div className="p-6 space-y-3">
          <button
            onClick={handleEditProfile}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 select-none cursor-pointer"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={handleChangePassword}
            className="w-full py-3 border border-light-border dark:border-dark-border text-red-500 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all select-none cursor-pointer"
          >
            🔐 Change Password
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage