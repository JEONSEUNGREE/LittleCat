
import { useGameStore } from '../store/gameStore';
import { Heart, Star, Trophy, Zap, Target, TrendingUp } from 'lucide-react';

const GameUI: React.FC = () => {
  const { score, lives, level, highScore, combo, completedWords } = useGameStore();
  
  return (
    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Score */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <Star className="text-yellow-400" size={20} />
          <span className="text-white font-bold text-lg">{score}</span>
        </div>
        
        {/* Lives */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              size={20}
              className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}
            />
          ))}
        </div>
        
        {/* Level */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <TrendingUp className="text-green-400" size={20} />
          <span className="text-white font-bold">LV.{level}</span>
        </div>
        
        {/* Combo */}
        {combo > 2 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm px-4 py-2 rounded-lg animate-pulse">
            <Zap className="text-orange-400" size={20} />
            <span className="text-white font-bold">x{combo}</span>
          </div>
        )}
        
        {/* Words completed */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
          <Target className="text-blue-400" size={20} />
          <span className="text-white font-bold">{completedWords}</span>
        </div>
        
        {/* High Score */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <Trophy className="text-yellow-400" size={20} />
          <span className="text-white font-bold">{highScore}</span>
        </div>
      </div>
    </div>
  );
};

export default GameUI;