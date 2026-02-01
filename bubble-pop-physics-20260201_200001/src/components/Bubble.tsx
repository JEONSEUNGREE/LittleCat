import React from 'react'
import type { Bubble as BubbleType } from '../store/gameStore'

interface BubbleProps {
  bubble: BubbleType
  onClick: () => void
}

export const Bubble: React.FC<BubbleProps> = ({ bubble, onClick }) => {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!bubble.isPopping) {
      onClick()
    }
  }

  return (
    <div
      className={`absolute rounded-full cursor-pointer touch-manipulation select-none transition-transform
        ${bubble.isPopping ? 'animate-pop' : 'animate-float hover:scale-110'}
      `}
      style={{
        left: bubble.x,
        top: bubble.y,
        width: bubble.size,
        height: bubble.size,
        background: `radial-gradient(circle at 30% 30%, ${bubble.color}ee, ${bubble.color}88, ${bubble.color}44)`,
        boxShadow: `0 0 20px ${bubble.color}66, inset 0 0 20px rgba(255,255,255,0.3)`,
        transform: `translate(-50%, -50%)`,
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/* Shine effect */}
      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          height: '30%',
          top: '15%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0))',
        }}
      />
      {/* Secondary shine */}
      <div
        className="absolute rounded-full"
        style={{
          width: '15%',
          height: '15%',
          top: '50%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.5), rgba(255,255,255,0))',
        }}
      />
    </div>
  )
}
