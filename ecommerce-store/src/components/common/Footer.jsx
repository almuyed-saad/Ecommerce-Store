// import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <div className="container-custom py-8">
        <div className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <p>© {currentYear} Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer