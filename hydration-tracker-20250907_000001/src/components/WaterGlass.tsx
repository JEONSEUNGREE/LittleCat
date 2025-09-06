import React from 'react'
import { Droplets } from 'lucide-react'

interface WaterGlassProps {
  percentage: number
  size?: 'small' | 'medium' | 'large'
}

const WaterGlass: React.FC<WaterGlassProps> = ({ percentage, size = 'medium' }) => {
  const dimensions = {
    small: { width: 100, height: 120 },
    medium: { width: 150, height: 180 },
    large: { width: 200, height: 240 }
  }
  
  const { width, height } = dimensions[size]
  const fillHeight = (percentage / 100) * height * 0.85
  
  return (
    <div className="relative inline-block">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
          <pattern id="bubbles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2" fill="#ffffff" opacity="0.3" />
            <circle cx="25" cy="15" r="1.5" fill="#ffffff" opacity="0.2" />
            <circle cx="15" cy="30" r="2.5" fill="#ffffff" opacity="0.25" />
          </pattern>
        </defs>
        
        <path
          d={`M ${width * 0.2} ${height * 0.1} 
              L ${width * 0.15} ${height * 0.85} 
              Q ${width * 0.15} ${height * 0.9} ${width * 0.2} ${height * 0.9}
              L ${width * 0.8} ${height * 0.9}
              Q ${width * 0.85} ${height * 0.9} ${width * 0.85} ${height * 0.85}
              L ${width * 0.8} ${height * 0.1}
              Z`}
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        <clipPath id="glassClip">
          <path
            d={`M ${width * 0.2} ${height * 0.1} 
                L ${width * 0.15} ${height * 0.85} 
                Q ${width * 0.15} ${height * 0.9} ${width * 0.2} ${height * 0.9}
                L ${width * 0.8} ${height * 0.9}
                Q ${width * 0.85} ${height * 0.9} ${width * 0.85} ${height * 0.85}
                L ${width * 0.8} ${height * 0.1}
                Z`}
          />
        </clipPath>
        
        <g clipPath="url(#glassClip)">
          <rect
            x={width * 0.15}
            y={height * 0.9 - fillHeight}
            width={width * 0.7}
            height={fillHeight}
            fill="url(#waterGradient)"
            className="transition-all duration-700 ease-in-out"
          >
            <animate
              attributeName="y"
              values={`${height * 0.9 - fillHeight};${height * 0.9 - fillHeight - 5};${height * 0.9 - fillHeight}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          
          <rect
            x={width * 0.15}
            y={height * 0.9 - fillHeight}
            width={width * 0.7}
            height={fillHeight}
            fill="url(#bubbles)"
            opacity="0.5"
          />
        </g>
      </svg>
      
      <div className="absolute bottom-0 left-0 right-0 text-center pb-2">
        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
      </div>
      
      {percentage >= 100 && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <div className="bg-green-500 text-white rounded-full p-2">
            <Droplets className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  )
}

export default WaterGlass