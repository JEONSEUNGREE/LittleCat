import { useGameStore } from '../stores/gameStore';

interface WaveVisualizerProps {
  className?: string;
}

export const WaveVisualizer = ({ className = '' }: WaveVisualizerProps) => {
  const audioData = useGameStore((state) => state.audioData);

  return (
    <div className={`flex items-end justify-center gap-1 h-32 ${className}`}>
      {audioData.map((value, index) => (
        <div
          key={index}
          className="wave-bar w-2 sm:w-3 rounded-t-full transition-all duration-75"
          style={{
            height: `${Math.max(4, value)}%`,
            background: `linear-gradient(to top,
              hsl(${180 + index * 5}, 100%, 50%),
              hsl(${200 + index * 5}, 100%, 70%))`,
            boxShadow: value > 50
              ? `0 0 ${value / 5}px hsl(${180 + index * 5}, 100%, 50%)`
              : 'none',
          }}
        />
      ))}
    </div>
  );
};
