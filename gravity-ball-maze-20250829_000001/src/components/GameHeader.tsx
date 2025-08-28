import { Timer, Trophy, RotateCw, Menu } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameHeader = () => {
  const { 
    currentLevel, 
    score, 
    timeElapsed, 
    isPlaying, 
    resetLevel,
    setShowLevelSelect 
  } = useGameStore();

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLevelSelect(true)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Level selection"
            >
              <Menu size={20} className="text-slate-300" />
            </button>
            
            <div className="text-white">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Level {currentLevel}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Trophy size={18} className="text-yellow-500" />
              <span className="font-semibold text-sm">{score}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Timer size={18} className="text-blue-400" />
              <span className="font-mono text-sm">
                {timeElapsed.toFixed(1)}s
              </span>
            </div>

            {isPlaying && (
              <button
                onClick={resetLevel}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
                aria-label="Reset level"
              >
                <RotateCw size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;