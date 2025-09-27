
import { Play, RotateCcw, Music, Info, Trophy, Volume2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameMenu: React.FC = () => {
  const { startGame, resetGame, gameState, score, highScore, level } = useGameStore();
  const [showInstructions, setShowInstructions] = React.useState(false);

  const handleStartOrReset = () => {
    if (gameState === 'idle') {
      startGame();
    } else {
      resetGame();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Game Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-echo-primary to-echo-secondary mb-2">
          Memory Echo
        </h1>
        <p className="text-gray-400 text-sm">Test your sound memory & rhythm</p>
      </div>

      {/* Game Over / Victory Message */}
      {gameState === 'gameOver' && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-xl p-4 mb-4 animate-echo-fade">
          <h2 className="text-xl font-bold text-red-400 text-center mb-2">Game Over!</h2>
          <p className="text-center text-echo-light">
            Final Score: <span className="font-bold text-echo-accent">{score.toLocaleString()}</span>
          </p>
          {score === highScore && score > 0 && (
            <p className="text-center text-yellow-400 mt-2 flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4" />
              New High Score!
            </p>
          )}
        </div>
      )}

      {gameState === 'victory' && (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-xl p-4 mb-4 animate-echo-fade">
          <h2 className="text-xl font-bold text-green-400 text-center mb-2">Victory! 🎉</h2>
          <p className="text-center text-echo-light">
            You've mastered all {level - 1} levels!
          </p>
          <p className="text-center text-echo-light mt-2">
            Final Score: <span className="font-bold text-echo-accent">{score.toLocaleString()}</span>
          </p>
        </div>
      )}

      {/* Main Buttons */}
      <div className="space-y-3">
        {(gameState === 'idle' || gameState === 'gameOver' || gameState === 'victory') && (
          <button
            onClick={handleStartOrReset}
            className="w-full bg-gradient-to-r from-echo-primary to-echo-secondary hover:from-echo-secondary hover:to-echo-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {gameState === 'idle' ? 'Start Game' : 'Play Again'}
          </button>
        )}

        {(gameState === 'playing' || gameState === 'showing') && (
          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </button>
        )}

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full bg-echo-dark bg-opacity-50 hover:bg-opacity-70 text-echo-light font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Info className="w-5 h-5" />
          How to Play
        </button>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className="mt-4 bg-echo-dark bg-opacity-50 backdrop-blur-sm rounded-xl p-4 animate-echo-fade">
          <h3 className="font-bold text-echo-accent mb-3 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Game Instructions
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-echo-secondary" />
              <span>Listen carefully to the sequence of musical notes</span>
            </li>
            <li className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-echo-secondary" />
              <span>Repeat the sequence by tapping the colored buttons</span>
            </li>
            <li className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-echo-secondary" />
              <span>Each level adds one more note to the sequence</span>
            </li>
            <li className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-echo-secondary" />
              <span>Build combos for bonus points (x2 after 3 correct notes)</span>
            </li>
            <li className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-echo-secondary" />
              <span>You have 3 lives - lose one for each mistake</span>
            </li>
            <li className="flex items-start gap-2">
              <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-400" />
              <span>Complete all 20 levels to achieve victory!</span>
            </li>
          </ul>
        </div>
      )}

      {/* Game Status */}
      {gameState === 'showing' && (
        <div className="mt-4 text-center">
          <p className="text-echo-secondary animate-pulse">Listen to the sequence...</p>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="mt-4 text-center">
          <p className="text-green-400">Your turn! Repeat the sequence</p>
        </div>
      )}
    </div>
  );
};

export default GameMenu;