import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { Difficulty, GameStats } from './types/game';

type GameState = 'start' | 'playing' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('speedMathHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const handleGameEnd = (stats: GameStats) => {
    setGameStats(stats);
    setGameState('result');
    
    if (stats.score > highScore) {
      setHighScore(stats.score);
      localStorage.setItem('speedMathHighScore', stats.score.toString());
    }
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  const handleHome = () => {
    setGameState('start');
    setGameStats(null);
  };

  const handleBack = () => {
    setGameState('start');
  };

  return (
    <>
      {gameState === 'start' && (
        <StartScreen onStart={handleStartGame} highScore={highScore} />
      )}
      {gameState === 'playing' && (
        <GameScreen 
          difficulty={difficulty} 
          onGameEnd={handleGameEnd}
          onBack={handleBack}
        />
      )}
      {gameState === 'result' && gameStats && (
        <ResultScreen 
          stats={gameStats} 
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </>
  );
}

export default App;