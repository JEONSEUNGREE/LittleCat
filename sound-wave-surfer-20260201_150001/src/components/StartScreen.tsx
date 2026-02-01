import { Mic, Volume2, Trophy, Flame } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';

interface StartScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

export const StartScreen = ({ onStart, isLoading }: StartScreenProps) => {
  const highScore = useGameStore((state) => state.highScore);
  const maxCombo = useGameStore((state) => state.maxCombo);
  const hasAudioPermission = useGameStore((state) => state.hasAudioPermission);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-32 w-full opacity-5"
            style={{
              bottom: `${i * 15}%`,
              background: `linear-gradient(90deg, transparent, var(--neon-blue), transparent)`,
              transform: `scaleY(${1 + i * 0.2})`,
              animation: `wave ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold mb-2 neon-text">
            Sound Wave
          </h1>
          <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
            Surfer
          </h2>
        </div>

        {/* Animated icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center animate-pulse-slow">
              <Volume2 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -inset-4 rounded-full border-2 border-neon-blue/30 animate-ping" />
          </div>
        </div>

        {/* Stats */}
        {(highScore > 0 || maxCombo > 0) && (
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Best Score</div>
                <div className="text-lg font-bold text-white">{highScore.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Max Combo</div>
                <div className="text-lg font-bold text-white">{maxCombo}x</div>
              </div>
            </div>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={onStart}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-bold text-lg text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-neon-blue/30 disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            {isLoading ? 'Loading...' : hasAudioPermission ? 'Start Game' : 'Allow Microphone'}
          </span>
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-colors" />
        </button>

        {/* Instructions */}
        <div className="mt-8 text-gray-400 text-sm max-w-xs mx-auto">
          <p className="mb-2">
            Use your voice or sounds to control the surfer!
          </p>
          <p>
            Louder sounds move the surfer higher. Keep making sounds to build combos!
          </p>
        </div>
      </div>
    </div>
  );
};
