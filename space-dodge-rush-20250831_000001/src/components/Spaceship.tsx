import { Rocket } from 'lucide-react'
import { useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore'

export default function Spaceship() {
  const { shipPosition, updateShipPosition, isPlaying, isPaused } = useGameStore()
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!isPlaying || isPaused) return
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const x = ((touch.clientX - rect.left) / rect.width) * 100
      const y = ((touch.clientY - rect.top) / rect.height) * 100
      
      // Limit ship movement to bottom half of screen
      const clampedX = Math.max(5, Math.min(95, x))
      const clampedY = Math.max(50, Math.min(90, y))
      
      updateShipPosition(clampedX, clampedY)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      const clampedX = Math.max(5, Math.min(95, x))
      const clampedY = Math.max(50, Math.min(90, y))
      
      updateShipPosition(clampedX, clampedY)
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 3
      let newX = shipPosition.x
      let newY = shipPosition.y
      
      switch(e.key) {
        case 'ArrowLeft':
          newX = Math.max(5, shipPosition.x - speed)
          break
        case 'ArrowRight':
          newX = Math.min(95, shipPosition.x + speed)
          break
        case 'ArrowUp':
          newY = Math.max(50, shipPosition.y - speed)
          break
        case 'ArrowDown':
          newY = Math.min(90, shipPosition.y + speed)
          break
      }
      
      updateShipPosition(newX, newY)
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('keydown', handleKeyDown)
    }
    
    return () => {
      if (container) {
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shipPosition, updateShipPosition, isPlaying, isPaused])
  
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-auto">
      <div
        className="absolute spaceship transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${shipPosition.x}%`,
          top: `${shipPosition.y}%`,
        }}
      >
        <Rocket 
          size={40} 
          className="text-neon-cyan neon-glow transform rotate-180"
        />
      </div>
    </div>
  )
}