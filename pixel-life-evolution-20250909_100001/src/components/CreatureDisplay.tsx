import React from 'react'
import { Creature } from '../store/gameStore'
import { Heart, Zap, Brain, Dumbbell } from 'lucide-react'

interface CreatureDisplayProps {
  creature: Creature
  onSelect: () => void
  isSelected: boolean
}

const CreatureDisplay: React.FC<CreatureDisplayProps> = ({ creature, onSelect, isSelected }) => {
  return (
    <div
      onClick={onSelect}
      className={`relative bg-game-primary rounded-xl p-4 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-pixel-green evolution-glow' : 'hover:ring-2 hover:ring-pixel-blue'
      }`}
    >
      <div className="flex flex-col items-center space-y-3">
        <h3 className="text-white font-bold text-sm sm:text-base">{creature.name}</h3>
        
        <div className="relative">
          <div className="pixel-creature bg-gray-800 rounded-lg p-4 min-h-[100px] min-w-[100px] flex items-center justify-center">
            <div 
              className="pixel-art grid"
              style={{
                gridTemplateColumns: `repeat(${creature.pixels.length}, 4px)`,
                gap: '1px'
              }}
            >
              {creature.pixels.map((row, i) => 
                row.map((pixel, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="w-1 h-1"
                    style={{ backgroundColor: pixel }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-pixel-yellow text-black text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
            Lv.{creature.level}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full text-xs">
          <div className="flex items-center space-x-1 text-pixel-green">
            <Heart size={12} />
            <span>{creature.experience} XP</span>
          </div>
          <div className="flex items-center space-x-1 text-pixel-blue">
            <Zap size={12} />
            <span>{creature.speed.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1 text-pixel-purple">
            <Brain size={12} />
            <span>{creature.intelligence.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1 text-pixel-red">
            <Dumbbell size={12} />
            <span>{creature.strength.toFixed(1)}</span>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pixel-green to-pixel-blue h-full rounded-full transition-all duration-500"
            style={{ width: `${(creature.evolution / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default CreatureDisplay