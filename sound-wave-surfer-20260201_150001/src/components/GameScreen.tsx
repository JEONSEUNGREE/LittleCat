import { useEffect, useCallback, useRef } from 'react';
import { WaveVisualizer } from './WaveVisualizer';
import { Surfer } from './Surfer';
import { GameHUD } from './GameHUD';
import { useGameStore } from '../stores/gameStore';

interface GameScreenProps {
  onGameEnd: () => void;
}

export const GameScreen = ({ onGameEnd }: GameScreenProps) => {
  const {
    isPlaying,
    isPaused,
    pauseGame,
    resumeGame,
    resetGame,
    updateScore,
    incrementCombo,
    audioData,
  } = useGameStore();

  const scoreIntervalRef = useRef<number | null>(null);

  // Score based on audio activity
  const calculateScore = useCallback(() => {
    if (!isPlaying || isPaused) return;

    const avgVolume = audioData.reduce((a, b) => a + b, 0) / audioData.length;

    if (avgVolume > 20) {
      updateScore(Math.floor(avgVolume / 10));
      if (avgVolume > 50) {
        incrementCombo();
      }
    }
  }, [audioData, isPlaying, isPaused, updateScore, incrementCombo]);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      scoreIntervalRef.current = window.setInterval(calculateScore, 100);
    } else if (scoreIntervalRef.current) {
      clearInterval(scoreIntervalRef.current);
    }

    return () => {
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused, calculateScore]);

  const handlePause = () => {
    pauseGame();
  };

  const handleResume = () => {
    resumeGame();
  };

  const handleReset = () => {
    resetGame();
    onGameEnd();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-dark-bg via-slate-900 to-dark-bg">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--neon-blue) 1px, transparent 1px),
            linear-gradient(to bottom, var(--neon-blue) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* HUD */}
      <GameHUD onPause={handlePause} onResume={handleResume} onReset={handleReset} />

      {/* Game area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md h-[60vh] px-4">
          {/* Wave visualization background */}
          <div className="absolute bottom-0 left-0 right-0">
            <WaveVisualizer />
          </div>

          {/* Surfer */}
          <Surfer />
        </div>
      </div>

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4 neon-text">PAUSED</h2>
            <button
              onClick={handleResume}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white font-bold hover:opacity-80 transition-opacity"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-400 text-sm">
          Make sounds to control the surfer!
        </p>
      </div>
    </div>
  );
};
