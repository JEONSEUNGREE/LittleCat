import { useEffect, useState } from 'react'
import { Mood } from '../store/useMoodStore'

interface MoodRippleDisplayProps {
  mood: Mood | null
}

export default function MoodRippleDisplay({ mood }: MoodRippleDisplayProps) {
  const [ripples, setRipples] = useState<number[]>([])
  
  useEffect(() => {
    if (!mood) return
    
    const interval = setInterval(() => {
      setRipples(prev => [...prev, Date.now()])
      setTimeout(() => {
        setRipples(prev => prev.slice(1))
      }, 2000)
    }, 1500)
    
    return () => clearInterval(interval)
  }, [mood])
  
  if (!mood) return null
  
  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl mood-bubble"
          style={{
            backgroundColor: mood.color,
            boxShadow: `0 0 60px ${mood.color}80`
          }}
        >
          <span className="text-6xl">{mood.emoji}</span>
        </div>
        
        {ripples.map((id) => (
          <div
            key={id}
            className="absolute inset-0 rounded-full animate-ripple pointer-events-none"
            style={{
              backgroundColor: mood.color,
              opacity: 0.3
            }}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{mood.label}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-white/60">감정 강도:</span>
          <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${mood.intensity * 100}%`,
                backgroundColor: mood.color
              }}
            />
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-white/60 text-sm">
        당신의 감정이 파동처럼 퍼져나가고 있어요
      </p>
    </div>
  )
}