import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending
    setTimeout(() => {
      toast.success('✅ Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Orders are processed within 24 hours and delivered within 3-5 business days nationwide. You\'ll receive a tracking link via email once your order ships.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy. If you\'re not satisfied with your purchase, simply contact us and we\'ll arrange a return or exchange.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship worldwide. International delivery typically takes 7-14 business days depending on your location. Shipping costs are calculated at checkout.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order status in your account dashboard.'
    }
  ]

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  const contactDetails = [
    {
      icon: '📧',
      title: 'Email Us',
      detail: 'contact.almuyedsaad@gmail.com',
      link: 'mailto:contact.almuyedsaad@gmail.com',
      action: 'Send Email'
    },
    {
      icon: '📞',
      title: 'Call Us',
      detail: '01612075236',
      link: 'tel:+8801612075236',
      action: 'Call Now'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      detail: 'SUST, Sylhet, Bangladesh',
      link: 'https://maps.google.com',
      action: 'Get Directions'
    }
  ]

const socialLinks = [
  { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/almuyed-saad' },
  { icon: <FaFacebook />, label: 'Facebook', url: 'https://www.facebook.com/almuyed.saad' },
  { icon: <FaInstagram />, label: 'Instagram', url: '#' },
  { icon: <FaLinkedin />, label: 'LinkedIn', url: '#' },
]

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* ===== SECTION 1: HERO (Boxed Premium Card) ===== */}
      <section className="pt-10 md:pt-14 pb-16 px-4 md:px-8">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 shadow-2xl shadow-teal-300/40 dark:shadow-teal-950/40 py-16 md:py-24 px-6">
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
                📞 Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                We'd Love to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Hear From You!
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Have questions, feedback, or need help? Reach out to us and we'll get back to you soon.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: CONTACT DETAILS ===== */}
      <section className="py-12 md:py-16 bg-[#F0FDF9] dark:bg-dark-surface">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactDetails.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-dark-bg rounded-2xl p-6 text-center shadow-lg border border-teal-100 dark:border-teal-900/20 transform-gpu transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-700"
              >
                <div className="relative inline-block mb-3">
                  <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-dark-bg dark:text-white">{item.title}</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{item.detail}</p>
                <span className="inline-block mt-3 text-sm font-medium text-teal-600 dark:text-teal-400 opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.action} →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CONTACT FORM (Boxed Card) ===== */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-dark-bg">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 shadow-2xl shadow-teal-300/40 dark:shadow-teal-950/40 p-0.5">
          <div className="bg-white dark:bg-dark-bg rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                  <span className="w-8 h-0.5 bg-teal-500" />
                  Get in Touch
                  <span className="w-8 h-0.5 bg-teal-500" />
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                  ✉️ Send Us a Message
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                  We'll respond within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg dark:text-white mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-card text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg dark:text-white mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-card text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg dark:text-white mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Product Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-card text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg dark:text-white mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-card text-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    '✉️ Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: FAQ ===== */}
      <section className="py-16 md:py-20 bg-[#F0FDF9] dark:bg-dark-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-teal-500" />
                FAQ
                <span className="w-8 h-0.5 bg-teal-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-bg dark:text-white mt-2">
                ❓ Frequently Asked Questions
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                Find answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-bg rounded-2xl shadow-md border border-teal-100 dark:border-teal-900/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors duration-200"
                  >
                    <span className="font-medium text-dark-bg dark:text-white">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-teal-500 text-xl flex-shrink-0 ml-4"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeFAQ === index ? 'auto' : 0,
                      opacity: activeFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 5: SOCIAL LINKS (Boxed Premium Card) ===== */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-dark-bg">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 shadow-2xl shadow-teal-300/40 dark:shadow-teal-950/40 py-14 md:py-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4">
              Connect With Us
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              🔗 Follow Us
            </h3>
<div className="flex flex-wrap justify-center gap-4">
  {socialLinks.map((social, index) => (
    <motion.a
      key={index}
      href={social.url}
      target={social.url !== '#' ? '_blank' : '_self'}
      rel={social.url !== '#' ? 'noopener noreferrer' : ''}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl text-white transform-gpu transition-all duration-200 ease-out hover:scale-110 hover:bg-white/30 active:scale-95"
    >
      {social.icon}
    </motion.a>
  ))}
</div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage