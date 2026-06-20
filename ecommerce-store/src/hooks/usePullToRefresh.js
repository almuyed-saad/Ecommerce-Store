import { useState, useEffect } from 'react'

const usePullToRefresh = (onRefresh, threshold = 100) => {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY
        setStartY(touchStartY)
      }
    }

    const handleTouchMove = (e) => {
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY
        const diff = currentY - touchStartY
        
        if (diff > 0) {
          e.preventDefault()
          setPullDistance(diff)
          setIsPulling(true)
        }
      }
    }

    const handleTouchEnd = () => {
      if (isPulling && pullDistance > threshold) {
        onRefresh()
        setIsPulling(false)
        setPullDistance(0)
      } else {
        setIsPulling(false)
        setPullDistance(0)
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, pullDistance, threshold, onRefresh])

  return { isPulling, pullDistance }
}

export default usePullToRefresh