
import { Atom, Zap, Circle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Particle } from '../types';

const ParticleGrid: React.FC = () => {
  const { particles, selectParticle, entangleParticles, collapseParticle } = useGameStore();
  
  const selectedParticles = particles.filter(p => p.isSelected);
  
  const handleParticleClick = (particle: Particle) => {
    if (selectedParticles.length === 1 && selectedParticles[0].id !== particle.id) {
      entangleParticles(selectedParticles[0].id, particle.id);
      selectParticle(selectedParticles[0].id);
      selectParticle(particle.id);
    } else if (particle.state === 'superposition' && !particle.isSelected) {
      collapseParticle(particle.id);
    } else {
      selectParticle(particle.id);
    }
  };
  
  const getParticleIcon = (state: Particle['state']) => {
    switch (state) {
      case 'up':
        return <Atom className="w-6 h-6" />;
      case 'down':
        return <Circle className="w-6 h-6" />;
      case 'superposition':
        return <Zap className="w-6 h-6 animate-quantum-pulse" />;
    }
  };
  
  const gridSize = Math.max(...particles.map(p => Math.max(p.x, p.y))) + 1 || 4;
  
  return (
    <div className="p-4 bg-black/20 rounded-2xl backdrop-blur-md">
      <div 
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          aspectRatio: '1',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const particle = particles.find(p => p.x === x && p.y === y);
          
          if (!particle) {
            return (
              <div
                key={`empty-${x}-${y}`}
                className="aspect-square bg-white/5 rounded-lg"
              />
            );
          }
          
          return (
            <button
              key={particle.id}
              onClick={() => handleParticleClick(particle)}
              className={`
                aspect-square rounded-lg flex items-center justify-center
                transition-all duration-300 transform hover:scale-105
                ${particle.isSelected ? 'ring-4 ring-white animate-entangle' : ''}
                ${particle.entangledWith ? 'quantum-glow' : ''}
                ${particle.state === 'superposition' ? 'animate-particle-float' : ''}
              `}
              style={{ backgroundColor: particle.color }}
            >
              <span className="text-white">
                {getParticleIcon(particle.state)}
              </span>
            </button>
          );
        })}
      </div>
      
      {particles.some(p => p.entangledWith) && (
        <svg className="absolute inset-0 pointer-events-none">
          {particles.filter(p => p.entangledWith).map(particle => {
            const entangled = particles.find(p => p.id === particle.entangledWith);
            if (!entangled || particle.x > entangled.x) return null;
            
            const cellSize = 100 / gridSize;
            const x1 = (particle.x + 0.5) * cellSize;
            const y1 = (particle.y + 0.5) * cellSize;
            const x2 = (entangled.x + 0.5) * cellSize;
            const y2 = (entangled.y + 0.5) * cellSize;
            
            return (
              <line
                key={`line-${particle.id}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default ParticleGrid;