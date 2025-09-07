import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { Rocket, Target } from 'lucide-react'

export default function GameCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [aimAngle, setAimAngle] = useState(-Math.PI / 2)
  const [aimPower, setAimPower] = useState(50)
  const [isAiming, setIsAiming] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  
  const {
    player,
    planets,
    isPlaying,
    isPaused,
    launchPlayer,
    updatePlayerPosition
  } = useGameStore()
  
  useEffect(() => {
    if (!isPlaying || isPaused) return
    
    const interval = setInterval(() => {
      updatePlayerPosition()
    }, 1000 / 60) // 60 FPS
    
    return () => clearInterval(interval)
  }, [isPlaying, isPaused, updatePlayerPosition])
  
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (player.isLaunched) return
    
    const touch = 'touches' in e ? e.touches[0] : e
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setIsAiming(true)
  }
  
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isAiming || !touchStart) return
    
    const touch = 'touches' in e ? e.touches[0] : e
    const dx = touch.clientX - player.x
    const dy = touch.clientY - player.y
    
    const angle = Math.atan2(dy, dx)
    const distance = Math.sqrt(dx * dx + dy * dy)
    const power = Math.min(100, Math.max(10, distance / 2))
    
    setAimAngle(angle)
    setAimPower(power)
  }
  
  const handleTouchEnd = () => {
    if (!isAiming || player.isLaunched) return
    
    launchPlayer(aimAngle, aimPower)
    setIsAiming(false)
    setTouchStart(null)
  }
  
  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Planets */}
      {planets.map((planet) => (
        <div key={planet.id} className="absolute">
          {/* Gravity field */}
          <div
            className="absolute rounded-full opacity-20 animate-pulse-slow"
            style={{
              left: planet.x - planet.gravityRadius,
              top: planet.y - planet.gravityRadius,
              width: planet.gravityRadius * 2,
              height: planet.gravityRadius * 2,
              background: `radial-gradient(circle, ${planet.color}40 0%, transparent 70%)`
            }}
          />
          
          {/* Planet */}
          <div
            className={`absolute rounded-full shadow-2xl transition-all ${
              planet.isActive ? 'ring-4 ring-white ring-opacity-50' : ''
            }`}
            style={{
              left: planet.x - planet.radius,
              top: planet.y - planet.radius,
              width: planet.radius * 2,
              height: planet.radius * 2,
              background: `radial-gradient(circle at 30% 30%, ${planet.color}ee, ${planet.color}99)`,
              boxShadow: `0 0 20px ${planet.color}66, inset -5px -5px 10px rgba(0,0,0,0.3)`
            }}
          >
            {planet.isActive && (
              <Target className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-50" 
                      size={planet.radius} />
            )}
          </div>
        </div>
      ))}
      
      {/* Player trail */}
      {player.trail.length > 1 && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <path
            d={`M ${player.trail.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            className="trajectory"
          />
        </svg>
      )}
      
      {/* Player */}
      <div
        className={`absolute transition-transform ${player.isLaunched ? 'animate-shoot' : ''}`}
        style={{
          left: player.x - 12,
          top: player.y - 12,
          transform: `rotate(${player.angle + Math.PI / 2}rad)`,
          zIndex: 10
        }}
      >
        <Rocket className="text-white" size={24} />
      </div>
      
      {/* Aim indicator */}
      {isAiming && !player.isLaunched && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
          <line
            x1={player.x}
            y1={player.y}
            x2={player.x + Math.cos(aimAngle) * aimPower * 2}
            y2={player.y + Math.sin(aimAngle) * aimPower * 2}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <circle
            cx={player.x + Math.cos(aimAngle) * aimPower * 2}
            cy={player.y + Math.sin(aimAngle) * aimPower * 2}
            r="5"
            fill="white"
            opacity="0.8"
          />
        </svg>
      )}
    </div>
  )
}