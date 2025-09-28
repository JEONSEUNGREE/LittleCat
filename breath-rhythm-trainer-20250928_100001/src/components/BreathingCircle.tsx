import React, { useEffect, useState } from 'react'
import { useBreathStore } from '../store/breathStore'

const BreathingCircle: React.FC = () => {
  const { isActive, currentPhase, pattern, customPattern } = useBreathStore()
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(0.7)

  const getPatternTimings = () => {
    const patterns = {
      '4-4-4': { inhale: 4, hold: 4, exhale: 4 },
      '4-7-8': { inhale: 4, hold: 7, exhale: 8 },
      '5-5-5': { inhale: 5, hold: 5, exhale: 5 },
      'custom': customPattern
    }
    return patterns[pattern]
  }

  useEffect(() => {
    if (!isActive) {
      setScale(1)
      setOpacity(0.7)
      return
    }

    const updateAnimation = () => {
      switch (currentPhase) {
        case 'inhale':
          setScale(1.5)
          setOpacity(1)
          break
        case 'hold':
          setScale(1.5)
          setOpacity(0.9)
          break
        case 'exhale':
          setScale(0.8)
          setOpacity(0.6)
          break
        case 'pause':
          setScale(0.8)
          setOpacity(0.5)
          break
      }
    }

    updateAnimation()
  }, [isActive, currentPhase])

  const phaseTexts = {
    'inhale': '들이마시기',
    'hold': '멈추기',
    'exhale': '내쉬기',
    'pause': '쉬기'
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="relative">
        <div
          className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full transition-all duration-1000 ease-in-out"
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            background: currentPhase === 'inhale' || currentPhase === 'hold' 
              ? 'radial-gradient(circle, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.6) 100%)',
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                {phaseTexts[currentPhase]}
              </p>
              {isActive && (
                <p className="text-white/80 text-lg">
                  {getPatternTimings()[currentPhase === 'pause' ? 'exhale' : currentPhase === 'hold' ? 'hold' : currentPhase]}초
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Outer ring animation */}
        <div
          className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"
          style={{
            transform: `scale(${scale * 1.2})`,
            opacity: opacity * 0.5,
          }}
        />
      </div>

      {/* Phase indicator dots */}
      <div className="flex gap-2 mt-8">
        {(['inhale', 'hold', 'exhale', 'pause'] as const).map((phase) => (
          <div
            key={phase}
            className={`w-3 h-3 rounded-full transition-all ${
              currentPhase === phase
                ? 'bg-white scale-125'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}