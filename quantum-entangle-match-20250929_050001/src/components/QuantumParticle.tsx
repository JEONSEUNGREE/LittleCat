import React from 'react'
import { Atom, Zap } from 'lucide-react'
import { Particle } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'

interface QuantumParticleProps {
  particle: Particle
  isSelected: boolean
  disabled: boolean
}

const QuantumParticle: React.FC<QuantumParticleProps> = ({ particle, isSelected, disabled }) => {
  const selectParticle = useGameStore(state => state.selectParticle)

  const handleClick = () => {
    if (!disabled && particle.state !== 'matched') {
      selectParticle(particle.id)
    }
  }

  return (
    <div
      className={`
        quantum-particle absolute w-14 h-14 sm:w-16 sm:h-16 
        flex items-center justify-center
        ${particle.state === 'matched' ? 'entangled' : ''}
        ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}
        ${disabled || particle.state === 'matched' ? 'cursor-not-allowed' : 'hover:scale-110'}
      `}
      style={{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: particle.color,
        opacity: particle.state === 'matched' ? 0.7 : 1
      }}
      onClick={handleClick}
    >
      {particle.spin === 'up' ? (
        <Atom className="w-6 h-6 text-white/90" />
      ) : (
        <Zap className="w-6 h-6 text-white/90" />
      )}
      
      {/* Visual indicator for entanglement */}
      {particle.entangledWith && (
        <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white" />
      )}
    </div>
  )
}

export default QuantumParticle