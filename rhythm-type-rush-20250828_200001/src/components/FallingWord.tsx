import { useMemo } from 'react'

interface FallingWordProps {
  word: {
    id: number
    text: string
    position: number
    speed: number
  }
}

function FallingWord({ word }: FallingWordProps) {
  const color = useMemo(() => {
    const colors = [
      'text-rhythm-purple',
      'text-rhythm-pink', 
      'text-rhythm-blue',
      'text-rhythm-cyan',
      'text-yellow-400',
      'text-green-400'
    ]
    return colors[Math.floor(word.id) % colors.length]
  }, [word.id])
  
  const xPosition = useMemo(() => {
    return 10 + (Math.floor(word.id * 7) % 70)
  }, [word.id])
  
  const isNearBottom = word.position > 70
  
  return (
    <div
      className={`absolute font-bold text-2xl transition-all duration-100 ${color} ${
        isNearBottom ? 'animate-pulse text-red-500' : ''
      }`}
      style={{
        top: `${word.position}%`,
        left: `${xPosition}%`,
        transform: 'translateX(-50%)',
        textShadow: isNearBottom 
          ? '0 0 20px rgba(239, 68, 68, 0.8)' 
          : '0 0 10px currentColor'
      }}
    >
      {word.text}
    </div>
  )
}

export default FallingWord