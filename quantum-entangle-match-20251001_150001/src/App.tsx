import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import MainMenu from './components/MainMenu';
import GameHeader from './components/GameHeader';
import ParticleGrid from './components/ParticleGrid';
import GameOver from './components/GameOver';

function App() {
  const { gameStatus, particles, moves, maxMoves, setGameStatus, nextLevel } = useGameStore();
  
  useEffect(() => {
    if (gameStatus === 'playing') {
      if (particles.length === 0) {
        setGameStatus('won');
      } else if (moves >= maxMoves) {
        setGameStatus('lost');
      }
    }
  }, [particles, moves, maxMoves, gameStatus, setGameStatus]);
  
  useEffect(() => {
    if (gameStatus === 'won') {
      const timer = setTimeout(() => {
        nextLevel();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, nextLevel]);
  
  if (gameStatus === 'menu') {
    return <MainMenu />;
  }
  
  if (gameStatus === 'won') {
    return <GameOver isWin={true} />;
  }
  
  if (gameStatus === 'lost') {
    return <GameOver isWin={false} />;
  }
  
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <GameHeader />
        <ParticleGrid />
        
        <div className="mt-6 bg-black/20 backdrop-blur-md rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-2">Quick Tips:</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>⚡ Click superposition particles to collapse them</p>
            <p>🔗 Select two particles to entangle them</p>
            <p>🎯 Match same-state particles to clear the board</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;