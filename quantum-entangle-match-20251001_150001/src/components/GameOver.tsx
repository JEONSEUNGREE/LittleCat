import React from 'react';
import { Trophy, Home, RotateCw, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface GameOverProps {
  isWin: boolean;
}

const GameOver: React.FC<GameOverProps> = ({ isWin }) => {
  const { score, level, moves, resetGame, initGame } = useGameStore();
  
  const stars = isWin ? (moves < 10 ? 3 : moves < 15 ? 2 : 1) : 0;
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isWin ? '🎉 Victory!' : '😔 Game Over'}
            </h2>
            
            {isWin && (
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            )}
            
            <p className="text-gray-300 text-lg">
              {isWin 
                ? 'Quantum mastery achieved!' 
                : 'The quantum realm remains mysterious...'}
            </p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Final Score</span>
              <span className="text-xl font-bold">{score.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Level Reached</span>
              <span className="text-xl font-bold">{level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Moves Used</span>
              <span className="text-xl font-bold">{moves}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {isWin ? (
              <button
                onClick={initGame}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Trophy className="w-5 h-5" />
                Next Level
              </button>
            ) : (
              <button
                onClick={initGame}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <RotateCw className="w-5 h-5" />
                Try Again
              </button>
            )}
            
            <button
              onClick={resetGame}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;