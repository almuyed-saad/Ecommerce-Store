import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandFeatures from '../components/home/BrandFeatures'
import CategoryShowcase from '../components/home/CategoryShowcase'
import NewsletterSection from '../components/home/NewsletterSection'
import Testimonials from '../components/home/Testimonials'  // ← ADD THIS

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <BrandFeatures />
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
      <CategoryShowcase />
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <FeaturedProducts />
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
      <NewsletterSection />
      
      {/* TESTIMONIALS - ADDED HERE */}
      <Testimonials />
    </>
  )
}

export default HomePage