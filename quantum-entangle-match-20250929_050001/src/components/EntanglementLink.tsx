import React from 'react'
import { Particle } from '../store/gameStore'

interface EntanglementLinkProps {
  particle1: Particle
  particle2: Particle
}

const EntanglementLink: React.FC<EntanglementLinkProps> = ({ particle1, particle2 }) => {
  const dx = particle2.x - particle1.x
  const dy = particle2.y - particle1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return (
    <div
      className="quantum-link"
      style={{
        left: `${particle1.x}px`,
        top: `${particle1.y}px`,
        width: `${distance}px`,
        height: '2px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%'
      }}
    />
  )
}

export default EntanglementLink