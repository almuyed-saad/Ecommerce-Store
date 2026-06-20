import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import MobileNav from '../common/MobileNav'
import BackToTop from '../common/BackToTop'  // ← ADD THIS

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      
      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </div>
  )
}

export default Layout