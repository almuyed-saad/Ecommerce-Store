import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-6xl font-bold gradient-text">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="text-light-text-secondary mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary inline-block mt-6">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage