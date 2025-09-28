import React from 'react'
import { useFortuneStore } from '../store/useFortuneStore'

export const FortuneCookie: React.FC = () => {
  const { isAnimating, isCracked, crackCookie, generateFortune, currentFortune } = useFortuneStore()
  
  const handleCookieClick = () => {
    if (!isCracked && !isAnimating) {
      generateFortune()
      crackCookie()
    }
  }
  
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div 
        className={`
          cookie-3d cookie-shadow cursor-pointer transition-all duration-300
          ${isAnimating ? 'animate-shake' : ''}
          ${isCracked ? 'opacity-50 pointer-events-none' : 'hover:scale-105'}
        `}
        onClick={handleCookieClick}
      >
        <svg 
          viewBox="0 0 200 150" 
          className={`w-full h-auto ${isCracked ? 'animate-crack' : ''}`}
        >
          {/* Main cookie body */}
          <ellipse 
            cx="100" 
            cy="75" 
            rx="90" 
            ry="65" 
            fill="#D4AF37"
            className="transition-all duration-300"
          />
          
          {/* Cookie shading */}
          <ellipse 
            cx="100" 
            cy="75" 
            rx="85" 
            ry="60" 
            fill="#C19A2B"
            opacity="0.3"
          />
          
          {/* Cookie texture lines */}
          <path 
            d="M 30 75 Q 100 50 170 75" 
            stroke="#8B7355" 
            strokeWidth="2" 
            fill="none"
            opacity="0.4"
          />
          <path 
            d="M 30 75 Q 100 100 170 75" 
            stroke="#8B7355" 
            strokeWidth="2" 
            fill="none"
            opacity="0.4"
          />
          
          {/* Crack lines (visible when cracked) */}
          {isCracked && (
            <>
              <path 
                d="M 50 75 L 100 75 L 150 75" 
                stroke="#5C4033" 
                strokeWidth="3" 
                fill="none"
                className="animate-pulse"
              />
              <path 
                d="M 100 40 L 100 75 L 100 110" 
                stroke="#5C4033" 
                strokeWidth="2" 
                fill="none"
                className="animate-pulse"
              />
            </>
          )}
          
          {/* Highlight */}
          <ellipse 
            cx="80" 
            cy="55" 
            rx="20" 
            ry="15" 
            fill="white"
            opacity="0.2"
          />
        </svg>
      </div>
      
      {/* Instruction text */}
      {!isCracked && !currentFortune && (
        <p className="text-center mt-6 text-fortune-dark text-lg font-medium animate-pulse">
          Tap the cookie to reveal your fortune
        </p>
      )}
    </div>
  )
}