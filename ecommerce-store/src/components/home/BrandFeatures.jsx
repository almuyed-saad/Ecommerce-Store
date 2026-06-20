import { motion } from 'framer-motion'

const BrandFeatures = () => {
  const features = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50', color: 'primary' },
    { icon: '🔄', title: '30-Day Returns', desc: 'Hassle-free returns', color: 'secondary' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% protected', color: 'primary' },
    { icon: '🎯', title: 'Quality Guarantee', desc: 'Premium products', color: 'secondary' },
  ]

  return (
    <section className="py-12 bg-white dark:bg-dark-bg border-y border-light-border dark:border-dark-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-2xl hover:bg-light-card dark:hover:bg-dark-card transition-all group"
            >
              <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`font-semibold text-dark-bg dark:text-white text-sm`}>
                {feature.title}
              </h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandFeatures