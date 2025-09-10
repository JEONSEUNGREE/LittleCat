
import { Rocket, Skull } from 'lucide-react';
import { Enemy as EnemyType } from '../store/gameStore';

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const healthPercentage = (enemy.health / enemy.maxHealth) * 100;
  
  return (
    <div
      className="absolute pointer-events-none transition-all duration-100"
      style={{
        left: `${enemy.x * 10}%`,
        top: `${enemy.y * 10}%`,
        width: '10%',
        height: '10%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Health bar */}
        <div className="absolute -top-2 w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-200"
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
        
        {/* Enemy icon */}
        {enemy.type === 'asteroid' ? (
          <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full enemy-shadow animate-spin-slow" />
        ) : enemy.type === 'alien' ? (
          <Rocket className="w-6 h-6 text-purple-500 enemy-shadow animate-bounce-slow" />
        ) : (
          <Skull className="w-8 h-8 text-red-600 enemy-shadow animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Enemy;