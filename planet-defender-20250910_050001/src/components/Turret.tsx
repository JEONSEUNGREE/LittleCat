import React from 'react';
import { Zap, Star } from 'lucide-react';
import { Turret as TurretType } from '../store/gameStore';
import useGameStore from '../store/gameStore';

interface TurretProps {
  turret: TurretType;
}

const Turret: React.FC<TurretProps> = ({ turret }) => {
  const { upgradeTurret, credits } = useGameStore();
  
  const handleUpgrade = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cost = 30 * turret.level;
    if (credits >= cost) {
      upgradeTurret(turret.id);
    }
  };
  
  return (
    <div
      className="absolute"
      style={{
        left: `${turret.x * 10}%`,
        top: `${turret.y * 10}%`,
        width: '10%',
        height: '10%',
      }}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-pointer group"
        onClick={handleUpgrade}
      >
        {/* Range indicator */}
        <div
          className="absolute rounded-full border border-neon-blue/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            width: `${turret.range * 200}%`,
            height: `${turret.range * 200}%`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Turret base */}
        <div className={`
          relative w-8 h-8 rounded-full turret-shadow
          ${turret.level === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-700' : ''}
          ${turret.level === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-700' : ''}
          ${turret.level >= 3 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' : ''}
          flex items-center justify-center
        `}>
          <Zap className="w-4 h-4 text-white" />
          
          {/* Level indicator */}
          {turret.level > 1 && (
            <div className="absolute -top-1 -right-1 flex">
              {Array.from({ length: Math.min(turret.level - 1, 3) }).map((_, i) => (
                <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          )}
        </div>
        
        {/* Upgrade cost tooltip */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/80 text-xs text-white px-1 py-0.5 rounded whitespace-nowrap">
            Upgrade: ${30 * turret.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Turret;