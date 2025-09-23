import { Brain } from 'lucide-react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import useGameStore from './store/gameStore';

function App() {
  const { isPlaying } = useGameStore();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-6 px-4">
      {/* Header */}
      <header className="w-full max-w-md mx-auto mb-6">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-10 h-10 text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Memory Chain
          </h1>
        </div>
      </header>
      
      {/* Main Game Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col justify-center gap-6">
        {isPlaying && <ScoreBoard />}
        <GameBoard />
        <GameControls />
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-md mx-auto mt-8">
        <p className="text-center text-white/60 text-sm">
          Test your memory with patterns
        </p>
      </footer>
    </div>
  );
}

export default App;