import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Ripple = ({ children, className = '', rippleColor = 'rgba(255,255,255,0.3)', onClick, ...props }) => {
  const [ripples, setRipples] = useState([])
  const containerRef = useRef(null)

  const handleClick = (e) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const id = Date.now()
    setRipples(prev => [...prev, { id, x, y, size }])

    if (onClick) onClick(e)
  }

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [ripples])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: rippleColor,
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Ripple