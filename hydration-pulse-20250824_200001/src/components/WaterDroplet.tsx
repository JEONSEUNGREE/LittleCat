import React from 'react'
import { Droplet } from 'lucide-react'

interface WaterDropletProps {
  size?: number
  filled?: boolean
  animated?: boolean
}

const WaterDroplet: React.FC<WaterDropletProps> = ({ 
  size = 100, 
  filled = false,
  animated = true 
}) => {
  const fillPercentage = filled ? 100 : 0
  
  return (
    <div className={`relative ${animated ? 'animate-water-drop' : ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>
          <clipPath id="droplet-clip">
            <path d="M50 10 C30 30, 20 50, 20 65 C20 82, 32 95, 50 95 C68 95, 80 82, 80 65 C80 50, 70 30, 50 10 Z" />
          </clipPath>
          <linearGradient id="water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        <path
          d="M50 10 C30 30, 20 50, 20 65 C20 82, 32 95, 50 95 C68 95, 80 82, 80 65 C80 50, 70 30, 50 10 Z"
          fill="none"
          stroke="#1e40af"
          strokeWidth="2"
        />
        
        <rect
          x="20"
          y={95 - (75 * fillPercentage / 100)}
          width="60"
          height={75 * fillPercentage / 100}
          fill="url(#water-gradient)"
          clipPath="url(#droplet-clip)"
          className="transition-all duration-500"
        />
        
        {filled && (
          <circle
            cx="40"
            cy="60"
            r="8"
            fill="white"
            opacity="0.3"
            className="animate-float"
          />
        )}
      </svg>
    </div>
  )
}

export default WaterDroplet