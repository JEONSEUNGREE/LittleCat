import { Waves } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';

interface SurferProps {
  className?: string;
}

export const Surfer = ({ className = '' }: SurferProps) => {
  const surferPosition = useGameStore((state) => state.surferPosition);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const combo = useGameStore((state) => state.combo);

  const glowIntensity = Math.min(combo * 2, 30);

  return (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-100 ${className}`}
      style={{
        bottom: `${surferPosition}%`,
        filter: isPlaying ? `drop-shadow(0 0 ${glowIntensity}px var(--neon-blue))` : 'none',
      }}
    >
      <div className="relative">
        {/* Surfer body */}
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #b300ff)',
            boxShadow: isPlaying
              ? `0 0 20px var(--neon-blue), 0 0 40px var(--neon-purple)`
              : 'none',
          }}
        >
          <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        {/* Trail effect */}
        {isPlaying && (
          <>
            <div
              className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full opacity-30 -z-10"
              style={{
                background: 'var(--neon-blue)',
                left: '-4px',
                bottom: '-8px',
                filter: 'blur(8px)',
              }}
            />
            <div
              className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full opacity-20 -z-20"
              style={{
                background: 'var(--neon-purple)',
                left: '-8px',
                bottom: '-16px',
                filter: 'blur(12px)',
              }}
            />
          </>
        )}

        {/* Combo indicator */}
        {combo > 0 && (
          <div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold"
            style={{
              color: combo > 10 ? 'var(--neon-pink)' : 'var(--neon-blue)',
              textShadow: `0 0 10px currentColor`,
            }}
          >
            x{combo}
          </div>
        )}
      </div>
    </div>
  );
};
