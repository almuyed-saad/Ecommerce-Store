import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const team = [
    {
      name: 'Almuyed Saad',
      role: 'Founder & CEO',
      image: '/images/team/IMG-20251201-WA0048.jpg.jpeg',
      bio: 'Passionate about creating premium shopping experiences.'
    },
    {
      name: 'Nusrat Jahan',
      role: 'Lead Designer',
      image: 'https://ui-avatars.com/api/?name=Nusrat+Jahan&background=EC407A&color=fff&size=200&font-size=0.5',
      bio: 'Creative designer with a keen eye for aesthetics.'
    },
    {
      name: 'Sijan Ahmed',
      role: 'Senior Developer',
      image: 'https://ui-avatars.com/api/?name=Sijan+Ahmed&background=2196F3&color=fff&size=200&font-size=0.5',
      bio: 'Full-stack developer passionate about building scalable apps.'
    }
  ]

  const stats = [
    { number: '5+', label: 'Years of Excellence', icon: '🏆' },
    { number: '10K+', label: 'Happy Customers', icon: '😊' },
    { number: '500+', label: 'Premium Products', icon: '🛍️' },
    { number: '4.9★', label: 'Average Rating', icon: '⭐' },
  ]

  const features = [
    { icon: '⭐', title: 'Premium Quality', desc: 'Curated products from top brands worldwide.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Ships within 24 hours, delivered with care.' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% protected transactions with encryption.' },
    { icon: '💬', title: '24/7 Support', desc: 'Dedicated team ready to assist you anytime.' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* ===== SECTION 1: HERO (boxed premium card) ===== */}
      <section className="pt-10 md:pt-14 pb-16 px-4 md:px-8">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 shadow-2xl shadow-rose-300/40 dark:shadow-rose-950/40 py-16 md:py-24 px-6">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
          </div>

          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 shadow-lg shadow-white/10">
                ✨ About Us
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Premium Shopping,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Delivered with Care
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                We believe in quality, convenience, and customer delight.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: OUR STORY ===== */}
      <section className="py-20 bg-[#FFF5F7] dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-rose-500" />
                Our Story
                <span className="w-8 h-0.5 bg-rose-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                📖 The Journey
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-dark-bg rounded-3xl shadow-xl p-8 md:p-12 border border-rose-100 dark:border-rose-900/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-rose-500 to-orange-400" />

                <div className="space-y-4 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg">
                  <p>
                    We started with a simple idea: <span className="text-rose-600 dark:text-rose-400 font-medium">make premium products accessible to everyone.</span>
                  </p>
                  <p>
                    Our journey began when we realized that finding quality products online was becoming harder.
                    We decided to <span className="text-rose-600 dark:text-rose-400 font-medium">curate the best products</span> from around the world and
                    deliver them directly to our customers with care.
                  </p>
                  <p>
                    Today, we serve thousands of happy customers across the globe.
                    Our commitment to quality and customer satisfaction remains
                    at the heart of everything we do.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 3: MISSION ===== */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-rose-500" />
                Mission
                <span className="w-8 h-0.5 bg-rose-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                🎯 Our Mission
              </h2>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-semibold text-rose-600 dark:text-rose-400 italic mb-10">
                "To curate the best products and deliver them with care."
              </blockquote>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '✅', label: 'Quality First' },
                  { icon: '😊', label: 'Customer Delight' },
                  { icon: '🌱', label: 'Sustainability' },
                  { icon: '📈', label: 'Continuous Growth' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="bg-rose-50 dark:bg-rose-900/10 rounded-2xl p-4 shadow-sm border border-rose-100 dark:border-rose-900/20 transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <span className="text-sm font-medium text-dark-bg dark:text-white">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: WHY CHOOSE US ===== */}
      <section className="py-20 bg-[#FFF5F7] dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-rose-500" />
                Why Us
                <span className="w-8 h-0.5 bg-rose-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                ⭐ Why Choose Us
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                What makes us different from the rest
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl p-6 text-center text-white shadow-lg cursor-pointer transform-gpu transition-transform transition-shadow duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-2xl"
                >
                  <div className="text-4xl mb-3 transition-transform duration-300 ease-out group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 5: MEET THE TEAM ===== */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-rose-500" />
                Team
                <span className="w-8 h-0.5 bg-rose-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                👥 Meet the Team
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                The people behind our success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-surface rounded-3xl shadow-lg p-6 text-center border border-rose-100 dark:border-rose-900/20 transform-gpu transition-transform transition-shadow duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative inline-block">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-rose-500 shadow-lg mx-auto"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white dark:border-dark-surface flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-dark-bg dark:text-white mt-4">
                    {member.name}
                  </h3>
                  <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
                    {member.role}
                  </p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

{/* ===== SECTION 6: STATS (boxed premium card) ===== */}
<section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-dark-bg">
  <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 shadow-2xl shadow-rose-300/40 dark:shadow-rose-950/40 py-16 md:py-20 px-6">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl"
      />
    </div>

    <div className="relative container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="text-4xl md:text-5xl mb-2">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
            <div className="text-sm text-white/70 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>
      {/* ===== CTA (boxed premium card) ===== */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-dark-bg">
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 shadow-2xl shadow-rose-300/40 dark:shadow-rose-950/40 py-14 md:py-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Shop Premium?
            </h3>
            <p className="text-white/80 mt-2 mb-6">
              Explore our curated collection of premium products.
            </p>
            <Link to="/shop">
              <button className="px-8 py-3 bg-white text-rose-600 rounded-full font-semibold shadow-lg transition-transform transition-shadow duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95">
                Start Shopping →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage