import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import WishlistPage from './pages/WishlistPage'
import NotFoundPage from './pages/NotFoundPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider } from './context/AuthContext'
import './App.css'

// Wrapper component for page transitions
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
           <Layout>
             <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '10px',
                },
              }}
            />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                } />
                <Route path="/shop" element={
                  <PageTransition>
                    <ShopPage />
                  </PageTransition>
                } />
                <Route path="/about" element={
  <PageTransition>
    <AboutPage />
  </PageTransition>
} />
                

          <Route path="/product/:id" element={
                  <PageTransition>
                    <ProductDetailPage />
                  </PageTransition>
                } />
                <Route path="/checkout" element={
  <PageTransition>
    <CheckoutPage />
  </PageTransition>
}/>
                // Add route:
<Route path="/profile" element={
  <ProtectedRoute>
    <PageTransition>
      <ProfilePage />
    </PageTransition>
  </ProtectedRoute>
} />

                <Route path="/login" element={
  <PageTransition>
    <LoginPage />
  </PageTransition>
} />
<Route path="/register" element={
  <PageTransition>
    <RegisterPage />
  </PageTransition>
} />

// Protect Cart, Wishlist, Checkout:
<Route path="/cart" element={
  <ProtectedRoute>
    <PageTransition>
      <CartPage />
    </PageTransition>
  </ProtectedRoute>
} />
<Route path="/wishlist" element={
  <ProtectedRoute>
    <PageTransition>
      <WishlistPage />
    </PageTransition>
  </ProtectedRoute>
} />
<Route path="/checkout" element={
  <ProtectedRoute>
    <PageTransition>
      <CheckoutPage />
    </PageTransition>
  </ProtectedRoute>
} />



                <Route path="/cart" element={
                  <PageTransition>
                    <CartPage />
                  </PageTransition>
                } />
                <Route path="/contact" element={
  <PageTransition>
    <ContactPage />
  </PageTransition>
} />
                <Route path="/wishlist" element={
                  <PageTransition>
                    <WishlistPage />
                  </PageTransition>
                } />
                <Route path="*" element={
                  <PageTransition>
                    <NotFoundPage />
                  </PageTransition>
                } />
              </Routes>
            </AnimatePresence>
          </Layout>
          </AuthProvider>

        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App