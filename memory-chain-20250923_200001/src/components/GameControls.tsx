import { Play, RotateCcw, Pause } from 'lucide-react';
import useGameStore from '../store/gameStore';

const GameControls = () => {
  const { isPlaying, gameStatus, startGame, resetGame } = useGameStore();
  
  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      <div className="flex justify-center gap-4">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="
              flex items-center gap-2 px-8 py-4 
              bg-green-500 hover:bg-green-600 
              text-white font-bold text-lg
              rounded-full shadow-lg
              transition-all duration-200
              transform hover:scale-105 active:scale-95
            "
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
        ) : (
          <>
            {gameStatus === 'failed' ? (
              <button
                onClick={startGame}
                className="
                  flex items-center gap-2 px-8 py-4 
                  bg-blue-500 hover:bg-blue-600 
                  text-white font-bold text-lg
                  rounded-full shadow-lg
                  transition-all duration-200
                  transform hover:scale-105 active:scale-95
                "
              >
                <RotateCcw className="w-6 h-6" />
                Try Again
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="
                  flex items-center gap-2 px-6 py-3 
                  bg-red-500 hover:bg-red-600 
                  text-white font-semibold
                  rounded-full shadow-lg
                  transition-all duration-200
                  transform hover:scale-105 active:scale-95
                "
              >
                <Pause className="w-5 h-5" />
                End Game
              </button>
            )}
          </>
        )}
      </div>
      
      {!isPlaying && gameStatus === 'idle' && (
        <div className="mt-6 text-center">
          <h2 className="text-white/90 text-lg mb-2 font-semibold">How to Play</h2>
          <p className="text-white/70 text-sm max-w-sm mx-auto">
            Watch the pattern of colors, then repeat it in the same order. 
            The pattern grows longer with each level. You have 3 lives!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameControls;