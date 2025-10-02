
import { Trophy, Move, Target, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameHeader: React.FC = () => {
  const { score, level, moves, maxMoves, resetGame } = useGameStore();
  
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="animate-quantum-pulse">⚛️</span>
          Quantum Entangle
        </h1>
        <button
          onClick={resetGame}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Reset game"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-white">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider opacity-70">Score</span>
          </div>
          <div className="text-xl font-bold">{score.toLocaleString()}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider opacity-70">Level</span>
          </div>
          <div className="text-xl font-bold">{level}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Move className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider opacity-70">Moves</span>
          </div>
          <div className="text-xl font-bold">
            {moves}/{maxMoves}
          </div>
        </div>
      </div>
      
      {moves >= maxMoves - 3 && moves < maxMoves && (
        <div className="mt-3 p-2 bg-orange-500/20 border border-orange-500/50 rounded-lg">
          <p className="text-orange-300 text-sm text-center">
            ⚠️ Only {maxMoves - moves} moves left!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameHeader;