import React from 'react'
import { Music, Drum, Piano, Guitar, Wind, Cpu } from 'lucide-react'
import { SoundType } from '../store/gameStore'

interface SoundTileProps {
  sound: SoundType
  frequency: number
  isActive: boolean
  onClick: () => void
  disabled: boolean
  size?: 'small' | 'medium' | 'large'
}

const soundIcons: Record<SoundType, React.ElementType> = {
  bell: Music,
  drum: Drum,
  piano: Piano,
  guitar: Guitar,
  flute: Wind,
  synth: Cpu
}

const soundColors: Record<SoundType, string> = {
  bell: 'from-yellow-400 to-yellow-600',
  drum: 'from-red-400 to-red-600',
  piano: 'from-blue-400 to-blue-600',
  guitar: 'from-green-400 to-green-600',
  flute: 'from-purple-400 to-purple-600',
  synth: 'from-pink-400 to-pink-600'
}

const SoundTile: React.FC<SoundTileProps> = ({ 
  sound, 
  frequency, 
  isActive, 
  onClick, 
  disabled,
  size = 'medium' 
}) => {
  const Icon = soundIcons[sound]
  const colorClass = soundColors[sound]
  
  const sizeClasses = {
    small: 'w-16 h-16 p-2',
    medium: 'w-20 h-20 p-3',
    large: 'w-24 h-24 p-4'
  }
  
  const iconSizes = {
    small: 20,
    medium: 24,
    large: 32
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        relative rounded-xl bg-gradient-to-br ${colorClass}
        ${isActive ? 'scale-110 ring-4 ring-white ring-opacity-50' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        transition-all duration-200 shadow-lg no-tap-highlight
        flex items-center justify-center
      `}
    >
      <Icon size={iconSizes[size]} className="text-white" />
      <span className="absolute -bottom-5 text-xs text-gray-400">
        {Math.round(frequency)}Hz
      </span>
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-white opacity-30 animate-pulse" />
      )}
    </button>
  )
}

export default SoundTile