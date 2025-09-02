
import { Planet as PlanetType } from '../types/game';
import { Sparkles } from 'lucide-react';

interface PlanetProps {
  planet: PlanetType;
  scale: number;
}

export const Planet: React.FC<PlanetProps> = ({ planet, scale }) => {
  const size = planet.radius * 2 * scale;
  const x = planet.x * scale - size / 2;
  const y = planet.y * scale - size / 2;
  
  return (
    <div
      className={`absolute rounded-full ${planet.color} shadow-2xl transition-all duration-300 flex items-center justify-center`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: planet.isGoal 
          ? '0 0 30px rgba(34, 197, 94, 0.5)' 
          : `0 0 ${planet.gravity * 15}px rgba(255, 255, 255, 0.2)`,
        animation: planet.isGoal ? 'pulse 2s infinite' : undefined,
      }}
    >
      {planet.isGoal && (
        <Sparkles className="text-white w-8 h-8 animate-pulse" />
      )}
      <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-br from-white to-transparent" />
      <span className="text-white text-xs font-bold absolute bottom-1 opacity-80">
        {planet.name}
      </span>
    </div>
  );
};