import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import QuantumParticle from './QuantumParticle'
import EntanglementLink from './EntanglementLink'

const GameBoard: React.FC = () => {
  const { particles, initializeLevel, selectedParticle, gameStatus } = useGameStore()

  useEffect(() => {
    initializeLevel(1)
  }, [])

  return (
    <div className="game-board w-full max-w-md mx-auto aspect-square relative">
      {/* Render entanglement links */}
      {particles.map((particle) => (
        particle.entangledWith && (
          <EntanglementLink
            key={`link-${particle.id}`}
            particle1={particle}
            particle2={particles.find(p => p.id === particle.entangledWith)!}
          />
        )
      ))}
      
      {/* Render particles */}
      {particles.map((particle) => (
        <QuantumParticle
          key={particle.id}
          particle={particle}
          isSelected={selectedParticle === particle.id}
          disabled={gameStatus !== 'playing'}
        />
      ))}
      
      {/* Win overlay */}
      {gameStatus === 'won' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 animate-quantum-pulse">
              양자 얽힘 성공!
            </h2>
            <p className="text-xl mb-6">레벨 완료!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard