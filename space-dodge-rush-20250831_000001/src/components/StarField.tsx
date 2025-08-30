import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([])
  
  useEffect(() => {
    // Generate initial stars
    const initialStars: Star[] = []
    for (let i = 0; i < 50; i++) {
      initialStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 5 + 2
      })
    }
    setStars(initialStars)
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.speed}s`
          }}
        />
      ))}
    </div>
  )
}