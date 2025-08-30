import { useEffect, useRef } from 'react';
import useAudioStore from '../store/audioStore';

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { 
    analyser, 
    isRecording, 
    isPaused, 
    visualizationType, 
    sensitivity,
    colorScheme 
  } = useAudioStore();

  const getColors = () => {
    const schemes = {
      neon: ['#00d4ff', '#9945ff', '#ff00ff'],
      sunset: ['#ff6b6b', '#feca57', '#ff9ff3'],
      ocean: ['#00d2d3', '#01a3a4', '#5f27cd'],
      forest: ['#10ac84', '#006ba6', '#ee5a24']
    };
    return schemes[colorScheme];
  };

  const drawWaveform = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const colors = getColors();
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    
    const sliceWidth = width / dataArray.length;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2 * (sensitivity / 50);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.stroke();
    
    // Add glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = colors[1];
    ctx.stroke();
  };

  const drawBars = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const colors = getColors();
    const barWidth = (width / dataArray.length) * 2.5;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * height * (sensitivity / 50);
      
      const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
      
      x += barWidth;
    }
  };

  const drawCircular = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const colors = getColors();
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    
    ctx.beginPath();
    
    for (let i = 0; i < dataArray.length; i++) {
      const angle = (i / dataArray.length) * Math.PI * 2;
      const amplitude = (dataArray[i] / 255) * radius * (sensitivity / 50);
      const x = centerX + Math.cos(angle) * (radius + amplitude);
      const y = centerY + Math.sin(angle) * (radius + amplitude);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.1;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const colors = getColors();
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const dataIndex = Math.floor((i / particleCount) * dataArray.length);
      const amplitude = dataArray[dataIndex] / 255;
      const size = amplitude * 20 * (sensitivity / 50);
      
      const x = (width / particleCount) * i;
      const y = height / 2 + Math.sin(Date.now() * 0.001 + i) * amplitude * 100;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, colors[i % 3]);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const visualize = () => {
    if (!analyser || !canvasRef.current || isPaused) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!isRecording || isPaused) return;
      
      animationRef.current = requestAnimationFrame(draw);
      
      if (visualizationType === 'waveform') {
        analyser.getByteTimeDomainData(dataArray);
        drawWaveform(ctx, dataArray, canvas.width, canvas.height);
      } else if (visualizationType === 'bars') {
        analyser.getByteFrequencyData(dataArray);
        drawBars(ctx, dataArray, canvas.width, canvas.height);
      } else if (visualizationType === 'circular') {
        analyser.getByteFrequencyData(dataArray);
        drawCircular(ctx, dataArray, canvas.width, canvas.height);
      } else if (visualizationType === 'particles') {
        analyser.getByteFrequencyData(dataArray);
        drawParticles(ctx, dataArray, canvas.width, canvas.height);
      }
    };
    
    draw();
  };

  useEffect(() => {
    if (isRecording && !isPaused) {
      visualize();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, isPaused, analyser, visualizationType, sensitivity, colorScheme]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px] glass-effect rounded-2xl p-4 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      />
      
      {!isRecording && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-lg">
            Click "Start Recording" to begin visualization
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;