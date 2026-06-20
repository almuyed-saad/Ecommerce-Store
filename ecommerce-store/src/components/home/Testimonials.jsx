import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Almuyed Saad',
      role: 'Tech Enthusiast',
      image: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=AS',
      review: '"Absolutely love the quality! Premium products at great prices. Highly recommend!"',
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: 'James Wilson',
      role: 'Business Owner',
      image: 'https://placehold.co/100x100/2196F3/FFFFFF?text=JW',
      review: '"Best shopping experience ever. Fast delivery and amazing customer service!"',
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: 'Sarah Chen',
      role: 'Fashion Blogger',
      image: 'https://placehold.co/100x100/EC407A/FFFFFF?text=SC',
      review: '"Great selection of products! The quality exceeded my expectations. Will buy again!"',
      rating: 4,
      verified: true,
    },
  ]

  // Generate stars
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400 text-lg">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-dark-bg">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-secondary-500"></span>
            Testimonials
            <span className="w-8 h-0.5 bg-secondary-500"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
            What Our Customers Say 💬
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Real reviews from real people who love our products
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-light-border dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700"
            >
              {/* Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review Text */}
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-base leading-relaxed mb-6 italic">
                {testimonial.review}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-500 shadow-lg"
                    loading="lazy"
                  />
                  {testimonial.verified && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white dark:border-dark-surface">
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-dark-bg dark:text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    {testimonial.role} • {testimonial.verified ? '✅ Verified' : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-6 mt-12 text-center text-light-text-secondary dark:text-dark-text-secondary text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.8/5 Average Rating</span>
          </div>
          <div className="w-px h-6 bg-light-border dark:bg-dark-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span>10,000+ Happy Customers</span>
          </div>
          <div className="w-px h-6 bg-light-border dark:bg-dark-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span>Trusted Since 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials