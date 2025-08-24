import React from 'react'
import { useBreathStore, BreathingPattern } from '../store/breathStore'
import { Wind, Heart, Brain, Square } from 'lucide-react'

interface PatternOption {
  id: BreathingPattern
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const patterns: PatternOption[] = [
  {
    id: '4-4-4',
    name: '기본 호흡',
    description: '4초 들이쉬고, 4초 멈추고, 4초 내쉬기',
    icon: <Wind className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: '4-7-8',
    name: '수면 호흡',
    description: '4초 들이쉬고, 7초 멈추고, 8초 내쉬기',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: '5-5-5',
    name: '균형 호흡',
    description: '5초 들이쉬고, 5초 멈추고, 5초 내쉬기',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'box',
    name: '박스 호흡',
    description: '4초씩 들이쉬고, 멈추고, 내쉬고, 쉬기',
    icon: <Square className="w-6 h-6" />,
    color: 'from-orange-400 to-orange-600'
  }
]

export const PatternSelector: React.FC = () => {
  const { pattern, setPattern, isBreathing } = useBreathStore()

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-white mb-4 text-center">호흡 패턴 선택</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => !isBreathing && setPattern(p.id)}
            disabled={isBreathing}
            className={`
              relative p-4 rounded-xl transition-all duration-300
              ${pattern === p.id 
                ? 'bg-white/30 scale-105 shadow-xl' 
                : 'bg-white/10 hover:bg-white/20'
              }
              ${isBreathing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              backdrop-blur-md border border-white/20
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${p.color} text-white`}>
                {p.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="text-xs text-white/80 mt-1">{p.description}</p>
              </div>
            </div>
            {pattern === p.id && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}