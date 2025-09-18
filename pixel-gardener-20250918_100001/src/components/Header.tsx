import React from 'react';
import { Coins, Heart, Star, RefreshCw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Header: React.FC = () => {
  const { coins, level, experience, season, changeSeason, reset } = useGameStore();
  const expNeeded = level * 100;
  const expProgress = (experience / expNeeded) * 100;

  const seasonEmojis = {
    spring: '🌸',
    summer: '☀️',
    autumn: '🍂',
    winter: '❄️',
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold pixel-text flex items-center gap-2">
            🌱 픽셀 정원사
            <button
              onClick={changeSeason}
              className="text-lg p-1 hover:scale-110 transition-transform"
              title="계절 변경"
            >
              {seasonEmojis[season]}
            </button>
          </h1>
          <button
            onClick={reset}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="게임 리셋"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Coins size={16} />
            <span className="pixel-text">{coins}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={16} />
            <span className="pixel-text">Lv.{level}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <div className="flex-1 bg-white/20 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${expProgress}%` }}
                />
              </div>
              <span className="text-xs pixel-text">{experience}/{expNeeded}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;