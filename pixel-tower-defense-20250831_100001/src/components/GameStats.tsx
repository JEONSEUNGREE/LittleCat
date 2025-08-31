import { Heart, Coins, Trophy, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameStats = () => {
  const { lives, gold, score, wave } = useGameStore()
  
  const stats = [
    {
      icon: Heart,
      value: lives,
      label: '생명',
      color: 'text-red-500',
      bgColor: 'bg-red-900/30'
    },
    {
      icon: Coins,
      value: gold,
      label: '골드',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-900/30'
    },
    {
      icon: Trophy,
      value: score,
      label: '점수',
      color: 'text-purple-500',
      bgColor: 'bg-purple-900/30'
    },
    {
      icon: Zap,
      value: wave,
      label: '웨이브',
      color: 'text-blue-500',
      bgColor: 'bg-blue-900/30'
    }
  ]
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-lg p-2 sm:p-3 border border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              <span className="text-white font-bold text-sm sm:text-lg">
                {stat.value}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}

export default GameStats