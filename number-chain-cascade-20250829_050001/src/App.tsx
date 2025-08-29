import { useEffect } from 'react';
import GameHeader from './components/GameHeader';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { useGameStore } from './store/gameStore';

function App() {
  const { initGame } = useGameStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <GameHeader />
        <ScoreBoard />
        <GameBoard />
        
        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>
      </div>
    </div>
  );
}

export default App;