import React from 'react'
import { Heart, Music, Sparkles, Zap } from 'lucide-react'
import { usePetDJStore } from '../store/petStore'

const VirtualPet: React.FC = () => {
  const { pet, updateEnergy, gainExperience } = usePetDJStore()

  const getPetExpression = () => {
    switch (pet.mood) {
      case 'happy':
        return '◕‿◕'
      case 'excited':
        return '⊙▽⊙'
      case 'calm':
        return '˘‿˘'
      case 'dancing':
        return '♪(^∇^*)♪'
      default:
        return '•‿•'
    }
  }

  const getPetAnimation = () => {
    if (pet.isPlaying) {
      return 'animate-bounce'
    }
    if (pet.mood === 'excited') {
      return 'animate-wiggle'
    }
    return 'animate-pulse-slow'
  }

  const feedPet = () => {
    updateEnergy(20)
    gainExperience(5)
  }

  const playWithPet = () => {
    updateEnergy(-10)
    gainExperience(10)
  }

  return (
    <div className="glass-effect rounded-2xl p-6 mb-6">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-neon-purple neon-text mb-1">
            {pet.name}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-neon-blue">Level {pet.level}</span>
            <span className="text-gray-400">•</span>
            <span className="text-neon-green">{pet.mood}</span>
          </div>
        </div>

        <div className={`relative ${getPetAnimation()}`}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center shadow-lg animate-glow">
            <div className="text-4xl sm:text-5xl font-bold">
              {getPetExpression()}
            </div>
          </div>
          {pet.isPlaying && (
            <div className="absolute -top-2 -right-2">
              <Music className="w-6 h-6 text-yellow-400 animate-spin-slow" />
            </div>
          )}
        </div>

        <div className="w-full mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              Energy
            </span>
            <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                style={{ width: `${pet.energy}%` }}
              />
            </div>
            <span className="text-sm">{pet.energy}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Experience
            </span>
            <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500"
                style={{ width: `${pet.experience % 100}%` }}
              />
            </div>
            <span className="text-sm">{pet.experience} XP</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              BPM Sync
            </span>
            <span className="text-sm font-bold text-neon-blue">
              {pet.currentBPM} BPM
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={feedPet}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Feed
          </button>
          <button
            onClick={playWithPet}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default VirtualPet