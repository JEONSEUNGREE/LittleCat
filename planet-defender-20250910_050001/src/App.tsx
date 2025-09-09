import React from 'react';
import useGameStore from './store/gameStore';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import HUD from './components/HUD';
import GameOver from './components/GameOver';

const App: React.FC = () => {
  const { gameStatus } = useGameStore();

  if (gameStatus === 'menu') {
    return <MainMenu />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-dark to-space-purple relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* HUD */}
      <HUD />

      {/* Game Board */}
      <div className="flex items-center justify-center min-h-screen pt-20 pb-4 px-4">
        <GameBoard />
      </div>

      {/* Pause Overlay */}
      {gameStatus === 'paused' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-15">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Paused</h2>
            <p className="text-gray-400">Tap the play button to continue</p>
          </div>
        </div>
      )}

      {/* Game Over */}
      {gameStatus === 'gameOver' && <GameOver />}
    </div>
  );
};

export default App;