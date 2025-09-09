import React from 'react'
import { Dna, Beef, Battery, TrendingUp, Clock, Award } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const ResourcePanel: React.FC = () => {
  const { resources, stats } = useGameStore()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-game-primary rounded-xl p-4 space-y-4">
      <h2 className="text-white font-bold text-lg text-center">Resources</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-pixel-purple rounded-lg">
              <Dna size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">DNA</p>
              <p className="text-white font-bold">{resources.dna}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-pixel-green rounded-lg">
              <Beef size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Food</p>
              <p className="text-white font-bold">{resources.food}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-pixel-yellow rounded-lg">
              <Battery size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Energy</p>
              <p className="text-white font-bold">{resources.energy.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-white font-bold text-sm mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp size={14} />
            <span>Clicks: {stats.totalClicks}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Award size={14} />
            <span>Evolutions: {stats.totalEvolutions}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock size={14} />
            <span>Time: {formatTime(stats.playTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Award size={14} />
            <span>Max Lv: {stats.maxLevel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcePanel