import { useEffect, useRef } from 'react';
import { Mood } from '../types';

interface MoodVisualizationProps {
  mood: Mood;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  onReact?: () => void;
}

export const MoodVisualization: React.FC<MoodVisualizationProps> = ({
  mood,
  size = 'medium',
  interactive = true,
  onReact
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const sizeMap = {
    small: { width: 100, height: 100 },
    medium: { width: 200, height: 200 },
    large: { width: 300, height: 300 }
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        dimensions.width / 2, dimensions.height / 2, 0,
        dimensions.width / 2, dimensions.height / 2, dimensions.width / 2
      );
      gradient.addColorStop(0, mood.color + (Math.floor(mood.intensity * 255).toString(16)));
      gradient.addColorStop(1, mood.color + '22');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw pattern based on mood
      ctx.strokeStyle = mood.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6 + Math.sin(frame * 0.02) * 0.2;

      switch (mood.pattern) {
        case 'waves':
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            const y = (dimensions.height / 6) * (i + 1);
            for (let x = 0; x <= dimensions.width; x += 5) {
              const waveHeight = Math.sin((x + frame * 2) * 0.02) * 20 * mood.intensity;
              ctx.lineTo(x, y + waveHeight);
            }
            ctx.stroke();
          }
          break;

        case 'circles':
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            const radius = (i + 1) * 15 + Math.sin(frame * 0.03 + i) * 5 * mood.intensity;
            ctx.arc(dimensions.width / 2, dimensions.height / 2, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;

        case 'spiral':
          ctx.beginPath();
          for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
            const radius = angle * 5 + Math.sin(frame * 0.02) * 10 * mood.intensity;
            const x = dimensions.width / 2 + Math.cos(angle + frame * 0.01) * radius;
            const y = dimensions.height / 2 + Math.sin(angle + frame * 0.01) * radius;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;

        case 'dots':
          for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
              if (Math.random() > 0.7) {
                ctx.beginPath();
                const x = (dimensions.width / 20) * i + Math.sin(frame * 0.02 + i) * 5 * mood.intensity;
                const y = (dimensions.height / 20) * j + Math.cos(frame * 0.02 + j) * 5 * mood.intensity;
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
          break;

        default:
          // Gradient only
          break;
      }

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mood, dimensions]);

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl shadow-lg
        ${interactive ? 'cursor-pointer hover:shadow-2xl transition-shadow duration-300' : ''}
      `}
      onClick={interactive ? onReact : undefined}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
      {interactive && (
        <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full px-3 py-1 text-xs">
          {new Date(mood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};