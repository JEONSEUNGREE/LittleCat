import { useEffect, useRef } from 'react';
import { useMixerStore } from '../store/useMixerStore';

export const MusicVisualizer: React.FC = () => {
  const { selectedMoods, isPlaying, currentBeat, tempo } = useMixerStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (selectedMoods.length === 0) {
        // Show idle animation
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const centerX = canvas.width / (2 * window.devicePixelRatio);
        const centerY = canvas.height / (2 * window.devicePixelRatio);
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 0.001;
          const radius = 50 + Math.sin(time * 0.002 + i) * 20;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        // Visualize selected moods
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        const barWidth = width / 16;
        
        selectedMoods.forEach((mood, moodIndex) => {
          ctx.fillStyle = mood.color + '99';
          mood.beats.forEach((beat, beatIndex) => {
            if (beat === 1) {
              const heightMultiplier = isPlaying && beatIndex === currentBeat ? 1.5 : 1;
              const barHeight = (mood.intensity * height * 0.5 + 
                Math.sin(time * 0.003 + beatIndex + moodIndex) * 20) * heightMultiplier;
              const x = beatIndex * barWidth;
              const y = height - barHeight;
              
              ctx.fillRect(x, y, barWidth - 2, barHeight);
              
              // Add glow effect for active beat
              if (isPlaying && beatIndex === currentBeat) {
                ctx.shadowColor = mood.color;
                ctx.shadowBlur = 20;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
                ctx.shadowBlur = 0;
              }
            }
          });
        });
      }

      time += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedMoods, isPlaying, currentBeat, tempo]);

  return (
    <div className="w-full h-48 md:h-64 bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};