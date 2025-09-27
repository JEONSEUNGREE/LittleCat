import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import GameUI from './components/GameUI';
import GameOverScreen from './components/GameOverScreen';
import { Pause, Play } from 'lucide-react';

function App() {
  const { isPlaying, isPaused, lives, pauseGame, resumeGame } = useGameStore();
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlaying) {
        if (isPaused) {
          resumeGame();
        } else {
          pauseGame();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isPaused, pauseGame, resumeGame]);
  
  // Show game over screen
  if (isPlaying && lives <= 0) {
    return <GameOverScreen />;
  }
  
  // Show start screen
  if (!isPlaying) {
    return <StartScreen />;
  }
  
  // Main game
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <GameBoard />
      <GameUI />
      
      {/* Pause button */}
      <button
        onClick={() => isPaused ? resumeGame() : pauseGame()}
        className="absolute top-20 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-lg transition-all"
      >
        {isPaused ? (
          <Play className="text-white" size={24} />
        ) : (
          <Pause className="text-white" size={24} />
        )}
      </button>
      
      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">일시 정지</h2>
            <p className="text-white/70 mb-6">ESC 또는 버튼을 눌러 계속하기</p>
            <button
              onClick={resumeGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
            >
              <Play size={20} />
              계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;