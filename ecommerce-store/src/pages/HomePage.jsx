// src/pages/HomePage.jsx
import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/productService'
import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandFeatures from '../components/home/BrandFeatures'
import CategoryShowcase from '../components/home/CategoryShowcase'
import NewsletterSection from '../components/home/NewsletterSection'
import Testimonials from '../components/home/Testimonials'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  return (
    <>
      <HeroSection />
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <BrandFeatures />
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
      <CategoryShowcase />
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <FeaturedProducts products={products} loading={loading} />
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
      <NewsletterSection />
      <Testimonials />
    </>
  )
}

export default HomePage