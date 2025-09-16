
import { useGameStore } from '../store/gameStore';
import { Heart, Zap, Trophy, Shield } from 'lucide-react';

export const GameStats: React.FC = () => {
  const { health, energy, wave, score } = useGameStore();
  
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-space-dark bg-opacity-80 rounded-lg">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
        <Heart className="text-red-500" size={20} />
        <div className="text-white">
          <span className="font-bold text-lg">{health}</span>
          <span className="text-xs text-gray-400 ml-1">HP</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
        <Zap className="text-energy-yellow" size={20} />
        <div className="text-white">
          <span className="font-bold text-lg">{energy}</span>
          <span className="text-xs text-gray-400 ml-1">에너지</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
        <Shield className="text-blue-400" size={20} />
        <div className="text-white">
          <span className="font-bold text-lg">{wave}</span>
          <span className="text-xs text-gray-400 ml-1">웨이브</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
        <Trophy className="text-yellow-500" size={20} />
        <div className="text-white">
          <span className="font-bold text-lg">{score}</span>
          <span className="text-xs text-gray-400 ml-1">점수</span>
        </div>
      </div>
    </div>
  );
};