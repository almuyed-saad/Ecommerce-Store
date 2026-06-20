import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()
      
      if (difference <= 0) {
        setIsExpired(true)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // Format time with leading zeros
  const formatTime = (value) => {
    return String(value).padStart(2, '0')
  }

  if (isExpired) {
    return (
      <div className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-bold animate-pulse">
        🎉 Sale Has Ended! Check back soon!
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Days */}
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 min-w-[45px] md:min-w-[70px] countdown-box">
          <motion.span
            key={timeLeft.days}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl md:text-3xl font-bold text-white"
          >
            {formatTime(timeLeft.days)}
          </motion.span>
        </div>
        <span className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mt-1 block">
          Days
        </span>
      </div>

      <span className="text-white text-2xl md:text-4xl font-bold animate-pulse">:</span>

      {/* Hours */}
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 min-w-[45px] md:min-w-[70px]">
          <motion.span
            key={timeLeft.hours}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl md:text-3xl font-bold text-white"
          >
            {formatTime(timeLeft.hours)}
          </motion.span>
        </div>
        <span className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mt-1 block">
          Hours
        </span>
      </div>

      <span className="text-white text-2xl md:text-4xl font-bold animate-pulse">:</span>

      {/* Minutes */}
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 min-w-[45px] md:min-w-[70px]">
          <motion.span
            key={timeLeft.minutes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl md:text-3xl font-bold text-white"
          >
            {formatTime(timeLeft.minutes)}
          </motion.span>
        </div>
        <span className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mt-1 block">
          Minutes
        </span>
      </div>

      <span className="text-white text-2xl md:text-4xl font-bold animate-pulse">:</span>

      {/* Seconds */}
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 min-w-[45px] md:min-w-[70px]">
          <motion.span
            key={timeLeft.seconds}
            initial={{ scale: 1.2, color: '#fff' }}
            animate={{ scale: 1, color: '#fff' }}
            transition={{ duration: 0.3 }}
            className="text-xl md:text-3xl font-bold text-white"
          >
            {formatTime(timeLeft.seconds)}
          </motion.span>
        </div>
        <span className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider mt-1 block">
          Seconds
        </span>
      </div>
    </div>
  )
}

export default CountdownTimer