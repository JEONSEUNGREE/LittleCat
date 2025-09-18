import { useEffect, useRef } from 'react';

interface CircleCanvasProps {
  angle: number;
  isDegrees: boolean;
  onAngleChange: (angle: number) => void;
}

const CircleCanvas = ({ angle, isDegrees, onAngleChange }: CircleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isDragging = useRef(false);

  const getRadians = (deg: number) => (deg * Math.PI) / 180;
  const getDegrees = (rad: number) => (rad * 180) / Math.PI;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const size = Math.min(canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = size * 0.35;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = -4; i <= 4; i++) {
        const pos = centerX + (i * radius) / 4;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        
        const posY = centerY + (i * radius) / 4;
        ctx.beginPath();
        ctx.moveTo(0, posY);
        ctx.lineTo(canvas.width, posY);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.stroke();

      // Circle
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Angle line and arc
      const angleRad = isDegrees ? getRadians(angle) : angle;
      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY - radius * Math.sin(angleRad);

      // Angle arc
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, -angleRad, angleRad > 0);
      ctx.stroke();

      // Radius line
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Point on circle
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Coordinate lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, centerY);
      ctx.moveTo(x, y);
      ctx.lineTo(centerX, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.font = '14px system-ui';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('1', centerX + radius + 15, centerY + 5);
      ctx.fillText('-1', centerX - radius - 15, centerY + 5);
      ctx.fillText('i', centerX - 5, centerY - radius - 10);
      ctx.fillText('-i', centerX - 5, centerY + radius + 20);
    };

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientWidth;
        draw();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [angle, isDegrees]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updateAngle(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateAngle(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateAngle = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = -(e.clientY - rect.top - canvas.height / 2);

    let angleRad = Math.atan2(y, x);
    if (angleRad < 0) angleRad += Math.PI * 2;

    const newAngle = isDegrees ? getDegrees(angleRad) : angleRad;
    onAngleChange(newAngle);
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
};

export default CircleCanvas;