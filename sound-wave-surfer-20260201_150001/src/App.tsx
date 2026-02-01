import { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';
import { useGameStore } from './stores/gameStore';

type GameView = 'start' | 'game' | 'gameover';

function App() {
  const [view, setView] = useState<GameView>('start');
  const [isLoading, setIsLoading] = useState(false);

  const { startListening, isListening } = useAudioAnalyzer();
  const { startGame, resetGame, gameOver } = useGameStore();

  const handleStart = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!isListening) {
        await startListening();
      }
      startGame();
      setView('game');
    } catch (error) {
      console.error('Failed to start game:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isListening, startListening, startGame]);

  const handleGameEnd = useCallback(() => {
    if (gameOver) {
      setView('gameover');
    } else {
      setView('start');
    }
  }, [gameOver]);

  const handleRestart = useCallback(() => {
    resetGame();
    startGame();
    setView('game');
  }, [resetGame, startGame]);

  const handleHome = useCallback(() => {
    resetGame();
    setView('start');
  }, [resetGame]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {view === 'start' && (
        <StartScreen onStart={handleStart} isLoading={isLoading} />
      )}
      {view === 'game' && (
        <GameScreen onGameEnd={handleGameEnd} />
      )}
      {view === 'gameover' && (
        <GameOverScreen onRestart={handleRestart} onHome={handleHome} />
      )}
    </div>
  );
}

export default App;
